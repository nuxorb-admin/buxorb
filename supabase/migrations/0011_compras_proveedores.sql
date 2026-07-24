-- =========================================================
-- 0011 — Compras y Proveedores a nivel producción (Essential + Professional),
-- siguiendo docs/compras-proveedores-modulo-v1.md. Mismo patrón de RLS que
-- treasury_*: company_id explícito, equipo todo, is_company_member/
-- is_company_owner para la empresa dueña.
-- =========================================================

create table if not exists public.proveedores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  razon_social text not null,
  rfc text,
  contacto_nombre text,
  contacto_telefono text,
  contacto_correo text,
  clabe text,
  dias_credito_default integer not null default 0,
  categoria_gasto_default text,
  estado text not null default 'activo' check (estado in ('activo', 'inactivo')),
  created_at timestamptz not null default now()
);

create table if not exists public.departamentos (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now(),
  unique (company_id, nombre)
);

create table if not exists public.compras_settings (
  company_id uuid primary key references public.companies (id) on delete cascade,
  aprobacion_activada boolean not null default false
);

create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  folio text not null,
  proveedor_id uuid not null references public.proveedores (id) on delete restrict,
  fecha date not null default current_date,
  subtotal numeric not null default 0,
  iva numeric not null default 0,
  total numeric not null default 0,
  moneda text not null default 'MXN',
  condicion_pago text not null default 'contado' check (condicion_pago in ('contado', 'credito')),
  dias_credito integer,
  fecha_estimada_pago date,
  departamento_id uuid references public.departamentos (id) on delete set null,
  estado text not null default 'borrador'
    check (estado in ('borrador', 'pendiente_aprobacion', 'aprobada', 'recibida', 'pagada', 'cancelada')),
  origen text not null default 'manual' check (origen in ('manual', 'xml_cfdi', 'ticket_ia', 'requisicion')),
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.compra_detalle (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references public.compras (id) on delete cascade,
  descripcion text not null,
  cantidad numeric not null default 1,
  precio_unitario numeric not null default 0,
  importe numeric not null default 0,
  cantidad_recibida numeric not null default 0
);

create table if not exists public.requisiciones (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  solicitante_id uuid references public.profiles (id) on delete set null,
  departamento_id uuid references public.departamentos (id) on delete set null,
  justificacion text,
  fecha date not null default current_date,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada', 'convertida_en_compra')),
  compra_id uuid references public.compras (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.reglas_aprobacion (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  tipo text not null check (tipo in ('monto', 'departamento')),
  umbral_monto numeric,
  departamento_id uuid references public.departamentos (id) on delete set null,
  aprobador_user_id uuid not null references auth.users (id) on delete cascade,
  orden_nivel integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.aprobaciones_compra (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references public.compras (id) on delete cascade,
  aprobador_user_id uuid not null references auth.users (id) on delete cascade,
  nivel integer not null default 1,
  resultado text not null check (resultado in ('aprobada', 'rechazada')),
  comentario text,
  fecha timestamptz not null default now()
);

create table if not exists public.evaluacion_proveedor (
  id uuid primary key default gen_random_uuid(),
  proveedor_id uuid not null references public.proveedores (id) on delete cascade,
  calificacion integer not null check (calificacion between 1 and 5),
  notas text,
  usuario_id uuid references public.profiles (id) on delete set null,
  fecha timestamptz not null default now()
);

create table if not exists public.recepciones (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references public.compras (id) on delete cascade,
  fecha date not null default current_date,
  tipo text not null default 'total' check (tipo in ('total', 'parcial')),
  notas text,
  created_at timestamptz not null default now()
);

create table if not exists public.facturas_compra (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references public.compras (id) on delete cascade,
  uuid_fiscal text,
  rfc_emisor text,
  fecha_emision date,
  subtotal numeric,
  iva numeric,
  total numeric,
  estado_match text check (estado_match in ('ok', 'con_diferencias')),
  created_at timestamptz not null default now()
);

create table if not exists public.tickets_compra (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid references public.compras (id) on delete cascade,
  resultado_ia jsonb,
  confianza numeric,
  estado text not null default 'confirmado' check (estado in ('procesando', 'confirmado', 'error')),
  created_at timestamptz not null default now()
);

create table if not exists public.pagos_compra (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references public.compras (id) on delete cascade,
  fecha date not null default current_date,
  monto numeric not null check (monto > 0),
  referencia text,
  created_at timestamptz not null default now()
);

create table if not exists public.uso_lectura_tickets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  periodo date not null,
  veces_usado integer not null default 0,
  unique (company_id, periodo)
);

create index if not exists compras_company_idx on public.compras (company_id, estado);
create index if not exists proveedores_company_idx on public.proveedores (company_id);
create index if not exists compra_detalle_compra_idx on public.compra_detalle (compra_id);

-- ---------------------------------------------------------
-- RLS — mismo patrón para todas: equipo todo, miembro de la empresa todo lo
-- de su empresa. Las tablas sin company_id directo (compra_detalle,
-- aprobaciones_compra, recepciones, facturas_compra, tickets_compra,
-- pagos_compra) se validan a través de la compra relacionada.
-- ---------------------------------------------------------

alter table public.proveedores enable row level security;
alter table public.departamentos enable row level security;
alter table public.compras_settings enable row level security;
alter table public.compras enable row level security;
alter table public.compra_detalle enable row level security;
alter table public.requisiciones enable row level security;
alter table public.reglas_aprobacion enable row level security;
alter table public.aprobaciones_compra enable row level security;
alter table public.evaluacion_proveedor enable row level security;
alter table public.recepciones enable row level security;
alter table public.facturas_compra enable row level security;
alter table public.tickets_compra enable row level security;
alter table public.pagos_compra enable row level security;
alter table public.uso_lectura_tickets enable row level security;

drop policy if exists "proveedores: team all" on public.proveedores;
create policy "proveedores: team all" on public.proveedores for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "proveedores: member all own" on public.proveedores;
create policy "proveedores: member all own" on public.proveedores for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "departamentos: team all" on public.departamentos;
create policy "departamentos: team all" on public.departamentos for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "departamentos: member all own" on public.departamentos;
create policy "departamentos: member all own" on public.departamentos for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "compras_settings: team all" on public.compras_settings;
create policy "compras_settings: team all" on public.compras_settings for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "compras_settings: member all own" on public.compras_settings;
create policy "compras_settings: member all own" on public.compras_settings for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "compras: team all" on public.compras;
create policy "compras: team all" on public.compras for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "compras: member all own" on public.compras;
create policy "compras: member all own" on public.compras for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "requisiciones: team all" on public.requisiciones;
create policy "requisiciones: team all" on public.requisiciones for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "requisiciones: member all own" on public.requisiciones;
create policy "requisiciones: member all own" on public.requisiciones for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "reglas_aprobacion: team all" on public.reglas_aprobacion;
create policy "reglas_aprobacion: team all" on public.reglas_aprobacion for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "reglas_aprobacion: member all own" on public.reglas_aprobacion;
create policy "reglas_aprobacion: member all own" on public.reglas_aprobacion for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "uso_lectura_tickets: team all" on public.uso_lectura_tickets;
create policy "uso_lectura_tickets: team all" on public.uso_lectura_tickets for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "uso_lectura_tickets: member all own" on public.uso_lectura_tickets;
create policy "uso_lectura_tickets: member all own" on public.uso_lectura_tickets for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "compra_detalle: team all" on public.compra_detalle;
create policy "compra_detalle: team all" on public.compra_detalle for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "compra_detalle: member all own" on public.compra_detalle;
create policy "compra_detalle: member all own" on public.compra_detalle for all to authenticated
  using (exists (select 1 from public.compras c where c.id = compra_detalle.compra_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.compras c where c.id = compra_detalle.compra_id and is_company_member(c.company_id)));

drop policy if exists "aprobaciones_compra: team all" on public.aprobaciones_compra;
create policy "aprobaciones_compra: team all" on public.aprobaciones_compra for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "aprobaciones_compra: member all own" on public.aprobaciones_compra;
create policy "aprobaciones_compra: member all own" on public.aprobaciones_compra for all to authenticated
  using (exists (select 1 from public.compras c where c.id = aprobaciones_compra.compra_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.compras c where c.id = aprobaciones_compra.compra_id and is_company_member(c.company_id)));

drop policy if exists "evaluacion_proveedor: team all" on public.evaluacion_proveedor;
create policy "evaluacion_proveedor: team all" on public.evaluacion_proveedor for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "evaluacion_proveedor: member all own" on public.evaluacion_proveedor;
create policy "evaluacion_proveedor: member all own" on public.evaluacion_proveedor for all to authenticated
  using (exists (select 1 from public.proveedores p where p.id = evaluacion_proveedor.proveedor_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.proveedores p where p.id = evaluacion_proveedor.proveedor_id and is_company_member(p.company_id)));

drop policy if exists "recepciones: team all" on public.recepciones;
create policy "recepciones: team all" on public.recepciones for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "recepciones: member all own" on public.recepciones;
create policy "recepciones: member all own" on public.recepciones for all to authenticated
  using (exists (select 1 from public.compras c where c.id = recepciones.compra_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.compras c where c.id = recepciones.compra_id and is_company_member(c.company_id)));

drop policy if exists "facturas_compra: team all" on public.facturas_compra;
create policy "facturas_compra: team all" on public.facturas_compra for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "facturas_compra: member all own" on public.facturas_compra;
create policy "facturas_compra: member all own" on public.facturas_compra for all to authenticated
  using (exists (select 1 from public.compras c where c.id = facturas_compra.compra_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.compras c where c.id = facturas_compra.compra_id and is_company_member(c.company_id)));

drop policy if exists "tickets_compra: team all" on public.tickets_compra;
create policy "tickets_compra: team all" on public.tickets_compra for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "tickets_compra: member all own" on public.tickets_compra;
create policy "tickets_compra: member all own" on public.tickets_compra for all to authenticated
  using (compra_id is null or exists (select 1 from public.compras c where c.id = tickets_compra.compra_id and is_company_member(c.company_id)))
  with check (compra_id is null or exists (select 1 from public.compras c where c.id = tickets_compra.compra_id and is_company_member(c.company_id)));

drop policy if exists "pagos_compra: team all" on public.pagos_compra;
create policy "pagos_compra: team all" on public.pagos_compra for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "pagos_compra: member all own" on public.pagos_compra;
create policy "pagos_compra: member all own" on public.pagos_compra for all to authenticated
  using (exists (select 1 from public.compras c where c.id = pagos_compra.compra_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.compras c where c.id = pagos_compra.compra_id and is_company_member(c.company_id)));
