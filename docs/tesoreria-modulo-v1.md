# Módulo: Tesorería
[[tesorería]]
**Versión:** 1.1
**Fecha:** 19 de julio de 2026 (v1.0) — actualizado 26 de agosto de 2026 para reflejar lo construido
**Estado:** En producción (Essential + Professional) — pendiente de pricing (ver `tesoreria-pendientes.md`)

> Esta versión documenta lo que **existe hoy en el código y la base de datos**, no solo el plan original. Donde la implementación se desvió del plan v1.0 (para bien o porque algo quedó pendiente), se marca explícitamente con ✅ **Construido** o ⏳ **Pendiente**.

---

## 1. Objetivo del módulo

Dar a negocios (emprendimientos y PyMEs) visibilidad y control sobre su flujo de caja y el estado real de sus cuentas bancarias, sin depender de otros módulos de Nuxorb, pero con capacidad de conectarse a ellos cuando existan.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Ingesta | Manual (formulario, con split en varias categorías) o plantilla .xlsx | + Automática desde archivo bancario (CSV/Excel), hasta 2 cuentas | A medida |
| Categorización | Catálogo fijo de 19 categorías (estado de resultados), no editable | Mismo catálogo base + alta libre de categorías propias (crear/renombrar/desactivar por grupo) | A medida |
| Vista de flujo de caja | Estado de resultados consolidado, filtro por día o mes (rango libre) | + Filtro por cuenta bancaria individual, comparativo mes a mes (12 meses) | A medida |
| Conciliación | Marcar movimientos como conciliados + lectura de PDF con IA (1/mes, 1 cuenta) + reporte CSV | Lectura de PDF con IA hasta 2/mes, 2 cuentas | A medida |
| Cuentas bancarias | 1 cuenta (nombre editable; banco y últimos dígitos, no) | Sin límite | A medida |
| Usuarios (además del admin de cuenta) | 1 | 3 | A medida |
| Integraciones API | 1 (definida por el cliente) | +2 adicionales (definidas por el cliente) | A medida |

**Enterprise** todavía no está desarrollado — mientras tanto se le dan los límites de Professional (lo más parecido) hasta que se defina a la medida.

---

## 3. Estándares de plataforma (aplican a todos los módulos Nuxorb, no solo Tesorería)

### 3a. Conexión inter-módulo

✅ **Construido**, con una adaptación: el proyecto usa un solo schema `public` (no un schema de Postgres por módulo), así que el estándar se implementa como dos tablas compartidas en vez de vistas:
- `expected_movements` (antes `mov_esperados`): tipo, monto, fecha_esperada, estado, modulo_origen, referencia_id, moneda
- `confirmed_movements` (antes `mov_confirmados`): mismos campos + fecha_real, treasury_movement_id

Cualquier módulo inserta en `expected_movements`; Tesorería la lee y muestra como "proyectado" en la pestaña Movimientos, con botón "Registrar como real" que crea el movimiento y lo vincula en `confirmed_movements`.

### 3b. Usuarios y permisos

✅ Construido vía `company_users`/`company_roles` (schema `nuxorb`, exclusivo del equipo Nuxorb — ver ARQUITECTURA.md). 1 admin de cuenta con acceso global; usuarios adicionales por módulo según nivel.

---

## 4. Subproceso: Flujo de caja y liquidez

### 4.1 Objetivo
Dar visibilidad clara y actualizada de entradas, salidas, utilidad neta y saldo bancario corrido, permitiendo decisiones de liquidez sin depender de otros módulos.

### 4.2 Funcionalidades Essential

- ✅ Registro manual de ingresos/egresos (popup con fecha, tipo, descripción, monto, categoría, cuenta)
- ✅ **Split de movimientos**: un mismo movimiento bancario se puede dividir en 2+ categorías (con validación de que la suma cuadre con el total) — no estaba en el plan v1.0, se agregó porque en la práctica un solo cargo bancario casi siempre mezcla conceptos (ej. una compra que es materia prima + logística)
- ✅ Plantilla descargable en **.xlsx real** (no CSV) con desplegable de categoría por fila vía data validation de Excel — reemplaza el concepto original de "template Excel/Sheets" genérico
- ✅ Sugerencia automática de categoría por patrón (motor `treasury_category_patterns`, antes `patron_categoria`) — aprende de cada movimiento guardado (sin importar el origen: manual, plantilla, banco, IA, proyectado) y sugiere categoría por descripción parecida en captura manual y en cada pantalla de revisión previa a importar
- ✅ Categorización con catálogo fijo — pero **19 categorías con estructura de estado de resultados**, no las 17 originales de "flujo de caja simple" (ver 4.4, cambió por completo)
- ✅ Estado de resultados consolidado (todas las cuentas), con **filtro de fechas libre** — día a día (rango de fechas) o mes a mes (rango de meses). El plan original hablaba de un filtro día/semana/mes; la vista semanal se quitó (el usuario pidió simplificar a solo día/mes con rango propio en cada uno)
- ✅ 1 cuenta bancaria en Essential (el plan original decía "sin límite" para ambos niveles; en la implementación Essential quedó topado a 1 cuenta, Professional sin límite — ver tabla de resumen)
- ✅ Reporte exportable (CSV) del historial completo de movimientos
- ✅ Vinculación manual de un movimiento real con un proyectado (`expected_movements`)
- ✅ Categorías sin match en el catálogo no se pierden: se agrupan bajo **"Pendiente de clasificar"**, al final del estado, arriba de Utilidad neta, y sí suman al total — antes de esto (implementación intermedia) se excluían del todo; se corrigió
- ✅ **Saldo inicial / Saldo final corridos**: fila "Saldo inicial" arriba de Ingresos y "Saldo final" abajo de Utilidad neta en el estado de resultados. Cada cuenta tiene su propio saldo inicial + fecha de referencia (capturados/editables en Cuentas); saldo_final de un periodo = saldo_inicial + ingresos − egresos, y ese saldo_final es el saldo_inicial del periodo siguiente — no estaba en el plan v1.0
- ✅ **Aviso de movimiento duplicado**: antes de guardar (manual, plantilla, banco, IA, o vincular proyectado) se avisa si ya existe un movimiento con la misma cuenta + fecha + monto exacto; no bloquea, pero exige una confirmación explícita ("guardar de todos modos") — no estaba en el plan v1.0
- ✅ **Filtros en Movimientos**: rango de fechas + cuenta (Professional), default últimos 7 días todas las cuentas, máximo 50 movimientos visibles a la vez (los más recientes; se avisa si hay más y sugiere acotar el rango) — no estaba en el plan v1.0

### 4.3 Funcionalidades Professional (incremental sobre Essential)

- ✅ Importación desde archivo bancario (CSV o Excel), hasta 2 cuentas — con mapeo de columnas genérico (fecha/concepto/monto/tipo) más que un parser por banco. Hay un punto de extensión (`bankParsers.ts`) para cuando se apruebe automatizar un banco específico a la medida
- ⏳ **Pendiente**: modo de importación configurable por cuenta ("revisión previa" vs. "directo") — hoy **siempre** pasa por la pantalla de revisión antes de guardar, no existe el modo directo sin revisión
- ✅ Categorías personalizables: tab **Categorías**, solo Professional (`limits.customCategories`) — crear categoría propia dentro de cualquiera de los 6 grupos del estado de resultados, renombrar, y desactivar/reactivar. Desactivar no borra: solo deja de ofrecerse al capturar movimientos nuevos, lo ya categorizado con ella sigue viéndose normal (no cae en "Pendiente de clasificar")
- ✅ Comparativo mes a mes — pero ampliado: muestra los **12 meses del año en curso** (no solo los últimos meses con datos), con % de variación contra el mes anterior
- ✅ Filtro por cuenta bancaria individual — pero implementado como filtro sobre el **mismo estado de resultados completo** (no una vista aparte simplificada): al elegir una cuenta, todo el estado (tarjetas, tabla, comparativo, export) se recalcula para esa cuenta

### 4.4 Catálogo de categorías

**Cambio estructural respecto al plan v1.0**: en vez de un catálogo plano de 17 categorías de "flujo de caja" con un atributo opcional de naturaleza (fijo/variable/operativo), se implementó un catálogo de **19 categorías organizado como estado de resultados**, con 6 grupos y en un orden explícito (no alfabético):

| Grupo | Categorías (en orden) |
|---|---|
| Ingresos | Ventas, Otros ingresos |
| Costo de venta | Materia prima, Nómina operativa, Costos indirectos, Logística de compra y empaque |
| Gastos de venta | Sueldos y comisiones de venta, Publicidad y marketing, Viáticos comerciales, Renta de puntos de venta |
| Gastos administrativos | Sueldos administrativos, Renta de oficinas, Servicios administrativos, Honorarios, Software y licencias, Otros gastos (papelería, seguros, etc.) |
| Gastos financieros | Intereses pagados, Comisiones bancarias |
| Impuestos | ISR y PTU |

El estado de resultados calcula 4 hitos de utilidad en cascada:

```
Total ingresos
Total costo de venta
→ UTILIDAD BRUTA
Total gastos de venta
Total gastos administrativos
→ UTILIDAD OPERATIVA
Total gastos financieros
→ UTILIDAD ANTES DE IMPUESTOS
Total impuestos
Total pendiente de clasificar (solo si hay movimientos sin categoría válida)
→ UTILIDAD NETA
```

Catálogo base idéntico para Essential y Professional. La distinción "fijo/editable" del plan v1.0 sí se implementó: Essential no tiene forma de agregar categorías propias (catálogo fijo), Professional sí vía el tab Categorías (ver 4.3).

**Arquitectura de la siembra**: el catálogo maestro vive en `nuxorb.treasury_category_templates` (propiedad exclusiva del equipo Nuxorb, el cliente nunca lo lee). Al activarse el módulo de Tesorería para una empresa (insert en `company_modules`), un trigger en el servidor copia el catálogo completo a la tabla propia de esa empresa (`treasury_categories`) — no depende de que el cliente abra la pantalla.

### 4.5 Campos de datos (tal como existen hoy en Supabase)

**`treasury_accounts`**
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID | |
| company_id | Referencia | |
| name | Texto | Editable siempre |
| bank_name | Texto | Fijo después de creada |
| last4 | Texto | Fijo después de creada |
| opening_balance | Decimal | Editable — punto de partida del saldo corrido |
| opening_balance_date | Fecha | Editable — junto con opening_balance, no estaba en el plan v1.0 |
| bank_import_enabled | Booleano | |

**`treasury_movements`** (antes `movimiento`)
| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| id | UUID | Sí | |
| company_id | Referencia | Sí | |
| account_id | Referencia | Sí | `treasury_accounts` |
| entry_date | Fecha | Sí | |
| type | Enum (ingreso/egreso) | Sí | |
| amount | Decimal | Sí | Monto total del movimiento bancario |
| concept | Texto | Sí | |
| category | Texto | Sí | Categoría "primaria" — si el movimiento tiene 2+ splits, es la del primero; sirve para pantallas que no unen contra `treasury_movement_splits` |
| source | Enum (manual/csv_import/bank_import/ai_statement/mov_confirmado) | Sí | |
| reconciled | Booleano | Sí | |
| created_by | Referencia | No | Usuario que lo capturó — antes no se guardaba, se agregó para tener log de auditoría |
| created_at | Timestamptz | Sí | |

⏳ **Pendiente / no implementado**: campo `moneda` (el plan v1.0 lo contemplaba; hoy todo es implícitamente MXN, no hay selector de moneda ni soporte multi-moneda).

**`treasury_movement_splits`** (nueva, no estaba en el plan v1.0)
| Campo | Tipo |
|---|---|
| id | UUID |
| movement_id | Referencia (`treasury_movements`) |
| category | Texto |
| amount | Decimal |

**`treasury_categories`** (catálogo por empresa)
| Campo | Tipo |
|---|---|
| id | UUID |
| company_id | Referencia |
| name | Texto |
| kind | Enum (ingreso/egreso/ambos) |
| grupo | Enum (ingreso/costo_venta/gasto_venta/gasto_administrativo/gasto_financiero/impuesto, nullable) |
| orden | Entero |
| active | Booleano (default true) — desactivar ≠ borrar, solo deja de ofrecerse al capturar; lo ya categorizado con ella sigue siendo válido |

**`treasury_category_patterns`** (antes `patron_categoria`)
| Campo | Tipo |
|---|---|
| id | UUID |
| company_id | Referencia |
| texto_patron | Texto (descripción normalizada — sin acentos/mayúsculas/puntuación) |
| category | Texto |
| frecuencia_uso | Entero — desempate cuando calzan varios patrones |
| updated_at | Timestamptz |

⏳ **Pendiente / no implementado**: `configuracion_cuenta_bancaria` con `modo_importacion` — lo más parecido que existe es el booleano `treasury_accounts.bank_import_enabled`, pero no hay modo "directo sin revisión".

### 4.6 Pantallas / Dashboard (tal como existen)

**Essential:**
- Tab **Resumen**: estado de resultados completo (categorías como filas, fechas como columnas — con filtro de rango día/mes —, columnas de extremos Categoría y Total fijas, scroll horizontal propio incluyendo arrastrar con clic para desplazarse), filas Saldo inicial/Saldo final, aviso de movimientos con categoría no reconocida, botón de reporte CSV. La tarjeta de resumen Entradas/Salidas/Disponible que hubo en una versión intermedia se quitó — el propio estado de resultados y el saldo corrido ya cubren esa información
- Tab **Movimientos**: alta manual (con split y sugerencia de categoría por patrón mientras se escribe la descripción), filtros por rango de fechas y cuenta (default últimos 7 días, máx. 50 visibles), lista de movimientos (marca los que tienen categoría no reconocida y permite corregirla ahí mismo), descarga/carga de plantilla .xlsx, lista de proyectados pendientes de vincular
- Tab **Conciliación**: marcar movimientos como conciliados, subir PDF (lectura con IA, no OCR tradicional) con matching automático contra lo ya capturado, pantalla de revisión/split previa a guardar, reporte CSV

**Professional (adicional):**
- Tab **Cuentas**: alta de cuenta (nombre, banco, últimos 4 dígitos, saldo inicial + fecha — banco y dígitos no editables después de creada; nombre y saldo inicial sí), activar importación bancaria por cuenta, importar archivo
- Tab **Categorías**: alta libre de categorías propias por grupo del estado de resultados, renombrar, desactivar/reactivar
- Selector de cuenta bancaria en el tab Resumen y en el filtro de Movimientos
- Sección "Comparativo mes a mes" (12 meses del año, con %)

### 4.7 Integraciones API
Sin cambios respecto al plan — pendiente de definir con cada cliente.

### 4.8 Consume / expone hacia otros módulos
✅ Construido tal como se planeó (ver 3a) — **Consume** `expected_movements`, **expone** `confirmed_movements`.

---

## 5. Subproceso: Conciliación bancaria

### 5.1 Objetivo
Verificar que el saldo registrado en Flujo de caja coincide con el extracto bancario oficial. Es un proceso interno (banco vs. libros) — no participa del estándar de conexión inter-módulo.

**Cambio importante respecto al plan v1.0**: el saldo formal (inicial/final/diferencia) no vive aquí — se resolvió en el subproceso de Flujo de caja (sección 4, filas Saldo inicial/Saldo final del estado de resultados, con fecha de saldo inicial por cuenta) en vez de en Conciliación. El matching automático y el reporte de discrepancias sí se construyeron, con un alcance más simple que "OCR + reglas de negocio" del plan original (usa el mismo motor de IA de extracción, no un sistema de matching aparte). Lo que existe:

### 5.2 Funcionalidades Essential (tal como se construyeron)

- ✅ Marcar movimientos individuales como conciliados (checkbox)
- ✅ Reporte exportable en CSV (no PDF/Excel con formato)
- ✅ Lectura de PDF con IA (no OCR clásico) — 1 al mes, 1 cuenta. La IA propone una lista de transacciones (fecha, concepto, monto, tipo)
- ✅ **Matching automático contra movimientos ya existentes** (`reconciliationMatch.ts`): cada transacción propuesta se compara contra los movimientos ya capturados en esa cuenta —
  - **Conciliado**: fecha y monto exactos → se marca el movimiento existente como conciliado, no se crea uno nuevo.
  - **Diferencia (fecha o monto)**: mismo monto en una ventana de ~3 días, o misma fecha con monto distinto → se marca como posible discrepancia; por default se registra como nuevo (más seguro), con opción de vincularlo al existente a mano.
  - **No registrado**: nada parecido → se captura como movimiento nuevo (categoría/split como siempre).

### 5.3 Funcionalidades Professional (incremental)

- ✅ Lectura de PDF con IA hasta 2 veces al mes, en hasta 2 cuentas
- ✅ **Reporte de discrepancias por motivo**: resumen en pantalla (N conciliados / M con diferencia / K nuevos) + exportable en CSV cuando hay al menos una diferencia, con el motivo y el movimiento existente contra el que hizo match
- ⏳ **Pendiente**: selector multi-cuenta para conciliar varias cuentas en un solo lote (hoy cada conciliación es de una cuenta a la vez, aunque el cupo mensual sí es por cuenta)

### 5.4 Campos de datos

Las tablas `conciliacion_manual`, `extracto_bancario`, `movimiento_extracto` y `uso_conciliacion_pdf` del plan v1.0 **no existen**. En su lugar:

**`treasury_statement_imports`** (registro de cada conciliación/importación)
| Campo | Tipo |
|---|---|
| id | UUID |
| company_id | Referencia |
| account_id | Referencia |
| period_month | Fecha (mes) — usado para contar el cupo mensual por plan |
| method | Enum (manual/ai) |
| file_name | Texto |
| status | Enum (uploaded/reviewed) |
| extracted_count | Entero |
| created_by | Referencia |

No hay tabla de control de cupo separada (`uso_conciliacion_pdf`) — el cupo se calcula contando filas de `treasury_statement_imports` del mes en curso directamente.

### 5.5 Pantallas / Dashboard

**Essential:**
- Carga de PDF + lectura con IA, con pantalla de revisión (categorizar o dividir cada transacción propuesta) antes de confirmar
- Lista de movimientos con checkbox de conciliado
- Reporte CSV exportable

**Professional (adicional):**
- Mismo flujo, con cupo mensual más alto (2 veces, 2 cuentas)

⏳ **Pendiente**: selector multi-cuenta para conciliar varias cuentas en batch (ver 5.3).

### 5.6 Integraciones
La lectura de PDF usa un modelo de IA vía función edge (`parse-bank-statement`), no un servicio de OCR tradicional como contemplaba el plan v1.0. Tiene costo variable por documento (ver pendientes: piloto de exactitud).

### 5.7 Consume / expone hacia otros módulos
No aplica — proceso interno de Tesorería.

---

## 6. Producto adicional (fuera de Essential / Professional)

**Conciliación con PDF ampliada:** para clientes que quieran más frecuencia o más cuentas de las incluidas en su nivel. Pricing pendiente del piloto de exactitud IA (ver `tesoreria-pendientes.md`).

---

## 7. Automatizaciones N8N asociadas

Pendiente de diseño — se define cuando se trabajen los flujos específicos (ej. automatización de lectura de archivo bancario, envío de reporte de cuadre al contador).
