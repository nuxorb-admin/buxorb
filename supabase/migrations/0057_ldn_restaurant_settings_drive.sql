-- =========================================================
-- 0057 — Líneas de negocio / Restaurantes: carpeta de Google Drive por
-- empresa para las fotos de platillos.
--
-- Al activar Restaurantes para una empresa (CompanyDetail.tsx), se llama
-- a la Edge Function create-restaurant-drive-folder, que crea una
-- subcarpeta con el nombre de la empresa dentro del Shared Drive
-- "Restaurantes" de Nuxorb (Google Workspace) y guarda su id aquí. Subir
-- una foto desde Menú (upload-menu-item-photo) sube el archivo a esa
-- carpeta.
--
-- Tabla solo para uso interno de las Edge Functions (service role) — sin
-- policy de miembro, el cliente nunca la consulta directo.
-- =========================================================

create table if not exists public.ldn_restaurant_settings (
  company_id uuid primary key references nuxorb.companies (id) on delete cascade,
  drive_folder_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists ldn_restaurant_settings_set_updated_at on public.ldn_restaurant_settings;
create trigger ldn_restaurant_settings_set_updated_at
  before update on public.ldn_restaurant_settings
  for each row execute function public.set_updated_at();

alter table public.ldn_restaurant_settings enable row level security;

drop policy if exists "ldn_restaurant_settings: team all" on public.ldn_restaurant_settings;
create policy "ldn_restaurant_settings: team all" on public.ldn_restaurant_settings for all to authenticated using (is_team_member()) with check (is_team_member());
