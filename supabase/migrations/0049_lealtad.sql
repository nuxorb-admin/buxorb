-- =========================================================
-- 0049 — Producto adicional "Lealtad", v1: tarjeta de sellos en Google
-- Wallet. Ver docs/lealtad-rollback.md y
-- supabase/migrations/rollback/0049_lealtad_rollback.sql si hay que
-- deshacer esto.
--
-- A diferencia de Agentes IA, aquí el cliente configura su propia tarjeta
-- desde su portal (logo, plantilla, sellos requeridos, premio) — por eso
-- las policies de member son "for all", no solo lectura.
-- =========================================================

create table if not exists public.loyalty_programs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  name text not null default 'Tarjeta de lealtad',
  template_key text not null default 'clasica' check (template_key in ('clasica', 'moderna', 'minimal')),
  logo_path text,
  stamps_required integer not null default 5 check (stamps_required > 0),
  reward_text text not null default 'Producto gratis',
  google_class_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id)
);

create table if not exists public.loyalty_members (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.loyalty_programs (id) on delete cascade,
  name text not null,
  email text,
  phone text not null,
  stamps integer not null default 0,
  google_object_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, phone)
);

create index if not exists loyalty_members_program_idx on public.loyalty_members (program_id);

alter table public.loyalty_programs enable row level security;
alter table public.loyalty_members enable row level security;

drop policy if exists "loyalty_programs: team all" on public.loyalty_programs;
create policy "loyalty_programs: team all" on public.loyalty_programs for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "loyalty_programs: member all own" on public.loyalty_programs;
create policy "loyalty_programs: member all own" on public.loyalty_programs for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "loyalty_members: team all" on public.loyalty_members;
create policy "loyalty_members: team all" on public.loyalty_members for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "loyalty_members: member all own" on public.loyalty_members;
create policy "loyalty_members: member all own" on public.loyalty_members for all to authenticated
  using (exists (select 1 from public.loyalty_programs p where p.id = loyalty_members.program_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.loyalty_programs p where p.id = loyalty_members.program_id and is_company_member(p.company_id)));

-- ---------------------------------------------------------
-- Registrar el addon en el catálogo de company_addons (Productos
-- adicionales en CompanyDetail.tsx). company_addons vive en el esquema
-- nuxorb desde 0016_nuxorb_schema.sql.
-- ---------------------------------------------------------
alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza',
    'agentes_ia', 'lealtad'
  ));
