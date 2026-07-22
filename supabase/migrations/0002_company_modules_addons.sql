-- =========================================================
-- 0002 — suscripción de cada empresa a los módulos/add-ons de Nuxorb
-- ("Suscripción Nuxorb" en CompanyDetail.tsx)
-- =========================================================

create table if not exists public.company_modules (
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

create table if not exists public.company_addons (
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

drop trigger if exists company_modules_set_updated_at on public.company_modules;
create trigger company_modules_set_updated_at
  before update on public.company_modules
  for each row execute function public.set_updated_at();

alter table public.company_modules enable row level security;
alter table public.company_addons enable row level security;

-- Cerrado a solo equipo interno en la migración 0004.
drop policy if exists "company_modules: authenticated all" on public.company_modules;
create policy "company_modules: authenticated all" on public.company_modules
  for all to authenticated using (true) with check (true);

drop policy if exists "company_addons: authenticated all" on public.company_addons;
create policy "company_addons: authenticated all" on public.company_addons
  for all to authenticated using (true) with check (true);
