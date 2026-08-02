-- =========================================================
-- 0023 — alta libre de categorías (Professional, tesoreria-modulo-v1.md
-- sección 4.3, pendiente hasta ahora). Se agrega `active` en vez de
-- permitir borrar: una categoría desactivada deja de ofrecerse al
-- capturar movimientos nuevos, pero sigue siendo "reconocida" para todo
-- lo ya categorizado con ella (no cae en "Pendiente de clasificar").
-- =========================================================

alter table public.treasury_categories add column if not exists active boolean not null default true;
alter table nuxorb.treasury_category_templates add column if not exists active boolean not null default true;
