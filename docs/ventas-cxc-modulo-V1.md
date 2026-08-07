# Módulo: Ventas y CxC
[[ventas y cxc]]
**Versión:** 0.2 (construido — ver notas de cambio)
**Fecha:** 19 de julio de 2026 (v0.1) — actualizado 7 de agosto de 2026 (v0.2, cierre de gaps post-construcción)
**Estado:** Construido y en producción (Essential + Professional). Pendiente: ver sección "Pendiente para V2".
**Notas de alcance:**
- NO incluye timbrado CFDI. El timbrado es producto adicional (Facturama, ver `productos-adicionales.md`). El módulo registra facturas internamente — el botón "Timbrar" descrito en v0.1 §6.2 **no se construyó** (los campos `timbrada`/`uuid_cfdi`/`archivo_xml`/`archivo_pdf` existen en la tabla, inertes).
- NO incluye punto de venta (POS) ni inventario/existencias propios. El pedido es un documento de confirmación comercial, no de almacén. **En vez de esperar a un módulo de Inventario futuro (como decía v0.1), el catálogo de Ventas terminó conectándose directo al catálogo de insumos de Compras y Proveedores para costeo — ver sección 5.1 nueva.**

---

**Cambios de alcance respecto a v0.1 (decisiones tomadas al cerrar el módulo, agosto 2026):**

Este doc se quedó en borrador pre-construcción — el módulo lleva en producción desde el commit `68b20b7` (más `f2b1a14`, catálogo de productos) sin que el doc reflejara nada de lo realmente construido, a diferencia de Tesorería/Compras. Esta versión cierra esa brecha y resuelve el gap más grave encontrado en la auditoría:

- **🔴 Bug crítico corregido — puente roto con Tesorería.** Ventas conservaba el puente `expected_movements`/`confirmed_movements` (a diferencia de Compras, que ya lo había abandonado por este mismo defecto): al vincular en Tesorería un ingreso real con el proyectado, nunca se actualizaba `sales_invoices`/`sales_collections` — la factura se quedaba `pendiente`/`parcial` para siempre aunque el dinero ya estuviera conciliado en el banco. **Se reemplazó por match directo** contra `treasury_movements` (mismo patrón que Compras construyó en `0033_match_pagos_con_tesoreria.sql`): nuevo botón "Vincular banco" en Cobranza, columna `sales_collections.treasury_movement_id` (migración `0038`). La creación de una factura ya no publica en `expected_movements` — ver sección 9.
- **Alta/edición manual de cliente agregada.** Antes un `cliente` solo nacía automáticamente al marcar una oportunidad como ganada — no había forma de darlo de alta directo ni de capturar sus datos fiscales, lo que bloqueaba el flujo de "factura directa" que el objetivo del módulo promete. Ahora hay un "+ Nuevo cliente" en Prospectos y oportunidades.
- **`generarPedido` ya no falla en silencio** cuando la cotización nace de un prospecto sin oportunidad previa (`cliente_id` nulo) — se convierte el prospecto a cliente automáticamente al aceptar, en vez de que el botón no haga nada.
- **Costeo por receta/kit gateado a Professional.** Se descubrió una funcionalidad sustancial construida (`0037_costeo_productos_venta.sql`) sin ninguna mención en este doc ni límite de nivel — ver sección 5.1 nueva. Ahora requiere Professional (`limits.catalogoCosteo`).
- **Folio interno de factura con protección contra condición de carrera** — antes se calculaba como `facturas.length + 1` del lado del cliente sin manejar el error de folio duplicado; ahora reintenta con el siguiente folio si la constraint única lo rechaza.
- **`cliente` vive en `public`, no en un schema `compartido`** — decisión ya tomada y documentada en el comentario de la migración `0015`, pero nunca reflejada aquí: el proyecto usa un solo schema `public`, así que la tabla compartida vive ahí mismo (`sales_customers`), consistente con el resto de la plataforma.

---

## 1. Objetivo del módulo

Dar a negocios el control del ciclo comercial completo: seguimiento de oportunidades, cotización, pedido, registro de factura y cobranza — con la flexibilidad de entrar en cualquier punto del ciclo (factura directa, pedido sin cotización, cotización sin oportunidad previa). Ningún documento es obligatorio como origen del siguiente.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Prospectos y oportunidades | ✅ Lista simple con estado (sin pipeline visual) | + ✅ Pipeline visual con etapas configurables + responsable asignado + motivo de pérdida | A medida |
| Cotización y pedido | ✅ Cotización (PDF vía impresión del navegador, no enviable por email) → pedido; catálogo simple de productos/servicios | + ⏳ Versiones de cotización (columna existe, sin UI), aprobación de descuentos (sin validar rol específico), vigencia sin alerta activa | A medida |
| Facturación (registro interno) | ✅ Registro de factura: contado o crédito, pagos parciales y anticipos | + ✅ Facturación parcial de un pedido (entregas por partes) | A medida |
| CxC y cobranza | ✅ Cartera visible (al corriente / por vencer / vencida), registro manual de cobro + ✅ **Vincular banco** (match directo con Tesorería, v0.2) | + ⏳ Recordatorios automáticos por email (no construido, deliberadamente fuera de alcance), ✅ antigüedad de saldos, estado de cuenta por cliente | A medida |
| Catálogo — costeo por receta/kit (nuevo, no en v0.1) | ⏳ No disponible (producto simple: nombre, precio, unidad, IVA) | ✅ Costeo por receta o kit, ligado al catálogo de insumos de Compras y Proveedores | A medida |
| Usuarios (además del admin de cuenta) | ✅ 1 (mecanismo de plataforma, `company_modules.seats`) | ✅ 3 | A medida |
| Integraciones API | ⏳ 1 (definida por el cliente) — sin construir | ⏳ +2 adicionales — sin construir | A medida |

**Enterprise** incluye todo Professional + funcionalidades a medida: scoring de leads, asignación automática por vendedor/zona, políticas de crédito por cliente con bloqueo automático, cobranza con escalamiento configurable (recordatorio → llamada → legal). Alcance y precio caso por caso.

---

## 3. Estándares de plataforma

✅ Construido siguiendo `tesoreria-modulo-v1.md` sección 3. **Importante: Ventas es el único de los tres módulos de negocio (junto con Personal) que sigue usando el puente `expected_movements`/`confirmed_movements`, y solo del lado de publicar** — la confirmación real de cobro ahora pasa por match directo (sección 9), no por ese puente. Compras lo abandonó por completo.

### 3c. Catálogo compartido de clientes

- ⏳ **Adaptación respecto al plan:** el MD original pedía un schema `compartido` aparte. El proyecto usa un solo schema `public` — `cliente` vive ahí (`sales_customers`), decisión tomada en la migración `0015` y documentada en su comentario, consistente con cómo se resolvió `expected_movements`/`confirmed_movements` para toda la plataforma.
- Primer módulo que lo usa: Ventas y CxC.

**`cliente`/`sales_customers`** (tabla `public`, no `compartido`)
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| company_id | Referencia | Sí |
| razon_social | Texto | Sí |
| nombre_comercial | Texto | No |
| rfc | Texto | No* (*obligatorio si se factura) |
| regimen_fiscal | Texto | No* |
| uso_cfdi | Texto | No* |
| codigo_postal_fiscal | Texto | No* |
| email | Texto | No |
| telefono | Texto | No |
| dias_credito | Entero (default 0 = contado) | Sí |
| activo | Booleano | Sí |

✅ Ya se puede dar de alta y editar directo desde Prospectos y oportunidades (v0.2) — antes solo nacía automáticamente al ganar una oportunidad, y esos campos fiscales casi nunca se llegaban a capturar en la práctica.

---

## 4. Subproceso: Prospectos y oportunidades

### 4.1 Objetivo
Registrar a quién se le está vendiendo y en qué punto va cada venta potencial, sin perder seguimiento.

### 4.2 Funcionalidades Essential
- ✅ Alta de prospecto: nombre, contacto, origen (referido/web/redes/otro), notas
- ✅ Oportunidad ligada al prospecto: qué quiere, monto estimado, estado simple (nuevo / contactado / en negociación / ganada / perdida)
- ✅ Lista con filtros por estado y fecha
- ✅ Conversión: al ganar, el prospecto se convierte (o vincula) a `cliente` en el catálogo compartido
- ✅ Una oportunidad puede generar una cotización (opcional, no obligatorio)
- ✅ **(v0.2) Alta/edición manual de cliente**, sin depender de ganar una oportunidad primero

### 4.3 Funcionalidades Professional (incremental)
- ✅ Pipeline visual (kanban) con etapas configurables por el negocio
- ✅ Responsable asignado por oportunidad (usuario del módulo)
- ✅ Motivo de pérdida (catálogo editable) al marcar perdida
- ✅ Fecha estimada de cierre — capturada, sin alerta activa asociada
- ⏳ **Nota de implementación:** `etapa_id` (posición en el kanban) y `estado` (nuevo/contactado/negociación/ganada/perdida) **coexisten** en vez de que uno sustituya al otro como decía el plan original — `estado` sigue siendo la fuente de verdad de "abierta/ganada/perdida", `etapa_id` es la posición fina dentro de "abierta". Funciona bien en la práctica, es solo una diferencia de nomenclatura contra el MD.

### 4.4 Campos de datos

**`oportunidad`/`sales_opportunities`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| prospecto_id / cliente_id | Referencia | Sí (uno de los dos) |
| descripcion | Texto | Sí |
| monto_estimado | Decimal | No |
| moneda | Enum (default MXN) | Sí |
| estado | Enum (nuevo/contactado/negociacion/ganada/perdida) | Sí |
| etapa_id | Referencia | No (Professional, coexiste con `estado`, no lo sustituye) |
| responsable_usuario_id | Referencia | No (Professional) |
| motivo_perdida_id | Referencia | Solo si perdida (Professional) |
| fecha_estimada_cierre | Fecha | No (Professional) |

Tablas auxiliares: `prospecto`/`sales_prospects`, `etapa_pipeline`/`sales_pipeline_stages` (Professional), `motivo_perdida`/`sales_loss_reasons` (Professional).

---

## 5. Subproceso: Cotización y pedido

### 5.1 Catálogo de productos/servicios — costeo por receta/kit (Professional, nuevo en v0.2)

**No estaba en ningún plan v0.1** — se construyó (`0037_costeo_productos_venta.sql`) después del catálogo simple original y se detectó sin documentar durante el cierre de agosto 2026. Ahora gateado a Professional (`limits.catalogoCosteo`):

- Cada producto/servicio tiene un `tipo_costeo`: **comercializado** (precio manual, opcionalmente ligado a un insumo del catálogo de Compras para traer su costo de referencia como informativo), **receta** (suma de insumos de Compras convertidos a la unidad del producto, mismo motor de conversión de unidades que Compras construyó para sí mismo) o **kit** (suma de otros productos de este mismo catálogo — un kit no puede contener otro kit).
- El costo calculado es **puramente informativo** — nunca se escribe sobre `precio_unitario`, que sigue siendo capturado a mano.
- **Acoplamiento entre módulos:** Ventas lee directo las tablas `procurement_products`/`procurement_units` de Compras (`useVentasData.ts`) — no pasa por ningún estándar inter-módulo documentado (ni `expected_movements`, ni un endpoint propio). Es una lectura de catálogo compartido de facto, no un patrón nuevo formalizado.
- En Essential, el catálogo se queda simple: nombre, descripción, precio, unidad, tasa de IVA — sin costeo, como en el plan original.

### 5.2 Objetivo
Formalizar la propuesta comercial (cotización) y congelar el compromiso de venta (pedido): qué se entrega, a qué precio y bajo qué condición de pago.

### 5.3 Funcionalidades Essential
- ✅ Catálogo simple de productos/servicios: nombre, descripción, precio unitario, unidad, tasa de IVA (16% / 0% / exento)
- ✅ Cotización con partidas (producto/servicio, cantidad, precio, descuento por partida), subtotal, IVA y total
- ⏳ PDF de cotización — construido como vista de impresión del navegador (`window.print()`), **sin logo/marca del negocio y sin envío por email desde el sistema** — misma decisión que ya tomó Compras para su OC ("no hay envío por correo desde el sistema").
- ✅ Estados: borrador → enviada → aceptada / rechazada / vencida
- ✅ Cotización aceptada → genera pedido con un clic — **(v0.2) ya funciona también si la cotización nace de un prospecto sin oportunidad previa**: se convierte el prospecto a cliente automáticamente en vez de fallar en silencio. También se puede crear pedido directo sin cotización.
- ✅ Pedido: partidas congeladas, condición de pago (contado / crédito a N días — default tomado de `cliente.dias_credito`), fecha compromiso de entrega (capturada, sin uso downstream — es solo dato de referencia)
- ✅ Registro de anticipo sobre pedido (se aplica después a la factura)

### 5.4 Funcionalidades Professional (incremental)
- ⏳ Versiones de cotización (v1, v2...) con historial — la columna `version` existe pero **nunca se incrementa ni se expone en la UI**, no hay historial real todavía.
- ⏳ Aprobación de descuentos: umbral % configurable por el negocio — construido, pero **sin validar que el aprobador tenga un permiso/rol específico**, solo exige que sea un usuario distinto de quien creó la cotización.
- ⏳ Vigencia con alerta — solo se captura la fecha de vigencia; **no hay ningún aviso/badge activo** cuando está por vencer.

### 5.5 Campos de datos

**`cotizacion`/`sales_quotes`**: id, oportunidad_id (opcional), cliente_id/prospecto_id, version (Professional, sin usar), fecha_emision, vigencia_hasta, estado (borrador/enviada/aceptada/rechazada/vencida), subtotal, descuento_total, iva, total, requiere_aprobacion (bool), aprobada_por (Professional), created_by.

**`cotizacion_detalle`/`sales_quote_items`**: id, cotizacion_id, producto_servicio_id, descripcion, cantidad, precio_unitario, descuento_pct, importe.

**`pedido`/`sales_orders`**: id, cotizacion_id (opcional), cliente_id, fecha, condicion_pago (contado/credito), dias_credito, fecha_compromiso, estado (abierto/facturado_parcial/facturado/cancelado), subtotal, iva, total.

**`pedido_detalle`/`sales_order_items`**: mismo patrón que cotización, + cantidad_facturada (para facturación parcial en Professional).

**`producto_servicio`/`sales_products_services`**: id, nombre, descripcion, unidad, precio_unitario, tasa_iva (16/0/exento), activo, **tipo_costeo** (comercializado/receta/kit, Professional), **producto_compra_id** (Professional, solo si comercializado).

Tablas auxiliares nuevas (Professional, no en v0.1): `sales_product_recipe_items` (sales_product_id, procurement_product_id, cantidad, unidad), `sales_product_kit_items` (sales_product_id, componente_producto_id, cantidad).

---

## 6. Subproceso: Facturación (registro interno)

### 6.1 Objetivo
Registrar el documento de cobro (contado o crédito) y su saldo, con o sin timbrado. Es el punto de entrada directo para negocios que no cotizan ni levantan pedidos.

### 6.2 Funcionalidades Essential
- ✅ Factura desde pedido (hereda partidas y condición de pago) o factura directa (captura libre: cliente + partidas) — **(v0.2) el cliente ya se puede dar de alta ahí mismo desde Prospectos si no existe todavía**, antes esta vía estaba bloqueada de facto.
- ✅ Condición: contado (nace pagada o pendiente de cobro inmediato) o crédito (fecha de vencimiento = fecha emisión + días de crédito, editable)
- ✅ Aplicación de anticipos del pedido al saldo de la factura
- ✅ Folio interno consecutivo por negocio — **(v0.2) con reintento ante colisión de folio** (antes calculado en el cliente sin manejar el error de la constraint única)
- ✅ Estados: pendiente / pago parcial / pagada / vencida / cancelada
- ⏳ Si el negocio tiene el producto adicional de timbrado: botón "Timbrar" — **no construido**. Los campos `timbrada`/`uuid_cfdi`/`archivo_xml`/`archivo_pdf` existen en la tabla pero están inertes, a la espera de esa fase.

### 6.3 Funcionalidades Professional (incremental)
- ✅ Facturación parcial de un pedido: varias facturas contra un mismo pedido (entregas por partes), con control de cantidades facturadas vs. pendientes

### 6.4 Campos de datos

**`factura`/`sales_invoices`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| pedido_id | Referencia | No |
| cliente_id | Referencia | Sí |
| folio_interno | Consecutivo | Sí |
| fecha_emision | Fecha | Sí |
| condicion | Enum (contado/credito) | Sí |
| fecha_vencimiento | Fecha | Solo crédito |
| subtotal / iva / total | Decimal | Sí |
| saldo_pendiente | Decimal | Sí (calculado) |
| estado | Enum (pendiente/parcial/pagada/vencida/cancelada) | Sí |
| timbrada | Booleano | Sí (default false, inerte — ver 6.2) |
| uuid_cfdi / archivo_xml / archivo_pdf | Texto | Solo si timbrada (inerte) |

Tabla auxiliar: `factura_detalle`/`sales_invoice_items` (mismo patrón que pedido_detalle).

---

## 7. Subproceso: CxC y cobranza

### 7.1 Objetivo
Ver quién debe, cuánto y desde cuándo; registrar cobros y (en Professional) automatizar recordatorios para reducir cartera vencida.

### 7.2 Funcionalidades Essential
- ✅ Cartera: facturas con saldo, clasificadas al corriente / por vencer (próximos 7 días) / vencidas
- ✅ Registro manual de cobro: fecha, monto, referencia — soporta pago total y pagos parciales
- ✅ Al registrar cobro se recalcula `saldo_pendiente` y estado de la factura
- ✅ **(v0.2) Vinculación con Tesorería — reescrita.** Ya no depende del puente `expected_movements`/`confirmed_movements` (que nunca regresaba el resultado a Ventas — la factura se quedaba sin marcar como pagada aunque Tesorería ya hubiera conciliado el ingreso). Ahora es un **match directo**: desde Cobranza, botón "Vincular banco" elige un ingreso real de `treasury_movements` sin usar todavía, y reparte su monto entre una o varias facturas del mismo cliente — cada reparto genera un `sales_collections` con `treasury_movement_id`, que es lo que "bloquea" el movimiento para no volver a cruzarse (mismo patrón que Compras). Si el negocio NO tiene Tesorería, el cobro se registra directo en este módulo como antes.

### 7.3 Funcionalidades Professional (incremental)
- ⏳ Recordatorios automáticos por email — **no construido, deliberadamente**: el propio MD lo documentaba como "candidato de automatización N8N, pendiente de diseño", así que no se construyó la infraestructura de envío (Resend) en esta fase. Las tablas `configuracion_recordatorio`/`log_recordatorio` tampoco existen.
- ✅ Antigüedad de saldos: 1-30 / 31-60 / 61-90 / +90 días
- ✅ Estado de cuenta por cliente — vista de impresión del navegador, no PDF/Excel generado

### 7.4 Campos de datos

**`cobro`/`sales_collections`**: id, factura_id, fecha, monto, tipo (anticipo/parcial/total), referencia, origen (modulo/tesoreria), **treasury_movement_id** (nuevo en v0.2, solo si el cobro vino de "Vincular banco").

**`configuracion_recordatorio` / `log_recordatorio`** (Professional): **no existen** — ver 7.3.

### 7.5 Pantallas / Dashboard

**Essential:** lista de prospectos/oportunidades; catálogo de productos/servicios; cotización (captura + vista PDF); pedido; factura (captura + aplicación de anticipos); cartera con clasificación; registro de cobro + vincular banco. ⏳ **Dashboard de ventas del periodo (facturado, cobrado, por cobrar): no construido** — no existe ninguna pantalla de resumen/dashboard en el módulo hoy, solo las 5 tabs de trabajo (Prospectos, Catálogo, Cotizaciones, Facturación, Cobranza).

**Professional (adicional):** pipeline kanban; pantalla de aprobación de descuentos; antigüedad de saldos; estado de cuenta por cliente. ⏳ Configuración de recordatorios + log de envíos, dashboard comparativo periodo a periodo, ventas por responsable y motivos de pérdida — **ninguno construido**.

---

## 8. Productos adicionales relacionados

Se documentan en `productos-adicionales.md` — **aunque hoy esa lista no incluye entradas para Timbrado CFDI ni Chatbot de cobranza WhatsApp** (referencia rota: solo describe Checador, Conciliación PDF ampliada, PTU, Portal del empleado, Inventario y Lectura de tickets ampliada). Los dos addons de Ventas solo existen como texto de marketing en `src/data/modules.ts`, sin ficha funcional propia:

- **Timbrado CFDI (Facturama):** fee único de implementación + fee mensual de mantenimiento; el plan anual y folios de Facturama los contrata y paga el cliente directo, sin markup. Requiere este módulo. **No construido** — ver 6.2.
- **Chatbot de cobranza WhatsApp:** recordatorios y consultas de saldo vía WhatsApp Business (costo por conversación de Meta a cargo del cliente). Requiere este módulo, nivel Professional. **No construido.**

---

## 9. Consume / expone hacia otros módulos

- ✅ **Expone `mov_esperados`/`expected_movements`:** cada factura a crédito o de contado pendiente de cobro publica un ingreso proyectado (tipo=ingreso, monto=saldo_pendiente, fecha_esperada=fecha_vencimiento, modulo_origen=ventas, referencia_id=factura) — esto sigue igual. **Gap conocido: los anticipos capturados sobre un pedido (antes de facturar) no se publican en `expected_movements`** — quedan fuera de la vista de proyectados de Tesorería hasta que se facturan.
- ⏳→✅ **Confirmación de cobro — reescrita en v0.2.** Ya NO depende de que Tesorería regrese el resultado por `confirmed_movements` (ese lado seguía sin construirse, idéntico al defecto que Compras ya había resuelto para sí mismo). Ahora, cuando el negocio tiene Tesorería, el cobro se confirma con un **match directo** ("Vincular banco" en Cobranza, sección 7.2) que sí actualiza `sales_invoices`/`sales_collections` de inmediato. Si NO tiene Tesorería, el cobro se registra directo en este módulo (sin cambios).
- **Consume:** lee directo el catálogo de insumos de Compras y Proveedores (`procurement_products`/`procurement_units`) para el costeo por receta/kit del catálogo (sección 5.1) — una lectura de facto, no un consumo formalizado vía el estándar inter-módulo.

---

## 10. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: envío de recordatorios de cobranza (Professional), alerta de cotización por vencer, envío del estado de cuenta mensual al cliente del negocio, notificación al responsable cuando una oportunidad lleva N días sin movimiento.

---

## 11. Pendiente para V2

Explícitamente pospuesto tras el cierre de agosto 2026 — no es que se haya intentado y quedó a medias, es una decisión de quedarse ahí por ahora:

- **Cotización/factura/estado de cuenta con logo y envío por email:** se quedan como impresión desde el navegador, misma decisión que Compras tomó para su OC.
- **Versiones de cotización:** columna `version` existe, sin historial ni UI de "nueva versión".
- **"Vigencia con alerta":** solo se guarda la fecha, sin aviso activo cuando está por vencer.
- **Aprobación de descuentos por rol específico:** hoy solo exige que sea "otro usuario", no valida permiso.
- **Dashboards** — ni el de Essential (facturado/cobrado/por cobrar del periodo) ni el comparativo de Professional (por responsable, motivos de pérdida) existen todavía.
- **Recordatorios automáticos de cobranza por email:** infraestructura de envío (Resend) sin construir, deliberadamente, hasta que se diseñe como automatización N8N.
- **Anticipos sobre pedido publicados en `expected_movements`:** hoy solo las facturas publican proyectado; un anticipo capturado antes de facturar no aparece en Tesorería hasta que se factura.
- **Timbrado CFDI (Facturama) y Chatbot de cobranza WhatsApp:** ambos addons fuera de alcance de este módulo — ver sección 8.
- **Ficha funcional de Timbrado CFDI y Chatbot WhatsApp en `productos-adicionales.md`:** hoy esa lista no los incluye, solo existen como texto de marketing.
- **Costeo por receta/kit del catálogo formalizado como estándar inter-módulo:** hoy Ventas lee directo las tablas de Compras sin pasar por una interfaz documentada — funciona, pero no es el patrón que el resto de la plataforma sigue para conectarse entre módulos.

**Resuelto en v0.2 (ya no está pendiente, se corrigió durante el cierre de agosto 2026):**
- **Bug crítico del puente con Tesorería:** reemplazado por match directo ("Vincular banco"), igual que Compras.
- **Alta/edición manual de cliente:** ya no depende de ganar una oportunidad primero.
- **`generarPedido` con cotización de prospecto:** ya no falla en silencio, convierte el prospecto a cliente automáticamente.
- **Costeo por receta/kit:** gateado a Professional (antes disponible gratis en ambos niveles, sin documentar).
- **Folio interno de factura:** protegido contra condición de carrera.
