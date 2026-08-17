-- =========================================================
-- ROLLBACK de 0051_lineas_de_negocio.sql, 0052_ldn_restaurant.sql y las
-- migraciones que le agregaron encima (0053 canales de pedido, 0055
-- capacidad/mesas unidas, 0056 opciones de platillo — todas son alter
-- table o tablas nuevas sobre el mismo esquema, cubiertas al tirar las
-- tablas completas) — NO forma parte de la secuencia normal de
-- migraciones, no se aplica con `db push`. Correr a mano en el SQL Editor
-- de Supabase solo si se decide dar marcha atrás al eje de producto
-- "Líneas de negocio" (o solo a la línea "Restaurantes", que hasta ahora
-- es la única). Ver docs/lineas-de-negocio-rollback.md para la lista de
-- archivos de código a revertir junto con esto.
-- =========================================================

-- 1) Tablas operativas de Restaurantes — hijas primero.
drop table if exists public.ldn_restaurant_order_item_options;
drop table if exists public.ldn_restaurant_ticket_payments;
drop table if exists public.ldn_restaurant_tickets;
drop table if exists public.ldn_restaurant_order_items;
drop table if exists public.ldn_restaurant_orders;
drop table if exists public.ldn_restaurant_reservations;
drop table if exists public.ldn_restaurant_cash_sessions;
drop table if exists public.ldn_restaurant_tables;
drop table if exists public.ldn_restaurant_menu_item_options;
drop table if exists public.ldn_restaurant_menu_item_option_groups;
drop table if exists public.ldn_restaurant_menu_items;

-- 2) Activación de la línea de negocio.
drop trigger if exists ldn_company_business_lines_set_updated_at on nuxorb.ldn_company_business_lines;
drop table if exists nuxorb.ldn_company_business_lines;
