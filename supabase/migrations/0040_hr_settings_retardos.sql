-- =========================================================
-- 0040 — Gestión de Personal: configuración por empresa. Primer uso: la
-- regla "N retardos = 1 falta" (§5.3 Professional del MD, no construida
-- hasta ahora). retardos_por_falta = 0 significa "regla apagada" (default,
-- y todo Essential se queda así ya que la UI solo la ofrece en
-- Professional).
-- =========================================================

create table if not exists public.hr_settings (
  company_id uuid primary key references nuxorb.companies (id) on delete cascade,
  retardos_por_falta integer not null default 0
);

alter table public.hr_settings enable row level security;

drop policy if exists "hr_settings: team all" on public.hr_settings;
create policy "hr_settings: team all" on public.hr_settings for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "hr_settings: member all own" on public.hr_settings;
create policy "hr_settings: member all own" on public.hr_settings for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));
