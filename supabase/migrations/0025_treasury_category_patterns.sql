-- =========================================================
-- 0025 — motor de sugerencia por patrón (tesoreria-modulo-v1.md sección
-- 4.5, `patron_categoria`). Aprende de las categorías que el usuario ya
-- asignó a descripciones parecidas, para sugerirlas automáticamente la
-- próxima vez, tanto en captura manual como en importación.
-- =========================================================

create table if not exists public.treasury_category_patterns (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  texto_patron text not null,
  category text not null,
  frecuencia_uso integer not null default 1,
  updated_at timestamptz not null default now(),
  unique (company_id, texto_patron)
);

create index if not exists treasury_category_patterns_company_idx on public.treasury_category_patterns (company_id);

alter table public.treasury_category_patterns enable row level security;

create policy "treasury_category_patterns: team all" on public.treasury_category_patterns
  for all to authenticated using (is_team_member()) with check (is_team_member());

create policy "treasury_category_patterns: member all own" on public.treasury_category_patterns
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));
