# Módulo: Compras y Proveedores

**Versión:** 0.2 (construido — ver notas de cambio)
**Fecha:** 19 de julio de 2026 (v0.1) — actualizado 2 de agosto de 2026 (v0.2)
**Estado:** Construido y en producción. Pendiente: pricing y límites finos (ver `compras-pendientes.md`), y los puntos marcados "V2" abajo.

**Cambios de alcance respecto a v0.1 (decisiones tomadas durante la construcción):**
- **Inventario SÍ quedó dentro de este módulo** (Professional), contradiciendo la nota de v0.1 de que era producto aparte — ver sección 7.1. No se construyó como addon separado.
- **Facturas y notas de crédito son documentos independientes de la OC**, no un dato colgado de ella: una factura puede existir sin OC, una OC puede tener 0, 1 o varias facturas/NC, y una NC se liga a la factura que abona. Ver sección 5.
- **Se eliminó el puente `mov_esperados`/`mov_confirmados` hacia Tesorería.** En su lugar, el pago de una OC/factura se cruza directo contra un movimiento bancario real (`treasury_movements`) desde Compras — ver sección 8. La razón: el puente antiguo publicaba un proyectado pero el resultado de la conciliación en Tesorería nunca regresaba a Compras, así que la OC/factura nunca se marcaba pagada por esa vía.
- **Catálogo de productos con SKU** (Professional): las OC seleccionan líneas de un catálogo en vez de solo texto libre, y las facturas cargadas por XML se concilian contra ese catálogo asignando un SKU a cada concepto — ver sección 5.3 y 7.1.

---

## 1. Objetivo del módulo

Dar a negocios (emprendimientos y PyMEs) control del ciclo completo de compras — desde la solicitud hasta la cuenta por pagar — y de su relación con proveedores, generando el egreso proyectado hacia Tesorería. Independiente de otros módulos, con capacidad de conectarse a ellos cuando existan.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Ciclo de compra | Compra directa o con 1 nivel de aprobación (configurable on/off) | + Requisición formal + niveles múltiples de aprobación con reglas por monto y/o departamento | A medida |
| Orden de compra | Registro simple + PDF básico | OC formal en PDF enviada al proveedor | A medida |
| Recepción | Total (marcar como recibida) | + Recepción parcial (entregas en partes) | A medida |
| Captura por CFDI (XML) | Sí — el XML crea la compra | + Validación factura vs. OC (match simplificado) | A medida |
| Lectura de tickets (IA) | Incluida con límite mensual (pendiente definir N) | Incluida con límite mayor (pendiente definir N) | A medida |
| Cuentas por pagar | Saldo por proveedor + fechas de vencimiento | + Antigüedad de saldos + calendario de pagos | A medida |
| Proveedores | Catálogo: contacto, datos fiscales, historial de compras | + Evaluación: cumplimiento de entregas, comparativo de precios | A medida |
| Usuarios (además del admin de cuenta) | 1 | 3 | A medida |
| Integraciones API | 1 (definida por el cliente) | +2 adicionales | A medida |

**Enterprise** incluye todo Professional + funcionalidades a medida (ej. licitaciones/comparativo de cotizaciones formal, contratos marco con proveedores, compras multi-sucursal). Alcance y precio caso por caso.

---

## 3. Estándares de plataforma

Aplican los definidos en `tesoreria-modulo.md` sección 3 (esquema de usuarios y permisos). La conexión inter-módulo hacia Tesorería específica de Compras ya **no** usa `mov_esperados`/`mov_confirmados` — ver sección 8.

**Decisión de infraestructura (plataforma, AI-native):** la extracción de datos de documentos (tickets, y a futuro extractos bancarios de Tesorería) se resuelve con un **pipeline interno Nuxorb de documento → JSON basado en LLM con visión**: imagen/PDF → modelo de visión → JSON estructurado → validación de campos → pantalla de confirmación del usuario. El pipeline es infraestructura interna (mismo estatus que el motor de cálculo de nómina), con costo variable por documento. La IA propone, el usuario siempre confirma antes de que se cree el registro. El piloto de exactitud pendiente en Tesorería se amplía para cubrir tickets (ver pendientes).

---

## 4. Subproceso: Ciclo de compra

### 4.1 Objetivo
Registrar y controlar el flujo solicitud → aprobación → orden de compra → recepción, adaptándose al nivel de formalidad del negocio (desde "una persona lo hace todo" hasta aprobaciones multinivel).

### 4.2 Funcionalidades Essential
- **Aprobación configurable (on/off por negocio):**
  - Apagada: compra directa — quien captura, compromete (proceso típico de micro negocio)
  - Encendida: 1 nivel — rol "captura" y rol "aprueba"; si la misma persona tiene ambos roles, la compra se auto-aprueba
- Registro de compra: proveedor, conceptos (descripción, cantidad, precio unitario), subtotal, IVA, total, condición (contado/crédito + días), fecha estimada de pago. *(Moneda queda pendiente — hoy toda compra se registra en MXN, sin selector en el formulario; ver "Pendiente para V2".)*
- Generación de PDF básico de la orden, **descargable directo desde el navegador (Imprimir/Guardar como PDF)** — se genera al vuelo en cada descarga, sin guardarse en ningún lado
- Recepción total: marcar la compra como recibida con fecha
- Estados de la compra: borrador → (pendiente de aprobación) → aprobada → recibida → pagada / cancelada
- ~~Al aprobar una compra con fecha estimada de pago, se publica el egreso proyectado hacia Tesorería~~ — eliminado, ver sección 8

### 4.3 Funcionalidades Professional (incremental)
- **Requisición formal:** solicitud interna previa a la compra, con solicitante, justificación y departamento. Al crear la compra desde una requisición pendiente, la requisición queda ligada (`compra_id`) y su estado pasa a `convertida_en_compra` — la cadena requisición → compra → factura(s) → pago(s) es trazable de punta a punta (factura y pago ya colgaban de `compra_id`/`factura_id`).
- **Niveles múltiples de aprobación** con reglas configurables:
  - Por monto (ej. > $X requiere segundo aprobador)
  - Por departamento (el jefe del área aprueba primero)
  - Cadena secuencial de hasta N niveles (pendiente definir N)
- OC descargable en PDF con folio — **no hay envío por correo desde el sistema** (se descartó esa vía; el usuario la envía por fuera si lo necesita)
- **Recepción parcial:** cada renglón de la OC guarda cantidad ordenada vs. recibida acumulada; se puede recibir en varias entregas (cada una genera una fila en `procurement_receipts` + su detalle por renglón en `procurement_receipt_items`), y la compra pasa a `recibida` solo cuando se completó todo lo pendiente. Si el producto de un renglón está en el catálogo, cada recepción también genera su entrada de inventario. En Essential, la recepción sigue siendo todo-o-nada (el input de cantidad se deshabilita, precargado con el total pendiente).

### 4.4 Campos de datos

**`compra`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| folio | Texto (consecutivo) | Sí (sistema) |
| proveedor_id | Referencia | Sí |
| fecha | Fecha | Sí |
| subtotal / iva / total | Decimal | Sí |
| moneda | Enum (MXN/USD...) | Sí (default MXN) |
| condicion_pago | Enum (contado/credito) | Sí |
| dias_credito | Entero | Solo crédito |
| fecha_estimada_pago | Fecha | Sí |
| departamento_id | Referencia | No (Professional) |
| estado | Enum (borrador/pendiente_aprobacion/aprobada/recibida/pagada/cancelada) | Sí |
| origen | Enum (manual/xml_cfdi/ticket_ia/requisicion) | Sí (sistema) |

**`compra_detalle`**: id, compra_id, descripcion, cantidad, precio_unitario, importe, cantidad_recibida (Professional).

**`requisicion`** (Professional): id, solicitante_id, departamento_id, justificacion, fecha, estado (pendiente/aprobada/rechazada/convertida_en_compra), compra_id (si se convirtió).

**`regla_aprobacion`** (Professional): id, tipo (monto/departamento), umbral_monto, departamento_id, aprobador_usuario_id, orden_nivel.

**`aprobacion_compra`**: id, compra_id (o requisicion_id), aprobador_usuario_id, nivel, resultado (aprobada/rechazada), comentario, fecha. *(En Essential solo se genera 1 registro; en Professional, uno por nivel.)*

**`recepcion`**: id, compra_id, fecha, tipo (total/parcial), notas. En Professional con detalle por renglón vía `recepcion_item` (id, recepcion_id, order_item_id, cantidad) — una fila por cada renglón recibido en esa entrega específica.

### 4.5 Pantallas / Dashboard

**Essential:**
- Registro de compra (formulario) + PDF de orden
- Bandeja de aprobación (solo si la aprobación está encendida)
- Listado de compras con filtros: estado, proveedor, fecha, origen
- Marcar recepción

**Professional (adicional):**
- Captura de requisición + bandeja de aprobaciones multinivel (con indicador de en qué nivel va)
- Configuración de reglas de aprobación
- Recepción parcial por renglón (recibido vs. ordenado, con pendiente por renglón visible)
- ~~Envío de OC por correo desde el sistema~~ — descartado, solo descarga

---

## 5. Subproceso: Facturas, tickets y cuentas por pagar

### 5.1 Objetivo
Capturar el comprobante de la compra (CFDI o ticket) con el mínimo de tecleo, evitar duplicados cuando la factura llega después del ticket, y controlar cuánto se le debe a cada proveedor y cuándo vence.

### 5.2 Funcionalidades Essential
- **Carga de XML de CFDI:** crea la factura (proveedor por RFC — se da de alta si no existe —, conceptos, subtotal, IVA, total, UUID fiscal). Pasa por pantalla de confirmación antes de guardarse. **La factura es un documento independiente** — ya no fuerza la creación de una OC; se puede vincular a una OC pendiente de factura si aplica, o quedar suelta.
- **Un UUID fiscal no se puede repetir** (índice único a nivel de base de datos, no solo validación en pantalla).
- **Notas de crédito:** el XML se clasifica automáticamente como factura o NC según `TipoDeComprobante` del CFDI; una NC se liga a la factura que abona (sugerido automáticamente si el XML trae `CfdiRelacionados`) y resta su monto del saldo de esa factura/OC.
- **Lectura de tickets con IA (límite mensual incluido, pendiente definir N):** foto/imagen del ticket → pipeline LLM extrae comercio, fecha, subtotal, IVA, total → pantalla de confirmación editable → crea la compra con estado "pendiente de factura". Captura manual de ticket siempre disponible sin límite.
- **Vinculación ticket → factura:** cuando llega el XML de una compra registrada por ticket, se vincula y se completan los datos fiscales (UUID, RFC) sin duplicar el gasto.
- **Cuentas por pagar:** saldo pendiente por proveedor (compras y facturas sueltas), listado a crédito con fecha de vencimiento, registro de pago manual **o vinculado a un movimiento bancario real** (ver sección 8) — ambos caminos conviven.

### 5.3 Funcionalidades Professional (incremental)
- **Asignar SKU's por conceptos:** cada línea de una factura cargada por XML se liga a un producto del catálogo (con sugerencia automática por texto, y opción de crear el producto ahí mismo si no existe). Si la factura está ligada a una OC, se compara producto por producto (no solo el total) y se marca `ok`/`con_diferencias`. *(El reporte detallado de diferencias — monto distinto / concepto no ordenado / cantidad distinta, línea por línea — queda pendiente; hoy es un badge binario. Ver "Pendiente para V2".)*
- **Antigüedad de saldos:** por vencer / vencido 1-30 / 31-60 / 61+ días, por proveedor
- **Calendario de pagos:** agrupado por mes, exportable a CSV. La fecha de vencimiento se calcula como **fecha de emisión de la factura + días de crédito del proveedor** (no la fecha estimada que se capturó a mano en la OC) — si no hay factura ligada, usa la fecha de la OC como base.

### 5.4 Campos de datos

**`factura_compra`** (independiente de la compra — ver nota de alcance al inicio del documento)
| Campo | Tipo |
|---|---|
| id | UUID |
| company_id | Referencia (directa, no vía compra) |
| proveedor_id | Referencia (directa, no vía compra) |
| compra_id | Referencia — **opcional** |
| tipo_documento | Enum (factura/nota_credito) |
| nc_aplica_factura_id | Referencia a otra factura (solo si es NC) |
| uuid_fiscal | Texto (UUID CFDI) — único |
| rfc_emisor | Texto |
| fecha_emision | Fecha |
| subtotal / iva / total | Decimal |
| estado_match | Enum (ok/con_diferencias) (Professional) |

**`compra_detalle`**: además de lo ya documentado en 4.4, cada renglón puede colgar de una compra y/o de una factura (`factura_id`), y opcionalmente de un producto del catálogo (`producto_id`).

**`ticket_compra`**: id, compra_id, resultado_ia JSON, confianza, estado (procesando/confirmado/error), fecha_carga. **No se guarda la foto original** — ver nota de alcance sobre almacenamiento de documentos.

**`pago_compra`**: id, compra_id y/o factura_id, fecha, monto, referencia, `treasury_movement_id` (si el pago vino de cruzar un egreso bancario real — ver sección 8).

**`uso_lectura_tickets`** (control de límite mensual): negocio_id, periodo, veces_usado (límite: Essential N, Professional N — pendientes).

**Nota de alcance — almacenamiento de documentos:** ni el XML original ni la foto del ticket se guardan hoy; solo se parsean y se descartan los datos ya extraídos. Guardar el archivo original (para consulta/auditoría posterior) podría ofrecerse más adelante como funcionalidad adicional con costo extra, siguiendo el mismo patrón que "Lectura de tickets ampliada" (sección 7).

### 5.5 Pantallas / Dashboard

**Essential:**
- Carga de XML (individual o múltiple) + preview de confirmación, con desglose por concepto
- Captura de ticket (foto/upload) + preview editable del resultado IA
- Bandeja "pendientes de factura" (compras por ticket sin XML vinculado)
- Cuentas por pagar: saldo por proveedor + próximos vencimientos, con "Registrar pago" y "Vincular banco"
- Registro de pago

**Professional (adicional):**
- "Facturas por conciliar" + modal "Asignar SKU's por conceptos"
- Antigüedad de saldos
- Calendario de pagos (agrupado por mes, exportable)

---

## 6. Subproceso: Proveedores

### 6.1 Objetivo
Centralizar la información de proveedores y su historial, y en Professional, medir su desempeño para decidir mejor a quién comprarle.

### 6.2 Funcionalidades Essential
- Catálogo de proveedores: razón social, RFC, contacto (nombre, teléfono, correo), datos bancarios para pago (CLABE), condiciones habituales (días de crédito), categoría de gasto default (del catálogo de Tesorería, para heredarla al proyectado)
- Alta automática desde XML (por RFC) con datos mínimos, completables después
- Historial de compras por proveedor: listado, total comprado por periodo, saldo pendiente
- Template Excel/Sheets para alta masiva inicial (mismo patrón que Tesorería y Gestión de Personal)

### 6.3 Funcionalidades Professional (incremental)
- **Cumplimiento de entregas:** % de compras recibidas a tiempo vs. `fecha_estimada_pago` de la OC — construido.
- **Comparativo de precios:** historial de precio unitario por descripción de concepto entre proveedores (para conceptos recurrentes) — construido, comparando por texto de la descripción. *(Falta la versión por SKU real: cuando un concepto de factura ya está conciliado contra un producto del catálogo, comparar precio por SKU entre proveedores en vez de por texto — ver "Pendiente para V2".)*
- Calificación manual del proveedor (1-5) con notas — construido.
- Dashboard de proveedores: ranking por volumen, por cumplimiento, por variación de precios — **no construido**, ver "Pendiente para V2".

### 6.4 Campos de datos

**`proveedor`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| razon_social | Texto | Sí |
| rfc | Texto | Sí |
| contacto_nombre / telefono / correo | Texto | No |
| clabe | Texto | No |
| banco | Texto | No |
| titular_cuenta | Texto | No |
| dias_credito_default | Entero | No |
| categoria_gasto_default | Referencia (catálogo Tesorería) | No — **columna existe, no se captura en el formulario todavía** (ver "Pendiente para V2"; perdió parte de su sentido original de heredar categoría al proyectado, ya que ese puente se eliminó — sección 8) |
| estado | Enum (activo/inactivo) | Sí |

Los datos bancarios (`clabe`, `banco`, `titular_cuenta`) son opcionales y no se piden al dar de alta al proveedor: hay un botón "Agregar datos bancarios" que despliega esos tres campos, tanto al crear como al editar un proveedor existente.

**`evaluacion_proveedor`** (Professional): id, proveedor_id, calificacion (1-5), notas, fecha, usuario_id. *(Los indicadores de cumplimiento y precios se calculan de `compra`/`recepcion`, no se capturan.)*

### 6.5 Pantallas / Dashboard

**Essential:** catálogo (lista + ficha del proveedor con historial y saldo); alta/edición (con datos bancarios opcionales); carga masiva CSV.

**Professional (adicional):** indicadores de cumplimiento y comparativo de precios en la misma lista; calificación manual. *(Dashboard/ranking dedicado: pendiente.)*

---

## 7. Inventario y catálogo de productos (Professional)

**Cambio de alcance respecto a v0.1:** originalmente esto se planeó como producto adicional aparte (`productos-adicionales.md`). Se decidió meterlo **dentro** de este módulo, gateado a Professional (`catalogoProductos` en los límites del tier), en vez de como addon independiente.

### 7.1 Qué se construyó
- **Catálogo de productos** (`producto`): SKU (obligatorio, único por empresa), nombre, descripción, unidad de medida, activo/inactivo.
- **Costo de referencia = promedio calculado, no un número capturado a mano.** Se recalcula (ponderado por cantidad) cada vez que una línea de factura o de ticket se le asigna a ese SKU — no de líneas de OC manual, cuyo precio normalmente es solo una copia del propio costo de referencia. Al crear un producto nuevo (sin historial) sí se pide un estimado inicial, editable; en cuanto existe, deja de ser editable a mano.
- **Catálogo de unidades de medida** (`unidad_medida`, global — pza, kg, g, l, ml, m, cm, caja, paquete, docena, ton, m², m³, con `factor_base` de conversión): cada empresa elige en Configuración qué subconjunto usar; eso es lo que se ofrece al capturar un producto. **Conversión real entre unidades:** cada línea de factura/ticket guarda en qué unidad vino (con sugerencia automática desde el XML) y se normaliza contra la unidad del producto en catálogo al calcular el costo promedio — ej. factura en kg, catálogo en g, se convierte solo. Sin factor de conversión definido (caja/paquete: contenido variable; unidades de categorías distintas) se asume 1:1.
- **Órdenes de compra seleccionan del catálogo** (Professional): cada renglón de una OC nueva se elige de la lista de productos activos, en vez de texto libre. *(Essential sigue siendo texto libre, sin catálogo.)*
- **Conciliación factura/ticket↔catálogo** ("Asignar SKU's por conceptos" / "Asignar SKU"): al cargar una factura por XML, o al capturar un ticket, sus conceptos se ligan a productos del catálogo — con sugerencia automática y opción de crear el producto ahí mismo si no existe.
- **Inventario (kardex):** cada recepción (total o parcial) de un renglón con producto asignado genera una entrada en `movimiento_inventario` (entrada/salida). La existencia de cada producto es la suma de sus movimientos, no una columna que se actualiza a mano.

### 7.2 Otros productos adicionales relacionados
Se documentan en `productos-adicionales.md`:
- **Lectura de tickets ampliada** (más documentos/mes que el límite del nivel; mismo modelo que Conciliación con PDF ampliada, Tesorería)
- **Almacenamiento de documentos originales** (XML/foto de ticket) — candidato a addon futuro, ver sección 5.4.

---

## 8. Consume / expone hacia otros módulos

**Cambio de alcance respecto a v0.1:** se eliminó el puente vía `mov_esperados`/`mov_confirmados`. La razón: Compras publicaba el proyectado, Tesorería lo conciliaba contra el banco, pero ese resultado nunca regresaba — la OC/factura se quedaba sin marcar como pagada del lado de Compras. Se reemplazó por un match directo:

- **Match directo con Tesorería ("Vincular banco"):** desde Cuentas por Pagar, se elige un egreso bancario real (`treasury_movements`, tabla de Tesorería) que todavía no se haya usado en ningún cruce de Compras, y se reparte su monto entre una o varias OC/facturas — **siempre del mismo proveedor**. Cada reparto genera una fila en `pago_compra` con `treasury_movement_id` apuntando al movimiento. Esa misma referencia es lo que "bloquea" el movimiento: en cuanto un pago lo referencia, deja de aparecer como disponible para volver a cruzarse — no hay columna de estado a mantener sincronizada, se calcula de la existencia del pago.
- **Registro de pago manual** (sin pasar por Tesorería) sigue disponible en paralelo, para negocios que no llevan Tesorería en el sistema o pagan por vías que no se van a conciliar.
- **Anotación libre en Tesorería (sin dependencia de Compras):** si la empresa NO tiene Compras/CxC activo, Tesorería permite anotar UUID fiscal y proveedor como texto libre al capturar un movimiento manual — solo como bitácora, no crea ni relaciona nada en Compras. Si Compras SÍ está activo, esos campos se ocultan a favor del match real descrito arriba.
- **Consume:** nada por ahora.

---

## 9. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: alerta de pagos por vencer (correo/WhatsApp al responsable), envío automático de OC al proveedor, recordatorio de compras pendientes de factura al cierre de mes (deducibles), aviso al aprobador cuando hay compras en su bandeja.

---

## 10. Pendiente para V2

Explícitamente pospuesto — no es que se haya intentado y quedó a medias, es una decisión de quedarse ahí por ahora:

- **Moneda en la OC:** el registro de compra no tiene selector de moneda; todo queda en MXN.
- **Reporte de diferencias factura vs. OC, línea por línea:** hoy es un badge `ok`/`con_diferencias` calculado al conciliar SKU; falta el detalle expandido (monto distinto / concepto no ordenado / cantidad distinta por renglón).
- **Comparativo de precios por SKU real:** existe por texto de descripción; falta la versión que use la conciliación SKU↔factura ya construida para comparar precio por producto exacto entre proveedores.
- **Dashboard/ranking de proveedores:** no hay una vista dedicada de ranking por volumen/cumplimiento/variación de precios — los indicadores viven en la fila de cada proveedor, no agregados.
- **`categoria_gasto_default` del proveedor:** la columna existe pero no se captura en el formulario; su propósito original (heredar categoría al proyectado de Tesorería) perdió sentido al eliminarse el puente `mov_esperados` — habría que redefinir para qué se usaría antes de exponerla.
- **Proyecciones de flujo de caja hacia Tesorería:** cómo debe verse ahora que no existe el puente `mov_esperados` (tema abierto, a definir en conjunto con Tesorería).
- **Automatizaciones N8N** (sección 9): sin diseñar.

**Resuelto (ya no está pendiente, se construyó tras el borrador inicial de esta lista):**
- **Conversión entre unidades de medida** al calcular el costo promedio: cada línea de factura/ticket guarda en qué unidad vino (`unidad`, con sugerencia automática desde `ClaveUnidad`/`Unidad` del CFDI), y `procurement_units.factor_base` normaliza esa cantidad a la unidad del producto en catálogo antes de promediar (ej. factura en kg, catálogo en g). Sin factor definido (caja, paquete — contenido variable por producto) o entre categorías distintas, se asume 1:1 igual que antes.
- **Tickets también se concilian contra el catálogo:** nueva sección "Tickets por conciliar" + modal de asignación de SKU, igual que facturas — antes solo las líneas de factura contaban como evidencia real de costo.
