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
  maxEmpleados: number;
}

// El MD deja "empleados activos" como límite pendiente de pricing (§2) — los
// números de arranque los definió el negocio (15/50), igual que los
// tickets IA de Compras: ajustable aquí sin tocar el resto del código.
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
  maxEmpleados: 15,
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
  maxEmpleados: 50,
};

// Enterprise no está desarrollado — se le dan los límites de Professional.
export function limitsForTier(tier: CompanyModuleTier | null): PersonalTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
