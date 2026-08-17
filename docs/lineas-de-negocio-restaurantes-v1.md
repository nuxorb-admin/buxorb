# Línea de negocio: Restaurantes

**Última actualización:** 17 de agosto de 2026

## 1. Objetivo

Tercer eje de producto, distinto a **Suscripción Nuxorb** (`nuxorb.company_modules`,
4 módulos fijos con nivel cada uno) y **Productos adicionales**
(`nuxorb.company_addons`, feature suelta on/off). Una **línea de negocio** es
una suite completa por giro, empaquetada como bundle con **un solo nivel para
toda la línea** (no por módulo individual dentro de ella), activable desde
admin → Empresas → detalle de empresa → "Líneas de negocio".

**Restaurantes** es la primera línea. Investigación de sistemas de punto de
venta reales confirmó 6 módulos como el set mínimo viable — el mismo bundle
completo desde Essential (un restaurante no puede operar con solo 3 de los
4 módulos base). El nivel sube profundidad, no quita módulos enteros.

**Requiere:** módulo Ventas y CxC activo (el Menú reusa su catálogo de
productos, incluyendo costeo por receta/kit ya construido contra Compras) —
validado en el admin al asignar el nivel, no como constraint de esquema.

**Conecta con Tesorería (opcional):** si está activa, cerrar un ticket en
Caja crea automáticamente un ingreso ahí (categoría "Ventas"); si no, el
ticket se guarda igual sin reflejarse en otro lado. Mismo patrón que
"Vincular banco" en Compras/Ventas — conectar solo si el otro módulo existe.

## 2. Resumen por nivel

| | Essential | Professional | Enterprise |
|---|---|---|---|
| Menú, Mesas, Comandas, Caja | ✅ | ✅ | ✅ (personalizado) |
| Multi-salón | ❌ (un solo salón "Principal") | ✅ | ✅ |
| Cocina (KDS) | ❌ | ✅ | ✅ |
| Split de cuenta (varios métodos de pago por ticket) | ❌ (un solo pago = total) | ✅ | ✅ |
| Reservaciones | ❌ | ✅ | ✅ |
| Costeo por receta en Menú | ❌ | ✅ | ✅ |

`src/product/pages/restaurantes/limits.ts` implementa esta tabla vía
`limitsForTier(tier)`; Enterprise cae en los límites de Professional como
aproximación hasta que haya demanda de personalización real (mismo patrón
que el resto de la plataforma).

## 3. Los 6 módulos (tabs de una sola pantalla "Restaurantes")

Empaquetados como tabs dentro de un único item de nav (mismo patrón que
Tesorería, que ya tiene 5 tabs en una pantalla), no 6 entradas de nav
separadas.

1. **Menú** (`MenuTab.tsx`) — capa de metadata de restaurante (categoría,
   foto, orden, disponible) sobre el catálogo de Ventas
   (`sales_products_services`). No duplica nombre/precio/IVA.
2. **Mesas y salón** (`MesasTab.tsx`) — grid de mesas por estado
   (`libre`/`ocupada`/`reservada`/`cuenta_abierta`), agrupadas por `salon`
   si el nivel lo permite.
3. **Comandas** (`ComandasTab.tsx`) — el mesero abre una mesa (crea
   `ldn_restaurant_orders`), agrega platillos del menú disponible
   (`ldn_restaurant_order_items`).
4. **Cocina / KDS** (`CocinaTab.tsx`, Professional+) — lista de pedidos
   pendientes por estado (`pendiente`→`en_preparacion`→`listo`→`entregado`),
   agregados de todas las comandas abiertas.
5. **Caja** (`CajaTab.tsx`) — apertura de turno con monto inicial
   (`ldn_restaurant_cash_sessions`), cobro de tickets (llama a la Edge
   Function `close-restaurant-ticket`), cierre de turno con arqueo
   (esperado vs. contado en efectivo).
6. **Reservaciones** (`ReservacionesTab.tsx`, Professional+) — alta de
   reservas (cliente, teléfono, personas, fecha/hora, mesa opcional) y
   cambio de estado (`pendiente`→`confirmada`/`cancelada`/`completada`).

Sin tiempo real (websockets/polling agresivo) en v1 — Cocina se actualiza
al recargar, igual que el resto de la plataforma.

## 4. Campos de datos (tal como existen hoy en Supabase)

Ver `supabase/migrations/0051_lineas_de_negocio.sql` (tabla de activación
`nuxorb.ldn_company_business_lines`) y `0052_ldn_restaurant.sql` (8 tablas
operativas: `ldn_restaurant_menu_items`, `ldn_restaurant_tables`,
`ldn_restaurant_orders`, `ldn_restaurant_order_items`,
`ldn_restaurant_cash_sessions`, `ldn_restaurant_tickets`,
`ldn_restaurant_ticket_payments`, `ldn_restaurant_reservations`) para el
detalle campo por campo — son la fuente de verdad, no se duplica aquí.

**Convención de nombres:** todo este eje usa el prefijo `ldn_` (Líneas de
negocio) + prefijo de la línea (`ldn_restaurant_*` aquí, a futuro
`ldn_peluqueria_*` etc.), a diferencia de los prefijos de módulo del core
(`treasury_`/`procurement_`/`hr_`/`sales_`).

## 5. Integraciones

- **Edge Function `close-restaurant-ticket`** — cierra un ticket de forma
  atómica: calcula subtotal desde `ldn_restaurant_order_items` × precio de
  `sales_products_services`, valida que la suma de pagos cuadre con el
  total, crea `ldn_restaurant_tickets` + `ldn_restaurant_ticket_payments`,
  marca la comanda `cerrada` y la mesa `libre`, y si Tesorería está activa
  crea el `treasury_movements` correspondiente.

## 6. Consume / expone hacia otros módulos

- **Consume** el catálogo de productos de Ventas y CxC
  (`sales_products_services`, incluyendo costeo por receta/kit).
- **Expone** hacia Tesorería (opcional): un `treasury_movements` tipo
  ingreso por cada ticket cerrado, si Tesorería está activa.

## 7. Pendiente para V2

- Inventario/mermas de cocina — hoy vive fuera de esta línea a propósito
  (ver `productos-adicionales.md` §5, "Inventario", que ya nota que su
  lógica varía por giro).
- Turnos/nómina de meseros — vive en Gestión de Personal, sin conexión
  directa todavía.
- Tiempo real en Cocina (websockets) en vez de recarga manual.
- Selector de cuenta bancaria al conectar con Tesorería (hoy usa siempre
  la primera cuenta de la empresa).
- Calendario visual de Reservaciones (hoy es lista simple ordenada por
  fecha).
