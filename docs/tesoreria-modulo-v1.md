# Módulo: Tesorería
[[tesorería]]
**Versión:** 1.0
**Fecha:** 19 de julio de 2026
**Estado:** Borrador final — pendiente de pricing (ver `tesoreria-pendientes.md`)

---

## 1. Objetivo del módulo

Dar a negocios (emprendimientos y PyMEs) visibilidad y control sobre su flujo de caja y el estado real de sus cuentas bancarias, sin depender de otros módulos de Nuxorb, pero con capacidad de conectarse a ellos cuando existan.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Ingesta | Manual (formulario) o template Excel/Sheets | Automática desde archivo bancario, hasta 2 bancos | A medida |
| Categorización | Catálogo fijo (17 categorías) | Catálogo personalizable (inicial + alta libre) | A medida |
| Vista de flujo de caja | Consolidada, filtro por temporalidad | Desglosada por cuenta + comparativo mes a mes | A medida |
| Conciliación | Manual (saldo) + 1 PDF/mes (1 cuenta) | Manual (saldo) + hasta 2 PDF/mes (2 cuentas) | A medida |
| Cuentas bancarias | Sin límite | Sin límite | A medida |
| Usuarios (además del admin de cuenta) | 1 | 3 | A medida |
| Integraciones API | 1 (definida por el cliente) | +2 adicionales (definidas por el cliente) | A medida |

**Enterprise** incluye todo Professional + funcionalidades diseñadas 100% a la medida del cliente (alcance y precio definidos caso por caso).

---

## 3. Estándares de plataforma (aplican a todos los módulos Nuxorb, no solo Tesorería)

### 3a. Conexión inter-módulo

- Arquitectura: una sola base de datos compartida, un schema por módulo.
- Cualquier módulo que quiera alimentar a otro publica, dentro de su propio schema, vistas con nombre fijo:
  - `mov_esperados`: tipo, monto, fecha_esperada, estado, modulo_origen, referencia_id, moneda
  - `mov_confirmados`: mismos campos + fecha_real, id_transaccion_bancaria
- El módulo consumidor revisa qué schemas tienen esas vistas y las consulta; si no existen, opera sin ellas (sin dependencia dura — cada módulo es independiente).

### 3b. Usuarios y permisos

- 1 Admin de cuenta: rol global, acceso a todos los módulos contratados, no ocupa un "seat" de módulo.
- Usuarios adicionales: se definen por módulo según su nivel (ver tabla de resumen).
- Seats extra: comprables por módulo (pricing pendiente).

---

## 4. Subproceso: Flujo de caja y liquidez

### 4.1 Objetivo
Dar visibilidad clara y actualizada de entradas, salidas y saldo disponible, permitiendo decisiones de liquidez sin depender de otros módulos.

### 4.2 Funcionalidades Essential
- Registro manual de ingresos/egresos (formulario individual)
- Descarga de template estandarizado (Excel/Sheets) con columna "categoría" en lista desplegable (17 opciones fijas) → el usuario copia y pega sus movimientos desde el estado de cuenta y asigna categoría ahí mismo → carga el archivo al sistema
- Vista previa de carga: sugerencia automática de categoría si la descripción ya fue categorizada antes vía motor de patrones (editable antes de confirmar)
- Categorización con catálogo fijo (no editable) — 17 categorías (ver 4.4)
- Flujo de caja consolidado (todas las cuentas juntas) con filtro por temporalidad (día/semana/mes)
- Sin límite de cuentas bancarias registradas
- Reporte de flujo histórico
- Vinculación manual de un movimiento real con un movimiento "proyectado" (proveniente de `mov_esperados` de otro módulo), cuando exista

### 4.3 Funcionalidades Professional (incremental sobre Essential)
- Automatización de lectura del archivo descargado directamente del banco (sin manipular) — hasta 2 bancos, configurable por cuenta bancaria en modo "revisión previa" (pasa por pantalla de aprobación) o "directo" (se guarda sin revisión)
- Sugerencia automática de categoría por patrón, aplicada en la importación; si no hay coincidencia cae en "Otros" y se marca como pendiente de revisar
- Categorías personalizables: catálogo inicial vía levantamiento/onboarding + alta libre durante el uso
- Comparativo mes a mes (% de variación)
- Vista de flujo de caja desglosado por cuenta bancaria individual

### 4.4 Catálogo de categorías (Essential — fijo, no editable)

| Categoría | Tipo | Naturaleza |
|---|---|---|
| Ventas | Ingreso | — |
| Otros ingresos | Ingreso | — |
| Nómina | Egreso | Fijo |
| Renta | Egreso | Fijo |
| Servicios (luz, agua, internet, tel.) | Egreso | Fijo |
| Seguros | Egreso | Fijo |
| Software y suscripciones | Egreso | Fijo |
| Préstamos / financiamiento | Egreso | Fijo |
| Compras de mercancía / materia prima | Egreso | Variable |
| Comisiones (venta/bancarias) | Egreso | Variable |
| Fletes y logística | Egreso | Variable |
| Mantenimiento | Egreso | Variable |
| Impuestos | Egreso | Operativo |
| Marketing y publicidad | Egreso | Operativo |
| Viáticos / viajes | Egreso | Operativo |
| Papelería y oficina | Egreso | Operativo |
| Honorarios profesionales (contador, legal) | Egreso | Operativo |
| Otros egresos | Egreso | — |

La "naturaleza" (fijo/variable/operativo) es un atributo del catálogo, no un campo que el usuario llena por movimiento — se hereda automáticamente de la categoría elegida.

### 4.5 Campos de datos

**`movimiento`**
| Campo | Tipo | Obligatorio | Origen |
|---|---|---|---|
| id | UUID | Sí | Sistema |
| fecha | Fecha | Sí | Usuario / archivo |
| tipo | Enum (ingreso/egreso) | Sí | Usuario |
| monto | Decimal | Sí | Usuario |
| moneda | Enum (MXN/USD...) | Sí | Usuario (default MXN) |
| categoria | Catálogo | Sí | Usuario (fijo en Essential, editable en Professional) |
| cuenta_bancaria_id | Referencia | Sí | Usuario |
| descripcion | Texto | No | Usuario |
| origen | Enum (manual/template/automatizacion_bancaria/mov_esperados) | Sí | Sistema |
| modulo_origen | Texto | No* | Vista compartida (*solo si origen = mov_esperados) |
| estado_revision | Enum (pendiente/confirmado) | Sí (solo si aplica revisión) | Sistema |

**`patron_categoria`**
| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | — |
| texto_patron | Texto | Palabra clave (sugerida por heurística, confirmada/editada por el usuario) |
| categoria_id | Referencia | Categoría asociada |
| negocio_id | Referencia | Global al negocio (no por cuenta bancaria) |
| frecuencia_uso | Entero | Para desempate si varios patrones coinciden |
| fecha_actualizacion | Fecha | — |

**`configuracion_cuenta_bancaria`** (Professional)
| Campo | Tipo | Obligatorio |
|---|---|---|
| cuenta_bancaria_id | Referencia | Sí |
| modo_importacion | Enum (revision_previa/directo) | Sí |

### 4.6 Pantallas / Dashboard

**Essential:**
- Registro de movimiento (formulario)
- Descarga de template + carga de archivo (upload con preview, incluye sugerencia de categoría editable)
- Dashboard flujo de caja consolidado (gráfico + filtro de temporalidad)
- Filtros: fecha, categoría
- Lista de movimientos proyectados pendientes de vincular

**Professional (adicional):**
- Configuración de automatización bancaria (banco/cuenta, modo de importación por cuenta)
- Pantalla de revisión de movimientos importados (solo si la cuenta está en modo revisión previa)
- Gestión de categorías (levantamiento inicial + alta libre)
- Dashboard comparativo mes a mes
- Selector de cuenta bancaria individual (vista desglosada)

### 4.7 Integraciones API
- Essential (1): la que defina el cliente.
- Professional (+2): automatización de ingesta hasta 2 bancos (vía API si el cliente ya tiene una, o vía n8n leyendo el archivo descargado).

### 4.8 Consume / expone hacia otros módulos
- **Consume** (si existe): vista `mov_esperados` → se muestra como "proyectado", diferenciado de lo real.
- **Expone**: `mov_confirmados` — se genera cuando el usuario vincula manualmente un movimiento real con un proyectado pendiente.

---

## 5. Subproceso: Conciliación bancaria

### 5.1 Objetivo
Verificar que el saldo registrado en Flujo de caja coincide con el extracto bancario oficial, generar el cuadre de saldo y un reporte para el contador. Es un proceso interno (banco vs. libros) — no participa del estándar de conexión inter-módulo.

### 5.2 Funcionalidades Essential
- Captura manual: saldo inicial, saldo final, ingresos totales y egresos totales según el extracto bancario (por cuenta, por periodo) — sin límite de cuentas ni de meses
- Cálculo automático de cuadre: saldo según Flujo de caja vs. saldo según banco → diferencia
- Reporte de cuadre exportable (PDF/Excel) para el contador
- 1 conciliación con lectura de PDF (OCR, detalle movimiento por movimiento) al mes, limitada a 1 cuenta bancaria

### 5.3 Funcionalidades Professional (incremental)
- Conciliación con PDF incluida hasta 2 veces al mes, en hasta 2 cuentas bancarias
- Cuando se usa PDF: matching automático (monto + fecha) + sugerencias de match por patrón (reutiliza el motor de `patron_categoria`) + reporte de discrepancias por motivo (duplicado / monto distinto / no registrado)

### 5.4 Campos de datos

**`conciliacion_manual`**
| Campo | Tipo |
|---|---|
| id | UUID |
| cuenta_bancaria_id | Referencia |
| periodo | Fecha (mes) |
| saldo_inicial | Decimal |
| saldo_final | Decimal |
| ingresos_totales | Decimal |
| egresos_totales | Decimal |
| saldo_calculado_flujo_caja | Decimal |
| diferencia | Decimal |
| fecha_generado | Fecha |

**`extracto_bancario`** (uso con PDF)
| Campo | Tipo |
|---|---|
| id | UUID |
| cuenta_bancaria_id | Referencia |
| periodo | Fecha (mes) |
| archivo_url | Texto |
| fecha_carga | Fecha |
| estado_procesamiento | Enum (procesando/completado/error) |

**`movimiento_extracto`** (resultado OCR)
| Campo | Tipo |
|---|---|
| id | UUID |
| extracto_id | Referencia |
| fecha | Fecha |
| monto | Decimal |
| descripcion_original | Texto |
| tipo | Enum |
| estado_match | Enum (conciliado/pendiente/diferencia) |
| movimiento_id | Referencia (si hizo match) |

**`uso_conciliacion_pdf`** (control de límite mensual)
| Campo | Tipo |
|---|---|
| negocio_id | Referencia |
| cuenta_bancaria_id | Referencia |
| periodo | Fecha (mes) |
| veces_usado | Entero (límite: Essential 1, Professional 2) |

### 5.5 Pantallas / Dashboard

**Essential:**
- Captura de cuadre manual (formulario: saldo inicial/final, ingresos/egresos totales)
- Carga de extracto en PDF (uso limitado) + estado de procesamiento OCR
- Revisión de matching (conciliados / pendientes / resolver manual)
- Reporte de cuadre exportable

**Professional (adicional):**
- Selector multi-cuenta para conciliar en batch
- Pantalla de sugerencias de match (aceptar/rechazar)
- Reporte de discrepancias por motivo

### 5.6 Integraciones
El OCR es infraestructura interna de Nuxorb (servicio de extracción de PDF) — no cuenta como la integración API del cliente. Tiene costo variable por página/documento (ver pendientes: piloto de proveedor).

### 5.7 Consume / expone hacia otros módulos
No aplica — proceso interno de Tesorería.

---

## 6. Producto adicional (fuera de Essential / Professional)

**Conciliación con PDF ampliada:** para clientes que quieran más frecuencia o más cuentas de las incluidas en su nivel. Pricing pendiente del piloto de exactitud OCR/IA (ver `tesoreria-pendientes.md`).

---

## 7. Automatizaciones N8N asociadas

Pendiente de diseño — se define cuando se trabajen los flujos específicos (ej. automatización de lectura de archivo bancario, envío de reporte de cuadre al contador).
