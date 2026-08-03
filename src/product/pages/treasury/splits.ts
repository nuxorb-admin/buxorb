import { supabase } from "../../../lib/supabase";
import { learnPattern } from "./patterns";

export interface SplitLine {
  category: string;
  amount: string;
}

export function emptySplit(category: string): SplitLine {
  return { category, amount: "" };
}

export function splitTotal(lines: SplitLine[]): number {
  return lines.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
}

// $1 de tolerancia por redondeo — evita que centavos por conversión de
// moneda o captura manual bloqueen un split que en la práctica ya cuadra.
export function splitMatches(lines: SplitLine[], total: number): boolean {
  return Math.abs(splitTotal(lines) - total) < 1;
}

// Inserta el movimiento (categoría = la del primer split, monto = total) y,
// si hay 2+ splits, agrega el desglose en treasury_movement_splits. Un solo
// punto de entrada para las 5 formas de alta (manual, plantilla, banco, IA,
// vincular proyectado) — todas terminan aquí en vez de repetir la lógica.
export async function insertMovementWithSplits(
  movement: {
    company_id: string;
    account_id: string;
    type: "ingreso" | "egreso";
    concept: string;
    amount: number;
    entry_date: string;
    source: string;
    created_by: string | null;
    reconciled?: boolean;
    factura_uuid_ref?: string | null;
    proveedor_ref?: string | null;
  },
  splits: SplitLine[],
): Promise<{ id: string } | null> {
  const usableSplits = splits.filter((s) => s.category && Number(s.amount) > 0);
  const category = usableSplits[0]?.category ?? "";

  const { data: created, error } = await supabase
    .from("treasury_movements")
    .insert({ ...movement, category })
    .select("id")
    .single();

  if (error || !created) return null;

  if (usableSplits.length > 1) {
    await supabase.from("treasury_movement_splits").insert(
      usableSplits.map((s) => ({
        movement_id: created.id,
        category: s.category,
        amount: Number(s.amount),
      })),
    );
  }

  // Refuerza el motor de patrones con la categoría "primaria" que se
  // acaba de confirmar — así la próxima vez que se capture o importe una
  // descripción parecida, se sugiere sola.
  if (category) void learnPattern(movement.company_id, movement.concept, category);

  return created;
}
