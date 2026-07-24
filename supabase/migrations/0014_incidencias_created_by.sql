-- =========================================================
-- 0014 — la migración 0013 ya se había corrido cuando se le agregó
-- `created_by` a `incidencias` (para el flujo de aprobación de vacaciones/
-- permisos de Professional) — se agrega aquí en vez de editar 0013 de nuevo,
-- ya aplicada.
-- =========================================================

alter table public.incidencias
  add column if not exists created_by uuid references public.profiles (id) on delete set null;
