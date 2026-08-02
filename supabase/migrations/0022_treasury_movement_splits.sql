-- =========================================================
-- 0022 — permite dividir un movimiento bancario en 2+ categorías. El
-- movimiento (treasury_movements) sigue siendo la unidad real del banco:
-- una fecha, una cuenta, un monto total. Cuando se divide, se guarda un
-- registro por cada categoría en treasury_movement_splits; el monto de
-- cada split debe sumar el total del movimiento (se valida en el cliente).
-- treasury_movements.category se queda como la categoría "primaria"
-- (la del primer split) para que las pantallas que solo leen esa columna
-- (listas, exports) sigan mostrando algo razonable sin tener que unir con
-- la tabla de splits.
-- =========================================================

create table if not exists public.treasury_movement_splits (
  id uuid primary key default gen_random_uuid(),
  movement_id uuid not null references public.treasury_movements (id) on delete cascade,
  category text not null,
  amount numeric not null check (amount > 0),
  created_at timestamptz not null default now()
);

create index if not exists treasury_movement_splits_movement_idx on public.treasury_movement_splits (movement_id);

alter table public.treasury_movement_splits enable row level security;

create policy "treasury_movement_splits: team all" on public.treasury_movement_splits
  for all to authenticated using (is_team_member()) with check (is_team_member());

create policy "treasury_movement_splits: member all own" on public.treasury_movement_splits
  for all to authenticated
  using (exists (select 1 from public.treasury_movements tm where tm.id = treasury_movement_splits.movement_id and is_company_member(tm.company_id)))
  with check (exists (select 1 from public.treasury_movements tm where tm.id = treasury_movement_splits.movement_id and is_company_member(tm.company_id)));
