-- =========================================================
-- 0045 — company_addons: falta la policy de lectura para miembros de la
-- empresa. La migración 0004 cerró company_addons a solo equipo (igual que
-- company_modules), y le dio a company_modules una policy extra de
-- "member read own" para que el portal del cliente pudiera leer sus
-- propios módulos — pero nunca se agregó el equivalente para
-- company_addons. Por eso "Agentes IA" (el primer addon cuyo estado se lee
-- desde el portal del cliente, no solo desde el admin) se guarda bien
-- desde el admin pero nunca aparece del lado del cliente: RLS le regresa
-- vacío. company_addons vive en el esquema nuxorb desde
-- 0016_nuxorb_schema.sql.
-- =========================================================

drop policy if exists "company_addons: member read own" on nuxorb.company_addons;
create policy "company_addons: member read own" on nuxorb.company_addons
  for select to authenticated
  using (is_team_member() or is_company_member(company_id));
