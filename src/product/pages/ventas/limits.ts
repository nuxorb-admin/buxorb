import type { CompanyModuleTier } from "../../../lib/database.types";

export interface VentasTierLimits {
  pipelineVisual: boolean;
  versionesCotizacionYAprobacionDescuentos: boolean;
  vigenciaConAlerta: boolean;
  facturacionParcial: boolean;
  recordatoriosYAntiguedad: boolean;
}

const ESSENTIAL: VentasTierLimits = {
  pipelineVisual: false,
  versionesCotizacionYAprobacionDescuentos: false,
  vigenciaConAlerta: false,
  facturacionParcial: false,
  recordatoriosYAntiguedad: false,
};

const PROFESSIONAL: VentasTierLimits = {
  pipelineVisual: true,
  versionesCotizacionYAprobacionDescuentos: true,
  vigenciaConAlerta: true,
  facturacionParcial: true,
  recordatoriosYAntiguedad: true,
};

// Enterprise no está desarrollado — se le dan los límites de Professional.
export function limitsForTier(tier: CompanyModuleTier | null): VentasTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
