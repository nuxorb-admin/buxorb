-- =========================================================
-- 0004 — usuarios y roles por empresa (login real del portal del
-- tenant) + cierre obligatorio de las políticas RLS "authenticated all"
--
-- A partir de esta migración existen cuentas de Supabase Auth para
-- clientes (no solo para el equipo interno de Nuxorb), así que toda
-- policy que antes decía "to authenticated using (true)" deja de ser
-- segura — se reemplaza por is_team_member().
-- =========================================================

alter table public.profiles add column if not exists kind text not null default 'team'
  check (kind in ('team', 'client'));

create or replace function public.is_team_member()
returns boolean
language sql stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and kind = 'team');
$$;

alter table public.companies add column if not exists max_users integer not null default 3;

-- ---------------------------------------------------------
-- company_roles / company_role_modules / company_users
-- ---------------------------------------------------------
create table if not exists public.company_roles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (company_id, name)
);

create table if not exists public.company_role_modules (
  role_id uuid not null references public.company_roles (id) on delete cascade,
  module text not null
    check (module in ('tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc')),
  primary key (role_id, module)
);

create table if not exists public.company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role_id uuid references public.company_roles (id) on delete set null,
  is_owner boolean not null default false,
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create or replace function public.is_company_owner(target_company_id uuid)
returns boolean
language sql stable
as $$
  select exists (
    select 1 from public.company_users
    where company_id = target_company_id and user_id = auth.uid() and is_owner = true
  );
$$;

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql stable
as $$
  select exists (
    select 1 from public.company_users
    where company_id = target_company_id and user_id = auth.uid()
  );
$$;

alter table public.company_roles enable row level security;
alter table public.company_role_modules enable row level security;
alter table public.company_users enable row level security;

-- ---------------------------------------------------------
-- Cierre de las policies compartidas: solo equipo interno
-- ---------------------------------------------------------
drop policy if exists "companies: authenticated all" on public.companies;
drop policy if exists "companies: team all" on public.companies;
create policy "companies: team all" on public.companies
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "contacts: authenticated all" on public.contacts;
drop policy if exists "contacts: team all" on public.contacts;
create policy "contacts: team all" on public.contacts
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "leads: authenticated all" on public.leads;
drop policy if exists "leads: team all" on public.leads;
create policy "leads: team all" on public.leads
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "tasks: authenticated all" on public.tasks;
drop policy if exists "tasks: team all" on public.tasks;
create policy "tasks: team all" on public.tasks
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "notes: authenticated all" on public.notes;
drop policy if exists "notes: team all" on public.notes;
create policy "notes: team all" on public.notes
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "company_modules: authenticated all" on public.company_modules;
drop policy if exists "company_modules: team all" on public.company_modules;
create policy "company_modules: team all" on public.company_modules
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "company_addons: authenticated all" on public.company_addons;
drop policy if exists "company_addons: team all" on public.company_addons;
create policy "company_addons: team all" on public.company_addons
  for all to authenticated using (is_team_member()) with check (is_team_member());

-- company_modules: además de la lectura pública para el login del portal
-- (migración 0003), un usuario ya logueado de esa empresa puede leer sus
-- propios módulos (para calcular qué ve, cruzado con los módulos de su rol).
drop policy if exists "company_modules: member read own" on public.company_modules;
create policy "company_modules: member read own" on public.company_modules
  for select to authenticated
  using (is_team_member() or is_company_member(company_id));

-- ---------------------------------------------------------
-- Policies de company_roles / company_role_modules / company_users
-- ---------------------------------------------------------
drop policy if exists "company_roles: team all" on public.company_roles;
create policy "company_roles: team all" on public.company_roles
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "company_roles: member read own" on public.company_roles;
create policy "company_roles: member read own" on public.company_roles
  for select to authenticated using (is_company_member(company_id));

drop policy if exists "company_roles: owner write own" on public.company_roles;
create policy "company_roles: owner write own" on public.company_roles
  for all to authenticated
  using (is_company_owner(company_id))
  with check (is_company_owner(company_id));

drop policy if exists "company_role_modules: team all" on public.company_role_modules;
create policy "company_role_modules: team all" on public.company_role_modules
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "company_role_modules: member read own" on public.company_role_modules;
create policy "company_role_modules: member read own" on public.company_role_modules
  for select to authenticated
  using (exists (
    select 1 from public.company_roles r
    where r.id = company_role_modules.role_id and is_company_member(r.company_id)
  ));

drop policy if exists "company_role_modules: owner write own" on public.company_role_modules;
create policy "company_role_modules: owner write own" on public.company_role_modules
  for all to authenticated
  using (exists (
    select 1 from public.company_roles r
    where r.id = company_role_modules.role_id and is_company_owner(r.company_id)
  ))
  with check (exists (
    select 1 from public.company_roles r
    where r.id = company_role_modules.role_id and is_company_owner(r.company_id)
  ));

drop policy if exists "company_users: team all" on public.company_users;
create policy "company_users: team all" on public.company_users
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "company_users: member read own" on public.company_users;
create policy "company_users: member read own" on public.company_users
  for select to authenticated using (is_company_member(company_id));

drop policy if exists "company_users: owner write own" on public.company_users;
create policy "company_users: owner write own" on public.company_users
  for all to authenticated
  using (is_company_owner(company_id))
  with check (is_company_owner(company_id));
