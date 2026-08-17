# Línea de negocio: Restaurantes

**Última actualización:** 17 de agosto de 2026 (v1.4 — opciones/modificadores de platillo y comentario al personalizar)

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

## 3. Los 6 módulos (grupo colapsable en el sidebar)

A diferencia de Tesorería (5 tabs dentro de una sola pantalla), Restaurantes
se despliega como un **grupo colapsable en el sidebar** (`ProductLayout.tsx`,
tipo `ExtraNavItem` con `children`): al hacer click en "Restaurantes" se
expanden los 6 módulos como entradas de nav independientes
(`/restaurantes/comandas`, `/restaurantes/mesas`, etc.), cada una su propia
página — no hay una barra de tabs horizontal dentro de la pantalla.
`Restaurantes.tsx` solo carga los datos compartidos (`useRestaurantesData`)
y resuelve las rutas anidadas (`<Routes>` relativas bajo `restaurantes/*`),
sin estado de tab propio.

1. **Comandas** (`ComandasTab.tsx` + `TomarOrdenScreen.tsx`) — el mesero
   abre una mesa (crea `ldn_restaurant_orders` con `canal='mesa'`) o da de
   alta un pedido por otro canal (ver sección 3a); al abrirlo entra directo
   a la pantalla completa de toma de orden (ver 3d). `ComandasTab.tsx`
   solo lista las comandas abiertas como cards resumen (título, subtítulo,
   conteo, total) — toda la edición vive en `TomarOrdenScreen.tsx`. Ver 3b
   para "juntar mesas".
2. **Mesas y salón** (`MesasTab.tsx`) — grid de mesas por estado
   (`libre`/`ocupada`/`reservada`/`cuenta_abierta`), agrupadas por `salon`
   si el nivel lo permite, con su `capacidad` (personas) visible. Alta en
   lote (ej. "Mesa 1" a "Mesa 7" de un jalón, ver 3b) o una por una.
3. **Cocina / KDS** (`CocinaTab.tsx`, Professional+) — un card por
   **comanda** (no por platillo), con un badge del número de platillos que
   faltan (no `entregado`) — clic en el card abre el pedido completo en un
   modal, con el estado y el botón de avanzar
   (`pendiente`→`en_preparacion`→`listo`→`entregado`) de cada platillo.
4. **Caja** (`CajaTab.tsx`) — apertura de turno con monto inicial
   (`ldn_restaurant_cash_sessions`), botón **Ticket** para imprimir la
   precuenta antes de cobrar (ver 3c), cobro de tickets (llama a la Edge
   Function `close-restaurant-ticket`), cierre de turno con arqueo
   (esperado vs. contado en efectivo).
5. **Menú** (`MenuTab.tsx`) — capa de metadata de restaurante (categoría,
   foto, orden, disponible) sobre el catálogo de Ventas
   (`sales_products_services`). No duplica nombre/precio/IVA. La
   `categoria` es lo que agrupa el picker visual de Comandas.
6. **Reservaciones** (`ReservacionesTab.tsx`, Professional+) — alta de
   reservas (cliente, teléfono, personas, fecha/hora, mesa opcional) y
   cambio de estado (`pendiente`→`confirmada`/`cancelada`/`completada`).

Sin tiempo real (websockets/polling agresivo) en v1 — Cocina se actualiza
al recargar, igual que el resto de la plataforma.

### 3a. Canales de pedido (más allá de la mesa)

Una comanda (`ldn_restaurant_orders`) ya no requiere mesa — tiene un campo
`canal`: `mesa` | `telefono_domicilio` | `recoger` | `rappi`
(migración `0053_ldn_restaurant_order_channels.sql`). `table_id` es
`not null` solo cuando `canal = 'mesa'` (constraint
`ldn_restaurant_orders_canal_table_check`); los otros tres canales capturan
en su lugar `cliente_nombre`/`telefono`/`direccion` según aplique (ver
tabla abajo) y un `referencia` libre opcional. `src/product/pages/restaurantes/orderDisplay.ts`
centraliza cómo se muestra cada canal (título + subtítulo) en Comandas,
Cocina y Caja, para no repetir esa lógica tres veces.

| Canal | Se pide en Comandas | Datos capturados |
|---|---|---|
| Mesa | "+ Abrir mesa" | `table_id` (sin datos de cliente) |
| Teléfono / domicilio | "+ Teléfono / domicilio" | `cliente_nombre`, `telefono`, `direccion` (los tres obligatorios) |
| Recoger en sucursal | "+ Recoger en sucursal" | `cliente_nombre`, `telefono` (sin dirección) |
| Rappi | "+ Rappi" | `referencia` opcional (folio del pedido en Rappi), nada más — el cliente ya vive en la app de Rappi |

**Rappi v1 es captura manual**, no hay conexión con la API de Rappi:
cuando llega un pedido por la tablet/app de Rappi, el staff lo da de alta
a mano en Comandas. Conectar la API real de partners de Rappi (proceso de
alta como socio + certificación técnica con Rappi, no un simple API key)
queda para V2 — el campo `referencia` ya existe para no tener que rediseñar
la tabla cuando eso pase.

**Cobro de pedidos Rappi:** pasan por el mismo Cobrar de Caja que cualquier
otro pedido, pero con la forma de pago fija `rappi` (agregada al check de
`ldn_restaurant_ticket_payments`, no editable en el modal de cobro cuando
`order.canal === 'rappi'`). Como `CerrarCajaModal` solo suma pagos con
método `efectivo` para el arqueo, un pago `rappi` no lo altera — el efecto
es "ya viene pagado por la plataforma" sin necesitar una rama de código ni
un flujo de cierre distinto.

### 3b. Mesas: alta en lote y "juntar mesas"

`ldn_restaurant_tables` tiene `capacidad` (personas, informativo) y
`joined_to` (migración `0055_ldn_restaurant_tables_capacity_join.sql`) —
si no es null, apunta a la mesa "principal" del grupo. **Un grupo de mesas
unidas comparte UNA sola comanda**: al abrir mesa con "Unir varias mesas"
activado en Comandas, se crea `ldn_restaurant_orders` solo para la mesa
principal (la primera elegida); el resto queda `estado='ocupada'` +
`joined_to = <principal>`, sin orden propia. `orderDisplay.ts` arma el
título como "Mesa 1 + Mesa 2" combinando la principal y sus unidas.
`close-restaurant-ticket` libera la principal **y** cualquier mesa con
`joined_to` apuntándole al cerrar el ticket — así el grupo completo vuelve
a `libre` de una vez. No hay "separar mesas" en v1 (el grupo se disuelve
al cerrar el ticket); tampoco hay UI para deshacer una unión antes de
cobrar.

El alta en lote (`MesasTab.tsx`, modal "Crear mesas") genera
`{nombreBase} {n}` para `n` en un rango `desde..hasta` (tope 100 por
lote) — ej. nombre base "Mesa", rango 1 a 7 → siete filas.

### 3c. Ticket imprimible (precuenta) antes de cobrar

Botón **Ticket** en la lista de "Pedidos por cobrar" de Caja, junto a
**Cobrar**. Abre una vista con el desglose (platillos, subtotal, líneas en
blanco para propina/total que el cliente llena a mano) y un botón
**Imprimir** que llama a `window.print()` — sin tocar la base de datos, es
solo la precuenta que el mesero entrega en la mesa antes de que el cliente
decida cómo pagar. El cobro real (propina + forma de pago) sigue siendo un
paso aparte con **Cobrar**, sin cambios.

Impresión vía diálogo nativo del navegador, no protocolo ESC/POS: la
mayoría de impresoras de tickets térmicas se instalan en Windows/Android
como una impresora normal, así que basta con un CSS de impresión angosto
(`.ticket-print-area` en `src/index.css`, formato 80mm) — no se requiere
SDK ni driver especial del lado de Nuxorb. Si el negocio termina usando una
impresora que solo habla ESC/POS por USB/Bluetooth directo, esa
integración queda pendiente (ver §7).

### 3d. Pantalla completa de toma de orden — carrito + envío explícito a cocina

`TomarOrdenScreen.tsx` reemplaza el picker chico que abría la comanda como
modal (v1.2) — ahora, entrar a una comanda toma toda la pantalla del tab
Comandas: buscador + chips de categoría + grid de platillos a la
izquierda, "Pedido actual" a la derecha. Un switcher "Mesa / Orden" en el
encabezado permite saltar a otra comanda abierta sin volver al listado.

**Los platillos que tocas NO se mandan a cocina de inmediato.** Se
acumulan en un carrito que vive solo en el estado de React de esta
pantalla (decisión de producto: más simple, sin cambio de esquema; el
costo es que si el mesero navega a otro tab antes de mandar el pedido, ese
carrito sin enviar se pierde y hay que rehacerlo). El carrito se distingue
visualmente ("Nuevo — sin enviar", fondo naranja) de los platillos ya
enviados ("En cocina", ya existen en `ldn_restaurant_order_items`). El
botón **Enviar orden a cocina** hace un solo `insert` en lote de las
líneas del carrito — a partir de ahí Cocina las ve igual que cualquier
otro platillo. Se puede repetir: agregar otra ronda más tarde y volver a
enviar, sobre la misma comanda.

Los platillos ya enviados siguen siendo editables (cantidad, notas, quitar)
directo contra la base, igual que en v1.2 — solo los del carrito sin
enviar son ediciones puramente locales hasta que se confirman.

### 3e. Opciones de platillo (ej. "elige tu cerveza") y comentario

Tocar cualquier platillo del grid en `TomarOrdenScreen.tsx` abre
`CustomizeItemModal` en vez de agregarlo directo — ahí se elige cantidad,
un **comentario libre** (ej. "sin cebolla", siempre disponible sin
importar el platillo) y, si el platillo tiene grupos de opciones
configurados en Menú (ej. "Clamato" con el grupo "Elige tu cerveza":
Corona/Modelo/Tecate), un radio por cada grupo — obligatorio o no según
como se configuró. **v1: un grupo es siempre de selección única (radio,
no checkboxes) y sin costo extra por opción** — decisión de producto para
no complicar la captura ni el total.

Se configuran en el tab **Menú** (`MenuTab.tsx`, botón "Opciones" por
platillo): `ldn_restaurant_menu_item_option_groups` (nombre + si es
obligatorio) y `ldn_restaurant_menu_item_options` (las opciones dentro de
cada grupo) — migración `0056_ldn_restaurant_menu_item_options.sql`.

El carrito de `TomarOrdenScreen.tsx` ahora agrupa por combinación
producto+comentario+opciones, no solo por producto — dos "Clamato" con
cervezas distintas son dos líneas separadas del carrito, aunque tocar el
mismo platillo con la misma combinación sí suma cantidad en vez de
duplicar. Al **Enviar orden**, las opciones elegidas se guardan en
`ldn_restaurant_order_item_options` con un `nombre_snapshot` de la opción
(no solo el FK) — si el negocio borra o renombra una opción después, el
pedido histórico conserva lo que se eligió en su momento. Cocina muestra
las opciones elegidas junto al platillo (imprescindible: el cocinero
necesita saber qué cerveza preparar, no solo que es un "Clamato").

## 4. Campos de datos (tal como existen hoy en Supabase)

Ver `supabase/migrations/0051_lineas_de_negocio.sql` (tabla de activación
`nuxorb.ldn_company_business_lines`), `0052_ldn_restaurant.sql` (8 tablas
operativas: `ldn_restaurant_menu_items`, `ldn_restaurant_tables`,
`ldn_restaurant_orders`, `ldn_restaurant_order_items`,
`ldn_restaurant_cash_sessions`, `ldn_restaurant_tickets`,
`ldn_restaurant_ticket_payments`, `ldn_restaurant_reservations`) y
`0053_ldn_restaurant_order_channels.sql` (canales de pedido en
`ldn_restaurant_orders`, ver 3a), `0055_ldn_restaurant_tables_capacity_join.sql`
(`capacidad` + `joined_to` en `ldn_restaurant_tables`, ver 3b) y
`0056_ldn_restaurant_menu_item_options.sql` (grupos/opciones de platillo +
`ldn_restaurant_order_item_options`, ver 3e) para el detalle campo por
campo — son la fuente de verdad, no se duplica aquí.

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
- **Conexión real con la API de partners de Rappi** (recepción automática
  de pedidos) — v1 es captura manual, ver 3a. Requiere alta formal como
  socio de Rappi y certificación técnica, no solo trabajo de desarrollo.
- Neteo de comisión de Rappi contra el ingreso registrado en Tesorería —
  v1 registra el total del pedido tal cual, sin descontar la comisión de
  la plataforma.
- "Separar mesas" — deshacer una unión de mesas antes de cerrar el
  ticket (hoy el grupo solo se disuelve al cobrar, ver 3b).
- Impresión directa por protocolo ESC/POS (USB/Bluetooth) si el cliente
  termina con una impresora que no se puede instalar como impresora
  normal del sistema (ver 3c).
- Grupos de opciones con costo extra por opción o selección múltiple
  (checkboxes con límite, ej. "elige hasta 3 toppings") — v1 es siempre
  radio de una sola opción, sin cargo adicional (ver 3e).
- Carrito de `TomarOrdenScreen.tsx` como borrador persistente — hoy vive
  solo en memoria del navegador (ver 3d); si se necesita que sobreviva a
  un refresh o cambio de pestaña, requiere guardarlo en Supabase con un
  estado que Cocina ignore hasta el envío explícito.
