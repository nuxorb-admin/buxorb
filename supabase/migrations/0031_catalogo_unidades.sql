-- =========================================================
-- 0031 — catálogo de unidades de medida + configuración por empresa de
-- cuáles mostrar al capturar un producto.
--
-- procurement_units es catálogo global (no por company_id) — son
-- unidades de medida estándar (kg, l, pza…), no algo que cada empresa
-- inventa. Lo que sí es por empresa es qué subconjunto quiere ver: eso
-- vive en procurement_settings.unidades_activas.
-- =========================================================

create table if not exists public.procurement_units (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nombre text not null,
  categoria text not null default 'otro' check (categoria in ('pieza', 'peso', 'volumen', 'longitud', 'otro')),
  orden integer not null default 0
);

alter table public.procurement_units enable row level security;

create policy "procurement_units: read all" on public.procurement_units for select to authenticated using (true);

insert into public.procurement_units (codigo, nombre, categoria, orden) values
  ('pza', 'Pieza', 'pieza', 1),
  ('caja', 'Caja', 'pieza', 2),
  ('paquete', 'Paquete', 'pieza', 3),
  ('docena', 'Docena', 'pieza', 4),
  ('kg', 'Kilogramo', 'peso', 5),
  ('g', 'Gramo', 'peso', 6),
  ('ton', 'Tonelada', 'peso', 7),
  ('l', 'Litro', 'volumen', 8),
  ('ml', 'Mililitro', 'volumen', 9),
  ('m', 'Metro', 'longitud', 10),
  ('cm', 'Centímetro', 'longitud', 11),
  ('m2', 'Metro cuadrado', 'longitud', 12),
  ('m3', 'Metro cúbico', 'volumen', 13)
on conflict (codigo) do nothing;

alter table public.procurement_settings add column if not exists unidades_activas text[] not null default array['pza', 'kg', 'g', 'l', 'ml'];
