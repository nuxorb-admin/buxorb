-- =========================================================
-- 0015 — Ventas y CxC a nivel producción (Essential + Professional),
-- siguiendo docs/ventas-cxc-modulo-V1.md. Mismo patrón de RLS que los otros
-- 3 módulos: company_id explícito, equipo todo, is_company_member para la
-- empresa dueña.
--
-- Adaptación deliberada: el MD describe `cliente` como una tabla nueva en un
-- schema `compartido` (para que otros módulos futuros la reutilicen). Este
-- proyecto usa un solo schema `public` — se crea como tabla compartida ahí
-- mismo (`clientes`), consistente con el patrón ya usado para
-- mov_esperados/mov_confirmados.
--
-- Fuera de alcance en esta fase (igual que el propio MD lo marca): timbrado
-- CFDI real (solo se guardan los campos si se timbra manualmente después),
-- envío real de recordatorios de cobranza por correo (Resend) — se
-- documenta como "candidato de automatización N8N, pendiente de diseño" en
-- el MD mismo, así que no se construye la infraestructura de envío aquí.
-- =========================================================

create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  razon_social text not null,
  nombre_comercial text,
  rfc text,
  regimen_fiscal text,
  uso_cfdi text,
  codigo_postal_fiscal text,
  email text,
  telefono text,
  dias_credito integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.prospectos (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  contacto_nombre text,
  contacto_telefono text,
  contacto_correo text,
  origen text not null default 'otro' check (origen in ('referido', 'web', 'redes', 'otro')),
  notas text,
  created_at timestamptz not null default now()
);

create table if not exists public.etapas_pipeline (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  orden integer not null default 1,
  created_at timestamptz not null default now(),
  unique (company_id, nombre)
);

create table if not exists public.motivos_perdida (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now(),
  unique (company_id, nombre)
);

create table if not exists public.oportunidades (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  prospecto_id uuid references public.prospectos (id) on delete set null,
  cliente_id uuid references public.clientes (id) on delete set null,
  descripcion text not null,
  monto_estimado numeric,
  moneda text not null default 'MXN',
  estado text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'negociacion', 'ganada', 'perdida')),
  etapa_id uuid references public.etapas_pipeline (id) on delete set null,
  responsable_usuario_id uuid references public.profiles (id) on delete set null,
  motivo_perdida_id uuid references public.motivos_perdida (id) on delete set null,
  fecha_estimada_cierre date,
  created_at timestamptz not null default now()
);

create table if not exists public.productos_servicios (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  nombre text not null,
  descripcion text,
  unidad text not null default 'pza',
  precio_unitario numeric not null default 0,
  tasa_iva text not null default '16' check (tasa_iva in ('16', '0', 'exento')),
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ventas_settings (
  company_id uuid primary key references public.companies (id) on delete cascade,
  umbral_descuento_pct numeric not null default 20
);

create table if not exists public.cotizaciones (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  oportunidad_id uuid references public.oportunidades (id) on delete set null,
  cliente_id uuid references public.clientes (id) on delete set null,
  prospecto_id uuid references public.prospectos (id) on delete set null,
  version integer not null default 1,
  fecha_emision date not null default current_date,
  vigencia_hasta date,
  estado text not null default 'borrador' check (estado in ('borrador', 'enviada', 'aceptada', 'rechazada', 'vencida')),
  subtotal numeric not null default 0,
  descuento_total numeric not null default 0,
  iva numeric not null default 0,
  total numeric not null default 0,
  requiere_aprobacion boolean not null default false,
  aprobada_por uuid references public.profiles (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.cotizacion_detalle (
  id uuid primary key default gen_random_uuid(),
  cotizacion_id uuid not null references public.cotizaciones (id) on delete cascade,
  producto_servicio_id uuid references public.productos_servicios (id) on delete set null,
  descripcion text not null,
  cantidad numeric not null default 1,
  precio_unitario numeric not null default 0,
  descuento_pct numeric not null default 0,
  importe numeric not null default 0
);

create table if not exists public.pedidos (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  cotizacion_id uuid references public.cotizaciones (id) on delete set null,
  cliente_id uuid not null references public.clientes (id) on delete restrict,
  fecha date not null default current_date,
  condicion_pago text not null default 'contado' check (condicion_pago in ('contado', 'credito')),
  dias_credito integer not null default 0,
  fecha_compromiso date,
  estado text not null default 'abierto' check (estado in ('abierto', 'facturado_parcial', 'facturado', 'cancelado')),
  subtotal numeric not null default 0,
  iva numeric not null default 0,
  total numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.pedido_detalle (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos (id) on delete cascade,
  producto_servicio_id uuid references public.productos_servicios (id) on delete set null,
  descripcion text not null,
  cantidad numeric not null default 1,
  precio_unitario numeric not null default 0,
  descuento_pct numeric not null default 0,
  importe numeric not null default 0,
  cantidad_facturada numeric not null default 0
);

create table if not exists public.facturas (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  pedido_id uuid references public.pedidos (id) on delete set null,
  cliente_id uuid not null references public.clientes (id) on delete restrict,
  folio_interno text not null,
  fecha_emision date not null default current_date,
  condicion text not null default 'contado' check (condicion in ('contado', 'credito')),
  fecha_vencimiento date,
  subtotal numeric not null default 0,
  iva numeric not null default 0,
  total numeric not null default 0,
  saldo_pendiente numeric not null default 0,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'parcial', 'pagada', 'vencida', 'cancelada')),
  timbrada boolean not null default false,
  uuid_cfdi text,
  archivo_xml text,
  archivo_pdf text,
  created_at timestamptz not null default now(),
  unique (company_id, folio_interno)
);

create table if not exists public.factura_detalle (
  id uuid primary key default gen_random_uuid(),
  factura_id uuid not null references public.facturas (id) on delete cascade,
  producto_servicio_id uuid references public.productos_servicios (id) on delete set null,
  descripcion text not null,
  cantidad numeric not null default 1,
  precio_unitario numeric not null default 0,
  descuento_pct numeric not null default 0,
  importe numeric not null default 0
);

-- Anticipo capturado sobre un pedido (antes de existir factura) — se aplica
-- después como un cobro tipo 'anticipo' al saldo de la factura que se
-- genere desde ese pedido (sección 5.2/6.2 del MD).
create table if not exists public.anticipos_pedido (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos (id) on delete cascade,
  monto numeric not null check (monto > 0),
  fecha date not null default current_date,
  factura_id uuid references public.facturas (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.cobros (
  id uuid primary key default gen_random_uuid(),
  factura_id uuid not null references public.facturas (id) on delete cascade,
  fecha date not null default current_date,
  monto numeric not null check (monto > 0),
  tipo text not null default 'parcial' check (tipo in ('anticipo', 'parcial', 'total')),
  referencia text,
  origen text not null default 'modulo' check (origen in ('modulo', 'tesoreria')),
  created_at timestamptz not null default now()
);

create index if not exists oportunidades_company_idx on public.oportunidades (company_id, estado);
create index if not exists cotizaciones_company_idx on public.cotizaciones (company_id, estado);
create index if not exists pedidos_company_idx on public.pedidos (company_id, estado);
create index if not exists facturas_company_idx on public.facturas (company_id, estado);
create index if not exists cobros_factura_idx on public.cobros (factura_id);

-- ---------------------------------------------------------
-- RLS — mismo patrón: equipo todo, miembro de la empresa todo lo de su
-- empresa. Tablas sin company_id directo se validan a través de la tabla
-- padre (pedido/cotizacion/factura).
-- ---------------------------------------------------------

alter table public.clientes enable row level security;
alter table public.prospectos enable row level security;
alter table public.etapas_pipeline enable row level security;
alter table public.motivos_perdida enable row level security;
alter table public.oportunidades enable row level security;
alter table public.productos_servicios enable row level security;
alter table public.ventas_settings enable row level security;
alter table public.cotizaciones enable row level security;
alter table public.cotizacion_detalle enable row level security;
alter table public.pedidos enable row level security;
alter table public.pedido_detalle enable row level security;
alter table public.facturas enable row level security;
alter table public.factura_detalle enable row level security;
alter table public.anticipos_pedido enable row level security;
alter table public.cobros enable row level security;

drop policy if exists "clientes: team all" on public.clientes;
create policy "clientes: team all" on public.clientes for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "clientes: member all own" on public.clientes;
create policy "clientes: member all own" on public.clientes for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "prospectos: team all" on public.prospectos;
create policy "prospectos: team all" on public.prospectos for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "prospectos: member all own" on public.prospectos;
create policy "prospectos: member all own" on public.prospectos for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "etapas_pipeline: team all" on public.etapas_pipeline;
create policy "etapas_pipeline: team all" on public.etapas_pipeline for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "etapas_pipeline: member all own" on public.etapas_pipeline;
create policy "etapas_pipeline: member all own" on public.etapas_pipeline for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "motivos_perdida: team all" on public.motivos_perdida;
create policy "motivos_perdida: team all" on public.motivos_perdida for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "motivos_perdida: member all own" on public.motivos_perdida;
create policy "motivos_perdida: member all own" on public.motivos_perdida for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "oportunidades: team all" on public.oportunidades;
create policy "oportunidades: team all" on public.oportunidades for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "oportunidades: member all own" on public.oportunidades;
create policy "oportunidades: member all own" on public.oportunidades for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "productos_servicios: team all" on public.productos_servicios;
create policy "productos_servicios: team all" on public.productos_servicios for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "productos_servicios: member all own" on public.productos_servicios;
create policy "productos_servicios: member all own" on public.productos_servicios for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "ventas_settings: team all" on public.ventas_settings;
create policy "ventas_settings: team all" on public.ventas_settings for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "ventas_settings: member all own" on public.ventas_settings;
create policy "ventas_settings: member all own" on public.ventas_settings for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "cotizaciones: team all" on public.cotizaciones;
create policy "cotizaciones: team all" on public.cotizaciones for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "cotizaciones: member all own" on public.cotizaciones;
create policy "cotizaciones: member all own" on public.cotizaciones for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "pedidos: team all" on public.pedidos;
create policy "pedidos: team all" on public.pedidos for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "pedidos: member all own" on public.pedidos;
create policy "pedidos: member all own" on public.pedidos for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "facturas: team all" on public.facturas;
create policy "facturas: team all" on public.facturas for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "facturas: member all own" on public.facturas;
create policy "facturas: member all own" on public.facturas for all to authenticated using (is_company_member(company_id)) with check (is_company_member(company_id));

drop policy if exists "cotizacion_detalle: team all" on public.cotizacion_detalle;
create policy "cotizacion_detalle: team all" on public.cotizacion_detalle for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "cotizacion_detalle: member all own" on public.cotizacion_detalle;
create policy "cotizacion_detalle: member all own" on public.cotizacion_detalle for all to authenticated
  using (exists (select 1 from public.cotizaciones c where c.id = cotizacion_detalle.cotizacion_id and is_company_member(c.company_id)))
  with check (exists (select 1 from public.cotizaciones c where c.id = cotizacion_detalle.cotizacion_id and is_company_member(c.company_id)));

drop policy if exists "pedido_detalle: team all" on public.pedido_detalle;
create policy "pedido_detalle: team all" on public.pedido_detalle for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "pedido_detalle: member all own" on public.pedido_detalle;
create policy "pedido_detalle: member all own" on public.pedido_detalle for all to authenticated
  using (exists (select 1 from public.pedidos p where p.id = pedido_detalle.pedido_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.pedidos p where p.id = pedido_detalle.pedido_id and is_company_member(p.company_id)));

drop policy if exists "factura_detalle: team all" on public.factura_detalle;
create policy "factura_detalle: team all" on public.factura_detalle for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "factura_detalle: member all own" on public.factura_detalle;
create policy "factura_detalle: member all own" on public.factura_detalle for all to authenticated
  using (exists (select 1 from public.facturas f where f.id = factura_detalle.factura_id and is_company_member(f.company_id)))
  with check (exists (select 1 from public.facturas f where f.id = factura_detalle.factura_id and is_company_member(f.company_id)));

drop policy if exists "anticipos_pedido: team all" on public.anticipos_pedido;
create policy "anticipos_pedido: team all" on public.anticipos_pedido for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "anticipos_pedido: member all own" on public.anticipos_pedido;
create policy "anticipos_pedido: member all own" on public.anticipos_pedido for all to authenticated
  using (exists (select 1 from public.pedidos p where p.id = anticipos_pedido.pedido_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.pedidos p where p.id = anticipos_pedido.pedido_id and is_company_member(p.company_id)));

drop policy if exists "cobros: team all" on public.cobros;
create policy "cobros: team all" on public.cobros for all to authenticated using (is_team_member()) with check (is_team_member());
drop policy if exists "cobros: member all own" on public.cobros;
create policy "cobros: member all own" on public.cobros for all to authenticated
  using (exists (select 1 from public.facturas f where f.id = cobros.factura_id and is_company_member(f.company_id)))
  with check (exists (select 1 from public.facturas f where f.id = cobros.factura_id and is_company_member(f.company_id)));
