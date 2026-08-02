import { useState, type ChangeEvent } from "react";
import type { TreasuryCategory, TreasuryCategoryPattern, TreasuryMovement } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import { downloadTreasuryTemplate, parseTreasuryTemplate, type TemplateRow } from "./treasuryTemplate";
import { insertMovementWithSplits, splitMatches, type SplitLine } from "./splits";
import { suggestCategory } from "./patterns";
import { findDuplicate } from "./duplicates";
import SplitEditor from "./SplitEditor";

export default function TemplateImportModal({
  companyId,
  accountId,
  categories,
  patterns,
  movements,
  userId,
  onClose,
  onImported,
}: {
  companyId: string;
  accountId: string;
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  movements: TreasuryMovement[];
  userId: string | null;
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<TemplateRow[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Splits por fila — pantalla de confirmación previa antes de guardar, ahí
  // es donde se puede dividir cada movimiento importado en 2+ categorías.
  const [splitRows, setSplitRows] = useState<Record<number, SplitLine[]>>({});
  // Filas que calzan con un movimiento ya existente (misma cuenta/fecha/
  // monto) se excluyen del import por default — hay que marcarlas a mano
  // para incluirlas de todos modos.
  const [includeDuplicate, setIncludeDuplicate] = useState<Record<number, boolean>>({});

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setFileName(file.name);
    setSplitRows({});
    try {
      const parsed = await parseTreasuryTemplate(file);
      if (parsed.length === 0) {
        setError("No se encontraron filas con datos en el archivo");
        setRows(null);
        return;
      }
      setRows(parsed);
    } catch {
      setError("No se pudo leer el archivo. Verifica que sea la plantilla descargada desde Tesorería.");
      setRows(null);
    }
  }

  function allSplitsValid() {
    if (!rows) return true;
    return rows.every((r, i) => !splitRows[i] || splitMatches(splitRows[i], r.monto));
  }

  async function confirmImport() {
    if (!rows || !allSplitsValid()) return;
    setSaving(true);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const isDuplicate = !!findDuplicate(movements, { account_id: accountId, entry_date: r.fecha, amount: r.monto });
      if (isDuplicate && !includeDuplicate[i]) continue;
      const rowSplits = splitRows[i];
      const category = categories.some((c) => c.name === r.categoria)
        ? r.categoria
        : (suggestCategory(r.descripcion, patterns) ?? "Otros gastos (papelería, seguros, etc.)");
      await insertMovementWithSplits(
        {
          company_id: companyId,
          account_id: accountId,
          type: r.tipo === "egreso" ? "egreso" : "ingreso",
          concept: r.descripcion,
          amount: r.monto,
          entry_date: r.fecha,
          source: "csv_import",
          created_by: userId,
        },
        rowSplits && rowSplits.length > 1 ? rowSplits : [{ category, amount: String(r.monto) }],
      );
    }
    setSaving(false);
    onImported();
    onClose();
  }

  return (
    <Modal title="Importar plantilla" onClose={onClose}>
      <div className="space-y-4">
        {error && (
          <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">
            {error}
          </div>
        )}

        <button
          onClick={() => downloadTreasuryTemplate(categories.map((c) => c.name))}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
        >
          ↓ Descargar plantilla (.xlsx)
        </button>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Subir plantilla llena
          </label>
          <input
            type="file"
            accept=".xlsx"
            onChange={onFile}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink"
          />
        </div>

        {rows && (
          <>
            <div>
              <p className="mb-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
                Vista previa ({rows.length} filas) — {fileName}
              </p>
              <div className="max-h-80 space-y-2 overflow-y-auto border border-ink/10 bg-white p-2">
                {rows.map((r, i) => {
                  const isDuplicate = !!findDuplicate(movements, { account_id: accountId, entry_date: r.fecha, amount: r.monto });
                  return (
                  <div key={i} className="border-b border-ink/5 pb-2 last:border-b-0">
                    <div className="flex items-center justify-between gap-3 px-1 py-1 font-mono text-[0.68rem] text-ink">
                      <span>
                        {r.fecha} · {r.descripcion} · {r.categoria}
                      </span>
                      <span className={r.tipo === "ingreso" ? "text-teal" : "text-orange"}>
                        {r.tipo === "ingreso" ? "+" : "-"}${r.monto.toLocaleString("es-MX")}
                      </span>
                    </div>
                    {isDuplicate && (
                      <label className="mx-1 mb-1 flex items-center gap-2 border border-orange/40 bg-orange/10 px-2 py-1 font-mono text-[0.62rem] text-orange">
                        <input
                          type="checkbox"
                          checked={!!includeDuplicate[i]}
                          onChange={(e) => setIncludeDuplicate((prev) => ({ ...prev, [i]: e.target.checked }))}
                        />
                        Parece duplicado (misma cuenta/fecha/monto) — importar de todos modos
                      </label>
                    )}
                    <div className="px-1">
                      <SplitEditor
                        total={r.monto}
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
                  );
                })}
              </div>
            </div>

            <button onClick={confirmImport} disabled={saving || !allSplitsValid()} className="btn btn-primary w-full">
              {saving ? "Importando…" : `Confirmar importación (${rows.length} movimientos)`}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
