-- =========================================================
-- 0060 — Producto adicional "Prorrateo de costos" (Compras y Proveedores):
-- repartir costos conjuntos de un embarque (envío, impuestos, logística)
-- entre los productos que viajaron juntos, con un criterio configurable
-- (no solo peso volumétrico — cualquier cliente de Nuxorb puede tener un
-- criterio distinto).
--
-- Integración con costeo: costo_referencia de un producto se recalcula
-- del lado del cliente (recalcularCostoReferencia en useComprasData.ts),
-- sumando TODA la evidencia de ese producto cada vez que se llama — no es
-- un valor acumulado a mano. Por eso el prorrateo no se suma directo a
-- costo_referencia (una reconciliación futura de otra factura lo
-- borraría) — se modela como una fuente de evidencia más
-- (procurement_shipment_items de embarques 'aplicado'), que el cálculo ya
-- extendido en el frontend suma junto con las líneas de factura/ticket.
-- =========================================================

alter table public.procurement_products add column if not exists peso_volumetrico numeric;
alter table public.procurement_products add column if not exists peso numeric;

-- ---------------------------------------------------------
-- procurement_shipments: el "embarque" — agrupa qué costos se van a
-- repartir y entre qué productos, con qué criterio.
-- ---------------------------------------------------------
create table if not exists public.procurement_shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  nombre text not null,
  criterio text not null check (criterio in ('peso_volumetrico', 'peso_real', 'valor_mercancia', 'cantidad_unidades', 'manual')),
  estado text not null default 'borrador' check (estado in ('borrador', 'aplicado')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  applied_at timestamptz
);

create index if not exists procurement_shipments_company_idx on public.procurement_shipments (company_id);

-- ---------------------------------------------------------
-- procurement_shipment_costs: los montos a repartir, capturados a mano
-- por el equipo (ej. "Envío inicial" $10,000, "Impuestos" $3,000...).
-- factura_id es solo para trazabilidad si eligen ligarlo a una factura ya
-- cargada — no autocompleta nada.
-- ---------------------------------------------------------
create table if not exists public.procurement_shipment_costs (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.procurement_shipments (id) on delete cascade,
  concepto text not null,
  monto numeric not null check (monto > 0),
  factura_id uuid references public.procurement_xml_invoices (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists procurement_shipment_costs_shipment_idx on public.procurement_shipment_costs (shipment_id);

-- ---------------------------------------------------------
-- procurement_shipment_items: qué productos viajaron en el embarque, su
-- valor de reparto (según el criterio elegido, siempre editable a mano) y
-- el costo ya asignado una vez que el embarque se aplica.
-- ---------------------------------------------------------
create table if not exists public.procurement_shipment_items (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.procurement_shipments (id) on delete cascade,
  producto_id uuid not null references public.procurement_products (id) on delete restrict,
  cantidad numeric not null check (cantidad > 0),
  valor_reparto numeric,
  costo_asignado numeric,
  created_at timestamptz not null default now()
);

create index if not exists procurement_shipment_items_shipment_idx on public.procurement_shipment_items (shipment_id);
create index if not exists procurement_shipment_items_producto_idx on public.procurement_shipment_items (producto_id);

-- ---------------------------------------------------------
-- RLS — mismo patrón que el resto de Compras: equipo todo, miembro de la
-- empresa todo lo suyo. Las dos tablas hijas no tienen company_id directo,
-- se valida vía procurement_shipments.
-- ---------------------------------------------------------
alter table public.procurement_shipments enable row level security;
alter table public.procurement_shipment_costs enable row level security;
alter table public.procurement_shipment_items enable row level security;

drop policy if exists "procurement_shipments: team all" on public.procurement_shipments;
create policy "procurement_shipments: team all" on public.procurement_shipments for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "procurement_shipments: member all own" on public.procurement_shipments;
create policy "procurement_shipments: member all own" on public.procurement_shipments for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "procurement_shipment_costs: team all" on public.procurement_shipment_costs;
create policy "procurement_shipment_costs: team all" on public.procurement_shipment_costs for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "procurement_shipment_costs: member all own" on public.procurement_shipment_costs;
create policy "procurement_shipment_costs: member all own" on public.procurement_shipment_costs for all to authenticated
  using (exists (select 1 from public.procurement_shipments s where s.id = procurement_shipment_costs.shipment_id and is_company_member(s.company_id)))
  with check (exists (select 1 from public.procurement_shipments s where s.id = procurement_shipment_costs.shipment_id and is_company_member(s.company_id)));

drop policy if exists "procurement_shipment_items: team all" on public.procurement_shipment_items;
create policy "procurement_shipment_items: team all" on public.procurement_shipment_items for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "procurement_shipment_items: member all own" on public.procurement_shipment_items;
create policy "procurement_shipment_items: member all own" on public.procurement_shipment_items for all to authenticated
  using (exists (select 1 from public.procurement_shipments s where s.id = procurement_shipment_items.shipment_id and is_company_member(s.company_id)))
  with check (exists (select 1 from public.procurement_shipments s where s.id = procurement_shipment_items.shipment_id and is_company_member(s.company_id)));

-- ---------------------------------------------------------
-- Registrar el addon en el catálogo de company_addons.
-- ---------------------------------------------------------
alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza',
    'agentes_ia', 'lealtad', 'prorrateo'
  ));
