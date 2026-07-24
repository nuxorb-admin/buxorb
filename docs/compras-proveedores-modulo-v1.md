# Módulo: Compras y Proveedores

**Versión:** 0.1 (borrador para validación)
**Fecha:** 19 de julio de 2026
**Estado:** Alcance definido — pendiente de pricing y límites (ver `compras-pendientes.md`)
**Nota de alcance:** NO incluye inventario. El control de existencias es producto adicional (ver `productos-adicionales.md`); este módulo expone las entradas por compra recibida vía vista compartida para que inventario las consuma si existe.

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

Aplican los definidos en `tesoreria-modulo.md` sección 3 (conexión inter-módulo vía vistas `mov_esperados` / `mov_confirmados`, esquema de usuarios y permisos).

**Decisión de infraestructura (plataforma, AI-native):** la extracción de datos de documentos (tickets, y a futuro extractos bancarios de Tesorería) se resuelve con un **pipeline interno Nuxorb de documento → JSON basado en LLM con visión**: imagen/PDF → modelo de visión → JSON estructurado → validación de campos → pantalla de confirmación del usuario. El pipeline es infraestructura interna (mismo estatus que el motor de cálculo de nómina), con costo variable por documento. La IA propone, el usuario siempre confirma antes de que se cree el registro. El piloto de exactitud pendiente en Tesorería se amplía para cubrir tickets (ver pendientes).

---

## 4. Subproceso: Ciclo de compra

### 4.1 Objetivo
Registrar y controlar el flujo solicitud → aprobación → orden de compra → recepción, adaptándose al nivel de formalidad del negocio (desde "una persona lo hace todo" hasta aprobaciones multinivel).

### 4.2 Funcionalidades Essential
- **Aprobación configurable (on/off por negocio):**
  - Apagada: compra directa — quien captura, compromete (proceso típico de micro negocio)
  - Encendida: 1 nivel — rol "captura" y rol "aprueba"; si la misma persona tiene ambos roles, la compra se auto-aprueba
- Registro de compra: proveedor, conceptos (descripción, cantidad, precio unitario), subtotal, IVA, total, moneda, fecha estimada de pago, condición (contado/crédito + días)
- Generación de PDF básico de la orden (para enviar al proveedor por fuera del sistema)
- Recepción total: marcar la compra como recibida con fecha
- Estados de la compra: borrador → (pendiente de aprobación) → aprobada → recibida → pagada / cancelada
- Al aprobar una compra con fecha estimada de pago, se publica el egreso proyectado hacia Tesorería (ver sección 8)

### 4.3 Funcionalidades Professional (incremental)
- **Requisición formal:** solicitud interna previa a la compra, con solicitante, justificación y departamento
- **Niveles múltiples de aprobación** con reglas configurables:
  - Por monto (ej. > $X requiere segundo aprobador)
  - Por departamento (el jefe del área aprueba primero)
  - Cadena secuencial de hasta N niveles (pendiente definir N)
- OC formal en PDF con folio, enviada al proveedor por correo desde el sistema
- **Recepción parcial:** registrar entregas en partes contra la misma OC (cantidad recibida vs. ordenada por renglón)

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

**`recepcion`**: id, compra_id, fecha, tipo (total/parcial), notas. En Professional con detalle por renglón.

### 4.5 Pantallas / Dashboard

**Essential:**
- Registro de compra (formulario) + PDF de orden
- Bandeja de aprobación (solo si la aprobación está encendida)
- Listado de compras con filtros: estado, proveedor, fecha, origen
- Marcar recepción

**Professional (adicional):**
- Captura de requisición + bandeja de aprobaciones multinivel (con indicador de en qué nivel va)
- Configuración de reglas de aprobación
- Recepción parcial por renglón (recibido vs. ordenado)
- Envío de OC por correo desde el sistema

---

## 5. Subproceso: Facturas, tickets y cuentas por pagar

### 5.1 Objetivo
Capturar el comprobante de la compra (CFDI o ticket) con el mínimo de tecleo, evitar duplicados cuando la factura llega después del ticket, y controlar cuánto se le debe a cada proveedor y cuándo vence.

### 5.2 Funcionalidades Essential
- **Carga de XML de CFDI como vía principal de captura:** el XML crea la compra automáticamente (proveedor por RFC — se da de alta si no existe —, conceptos, subtotal, IVA, total, UUID fiscal). Pasa por pantalla de confirmación antes de guardarse. Si ya existe una compra del mismo proveedor pendiente de factura, el sistema sugiere vincular en lugar de duplicar.
- **Lectura de tickets con IA (límite mensual incluido, pendiente definir N):** foto/imagen del ticket → pipeline LLM extrae comercio, fecha, subtotal, IVA, total → pantalla de confirmación editable → crea la compra con estado "pendiente de factura". Captura manual de ticket siempre disponible sin límite.
- **Vinculación ticket → factura:** cuando llega el XML de una compra registrada por ticket, se vincula y se completan los datos fiscales (UUID, RFC) sin duplicar el gasto.
- **Cuentas por pagar:** saldo pendiente por proveedor, listado de compras a crédito con fecha de vencimiento, marcado de pago (fecha y monto — el flujo de caja real vive en Tesorería).

### 5.3 Funcionalidades Professional (incremental)
- **Match factura vs. OC (simplificado):** al cargar el XML contra una OC existente, comparación automática de proveedor, conceptos y montos; reporte de diferencias (monto distinto / concepto no ordenado / cantidad distinta)
- **Antigüedad de saldos:** por vencer / vencido 1-30 / 31-60 / 61+ días, por proveedor
- **Calendario de pagos:** vista semanal/mensual de vencimientos, exportable

### 5.4 Campos de datos

**`factura_compra`**
| Campo | Tipo |
|---|---|
| id | UUID |
| compra_id | Referencia |
| uuid_fiscal | Texto (UUID CFDI) |
| rfc_emisor | Texto |
| fecha_emision | Fecha |
| subtotal / iva / total | Decimal |
| xml_url / pdf_url | Texto |
| estado_match | Enum (ok/con_diferencias) (Professional) |

**`ticket_compra`**: id, compra_id, imagen_url, resultado_ia JSON, confianza, estado (procesando/confirmado/error), fecha_carga.

**`pago_compra`**: id, compra_id, fecha, monto, referencia. *(El registro del pago aquí actualiza el estado de la compra; el movimiento real de dinero se refleja en Tesorería vía vinculación.)*

**`uso_lectura_tickets`** (control de límite mensual): negocio_id, periodo, veces_usado (límite: Essential N, Professional N — pendientes).

### 5.5 Pantallas / Dashboard

**Essential:**
- Carga de XML (individual o múltiple) + preview de confirmación
- Captura de ticket (foto/upload) + preview editable del resultado IA
- Bandeja "pendientes de factura" (compras por ticket sin XML vinculado)
- Cuentas por pagar: saldo por proveedor + próximos vencimientos
- Registro de pago

**Professional (adicional):**
- Reporte de diferencias factura vs. OC
- Antigüedad de saldos
- Calendario de pagos

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
- **Cumplimiento de entregas:** % de compras recibidas a tiempo vs. fecha prometida (requiere capturar fecha prometida en la OC)
- **Comparativo de precios:** historial de precio unitario por descripción de concepto entre proveedores (para conceptos recurrentes)
- Calificación manual del proveedor (1-5) con notas
- Dashboard de proveedores: ranking por volumen, por cumplimiento, por variación de precios

### 6.4 Campos de datos

**`proveedor`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| razon_social | Texto | Sí |
| rfc | Texto | Sí |
| contacto_nombre / telefono / correo | Texto | No |
| clabe | Texto | No |
| dias_credito_default | Entero | No |
| categoria_gasto_default | Referencia (catálogo Tesorería) | No |
| estado | Enum (activo/inactivo) | Sí |

**`evaluacion_proveedor`** (Professional): id, proveedor_id, calificacion (1-5), notas, fecha, usuario_id. *(Los indicadores de cumplimiento y precios se calculan de `compra`/`recepcion`, no se capturan.)*

### 6.5 Pantallas / Dashboard

**Essential:** catálogo (lista + ficha del proveedor con historial y saldo); alta/edición; carga masiva.

**Professional (adicional):** ficha ampliada con indicadores de cumplimiento y comparativo de precios; dashboard/ranking de proveedores; calificación manual.

---

## 7. Productos adicionales relacionados

Se documentan en `productos-adicionales.md`. Relacionados con este módulo:
- **Inventario** (nuevo — consume las recepciones de este módulo)
- **Lectura de tickets ampliada** (nuevo — más documentos/mes que el límite del nivel; mismo modelo que Conciliación con PDF ampliada)

---

## 8. Consume / expone hacia otros módulos

- **Expone `mov_esperados`:** al aprobarse una compra, se publica egreso proyectado con tipo=egreso, monto=total, fecha_esperada=fecha_estimada_pago, modulo_origen=compras, moneda. La categoría se hereda de `categoria_gasto_default` del proveedor (o "Compras de mercancía / materia prima" si no está definida). En Tesorería aparece como proyectado.
- **Expone `mov_confirmados`:** cuando en Tesorería se vincula el pago real con el proyectado.
- **Expone `entradas_compra`** (vista para el producto adicional Inventario): compra_id, renglón, descripción, cantidad recibida, fecha de recepción. Si Inventario no está contratado, la vista simplemente no se consume — sin dependencia dura.
- **Consume:** nada por ahora.

---

## 9. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: alerta de pagos por vencer (correo/WhatsApp al responsable), envío automático de OC al proveedor, recordatorio de compras pendientes de factura al cierre de mes (deducibles), aviso al aprobador cuando hay compras en su bandeja.
