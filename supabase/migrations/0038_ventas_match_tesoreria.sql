-- =========================================================
-- 0038 — match directo entre cobros de Ventas y CxC e ingresos bancarios
-- reales, reemplazando el puente indirecto vía expected_movements/
-- confirmed_movements (mismo defecto que ya se resolvió para Compras en
-- 0033_match_pagos_con_tesoreria.sql: Tesorería conciliaba el proyectado
-- pero la factura se quedaba sin marcar como pagada, porque el resultado
-- nunca regresaba a Ventas).
--
-- sales_collections ya es "la tabla de cobros de una factura" — se le
-- agrega treasury_movement_id para que, cuando el cobro proviene de
-- conciliar un ingreso bancario real, quede registrado el cruce. Esa misma
-- columna es lo que "bloquea" el movimiento: un ingreso con al menos un
-- cobro que lo referencia ya no aparece como disponible para volver a
-- cruzarse.
--
-- Un mismo movimiento bancario puede repartirse entre varias facturas
-- (inserta una fila de cobro por cada una, todas con el mismo
-- treasury_movement_id) — eso se valida en la aplicación, no aquí,
-- exigiendo que todas pertenezcan al mismo cliente.
--
-- A partir de esta migración, la creación de una factura (FacturacionTab)
-- deja de insertar en expected_movements — el cruce con Tesorería es
-- directo desde Cobranza ("Vincular banco"), igual que en Compras. La tabla
-- expected_movements/confirmed_movements no se toca: sigue en uso por
-- Gestión de Personal (nómina).
-- =========================================================

alter table public.sales_collections add column if not exists treasury_movement_id uuid references public.treasury_movements (id) on delete set null;

create index if not exists sales_collections_treasury_movement_idx on public.sales_collections (treasury_movement_id);
