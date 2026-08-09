-- =========================================================
-- 0048 — whatsapp_connections.whatsapp_number único. Con una sola cuenta
-- de YCloud compartida por todos los clientes, un número solo puede
-- pertenecer a una conexión (y por lo tanto a una empresa) a la vez —
-- si se repitiera, whatsapp-webhook no podría saber a qué empresa
-- pertenece un mensaje entrante (busca la conexión por ese campo).
-- =========================================================

alter table public.whatsapp_connections
  add constraint whatsapp_connections_whatsapp_number_key unique (whatsapp_number);
