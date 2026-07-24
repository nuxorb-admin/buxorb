import type { CompanyModuleTier } from "../../../lib/database.types";

export interface TreasuryTierLimits {
  maxAccounts: number;
  maxStatementImportsPerMonth: number;
  aiParsing: boolean;
  bankFileImport: boolean;
  maxBankImportAccounts: number;
  perAccountView: boolean;
}

const ESSENTIAL: TreasuryTierLimits = {
  maxAccounts: 1,
  maxStatementImportsPerMonth: 1,
  aiParsing: false,
  bankFileImport: false,
  maxBankImportAccounts: 0,
  perAccountView: false,
};

const PROFESSIONAL: TreasuryTierLimits = {
  maxAccounts: Infinity,
  maxStatementImportsPerMonth: 2,
  aiParsing: true,
  bankFileImport: true,
  maxBankImportAccounts: 2,
  perAccountView: true,
};

// Enterprise todavía no está desarrollado (es a la medida de cada cliente) —
// mientras tanto se le dan los límites de Professional, lo más parecido.
export function limitsForTier(tier: CompanyModuleTier | null): TreasuryTierLimits {
  if (tier === "essential") return ESSENTIAL;
  return PROFESSIONAL;
}
