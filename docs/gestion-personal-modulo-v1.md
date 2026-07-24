# Módulo: Gestión de Personal
[[gestion de personal]]
**Versión:** 0.1 (borrador para validación)
**Fecha:** 19 de julio de 2026
**Estado:** Alcance definido — pendiente de pricing y validación fiscal (ver `gestion-personal-pendientes.md`)
**Nota de alcance:** NO incluye timbrado de nómina (CFDI). El timbrado lo realiza el contador del cliente con su PAC. El sistema entrega prenómina calculada, recibo interno y layout de dispersión.

---

## 1. Objetivo del módulo

Dar a negocios de 11-50 empleados el control del ciclo completo de su personal: expediente, incidencias, cálculo de nómina y prestaciones de ley, generando el egreso proyectado hacia Tesorería — sin depender de otros módulos, pero conectándose a ellos cuando existan.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Expediente | Básico (datos, sueldo, contrato, documentos) | + Alertas de vencimiento de contrato, historial de sueldo, departamentos | A medida |
| Incidencias | Captura manual (formulario) o template Excel/Sheets | + Importación de archivo de checador + reglas automáticas configurables | A medida |
| Cálculo de nómina | Nómina ordinaria: sueldo fijo, ISR, IMSS obrero, descuento por faltas, deducciones fijas capturadas | + Horas extra, prima dominical, aguinaldo, prima vacacional, finiquitos y liquidaciones | A medida |
| Periodicidades | Semanal / Catorcenal / Quincenal | Igual | A medida |
| Vacaciones | Saldo automático según LFT + registro de días gozados | + Solicitud/aprobación en sistema | A medida |
| Dashboard | Costo de nómina consolidado por periodo | + Comparativo periodo a periodo, desglose por departamento, ausentismo y rotación | A medida |
| Empleados activos | Límite pendiente (pricing) | Límite pendiente (pricing) | A medida |
| Usuarios (además del admin de cuenta) | 1 | 3 | A medida |
| Integraciones API | 1 (definida por el cliente) | +2 adicionales | A medida |

**Enterprise** incluye todo Professional + funcionalidades a medida (ej. pago por destajo/producción, turnos rotativos complejos, PTU). Alcance y precio caso por caso.

**Decisión de diseño:** un solo módulo para manufactura y servicios. Las variantes de manufactura (destajo, turnos) se atienden vía Enterprise hasta que exista demanda recurrente que justifique estandarizarlas como producto adicional.

---

## 3. Estándares de plataforma

Aplican los definidos en `tesoreria-modulo.md` sección 3 (conexión inter-módulo vía vistas `mov_esperados` / `mov_confirmados`, esquema de usuarios y permisos).

---

## 4. Subproceso: Expediente del empleado

### 4.1 Objetivo
Centralizar la información del personal y su ciclo de vida (alta → cambios → baja), como base para incidencias y nómina.

### 4.2 Funcionalidades Essential
- Alta de empleado: datos personales, RFC, CURP, NSS, fecha de ingreso, tipo de contrato, sueldo (diario y por periodo), periodicidad de pago, cuenta bancaria de depósito
- Carga de documentos adjuntos (contrato, identificación, comprobantes)
- Baja con fecha y motivo (renuncia / despido / término de contrato) — dispara finiquito solo en Professional
- Template Excel/Sheets para alta masiva inicial (mismo patrón que Tesorería)

### 4.3 Funcionalidades Professional (incremental)
- Departamentos/áreas (catálogo editable) y asignación de empleados
- Historial de cambios de sueldo con fecha efectiva
- Alertas de vencimiento de contratos determinados y fin de periodo de prueba

### 4.4 Campos de datos — `empleado`

| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| nombre_completo | Texto | Sí |
| rfc / curp / nss | Texto | Sí |
| fecha_ingreso | Fecha | Sí |
| tipo_contrato | Enum (indeterminado/determinado/prueba) | Sí |
| fecha_fin_contrato | Fecha | Solo determinado/prueba |
| sueldo_diario | Decimal | Sí |
| periodicidad_pago | Enum (semanal/catorcenal/quincenal) | Sí |
| departamento_id | Referencia | No (Professional) |
| cuenta_deposito | Texto (CLABE) | No |
| estado | Enum (activo/baja) | Sí |
| fecha_baja / motivo_baja | Fecha / Enum | Solo en baja |

Tablas auxiliares: `documento_empleado`, `historial_sueldo` (Professional), `departamento` (Professional).

---

## 5. Subproceso: Incidencias y tiempo

### 5.1 Objetivo
Registrar todo lo que modifica la nómina de un periodo: faltas, retardos, horas extra, permisos, incapacidades y vacaciones.

### 5.2 Funcionalidades Essential
- Captura manual de incidencias por empleado y fecha
- Template Excel/Sheets de incidencias por periodo (carga con preview, mismo patrón que Tesorería)
- Saldo de vacaciones automático según tabla LFT vigente (reforma 2023: 12 días el primer año) + registro de días gozados
- Las incidencias del periodo alimentan directamente el cálculo de nómina

### 5.3 Funcionalidades Professional (incremental)
- Importación de archivo de checador (Excel/CSV exportado del reloj) con matching por empleado
- Reglas automáticas configurables (ej. N retardos = 1 falta; tolerancia de minutos)
- Flujo de solicitud/aprobación de vacaciones y permisos dentro del sistema
- Registro de horas extra con clasificación automática dobles/triples según LFT

### 5.4 Campos de datos — `incidencia`

| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| empleado_id | Referencia | Sí |
| tipo | Enum (falta/retardo/hora_extra/permiso_con_goce/permiso_sin_goce/incapacidad/vacaciones/prima_dominical) | Sí |
| fecha | Fecha | Sí |
| horas | Decimal | Solo hora_extra |
| folio_incapacidad | Texto | Solo incapacidad |
| origen | Enum (manual/template/checador) | Sí |
| estado | Enum (registrada/aplicada_en_nomina) | Sí |

Tabla auxiliar: `saldo_vacaciones` (empleado, aniversario, días de derecho, gozados, disponibles).

---

## 6. Subproceso: Cálculo de nómina (prenómina)

### 6.1 Objetivo
Calcular la nómina de cada periodo con percepciones, deducciones y neto a pagar, generar recibo interno y layout de dispersión. Sin timbrado.

### 6.2 Motor de cálculo (infraestructura interna Nuxorb)
- Tablas ISR por periodicidad (Art. 96 LISR) + subsidio al empleo, UMA y salario mínimo vigentes — mantenidas centralmente por Nuxorb, actualización anual y por eventos extraordinarios. No son editables por el cliente.
- Cálculo catorcenal: método por definir y validar con contador aliado (práctica común: tabla diaria × 14) — ver pendientes.
- Cuota obrera IMSS para la deducción del trabajador (la parte patronal se muestra como costo informativo, no como deducción).

### 6.3 Funcionalidades Essential
- Ciclo del periodo: abrir periodo → incidencias aplicadas automáticamente → prenómina calculada → revisión/ajuste → cierre
- Percepciones: sueldo del periodo (con descuento por faltas y permisos sin goce)
- Percepciones variables capturadas (monto por empleado por periodo): bono, comisión, propinas repartidas por el patrón — el motor las trata como gravables; las propinas en efectivo directo al empleado no pasan por el sistema
- Deducciones calculadas: ISR, IMSS obrero
- Deducciones capturadas (monto fijo por empleado, sin cálculo): crédito INFONAVIT (según aviso de retención), pensión alimenticia, préstamos/otros
- Recibo interno por empleado (PDF) + resumen del periodo exportable (PDF/Excel) para el contador
- Layout de dispersión bancaria (Excel/CSV genérico)
- Al cerrar el periodo se publica el egreso proyectado hacia Tesorería (ver sección 8)

### 6.4 Funcionalidades Professional (incremental)
- Horas extra (dobles/triples) y prima dominical desde incidencias
- Aguinaldo y prima vacacional: cálculo automático (completo y proporcional)
- **Finiquitos y liquidaciones:** al registrar una baja, cálculo de partes proporcionales (aguinaldo, vacaciones no gozadas, prima vacacional) y, en caso de despido, indemnización de 3 meses + 20 días por año + prima de antigüedad, con tratamiento de ISR por separación (exención por años de servicio). Genera documento de finiquito exportable.
- Costo patronal informativo por empleado (IMSS patronal aproximado) en dashboard

### 6.5 Campos de datos

**`periodo_nomina`**: id, periodicidad, fecha_inicio, fecha_fin, fecha_pago, estado (abierto/calculado/cerrado).

**`recibo_nomina`**: id, periodo_id, empleado_id, total_percepciones, total_deducciones, neto, estado.

**`recibo_detalle`**: id, recibo_id, concepto_id, tipo (percepción/deducción), monto, origen (calculado/capturado/incidencia).

**`concepto_nomina`** (catálogo fijo en Essential, extensible en Professional): sueldo, bono, comisión, propinas, horas extra dobles, horas extra triples, prima dominical, aguinaldo, prima vacacional, ISR, IMSS obrero, INFONAVIT, pensión alimenticia, préstamo, otros.

Cada concepto tiene el atributo `integra_sbc` (sí/no): define si integra el salario base de cotización IMSS. Es atributo del catálogo (mismo patrón que la "naturaleza" en Tesorería) — el usuario no lo decide por movimiento. Los valores por concepto se validan con el contador aliado (ver pendientes; las propinas son el caso más sensible).

**`finiquito`** (Professional): id, empleado_id, tipo (finiquito/liquidación), desglose de conceptos, isr_separacion, neto, fecha.

**`tabla_fiscal`** (interna Nuxorb): tipo (ISR/subsidio/UMA/SM/cuotas IMSS), periodicidad, vigencia_desde, vigencia_hasta, contenido JSON.

### 6.6 Pantallas / Dashboard

**Essential:** listado de periodos; prenómina del periodo (grid empleado × conceptos, editable en revisión); recibo individual; exportables (resumen contador, layout dispersión); dashboard de costo de nómina consolidado.

**Professional (adicional):** pantalla de finiquito por baja; dashboard comparativo periodo a periodo; desglose por departamento; indicadores de ausentismo y rotación; costo patronal informativo.

---

## 7. Productos adicionales relacionados

Los productos adicionales se documentan por separado en `productos-adicionales.md` (contratación independiente del módulo). Relacionados con este módulo: **Checador básico**, **PTU** y **Portal del empleado**.

---

## 8. Consume / expone hacia otros módulos

- **Expone `mov_esperados`:** al cerrar un periodo de nómina (o un finiquito), se publica un egreso proyectado con tipo=egreso, monto=neto total, fecha_esperada=fecha_pago, modulo_origen=gestion_personal. En Tesorería aparece como movimiento proyectado (categoría Nómina).
- **Expone `mov_confirmados`:** cuando en Tesorería se vincula el pago real con el proyectado.
- **Consume:** nada por ahora.

---

## 9. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: recordatorio de cierre de periodo, envío automático del resumen al contador, alerta de vencimiento de contratos, recordatorio de fecha de pago hacia el responsable de dispersión.
