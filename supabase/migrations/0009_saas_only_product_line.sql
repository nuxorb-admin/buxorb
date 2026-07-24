-- =========================================================
-- 0009 — se consolida a un solo producto (SaaS). CRM y ERP dejan de ser
-- líneas de producto reales: lo que antes se pensó como "Pipeline de
-- Ventas" (CRM) e "Inventario" (ERP) ya está descrito en los MD de
-- especificación como parte del mismo SaaS (Ventas y CxC Professional, y
-- un producto adicional de Compras y Proveedores, respectivamente).
-- =========================================================

update public.companies set product_line = 'saas' where product_line <> 'saas';

alter table public.companies drop constraint if exists companies_product_line_check;
alter table public.companies add constraint companies_product_line_check
  check (product_line in ('saas'));
