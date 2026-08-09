-- =========================================================
-- 0047 — Agentes IA / WhatsApp: migrar de Meta Cloud API directo a YCloud
-- (BSP). Decisión de producto: todos los clientes van a usar la misma
-- cuenta de YCloud de Nuxorb — un solo X-API-Key compartido
-- (YCLOUD_API_KEY, secreto de Edge Function) en vez de un access token de
-- Meta por conexión. Cada conexión ya no necesita credenciales propias,
-- solo el número de WhatsApp (dado de alta en YCloud por el equipo).
-- =========================================================

-- whatsapp_number reemplaza phone_number_id: YCloud identifica los
-- números por el número real (ej. "+525528943531"), no por un
-- phone_number_id de Meta.
alter table public.whatsapp_connections rename column phone_number_id to whatsapp_number;

-- Ya no hace falta guardar credenciales por conexión.
drop table if exists public.whatsapp_credentials;

-- Las conexiones ahora las crea y administra el equipo desde el admin
-- (igual que ai_agents en 0046) — el cliente solo las lee.
drop policy if exists "whatsapp_connections: member all own" on public.whatsapp_connections;
create policy "whatsapp_connections: member read own" on public.whatsapp_connections
  for select to authenticated
  using (is_company_member(company_id));
