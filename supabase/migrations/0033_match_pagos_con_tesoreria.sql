-- =========================================================
-- 0033 — match directo entre pagos de compras y egresos bancarios reales,
-- reemplazando el puente indirecto vía expected_movements (que nunca
-- regresaba el resultado a Compras: Tesorería conciliaba el proyectado
-- pero la OC/factura se quedaba sin marcar como pagada).
--
-- procurement_purchase_payments ya es "la tabla de pagos de una
-- compra/factura" — se le agrega treasury_movement_id para que, cuando
-- el pago proviene de conciliar un egreso bancario real, quede
-- registrado el cruce. Esa misma columna es lo que "bloquea" el
-- movimiento: un egreso con al menos un pago que lo referencia ya no
-- aparece como disponible para volver a cruzarse.
--
-- Un mismo movimiento bancario puede repartirse entre varias OC y/o
-- facturas (inserta una fila de pago por cada una, todas con el mismo
-- treasury_movement_id) — eso se valida en la aplicación, no aquí,
-- exigiendo que todas pertenezcan al mismo proveedor.
-- =========================================================

alter table public.procurement_purchase_payments add column if not exists treasury_movement_id uuid references public.treasury_movements (id) on delete set null;

create index if not exists procurement_purchase_payments_treasury_movement_idx on public.procurement_purchase_payments (treasury_movement_id);
