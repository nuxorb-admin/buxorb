-- =========================================================
-- 0041 — Gestión de Personal: dos gaps de las tablas fiscales que el
-- propio motor (calculoNomina.ts) marcaba como pendientes:
--
-- 1. El cálculo de ISR nunca aplicaba el subsidio al empleo (LISR, Decreto
--    DOF 1-may-2024 y su actualización anual vía UMA) — se agrega el tipo
--    'subsidio_empleo' al catálogo de tabla_fiscal (renombrada a
--    hr_tax_tables en la migración 0017 — mismo nombre de constraint
--    tabla_fiscal_tipo_check, Postgres no lo renombra solo al renombrar la
--    tabla).
-- 2. La UMA sembrada en 0013 era la de 2024 ($108.57 diaria) — se agrega
--    la vigente (2026: $117.31 diaria, DOF 9-ene-2026, vigor desde
--    1-feb-2026). Como hr_tax_tables admite varias filas de vigencia por
--    tipo (el motor siempre toma la de vigencia_desde más reciente, ver
--    usePersonalData.ts), se inserta una fila nueva en vez de editar la de
--    2024.
--
-- NO se actualiza aquí la tarifa ISR mensual (tipo 'isr_mensual', Art. 96
-- LISR / Anexo 8 RMF): las fuentes públicas consultadas para 2026 dieron
-- cifras inconsistentes entre sí en las cuotas fijas de los últimos 5
-- tramos (algunas por debajo de las de 2024, lo cual no es plausible en una
-- tabla indexada a inflación) — se prefirió no sembrar un dato fiscal de
-- baja confianza a adivinar. Sigue con los valores 2024 hasta validarse
-- con el contador aliado contra el Anexo 8 oficial (mismo disclaimer que
-- ya trae calculoNomina.ts).
--
-- Cifras de subsidio y UMA tomadas de agregadores fiscales públicos
-- (blog.alegra.com, elcontribuyente.mx, dof.gob.mx, nominafiscal.com),
-- no verificadas línea por línea contra el DOF — mismo nivel de confianza
-- que el resto de tabla_fiscal: referencia, no sustituye validación fiscal
-- real antes de dispersar nómina.
-- =========================================================

alter table public.hr_tax_tables drop constraint if exists tabla_fiscal_tipo_check;
alter table public.hr_tax_tables add constraint tabla_fiscal_tipo_check
  check (tipo in ('isr_mensual', 'uma', 'imss_obrero', 'subsidio_empleo'));

insert into public.hr_tax_tables (tipo, periodicidad, vigencia_desde, contenido)
select 'uma', null, '2026-02-01', '{"diaria": 117.31}'::jsonb
where not exists (select 1 from public.hr_tax_tables where tipo = 'uma' and vigencia_desde = '2026-02-01');

-- Subsidio al empleo: crédito mensual fijo contra el ISR causado
-- (ya no es por rangos de ingreso desde el decreto de mayo 2024),
-- aplicable solo si el ingreso gravable del periodo, llevado a base
-- mensual, no excede limite_ingreso_mensual.
insert into public.hr_tax_tables (tipo, periodicidad, vigencia_desde, contenido)
select 'subsidio_empleo', 'mensual', '2026-02-01', '{"monto_mensual": 423.95, "limite_ingreso_mensual": 9889.20}'::jsonb
where not exists (select 1 from public.hr_tax_tables where tipo = 'subsidio_empleo');
