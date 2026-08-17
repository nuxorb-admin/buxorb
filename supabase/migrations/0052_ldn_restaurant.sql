-- =========================================================
-- 0052 — Líneas de negocio / Restaurantes: tablas operativas.
-- Prefijo ldn_restaurant_ (ver 0051 para la convención de nombres y la
-- tabla de activación nuxorb.ldn_company_business_lines).
--
-- El Menú reusa el catálogo de Ventas y CxC (public.sales_products_services,
-- con costeo por receta/kit ya construido en 0037) en vez de duplicar un
-- catálogo de producto — ldn_restaurant_menu_items es solo la capa de
-- metadata de restaurante (categoría, foto, orden) sobre esa fila.
-- Restaurantes requiere Ventas y CxC activo, validado en el admin al
-- asignar el nivel, no aquí (no hay forma limpia de expresarlo como
-- constraint de esquema).
--
-- RLS: team all + member all own en todas — el cliente opera estas tablas
-- él mismo día a día, mismo patrón que Tesorería/Compras/Personal/Ventas
-- (no es un addon tipo Agentes IA donde el equipo controla todo).
-- =========================================================

create table if not exists public.ldn_restaurant_menu_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  sales_product_id uuid not null references public.sales_products_services (id) on delete cascade,
  categoria text,
  orden integer not null default 0,
  foto_url text,
  disponible boolean not null default true,
  created_at timestamptz not null default now(),
  unique (company_id, sales_product_id)
);

create table if not exists public.ldn_restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  salon text not null default 'Principal',
  nombre text not null,
  estado text not null default 'libre' check (estado in ('libre', 'ocupada', 'reservada', 'cuenta_abierta')),
  created_at timestamptz not null default now()
);

create table if not exists public.ldn_restaurant_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  table_id uuid not null references public.ldn_restaurant_tables (id) on delete cascade,
  mesero_id uuid references auth.users (id) on delete set null,
  estado text not null default 'abierta' check (estado in ('abierta', 'cerrada')),
  opened_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.ldn_restaurant_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.ldn_restaurant_orders (id) on delete cascade,
  sales_product_id uuid not null references public.sales_products_services (id) on delete restrict,
  cantidad integer not null default 1 check (cantidad > 0),
  notas text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'en_preparacion', 'listo', 'entregado')),
  created_at timestamptz not null default now()
);

create table if not exists public.ldn_restaurant_cash_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  opened_by uuid references auth.users (id) on delete set null,
  opened_at timestamptz not null default now(),
  opening_amount numeric not null default 0,
  closed_by uuid references auth.users (id) on delete set null,
  closed_at timestamptz,
  closing_amount_expected numeric,
  closing_amount_counted numeric,
  status text not null default 'abierta' check (status in ('abierta', 'cerrada'))
);

create table if not exists public.ldn_restaurant_tickets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  order_id uuid not null references public.ldn_restaurant_orders (id) on delete cascade,
  cash_session_id uuid not null references public.ldn_restaurant_cash_sessions (id) on delete restrict,
  subtotal numeric not null,
  propina numeric not null default 0,
  total numeric not null,
  treasury_movement_id uuid references public.treasury_movements (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.ldn_restaurant_ticket_payments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.ldn_restaurant_tickets (id) on delete cascade,
  method text not null check (method in ('efectivo', 'tarjeta', 'transferencia', 'otro')),
  amount numeric not null check (amount > 0)
);

create table if not exists public.ldn_restaurant_reservations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  table_id uuid references public.ldn_restaurant_tables (id) on delete set null,
  cliente_nombre text not null,
  telefono text,
  personas integer not null default 1,
  fecha_hora timestamptz not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'cancelada', 'completada')),
  created_at timestamptz not null default now()
);

create index if not exists ldn_restaurant_orders_table_idx on public.ldn_restaurant_orders (table_id);
create index if not exists ldn_restaurant_orders_company_idx on public.ldn_restaurant_orders (company_id, estado);
create index if not exists ldn_restaurant_order_items_order_idx on public.ldn_restaurant_order_items (order_id);
create index if not exists ldn_restaurant_tickets_company_idx on public.ldn_restaurant_tickets (company_id, created_at);
create index if not exists ldn_restaurant_reservations_company_idx on public.ldn_restaurant_reservations (company_id, fecha_hora);

-- ---------------------------------------------------------
-- RLS
-- ---------------------------------------------------------
alter table public.ldn_restaurant_menu_items enable row level security;
alter table public.ldn_restaurant_tables enable row level security;
alter table public.ldn_restaurant_orders enable row level security;
alter table public.ldn_restaurant_order_items enable row level security;
alter table public.ldn_restaurant_cash_sessions enable row level security;
alter table public.ldn_restaurant_tickets enable row level security;
alter table public.ldn_restaurant_ticket_payments enable row level security;
alter table public.ldn_restaurant_reservations enable row level security;

drop policy if exists "ldn_restaurant_menu_items: team all" on public.ldn_restaurant_menu_items;
create policy "ldn_restaurant_menu_items: team all" on public.ldn_restaurant_menu_items for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_menu_items: member all own" on public.ldn_restaurant_menu_items;
create policy "ldn_restaurant_menu_items: member all own" on public.ldn_restaurant_menu_items for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ldn_restaurant_tables: team all" on public.ldn_restaurant_tables;
create policy "ldn_restaurant_tables: team all" on public.ldn_restaurant_tables for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_tables: member all own" on public.ldn_restaurant_tables;
create policy "ldn_restaurant_tables: member all own" on public.ldn_restaurant_tables for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ldn_restaurant_orders: team all" on public.ldn_restaurant_orders;
create policy "ldn_restaurant_orders: team all" on public.ldn_restaurant_orders for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_orders: member all own" on public.ldn_restaurant_orders;
create policy "ldn_restaurant_orders: member all own" on public.ldn_restaurant_orders for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ldn_restaurant_order_items: team all" on public.ldn_restaurant_order_items;
create policy "ldn_restaurant_order_items: team all" on public.ldn_restaurant_order_items for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_order_items: member all own" on public.ldn_restaurant_order_items;
create policy "ldn_restaurant_order_items: member all own" on public.ldn_restaurant_order_items for all to authenticated
  using (exists (select 1 from public.ldn_restaurant_orders o where o.id = ldn_restaurant_order_items.order_id and is_company_member(o.company_id)))
  with check (exists (select 1 from public.ldn_restaurant_orders o where o.id = ldn_restaurant_order_items.order_id and is_company_member(o.company_id)));

drop policy if exists "ldn_restaurant_cash_sessions: team all" on public.ldn_restaurant_cash_sessions;
create policy "ldn_restaurant_cash_sessions: team all" on public.ldn_restaurant_cash_sessions for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_cash_sessions: member all own" on public.ldn_restaurant_cash_sessions;
create policy "ldn_restaurant_cash_sessions: member all own" on public.ldn_restaurant_cash_sessions for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ldn_restaurant_tickets: team all" on public.ldn_restaurant_tickets;
create policy "ldn_restaurant_tickets: team all" on public.ldn_restaurant_tickets for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_tickets: member all own" on public.ldn_restaurant_tickets;
create policy "ldn_restaurant_tickets: member all own" on public.ldn_restaurant_tickets for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ldn_restaurant_ticket_payments: team all" on public.ldn_restaurant_ticket_payments;
create policy "ldn_restaurant_ticket_payments: team all" on public.ldn_restaurant_ticket_payments for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_ticket_payments: member all own" on public.ldn_restaurant_ticket_payments;
create policy "ldn_restaurant_ticket_payments: member all own" on public.ldn_restaurant_ticket_payments for all to authenticated
  using (exists (select 1 from public.ldn_restaurant_tickets t where t.id = ldn_restaurant_ticket_payments.ticket_id and is_company_member(t.company_id)))
  with check (exists (select 1 from public.ldn_restaurant_tickets t where t.id = ldn_restaurant_ticket_payments.ticket_id and is_company_member(t.company_id)));

drop policy if exists "ldn_restaurant_reservations: team all" on public.ldn_restaurant_reservations;
create policy "ldn_restaurant_reservations: team all" on public.ldn_restaurant_reservations for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ldn_restaurant_reservations: member all own" on public.ldn_restaurant_reservations;
create policy "ldn_restaurant_reservations: member all own" on public.ldn_restaurant_reservations for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));
