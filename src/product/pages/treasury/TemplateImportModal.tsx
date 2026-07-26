import { useState, type ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { TreasuryCategory } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import { downloadTreasuryTemplate, parseTreasuryTemplate, type TemplateRow } from "./treasuryTemplate";

export default function TemplateImportModal({
  companyId,
  accountId,
  categories,
  userId,
  onClose,
  onImported,
}: {
  companyId: string;
  accountId: string;
  categories: TreasuryCategory[];
  userId: string | null;
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<TemplateRow[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setFileName(file.name);
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

  async function confirmImport() {
    if (!rows) return;
    setSaving(true);
    const { error: insertError } = await supabase.from("treasury_movements").insert(
      rows.map((r) => ({
        company_id: companyId,
        account_id: accountId,
        type: r.tipo,
        concept: r.descripcion,
        category: categories.some((c) => c.name === r.categoria) ? r.categoria : "otros",
        amount: r.monto,
        entry_date: r.fecha,
        source: "csv_import" as const,
        created_by: userId,
      })),
    );
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
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
              <div className="max-h-48 overflow-y-auto border border-ink/10 bg-white">
                {rows.slice(0, 8).map((r, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-ink/5 px-3 py-1.5 font-mono text-[0.68rem] text-ink last:border-b-0"
                  >
                    <span>
                      {r.fecha} · {r.descripcion} · {r.categoria}
                    </span>
                    <span className={r.tipo === "ingreso" ? "text-teal" : "text-orange"}>
                      {r.tipo === "ingreso" ? "+" : "-"}${r.monto.toLocaleString("es-MX")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={confirmImport} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Importando…" : `Confirmar importación (${rows.length} movimientos)`}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
