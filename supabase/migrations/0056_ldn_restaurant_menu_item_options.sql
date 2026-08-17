-- =========================================================
-- 0056 — Líneas de negocio / Restaurantes: opciones/modificadores de
-- platillo (ej. "Clamato" con grupo "Elige tu cerveza": Corona/Modelo/
-- Tecate) y comentario libre por platillo agregado a una comanda.
--
-- v1: un grupo de opciones siempre es de selección única (radio, no
-- checkboxes de varias), sin costo extra por opción — decisión de
-- producto para no complicar la captura ni el cálculo de totales.
-- Cada grupo puede marcarse obligatorio (hay que elegir una opción antes
-- de poder agregar el platillo) u opcional.
--
-- ldn_restaurant_order_item_options guarda nombre_snapshot además del
-- FK a la opción — si el negocio borra/renombra una opción después, el
-- pedido histórico conserva lo que el cliente eligió en su momento.
-- =========================================================

create table if not exists public.ldn_restaurant_menu_item_option_groups (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid not null references public.ldn_restaurant_menu_items (id) on delete cascade,
  nombre text not null,
  obligatorio boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.ldn_restaurant_menu_item_options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.ldn_restaurant_menu_item_option_groups (id) on delete cascade,
  nombre text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.ldn_restaurant_order_item_options (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.ldn_restaurant_order_items (id) on delete cascade,
  option_id uuid references public.ldn_restaurant_menu_item_options (id) on delete set null,
  nombre_snapshot text not null,
  created_at timestamptz not null default now()
);

create index if not exists ldn_restaurant_menu_item_option_groups_menu_item_idx on public.ldn_restaurant_menu_item_option_groups (menu_item_id);
create index if not exists ldn_restaurant_menu_item_options_group_idx on public.ldn_restaurant_menu_item_options (group_id);
create index if not exists ldn_restaurant_order_item_options_order_item_idx on public.ldn_restaurant_order_item_options (order_item_id);

-- ---------------------------------------------------------
-- RLS — mismo patrón team all + member all own que el resto de
-- Restaurantes, unido a través de menu_items/order_items para llegar a
-- company_id (estas tres tablas no lo tienen directo).
-- ---------------------------------------------------------
alter table public.ldn_restaurant_menu_item_option_groups enable row level security;
alter table public.ldn_restaurant_menu_item_options enable row level security;
alter table public.ldn_restaurant_order_item_options enable row level security;

drop policy if exists "ldn_restaurant_menu_item_option_groups: team all" on public.ldn_restaurant_menu_item_option_groups;
create policy "ldn_restaurant_menu_item_option_groups: team all" on public.ldn_restaurant_menu_item_option_groups for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_menu_item_option_groups: member all own" on public.ldn_restaurant_menu_item_option_groups;
create policy "ldn_restaurant_menu_item_option_groups: member all own" on public.ldn_restaurant_menu_item_option_groups for all to authenticated
  using (exists (select 1 from public.ldn_restaurant_menu_items mi where mi.id = ldn_restaurant_menu_item_option_groups.menu_item_id and is_company_member(mi.company_id)))
  with check (exists (select 1 from public.ldn_restaurant_menu_items mi where mi.id = ldn_restaurant_menu_item_option_groups.menu_item_id and is_company_member(mi.company_id)));

drop policy if exists "ldn_restaurant_menu_item_options: team all" on public.ldn_restaurant_menu_item_options;
create policy "ldn_restaurant_menu_item_options: team all" on public.ldn_restaurant_menu_item_options for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_menu_item_options: member all own" on public.ldn_restaurant_menu_item_options;
create policy "ldn_restaurant_menu_item_options: member all own" on public.ldn_restaurant_menu_item_options for all to authenticated
  using (exists (
    select 1 from public.ldn_restaurant_menu_item_option_groups g
    join public.ldn_restaurant_menu_items mi on mi.id = g.menu_item_id
    where g.id = ldn_restaurant_menu_item_options.group_id and is_company_member(mi.company_id)
  ))
  with check (exists (
    select 1 from public.ldn_restaurant_menu_item_option_groups g
    join public.ldn_restaurant_menu_items mi on mi.id = g.menu_item_id
    where g.id = ldn_restaurant_menu_item_options.group_id and is_company_member(mi.company_id)
  ));

drop policy if exists "ldn_restaurant_order_item_options: team all" on public.ldn_restaurant_order_item_options;
create policy "ldn_restaurant_order_item_options: team all" on public.ldn_restaurant_order_item_options for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_order_item_options: member all own" on public.ldn_restaurant_order_item_options;
create policy "ldn_restaurant_order_item_options: member all own" on public.ldn_restaurant_order_item_options for all to authenticated
  using (exists (
    select 1 from public.ldn_restaurant_order_items oi
    join public.ldn_restaurant_orders o on o.id = oi.order_id
    where oi.id = ldn_restaurant_order_item_options.order_item_id and is_company_member(o.company_id)
  ))
  with check (exists (
    select 1 from public.ldn_restaurant_order_items oi
    join public.ldn_restaurant_orders o on o.id = oi.order_id
    where oi.id = ldn_restaurant_order_item_options.order_item_id and is_company_member(o.company_id)
  ));
