-- =========================================================
-- 0051 — Líneas de negocio, v1: activación de la línea "Restaurantes".
-- Tercer eje de producto, distinto a Suscripción Nuxorb (company_modules,
-- 4 módulos fijos con nivel cada uno) y Productos adicionales
-- (company_addons, on/off). Una línea de negocio es una suite completa
-- por giro (restaurantes, y a futuro otros), empaquetada como UN nivel
-- por línea, no por módulo individual dentro de ella.
--
-- Convención de nombres pedida por el negocio: todas las tablas de este
-- eje llevan el prefijo ldn_ (Líneas de negocio), y dentro de él el
-- prefijo de la línea específica (ldn_restaurant_* aquí, a futuro
-- ldn_peluqueria_* etc.) — ver 0052 para las tablas operativas.
-- =========================================================

create table if not exists nuxorb.ldn_company_business_lines (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  business_line text not null check (business_line in ('restaurantes')),
  tier text not null check (tier in ('essential', 'professional', 'enterprise')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, business_line)
);

drop trigger if exists ldn_company_business_lines_set_updated_at on nuxorb.ldn_company_business_lines;
create trigger ldn_company_business_lines_set_updated_at
  before update on nuxorb.ldn_company_business_lines
  for each row execute function public.set_updated_at();

alter table nuxorb.ldn_company_business_lines enable row level security;

drop policy if exists "ldn_company_business_lines: team all" on nuxorb.ldn_company_business_lines;
create policy "ldn_company_business_lines: team all" on nuxorb.ldn_company_business_lines
  for all to authenticated using (is_team_member()) with check (is_team_member());

-- A diferencia de company_addons (donde esta policy se agregó tarde y
-- causó que "Lealtad" nunca apareciera del lado del cliente — ver
-- 0045_company_addons_member_read.sql), aquí se agrega desde el inicio.
drop policy if exists "ldn_company_business_lines: member read own" on nuxorb.ldn_company_business_lines;
create policy "ldn_company_business_lines: member read own" on nuxorb.ldn_company_business_lines
  for select to authenticated using (is_company_member(company_id));
