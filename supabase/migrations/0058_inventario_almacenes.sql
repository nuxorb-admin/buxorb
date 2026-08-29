-- =========================================================
-- 0058 — ampliación de inventario (compras-proveedores-modulo-v1.md §7.2):
-- almacenes/canales, motivo de movimiento y traspasos. El catálogo de
-- productos y la existencia consolidada bajan de Professional a Essential
-- (ese cambio es solo de gate en frontend, ver limits.ts) operando sobre
-- un "almacén implícito" creado automáticamente por empresa; Professional
-- expone almacenes reales, traspasos, motivos y valor de inventario.
-- =========================================================

-- ---------------------------------------------------------
-- procurement_warehouses: almacenes físicos y canales (Amazon, Mercado
-- Libre, tienda propia...). Toda empresa tiene exactamente un almacén
-- "implícito" (es_implicito = true) creado automáticamente al activar el
-- módulo — en Essential es el único que existe y no se muestra como
-- concepto en la UI ("el usuario solo ve existencia").
-- ---------------------------------------------------------
create table if not exists public.procurement_warehouses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  nombre text not null,
  tipo text not null default 'fisico' check (tipo in ('fisico', 'canal')),
  es_implicito boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists procurement_warehouses_company_idx on public.procurement_warehouses (company_id);
-- Un solo almacén implícito por empresa (el insert idempotente de
-- procurement_ensure_default_warehouse se apoya en este índice).
create unique index if not exists procurement_warehouses_company_implicito_idx
  on public.procurement_warehouses (company_id) where es_implicito;

alter table public.procurement_warehouses enable row level security;

create policy "procurement_warehouses: team all" on public.procurement_warehouses for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "procurement_warehouses: member all own" on public.procurement_warehouses for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));

-- ---------------------------------------------------------
-- procurement_ensure_default_warehouse: crea (si no existe) el almacén
-- implícito de una empresa. Idempotente vía el índice único parcial.
-- ---------------------------------------------------------
create or replace function public.procurement_ensure_default_warehouse(p_company_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into public.procurement_warehouses (company_id, nombre, tipo, es_implicito)
  values (p_company_id, 'Almacén general', 'fisico', true)
  on conflict (company_id) where es_implicito do nothing
  returning id into v_id;

  if v_id is null then
    select id into v_id from public.procurement_warehouses
    where company_id = p_company_id and es_implicito
    limit 1;
  end if;

  return v_id;
end;
$$;

grant execute on function public.procurement_ensure_default_warehouse(uuid) to authenticated;

-- Toda empresa que active (o ya tenga activo) el módulo de compras recibe
-- su almacén implícito automáticamente.
create or replace function public.procurement_company_modules_ensure_warehouse()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.module = 'compras_proveedores' then
    perform public.procurement_ensure_default_warehouse(new.company_id);
  end if;
  return new;
end;
$$;

drop trigger if exists procurement_company_modules_ensure_warehouse on nuxorb.company_modules;
create trigger procurement_company_modules_ensure_warehouse
  after insert on nuxorb.company_modules
  for each row execute function public.procurement_company_modules_ensure_warehouse();

-- Backfill: toda empresa con módulo de compras ya activo, o que ya tenga
-- productos/movimientos de inventario, recibe su almacén implícito ahora.
do $$
declare
  v_company_id uuid;
begin
  for v_company_id in
    select company_id from nuxorb.company_modules where module = 'compras_proveedores'
    union
    select company_id from public.procurement_products
    union
    select company_id from public.procurement_inventory_movements
  loop
    perform public.procurement_ensure_default_warehouse(v_company_id);
  end loop;
end $$;

-- ---------------------------------------------------------
-- procurement_products: + precio_venta, + stock_minimo (Professional)
-- ---------------------------------------------------------
alter table public.procurement_products add column if not exists precio_venta numeric;
alter table public.procurement_products add column if not exists stock_minimo numeric;

-- ---------------------------------------------------------
-- procurement_inventory_movements: + almacen_id, + motivo, + traspaso_id
-- (agrupa el par salida/entrada de un mismo traspaso)
-- ---------------------------------------------------------
alter table public.procurement_inventory_movements add column if not exists almacen_id uuid references public.procurement_warehouses (id) on delete restrict;
alter table public.procurement_inventory_movements add column if not exists motivo text;
alter table public.procurement_inventory_movements add column if not exists traspaso_id uuid;

-- Backfill de movimientos existentes: se asignan al almacén implícito de
-- su empresa. Todas las entradas históricas vienen de recepciones
-- (entrada_compra); todas las salidas históricas eran "salida manual"
-- genérica, el único tipo de salida que existía hasta hoy.
update public.procurement_inventory_movements m
set almacen_id = w.id,
    motivo = case when m.tipo = 'entrada' then 'entrada_compra' else 'salida_manual' end
from public.procurement_warehouses w
where w.company_id = m.company_id and w.es_implicito
  and m.almacen_id is null;

alter table public.procurement_inventory_movements alter column almacen_id set not null;
alter table public.procurement_inventory_movements alter column motivo set not null;
alter table public.procurement_inventory_movements add constraint procurement_inventory_movements_motivo_check
  check (motivo in ('entrada_compra', 'salida_manual', 'venta', 'merma', 'consumo_interno', 'ajuste', 'traspaso'));

create index if not exists procurement_inventory_movements_almacen_idx on public.procurement_inventory_movements (almacen_id);
create index if not exists procurement_inventory_movements_traspaso_idx on public.procurement_inventory_movements (traspaso_id) where traspaso_id is not null;
