# Rollback — Lealtad (producto adicional)

Cómo deshacer por completo el producto adicional "Lealtad" (tarjeta de
sellos en Google Wallet), tanto en Supabase como en el código, si se
decide no seguir con él.

## 1. Supabase — datos y esquema

Correr a mano en el SQL Editor de Supabase, **no** se aplica solo:

```
supabase/migrations/rollback/0049_lealtad_rollback.sql
```

Ese script quita cualquier empresa con el addon activo, angosta de vuelta
el `check` de `company_addons.addon`, borra `loyalty_members` y
`loyalty_programs`, y borra el bucket `loyalty-logos` (con sus objetos y
policies).

## 2. Supabase — Edge Functions

```bash
npx supabase functions delete loyalty-save-program
npx supabase functions delete loyalty-enroll
npx supabase functions delete loyalty-add-stamp
```

Y quitar los secretos que ya no se usan:

```bash
npx supabase secrets unset GOOGLE_WALLET_ISSUER_ID
npx supabase secrets unset GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL
npx supabase secrets unset GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY_B64
```

## 3. Código

Como es prácticamente todo archivos nuevos, lo más simple es `git revert`
del commit que introdujo "Lealtad". Si se prefiere borrar a mano:

**Archivos nuevos — borrar por completo:**

- `supabase/migrations/0049_lealtad.sql`
- `supabase/migrations/0050_loyalty_logos_storage.sql`
- `supabase/migrations/rollback/0049_lealtad_rollback.sql`
- `supabase/functions/loyalty-save-program/` (index.ts + googleWallet.ts)
- `supabase/functions/loyalty-enroll/` (index.ts + googleWallet.ts)
- `supabase/functions/loyalty-add-stamp/` (index.ts + googleWallet.ts) —
  `googleWallet.ts` está duplicado igual en las tres carpetas a propósito
  (el bundler de Supabase no siempre resuelve imports cruzados a una
  carpeta `_shared/`), no es un archivo compartido aparte.
- `src/product/pages/Lealtad.tsx`
- `src/product/pages/lealtad/useLealtadData.ts`
- `src/product/pages/lealtad/ConfigurarTarjetaTab.tsx`
- `src/product/pages/lealtad/MiembrosTab.tsx`
- `src/public/LoyaltyEnroll.tsx` (y la carpeta `src/public/` si queda vacía)
- `docs/lealtad-rollback.md` (este archivo)

**Archivos existentes — revertir solo las líneas de Lealtad:**

- `src/lib/database.types.ts` — quitar `"lealtad"` de `CompanyAddonName`,
  el tipo `LoyaltyTemplateKey`, y las interfaces `LoyaltyProgram`/
  `LoyaltyMember`.
- `src/lib/moduleCategories.ts` — quitar `lealtad: "crm"` de
  `ADDON_CATEGORY`.
- `src/admin/pages/CompanyDetail.tsx` — quitar `lealtad: "Lealtad"` de
  `ADDON_LABELS`.
- `src/product/TenantPortal.tsx` — quitar el estado `lealtadActivo`, su
  consulta a `company_addons`, la entrada condicional en `extraNav`, la
  rama del index redirect, la ruta `lealtad` (y el prop `subdomain` que le
  pasa), el `import Lealtad from "./pages/Lealtad"`, la constante
  `ENROLL_PATH`, el bloque `if (enrollMatch)` que renderiza
  `LoyaltyEnroll` sin auth, y el
  `import LoyaltyEnroll from "../public/LoyaltyEnroll"`.
- `package.json` — quitar `qrcode`, `@types/qrcode` y `jsqr` (este último
  agregado para el escáner de QR de "Miembros") si no se usan en ningún
  otro lado (correr `npm uninstall qrcode @types/qrcode jsqr`).

Después de aplicar todo lo anterior, correr `npm run build` para confirmar
que no queda ninguna referencia suelta.
