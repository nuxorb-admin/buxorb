-- =========================================================
-- 0013 — Gestión de Personal a nivel producción (Essential + Professional),
-- siguiendo docs/gestion-personal-modulo-v1.md. Mismo patrón de RLS que
-- treasury_*/compras: company_id explícito, equipo todo, is_company_member
-- para la empresa dueña. Sin timbrado de nómina (responsabilidad del
-- contador con su PAC) — este módulo entrega prenómina, recibo interno y
-- layout de dispersión.
--
-- IMPORTANT: las tablas ISR/IMSS/UMA de `tabla_fiscal` se siembran con
-- valores de referencia (tarifa Art. 96 LISR 2024 y fórmula simplificada de
-- cuotas obreras IMSS) — son "infraestructura interna Nuxorb" según el MD,
-- pensadas para actualizarse por evento/año sin tocar código. NO están
-- validadas todavía con el contador aliado (mismo estado que el propio MD:
-- "pendiente de pricing y validación fiscal") — no usar para nómina real de
-- un cliente sin esa validación.
-- =========================================================

create table if not exists public.departamentos_personal (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now(),
  unique (company_id, nombre)
);

create table if not exists public.empleados (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre_completo text not null,
  rfc text,
  curp text,
  nss text,
  fecha_ingreso date not null default current_date,
  tipo_contrato text not null default 'indeterminado' check (tipo_contrato in ('indeterminado', 'determinado', 'prueba')),
  fecha_fin_contrato date,
  sueldo_diario numeric not null default 0,
  periodicidad_pago text not null default 'quincenal' check (periodicidad_pago in ('semanal', 'catorcenal', 'quincenal')),
  departamento_id uuid references public.departamentos_personal (id) on delete set null,
  cuenta_deposito text,
  estado text not null default 'activo' check (estado in ('activo', 'baja')),
  fecha_baja date,
  motivo_baja text check (motivo_baja in ('renuncia', 'despido', 'termino_contrato')),
  created_at timestamptz not null default now()
);

create table if not exists public.documento_empleado (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  nombre text not null,
  tipo text,
  created_at timestamptz not null default now()
);

create table if not exists public.historial_sueldo (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  sueldo_diario numeric not null,
  fecha_efectiva date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.incidencias (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  tipo text not null check (tipo in (
    'falta', 'retardo', 'hora_extra', 'permiso_con_goce', 'permiso_sin_goce',
    'incapacidad', 'vacaciones', 'prima_dominical'
  )),
  fecha date not null default current_date,
  horas numeric,
  folio_incapacidad text,
  origen text not null default 'manual' check (origen in ('manual', 'template', 'checador')),
  estado text not null default 'registrada' check (estado in ('registrada', 'aplicada_en_nomina')),
  created_by uuid references public.profiles (id) on delete set null,
  -- Solo aplica a vacaciones/permisos en Professional (flujo de solicitud/
  -- aprobación del MD sección 5.3): null = pendiente, si no null = quién de
  -- la empresa la aprobó (no puede ser quien la capturó, mismo principio ya
  -- usado en la aprobación simple de Compras).
  aprobado_por uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.saldo_vacaciones (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  aniversario integer not null,
  dias_derecho numeric not null,
  dias_gozados numeric not null default 0,
  created_at timestamptz not null default now(),
  unique (empleado_id, aniversario)
);

create table if not exists public.concepto_nomina (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  nombre text not null,
  tipo text not null check (tipo in ('percepcion', 'deduccion')),
  integra_sbc boolean not null default false,
  origen text not null default 'calculado' check (origen in ('calculado', 'capturado', 'incidencia')),
  created_at timestamptz not null default now()
);

create table if not exists public.periodo_nomina (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  periodicidad text not null check (periodicidad in ('semanal', 'catorcenal', 'quincenal')),
  fecha_inicio date not null,
  fecha_fin date not null,
  fecha_pago date not null,
  estado text not null default 'abierto' check (estado in ('abierto', 'calculado', 'cerrado')),
  created_at timestamptz not null default now()
);

create table if not exists public.recibo_nomina (
  id uuid primary key default gen_random_uuid(),
  periodo_id uuid not null references public.periodo_nomina (id) on delete cascade,
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  total_percepciones numeric not null default 0,
  total_deducciones numeric not null default 0,
  neto numeric not null default 0,
  estado text not null default 'calculado' check (estado in ('calculado', 'ajustado', 'cerrado')),
  created_at timestamptz not null default now(),
  unique (periodo_id, empleado_id)
);

create table if not exists public.recibo_detalle (
  id uuid primary key default gen_random_uuid(),
  recibo_id uuid not null references public.recibo_nomina (id) on delete cascade,
  concepto_id uuid not null references public.concepto_nomina (id) on delete restrict,
  tipo text not null check (tipo in ('percepcion', 'deduccion')),
  monto numeric not null default 0,
  origen text not null default 'calculado' check (origen in ('calculado', 'capturado', 'incidencia'))
);

create table if not exists public.finiquito (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  tipo text not null check (tipo in ('finiquito', 'liquidacion')),
  desglose jsonb not null default '{}'::jsonb,
  isr_separacion numeric not null default 0,
  neto numeric not null default 0,
  fecha date not null default current_date,
  created_at timestamptz not null default now()
);

-- Catálogo fiscal interno Nuxorb — sin company_id (no es dato de cliente),
-- de solo lectura para cualquier empresa (necesario para calcular la
-- prenómina en el navegador), solo el equipo lo escribe/actualiza.
create table if not exists public.tabla_fiscal (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('isr_mensual', 'uma', 'imss_obrero')),
  periodicidad text,
  vigencia_desde date not null,
  vigencia_hasta date,
  contenido jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists empleados_company_idx on public.empleados (company_id, estado);
create index if not exists incidencias_empleado_idx on public.incidencias (empleado_id, fecha);
create index if not exists periodo_nomina_company_idx on public.periodo_nomina (company_id, estado);
create index if not exists recibo_nomina_periodo_idx on public.recibo_nomina (periodo_id);

-- ---------------------------------------------------------
-- RLS — mismo patrón que compras_proveedores: equipo todo, miembro de la
-- empresa todo lo de su empresa. Las tablas sin company_id directo se
-- validan a través de empleado_id/periodo_id/recibo_id.
-- ---------------------------------------------------------

alter table public.departamentos_personal enable row level security;
alter table public.empleados enable row level security;
alter table public.documento_empleado enable row level security;
alter table public.historial_sueldo enable row level security;
alter table public.incidencias enable row level security;
alter table public.saldo_vacaciones enable row level security;
alter table public.concepto_nomina enable row level security;
alter table public.periodo_nomina enable row level security;
alter table public.recibo_nomina enable row level security;
alter table public.recibo_detalle enable row level security;
alter table public.finiquito enable row level security;
alter table public.tabla_fiscal enable row level security;

drop policy if exists "departamentos_personal: team all" on public.departamentos_personal;
create policy "departamentos_personal: team all" on public.departamentos_personal for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "departamentos_personal: member all own" on public.departamentos_personal;
create policy "departamentos_personal: member all own" on public.departamentos_personal for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "empleados: team all" on public.empleados;
create policy "empleados: team all" on public.empleados for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "empleados: member all own" on public.empleados;
create policy "empleados: member all own" on public.empleados for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "periodo_nomina: team all" on public.periodo_nomina;
create policy "periodo_nomina: team all" on public.periodo_nomina for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "periodo_nomina: member all own" on public.periodo_nomina;
create policy "periodo_nomina: member all own" on public.periodo_nomina for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "documento_empleado: team all" on public.documento_empleado;
create policy "documento_empleado: team all" on public.documento_empleado for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "documento_empleado: member all own" on public.documento_empleado;
create policy "documento_empleado: member all own" on public.documento_empleado for all to authenticated
  using (exists (select 1 from public.empleados e where e.id = documento_empleado.empleado_id and is_company_member(e.company_id)))
  with check (exists (select 1 from public.empleados e where e.id = documento_empleado.empleado_id and is_company_member(e.company_id)));

drop policy if exists "historial_sueldo: team all" on public.historial_sueldo;
create policy "historial_sueldo: team all" on public.historial_sueldo for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "historial_sueldo: member all own" on public.historial_sueldo;
create policy "historial_sueldo: member all own" on public.historial_sueldo for all to authenticated
  using (exists (select 1 from public.empleados e where e.id = historial_sueldo.empleado_id and is_company_member(e.company_id)))
  with check (exists (select 1 from public.empleados e where e.id = historial_sueldo.empleado_id and is_company_member(e.company_id)));

drop policy if exists "incidencias: team all" on public.incidencias;
create policy "incidencias: team all" on public.incidencias for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "incidencias: member all own" on public.incidencias;
create policy "incidencias: member all own" on public.incidencias for all to authenticated
  using (exists (select 1 from public.empleados e where e.id = incidencias.empleado_id and is_company_member(e.company_id)))
  with check (exists (select 1 from public.empleados e where e.id = incidencias.empleado_id and is_company_member(e.company_id)));

drop policy if exists "saldo_vacaciones: team all" on public.saldo_vacaciones;
create policy "saldo_vacaciones: team all" on public.saldo_vacaciones for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "saldo_vacaciones: member all own" on public.saldo_vacaciones;
create policy "saldo_vacaciones: member all own" on public.saldo_vacaciones for all to authenticated
  using (exists (select 1 from public.empleados e where e.id = saldo_vacaciones.empleado_id and is_company_member(e.company_id)))
  with check (exists (select 1 from public.empleados e where e.id = saldo_vacaciones.empleado_id and is_company_member(e.company_id)));

drop policy if exists "recibo_nomina: team all" on public.recibo_nomina;
create policy "recibo_nomina: team all" on public.recibo_nomina for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "recibo_nomina: member all own" on public.recibo_nomina;
create policy "recibo_nomina: member all own" on public.recibo_nomina for all to authenticated
  using (exists (select 1 from public.periodo_nomina p where p.id = recibo_nomina.periodo_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.periodo_nomina p where p.id = recibo_nomina.periodo_id and is_company_member(p.company_id)));

drop policy if exists "recibo_detalle: team all" on public.recibo_detalle;
create policy "recibo_detalle: team all" on public.recibo_detalle for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "recibo_detalle: member all own" on public.recibo_detalle;
create policy "recibo_detalle: member all own" on public.recibo_detalle for all to authenticated
  using (exists (
    select 1 from public.recibo_nomina r join public.periodo_nomina p on p.id = r.periodo_id
    where r.id = recibo_detalle.recibo_id and is_company_member(p.company_id)
  ))
  with check (exists (
    select 1 from public.recibo_nomina r join public.periodo_nomina p on p.id = r.periodo_id
    where r.id = recibo_detalle.recibo_id and is_company_member(p.company_id)
  ));

drop policy if exists "finiquito: team all" on public.finiquito;
create policy "finiquito: team all" on public.finiquito for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "finiquito: member all own" on public.finiquito;
create policy "finiquito: member all own" on public.finiquito for all to authenticated
  using (exists (select 1 from public.empleados e where e.id = finiquito.empleado_id and is_company_member(e.company_id)))
  with check (exists (select 1 from public.empleados e where e.id = finiquito.empleado_id and is_company_member(e.company_id)));

-- Catálogos globales (concepto_nomina, tabla_fiscal): cualquier empresa
-- autenticada los lee (necesarios para calcular en el cliente), solo el
-- equipo Nuxorb los edita.
drop policy if exists "concepto_nomina: team write" on public.concepto_nomina;
create policy "concepto_nomina: team write" on public.concepto_nomina for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "concepto_nomina: authenticated read" on public.concepto_nomina;
create policy "concepto_nomina: authenticated read" on public.concepto_nomina for select to authenticated using (true);

drop policy if exists "tabla_fiscal: team write" on public.tabla_fiscal;
create policy "tabla_fiscal: team write" on public.tabla_fiscal for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "tabla_fiscal: authenticated read" on public.tabla_fiscal;
create policy "tabla_fiscal: authenticated read" on public.tabla_fiscal for select to authenticated using (true);

-- ---------------------------------------------------------
-- Catálogo fijo de conceptos de nómina (igual para Essential y Professional
-- — el MD dice "catálogo fijo en Essential, extensible en Professional",
-- pero no hay demanda todavía de conceptos personalizados por cliente).
-- ---------------------------------------------------------
insert into public.concepto_nomina (clave, nombre, tipo, integra_sbc, origen) values
  ('sueldo', 'Sueldo', 'percepcion', true, 'calculado'),
  ('bono', 'Bono', 'percepcion', true, 'capturado'),
  ('comision', 'Comisión', 'percepcion', true, 'capturado'),
  ('propinas', 'Propinas repartidas por el patrón', 'percepcion', true, 'capturado'),
  ('horas_extra_dobles', 'Horas extra dobles', 'percepcion', false, 'incidencia'),
  ('horas_extra_triples', 'Horas extra triples', 'percepcion', false, 'incidencia'),
  ('prima_dominical', 'Prima dominical', 'percepcion', false, 'incidencia'),
  ('aguinaldo', 'Aguinaldo', 'percepcion', false, 'calculado'),
  ('prima_vacacional', 'Prima vacacional', 'percepcion', false, 'calculado'),
  ('isr', 'ISR', 'deduccion', false, 'calculado'),
  ('imss_obrero', 'IMSS obrero', 'deduccion', false, 'calculado'),
  ('infonavit', 'Crédito INFONAVIT', 'deduccion', false, 'capturado'),
  ('pension_alimenticia', 'Pensión alimenticia', 'deduccion', false, 'capturado'),
  ('prestamo', 'Préstamo', 'deduccion', false, 'capturado'),
  ('otros_deduccion', 'Otros', 'deduccion', false, 'capturado')
on conflict (clave) do nothing;

-- Tarifa ISR mensual (Art. 96 LISR) — valores de referencia 2024, pendientes
-- de validar/actualizar anualmente con el contador aliado.
insert into public.tabla_fiscal (tipo, periodicidad, vigencia_desde, contenido)
select 'isr_mensual', 'mensual', '2024-01-01', '[
  {"limite_inferior": 0.01, "limite_superior": 746.04, "cuota_fija": 0, "porcentaje_excedente": 1.92},
  {"limite_inferior": 746.05, "limite_superior": 6332.05, "cuota_fija": 14.32, "porcentaje_excedente": 6.40},
  {"limite_inferior": 6332.06, "limite_superior": 11128.01, "cuota_fija": 371.83, "porcentaje_excedente": 10.88},
  {"limite_inferior": 11128.02, "limite_superior": 12935.82, "cuota_fija": 893.63, "porcentaje_excedente": 16.00},
  {"limite_inferior": 12935.83, "limite_superior": 15487.71, "cuota_fija": 1182.88, "porcentaje_excedente": 17.92},
  {"limite_inferior": 15487.72, "limite_superior": 31236.49, "cuota_fija": 1640.18, "porcentaje_excedente": 21.36},
  {"limite_inferior": 31236.50, "limite_superior": 49233.00, "cuota_fija": 5004.12, "porcentaje_excedente": 23.52},
  {"limite_inferior": 49233.01, "limite_superior": 93993.90, "cuota_fija": 9236.89, "porcentaje_excedente": 30.00},
  {"limite_inferior": 93993.91, "limite_superior": 125325.20, "cuota_fija": 22665.17, "porcentaje_excedente": 32.00},
  {"limite_inferior": 125325.21, "limite_superior": 375975.61, "cuota_fija": 32691.18, "porcentaje_excedente": 34.00},
  {"limite_inferior": 375975.62, "limite_superior": null, "cuota_fija": 117912.32, "porcentaje_excedente": 35.00}
]'::jsonb
where not exists (select 1 from public.tabla_fiscal where tipo = 'isr_mensual');

-- UMA diaria — valor de referencia 2024.
insert into public.tabla_fiscal (tipo, periodicidad, vigencia_desde, contenido)
select 'uma', null, '2024-01-01', '{"diaria": 108.57}'::jsonb
where not exists (select 1 from public.tabla_fiscal where tipo = 'uma');

-- Cuotas obrero IMSS (fórmula simplificada por rama, % sobre SBC salvo donde
-- se indica excedente de 3 UMA) — referencia, no sustituye la determinación
-- oficial del IDSE.
insert into public.tabla_fiscal (tipo, periodicidad, vigencia_desde, contenido)
select 'imss_obrero', null, '2024-01-01', '{
  "enfermedad_maternidad_excedente_pct": 0.40,
  "prestaciones_dinero_pct": 0.25,
  "gastos_medicos_pensionados_pct": 0.375,
  "invalidez_vida_pct": 0.625,
  "cesantia_vejez_pct": 1.125
}'::jsonb
where not exists (select 1 from public.tabla_fiscal where tipo = 'imss_obrero');
