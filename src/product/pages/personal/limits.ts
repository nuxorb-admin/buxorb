import type { CompanyModuleTier } from "../../../lib/database.types";

export interface PersonalTierLimits {
  departamentosYHistorialSueldo: boolean;
  alertasVencimientoContrato: boolean;
  importacionChecador: boolean;
  solicitudAprobacionVacaciones: boolean;
  horasExtraYPrimaDominical: boolean;
  aguinaldoYPrimaVacacional: boolean;
  finiquitosYLiquidaciones: boolean;
  costoPatronalInformativo: boolean;
  dashboardComparativo: boolean;
}

const ESSENTIAL: PersonalTierLimits = {
  departamentosYHistorialSueldo: false,
  alertasVencimientoContrato: false,
  importacionChecador: false,
  solicitudAprobacionVacaciones: false,
  horasExtraYPrimaDominical: false,
  aguinaldoYPrimaVacacional: false,
  finiquitosYLiquidaciones: false,
  costoPatronalInformativo: false,
  dashboardComparativo: false,
};

const PROFESSIONAL: PersonalTierLimits = {
  departamentosYHistorialSueldo: true,
  alertasVencimientoContrato: true,
  importacionChecador: true,
  solicitudAprobacionVacaciones: true,
  horasExtraYPrimaDominical: true,
  aguinaldoYPrimaVacacional: true,
  finiquitosYLiquidaciones: true,
  costoPatronalInformativo: true,
  dashboardComparativo: true,
};

// Enterprise no está desarrollado — se le dan los límites de Professional.
export function limitsForTier(tier: CompanyModuleTier | null): PersonalTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
