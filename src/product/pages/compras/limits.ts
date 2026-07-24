import type { CompanyModuleTier } from "../../../lib/database.types";

export interface ComprasTierLimits {
  requisicionYAprobacionMultinivel: boolean;
  recepcionParcial: boolean;
  matchFacturaVsOC: boolean;
  antiguedadYCalendarioPagos: boolean;
  evaluacionProveedores: boolean;
  maxTicketsIAPorMes: number;
}

// Los límites de tickets/mes son un número de arranque propuesto (el MD los
// deja "pendiente definir") — ajustable aquí sin tocar el resto del código.
const ESSENTIAL: ComprasTierLimits = {
  requisicionYAprobacionMultinivel: false,
  recepcionParcial: false,
  matchFacturaVsOC: false,
  antiguedadYCalendarioPagos: false,
  evaluacionProveedores: false,
  maxTicketsIAPorMes: 10,
};

const PROFESSIONAL: ComprasTierLimits = {
  requisicionYAprobacionMultinivel: true,
  recepcionParcial: true,
  matchFacturaVsOC: true,
  antiguedadYCalendarioPagos: true,
  evaluacionProveedores: true,
  maxTicketsIAPorMes: 40,
};

// Enterprise no está desarrollado — se le dan los límites de Professional.
export function limitsForTier(tier: CompanyModuleTier | null): ComprasTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
