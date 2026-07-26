// Registro de parsers a la medida por banco (item 3, tesoreria-modulo-v1.md
// 4.3/4.7 — "automatización de lectura del archivo descargado directamente
// del banco, sin manipular"). Vacío por ahora: mientras un cliente no pida
// activar la automatización de un banco puntual, la importación bancaria en
// CuentasTab usa el mapeo de columnas genérico (CsvImportModal +
// parseXlsxToRows/parseCsv), que ya lee el archivo del banco tal cual.
//
// Cuando se apruebe el trabajo para un banco específico:
// 1. Escribir una función BankParser que reciba el archivo crudo y regrese
//    filas ya mapeadas (fecha, concepto, monto, tipo) sin que el usuario
//    tenga que elegir columnas.
// 2. Registrarla aquí con la clave que use `treasury_accounts.bank_name`.
// 3. En CuentasTab, si existe un parser para `account.bank_name`, usarlo en
//    vez de abrir el modal de mapeo manual.
export interface BankParsedRow {
  fecha: string;
  concepto: string;
  monto: number;
  tipo: "ingreso" | "egreso";
}

export type BankParser = (file: File) => Promise<BankParsedRow[]>;

export const bankParsers: Record<string, BankParser> = {
  // bbva: async (file) => { ... },
};

export function getBankParser(bankName: string | null): BankParser | null {
  if (!bankName) return null;
  return bankParsers[bankName.trim().toLowerCase()] ?? null;
}
