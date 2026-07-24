import { useState, type ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { TreasuryAccount, TreasuryMovement, TreasuryStatementImport } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";
import Modal from "../../../admin/components/Modal";

interface ProposedTransaction {
  date: string;
  concept: string;
  amount: number;
  type: "ingreso" | "egreso";
}

function currentPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

export default function ConciliacionTab({
  companyId,
  accounts,
  movements,
  imports,
  limits,
  reload,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  movements: TreasuryMovement[];
  imports: TreasuryStatementImport[];
  limits: TreasuryTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);

  const usedThisMonth = imports.filter((i) => i.period_month.slice(0, 7) === currentPeriod().slice(0, 7)).length;
  const atQuota = usedThisMonth >= limits.maxStatementImportsPerMonth;

  async function toggleReconciled(m: TreasuryMovement) {
    await supabase.from("treasury_movements").update({ reconciled: !m.reconciled }).eq("id", m.id);
    reload();
  }

  function downloadReport() {
    const rows: (string | number)[][] = [
      ["Fecha", "Concepto", "Categoría", "Tipo", "Monto", "Conciliado"],
      ...movements.map((m) => [m.entry_date, m.concept, m.category, m.type, Number(m.amount), m.reconciled ? "Sí" : "No"]),
    ];
    downloadCsv(`conciliacion-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Conciliación ({usedThisMonth}/{limits.maxStatementImportsPerMonth} este mes)
        </h3>
        <div className="flex gap-4">
          <button onClick={downloadReport} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
            Descargar reporte
          </button>
          <button
            onClick={() => setShowNew(true)}
            disabled={atQuota}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
          >
            + Nueva conciliación
          </button>
        </div>
      </div>

      {imports.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin conciliaciones todavía.</p>
      ) : (
        <div className="mb-6 divide-y divide-ink/10 border border-ink/10 bg-white">
          {imports.map((i) => (
            <div key={i.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{i.file_name || "Estado de cuenta"}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                  {i.method === "ai" ? "IA" : "Manual"} · {new Date(i.created_at).toLocaleDateString("es-MX")}
                  {i.extracted_count > 0 && ` · ${i.extracted_count} movimientos`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Marcar movimientos conciliados
      </h3>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {movements.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin movimientos todavía.</p>}
        {movements.map((m) => (
          <label key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{m.concept}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {new Date(m.entry_date).toLocaleDateString("es-MX")}
              </p>
            </div>
            <input type="checkbox" checked={m.reconciled} onChange={() => toggleReconciled(m)} />
          </label>
        ))}
      </div>

      {showNew && (
        <NewReconciliationModal
          companyId={companyId}
          accounts={accounts}
          allowAi={limits.aiParsing}
          onClose={() => setShowNew(false)}
          onDone={reload}
        />
      )}
    </div>
  );
}

function NewReconciliationModal({
  companyId,
  accounts,
  allowAi,
  onClose,
  onDone,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  allowAi: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposed, setProposed] = useState<ProposedTransaction[] | null>(null);

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    setProposed(null);
  }

  async function fileToBase64(f: File): Promise<string> {
    const buf = await f.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  async function extractWithAi() {
    if (!file) return;
    setError(null);
    setExtracting(true);
    const file_base64 = await fileToBase64(file);
    const { data, error: fnError } = await supabase.functions.invoke("parse-bank-statement", {
      body: { company_id: companyId, account_id: accountId, file_base64, file_name: file.name },
    });
    setExtracting(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo leer el archivo");
      return;
    }
    setProposed(data.transactions ?? []);
  }

  async function saveManual() {
    setSaving(true);
    await supabase.from("treasury_statement_imports").insert({
      company_id: companyId,
      account_id: accountId,
      method: "manual",
      file_name: file?.name ?? null,
      status: "reviewed",
    });
    setSaving(false);
    onDone();
    onClose();
  }

  async function confirmProposed() {
    if (!proposed) return;
    setSaving(true);
    await supabase.from("treasury_movements").insert(
      proposed.map((t) => ({
        company_id: companyId,
        account_id: accountId,
        type: t.type,
        concept: t.concept,
        category: "otros",
        amount: t.amount,
        entry_date: t.date,
        source: "ai_statement",
        reconciled: true,
      })),
    );
    await supabase.from("treasury_statement_imports").insert({
      company_id: companyId,
      account_id: accountId,
      method: "ai",
      file_name: file?.name ?? null,
      status: "reviewed",
      extracted_count: proposed.length,
    });
    setSaving(false);
    onDone();
    onClose();
  }

  return (
    <Modal title="Nueva conciliación" onClose={onClose}>
      <div className="space-y-4">
        {error && (
          <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>
        )}

        {accounts.length > 1 && (
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="file"
          accept=".pdf"
          onChange={onFile}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink"
        />

        {proposed && (
          <div>
            <p className="mb-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Transacciones encontradas ({proposed.length})
            </p>
            <div className="max-h-48 overflow-y-auto border border-ink/10 bg-white">
              {proposed.map((t, i) => (
                <div key={i} className="flex justify-between border-b border-ink/5 px-3 py-1.5 font-mono text-[0.68rem] text-ink last:border-b-0">
                  <span>{t.date} · {t.concept}</span>
                  <span className={t.type === "ingreso" ? "text-teal" : "text-orange"}>
                    {t.type === "ingreso" ? "+" : "-"}${t.amount.toLocaleString("es-MX")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {allowAi && !proposed && (
            <button onClick={extractWithAi} disabled={!file || extracting} className="btn btn-primary w-full">
              {extracting ? "Leyendo con IA…" : "Extraer con IA"}
            </button>
          )}
          {proposed && (
            <button onClick={confirmProposed} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Guardando…" : `Confirmar ${proposed.length} movimientos`}
            </button>
          )}
          {!proposed && (
            <button onClick={saveManual} disabled={!file || saving} className="btn btn-outline w-full">
              {saving ? "Guardando…" : "Registrar conciliación manual"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
