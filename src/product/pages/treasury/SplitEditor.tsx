import type { TreasuryCategory } from "../../../lib/database.types";
import { emptySplit, splitTotal, splitMatches, type SplitLine } from "./splits";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

// Editor de "dividir en categorías", reutilizado en el alta manual y en
// cada pantalla de confirmación previa (plantilla, banco, IA, vincular
// proyectado). `total` es el monto del movimiento bancario tal cual —
// los splits deben sumar exactamente eso.
export default function SplitEditor({
  total,
  categories,
  splitting,
  onToggle,
  lines,
  onChange,
}: {
  total: number;
  categories: TreasuryCategory[];
  splitting: boolean;
  onToggle: (on: boolean) => void;
  lines: SplitLine[];
  onChange: (lines: SplitLine[]) => void;
}) {
  const remaining = total - splitTotal(lines);
  const ok = splitMatches(lines, total);

  function updateLine(i: number, patch: Partial<SplitLine>) {
    onChange(lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

  function addLine() {
    onChange([...lines, emptySplit(categories[0]?.name ?? "")]);
  }

  function removeLine(i: number) {
    onChange(lines.filter((_, idx) => idx !== i));
  }

  if (!splitting) {
    return (
      <button
        type="button"
        onClick={() => {
          onToggle(true);
          onChange([emptySplit(categories[0]?.name ?? ""), emptySplit(categories[0]?.name ?? "")]);
        }}
        className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-teal hover:underline"
      >
        Dividir en categorías
      </button>
    );
  }

  return (
    <div className="space-y-2 border border-ink/15 bg-sand-2 p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted">
          Dividir en categorías
        </span>
        <button
          type="button"
          onClick={() => {
            onToggle(false);
            onChange([]);
          }}
          className="font-mono text-[0.6rem] uppercase text-muted hover:text-orange"
        >
          Cancelar
        </button>
      </div>

      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={line.category}
            onChange={(e) => updateLine(i, { category: e.target.value })}
            className="min-w-0 flex-1 border border-ink/15 bg-white px-2 py-1.5 font-sans text-xs text-ink focus:border-teal focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.01"
            value={line.amount}
            onChange={(e) => updateLine(i, { amount: e.target.value })}
            placeholder="Monto"
            className="w-28 border border-ink/15 bg-white px-2 py-1.5 font-mono text-xs text-ink focus:border-teal focus:outline-none"
          />
          {lines.length > 2 && (
            <button
              type="button"
              onClick={() => removeLine(i)}
              className="font-mono text-xs text-muted hover:text-orange"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addLine} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
        + Agregar categoría
      </button>

      <p className={`font-mono text-[0.68rem] ${ok ? "text-teal" : "text-orange"}`}>
        {ok ? "Cuadra con el total" : `Falta ${money(remaining)} para cuadrar con el total (${money(total)})`}
      </p>
    </div>
  );
}
