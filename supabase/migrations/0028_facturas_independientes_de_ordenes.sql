-- =========================================================
-- 0028 — separa la lógica de facturas (documentos fiscales: factura y
-- nota de crédito) de las órdenes de compra.
--
-- Antes: procurement_xml_invoices.compra_id era obligatorio — una
-- factura no podía existir sin una orden de compra, y no había forma de
-- registrar notas de crédito ni de vincular una factura a otra.
--
-- Ahora:
--   - Una factura/NC vive por sí sola (company_id + proveedor_id propios,
--     ya no depende de un join a través de compra para saber de quién
--     es). compra_id pasa a ser opcional: una OC puede tener 0, 1 o
--     varias facturas/NC: la vinculación es explícita y posterior, no
--     una consecuencia de crearla.
--   - tipo_documento distingue factura de nota_credito.
--   - nc_aplica_factura_id liga una NC a la factura específica que
--     abona/cancela, independientemente de si esa factura tiene o no
--     una OC asociada.
--   - procurement_order_items y procurement_purchase_payments ahora
--     pueden colgar de una factura directamente (factura_id) además de
--     (u opcionalmente en vez de) una compra — una factura suelta
--     también tiene su propio desglose y sus propios pagos.
-- =========================================================

-- ---------------------------------------------------------
-- procurement_xml_invoices: independencia de compra_id
-- ---------------------------------------------------------
alter table public.procurement_xml_invoices add column if not exists company_id uuid references nuxorb.companies (id) on delete cascade;
alter table public.procurement_xml_invoices add column if not exists proveedor_id uuid references public.procurement_suppliers (id) on delete restrict;
alter table public.procurement_xml_invoices add column if not exists tipo_documento text not null default 'factura' check (tipo_documento in ('factura', 'nota_credito'));
alter table public.procurement_xml_invoices add column if not exists nc_aplica_factura_id uuid references public.procurement_xml_invoices (id) on delete set null;

update public.procurement_xml_invoices i
set company_id = c.company_id, proveedor_id = c.proveedor_id
from public.procurement_orders c
where i.compra_id = c.id and i.company_id is null;

alter table public.procurement_xml_invoices alter column company_id set not null;
alter table public.procurement_xml_invoices alter column proveedor_id set not null;
alter table public.procurement_xml_invoices alter column compra_id drop not null;

create index if not exists procurement_xml_invoices_company_idx on public.procurement_xml_invoices (company_id);
create index if not exists procurement_xml_invoices_proveedor_idx on public.procurement_xml_invoices (proveedor_id);
create index if not exists procurement_xml_invoices_nc_aplica_idx on public.procurement_xml_invoices (nc_aplica_factura_id);

-- ---------------------------------------------------------
-- procurement_order_items: puede colgar de compra y/o de factura
-- ---------------------------------------------------------
alter table public.procurement_order_items add column if not exists factura_id uuid references public.procurement_xml_invoices (id) on delete cascade;
alter table public.procurement_order_items alter column compra_id drop not null;
alter table public.procurement_order_items add constraint procurement_order_items_target_check
  check (compra_id is not null or factura_id is not null);

create index if not exists procurement_order_items_factura_idx on public.procurement_order_items (factura_id);

-- ---------------------------------------------------------
-- procurement_purchase_payments: puede pagar una compra y/o una factura
-- suelta directamente
-- ---------------------------------------------------------
alter table public.procurement_purchase_payments add column if not exists factura_id uuid references public.procurement_xml_invoices (id) on delete cascade;
alter table public.procurement_purchase_payments alter column compra_id drop not null;
alter table public.procurement_purchase_payments add constraint procurement_purchase_payments_target_check
  check (compra_id is not null or factura_id is not null);

create index if not exists procurement_purchase_payments_factura_idx on public.procurement_purchase_payments (factura_id);

-- ---------------------------------------------------------
-- RLS: procurement_xml_invoices ya no depende del join a compras
-- ---------------------------------------------------------
drop policy if exists "facturas_compra: member all own" on public.procurement_xml_invoices;
create policy "procurement_xml_invoices: member all own" on public.procurement_xml_invoices for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

-- ---------------------------------------------------------
-- RLS: procurement_order_items ahora puede no tener compra_id
-- ---------------------------------------------------------
drop policy if exists "compra_detalle: member all own" on public.procurement_order_items;
create policy "procurement_order_items: member all own" on public.procurement_order_items for all to authenticated
  using (
    (compra_id is not null and exists (select 1 from public.procurement_orders c where c.id = procurement_order_items.compra_id and is_company_member(c.company_id)))
    or (factura_id is not null and exists (select 1 from public.procurement_xml_invoices f where f.id = procurement_order_items.factura_id and is_company_member(f.company_id)))
  )
  with check (
    (compra_id is not null and exists (select 1 from public.procurement_orders c where c.id = procurement_order_items.compra_id and is_company_member(c.company_id)))
    or (factura_id is not null and exists (select 1 from public.procurement_xml_invoices f where f.id = procurement_order_items.factura_id and is_company_member(f.company_id)))
  );

-- ---------------------------------------------------------
-- RLS: procurement_purchase_payments ahora puede no tener compra_id
-- ---------------------------------------------------------
drop policy if exists "pagos_compra: member all own" on public.procurement_purchase_payments;
create policy "procurement_purchase_payments: member all own" on public.procurement_purchase_payments for all to authenticated
  using (
    (compra_id is not null and exists (select 1 from public.procurement_orders c where c.id = procurement_purchase_payments.compra_id and is_company_member(c.company_id)))
    or (factura_id is not null and exists (select 1 from public.procurement_xml_invoices f where f.id = procurement_purchase_payments.factura_id and is_company_member(f.company_id)))
  )
  with check (
    (compra_id is not null and exists (select 1 from public.procurement_orders c where c.id = procurement_purchase_payments.compra_id and is_company_member(c.company_id)))
    or (factura_id is not null and exists (select 1 from public.procurement_xml_invoices f where f.id = procurement_purchase_payments.factura_id and is_company_member(f.company_id)))
  );
