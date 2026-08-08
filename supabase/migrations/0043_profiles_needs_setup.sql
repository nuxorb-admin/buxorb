-- =========================================================
-- 0043 — marca si una cuenta cliente todavía tiene que completar su
-- registro (poner su correo real + su propia contraseña) antes de usar el
-- portal. create-company-user la prende al crear cualquier usuario
-- kind='client'; la Edge Function complete-first-login es la única que la
-- apaga, y solo para el usuario que llama a sí mismo.
-- =========================================================

alter table nuxorb.profiles add column if not exists needs_setup boolean not null default false;
