// Motor de cálculo de nómina — lee las tablas fiscales (ISR/UMA/IMSS) desde
// `tabla_fiscal` en vez de traerlas hardcodeadas aquí, para que Nuxorb pueda
// actualizarlas por evento/año sin tocar código (igual intención que el MD:
// "infraestructura interna Nuxorb... no editables por el cliente").
//
// IMPORTANTE: los valores sembrados en la migración 0013 son de referencia
// (2024) y la fórmula de IMSS obrero está simplificada por rama — el propio
// MD marca este módulo como "pendiente de validación fiscal" con el
// contador aliado. No usar para dispersar nómina real sin esa validación.

export interface TramoISR {
  limite_inferior: number;
  limite_superior: number | null;
  cuota_fija: number;
  porcentaje_excedente: number;
}

export interface FormulaImssObrero {
  enfermedad_maternidad_excedente_pct: number;
  prestaciones_dinero_pct: number;
  gastos_medicos_pensionados_pct: number;
  invalidez_vida_pct: number;
  cesantia_vejez_pct: number;
}

const DIAS_MES_PROMEDIO = 30.4;

/** Redondeo a centavos — el motor hace varias divisiones/porcentajes en cadena y sin esto arrastra floats largos hasta los montos guardados en BD (p. ej. mov_esperados.monto, que un <input step="0.01"> del lado de Tesorería rechaza). */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** ISR mensual equivalente por tarifa Art. 96, prorrateado al periodo (práctica común: tabla mensual × días del periodo / 30.4). */
export function calcularISRPeriodo(baseGravablePeriodo: number, diasPeriodo: number, tramos: TramoISR[]): number {
  if (baseGravablePeriodo <= 0 || diasPeriodo <= 0) return 0;
  const baseMensual = baseGravablePeriodo * (DIAS_MES_PROMEDIO / diasPeriodo);
  const tramo = tramos.find(
    (t) => baseMensual >= t.limite_inferior && (t.limite_superior === null || baseMensual <= t.limite_superior),
  );
  if (!tramo) return 0;
  const isrMensual = tramo.cuota_fija + (baseMensual - tramo.limite_inferior) * (tramo.porcentaje_excedente / 100);
  return round2(isrMensual * (diasPeriodo / DIAS_MES_PROMEDIO));
}

/** Cuotas obrero IMSS por rama, sobre el SBC del periodo (aproximación — no sustituye la determinación oficial del IDSE). */
export function calcularIMSSObrero(
  sueldoDiario: number,
  diasPeriodo: number,
  umaDiaria: number,
  formula: FormulaImssObrero,
): number {
  const sbcPeriodo = sueldoDiario * diasPeriodo;
  const excedente3Uma = Math.max(0, sueldoDiario - 3 * umaDiaria) * diasPeriodo;
  const enfermedadMaternidad = excedente3Uma * (formula.enfermedad_maternidad_excedente_pct / 100);
  const prestacionesDinero = sbcPeriodo * (formula.prestaciones_dinero_pct / 100);
  const gastosMedicos = sbcPeriodo * (formula.gastos_medicos_pensionados_pct / 100);
  const invalidezVida = sbcPeriodo * (formula.invalidez_vida_pct / 100);
  const cesantiaVejez = sbcPeriodo * (formula.cesantia_vejez_pct / 100);
  return round2(enfermedadMaternidad + prestacionesDinero + gastosMedicos + invalidezVida + cesantiaVejez);
}

/** Días de vacaciones por antigüedad — LFT Art. 76 (reforma "Vacaciones Dignas" 2023). */
export function diasVacacionesLFT(aniversario: number): number {
  if (aniversario <= 0) return 0;
  if (aniversario <= 5) return 12 + 2 * (aniversario - 1);
  return 20 + 2 * Math.ceil((aniversario - 5) / 5);
}

export function calcularAguinaldo(sueldoDiario: number, diasTrabajadosEnAnio: number, diasAguinaldo = 15): number {
  const diasAnio = 365;
  return round2(sueldoDiario * diasAguinaldo * Math.min(1, diasTrabajadosEnAnio / diasAnio));
}

export function calcularPrimaVacacional(sueldoDiario: number, diasVacaciones: number, porcentaje = 25): number {
  return round2(sueldoDiario * diasVacaciones * (porcentaje / 100));
}

export interface FiniquitoResultado {
  aguinaldoProporcional: number;
  primaVacacionalProporcional: number;
  vacacionesNoGozadas: number;
  indemnizacion: number;
  primaAntiguedad: number;
  isrSeparacion: number;
  neto: number;
}

/** Finiquito (baja voluntaria/término) o liquidación (despido, con indemnización) — cálculo de referencia. */
export function calcularFiniquito(params: {
  sueldoDiario: number;
  diasTrabajadosEnAnio: number;
  diasVacacionesPendientes: number;
  aniosAntiguedad: number;
  esDespido: boolean;
  umaDiaria: number;
  tramosISR: TramoISR[];
}): FiniquitoResultado {
  const { sueldoDiario, diasTrabajadosEnAnio, diasVacacionesPendientes, aniosAntiguedad, esDespido, umaDiaria, tramosISR } = params;

  const aguinaldoProporcional = calcularAguinaldo(sueldoDiario, diasTrabajadosEnAnio);
  const vacacionesNoGozadas = round2(sueldoDiario * diasVacacionesPendientes);
  const primaVacacionalProporcional = calcularPrimaVacacional(sueldoDiario, diasVacacionesPendientes);

  let indemnizacion = 0;
  let primaAntiguedad = 0;
  if (esDespido) {
    indemnizacion = round2(sueldoDiario * 90 + sueldoDiario * 20 * aniosAntiguedad);
    const salarioTopadoAntiguedad = Math.min(sueldoDiario, umaDiaria * 2);
    primaAntiguedad = round2(salarioTopadoAntiguedad * 12 * aniosAntiguedad);
  }

  // Exención Art. 93 fracc. XIII LISR: 90 UMA por año de servicio sobre la
  // indemnización + prima de antigüedad; el excedente se grava. Las partes
  // proporcionales (aguinaldo/vacaciones/prima vacacional) se gravan como
  // ingreso ordinario del mes.
  const exencionTotal = 90 * umaDiaria * Math.max(1, aniosAntiguedad);
  const totalIndemnizatorio = indemnizacion + primaAntiguedad;
  const gravableIndemnizatorio = Math.max(0, totalIndemnizatorio - exencionTotal);
  const gravableOrdinario = aguinaldoProporcional + vacacionesNoGozadas + primaVacacionalProporcional;

  const isrSeparacion = calcularISRPeriodo(gravableOrdinario + gravableIndemnizatorio, 30.4, tramosISR);

  const neto = round2(aguinaldoProporcional + vacacionesNoGozadas + primaVacacionalProporcional + totalIndemnizatorio - isrSeparacion);

  return {
    aguinaldoProporcional,
    primaVacacionalProporcional,
    vacacionesNoGozadas,
    indemnizacion,
    primaAntiguedad,
    isrSeparacion,
    neto,
  };
}
