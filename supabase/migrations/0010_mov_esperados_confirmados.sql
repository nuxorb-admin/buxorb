-- =========================================================
-- 0010 — estándar de "conexión inter-módulo" (tesoreria-modulo-v1.md
-- sección 3a). En vez de un schema de Postgres por módulo (este proyecto
-- usa un solo schema public), se implementa como dos tablas compartidas:
-- cualquier módulo puede insertar en mov_esperados (publica un movimiento
-- proyectado) y cualquiera puede leerlas (consumirlas), sin dependencia
-- dura entre módulos.
-- =========================================================

create table if not exists public.mov_esperados (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  tipo text not null check (tipo in ('ingreso', 'egreso')),
  monto numeric not null check (monto > 0),
  moneda text not null default 'MXN',
  fecha_esperada date not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'vinculado', 'cancelado')),
  modulo_origen text not null,
  referencia_id uuid,
  concepto text,
  created_at timestamptz not null default now()
);

create table if not exists public.mov_confirmados (
  id uuid primary key default gen_random_uuid(),
  mov_esperado_id uuid not null references public.mov_esperados (id) on delete cascade,
  company_id uuid not null references public.companies (id) on delete cascade,
  treasury_movement_id uuid references public.treasury_movements (id) on delete set null,
  fecha_real date not null,
  monto numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists mov_esperados_company_idx on public.mov_esperados (company_id, estado);
create index if not exists mov_confirmados_company_idx on public.mov_confirmados (company_id);

alter table public.mov_esperados enable row level security;
alter table public.mov_confirmados enable row level security;

drop policy if exists "mov_esperados: team all" on public.mov_esperados;
create policy "mov_esperados: team all" on public.mov_esperados
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "mov_esperados: member all own" on public.mov_esperados;
create policy "mov_esperados: member all own" on public.mov_esperados
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

drop policy if exists "mov_confirmados: team all" on public.mov_confirmados;
create policy "mov_confirmados: team all" on public.mov_confirmados
  for all to authenticated using (is_team_member()) with check (is_team_member());

drop policy if exists "mov_confirmados: member all own" on public.mov_confirmados;
create policy "mov_confirmados: member all own" on public.mov_confirmados
  for all to authenticated
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

-- Nuevo source para treasury_movements: un movimiento real creado al
-- vincular manualmente un mov_esperado pendiente.
alter table public.treasury_movements drop constraint if exists treasury_movements_source_check;
alter table public.treasury_movements add constraint treasury_movements_source_check
  check (source in ('manual', 'csv_import', 'bank_import', 'ai_statement', 'mov_confirmado'));
