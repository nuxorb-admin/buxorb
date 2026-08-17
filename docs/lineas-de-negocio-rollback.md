# Rollback — Líneas de negocio (Restaurantes)

Cómo deshacer por completo el tercer eje de producto "Líneas de negocio"
y su primera línea, "Restaurantes", tanto en Supabase como en el código,
si se decide no seguir con él.

## 1. Supabase — datos y esquema

Correr a mano en el SQL Editor de Supabase, **no** se aplica solo:

```
supabase/migrations/rollback/0051_lineas_de_negocio_rollback.sql
```

Ese script borra las 8 tablas operativas `public.ldn_restaurant_*`
(hijas primero) y la tabla de activación
`nuxorb.ldn_company_business_lines`.

## 2. Supabase — Edge Functions

```bash
npx supabase functions delete close-restaurant-ticket
```

No hay secretos propios de este eje (a diferencia de Lealtad con Google
Wallet) — todo corre con las credenciales estándar del proyecto.

## 3. Código

Como es prácticamente todo archivos nuevos, lo más simple es `git revert`
del/los commit(s) que introdujeron "Líneas de negocio". Si se prefiere
borrar a mano:

**Archivos nuevos — borrar por completo:**

- `supabase/migrations/0051_lineas_de_negocio.sql`
- `supabase/migrations/0052_ldn_restaurant.sql`
- `supabase/migrations/rollback/0051_lineas_de_negocio_rollback.sql`
- `supabase/functions/close-restaurant-ticket/`
- `src/product/pages/Restaurantes.tsx`
- `src/product/pages/restaurantes/` (carpeta completa: `limits.ts`,
  `useRestaurantesData.ts`, `MenuTab.tsx`, `MesasTab.tsx`,
  `ComandasTab.tsx`, `CocinaTab.tsx`, `CajaTab.tsx`,
  `ReservacionesTab.tsx`)
- `docs/lineas-de-negocio-rollback.md` (este archivo)

**Archivos existentes — revertir solo las líneas de Líneas de negocio:**

- `src/lib/database.types.ts` — quitar `BusinessLineKey`,
  `BusinessLineTier`, la interfaz `CompanyBusinessLine`, los tipos de
  estado (`RestaurantTableStatus`, `RestaurantOrderStatus`,
  `RestaurantOrderItemStatus`, `RestaurantCashSessionStatus`,
  `RestaurantPaymentMethod`, `RestaurantReservationStatus`) y las
  interfaces `RestaurantMenuItem`, `RestaurantTable`, `RestaurantOrder`,
  `RestaurantOrderItem`, `RestaurantCashSession`, `RestaurantTicket`,
  `RestaurantTicketPayment`, `RestaurantReservation`.
- `src/admin/pages/CompanyDetail.tsx` — quitar el import de
  `BusinessLineKey`/`BusinessLineTier`/`CompanyBusinessLine`, las
  constantes `BUSINESS_LINE_LABELS`/`BUSINESS_LINE_ORDER`/
  `BUSINESS_LINE_REQUIRES`, el estado `businessLines`, la consulta a
  `ldn_company_business_lines` dentro de `load()`, la función
  `setBusinessLineTier`, y la sección JSX "Líneas de negocio" completa.
- `src/product/TenantPortal.tsx` — quitar el import de
  `BusinessLineTier`, el `import Restaurantes from "./pages/Restaurantes"`,
  el estado `restaurantesTier`, la consulta a `ldn_company_business_lines`
  dentro de `loadMembership()`, la entrada condicional en `extraNav`, la
  rama del index redirect, y la ruta `restaurantes`.

Después de aplicar todo lo anterior, correr `npm run build` para confirmar
que no queda ninguna referencia suelta.

## Nota sobre futuras líneas de negocio

Si en el futuro se agrega otra línea (ej. "Peluquerías"), este rollback
**no** aplica a ella — cada línea tiene sus propias tablas
`ldn_<linea>_*` y su propio rollback. Solo borrar
`nuxorb.ldn_company_business_lines` completa si se da marcha atrás a
*todo* el eje, no a una sola línea.
