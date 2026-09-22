import type { BusinessLineTier } from "../../../lib/database.types";

export interface CitasTierLimits {
  // Essential: cualquier empleado con horario libre puede dar cualquier
  // servicio. Professional: se puede restringir un servicio a ciertos
  // empleados específicos.
  restriccionServicioEmpleado: boolean;
}

const ESSENTIAL: CitasTierLimits = {
  restriccionServicioEmpleado: false,
};

const PROFESSIONAL: CitasTierLimits = {
  restriccionServicioEmpleado: true,
};

// Enterprise todavía no está desarrollado (es a la medida de cada cliente) —
// mientras tanto se le dan los límites de Professional, lo más parecido.
export function limitsForTier(tier: BusinessLineTier | null): CitasTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
