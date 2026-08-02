import type { TreasuryCategoryGrupo } from "../../../lib/database.types";

export type Grupo = Exclude<TreasuryCategoryGrupo, null>;

// Orden de captura del estado de resultados (ver ResumenTab) — se reusa
// aquí para el selector de "nueva categoría" y para agrupar la lista en
// CategoriasTab.
export const GRUPOS: { value: Grupo; label: string }[] = [
  { value: "ingreso", label: "Ingresos" },
  { value: "costo_venta", label: "Costo de venta" },
  { value: "gasto_venta", label: "Gastos de venta" },
  { value: "gasto_administrativo", label: "Gastos administrativos" },
  { value: "gasto_financiero", label: "Gastos financieros" },
  { value: "impuesto", label: "Impuestos" },
];

export const GRUPO_LABELS: Record<Grupo, string> = Object.fromEntries(GRUPOS.map((g) => [g.value, g.label])) as Record<
  Grupo,
  string
>;
