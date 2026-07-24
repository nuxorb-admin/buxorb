import { useState, type ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import Modal from "../../../admin/components/Modal";
import { parseCsv } from "./parseCsv";

const TYPE_BY_SIGN = "__sign__";

interface Mapping {
  date: number;
  concept: number;
  amount: number;
  type: number | typeof TYPE_BY_SIGN;
}

export default function CsvImportModal({
  title,
  companyId,
  accountId,
  source,
  onClose,
  onImported,
}: {
  title: string;
  companyId: string;
  accountId: string;
  source: "csv_import" | "bank_import";
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<string[][]>([]);
  const [hasHeader, setHasHeader] = useState(true);
  const [mapping, setMapping] = useState<Mapping>({ date: 0, concept: 1, amount: 2, type: TYPE_BY_SIGN });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dataRows = hasHeader ? rows.slice(1) : rows;
  const columnCount = rows[0]?.length ?? 0;

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRows(parseCsv(text));
  }

  function parseAmount(raw: string): number {
    return Number(raw.replace(/[^0-9.\-]/g, ""));
  }

  async function confirmImport() {
    setError(null);
    if (dataRows.length === 0) {
      setError("Sube un archivo con al menos una fila de datos");
      return;
    }
    setSaving(true);
    const records = dataRows.map((r) => {
      const amount = parseAmount(r[mapping.amount] ?? "0");
      const type = mapping.type === TYPE_BY_SIGN ? (amount < 0 ? "egreso" : "ingreso") : r[mapping.type];
      return {
        company_id: companyId,
        account_id: accountId,
        type: type === "egreso" ? "egreso" : "ingreso",
        concept: r[mapping.concept] || "Importado",
        category: "otros",
        amount: Math.abs(amount) || 0,
        entry_date: r[mapping.date] || new Date().toISOString().slice(0, 10),
        source,
      };
    });

    const { error: insertError } = await supabase.from("treasury_movements").insert(records);
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
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
            Archivo CSV
          </label>
          <input
            type="file"
            accept=".csv,text/csv"
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
                Vista previa ({dataRows.length} filas)
              </p>
              <div className="max-h-40 overflow-y-auto border border-ink/10 bg-white">
                {dataRows.slice(0, 5).map((r, i) => (
                  <div key={i} className="border-b border-ink/5 px-3 py-1.5 font-mono text-[0.68rem] text-ink last:border-b-0">
                    {r[mapping.date]} · {r[mapping.concept]} · {r[mapping.amount]}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={confirmImport} disabled={saving} className="btn btn-primary w-full">
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
