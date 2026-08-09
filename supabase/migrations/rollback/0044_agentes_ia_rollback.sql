-- =========================================================
-- ROLLBACK de 0044_agentes_ia.sql — NO forma parte de la secuencia normal
-- de migraciones (por eso vive en su propia carpeta rollback/, no se
-- aplica solo con `db push`). Correr a mano en el SQL Editor de Supabase
-- solo si se decide dar marcha atrás al producto adicional "Agentes IA".
--
-- Deshace exactamente lo que hizo 0044: las 7 tablas nuevas y la
-- ampliación del check de company_addons.addon. No toca nada más del
-- proyecto — ver docs/agentes-ia-rollback.md para la lista de archivos de
-- código a revertir junto con esto.
-- =========================================================

-- 1) Quitar cualquier empresa que ya haya activado el addon, antes de
--    angostar el check (si no, el check fallaría con filas existentes).
-- company_addons vive en el esquema nuxorb desde 0016_nuxorb_schema.sql.
delete from nuxorb.company_addons where addon = 'agentes_ia';

alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza'
  ));

-- 2) Tablas nuevas, en orden de dependencia (hijas primero).
drop table if exists public.whatsapp_messages;
drop table if exists public.whatsapp_conversations;
drop table if exists public.whatsapp_contacts;
drop table if exists public.whatsapp_credentials;
drop table if exists public.whatsapp_connections;
drop table if exists public.ai_agents;
drop table if exists nuxorb.ai_agent_type_templates;
