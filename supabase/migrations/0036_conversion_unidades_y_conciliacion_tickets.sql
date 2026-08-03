-- =========================================================
-- 0036 — conversión real entre unidades para el promedio de costo, y
-- base para poder conciliar tickets contra el catálogo igual que
-- facturas.
--
-- factor_base: cuántas unidades de la unidad "base" de su categoría
-- equivale 1 de esta unidad (ej. kg -> 1000, con base g). Solo se llena
-- donde la conversión es lineal y sin ambigüedad (peso, volumen,
-- longitud simple, docena->pza) — caja/paquete se quedan sin factor
-- porque su contenido varía por producto, no hay forma de saberlo.
-- m2 tampoco tiene factor: es área, no es convertible linealmente con
-- m/cm sin elevar al cuadrado, y mezclar esa lógica no vale la pena hoy.
--
-- procurement_order_items.unidad: la unidad en la que viene esa línea
-- específica (de la factura/ticket), independiente de en qué unidad se
-- lleve el producto en catálogo — es lo que permite convertir.
-- =========================================================

alter table public.procurement_units add column if not exists factor_base numeric;

update public.procurement_units set factor_base = case codigo
  when 'pza' then 1
  when 'docena' then 12
  when 'kg' then 1000
  when 'g' then 1
  when 'ton' then 1000000
  when 'l' then 1000
  when 'ml' then 1
  when 'm' then 100
  when 'cm' then 1
  when 'm3' then 1000000
  else factor_base
end;

alter table public.procurement_order_items add column if not exists unidad text;
