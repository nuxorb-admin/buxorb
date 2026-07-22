# Nuxorb — documentación técnica

> Para la visión de producto a largo plazo (SaaS multi-tenant real, subdominios,
> monorepo, Supabase Vault) ver [`ARQUITECTURA.md`](./ARQUITECTURA.md) — es un
> documento de referencia/vocabulario, **no** describe lo que está construido hoy.
> Este archivo sí describe el estado real del repo.

## Qué es este repo

Una sola SPA (Vite + React 19 + TypeScript + React Router 6) que sirve **tres cosas
distintas** bajo el mismo dominio `nuxorb.com`, diferenciadas por ruta o por
subdominio:

| Superficie | URL | Quién la usa | Código |
|---|---|---|---|
| Landing de marketing | `nuxorb.com` | Público / prospectos | `src/site/`, `src/components/` |
| CRM interno | `nuxorb.com/admin` | El equipo (login con Supabase Auth) | `src/admin/` |
| Demo genérico del SaaS | `nuxorb.com/demo-saas` | Prospectos sin empresa registrada (contraseña compartida) | `src/demo-saas/`, `src/product/` |
| Portal por cliente | `<subdominio>.app.nuxorb.com` | Empresas ya dadas de alta en el CRM | `src/product/TenantPortal.tsx`, `src/product/` |

**Contexto de negocio**: Nuxorb pasó de posicionarse como "agencia de software a
medida" a vender un producto SaaS modular para PyMEs mexicanas (4 módulos:
Tesorería, Compras y Proveedores, Gestión de Personal, Ventas y CxC — ver
`src/data/modules.ts` para el copy y pricing exacto). El producto real (la lógica
de negocio de esos 4 módulos) **todavía no existe**: lo que hay hoy es la landing
que lo vende, el CRM para llevar el registro de qué cliente contrató qué, y un
demo funcional de un solo módulo (Tesorería) para empezar a probar la idea.

## Stack

- **React 19 + TypeScript + Vite 6** — build y dev server (`npm run dev` en
  `localhost:4321`).
- **Tailwind CSS v4** — tema CSS-first en `src/index.css` (paleta ink/teal/orange/mint,
  fuentes Anton/Montserrat/Space Mono/Inter).
- **React Router 6** — un único árbol de rutas en `src/App.tsx`; sin servidor/SSR,
  es una SPA pura desplegada en Vercel (`vercel.json` solo tiene rewrites a
  `index.html`).
- **Supabase** — Postgres + Auth. Un solo proyecto, un solo schema (`public`),
  compartido por las tres superficies. Cliente en `src/lib/supabase.ts`
  (sin genérico `Database` de supabase-js; los tipos se mantienen a mano en
  `src/lib/database.types.ts`).
- **@dnd-kit** — drag & drop del kanban de Leads y Tareas en el CRM
  (`src/admin/components/KanbanBoard.tsx`).

## Routing y detección de tenant (`src/App.tsx`)

Antes de decidir qué árbol de rutas mostrar, `App.tsx` revisa el hostname:

```ts
function getTenantSlug(): string | null {
  if (import.meta.env.DEV) {
    const fromQuery = new URLSearchParams(window.location.search).get("tenant");
    if (fromQuery) return fromQuery; // override para probar en local: ?tenant=chino
  }
  const parts = window.location.hostname.split(".");
  if (parts.length > 2 && parts[0] !== "www") return parts[0];
  return null;
}
```

- Si hay un subdominio → se renderiza `<TenantPortal slug={tenant} />` y nada más
  (no hay `/admin` ni landing en ese hostname).
- Si no hay subdominio → árbol normal: `/` (landing), `/demo-saas/*`, `/admin/*`.

No hay middleware de servidor (es una SPA estática): la detección es 100% en el
cliente, por eso el chequeo de subdominio pasa *antes* de montar `<Routes>`.

## El demo del SaaS (`src/product/`)

Un solo conjunto de páginas, compartido por dos puntos de entrada:

- **`/demo-saas`** (`src/demo-saas/DemoGateWrapper.tsx`) — gate de contraseña
  compartida (`VITE_DEMO_SAAS_PASSPHRASE`, sin cuentas reales), aislado por
  `session_id` (uuid en `localStorage`, `src/demo-saas/useDemoSession.ts`). Para
  prospectos que todavía no son un registro en el CRM.
- **`<subdomain>.app.nuxorb.com`** (`src/product/TenantPortal.tsx`) — busca la
  empresa en `companies` por `subdomain`, trae sus `company_modules` activos, y
  muestra **solo esos módulos** (no los 4 siempre). Aislado por `company_id` real.

Ambos renderizan `src/product/ProductLayout.tsx` (sidebar + `<Outlet
context={{scopeId}}/>`) y las mismas 4 páginas de módulo:

| Módulo | Archivo | Estado |
|---|---|---|
| Tesorería | `src/product/pages/Tesoreria.tsx` | **Funcional** — CRUD real contra `demo_treasury_entries`, filtrado por `scopeId` |
| Compras y Proveedores | `src/product/pages/Compras.tsx` | Maqueta — datos fijos de `src/product/sampleData.ts` |
| Gestión de Personal | `src/product/pages/Personal.tsx` | Maqueta |
| Ventas y CxC | `src/product/pages/Ventas.tsx` | Maqueta |

`scopeId` es lo único que cambia entre el demo genérico y un tenant real —
mismo componente, misma tabla, distinto valor de filtro.

## Subdominios por cliente

- Al crear una empresa en `/admin/companies`, se genera un `subdomain` único
  automáticamente (slug del nombre, `src/lib/slugify.ts`, con sufijo numérico si
  ya existe). Editable después en `CompanyDetail.tsx`.
- DNS: `*.app.nuxorb.com` está delegado a los nameservers de Vercel
  (`ns1/ns2.vercel-dns.com`) mediante registros **NS solo para el subdominio
  `app`** en GoDaddy — **no** se movieron los nameservers de `nuxorb.com`
  completo, porque el dominio raíz tiene correo real (Google Workspace: MX,
  SPF, DKIM, DMARC) que se habría roto con una delegación completa.
- La base del dominio de tenant es configurable vía `VITE_TENANT_BASE_DOMAIN`
  (hoy `app.nuxorb.com`) — usado solo para armar el link "Ver portal →" en el
  CRM; la detección de subdominio en sí (`getTenantSlug()`) no depende de esta
  variable, funciona con cualquier hostname de 3+ partes.

## Modelo de datos (Supabase, un solo schema `public`)

Definición completa en [`supabase/migrations/`](../supabase/migrations/) —
archivos numerados, en orden (`0001_...sql`, `0002_...`, etc.), cada uno
idempotente (`if not exists` / `drop policy if exists` + `create`) para que se
puedan volver a correr sin tronar aunque parte ya esté aplicada. Cualquier
cambio de aquí en adelante se agrega como un archivo nuevo con el siguiente
número — nunca se edita uno ya aplicado.

| Tabla | Para qué | RLS |
|---|---|---|
| `profiles` | Espejo de `auth.users`. `kind` (`team`\|`client`) distingue cuenta del equipo vs. cuenta de un cliente — **todo lo demás depende de esto** (ver seguridad abajo) | Equipo autenticado lee todo; cada quien edita solo el suyo |
| `companies` | Empresas del CRM. También son los "tenants": `subdomain`, `product_line` (`saas`\|`crm`\|`erp`), `max_users` | Equipo: todo. Público (`anon`): solo lectura de filas con `subdomain is not null` (para el login del portal) |
| `contacts` | Personas de contacto de una empresa | Equipo: todo |
| `leads` | Pipeline de ventas (kanban por etapa) | Equipo: todo. Público: `insert` desde el formulario de contacto de la landing |
| `tasks` | Tareas estilo Jira (kanban por status) | Equipo: todo |
| `notes` | Timeline de comentarios, polimórfico (`lead`\|`company`\|`task`) | Equipo: todo |
| `company_modules` | Qué módulo del SaaS + qué nivel (essential/professional/enterprise) tiene contratado cada empresa | Equipo: todo. Miembros de esa empresa: lectura propia. Público: solo módulos `active=true` de empresas con `subdomain` (login del portal) |
| `company_addons` | Los 8 productos adicionales del pricing, por empresa | Equipo: todo |
| `company_roles` | Roles definidos por cada empresa (ej. "Administrador", "Cajero") | Equipo: todo. Miembros: lectura propia. Owner de esa empresa: escritura |
| `company_role_modules` | Qué módulos puede ver cada rol (many-to-many rol↔módulo) | Igual que `company_roles` |
| `company_users` | Usuarios de una empresa: `user_id` (auth.users) + `role_id` + `is_owner`. El primer usuario de cada empresa (el que se le entrega al cliente) es `is_owner = true` | Igual que `company_roles` |
| `demo_treasury_entries` | Movimientos del único módulo funcional (Tesorería), filtrados por `scope_id` | **Abierta a `anon` y `authenticated`** — ver advertencia de seguridad abajo |

### Equipo interno vs. cuentas de clientes — `is_team_member()`

Desde que el portal de cada tenant tiene login real (usuarios creados vía la
Edge Function `create-company-user`), existen cuentas de **clientes** en el
mismo proyecto de Supabase Auth que las del equipo interno. Por eso ninguna
policy del CRM usa `to authenticated using (true)` — todas usan
`is_team_member()` (lee `profiles.kind = 'team'`), y `RequireAuth.tsx` en
`/admin` hace la misma verificación del lado del cliente como defensa en
profundidad. Un usuario de una empresa (`kind = 'client'`) solo puede leer/
escribir lo de **su propia empresa**, vía `is_company_member()` /
`is_company_owner()`.

### Edge Function: `create-company-user`

`supabase/functions/create-company-user/` — crear una cuenta de Supabase Auth
requiere la *service role key*, que nunca debe llegar al navegador. Esta
función (Deno, corre en el servidor de Supabase) recibe `{ company_id, email,
full_name, role_id, is_owner }`, valida que quien llama sea del equipo o el
owner de esa empresa, genera una contraseña temporal, crea el usuario, marca
su `profiles.kind = 'client'`, y lo liga en `company_users`. Se llama desde
`CompanyUsersRoles.tsx` (usado tanto en `/admin/companies/:id` como en la
página "Usuarios y roles" del portal del tenant) vía
`supabase.functions.invoke("create-company-user", ...)`.

## ⚠️ Seguridad / limitaciones conocidas

- **`demo_treasury_entries` no tiene aislamiento real por tenant a nivel de base
  de datos.** La policy es `using (true)` para cualquiera, autenticado o no —
  necesario para que el demo funcione sin pedir login a cada visitante. El
  aislamiento entre empresas es solo un filtro `WHERE scope_id = ...` en el
  cliente, no una regla de RLS que verifique identidad. Es aceptable mientras
  esa tabla solo tenga datos de ejemplo/prueba (como ahora) — **no meter ahí
  información financiera real de un cliente pagando** sin antes reescribir la
  policy con una verificación de identidad real.
- **Compras, Personal y Ventas no tienen lógica de negocio** — son vistas con
  datos fijos, no leen ni escriben nada. No prometerle a un cliente real que
  esos módulos "funcionan".
- **`product_line` (CRM/ERP) no tiene módulos definidos todavía** — el selector
  existe en `CompanyDetail.tsx`, pero si una empresa no es `saas` solo se
  muestra un aviso ("se define cuando esa línea se construya").
- El correo de la empresa vive en GoDaddy, fuera del control de Vercel — no
  tocar los nameservers raíz de `nuxorb.com` (ver sección de subdominios).

## Variables de entorno

Ver [`.env.example`](../.env.example). Todas con prefijo `VITE_` (se exponen al
cliente — no poner ahí nada que deba quedar secreto de verdad):

| Variable | Para qué |
|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Cliente de Supabase (`src/lib/supabase.ts`) |
| `VITE_DEMO_SAAS_PASSPHRASE` | Contraseña compartida del gate en `/demo-saas` |
| `VITE_TENANT_BASE_DOMAIN` | Dominio base para armar el link "Ver portal →" en el CRM (default `nuxorb.com` si no se define) |

## Setup local

```bash
npm install
cp .env.example .env.local   # completar con credenciales reales
npm run dev                  # http://localhost:4321
```

Para probar un subdominio de tenant en local, sin DNS: agregar `?tenant=<slug>`
a la URL (ej. `http://localhost:4321/?tenant=chino`) — solo funciona en modo
`DEV`.

Correr las migraciones de [`supabase/migrations/`](../supabase/migrations/)
en orden, en el SQL Editor del proyecto de Supabase. Si ya vinculaste el
proyecto con el CLI (`npx supabase link --project-ref <ref>`), también se
puede con `npx supabase db push` — como cada archivo es idempotente, es
seguro correrlo aunque parte ya esté aplicada.

La Edge Function se despliega aparte (no la corre `db push`):
```bash
npx supabase functions deploy create-company-user
```
No hace falta configurar ningún secreto — Supabase le inyecta automáticamente
`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` a toda Edge Function.

## Mapa de archivos clave

```
src/
├── App.tsx                    # rutas + detección de tenant por hostname
├── site/MarketingSite.tsx     # ensambla las secciones de la landing
├── components/sections/       # Hero, Problema, Solucion, Modulos, Niveles,
│                               #   Proceso, Contacto, CtaFinal
├── data/modules.ts            # copy + pricing de los 4 módulos, tiers, addons
├── admin/                     # CRM interno (protegido por Supabase Auth, kind='team')
│   ├── AuthProvider.tsx · RequireAuth.tsx · AdminLayout.tsx
│   ├── components/CompanyUsersRoles.tsx  # roles + usuarios de una empresa (compartido con el portal)
│   └── pages/                 # Dashboard, Leads, Companies, CompanyDetail,
│                               #   Tasks, Team, Login
├── demo-saas/                 # gate de contraseña compartida + sesión de demo genérico
├── product/                   # módulos del SaaS, compartidos por /demo-saas y el portal
│   ├── ProductLayout.tsx · TenantPortal.tsx
│   ├── TenantAuthProvider.tsx · TenantLogin.tsx   # login real del portal (kind='client')
│   └── pages/                 # Tesoreria (real), Compras/Personal/Ventas (maqueta), UsersRoles
└── lib/                       # supabase.ts, database.types.ts, slugify.ts

supabase/migrations/           # DDL + RLS, numerado, idempotente
supabase/functions/create-company-user/  # Edge Function: crea usuarios de empresa (service role)
docs/ARQUITECTURA.md           # visión a futuro (multi-tenant real, fuera de alcance hoy)
```
