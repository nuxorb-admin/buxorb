-- =========================================================
-- 0024 — fecha del saldo inicial de cada cuenta bancaria. El saldo inicial
-- ya existía (opening_balance) pero sin fecha de referencia, así que no
-- se podía usar como punto de partida real para un saldo corrido
-- (saldo inicial del día + ingresos - egresos = saldo final, que a su vez
-- es el saldo inicial del día siguiente).
-- =========================================================

alter table public.treasury_accounts
  add column if not exists opening_balance_date date not null default current_date;
