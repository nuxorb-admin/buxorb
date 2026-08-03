-- =========================================================
-- 0030 — un UUID fiscal no puede repetirse entre facturas/NC.
--
-- Antes solo se validaba en el frontend (un select antes del insert),
-- lo cual no protege contra inserciones concurrentes ni contra cualquier
-- otro camino de escritura. Un índice único parcial (ignora NULL, por si
-- algún documento llega sin timbre) lo hace imposible a nivel de datos.
-- =========================================================

create unique index if not exists procurement_xml_invoices_uuid_fiscal_unique
  on public.procurement_xml_invoices (uuid_fiscal)
  where uuid_fiscal is not null;
