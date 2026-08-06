-- =========================================================
-- 0037 — costeo de productos de venta: cada producto/servicio del
-- catálogo de Ventas se costea de una de tres formas:
--   comercializado: se compra y se revende tal cual — el costo viene de
--     ligarlo a un insumo del catálogo de Compras (procurement_products).
--   receta: se arma con porciones de insumos del catálogo de Compras
--     (sales_product_recipe_items) — mismo patrón de conversión de
--     unidades que ya existe en Compras (procurement_units.factor_base).
--   kit: se arma con otros productos de este mismo catálogo de Ventas
--     (sales_product_kit_items) — solo un nivel, un kit no puede
--     contener otro kit (se valida en la aplicación, no aquí).
--
-- El costo calculado es informativo: no toca precio_unitario, que se
-- sigue capturando a mano. Se calcula en el cliente a partir de estas
-- tablas + procurement_products.costo_referencia, no se persiste aquí.
-- =========================================================

alter table public.sales_products_services
  add column if not exists tipo_costeo text not null default 'comercializado'
    check (tipo_costeo in ('comercializado', 'receta', 'kit'));

alter table public.sales_products_services
  add column if not exists producto_compra_id uuid references public.procurement_products (id) on delete set null;

create table if not exists public.sales_product_recipe_items (
  id uuid primary key default gen_random_uuid(),
  sales_product_id uuid not null references public.sales_products_services (id) on delete cascade,
  procurement_product_id uuid not null references public.procurement_products (id) on delete cascade,
  cantidad numeric not null check (cantidad > 0),
  unidad text not null default 'pza'
);

create index if not exists sales_product_recipe_items_sales_product_idx on public.sales_product_recipe_items (sales_product_id);

alter table public.sales_product_recipe_items enable row level security;

create policy "sales_product_recipe_items: team all" on public.sales_product_recipe_items for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "sales_product_recipe_items: member all own" on public.sales_product_recipe_items for all to authenticated
  using (exists (select 1 from public.sales_products_services sp where sp.id = sales_product_id and is_company_member(sp.company_id)))
  with check (exists (select 1 from public.sales_products_services sp where sp.id = sales_product_id and is_company_member(sp.company_id)));

create table if not exists public.sales_product_kit_items (
  id uuid primary key default gen_random_uuid(),
  sales_product_id uuid not null references public.sales_products_services (id) on delete cascade,
  componente_producto_id uuid not null references public.sales_products_services (id) on delete cascade,
  cantidad numeric not null check (cantidad > 0),
  check (sales_product_id <> componente_producto_id)
);

create index if not exists sales_product_kit_items_sales_product_idx on public.sales_product_kit_items (sales_product_id);

alter table public.sales_product_kit_items enable row level security;

create policy "sales_product_kit_items: team all" on public.sales_product_kit_items for all to authenticated
  using (is_team_member()) with check (is_team_member());
create policy "sales_product_kit_items: member all own" on public.sales_product_kit_items for all to authenticated
  using (exists (select 1 from public.sales_products_services sp where sp.id = sales_product_id and is_company_member(sp.company_id)))
  with check (exists (select 1 from public.sales_products_services sp where sp.id = sales_product_id and is_company_member(sp.company_id)));
