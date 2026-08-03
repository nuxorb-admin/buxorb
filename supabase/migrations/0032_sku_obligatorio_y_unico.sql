-- =========================================================
-- 0032 — el SKU de un producto ya no es opcional y debe ser único
-- dentro de cada empresa (dos empresas distintas sí pueden repetir SKU,
-- es su propio catálogo interno).
-- =========================================================

alter table public.procurement_products alter column sku set not null;

create unique index if not exists procurement_products_company_sku_unique
  on public.procurement_products (company_id, sku);
