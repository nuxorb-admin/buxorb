-- =========================================================
-- 0034 — referencia opcional de factura en un movimiento de tesorería.
--
-- Campos puramente informativos (texto libre, sin FK a
-- procurement_xml_invoices ni a procurement_suppliers): permiten anotar
-- a qué factura/proveedor correspondió un egreso sin depender del
-- módulo de Compras — funciona igual si la empresa no lo tiene
-- contratado. No alimenta ni crea nada en Compras/CxC.
-- =========================================================

alter table public.treasury_movements add column if not exists factura_uuid_ref text;
alter table public.treasury_movements add column if not exists proveedor_ref text;
