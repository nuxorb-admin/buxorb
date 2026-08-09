# Rollback — Agentes IA (producto adicional)

Cómo deshacer por completo el producto adicional "Agentes IA" (catálogo de
tipos de agente + canal WhatsApp vía YCloud), tanto en Supabase como en el
código, si se decide no seguir con él.

## 1. Supabase — datos y esquema

Correr a mano en el SQL Editor de Supabase (o `psql`), **no** se aplica
solo:

```
supabase/migrations/rollback/0044_agentes_ia_rollback.sql
```

Ese script quita cualquier empresa con el addon activo, angosta de vuelta
el `check` de `company_addons.addon`, y borra las 7 tablas nuevas
(`whatsapp_messages`, `whatsapp_conversations`, `whatsapp_contacts`,
`whatsapp_credentials` si todavía existiera, `whatsapp_connections`,
`public.ai_agents`, `nuxorb.ai_agent_type_templates`). Al borrar esas
tablas también se van las policies y el rename de columna que agregaron
0045, 0046 y 0047 — esas tres migraciones no necesitan un rollback aparte,
solo aplican mientras las tablas existan.

## 2. Supabase — Edge Functions

Si ya se desplegaron, borrarlas desde el dashboard (Edge Functions) o:

```bash
npx supabase functions delete whatsapp-webhook
npx supabase functions delete send-whatsapp-message
```

(`save-whatsapp-credentials` ya no existe desde que se migró a YCloud —
si quedó desplegada de antes, bórrala también.)

Y quitar los secretos que ya no se usan:

```bash
npx supabase secrets unset YCLOUD_API_KEY
npx supabase secrets unset YCLOUD_WEBHOOK_SECRET
npx supabase secrets unset N8N_WEBHOOK_URL
npx supabase secrets unset N8N_CALLBACK_SECRET
```

## 3. Código — la forma más simple

Como es prácticamente todo archivos nuevos, lo más simple es
`git revert` de los commits que introdujeron "Agentes IA". Si se prefiere
borrar a mano (o el revert tiene conflictos), esta es la lista exacta:

**Archivos nuevos — borrar por completo:**

- `supabase/migrations/0044_agentes_ia.sql`
- `supabase/migrations/0045_company_addons_member_read.sql`
- `supabase/migrations/0046_ai_agents_read_only_for_members.sql`
- `supabase/migrations/0047_ycloud_migration.sql`
- `supabase/migrations/rollback/0044_agentes_ia_rollback.sql`
- `supabase/functions/whatsapp-webhook/index.ts` (y su carpeta)
- `supabase/functions/send-whatsapp-message/index.ts` (y su carpeta)
- `src/product/pages/Agentes.tsx`
- `src/product/pages/agentes/useAgentesData.ts`
- `src/product/pages/agentes/MisAgentesTab.tsx`
- `src/product/pages/agentes/ConversacionesTab.tsx`
- `docs/agentes-ia-rollback.md` (este archivo)

**Archivos existentes — revertir solo las líneas de Agentes IA:**

- `src/lib/database.types.ts` — quitar `"agentes_ia"` de `CompanyAddonName`,
  los tipos `WhatsappConnectionStatus`/`WhatsappConversationMode`/
  `WhatsappMessageDirection`, y las interfaces `AiAgentTypeTemplate`,
  `AiAgent`, `WhatsappConnection`, `WhatsappContact`, `WhatsappConversation`,
  `WhatsappMessage`.
- `src/lib/moduleCategories.ts` — quitar `agentes_ia: "otro"` de
  `ADDON_CATEGORY`.
- `src/admin/pages/CompanyDetail.tsx` — quitar `agentes_ia: "Agentes IA"` de
  `ADDON_LABELS`, el estado `agentTemplates`/`companyAgents`/
  `whatsappConnections` y su carga, la función `toggleAgentType`, el bloque
  condicional que renderiza `<AgentesSection />` y `<WhatsAppConnectionsSection />`,
  y los componentes `AgentesSection`, `EditAgentPromptModal`,
  `WhatsAppConnectionsSection` y `NewWhatsAppConnectionModal` al final del
  archivo.
- `src/product/TenantPortal.tsx` — quitar el estado `agentesActivo`, su
  consulta a `company_addons`, la entrada condicional en `extraNav`, la
  ruta `agentes` y el `import Agentes from "./pages/Agentes"`.

Después de aplicar todo lo anterior, correr `npm run build` para confirmar
que no queda ninguna referencia suelta.

## Nota sobre el proveedor de WhatsApp

v1 se construyó originalmente contra la API oficial de Meta directo (cada
conexión con su propio access token, guardado en `whatsapp_credentials` vía
`save-whatsapp-credentials`). Se migró a **YCloud** como BSP compartido
(una sola cuenta de Nuxorb, un solo `YCLOUD_API_KEY` para todos los
clientes) — ver `supabase/migrations/0047_ycloud_migration.sql`. Si en
algún momento se quisiera volver a Meta directo, no hay un script de
rollback específico para ese cambio de proveedor — habría que revertir el
commit correspondiente o reescribir las Edge Functions otra vez contra la
Graph API de Meta.
