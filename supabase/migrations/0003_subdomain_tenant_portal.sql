-- =========================================================
-- 0003 — subdominio por empresa, línea de producto, y el módulo de
-- demo (Tesorería) usado por /demo-saas y por el portal del tenant
-- =========================================================

alter table public.companies add column if not exists subdomain text unique;
alter table public.companies add column if not exists product_line text not null default 'saas'
  check (product_line in ('saas', 'crm', 'erp'));

create table if not exists public.demo_treasury_entries (
  id uuid primary key default gen_random_uuid(),
  scope_id uuid not null,
  type text not null check (type in ('ingreso', 'egreso')),
  concept text not null,
  category text not null default 'otros',
  amount numeric not null check (amount > 0),
  entry_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists demo_treasury_entries_scope_idx on public.demo_treasury_entries (scope_id);

alter table public.demo_treasury_entries enable row level security;

-- Portal por subdominio (sin login todavía en esta migración): solo
-- empresas que ya son un tenant real (subdomain asignado) son visibles
-- para el rol anon, y solo sus módulos activos. El login real del portal
-- se agrega hasta la migración 0004.
drop policy if exists "companies: public read tenant" on public.companies;
create policy "companies: public read tenant" on public.companies
  for select to anon
  using (subdomain is not null);

drop policy if exists "company_modules: public read tenant" on public.company_modules;
create policy "company_modules: public read tenant" on public.company_modules
  for select to anon
  using (
    active = true
    and exists (
      select 1 from public.companies c
      where c.id = company_modules.company_id and c.subdomain is not null
    )
  );

-- demo_treasury_entries: tabla de datos de ejemplo, sin información
-- sensible real. Cualquiera (con o sin sesión) puede leer/escribir;
-- el aislamiento entre demos es solo por scope_id del lado del cliente.
drop policy if exists "demo_treasury_entries: public all" on public.demo_treasury_entries;
create policy "demo_treasury_entries: public all" on public.demo_treasury_entries
  for all to anon, authenticated using (true) with check (true);
