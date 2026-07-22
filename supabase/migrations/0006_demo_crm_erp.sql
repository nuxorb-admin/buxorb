-- =========================================================
-- 0006 — módulo demo de CRM (Pipeline de Ventas) y de ERP (Inventario).
-- Mismo patrón que demo_treasury_entries (0001-0003): datos de ejemplo,
-- sin login real, aislados por scope_id (session_id de navegador) del
-- lado del cliente, no por RLS con identidad. No meter datos reales aquí.
-- =========================================================

create table if not exists public.demo_crm_deals (
  id uuid primary key default gen_random_uuid(),
  scope_id uuid not null,
  name text not null,
  value numeric not null default 0,
  stage text not null default 'prospecto'
    check (stage in ('prospecto', 'contactado', 'propuesta', 'ganado', 'perdido')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists demo_crm_deals_scope_idx on public.demo_crm_deals (scope_id);

drop trigger if exists demo_crm_deals_set_updated_at on public.demo_crm_deals;
create trigger demo_crm_deals_set_updated_at
  before update on public.demo_crm_deals
  for each row execute function public.set_updated_at();

create table if not exists public.demo_erp_inventory_movements (
  id uuid primary key default gen_random_uuid(),
  scope_id uuid not null,
  sku text not null,
  concept text not null,
  type text not null check (type in ('entrada', 'salida')),
  quantity numeric not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create index if not exists demo_erp_inventory_movements_scope_idx on public.demo_erp_inventory_movements (scope_id);

alter table public.demo_crm_deals enable row level security;
alter table public.demo_erp_inventory_movements enable row level security;

drop policy if exists "demo_crm_deals: public all" on public.demo_crm_deals;
create policy "demo_crm_deals: public all" on public.demo_crm_deals
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "demo_erp_inventory_movements: public all" on public.demo_erp_inventory_movements;
create policy "demo_erp_inventory_movements: public all" on public.demo_erp_inventory_movements
  for all to anon, authenticated using (true) with check (true);
