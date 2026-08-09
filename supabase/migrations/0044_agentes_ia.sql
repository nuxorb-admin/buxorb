-- =========================================================
-- 0044 — Producto adicional "Agentes IA", v1: catálogo de tipos de agente
-- + canal WhatsApp (API oficial de Meta). Ver docs/agentes-ia-rollback.md
-- y supabase/migrations/rollback/0044_agentes_ia_rollback.sql si hay que
-- deshacer esto.
--
-- Dos ejes separados a propósito (decisión de producto): el TIPO de
-- agente (qué sabe hacer — ai_agents, copiado de un catálogo maestro) es
-- independiente del CANAL por el que le hablan (whatsapp_connections). Un
-- mismo agente se podrá asignar a más de un canal más adelante (redes,
-- correo) sin tocar este esquema.
--
-- Todo nuevo — no se modifica ninguna tabla existente salvo ampliar el
-- check de company_addons.addon (se agrega 'agentes_ia', no se quita nada).
-- =========================================================

-- ---------------------------------------------------------
-- Catálogo maestro de tipos de agente — solo Nuxorb lo edita, cualquier
-- empresa autenticada lo lee (mismo patrón que concepto_nomina/tabla_fiscal
-- en 0013_gestion_personal.sql). Al "contratar" un tipo, el cliente recibe
-- su propia fila editable en ai_agents con el prompt copiado de aquí.
-- ---------------------------------------------------------
create table if not exists nuxorb.ai_agent_type_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  default_prompt text not null,
  created_at timestamptz not null default now()
);

insert into nuxorb.ai_agent_type_templates (key, name, description, default_prompt) values
  ('citas', 'Agendar citas', 'Agenda, confirma y cancela citas por WhatsApp.',
   'Eres el asistente de agenda de este negocio. Ayuda a los clientes a agendar, confirmar o cancelar citas. Pregunta día y hora deseados, confirma disponibilidad y repite los datos antes de cerrar.'),
  ('pedidos', 'Pedidos y envíos', 'Toma pedidos y datos de envío por WhatsApp.',
   'Eres el asistente de ventas de este negocio. Ayuda a los clientes a levantar su pedido: qué productos quieren, cantidad, y su dirección de envío. Confirma el pedido completo antes de cerrar.'),
  ('faq', 'Preguntas del lugar', 'Responde horarios, ubicación, precios y dudas frecuentes.',
   'Eres el asistente de este negocio. Responde con la información del negocio: horarios, ubicación, precios y preguntas frecuentes. Si no sabes algo, dilo claramente en vez de inventar.'),
  ('interno', 'Agente interno', 'Asistente para el dueño/staff — consultas internas (stock, avisos, agenda).',
   'Eres el asistente interno de este negocio, solo hablas con el dueño o el staff. Ayuda a consultar información interna como inventario, avisos o la agenda del día.')
on conflict (key) do nothing;

alter table nuxorb.ai_agent_type_templates enable row level security;
drop policy if exists "ai_agent_type_templates: team write" on nuxorb.ai_agent_type_templates;
create policy "ai_agent_type_templates: team write" on nuxorb.ai_agent_type_templates for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ai_agent_type_templates: authenticated read" on nuxorb.ai_agent_type_templates;
create policy "ai_agent_type_templates: authenticated read" on nuxorb.ai_agent_type_templates for select to authenticated using (true);

-- ---------------------------------------------------------
-- Agentes de cada empresa — su propia copia editable de un tipo del
-- catálogo. type_key es solo referencia informativa (de qué plantilla
-- partió), el prompt real que se usa siempre es el de esta tabla.
-- ---------------------------------------------------------
create table if not exists public.ai_agents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  type_key text references nuxorb.ai_agent_type_templates (key) on delete set null,
  name text not null,
  system_prompt text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Canal WhatsApp — una conexión = un número de WhatsApp Business (API
-- oficial de Meta) de la empresa, asignado a uno de sus agentes.
-- ---------------------------------------------------------
create table if not exists public.whatsapp_connections (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  agent_id uuid references public.ai_agents (id) on delete set null,
  display_name text not null,
  phone_number_id text,
  status text not null default 'conectando' check (status in ('conectando', 'conectado', 'error')),
  created_at timestamptz not null default now()
);

-- Credenciales reales (access token de Meta) — separadas a propósito de
-- whatsapp_connections. Sin ninguna policy para authenticated/anon: ni el
-- equipo ni el cliente las leen por PostgREST, solo las Edge Functions con
-- la service role key (que ignora RLS por completo).
create table if not exists public.whatsapp_credentials (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null unique references public.whatsapp_connections (id) on delete cascade,
  access_token text not null,
  waba_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.whatsapp_contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  phone text not null,
  name text,
  created_at timestamptz not null default now(),
  unique (company_id, phone)
);

create table if not exists public.whatsapp_conversations (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.whatsapp_connections (id) on delete cascade,
  contact_id uuid not null references public.whatsapp_contacts (id) on delete cascade,
  mode text not null default 'bot' check (mode in ('bot', 'humano')),
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.whatsapp_conversations (id) on delete cascade,
  direction text not null check (direction in ('in', 'out')),
  text text,
  external_id text,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_conversations_connection_idx on public.whatsapp_conversations (connection_id);
create index if not exists whatsapp_messages_conversation_idx on public.whatsapp_messages (conversation_id, created_at);

-- ---------------------------------------------------------
-- RLS — mismo patrón que el resto de módulos: equipo todo, miembro de la
-- empresa todo lo de su empresa. Tablas sin company_id directo se validan
-- vía la tabla padre.
-- ---------------------------------------------------------

alter table public.ai_agents enable row level security;
alter table public.whatsapp_connections enable row level security;
alter table public.whatsapp_credentials enable row level security;
alter table public.whatsapp_contacts enable row level security;
alter table public.whatsapp_conversations enable row level security;
alter table public.whatsapp_messages enable row level security;

drop policy if exists "ai_agents: team all" on public.ai_agents;
create policy "ai_agents: team all" on public.ai_agents for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ai_agents: member all own" on public.ai_agents;
create policy "ai_agents: member all own" on public.ai_agents for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "whatsapp_connections: team all" on public.whatsapp_connections;
create policy "whatsapp_connections: team all" on public.whatsapp_connections for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "whatsapp_connections: member all own" on public.whatsapp_connections;
create policy "whatsapp_connections: member all own" on public.whatsapp_connections for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

-- whatsapp_credentials: sin policies para authenticated/anon a propósito —
-- ver comentario arriba de la tabla. Solo RLS habilitado, cero policies.

drop policy if exists "whatsapp_contacts: team all" on public.whatsapp_contacts;
create policy "whatsapp_contacts: team all" on public.whatsapp_contacts for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "whatsapp_contacts: member all own" on public.whatsapp_contacts;
create policy "whatsapp_contacts: member all own" on public.whatsapp_contacts for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "whatsapp_conversations: team all" on public.whatsapp_conversations;
create policy "whatsapp_conversations: team all" on public.whatsapp_conversations for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "whatsapp_conversations: member all own" on public.whatsapp_conversations;
create policy "whatsapp_conversations: member all own" on public.whatsapp_conversations for all to authenticated
  using (exists (select 1 from public.whatsapp_connections c where c.id = whatsapp_conversations.connection_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.whatsapp_connections c where c.id = whatsapp_conversations.connection_id and is_company_member(c.company_id)));

drop policy if exists "whatsapp_messages: team all" on public.whatsapp_messages;
create policy "whatsapp_messages: team all" on public.whatsapp_messages for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "whatsapp_messages: member all own" on public.whatsapp_messages;
create policy "whatsapp_messages: member all own" on public.whatsapp_messages for all to authenticated
  using (exists (
    select 1 from public.whatsapp_conversations conv join public.whatsapp_connections c on c.id = conv.connection_id
    where conv.id = whatsapp_messages.conversation_id and is_company_member(c.company_id)
  ))
  with check (exists (
    select 1 from public.whatsapp_conversations conv join public.whatsapp_connections c on c.id = conv.connection_id
    where conv.id = whatsapp_messages.conversation_id and is_company_member(c.company_id)
  ));

-- ---------------------------------------------------------
-- Registrar el addon en el catálogo de company_addons (Productos
-- adicionales en CompanyDetail.tsx). company_addons vive en el esquema
-- nuxorb desde 0016_nuxorb_schema.sql, no en public.
-- ---------------------------------------------------------
alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza',
    'agentes_ia'
  ));
