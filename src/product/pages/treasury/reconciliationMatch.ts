import type { TreasuryMovement } from "../../../lib/database.types";

export type MatchMotivo = "conciliado" | "diferencia_fecha" | "diferencia_monto" | "no_registrado";

export interface MatchResult {
  motivo: MatchMotivo;
  movement: TreasuryMovement | null;
}

const AMOUNT_TOLERANCE = 1; // $1, mismo criterio que duplicates.ts
const DATE_WINDOW_DAYS = 3; // ventana razonable entre fecha del banco y fecha capturada

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round(Math.abs(da - db) / 86400000);
}

function sameAmount(a: number, b: number): boolean {
  return Math.abs(a - b) < AMOUNT_TOLERANCE;
}

// Compara una transacción propuesta (extraída del PDF) contra los
// movimientos ya capturados de esa cuenta:
//   - conciliado: misma fecha y mismo monto exacto — ya está registrado,
//     solo hay que marcarlo como conciliado, no crear otro movimiento.
//   - diferencia_fecha: mismo monto pero la fecha no coincide (dentro de
//     una ventana de unos días) — probable el mismo movimiento, pero hay
//     que confirmarlo a mano.
//   - diferencia_monto: misma fecha pero el monto no coincide — probable
//     el mismo movimiento con un monto distinto al capturado, revisar.
//   - no_registrado: no hay nada parecido — es un movimiento nuevo.
export function matchTransaction(
  transaction: { date: string; amount: number },
  movements: TreasuryMovement[],
  accountId: string,
): MatchResult {
  const inAccount = movements.filter((m) => m.account_id === accountId);

  const exact = inAccount.find((m) => m.entry_date === transaction.date && sameAmount(Number(m.amount), transaction.amount));
  if (exact) return { motivo: "conciliado", movement: exact };

  const diferenciaFecha = inAccount.find(
    (m) => sameAmount(Number(m.amount), transaction.amount) && daysBetween(m.entry_date, transaction.date) <= DATE_WINDOW_DAYS,
  );
  if (diferenciaFecha) return { motivo: "diferencia_fecha", movement: diferenciaFecha };

  const diferenciaMonto = inAccount.find((m) => m.entry_date === transaction.date);
  if (diferenciaMonto) return { motivo: "diferencia_monto", movement: diferenciaMonto };

  return { motivo: "no_registrado", movement: null };
}

export const MOTIVO_LABELS: Record<MatchMotivo, string> = {
  conciliado: "Ya registrado — se marca como conciliado",
  diferencia_fecha: "Posible mismo movimiento, fecha distinta",
  diferencia_monto: "Posible mismo movimiento, monto distinto",
  no_registrado: "Nuevo movimiento",
};
