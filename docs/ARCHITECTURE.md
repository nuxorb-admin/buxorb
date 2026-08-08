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
| Demo del SaaS | `nuxorb.com/demo-saas` | Prospectos interesados (login compartido de la empresa "Empresa Demo") | `src/product/TenantPortal.tsx`, `src/product/` |
| Portal por cliente | `<subdominio>.app.nuxorb.com` | Empresas ya dadas de alta en el CRM | `src/product/TenantPortal.tsx`, `src/product/` |

`/demo-saas` **no** es una reimplementación aparte — es `TenantPortal`
apuntado con un slug fijo (`"demo"`) en vez de resolverlo por hostname (ver
`src/App.tsx`), contra una empresa real llamada "Empresa Demo" dada de alta
en `/admin/companies` con los 4 módulos activos en Professional. El
prospecto ve exactamente el mismo producto, con el mismo login y el mismo
RLS, que cualquier cliente real — no una versión reducida ni datos de
ejemplo hardcodeados en el código.

**Nota — esto es distinto de `nuxorb.com/demos`** (`public/demos/`): esa es
una pieza completamente aparte, sin backend, servida como su propio bundle
estático vía `vercel.json` — un catálogo de conceptos de industria genéricos
("NUXORB Experience"), no relacionado con el producto real. No se toca en
este cambio.

**Contexto de negocio**: Nuxorb pasó de posicionarse como "agencia de software a
medida" a vender **un solo producto SaaS modular** para PyMEs mexicanas, con 4
módulos fijos (Tesorería, Compras y Proveedores, Gestión de Personal, Ventas y
CxC — ver `src/data/modules.ts` para el copy/pricing de la landing, y
`docs/*-modulo-v1.md` para la especificación funcional detallada de cada uno).
Nuxorb **no** vende líneas de producto separadas (nada de "CRM" o "ERP" como
productos aparte) — funciones como el pipeline visual de ventas o el control de
inventario son parte de Ventas y CxC / un producto adicional de Compras y
Proveedores, respectivamente, dentro de este mismo SaaS.

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

## El sistema SaaS — 4 módulos (`src/product/`)

Un solo producto, un solo `product_line` (`'saas'`, fijo — el campo existe en
`companies` por si algún día se necesita distinguir algo, pero hoy solo acepta
ese valor). Cuatro módulos fijos: Tesorería, Compras y Proveedores, Gestión de
Personal, Ventas y CxC.

| Módulo | Archivo | Estado |
|---|---|---|
| Tesorería | `src/product/pages/Tesoreria.tsx` + `src/product/pages/treasury/` | **Funcional, nivel producción** — Essential/Professional reales contra `treasury_accounts/categories/movements/statement_imports`, filtrado por `company_id` (no `scope_id`) |
| Compras y Proveedores | `src/product/pages/Compras.tsx` + `src/product/pages/compras/` | **Funcional, nivel producción** — Essential/Professional reales, filtrado por `company_id`. Ver `docs/compras-proveedores-modulo-v1.md` para lo construido vs. pendiente ("Pendiente V2") |
| Gestión de Personal | `src/product/pages/Personal.tsx` + `src/product/pages/personal/` | **Funcional, nivel producción** — Essential/Professional reales, filtrado por `company_id`. Ver `docs/gestion-personal-modulo-v1.md` |
| Ventas y CxC | `src/product/pages/Ventas.tsx` + `src/product/pages/ventas/` | **Funcional, nivel producción** — Essential/Professional reales, filtrado por `company_id`. Ver `docs/ventas-cxc-modulo-V1.md` |

Un solo punto de entrada real para los 4 módulos: `src/product/TenantPortal.tsx`.
Busca la empresa por `subdomain`, pasa por `TenantAuthProvider`/`TenantLogin`
(login real, con roles `company_roles`/`company_role_modules` que deciden qué
módulos ve cada usuario — ver sección de usuarios abajo), y muestra los
módulos activos (`company_modules`) con `scopeId = company.id`.

`TenantPortal` se monta de dos formas, ambas contra datos reales — la única
diferencia es de dónde sale el `slug`:

- **Portal por cliente** (`<subdomain>.app.nuxorb.com`) — `App.tsx` detecta el
  subdominio del hostname (`getTenantSlug()`) y monta `<TenantPortal
  slug={tenant}/>`.
- **Demo** (`nuxorb.com/demo-saas/*`) — mismo componente, slug fijo `"demo"`
  (`<Route path="/demo-saas/*" element={<TenantPortal slug="demo" />} />`),
  apuntando a la empresa "Empresa Demo" del CRM.

`ProductLayout.tsx` (sidebar con los módulos activos + `<Outlet
context={{scopeId}}/>`) es el shell de `TenantPortal`, así que también es
compartido entre el demo y el portal real — es literalmente el mismo árbol
de componentes.

### Categoría interna (CRM/ERP/Otro) — solo metadata de catálogo

`src/lib/moduleCategories.ts` etiqueta cada módulo y cada producto adicional
con una categoría **puramente interna** (`crm` | `erp` | `otro`) — para que el
equipo pueda filtrar/organizar su catálogo en "Suscripción Nuxorb"
(`CompanyDetail.tsx`) mentalmente, ej. "esto se parece a lo que sería nuestro
CRM". **No es una línea de producto ni afecta nada técnico** — el cliente
nunca la ve, y no cambia qué tablas usa el módulo ni cómo se factura. Editable
a mano (son dos objetos literales) si cambia el criterio.

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
| `companies` | Empresas del CRM. También son los "tenants": `subdomain`, `product_line` (fijo `'saas'`), `max_users` | Equipo: todo. Público (`anon`): solo lectura de filas con `subdomain is not null` (para el login del portal) |
| `contacts` | Personas de contacto de una empresa | Equipo: todo |
| `leads` | Pipeline de ventas (kanban por etapa) | Equipo: todo. Público: `insert` desde el formulario de contacto de la landing |
| `tasks` | Tareas estilo Jira (kanban por status) | Equipo: todo |
| `notes` | Timeline de comentarios, polimórfico (`lead`\|`company`\|`task`) | Equipo: todo |
| `company_modules` | Qué módulo del SaaS + qué nivel (essential/professional/enterprise) + `seats` tiene contratado cada empresa | Equipo: todo. Miembros de esa empresa: lectura propia. Público: solo módulos `active=true` de empresas con `subdomain` (login del portal) |
| `company_addons` | Los 8 productos adicionales del pricing, por empresa | Equipo: todo |
| `company_roles` | Roles definidos por cada empresa (ej. "Administrador", "Cajero") | Equipo: todo. Miembros: lectura propia. Owner de esa empresa: escritura |
| `company_role_modules` | Qué módulos puede ver cada rol (many-to-many rol↔módulo) | Igual que `company_roles` — al marcar/crear se valida contra `company_modules.seats` (ver `CompanyUsersRoles.tsx`, no es un límite de RLS) |
| `company_users` | Usuarios de una empresa: `user_id` (auth.users) + `role_id` + `is_owner`. El primer usuario de cada empresa (el que se le entrega al cliente) es `is_owner = true` y ve todos los módulos activos sin importar su rol | Igual que `company_roles` |
| `treasury_accounts` / `treasury_categories` / `treasury_movements` / `treasury_statement_imports` | Esquema de producción de Tesorería, por `company_id` real (no `scope_id`) | Equipo: todo. Miembros de esa empresa: todo lo de su empresa |
| `demo_crm_deals` / `demo_erp_inventory_movements` | Sin uso — quedaron de un prototipo anterior de "CRM/ERP como líneas de producto aparte", descartado (ver contexto arriba) | Sin código que las lea/escriba |

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

### Edge Function: `parse-bank-statement`

`supabase/functions/parse-bank-statement/` — lectura por IA de estados de
cuenta PDF (Tesorería, nivel Professional únicamente, validado también del
lado del servidor). Manda el PDF en base64 a la API de Claude
(`claude-sonnet-5`, soporte nativo de documentos) con tool use forzado para
sacar transacciones estructuradas; nunca inserta directo — regresa la lista
propuesta para que el usuario confirme en `treasury/ConciliacionTab.tsx`.
Requiere el secreto `ANTHROPIC_API_KEY` (`npx supabase secrets set
ANTHROPIC_API_KEY=...`, no se inyecta solo como el service role key).

## ⚠️ Seguridad / limitaciones conocidas

- **La empresa "Empresa Demo" comparte un solo login entre todos los
  prospectos** que reciben la contraseña — no está aislada por sesión/visitante
  como el viejo demo genérico. Cualquiera con ese login ve y puede modificar
  los mismos datos que vio el último prospecto (mismo RLS que un cliente real,
  sin excepción de seguridad — el riesgo aquí es de higiene de datos, no de
  aislamiento). No hay todavía un mecanismo de "restablecer datos de la demo".
- **Los 4 módulos (Tesorería, Compras, Personal, Ventas) están en producción**
  — cada `docs/*-modulo-v1.md` documenta con ✅/⏳ qué se construyó de cada
  subproceso y qué queda en "Pendiente para V2" (no roto, decidido dejar
  para después). Revisar esa sección antes de prometerle a un cliente una
  funcionalidad específica.
- El correo de la empresa vive en GoDaddy, fuera del control de Vercel — no
  tocar los nameservers raíz de `nuxorb.com` (ver sección de subdominios).

## Variables de entorno

Ver [`.env.example`](../.env.example). Todas con prefijo `VITE_` (se exponen al
cliente — no poner ahí nada que deba quedar secreto de verdad):

| Variable | Para qué |
|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Cliente de Supabase (`src/lib/supabase.ts`) |
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
├── product/                   # los 4 módulos del SaaS, un solo punto de entrada real
│   ├── ProductLayout.tsx       # shell con sidebar, moduleNav de los 4 módulos
│   ├── TenantPortal.tsx          # resuelve la empresa por subdomain (o slug fijo "demo") + login + arma scopeId
│   ├── TenantAuthProvider.tsx · TenantLogin.tsx   # login real del portal (kind='client')
│   └── pages/
│       ├── Tesoreria.tsx (producción, real) · treasury/ (tabs + lógica)
│       ├── Compras.tsx (producción, real) · compras/ (tabs + lógica)
│       ├── Personal.tsx (producción, real) · personal/ (tabs + lógica)
│       ├── Ventas.tsx (producción, real) · ventas/ (tabs + lógica)
│       └── UsersRoles.tsx
└── lib/                       # supabase.ts, database.types.ts, slugify.ts, moduleCategories.ts

supabase/migrations/           # DDL + RLS, numerado, idempotente
supabase/functions/create-company-user/     # Edge Function: crea usuarios de empresa (service role)
supabase/functions/parse-bank-statement/    # Edge Function: IA para conciliación de Tesorería (Professional)
docs/*-modulo-v1.md            # especificación funcional detallada de cada módulo (fuente de verdad al construir)
docs/ARQUITECTURA.md           # visión a futuro (multi-tenant real, fuera de alcance hoy)
```

## Cómo pedirle a Claude Code que siga construyendo cada sistema

**Antes de escribir el prompt: pega o menciona este archivo
(`docs/ARCHITECTURE.md`)** — le da a Claude Code el contexto completo (qué es
real, dónde vive cada cosa) sin que tenga que adivinar.

Los 4 módulos ya están en producción (Tesorería, Compras y Proveedores,
Gestión de Personal, Ventas y CxC), pero ninguno tiene el 100% de lo que su
MD describe — cada uno tiene su propia sección "Pendiente para V2" al final
del doc con lo que se dejó fuera a propósito. El patrón de referencia
arquitectónico es Tesorería (`src/product/pages/Tesoreria.tsx` +
`src/product/pages/treasury/`) — el primer módulo llevado a producción y el
que fija la convención de tabs/límites/hooks que los demás siguieron. La
fuente de verdad de **qué se construyó y qué falta** para cada módulo es su
MD en `docs/` (`tesoreria-modulo-v1.md`, `compras-proveedores-modulo-v1.md`,
`gestion-personal-modulo-v1.md`, `ventas-cxc-modulo-V1.md`,
`productos-adicionales.md`) — mucho más detallado que el copy de la landing
(`src/data/modules.ts`). Cualquier trabajo nuevo sobre un módulo existente,
o un módulo nuevo, debería seguir la misma receta:

1. Tabla(s) en Supabase con RLS por `company_id` (equipo todo,
   `is_company_member()`/`is_company_owner()` para la empresa dueña — mismo
   patrón que `treasury_*`), en una migración nueva
   `supabase/migrations/000N_....sql` — siguiente número, nunca editar una ya
   aplicada.
2. Página(s) en `src/product/pages/<Modulo>.tsx` (o carpeta si tiene varias
   pestañas, como `treasury/`) que reciban `scopeId` (= `company_id`) vía
   `useOutletContext<ProductContext>()` y hagan CRUD directo con
   `supabase.from(...)`.
3. Límites de nivel (Essential/Professional) aplicados en la UI contra
   `company_modules.tier`, siguiendo `src/product/pages/treasury/limits.ts`
   como referencia — no son un límite de RLS, es honestidad de facturación.
4. Conectarla a la navegación: el módulo ya existe en `MODULE_NAV` de
   `TenantPortal.tsx` (los 4 son fijos) — solo hace falta que
   `company_modules` tenga una fila activa para esa empresa.
5. Si agrega un producto adicional nuevo (ver `productos-adicionales.md`),
   sumarlo a `CompanyAddonName` (`database.types.ts`) y a
   `ADDON_CATEGORY`/`MODULE_CATEGORY` (`src/lib/moduleCategories.ts`) para que
   aparezca correctamente en el filtro de "Suscripción Nuxorb".

**Ejemplos de instrucciones:**

> Cierra uno de los puntos de "Pendiente para V2" en
> `docs/gestion-personal-modulo-v1.md` — el dashboard comparativo de
> Professional (§6.6: comparativo periodo a periodo, por departamento,
> ausentismo, rotación). Usa `src/product/pages/personal/NominaTab.tsx` como
> punto de partida, el flag `limits.dashboardComparativo` ya existe pero no
> se usa en ningún lado todavía.

> Agrega el subproceso de Conciliación bancaria de Tesorería
> (`docs/tesoreria-modulo-v1.md` sección 5) — hoy `treasury/ConciliacionTab.tsx`
> ya cubre esto a nivel básico, revisa qué falta contra el MD (ej. el reporte
> de discrepancias por motivo en Professional).

> Nota: el producto adicional Inventario (`docs/productos-adicionales.md` #5)
> ya no aplica tal cual está escrito — se decidió meter el catálogo de
> productos + kardex **dentro** de Compras y Proveedores (Professional) en
> vez de como addon aparte, ver `docs/compras-proveedores-modulo-v1.md`
> sección 7. Si se retoma como addon independiente en el futuro, sería para
> variantes por giro (recetas, multi-almacén) que hoy están fuera de
> alcance.
