-- =========================================================
-- 0053 — Líneas de negocio / Restaurantes: canales de pedido más allá de
-- la mesa. Hasta ahora ldn_restaurant_orders solo modelaba pedidos en
-- mesa (table_id obligatorio). Se agrega:
--   - canal: mesa | telefono_domicilio | recoger | rappi
--   - cliente_nombre / telefono / direccion: solo aplican según el canal
--     (domicilio pide los tres, recoger nombre+telefono, rappi ninguno —
--     el cliente ya vive en la app de Rappi)
--   - referencia: folio/nota libre, pensado para cuando se conecte la API
--     real de Rappi (partner program, fuera de alcance v1 — hoy es
--     captura manual) sin tener que rediseñar la tabla
--
-- Rappi v1: no hay flujo de cobro aparte. El pedido pasa por el mismo
-- Cobrar de Caja que cualquier otro, pero con el método de pago fijo
-- "rappi" (agregado abajo al check de ldn_restaurant_ticket_payments) —
-- como CerrarCajaModal solo suma pagos "efectivo" para el arqueo, un
-- pago "rappi" no lo altera, que es el efecto real que se buscaba (ya
-- viene pagado por la plataforma) sin necesitar una rama de código aparte.
-- =========================================================

alter table public.ldn_restaurant_orders alter column table_id drop not null;

alter table public.ldn_restaurant_orders add column if not exists canal text not null default 'mesa'
  check (canal in ('mesa', 'telefono_domicilio', 'recoger', 'rappi'));
alter table public.ldn_restaurant_orders add column if not exists cliente_nombre text;
alter table public.ldn_restaurant_orders add column if not exists telefono text;
alter table public.ldn_restaurant_orders add column if not exists direccion text;
alter table public.ldn_restaurant_orders add column if not exists referencia text;

alter table public.ldn_restaurant_orders drop constraint if exists ldn_restaurant_orders_canal_table_check;
alter table public.ldn_restaurant_orders add constraint ldn_restaurant_orders_canal_table_check
  check ((canal = 'mesa') = (table_id is not null));

alter table public.ldn_restaurant_ticket_payments drop constraint if exists ldn_restaurant_ticket_payments_method_check;
alter table public.ldn_restaurant_ticket_payments add constraint ldn_restaurant_ticket_payments_method_check
  check (method in ('efectivo', 'tarjeta', 'transferencia', 'otro', 'rappi'));
