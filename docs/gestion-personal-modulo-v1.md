# Módulo: Gestión de Personal
[[gestion de personal]]
**Versión:** 0.2 (construido — ver notas de cambio)
**Fecha:** 19 de julio de 2026 (v0.1) — actualizado 7 de agosto de 2026 (v0.2, cierre de gaps post-construcción)
**Estado:** Construido y en producción (Essential + Professional). Pendiente: validación fiscal completa con el contador aliado (ver sección "Pendiente para V2").
**Nota de alcance:** NO incluye timbrado de nómina (CFDI). El timbrado lo realiza el contador del cliente con su PAC. El sistema entrega prenómina calculada, recibo interno y layout de dispersión.

---

**Cambios de alcance respecto a v0.1 (decisiones tomadas al cerrar el módulo, agosto 2026):**

Este módulo se construyó junto con Ventas y CxC (commit `cd86a22`) pero el doc nunca se actualizó a lo realmente construido, a diferencia de Tesorería/Compras. Esta versión cierra esa brecha y además resuelve los gaps encontrados en la auditoría contra lo prometido:

- **Carga de documentos del expediente (Essential) — ahora funcional.** La tabla no tenía dónde guardar el archivo (solo nombre/tipo). Se agregó `storage_path` + bucket privado de Supabase Storage (`hr-employee-documents`, RLS por `company_id` vía el primer segmento del path) y la UI de subida/descarga en la ficha del empleado.
- **`saldo_vacaciones` conectado.** Antes se hacía fetch de la tabla pero nunca se mostraba ni se escribía. Ahora se inicializa perezosamente (al abrir la ficha del empleado, o al registrar/aprobar una incidencia de vacaciones — no hay infraestructura de jobs programados en el proyecto, así que en vez de un trigger anual la fila del aniversario en curso se asegura bajo demanda) y `dias_gozados` se incrementa en +1 por cada incidencia de vacaciones creada (Essential, sin aprobación) o aprobada (Professional).
- **Límite de "empleados activos" implementado:** Essential 15, Professional 50 (el doc lo dejaba "pendiente de pricing" — números de arranque definidos por el negocio, ajustables en `personal/limits.ts`). Se bloquea tanto el alta manual como la carga masiva CSV al llegar al tope.
- **"Usuarios adicionales" (1/3) — resuelto, pero no en este módulo.** Es un mecanismo de plataforma genérico (`company_modules.seats` + `CompanyUsersRoles.tsx`), no algo que cada módulo tenga que construir por separado.
- **Horas extra triples implementadas** — antes todo pagaba doble aunque el catálogo ya traía sembrado el concepto `horas_extra_triples`. Ahora se agrupan las horas extra por semana natural (lunes-domingo) dentro del periodo: primeras 9 horas de la semana a doble, el resto a triple (LFT Art. 66-68) — aproximación razonable, no sustituye el conteo oficial si el periodo no calza semana por semana (ej. quincenal).
- **Regla "N retardos = 1 falta" (Professional) implementada** — configurable por empresa (`hr_settings.retardos_por_falta`, 0 = apagada), aplicada al calcular la prenómina.
- **Subsidio al empleo agregado al cálculo de ISR** — el motor no lo aplicaba en absoluto, lo que sobre-retenía a empleados de ingresos bajos. Ahora se resta del ISR causado (nunca deja el ISR a retener en negativo), usando el crédito mensual fijo vigente desde el Decreto DOF 1-may-2024.
- **UMA actualizada a 2026** ($117.31 diaria, vigente desde 1-feb-2026, DOF 9-ene-2026). La tarifa ISR mensual (Art. 96 LISR) **sigue con los valores de referencia 2024** — las fuentes públicas consultadas para actualizarla a 2026 dieron cifras inconsistentes entre sí (cuotas fijas por debajo de las de 2024 en los últimos tramos, no plausible en una tabla indexada a inflación), así que se prefirió no sembrar un dato fiscal de baja confianza. Sigue pendiente de validar/actualizar con el contador aliado contra el Anexo 8 oficial del DOF.
- **Costo patronal informativo** se queda como estaba: un multiplicador fijo aproximado (24.97%) sobre el neto del periodo, sin desglose por empleado ni fórmula real de cuotas patronales IMSS por rama de riesgo — ver "Pendiente para V2".
- **Dashboard comparativo de Professional (§6.6) no se construyó** — el flag `dashboardComparativo` en `limits.ts` existe pero no se usa en ningún lado todavía; el dashboard se ve igual en Essential y Professional (solo costo de nómina consolidado). Ver "Pendiente para V2".

---

## 1. Objetivo del módulo

Dar a negocios de 11-50 empleados el control del ciclo completo de su personal: expediente, incidencias, cálculo de nómina y prestaciones de ley, generando el egreso proyectado hacia Tesorería — sin depender de otros módulos, pero conectándose a ellos cuando existan.

---

## 2. Resumen por nivel

| | **Essential** | **Professional** | **Enterprise** |
|---|---|---|---|
| Expediente | ✅ Básico (datos, sueldo, contrato, documentos con carga real) | + ✅ Alertas de vencimiento de contrato, historial de sueldo, departamentos | A medida |
| Incidencias | ✅ Captura manual (formulario) o template CSV | + ✅ Importación de archivo de checador (mismo importador CSV genérico, sin parsing específico) + ✅ regla configurable "N retardos = 1 falta" | A medida |
| Cálculo de nómina | ✅ Nómina ordinaria: sueldo fijo, ISR (con subsidio al empleo), IMSS obrero, descuento por faltas, deducciones fijas capturadas | + ✅ Horas extra dobles/triples, prima dominical, aguinaldo, prima vacacional, finiquitos y liquidaciones | A medida |
| Periodicidades | ✅ Semanal / Catorcenal / Quincenal | Igual | A medida |
| Vacaciones | ✅ Saldo automático según LFT (conectado a `saldo_vacaciones`) + registro de días gozados | + ⏳ Solicitud/aprobación en sistema (construido) | A medida |
| Dashboard | ✅ Costo de nómina consolidado por periodo | ⏳ Comparativo periodo a periodo, desglose por departamento, ausentismo y rotación — **no construido, ver Pendiente V2** | A medida |
| Empleados activos | ✅ 15 | ✅ 50 | A medida |
| Usuarios (además del admin de cuenta) | ✅ 1 (mecanismo de plataforma, `company_modules.seats`) | ✅ 3 | A medida |
| Integraciones API | ⏳ 1 (definida por el cliente) — sin construir | ⏳ +2 adicionales — sin construir | A medida |

**Enterprise** incluye todo Professional + funcionalidades a medida (ej. pago por destajo/producción, turnos rotativos complejos, PTU). Alcance y precio caso por caso.

**Decisión de diseño:** un solo módulo para manufactura y servicios. Las variantes de manufactura (destajo, turnos) se atienden vía Enterprise hasta que exista demanda recurrente que justifique estandarizarlas como producto adicional.

---

## 3. Estándares de plataforma

✅ **Construido**, con la adaptación ya documentada en `tesoreria-modulo-v1.md` sección 3a (el proyecto usa un solo schema `public`, así que el estándar de conexión inter-módulo se implementa como dos tablas compartidas: `expected_movements`/`confirmed_movements`, antes `mov_esperados`/`mov_confirmados`). A diferencia de Compras (que abandonó este puente), **Personal lo sigue usando tal cual** — ver sección 8.

---

## 4. Subproceso: Expediente del empleado

### 4.1 Objetivo
Centralizar la información del personal y su ciclo de vida (alta → cambios → baja), como base para incidencias y nómina.

### 4.2 Funcionalidades Essential
- ✅ Alta de empleado: datos personales, RFC, CURP, NSS, fecha de ingreso, tipo de contrato, sueldo (diario y por periodo), periodicidad de pago, cuenta bancaria de depósito. *(RFC/CURP/NSS son opcionales en la implementación — el doc los marcaba obligatorios, pero ni la BD ni el formulario los exigen.)*
- ✅ **Carga de documentos adjuntos** (contrato, identificación, comprobantes) — Supabase Storage privado, un archivo por subida, listado con descarga vía URL firmada.
- ✅ Baja con fecha y motivo (renuncia / despido / término de contrato) — dispara finiquito solo en Professional
- ⏳ Template Excel/Sheets para alta masiva inicial — **implementado como CSV**, no Excel/Sheets real (mismo patrón que el resto del módulo)

### 4.3 Funcionalidades Professional (incremental)
- ✅ Departamentos/áreas (catálogo editable) y asignación de empleados — **tabla compartida con Compras y Proveedores** (`departments`), no exclusiva de Personal, decisión tomada en la migración 0017.
- ✅ Historial de cambios de sueldo con fecha efectiva
- ⏳ Alertas de vencimiento de contratos determinados — construido. **Alerta distinta para fin de periodo de prueba: no construida** (un contrato `prueba` con `fecha_fin_contrato` usa la misma etiqueta genérica que uno `determinado`).

### 4.4 Campos de datos — `empleado` (tabla `hr_employees`)

| Campo | Tipo | Obligatorio |
|---|---|---|
| id | UUID | Sí |
| nombre_completo | Texto | Sí |
| rfc / curp / nss | Texto | No (implementación — el doc los pedía obligatorios) |
| fecha_ingreso | Fecha | Sí |
| tipo_contrato | Enum (indeterminado/determinado/prueba) | Sí |
| fecha_fin_contrato | Fecha | Solo determinado/prueba |
| sueldo_diario | Decimal | Sí |
| periodicidad_pago | Enum (semanal/catorcenal/quincenal) | Sí |
| departamento_id | Referencia (tabla compartida `departments`) | No (Professional) |
| cuenta_deposito | Texto (CLABE) | No |
| estado | Enum (activo/baja) | Sí |
| fecha_baja / motivo_baja | Fecha / Enum | Solo en baja |

Tablas auxiliares: `documento_empleado`/`hr_employee_documents` (id, empleado_id, nombre, tipo, **storage_path**, created_at), `historial_sueldo`/`hr_salary_history` (Professional), `departments` (Professional, compartida con Compras).

---

## 5. Subproceso: Incidencias y tiempo

### 5.1 Objetivo
Registrar todo lo que modifica la nómina de un periodo: faltas, retardos, horas extra, permisos, incapacidades y vacaciones.

### 5.2 Funcionalidades Essential
- ✅ Captura manual de incidencias por empleado y fecha
- ⏳ Template Excel/Sheets de incidencias por periodo — **CSV**, matching por nombre de empleado (texto, no ID — frágil si dos empleados comparten nombre)
- ✅ Saldo de vacaciones automático según tabla LFT vigente (reforma 2023: 12 días el primer año) + **registro de días gozados** (ahora persistido en `hr_vacation_balances`, ver sección 7 de esta versión)
- ✅ Las incidencias del periodo alimentan directamente el cálculo de nómina — *solo `falta` y `permiso_sin_goce` reducen el sueldo del periodo; `retardo` (salvo por la regla configurable de conversión), `permiso_con_goce` e `incapacidad` no tienen efecto en el pago — no está detallado por tipo en el MD original, es una interpretación de construcción.*

### 5.3 Funcionalidades Professional (incremental)
- ⏳ Importación de archivo de checador (Excel/CSV exportado del reloj) con matching por empleado — construido, pero es **el mismo importador CSV genérico** que la plantilla manual (sin parsing específico de formato de reloj checador).
- ✅ **Reglas automáticas configurables: N retardos = 1 falta** — construido (`hr_settings.retardos_por_falta`, pantalla "Reglas de retardos"). *Tolerancia de minutos: no construida.*
- ✅ Flujo de solicitud/aprobación de vacaciones y permisos dentro del sistema
- ✅ Registro de horas extra con clasificación automática dobles/triples según LFT (agrupado por semana natural dentro del periodo)

### 5.4 Campos de datos — `incidencia` (tabla `hr_incidents`)

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
| created_by | Referencia | Sí (agregado en migración 0014, no estaba en el MD original — necesario para la regla de que quien registra no puede autoaprobarse) |
| aprobado_por | Referencia | Solo si requiere aprobación |

Tabla auxiliar: `saldo_vacaciones`/`hr_vacation_balances` (empleado_id, aniversario, dias_derecho, dias_gozados) — **unique(empleado_id, aniversario)**, una fila por año de antigüedad cumplido. Se asegura de forma perezosa (no hay jobs programados en el proyecto): al abrir la ficha del empleado, o al registrar/aprobar una incidencia de vacaciones.

Configuración nueva: `hr_settings` (company_id, retardos_por_falta) — primer uso de una tabla de configuración por empresa en este módulo.

---

## 6. Subproceso: Cálculo de nómina (prenómina)

### 6.1 Objetivo
Calcular la nómina de cada periodo con percepciones, deducciones y neto a pagar, generar recibo interno y layout de dispersión. Sin timbrado.

### 6.2 Motor de cálculo (infraestructura interna Nuxorb)
- ✅ Tablas ISR por periodicidad, subsidio al empleo, UMA y salario mínimo vigentes — mantenidas centralmente por Nuxorb (`tabla_fiscal`/`hr_tax_tables`), no editables por el cliente. **Matiz respecto al plan:** no hay una tabla ISR por periodicidad — existe una sola tabla mensual, prorrateada a cada periodicidad por `dias/30.4` (incluyendo catorcenal, no "tabla diaria × 14" como se especuló originalmente). **Salario mínimo (SM): no se siembra ni se usa en ningún cálculo** — ver Pendiente V2.
- ✅ **Subsidio al empleo agregado** (v0.2) — crédito mensual fijo (Decreto DOF 1-may-2024, indexado a UMA), aplicable si el ingreso gravable del periodo no excede el límite; se resta del ISR causado sin dejarlo negativo.
- Cálculo catorcenal: prorrateo de la tabla mensual — **sigue sin validar con el contador aliado**, ver pendientes.
- Cuota obrera IMSS para la deducción del trabajador (la parte patronal se muestra como costo informativo aproximado, no como fórmula real por rama de riesgo — ver Pendiente V2).

### 6.3 Funcionalidades Essential
- ✅ Ciclo del periodo: abrir periodo → incidencias aplicadas automáticamente → prenómina calculada → revisión/ajuste → cierre
- ✅ Percepciones: sueldo del periodo (con descuento por faltas y permisos sin goce, incluyendo faltas derivadas de la regla de retardos en Professional)
- ✅ Percepciones variables capturadas (monto por empleado por periodo): bono, comisión, propinas repartidas por el patrón — el motor las trata como gravables; las propinas en efectivo directo al empleado no pasan por el sistema
- ✅ Deducciones calculadas: ISR (con subsidio al empleo), IMSS obrero
- ✅ Deducciones capturadas (monto fijo por empleado, sin cálculo): crédito INFONAVIT (según aviso de retención), pensión alimenticia, préstamos/otros
- ⏳ Recibo interno por empleado — construido como vista de impresión del navegador (`window.print()`), no un PDF generado/almacenado. Resumen del periodo exportable (PDF/Excel) para el contador — **no construido**, ver Pendiente V2.
- ✅ Layout de dispersión bancaria — CSV genérico (Empleado, Cuenta, Neto), no un layout bancario configurable
- ✅ Al cerrar el periodo se publica el egreso proyectado hacia Tesorería (ver sección 8)

### 6.4 Funcionalidades Professional (incremental)
- ✅ Horas extra (dobles/triples, agrupadas por semana natural) y prima dominical desde incidencias
- ✅ Aguinaldo y prima vacacional — **cálculo correcto, pero no automático**: se activan con un checkbox manual por empleado por periodo, el sistema no determina por sí solo cuándo aplican (ej. diciembre para aguinaldo).
- ✅ **Finiquitos y liquidaciones:** al registrar una baja, cálculo de partes proporcionales (aguinaldo, vacaciones no gozadas, prima vacacional) y, en caso de despido, indemnización de 3 meses + 20 días por año + prima de antigüedad, con tratamiento de ISR por separación (exención Art. 93-XIII). ⏳ Documento de finiquito exportable: **no construido** — solo se guarda el registro, sin PDF.
- ⏳ Costo patronal informativo por empleado (IMSS patronal aproximado) en dashboard — construido como **un multiplicador fijo (24.97%) sobre el total del periodo**, no por empleado ni con fórmula real por rama de riesgo. Ver Pendiente V2.

### 6.5 Campos de datos

**`periodo_nomina`/`hr_payroll_periods`**: id, periodicidad, fecha_inicio, fecha_fin, fecha_pago, estado (abierto/calculado/cerrado).

**`recibo_nomina`/`hr_payroll_receipts`**: id, periodo_id, empleado_id, total_percepciones, total_deducciones, neto, estado.

**`recibo_detalle`/`hr_payroll_receipt_items`**: id, recibo_id, concepto_id, tipo (percepción/deducción), monto, origen (calculado/capturado/incidencia).

**`concepto_nomina`/`hr_payroll_concepts`** (catálogo fijo, idéntico en Essential y Professional — el MD decía "extensible en Professional" pero no hay demanda todavía de conceptos personalizados): sueldo, bono, comisión, propinas, horas extra dobles, horas extra triples, prima dominical, aguinaldo, prima vacacional, ISR, IMSS obrero, INFONAVIT, pensión alimenticia, préstamo, otros.

Cada concepto tiene el atributo `integra_sbc` (sí/no). Los valores por concepto **siguen sin validarse con el contador aliado** (las propinas son el caso más sensible — hoy se tratan como gravables, igual que sueldo/bono/comisión).

**`finiquito`/`hr_severances`** (Professional): id, empleado_id, tipo (finiquito/liquidación), desglose de conceptos, isr_separacion, neto, fecha.

**`tabla_fiscal`/`hr_tax_tables`** (interna Nuxorb): tipo (**isr_mensual/uma/imss_obrero/subsidio_empleo** — se agregó `subsidio_empleo` en v0.2; **falta `sm` (salario mínimo)**, nunca sembrado ni usado), periodicidad, vigencia_desde, vigencia_hasta, contenido JSON. Admite varias filas de vigencia por tipo — el motor siempre toma la más reciente por `vigencia_desde`, así que actualizar un valor es insertar una fila nueva, no editar la vieja.

### 6.6 Pantallas / Dashboard

**Essential:** listado de periodos; prenómina del periodo (grid empleado × conceptos, editable en revisión); recibo individual (vista de impresión); exportables (dispersión CSV); dashboard de costo de nómina consolidado.

**Professional (adicional):** pantalla de finiquito por baja (sin export PDF); ⏳ dashboard comparativo periodo a periodo, desglose por departamento, indicadores de ausentismo y rotación — **no construido** (el flag `dashboardComparativo` existe en `limits.ts` pero no se lee en ningún componente); costo patronal informativo (aproximado, no por empleado).

---

## 7. Productos adicionales relacionados

Los productos adicionales se documentan por separado en `productos-adicionales.md` (contratación independiente del módulo). Relacionados con este módulo: **Checador básico**, **PTU** y **Portal del empleado** — los tres siguen sin construirse; solo existen como entradas del catálogo de addons (`CompanyAddon`) y como el "camino ya abierto" `origen=checador` en el importador de incidencias.

---

## 8. Consume / expone hacia otros módulos

- ✅ **Expone `mov_esperados`/`expected_movements`:** al cerrar un periodo de nómina (o un finiquito), se publica un egreso proyectado con tipo=egreso, monto=neto total, fecha_esperada=fecha_pago, modulo_origen=personal. En Tesorería aparece como movimiento proyectado (categoría Nómina). **A diferencia de Compras (que abandonó este puente por el mismo defecto que se documenta en `compras-proveedores-modulo-v1.md` §8) y de Ventas (que lo reemplazó en v0.2 por un match directo, ver `ventas-cxc-modulo-V1.md`), Personal lo sigue usando tal cual** — es un caso de uso más simple (un solo egreso agregado por periodo, no cuentas por cobrar/pagar individuales) donde el defecto original (el resultado de conciliar no regresa al módulo de origen) importa menos: no hay un "estado de pago" por empleado que dependa de ese regreso.
- **Consume:** nada por ahora.

---

## 9. Automatizaciones N8N asociadas

Pendiente de diseño. Candidatos: recordatorio de cierre de periodo, envío automático del resumen al contador, alerta de vencimiento de contratos, recordatorio de fecha de pago hacia el responsable de dispersión.

---

## 10. Pendiente para V2

Explícitamente pospuesto tras el cierre de agosto 2026 — no es que se haya intentado y quedó a medias, es una decisión de quedarse ahí por ahora:

- **Tarifa ISR mensual (Art. 96 LISR) sin actualizar a 2026:** las fuentes públicas consultadas dieron cifras inconsistentes en los últimos 5 tramos; se necesita el Anexo 8 oficial (DOF/RMF) o confirmación directa del contador aliado antes de sembrar un valor nuevo.
- **Salario mínimo (SM):** nunca se sembró en `tabla_fiscal` ni se usa en ningún cálculo, pese a que el MD original lo menciona junto a UMA/ISR.
- **Costo patronal real por empleado:** hoy es un multiplicador fijo (24.97%) sobre el total del periodo — falta una fórmula real de cuotas patronales IMSS por rama de riesgo, sembrada en `tabla_fiscal` como el resto de valores fiscales.
- **Dashboard Professional (comparativo periodo a periodo, por departamento, ausentismo, rotación):** no construido — el flag `dashboardComparativo` existe pero no se usa.
- **Importación de checador con parsing específico:** hoy reutiliza el mismo importador CSV genérico de la plantilla manual, sin mapeo de columnas propio del formato de reloj checador ni tolerancia de minutos configurable.
- **Documento de finiquito exportable en PDF:** solo se guarda el registro en base de datos.
- **Resumen del periodo exportable PDF/Excel para el contador:** no existe, solo el recibo individual (vista de impresión) y la dispersión CSV.
- **Plantilla de alta masiva / incidencias en Excel real:** se queda en CSV, como el resto del módulo.
- **Alertas de fin de periodo de prueba** distintas de vencimiento de contrato determinado.
- **Extensibilidad de `concepto_nomina` en Professional:** el catálogo sigue fijo para ambos niveles, sin demanda todavía de conceptos personalizados.
- **Aguinaldo/prima vacacional automáticos** (hoy requieren checkbox manual por periodo en vez de que el sistema determine cuándo aplican).

**Resuelto en v0.2 (ya no está pendiente):** carga de documentos del expediente, saldo de vacaciones conectado (inicialización + registro de días gozados), límite de empleados activos, horas extra triples, regla configurable de retardos, subsidio al empleo en el cálculo de ISR, UMA actualizada a 2026.
