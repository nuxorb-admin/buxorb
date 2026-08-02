import { useState, type ChangeEvent } from "react";
import type { TreasuryCategory, TreasuryCategoryPattern, TreasuryMovement } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import { parseCsv, parseXlsxToRows } from "./parseCsv";
import { insertMovementWithSplits, splitMatches, type SplitLine } from "./splits";
import { suggestCategory } from "./patterns";
import { findDuplicate } from "./duplicates";
import SplitEditor from "./SplitEditor";

const TYPE_BY_SIGN = "__sign__";

interface Mapping {
  date: number;
  concept: number;
  amount: number;
  type: number | typeof TYPE_BY_SIGN;
}

// Mapeo genérico de columnas: sirve para leer el archivo del banco "tal
// cual" (CSV o Excel) mientras no exista un parser a la medida para ese
// banco en bankParsers.ts. Cuando se active uno, este modal deja de usarse
// para ese banco puntual.
export default function CsvImportModal({
  title,
  companyId,
  accountId,
  categories,
  patterns,
  movements,
  source,
  userId,
  onClose,
  onImported,
}: {
  title: string;
  companyId: string;
  accountId: string;
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  movements: TreasuryMovement[];
  source: "csv_import" | "bank_import";
  userId: string | null;
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<string[][]>([]);
  const [hasHeader, setHasHeader] = useState(true);
  const [mapping, setMapping] = useState<Mapping>({ date: 0, concept: 1, amount: 2, type: TYPE_BY_SIGN });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rowCategory, setRowCategory] = useState<Record<number, string>>({});
  const [splitRows, setSplitRows] = useState<Record<number, SplitLine[]>>({});
  const [includeDuplicate, setIncludeDuplicate] = useState<Record<number, boolean>>({});

  const dataRows = hasHeader ? rows.slice(1) : rows;
  const columnCount = rows[0]?.length ?? 0;

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setRowCategory({});
    setSplitRows({});
    if (file.name.toLowerCase().endsWith(".xlsx")) {
      try {
        setRows(await parseXlsxToRows(file));
      } catch {
        setError("No se pudo leer el archivo Excel");
      }
      return;
    }
    const text = await file.text();
    setRows(parseCsv(text));
  }

  function parseAmount(raw: string): number {
    return Number(raw.replace(/[^0-9.\-]/g, ""));
  }

  function rowAmount(r: string[]): number {
    return Math.abs(parseAmount(r[mapping.amount] ?? "0"));
  }

  function rowCategoryFor(r: string[], i: number): string {
    if (rowCategory[i]) return rowCategory[i];
    const suggested = suggestCategory(r[mapping.concept] ?? "", patterns);
    if (suggested && categories.some((c) => c.name === suggested)) return suggested;
    return categories[0]?.name ?? "Otros gastos (papelería, seguros, etc.)";
  }

  function rowIsDuplicate(r: string[]): boolean {
    return !!findDuplicate(movements, {
      account_id: accountId,
      entry_date: r[mapping.date] || "",
      amount: rowAmount(r),
    });
  }

  function allSplitsValid() {
    return dataRows.every((r, i) => !splitRows[i] || splitMatches(splitRows[i], rowAmount(r)));
  }

  async function confirmImport() {
    setError(null);
    if (dataRows.length === 0) {
      setError("Sube un archivo con al menos una fila de datos");
      return;
    }
    if (!allSplitsValid()) return;
    setSaving(true);
    for (let i = 0; i < dataRows.length; i++) {
      const r = dataRows[i];
      if (rowIsDuplicate(r) && !includeDuplicate[i]) continue;
      const amount = parseAmount(r[mapping.amount] ?? "0");
      const type = mapping.type === TYPE_BY_SIGN ? (amount < 0 ? "egreso" : "ingreso") : r[mapping.type];
      const category = rowCategoryFor(r, i);
      const rowSplits = splitRows[i];
      await insertMovementWithSplits(
        {
          company_id: companyId,
          account_id: accountId,
          type: type === "egreso" ? "egreso" : "ingreso",
          concept: r[mapping.concept] || "Importado",
          amount: Math.abs(amount) || 0,
          entry_date: r[mapping.date] || new Date().toISOString().slice(0, 10),
          source,
          created_by: userId,
        },
        rowSplits && rowSplits.length > 1 ? rowSplits : [{ category, amount: String(Math.abs(amount) || 0) }],
      );
    }
    setSaving(false);
    onImported();
    onClose();
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="space-y-4">
        {error && (
          <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Archivo del banco (CSV o Excel)
          </label>
          <input
            type="file"
            accept=".csv,text/csv,.xlsx"
            onChange={onFile}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink"
          />
        </div>

        {rows.length > 0 && (
          <>
            <label className="flex items-center gap-2 font-mono text-[0.68rem] text-muted">
              <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
              La primera fila son encabezados
            </label>

            <div className="grid grid-cols-2 gap-3">
              <ColumnSelect label="Fecha" columnCount={columnCount} headers={hasHeader ? rows[0] : undefined} value={mapping.date} onChange={(v) => setMapping({ ...mapping, date: v })} />
              <ColumnSelect label="Concepto" columnCount={columnCount} headers={hasHeader ? rows[0] : undefined} value={mapping.concept} onChange={(v) => setMapping({ ...mapping, concept: v })} />
              <ColumnSelect label="Monto" columnCount={columnCount} headers={hasHeader ? rows[0] : undefined} value={mapping.amount} onChange={(v) => setMapping({ ...mapping, amount: v })} />
              <div>
                <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
                  Tipo
                </label>
                <select
                  value={mapping.type}
                  onChange={(e) =>
                    setMapping({ ...mapping, type: e.target.value === TYPE_BY_SIGN ? TYPE_BY_SIGN : Number(e.target.value) })
                  }
                  className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
                >
                  <option value={TYPE_BY_SIGN}>Según signo del monto</option>
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <option key={i} value={i}>
                      {hasHeader ? rows[0][i] : `Columna ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
                Vista previa ({dataRows.length} filas) — asigna categoría o divide cada movimiento
              </p>
              <div className="max-h-80 space-y-2 overflow-y-auto border border-ink/10 bg-white p-2">
                {dataRows.map((r, i) => (
                  <div key={i} className="border-b border-ink/5 pb-2 last:border-b-0">
                    <div className="flex items-center justify-between gap-3 px-1 py-1 font-mono text-[0.68rem] text-ink">
                      <span>
                        {r[mapping.date]} · {r[mapping.concept]}
                      </span>
                      <span>${rowAmount(r).toLocaleString("es-MX")}</span>
                    </div>
                    {rowIsDuplicate(r) && (
                      <label className="mx-1 mb-1 flex items-center gap-2 border border-orange/40 bg-orange/10 px-2 py-1 font-mono text-[0.62rem] text-orange">
                        <input
                          type="checkbox"
                          checked={!!includeDuplicate[i]}
                          onChange={(e) => setIncludeDuplicate((prev) => ({ ...prev, [i]: e.target.checked }))}
                        />
                        Parece duplicado (misma cuenta/fecha/monto) — importar de todos modos
                      </label>
                    )}
                    {!splitRows[i] && (
                      <div className="px-1 pb-1">
                        <select
                          value={rowCategoryFor(r, i)}
                          onChange={(e) => setRowCategory((prev) => ({ ...prev, [i]: e.target.value }))}
                          className="w-full border border-ink/15 bg-sand-2 px-2 py-1 font-sans text-xs text-ink focus:border-teal focus:outline-none"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="px-1">
                      <SplitEditor
                        total={rowAmount(r)}
                        categories={categories}
                        splitting={!!splitRows[i]}
                        onToggle={(on) =>
                          setSplitRows((prev) => {
                            const next = { ...prev };
                            if (on) next[i] = [];
                            else delete next[i];
                            return next;
                          })
                        }
                        lines={splitRows[i] ?? []}
                        onChange={(lines) => setSplitRows((prev) => ({ ...prev, [i]: lines }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={confirmImport} disabled={saving || !allSplitsValid()} className="btn btn-primary w-full">
              {saving ? "Importando…" : `Confirmar importación (${dataRows.length} movimientos)`}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function ColumnSelect({
  label,
  columnCount,
  headers,
  value,
  onChange,
}: {
  label: string;
  columnCount: number;
  headers?: string[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
      >
        {Array.from({ length: columnCount }).map((_, i) => (
          <option key={i} value={i}>
            {headers?.[i] || `Columna ${i + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
}
