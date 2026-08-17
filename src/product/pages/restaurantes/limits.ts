import type { BusinessLineTier } from "../../../lib/database.types";

export interface RestaurantTierLimits {
  multiSalon: boolean;
  kds: boolean;
  splitBilling: boolean;
  reservaciones: boolean;
  recetaCosteo: boolean;
}

const ESSENTIAL: RestaurantTierLimits = {
  multiSalon: false,
  kds: false,
  splitBilling: false,
  reservaciones: false,
  recetaCosteo: false,
};

const PROFESSIONAL: RestaurantTierLimits = {
  multiSalon: true,
  kds: true,
  splitBilling: true,
  reservaciones: true,
  recetaCosteo: true,
};

// Enterprise todavía no está desarrollado (es a la medida de cada cliente) —
// mientras tanto se le dan los límites de Professional, lo más parecido.
export function limitsForTier(tier: BusinessLineTier | null): RestaurantTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
