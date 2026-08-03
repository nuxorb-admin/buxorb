-- =========================================================
-- 0029 — catálogo de productos de compras + inventario alimentado por
-- recepciones.
--
-- procurement_products: el catálogo de insumos/productos que se compran.
-- Una OC ahora selecciona líneas de este catálogo (producto_id en
-- procurement_order_items) en vez de solo texto libre.
--
-- Conciliación: cuando llega una factura (XML), sus líneas
-- (procurement_order_items con factura_id) también se ligan a un
-- producto_id del catálogo — así se puede cruzar lo pedido en la OC
-- contra lo facturado por el mismo producto, no solo por total.
--
-- Inventario: procurement_inventory_movements es el kardex — cada
-- recepción confirmada genera una entrada por producto; el stock actual
-- es la suma de movimientos, no una columna a mantener a mano.
-- =========================================================

create table if not exists public.procurement_products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  sku text,
  nombre text not null,
  descripcion text,
  unidad text not null default 'pza',
  costo_referencia numeric not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists procurement_products_company_idx on public.procurement_products (company_id);

alter table public.procurement_products enable row level security;

create policy "procurement_products: team all" on public.procurement_products for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "procurement_products: member all own" on public.procurement_products for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));

-- ---------------------------------------------------------
-- procurement_order_items: liga cada línea (de OC o de factura) a un
-- producto del catálogo
-- ---------------------------------------------------------
alter table public.procurement_order_items add column if not exists producto_id uuid references public.procurement_products (id) on delete set null;
create index if not exists procurement_order_items_producto_idx on public.procurement_order_items (producto_id);

-- ---------------------------------------------------------
-- procurement_inventory_movements: kardex de entradas/salidas
-- ---------------------------------------------------------
create table if not exists public.procurement_inventory_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  producto_id uuid not null references public.procurement_products (id) on delete cascade,
  tipo text not null check (tipo in ('entrada', 'salida')),
  cantidad numeric not null check (cantidad > 0),
  compra_id uuid references public.procurement_orders (id) on delete set null,
  recepcion_id uuid references public.procurement_receipts (id) on delete set null,
  fecha date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists procurement_inventory_movements_company_idx on public.procurement_inventory_movements (company_id);
create index if not exists procurement_inventory_movements_producto_idx on public.procurement_inventory_movements (producto_id);

alter table public.procurement_inventory_movements enable row level security;

create policy "procurement_inventory_movements: team all" on public.procurement_inventory_movements for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "procurement_inventory_movements: member all own" on public.procurement_inventory_movements for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));
