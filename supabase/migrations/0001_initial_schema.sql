-- =========================================================
-- 0001 — esquema inicial del CRM
-- profiles, companies, contacts, leads, tasks, notes
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- profiles (espejo de auth.users, un registro por miembro)
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

-- crea el profile automáticamente cuando se invita/crea un usuario.
-- full_name queda en null si no se definió al crear el usuario: el CRM
-- le pide su nombre con un popup obligatorio en su primer inicio de sesión.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------
-- companies
-- ---------------------------------------------------------
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  notes text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- contacts
-- ---------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies (id) on delete set null,
  name text not null,
  email text,
  phone text,
  role_title text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- leads (pipeline / oportunidades)
-- ---------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company_name text,
  company_id uuid references public.companies (id) on delete set null,
  contact_id uuid references public.contacts (id) on delete set null,
  service text,
  message text,
  source text not null default 'manual' check (source in ('web', 'manual')),
  stage text not null default 'nuevo'
    check (stage in ('nuevo', 'contactado', 'calificado', 'propuesta', 'ganado', 'perdido')),
  value numeric,
  assigned_to uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- tasks (estilo Jira)
-- ---------------------------------------------------------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'todo'
    check (status in ('todo', 'in_progress', 'in_review', 'done')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  assignee_id uuid references public.profiles (id),
  reporter_id uuid references public.profiles (id),
  lead_id uuid references public.leads (id) on delete set null,
  company_id uuid references public.companies (id) on delete set null,
  due_date date,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- notes (timeline / comentarios polimórfico)
-- ---------------------------------------------------------
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('lead', 'company', 'task')),
  entity_id uuid not null,
  author_id uuid references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists notes_entity_idx on public.notes (entity_type, entity_id);

-- ---------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;

drop policy if exists "profiles: authenticated select" on public.profiles;
create policy "profiles: authenticated select" on public.profiles
  for select to authenticated using (true);

drop policy if exists "profiles: self update" on public.profiles;
create policy "profiles: self update" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- CRM de equipo compartido: cualquier miembro autenticado puede ver y operar
-- sobre todo. (Esto se cierra a solo el equipo interno en la migración 0004,
-- cuando empiezan a existir cuentas de clientes en el mismo proyecto.)
drop policy if exists "companies: authenticated all" on public.companies;
create policy "companies: authenticated all" on public.companies
  for all to authenticated using (true) with check (true);

drop policy if exists "contacts: authenticated all" on public.contacts;
create policy "contacts: authenticated all" on public.contacts
  for all to authenticated using (true) with check (true);

drop policy if exists "leads: authenticated all" on public.leads;
create policy "leads: authenticated all" on public.leads
  for all to authenticated using (true) with check (true);

drop policy if exists "tasks: authenticated all" on public.tasks;
create policy "tasks: authenticated all" on public.tasks
  for all to authenticated using (true) with check (true);

drop policy if exists "notes: authenticated all" on public.notes;
create policy "notes: authenticated all" on public.notes
  for all to authenticated using (true) with check (true);

-- leads: el formulario público de contacto (rol anon, sin sesión)
-- puede crear leads nuevos, nada más.
drop policy if exists "leads: public insert from website" on public.leads;
create policy "leads: public insert from website" on public.leads
  for insert to anon
  with check (
    source = 'web'
    and stage = 'nuevo'
    and assigned_to is null
    and company_id is null
    and contact_id is null
    and value is null
  );
