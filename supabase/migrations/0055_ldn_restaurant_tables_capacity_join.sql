-- =========================================================
-- 0055 — Líneas de negocio / Restaurantes: capacidad y "juntar mesas".
--   - capacidad: cuántas personas caben en la mesa (informativo).
--   - joined_to: si esta mesa está unida a otra para un grupo grande, la
--     mesa "principal" que concentra la comanda real. La mesa unida no
--     tiene su propia orden — al abrir la comanda del grupo, solo la
--     principal recibe la fila en ldn_restaurant_orders; las demás quedan
--     ocupadas y apuntando a ella (ver ComandasTab.tsx "unir mesas").
--     close-restaurant-ticket libera principal + unidas juntas al cerrar.
-- =========================================================

alter table public.ldn_restaurant_tables add column if not exists capacidad integer not null default 4;
alter table public.ldn_restaurant_tables add column if not exists joined_to uuid references public.ldn_restaurant_tables (id) on delete set null;

alter table public.ldn_restaurant_tables drop constraint if exists ldn_restaurant_tables_joined_to_not_self_check;
alter table public.ldn_restaurant_tables add constraint ldn_restaurant_tables_joined_to_not_self_check
  check (joined_to is null or joined_to <> id);

create index if not exists ldn_restaurant_tables_joined_to_idx on public.ldn_restaurant_tables (joined_to);
