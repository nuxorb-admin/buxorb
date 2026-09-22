-- =========================================================
-- 0063 — Línea de negocio "Citas": tablas operativas.
-- Prefijo ldn_citas_ (ver 0051 para la convención de nombres y 0062 para
-- la activación en ldn_company_business_lines).
--
-- El catálogo de servicios reusa public.sales_products_services (igual
-- que ldn_restaurant_menu_items con el menú) en vez de duplicarlo —
-- ldn_citas_services es solo la duración sobre esa fila compartida. Citas
-- requiere Ventas y CxC activo, validado en el admin al asignar el nivel
-- (BUSINESS_LINE_REQUIRES en CompanyDetail.tsx), no aquí.
--
-- "Quién atiende" es un login de la empresa (auth.users vía company_users),
-- no un hr_employee — mismo criterio que ldn_restaurant_orders.mesero_id,
-- para que un negocio chico no necesite Gestión de Personal solo para
-- agendar.
--
-- RLS: team all + member all own en las 4 tablas — el cliente opera esto
-- él mismo día a día, mismo patrón que Restaurantes.
-- =========================================================

create extension if not exists btree_gist;

-- ---------------------------------------------------------
-- ldn_citas_services
-- ---------------------------------------------------------
create table if not exists public.ldn_citas_services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  sales_product_id uuid not null references public.sales_products_services (id) on delete cascade,
  duracion_minutos integer not null check (duracion_minutos > 0),
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  unique (company_id, sales_product_id)
);

create index if not exists ldn_citas_services_company_idx on public.ldn_citas_services (company_id);

alter table public.ldn_citas_services enable row level security;

drop policy if exists "ldn_citas_services: team all" on public.ldn_citas_services;
create policy "ldn_citas_services: team all" on public.ldn_citas_services for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_citas_services: member all own" on public.ldn_citas_services;
create policy "ldn_citas_services: member all own" on public.ldn_citas_services for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));

-- ---------------------------------------------------------
-- ldn_citas_service_employees — vacío para un servicio = cualquiera puede darlo
-- ---------------------------------------------------------
create table if not exists public.ldn_citas_service_employees (
  service_id uuid not null references public.ldn_citas_services (id) on delete cascade,
  empleado_id uuid not null references auth.users (id) on delete cascade,
  primary key (service_id, empleado_id)
);

alter table public.ldn_citas_service_employees enable row level security;

drop policy if exists "ldn_citas_service_employees: team all" on public.ldn_citas_service_employees;
create policy "ldn_citas_service_employees: team all" on public.ldn_citas_service_employees for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_citas_service_employees: member all own" on public.ldn_citas_service_employees;
create policy "ldn_citas_service_employees: member all own" on public.ldn_citas_service_employees for all to authenticated
  using (exists (select 1 from public.ldn_citas_services s where s.id = ldn_citas_service_employees.service_id and is_company_member(s.company_id)))
  with check (exists (select 1 from public.ldn_citas_services s where s.id = ldn_citas_service_employees.service_id and is_company_member(s.company_id)));

-- ---------------------------------------------------------
-- ldn_citas_schedules — horario semanal recurrente por empleado
-- ---------------------------------------------------------
create table if not exists public.ldn_citas_schedules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  empleado_id uuid not null references auth.users (id) on delete cascade,
  dia_semana smallint not null check (dia_semana between 0 and 6),
  hora_inicio time not null,
  hora_fin time not null check (hora_fin > hora_inicio),
  created_at timestamptz not null default now()
);

create index if not exists ldn_citas_schedules_empleado_idx on public.ldn_citas_schedules (empleado_id, dia_semana);

alter table public.ldn_citas_schedules enable row level security;

drop policy if exists "ldn_citas_schedules: team all" on public.ldn_citas_schedules;
create policy "ldn_citas_schedules: team all" on public.ldn_citas_schedules for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_citas_schedules: member all own" on public.ldn_citas_schedules;
create policy "ldn_citas_schedules: member all own" on public.ldn_citas_schedules for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));

-- ---------------------------------------------------------
-- ldn_citas_appointments
-- ---------------------------------------------------------
create table if not exists public.ldn_citas_appointments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  service_id uuid not null references public.ldn_citas_services (id) on delete restrict,
  empleado_id uuid references auth.users (id) on delete set null,
  cliente_nombre text not null,
  telefono text,
  fecha_hora_inicio timestamptz not null,
  fecha_hora_fin timestamptz not null check (fecha_hora_fin > fecha_hora_inicio),
  estado text not null default 'confirmada' check (estado in ('pendiente', 'confirmada', 'cancelada', 'completada', 'no_asistio')),
  notas text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  -- Ningún empleado puede tener dos citas traslapadas — a nivel de base de
  -- datos, no solo en la UI, para que sobreviva a escrituras concurrentes.
  -- Una cita "cualquiera disponible" (empleado_id null) no choca con nada
  -- hasta que se le asigne alguien. Cancelada no cuenta como ocupado.
  exclude using gist (
    empleado_id with =,
    tstzrange(fecha_hora_inicio, fecha_hora_fin) with &&
  ) where (empleado_id is not null and estado <> 'cancelada')
);

create index if not exists ldn_citas_appointments_company_idx on public.ldn_citas_appointments (company_id, fecha_hora_inicio);
create index if not exists ldn_citas_appointments_empleado_idx on public.ldn_citas_appointments (empleado_id, fecha_hora_inicio);

alter table public.ldn_citas_appointments enable row level security;

drop policy if exists "ldn_citas_appointments: team all" on public.ldn_citas_appointments;
create policy "ldn_citas_appointments: team all" on public.ldn_citas_appointments for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_citas_appointments: member all own" on public.ldn_citas_appointments;
create policy "ldn_citas_appointments: member all own" on public.ldn_citas_appointments for all to authenticated
  using (is_company_member(company_id)) with check (is_company_member(company_id));
