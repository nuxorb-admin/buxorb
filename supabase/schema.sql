-- =========================================================
-- Nuxorb CRM — esquema inicial
-- Pega este archivo completo en Supabase → SQL Editor → Run
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- profiles (espejo de auth.users, un registro por miembro)
-- ---------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

-- crea el profile automáticamente cuando se invita/crea un usuario.
-- full_name queda en null si no se definió al crear el usuario: el CRM
-- le pide su nombre con un popup obligatorio en su primer inicio de sesión.
create function public.handle_new_user()
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------
-- companies
-- ---------------------------------------------------------
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  notes text,
  subdomain text unique,
  product_line text not null default 'saas' check (product_line in ('saas', 'crm', 'erp')),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- contacts
-- ---------------------------------------------------------
create table public.contacts (
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
create table public.leads (
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
create table public.tasks (
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
-- company_modules (suscripción de cada cliente a los módulos Nuxorb)
-- ---------------------------------------------------------
create table public.company_modules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  module text not null
    check (module in ('tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc')),
  tier text not null check (tier in ('essential', 'professional', 'enterprise')),
  seats integer not null default 1,
  active boolean not null default true,
  started_at date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, module)
);

-- ---------------------------------------------------------
-- company_addons (productos adicionales contratados por cliente)
-- ---------------------------------------------------------
create table public.company_addons (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  addon text not null check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza'
  )),
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  unique (company_id, addon)
);

-- ---------------------------------------------------------
-- demo_treasury_entries (único módulo funcional del demo del SaaS;
-- lo usan tanto /demo-saas [scope_id = session_id de navegador] como
-- el portal por subdominio de un cliente real [scope_id = company_id])
-- ---------------------------------------------------------
create table public.demo_treasury_entries (
  id uuid primary key default gen_random_uuid(),
  scope_id uuid not null,
  type text not null check (type in ('ingreso', 'egreso')),
  concept text not null,
  category text not null default 'otros',
  amount numeric not null check (amount > 0),
  entry_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index demo_treasury_entries_scope_idx on public.demo_treasury_entries (scope_id);

-- ---------------------------------------------------------
-- notes (timeline / comentarios polimórfico)
-- ---------------------------------------------------------
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('lead', 'company', 'task')),
  entity_id uuid not null,
  author_id uuid references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create index notes_entity_idx on public.notes (entity_type, entity_id);

-- ---------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

create trigger company_modules_set_updated_at
  before update on public.company_modules
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
alter table public.company_modules enable row level security;
alter table public.company_addons enable row level security;
alter table public.demo_treasury_entries enable row level security;

-- profiles: cualquier miembro autenticado puede ver a todo el equipo;
-- cada quien solo edita su propio profile.
create policy "profiles: authenticated select" on public.profiles
  for select to authenticated using (true);

create policy "profiles: self update" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- companies / contacts / leads / tasks / notes:
-- CRM de equipo compartido, cualquier miembro autenticado puede
-- ver y operar sobre todo (como un tablero de Jira compartido).
create policy "companies: authenticated all" on public.companies
  for all to authenticated using (true) with check (true);

create policy "contacts: authenticated all" on public.contacts
  for all to authenticated using (true) with check (true);

create policy "leads: authenticated all" on public.leads
  for all to authenticated using (true) with check (true);

create policy "tasks: authenticated all" on public.tasks
  for all to authenticated using (true) with check (true);

create policy "notes: authenticated all" on public.notes
  for all to authenticated using (true) with check (true);

create policy "company_modules: authenticated all" on public.company_modules
  for all to authenticated using (true) with check (true);

create policy "company_addons: authenticated all" on public.company_addons
  for all to authenticated using (true) with check (true);

-- leads: el formulario público de contacto (rol anon, sin sesión)
-- puede crear leads nuevos, nada más.
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

-- ---------------------------------------------------------
-- Portal por subdominio (sin login): solo empresas que ya son un
-- tenant real (subdomain asignado) son visibles para el rol anon,
-- y solo sus módulos activos.
-- ---------------------------------------------------------
create policy "companies: public read tenant" on public.companies
  for select to anon
  using (subdomain is not null);

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
create policy "demo_treasury_entries: public all" on public.demo_treasury_entries
  for all to anon, authenticated using (true) with check (true);
