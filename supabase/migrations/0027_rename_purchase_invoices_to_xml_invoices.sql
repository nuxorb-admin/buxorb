-- =========================================================
-- 0027 — procurement_purchase_invoices -> procurement_xml_invoices.
--
-- Esta tabla solo se llena desde el flujo de carga de XML (CFDI) en
-- FacturasCxCTab.tsx — nunca desde compras manuales ni tickets. El nombre
-- "purchase_invoices" sugería que cubría facturación de compra en
-- general; se renombra para reflejar que es específicamente el registro
-- de facturas fiscales cargadas por XML.
-- =========================================================

alter table public.procurement_purchase_invoices rename to procurement_xml_invoices;
