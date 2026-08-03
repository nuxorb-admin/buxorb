-- =========================================================
-- 0026 — desglose por concepto ligado al UUID fiscal del CFDI.
--
-- Hasta ahora, al cargar un XML sobre una compra ya existente
-- (pendiente de factura, capturada por ticket), solo se guardaba la
-- factura (procurement_purchase_invoices) — el desglose por concepto se
-- perdía. Con `uuid_fiscal` en procurement_order_items, cada línea queda
-- amarrada al folio fiscal que la originó, permitiendo hacer match entre
-- el desglose y la factura por UUID en vez de solo por compra_id (una
-- compra puede tener más de una factura, p.ej. tickets consolidados).
-- =========================================================

alter table public.procurement_order_items add column if not exists uuid_fiscal text;

create index if not exists procurement_order_items_uuid_fiscal_idx
  on public.procurement_order_items (uuid_fiscal);
