# Conexión Shopify — v1 (solo lectura)

**Última actualización:** 21 de septiembre de 2026 · Producto adicional `shopify` (ver `productos-adicionales.md` §8)

## Qué incluye

- Pantalla **"Conexiones"** en el portal del cliente (solo owner, visible si Nuxorb activó el addon): conectar, sincronizar ahora, desconectar. Es solo el armazón + la tarjeta de Shopify — no un framework genérico de integraciones; cuando llegue la segunda, se abstrae lo que se repita.
- Pantalla **"Shopify"** (owner o roles con el permiso `shopify`): pestañas Pedidos, Productos, Inventario, solo lectura, con botón "Sincronizar ahora".
- Datos: pedidos de los **últimos 60 días** (límite de `read_orders` sin `read_all_orders`), productos con variantes e inventario total por variante. **No** se piden datos de clientes (`read_customers` son datos protegidos que Shopify aprueba caso por caso): los pedidos se guardan sin nombre ni correo.

## Qué pedirle al cliente

1. En su admin: Configuración → Apps y canales de venta → Desarrollar apps → Crear app con el Dev Dashboard.
2. App con distribución personalizada (una tienda), permisos **solo lectura**: `read_products`, `read_orders`, `read_inventory`.
3. Instalarla en su tienda y pasarnos (o capturar él en "Conexiones"): dominio `algo.myshopify.com`, **Client ID** y **Client secret**.

## Arquitectura

- `integration_connections` (visible) + `integration_credentials` (sin policies, solo service role) — mismo patrón que `whatsapp_connections`/`whatsapp_credentials`.
- `shopify_orders` / `shopify_products`: espejo de solo lectura; miembros solo hacen select, únicamente la Edge Function escribe.
- Edge Functions `shopify-connect` (owner/equipo, exige addon activo) y `shopify-sync` (cualquier miembro de la empresa). Token por `client_credentials` (24 h, se renueva solo). API GraphQL con `SHOPIFY_API_VERSION` en `shopify.ts` (subirla cuando Shopify retire la versión).
- Migración `0061_conexion_shopify.sql`. Despliegue: `npx supabase functions deploy shopify-connect` y `shopify-sync`.

## Riesgo de verificación

No se confirmó que `client_credentials` funcione si la app y la tienda son de organizaciones distintas — por eso el cliente crea la app **en su propia cuenta**. Es lo primero a probar con credenciales reales. Fallback previsto: `shopify-connect` ya acepta un `access_token` estático (sin Client ID/secret) y `integration_credentials` lo soporta; solo falta exponer ese campo en el formulario si hiciera falta.

## Pendiente para V2

- Escritura hacia Shopify (p. ej. empujar inventario) — requiere definir fuente de verdad, permisos `write_*` y bitácora de cambios.
- Webhooks / sincronización programada (v1 es manual).
- Historial de pedidos > 60 días (`read_all_orders`, requiere aprobación de Shopify).
- Inventario por ubicación (v1 muestra el total por variante).
- Paginación más allá de ~500 pedidos / ~500 productos por sincronización (límite de páginas en `shopify-sync`).
