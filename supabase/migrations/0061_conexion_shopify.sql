-- =========================================================
-- 0061 — producto adicional "Conexión Shopify" (solo lectura, v1) y
-- pantalla "Conexiones" del portal del cliente.
--
-- integration_connections / integration_credentials: patrón de
-- whatsapp_connections / whatsapp_credentials (0044) — lo visible aparte
-- de las credenciales, y las credenciales SIN ninguna policy (solo las
-- lee la service role de las Edge Functions).
--
-- shopify_orders / shopify_products: espejo de solo lectura de lo que
-- trae la Edge Function shopify-sync. Los miembros solo hacen select;
-- nadie edita estos datos a mano (los pisaría la siguiente sincronización).
-- =========================================================

-- ---------------------------------------------------------
-- integration_connections
-- ---------------------------------------------------------
create table if not exists public.integration_connections (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  provider text not null check (provider in ('shopify')),
  display_name text not null,
  shop_domain text,
  status text not null default 'conectado' check (status in ('conectado', 'error')),
  last_synced_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  unique (company_id, provider)
);

create index if not exists integration_connections_company_idx on public.integration_connections (company_id);

alter table public.integration_connections enable row level security;

drop policy if exists "integration_connections: team all" on public.integration_connections;
create policy "integration_connections: team all" on public.integration_connections for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "integration_connections: member read own" on public.integration_connections;
create policy "integration_connections: member read own" on public.integration_connections for select to authenticated
  using (is_company_member(company_id));
drop policy if exists "integration_connections: owner delete own" on public.integration_connections;
create policy "integration_connections: owner delete own" on public.integration_connections for delete to authenticated
  using (is_company_owner(company_id));

-- ---------------------------------------------------------
-- integration_credentials — sin policies a propósito
-- ---------------------------------------------------------
create table if not exists public.integration_credentials (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null unique references public.integration_connections (id) on delete cascade,
  client_id text,
  client_secret text,
  access_token text,
  token_expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.integration_credentials enable row level security;

-- ---------------------------------------------------------
-- shopify_orders / shopify_products
-- ---------------------------------------------------------
create table if not exists public.shopify_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  connection_id uuid not null references public.integration_connections (id) on delete cascade,
  shopify_id text not null,
  name text,
  created_at_shopify timestamptz,
  financial_status text,
  fulfillment_status text,
  total numeric,
  currency text,
  line_items jsonb not null default '[]'::jsonb,
  unique (connection_id, shopify_id)
);

create index if not exists shopify_orders_company_idx on public.shopify_orders (company_id, created_at_shopify desc);

create table if not exists public.shopify_products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references nuxorb.companies (id) on delete cascade,
  connection_id uuid not null references public.integration_connections (id) on delete cascade,
  shopify_id text not null,
  title text not null,
  status text,
  vendor text,
  product_type text,
  image_url text,
  variants jsonb not null default '[]'::jsonb,
  unique (connection_id, shopify_id)
);

create index if not exists shopify_products_company_idx on public.shopify_products (company_id);

alter table public.shopify_orders enable row level security;
alter table public.shopify_products enable row level security;

drop policy if exists "shopify_orders: team all" on public.shopify_orders;
create policy "shopify_orders: team all" on public.shopify_orders for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "shopify_orders: member read own" on public.shopify_orders;
create policy "shopify_orders: member read own" on public.shopify_orders for select to authenticated
  using (is_company_member(company_id));

drop policy if exists "shopify_products: team all" on public.shopify_products;
create policy "shopify_products: team all" on public.shopify_products for all to authenticated
  using (is_team_member()) with check (is_team_member());
drop policy if exists "shopify_products: member read own" on public.shopify_products;
create policy "shopify_products: member read own" on public.shopify_products for select to authenticated
  using (is_company_member(company_id));

-- ---------------------------------------------------------
-- Registrar el addon y el permiso por rol
-- ---------------------------------------------------------
alter table nuxorb.company_addons drop constraint if exists company_addons_addon_check;
alter table nuxorb.company_addons add constraint company_addons_addon_check
  check (addon in (
    'checador_basico', 'portal_empleado', 'ptu', 'conciliacion_pdf_ampliada',
    'lectura_tickets_ampliada', 'inventario', 'timbrado_cfdi', 'chatbot_cobranza',
    'agentes_ia', 'lealtad', 'prorrateo', 'shopify'
  ));

alter table public.company_role_modules drop constraint if exists company_role_modules_module_check;
alter table public.company_role_modules add constraint company_role_modules_module_check
  check (module in (
    'tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc',
    'crm_pipeline_ventas',
    'erp_inventario',
    'agentes_ia', 'lealtad', 'restaurantes', 'shopify'
  ));
