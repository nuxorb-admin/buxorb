# Línea de negocio: Citas

**Última actualización:** 21 de septiembre de 2026 (v1)

## 1. Objetivo

Segunda línea de negocio (tercer eje de producto, ver `lineas-de-negocio-restaurantes-v1.md` §1 para el contexto general de este eje). **Citas** es una agenda de servicios genérica para negocios que atienden con cita: salones de belleza, spas, consultorios, barberías, etc. — el diferenciador entre giros es solo qué servicios capturan en su catálogo, no el modelo de datos.

Surgió al evaluar qué ofrecerle a un cliente nuevo de belleza/estética: Nuxorb ya tenía Lealtad y Agentes IA para ese perfil, pero le faltaba resolver su cuello de botella real — agendar sin choques y sin depender de que alguien conteste el teléfono.

**Requiere:** módulo Ventas y CxC activo — el catálogo de servicios reusa `sales_products_services` en vez de duplicarlo (igual que el Menú de Restaurantes), validado en el admin al asignar el nivel, no como constraint de esquema.

**Decisión de alcance (v1):** no existe reserva de autoservicio. El cliente final siempre agenda por WhatsApp o llamada; quien captura la cita es el negocio, desde la Agenda. Por eso no hay página pública sin login (a diferencia de la inscripción de Lealtad).

## 2. Resumen por nivel

| | Essential | Professional/Enterprise |
|---|---|---|
| Agenda, Servicios, Horarios | ✅ | ✅ |
| Restringir un servicio a empleados específicos | ❌ (cualquiera con horario libre lo puede dar) | ✅ |

`src/product/pages/citas/limits.ts` implementa esta tabla vía `limitsForTier(tier)`. Es la única diferencia entre niveles en v1 — deliberadamente mínima, no se inventó más granularidad sin que haya demanda real de un cliente.

## 3. Los 3 módulos (grupo colapsable en el sidebar)

Mismo patrón que Restaurantes: un grupo colapsable en el sidebar (`ProductLayout.tsx`, `ExtraNavItem` con `children`), no tabs horizontales. `Citas.tsx` solo carga los datos compartidos (`useCitasData`) y resuelve las rutas anidadas bajo `/citas/*`.

1. **Servicios** (`ServiciosTab.tsx`) — se eligen productos/servicios ya dados de alta en el catálogo de Ventas y CxC (`ldn_citas_services` es solo metadata: `duracion_minutos` sobre esa fila compartida, igual que `ldn_restaurant_menu_items` con el menú). En Professional, además se puede restringir qué empleados (`ldn_citas_service_employees`) pueden dar cada servicio.
2. **Horarios** (`HorariosTab.tsx`) — horario semanal recurrente por empleado (`ldn_citas_schedules`: día 0-6, hora inicio/fin). Sin horario capturado, ese empleado no tiene huecos que ofrecer — es el primer paso obligatorio antes de poder agendar.
3. **Agenda** (`AgendaTab.tsx`) — lista de citas del día elegido, con acciones para marcar completada/no asistió/cancelada. "+ Nueva cita" calcula disponibilidad real (`disponibilidad.ts`, función pura): cruza el horario del empleado ese día de la semana contra sus citas ya tomadas, y ofrece horarios libres en bloques de 15 minutos que alcanzan la duración del servicio. Si se pide "cualquiera disponible", se junta la disponibilidad de todos los empleados elegibles para ese servicio y, al elegir un horario, el sistema asigna automáticamente a quien lo tenía libre.

**"Quién atiende" no es un `hr_employee`** — es un login de la empresa (`auth.users` vía `company_users`), mismo criterio que `ldn_restaurant_orders.mesero_id`. Así un negocio chico no necesita activar/comprar Gestión de Personal solo para agendar.

## 4. Anti-doble-agenda a nivel de base de datos

`ldn_citas_appointments` tiene un `exclude using gist` (requiere `btree_gist`) que impide dos citas traslapadas para el mismo empleado — a nivel de Postgres, no solo validación de UI, así que sobrevive a escrituras concurrentes (dos personas capturando citas al mismo tiempo desde dos sesiones). Una cita "cualquiera disponible" sin empleado todavía asignado no choca con nada; una cita cancelada tampoco cuenta como ocupado. Al insertar, un choque real llega como error Postgres `23P01`, que la UI traduce a "Ese horario ya se acaba de ocupar — elige otro."

## 5. Pendiente para V2

- Reserva de autoservicio sin login (hoy explícitamente fuera de alcance — confirmado con el cliente real que originó esto).
- Recordatorios automáticos por WhatsApp 24h antes (conectar con Agentes IA, mismo patrón que `send-whatsapp-message`).
- Cobro al completar la cita / integración con Tesorería (mismo patrón que `close-restaurant-ticket`).
- Excepciones al horario recurrente (día libre puntual, vacaciones) — v1 solo tiene el horario semanal fijo.
- Servicios que requieren más de un empleado a la vez.
- Vista de semana en la Agenda (hoy es lista de un solo día).
