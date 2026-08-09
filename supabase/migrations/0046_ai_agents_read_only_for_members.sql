-- =========================================================
-- 0046 — ai_agents: los miembros de la empresa solo pueden leer sus
-- agentes, no crearlos/editarlos. Decisión de producto: el tipo de agente
-- y su prompt los activa y ajusta el equipo Nuxorb desde el admin
-- (CompanyDetail.tsx); el cliente solo ve sus agentes activos y conecta
-- canales (whatsapp_connections sigue abierto a "member all own", eso sí
-- lo gestiona el cliente).
-- =========================================================

drop policy if exists "ai_agents: member all own" on public.ai_agents;
create policy "ai_agents: member read own" on public.ai_agents
  for select to authenticated
  using (is_company_member(company_id));
