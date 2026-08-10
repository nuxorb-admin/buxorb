-- =========================================================
-- ROLLBACK de 0049_lealtad.sql y 0050_loyalty_logos_storage.sql — NO forma
-- parte de la secuencia normal de migraciones, no se aplica con `db push`.
-- Correr a mano en el SQL Editor de Supabase solo si se decide dar marcha
-- atrás al producto adicional "Lealtad". Ver docs/lealtad-rollback.md para
-- la lista de archivos de código a revertir junto con esto.
-- =========================================================

-- 1) Quitar cualquier empresa que ya haya activado el addon, antes de
--    angostar el check (si no, el check fallaría con filas existentes).
delete from nuxorb.company_addons where addon = 'lealtad';

alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza',
    'agentes_ia'
  ));

-- 2) Tablas nuevas, hijas primero.
drop table if exists public.loyalty_members;
drop table if exists public.loyalty_programs;

-- 3) Bucket de Storage y sus policies.
drop policy if exists "loyalty-logos: team all" on storage.objects;
drop policy if exists "loyalty-logos: member all own" on storage.objects;
drop policy if exists "loyalty-logos: public read" on storage.objects;
delete from storage.objects where bucket_id = 'loyalty-logos';
delete from storage.buckets where id = 'loyalty-logos';
