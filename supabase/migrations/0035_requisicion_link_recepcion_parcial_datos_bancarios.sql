-- =========================================================
-- 0035 — tres cosas independientes en el mismo commit por conveniencia:
--
-- 1. Datos bancarios opcionales del proveedor (banco, CLABE/cuenta,
--    titular) — no se piden al alta, se pueden agregar después.
-- 2. Detalle de recepción parcial: procurement_receipt_items registra
--    cuánto se recibió de cada renglón EN ESA recepción específica
--    (bitácora), mientras que procurement_order_items.cantidad_recibida
--    sigue siendo el acumulado — así se puede recibir una OC en varias
--    entregas y saber qué llegó en cada una.
-- (La relación requisición -> compra ya existía en el schema desde
-- 0011 — requisiciones.compra_id y estado 'convertida_en_compra' — lo
-- que faltaba era que el código la usara, no la tabla.)
-- =========================================================

alter table public.procurement_suppliers add column if not exists banco text;
alter table public.procurement_suppliers add column if not exists clabe text;
alter table public.procurement_suppliers add column if not exists titular_cuenta text;

create table if not exists public.procurement_receipt_items (
  id uuid primary key default gen_random_uuid(),
  recepcion_id uuid not null references public.procurement_receipts (id) on delete cascade,
  order_item_id uuid not null references public.procurement_order_items (id) on delete cascade,
  cantidad numeric not null check (cantidad > 0)
);

create index if not exists procurement_receipt_items_recepcion_idx on public.procurement_receipt_items (recepcion_id);
create index if not exists procurement_receipt_items_order_item_idx on public.procurement_receipt_items (order_item_id);

alter table public.procurement_receipt_items enable row level security;

create policy "procurement_receipt_items: team all" on public.procurement_receipt_items for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "procurement_receipt_items: member all own" on public.procurement_receipt_items for all to authenticated
  using (exists (select 1 from public.procurement_receipts r join public.procurement_orders c on c.id = r.compra_id where r.id = procurement_receipt_items.recepcion_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.procurement_receipts r join public.procurement_orders c on c.id = r.compra_id where r.id = procurement_receipt_items.recepcion_id and is_company_member(c.company_id)));
