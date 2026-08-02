import type { TreasuryMovement } from "../../../lib/database.types";

// Duplicado = misma cuenta, misma fecha, mismo monto exacto. No bloquea
// nada por sí solo — cada pantalla de captura/confirmación decide cómo
// avisar y pide una confirmación explícita antes de guardarlo de todos
// modos, para el caso real de que el usuario haya vuelto a capturar (o
// importar) el mismo movimiento bancario por error.
export function findDuplicate(
  movements: TreasuryMovement[],
  candidate: { account_id: string; entry_date: string; amount: number },
): TreasuryMovement | null {
  if (!candidate.account_id || !candidate.entry_date || !candidate.amount) return null;
  return (
    movements.find(
      (m) =>
        m.account_id === candidate.account_id &&
        m.entry_date === candidate.entry_date &&
        Math.abs(Number(m.amount) - candidate.amount) < 0.01,
    ) ?? null
  );
}
