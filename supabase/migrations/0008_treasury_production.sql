-- =========================================================
-- 0008 — Tesorería a nivel producción (Essential + Professional)
--
-- Separado de demo_treasury_entries (que se queda igual, sigue siendo lo
-- que usa /demo-saas con scope_id genérico y RLS abierta). Estas tablas son
-- para clientes reales: company_id explícito y RLS real por empresa,
-- siguiendo el mismo patrón de is_team_member()/is_company_member() ya
-- usado en company_roles/company_users (migración 0004).
-- =========================================================

create table if not exists public.treasury_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  bank_name text,
  last4 text,
  opening_balance numeric not null default 0,
  bank_import_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.treasury_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  kind text not null default 'ambos' check (kind in ('ingreso', 'egreso', 'ambos')),
  created_at timestamptz not null default now(),
  unique (company_id, name)
);

create table if not exists public.treasury_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  account_id uuid not null references public.treasury_accounts (id) on delete cascade,
  type text not null check (type in ('ingreso', 'egreso')),
  concept text not null,
  category text not null default 'otros',
  amount numeric not null check (amount > 0),
  entry_date date not null default current_date,
  source text not null default 'manual' check (source in ('manual', 'csv_import', 'bank_import', 'ai_statement')),
  reconciled boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.treasury_statement_imports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  account_id uuid references public.treasury_accounts (id) on delete set null,
  period_month date not null default date_trunc('month', current_date),
  method text not null check (method in ('manual', 'ai')),
  file_name text,
  status text not null default 'uploaded' check (status in ('uploaded', 'reviewed')),
  extracted_count integer not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists treasury_accounts_company_idx on public.treasury_accounts (company_id);
create index if not exists treasury_categories_company_idx on public.treasury_categories (company_id);
create index if not exists treasury_movements_company_idx on public.treasury_movements (company_id);
create index if not exists treasury_movements_account_idx on public.treasury_movements (account_id);
create index if not exists treasury_statement_imports_company_idx on public.treasury_statement_imports (company_id, period_month);

alter table public.treasury_accounts enable row level security;
alter table public.treasury_categories enable row level security;
alter table public.treasury_movements enable row level security;
alter table public.treasury_statement_imports enable row level security;

-- ---------------------------------------------------------
-- RLS: equipo interno todo; miembro de la empresa lee/escribe lo suyo.
-- ---------------------------------------------------------
drop policy if exists "treasury_accounts: team all" on public.treasury_accounts;
create policy "treasury_accounts: team all" on public.treasury_accounts
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "treasury_accounts: member all own" on public.treasury_accounts;
create policy "treasury_accounts: member all own" on public.treasury_accounts
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

drop policy if exists "treasury_categories: team all" on public.treasury_categories;
create policy "treasury_categories: team all" on public.treasury_categories
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "treasury_categories: member all own" on public.treasury_categories;
create policy "treasury_categories: member all own" on public.treasury_categories
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

drop policy if exists "treasury_movements: team all" on public.treasury_movements;
create policy "treasury_movements: team all" on public.treasury_movements
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "treasury_movements: member all own" on public.treasury_movements;
create policy "treasury_movements: member all own" on public.treasury_movements
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

drop policy if exists "treasury_statement_imports: team all" on public.treasury_statement_imports;
create policy "treasury_statement_imports: team all" on public.treasury_statement_imports
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "treasury_statement_imports: member all own" on public.treasury_statement_imports;
create policy "treasury_statement_imports: member all own" on public.treasury_statement_imports
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));
