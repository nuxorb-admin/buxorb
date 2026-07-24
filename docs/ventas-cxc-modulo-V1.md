# Módulo: Ventas y CxC
[[ventas y cxc]]
**Versión:** 0.1 (borrador para validación)
**Fecha:** 19 de julio de 2026
**Estado:** Alcance definido — pendiente de pricing (ver `ventas-cxc-pendientes.md`)
**Notas de alcance:**
- NO incluye timbrado CFDI. El timbrado es producto adicional (Facturama, ver `productos-adicionales.md`). El módulo registra facturas internamente.
- NO incluye punto de venta (POS) ni inventario/existencias. El pedido es un documento de confirmación comercial, no de almacén. Cuando exista un módulo de Inventario, se conectará vía el estándar inter-módulo.

---

## 1. Objetivo del módulo

Dar a negocios el control del ciclo comercial completo: seguimiento de oportunidades, cotización, pedido, registro de factura y cobranza — con la flexibilidad de entrar en cualquier punto del ciclo (factura directa, pedido sin cotización, cotización sin oportunidad previa). Ningún documento es obligatorio como origen del siguiente.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Prospectos y oportunidades | Lista simple con estado (sin pipeline visual) | Pipeline visual con etapas configurables + responsable asignado + motivo de pérdida | A medida |
| Cotización y pedido | Cotización (PDF enviable) → pedido; catálogo simple de productos/servicios | + Versiones de cotización, aprobación de descuentos (umbral configurable), vigencia con alerta | A medida |
| Facturación (registro interno) | Registro de factura: contado o crédito, pagos parciales y anticipos | + Facturación parcial de un pedido (entregas por partes) | A medida |
| CxC y cobranza | Cartera visible (al corriente / por vencer / vencida), registro manual de cobro | + Recordatorios automáticos por email, antigüedad de saldos, estado de cuenta por cliente | A medida |
| Usuarios (además del admin de cuenta) | 1 | 3 | A medida |
| Integraciones API | 1 (definida por el cliente) | +2 adicionales | A medida |

**Enterprise** incluye todo Professional + funcionalidades a medida: scoring de leads, asignación automática por vendedor/zona, políticas de crédito por cliente con bloqueo automático, cobranza con escalamiento configurable (recordatorio → llamada → legal). Alcance y precio caso por caso.

---

## 3. Estándares de plataforma

Aplican los definidos en `tesoreria-modulo.md` sección 3 (conexión inter-módulo vía vistas `mov_esperados` / `mov_confirmados`, esquema de usuarios y permisos).

### 3c. NUEVO estándar: Catálogo compartido de clientes

- Vive en un schema `compartido` de la base de datos, disponible para todos los módulos.
- Primer módulo que lo usa: Ventas y CxC. Nace como estándar de plataforma para no migrarlo después.

**`cliente`** (schema compartido)
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| negocio_id | Referencia | Sí |
| razon_social | Texto | Sí |
| nombre_comercial | Texto | No |
| rfc | Texto | No* (*obligatorio si se factura) |
| regimen_fiscal | Catálogo SAT | No* |
| uso_cfdi | Catálogo SAT | No* |
| codigo_postal_fiscal | Texto | No* |
| email | Texto | No |
| telefono | Texto | No |
| dias_credito | Entero (default 0 = contado) | Sí |
| activo | Booleano | Sí |

Los campos fiscales (RFC, régimen, uso CFDI, CP) son opcionales en el alta rápida, pero requeridos si el negocio contrata el producto adicional de timbrado.

---

## 4. Subproceso: Prospectos y oportunidades

### 4.1 Objetivo
Registrar a quién se le está vendiendo y en qué punto va cada venta potencial, sin perder seguimiento.

### 4.2 Funcionalidades Essential
- Alta de prospecto: nombre, contacto, origen (referido/web/redes/otro), notas
- Oportunidad ligada al prospecto: qué quiere, monto estimado, estado simple (nuevo / contactado / en negociación / ganada / perdida)
- Lista con filtros por estado y fecha
- Conversión: al ganar, el prospecto se convierte (o vincula) a `cliente` en el catálogo compartido
- Una oportunidad puede generar una cotización (opcional, no obligatorio)

### 4.3 Funcionalidades Professional (incremental)
- Pipeline visual (kanban) con etapas configurables por el negocio (catálogo editable, mismo patrón que categorías en Tesorería: levantamiento inicial + edición libre)
- Responsable asignado por oportunidad (usuario del módulo)
- Motivo de pérdida (catálogo editable) al marcar perdida — alimenta el dashboard
- Fecha estimada de cierre

### 4.4 Campos de datos

**`oportunidad`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| prospecto_id / cliente_id | Referencia | Sí (uno de los dos) |
| descripcion | Texto | Sí |
| monto_estimado | Decimal | No |
| moneda | Enum (default MXN) | Sí |
| estado | Enum (nuevo/contactado/negociacion/ganada/perdida) | Sí |
| etapa_id | Referencia | No (Professional, sustituye al enum) |
| responsable_usuario_id | Referencia | No (Professional) |
| motivo_perdida_id | Referencia | Solo si perdida (Professional) |
| fecha_estimada_cierre | Fecha | No (Professional) |

Tablas auxiliares: `prospecto`, `etapa_pipeline` (Professional), `motivo_perdida` (Professional).

---

## 5. Subproceso: Cotización y pedido

### 5.1 Objetivo
Formalizar la propuesta comercial (cotización) y congelar el compromiso de venta (pedido): qué se entrega, a qué precio y bajo qué condición de pago.

### 5.2 Funcionalidades Essential
- Catálogo simple de productos/servicios: nombre, descripción, precio unitario, unidad, tasa de IVA (16% / 0% / exento)
- Cotización con partidas (producto/servicio, cantidad, precio, descuento por partida), subtotal, IVA y total
- PDF de cotización con logo y datos del negocio, enviable por email desde el sistema
- Estados: borrador → enviada → aceptada / rechazada / vencida
- Cotización aceptada → genera pedido con un clic (también se puede crear pedido directo sin cotización)
- Pedido: partidas congeladas, condición de pago (contado / crédito a N días — default tomado de `cliente.dias_credito`), fecha compromiso de entrega
- Registro de anticipo sobre pedido (se aplica después a la factura)

### 5.3 Funcionalidades Professional (incremental)
- Versiones de cotización (v1, v2...) con historial — solo una activa
- Aprobación de descuentos: umbral % configurable por el negocio; si el descuento lo supera, la cotización requiere aprobación de un usuario con permiso antes de poder enviarse
- Vigencia con alerta: aviso cuando una cotización enviada está por vencer

### 5.4 Campos de datos

**`cotizacion`**: id, oportunidad_id (opcional), cliente_id/prospecto_id, version (Professional), fecha_emision, vigencia_hasta, estado (borrador/enviada/aceptada/rechazada/vencida), subtotal, descuento_total, iva, total, requiere_aprobacion (bool), aprobada_por (Professional).

**`cotizacion_detalle`**: id, cotizacion_id, producto_servicio_id, descripcion, cantidad, precio_unitario, descuento_pct, importe.

**`pedido`**: id, cotizacion_id (opcional), cliente_id, fecha, condicion_pago (contado/credito), dias_credito, fecha_compromiso, estado (abierto/facturado_parcial/facturado/cancelado), subtotal, iva, total.

**`pedido_detalle`**: mismo patrón que cotización, + cantidad_facturada (para facturación parcial en Professional).

**`producto_servicio`**: id, nombre, descripcion, unidad, precio_unitario, tasa_iva (16/0/exento), activo.

---

## 6. Subproceso: Facturación (registro interno)

### 6.1 Objetivo
Registrar el documento de cobro (contado o crédito) y su saldo, con o sin timbrado. Es el punto de entrada directo para negocios que no cotizan ni levantan pedidos.

### 6.2 Funcionalidades Essential
- Factura desde pedido (hereda partidas y condición de pago) o factura directa (captura libre: cliente + partidas)
- Condición: contado (nace pagada o pendiente de cobro inmediato) o crédito (fecha de vencimiento = fecha emisión + días de crédito, editable)
- Aplicación de anticipos del pedido al saldo de la factura
- Folio interno consecutivo por negocio
- Estados: pendiente / pago parcial / pagada / vencida / cancelada
- Si el negocio tiene el producto adicional de timbrado: botón "Timbrar" (vía Facturama) que guarda UUID fiscal y PDF/XML; incluye complemento de pago (PPD) para cobros parciales a crédito

### 6.3 Funcionalidades Professional (incremental)
- Facturación parcial de un pedido: varias facturas contra un mismo pedido (entregas por partes), con control de cantidades facturadas vs. pendientes

### 6.4 Campos de datos

**`factura`**
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
| timbrada | Booleano | Sí (default false) |
| uuid_cfdi / archivo_xml / archivo_pdf | Texto | Solo si timbrada |

Tabla auxiliar: `factura_detalle` (mismo patrón que pedido_detalle).

---

## 7. Subproceso: CxC y cobranza

### 7.1 Objetivo
Ver quién debe, cuánto y desde cuándo; registrar cobros y (en Professional) automatizar recordatorios para reducir cartera vencida.

### 7.2 Funcionalidades Essential
- Cartera: facturas con saldo, clasificadas al corriente / por vencer (próximos 7 días) / vencidas
- Registro manual de cobro: fecha, monto, referencia — soporta pago total y pagos parciales
- Al registrar cobro se recalcula `saldo_pendiente` y estado de la factura
- **Vinculación con Tesorería:** si el negocio tiene el módulo Tesorería, el cobro se registra al vincular en Tesorería el ingreso real con el proyectado (ver sección 9), y la factura se actualiza aquí automáticamente. Si NO tiene Tesorería, el cobro se registra directamente en este módulo.

### 7.3 Funcionalidades Professional (incremental)
- Recordatorios automáticos por email: configurables en 3 momentos (N días antes de vencer / al vencer / cada N días después de vencida), con plantilla editable por el negocio
- Envío vía infraestructura Nuxorb (Resend): remitente `cobranza@notificaciones.nuxorb.com` con nombre del negocio visible y `reply-to` al correo del negocio. Si el cliente quiere enviar desde su propio correo (Gmail/Outlook), se configura como una de sus integraciones API
- Antigüedad de saldos: 1-30 / 31-60 / 61-90 / +90 días
- Estado de cuenta por cliente (PDF/Excel): facturas, cobros y saldo total

### 7.4 Campos de datos

**`cobro`**: id, factura_id, fecha, monto, tipo (anticipo/parcial/total), referencia, origen (modulo/tesoreria).

**`configuracion_recordatorio`** (Professional): negocio_id, dias_antes, al_vencer (bool), dias_despues_recurrente, plantilla_email, activo.

**`log_recordatorio`** (Professional): id, factura_id, fecha_envio, tipo (previo/vencimiento/vencida), email_destino, estado_envio.

### 7.5 Pantallas / Dashboard

**Essential:** lista de prospectos/oportunidades; catálogo de productos/servicios; cotización (captura + PDF + envío); pedido; factura (captura + aplicación de anticipos); cartera con clasificación; registro de cobro; dashboard de ventas del periodo (facturado, cobrado, por cobrar).

**Professional (adicional):** pipeline kanban; pantalla de aprobación de descuentos; configuración de recordatorios + log de envíos; antigüedad de saldos; estado de cuenta por cliente; dashboard comparativo periodo a periodo, ventas por responsable y motivos de pérdida.

---

## 8. Productos adicionales relacionados

Se documentan en `productos-adicionales.md`. Relacionados con este módulo:
- **Timbrado CFDI (Facturama):** fee único de implementación + fee mensual de mantenimiento; el plan anual y folios de Facturama los contrata y paga el cliente directo, sin markup. Requiere este módulo.
- **Chatbot de cobranza WhatsApp:** recordatorios y consultas de saldo vía WhatsApp Business (costo por conversación de Meta a cargo del cliente). Requiere este módulo, nivel Professional.

---

## 9. Consume / expone hacia otros módulos

- **Expone `mov_esperados`:** cada factura a crédito publica un ingreso proyectado: tipo=ingreso, monto=saldo_pendiente, fecha_esperada=fecha_vencimiento, modulo_origen=ventas_cxc, referencia_id=factura. Los anticipos y facturas de contado pendientes de cobro también se publican con su fecha esperada.
- **Expone `mov_confirmados`:** cuando en Tesorería se vincula el ingreso real con el proyectado, o cuando el cobro se registra en este módulo (negocio sin Tesorería).
- **Consume:** nada por ahora.

---

## 10. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: envío de recordatorios de cobranza (Professional), alerta de cotización por vencer, envío del estado de cuenta mensual al cliente del negocio, notificación al responsable cuando una oportunidad lleva N días sin movimiento.
