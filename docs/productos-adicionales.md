# Productos adicionales — Nuxorb

**Última actualización:** 19 de julio de 2026

## Modelo de negocio

Productos independientes de los módulos, contratados por separado. Esquemas de cobro posibles: **costo mensual** y/o **costo único de implementación**. Cada producto define el suyo. Un producto puede requerir un módulo como base (se indica en cada ficha), pero se factura aparte.

---

## 1. Checador básico
[[gestion de personal]]
**Estado:** definido para diseño detallado
**Requiere:** módulo Gestión de Personal (alimenta la tabla `incidencia` con origen=checador)
**Cobro propuesto:** mensual por empleado activo (pricing pendiente)

**Qué hace:** registro de entradas y salidas del personal sin hardware especializado. Los eventos generan/alimentan incidencias (retardos, faltas) automáticamente según las reglas del módulo.

**v1 — QR + web:**
- QR mostrado en tablet/pantalla del negocio; el empleado lo escanea y se registra entrada/salida con hora del servidor
- Anti-fraude: QR dinámico (rota cada 30-60 segundos) + geocerca opcional
- Sin costo por transacción, sin hardware adicional

**v2 — WhatsApp (variante posterior):**
- El empleado envía mensaje/ubicación a un número de WhatsApp Business del negocio; flujo n8n registra el evento
- Ventaja: cero fricción. Contras: costo por conversación de Meta, anti-fraude más débil
- Decisión de arranque (solo QR vs. ambos) pendiente

**Datos:** tabla `evento_checador` (empleado_id, tipo entrada/salida, timestamp servidor, método qr/whatsapp, geolocalización opcional) → se traduce a `incidencia` según reglas.

---

## 2. Conciliación con PDF ampliada
[[tesorería]]
**Requiere:** módulo Tesorería
**Cobro propuesto:** mensual o por evento (pendiente del piloto OCR)

Más frecuencia de conciliación con PDF y/o más cuentas bancarias de las incluidas en el nivel contratado. Detalle en `tesoreria-modulo.md` sección 6. Pricing pendiente del piloto de exactitud OCR/IA.

---

## 3. PTU
[[gestion de personal]]
**Requiere:** módulo Gestión de Personal
**Cobro propuesto:** único anual (por temporada de reparto)
**Estado:** candidato — desarrollar cuando haya demanda

Cálculo del reparto de utilidades: proyecto de reparto por empleado (días trabajados + salarios), topes de ley y exportable para el contador.

---

## 4. Portal del empleado
[[gestion de personal]]
**Requiere:** módulo Gestión de Personal
**Cobro propuesto:** mensual por empleado activo
**Estado:** candidato — desarrollar cuando haya demanda

Acceso del empleado desde su celular (sin ocupar seats del módulo): consulta de recibos, saldo de vacaciones y solicitud de vacaciones/permisos (el flujo de aprobación vive en el módulo, nivel Professional).

## 5. Inventario
[[compras y proveedores]]
**Requiere:** módulo Compras y Proveedores (consume la vista `entradas_compra`) **Cobro propuesto:** mensual (pricing pendiente) **Estado:** candidato — desarrollar cuando haya demanda; definir alcance v1

**Qué hace:** control de existencias alimentado por las recepciones de compras (entradas automáticas) y salidas capturadas por el negocio. Se mantiene como producto separado porque su lógica varía fuertemente por giro (comercializadora: SKUs y almacenes; restaurante: recetas y mermas; servicios: no aplica), mientras que el módulo de compras es universal.

**Alcance v1 tentativo (por validar):** catálogo de artículos, entradas desde compras recibidas, salidas manuales, existencia actual y alerta de mínimos. Variantes por giro (recetas, multi-almacén) vía Enterprise hasta que haya demanda recurrente.

---

## 6. Lectura de tickets ampliada
[[compras y proveedores]]
**Requiere:** módulo Compras y Proveedores **Cobro propuesto:** mensual o por documento (pendiente del piloto del pipeline LLM)

Más lecturas de tickets con IA que las incluidas en el nivel contratado (mismo modelo que Conciliación con PDF ampliada). Detalle en `compras-proveedores-modulo.md` sección 5. El pipeline documento → JSON es infraestructura interna Nuxorb, compartida con la conciliación PDF de Tesorería.

