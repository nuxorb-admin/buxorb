import { supabase } from "../../../lib/supabase";
import type { TreasuryCategoryPattern } from "../../../lib/database.types";

const DIACRITICS = /[̀-ͯ]/g;

// Normaliza una descripción para comparar patrones sin que espacios,
// acentos, mayúsculas o puntuación de más rompan el match ("Pago OXXO #123"
// y "pago oxxo   #456" deben verse como el mismo patrón).
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Sugiere una categoría para una descripción nueva buscando el patrón ya
// aprendido más específico que calce (contenido en ambos sentidos), y
// entre los que calcen, el más usado — así "pago oxxo" gana sobre "pago"
// si ambos coinciden y "pago oxxo" se ha usado más.
export function suggestCategory(concept: string, patterns: TreasuryCategoryPattern[]): string | null {
  const normalized = normalizeText(concept);
  if (!normalized) return null;

  const matches = patterns.filter(
    (p) => p.texto_patron.length > 2 && (normalized.includes(p.texto_patron) || p.texto_patron.includes(normalized)),
  );
  if (matches.length === 0) return null;

  matches.sort((a, b) => b.texto_patron.length - a.texto_patron.length || b.frecuencia_uso - a.frecuencia_uso);
  return matches[0].category;
}

// Refuerza (o crea) el patrón cada vez que se guarda un movimiento — un
// solo punto de entrada (insertMovementWithSplits en splits.ts) para que
// las 5 formas de alta enseñen al motor por igual, sin repetir esto en
// cada formulario.
export async function learnPattern(companyId: string, concept: string, category: string): Promise<void> {
  const texto_patron = normalizeText(concept);
  if (!texto_patron || !category) return;

  const { data: existing } = await supabase
    .from("treasury_category_patterns")
    .select("id, frecuencia_uso")
    .eq("company_id", companyId)
    .eq("texto_patron", texto_patron)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("treasury_category_patterns")
      .update({ category, frecuencia_uso: existing.frecuencia_uso + 1, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("treasury_category_patterns").insert({ company_id: companyId, texto_patron, category });
  }
}
