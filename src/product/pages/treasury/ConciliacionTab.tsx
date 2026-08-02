import { useEffect, useState, type ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  TreasuryAccount,
  TreasuryCategory,
  TreasuryCategoryPattern,
  TreasuryMovement,
  TreasuryStatementImport,
} from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";
import { insertMovementWithSplits, splitMatches, type SplitLine } from "./splits";
import { suggestCategory } from "./patterns";
import { matchTransaction, MOTIVO_LABELS } from "./reconciliationMatch";
import { formatDate } from "./dateFormat";
import SplitEditor from "./SplitEditor";
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
  categories,
  patterns,
  movements,
  imports,
  limits,
  reload,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  movements: TreasuryMovement[];
  imports: TreasuryStatementImport[];
  limits: TreasuryTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

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
                {formatDate(m.entry_date)}
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
          categories={categories}
          patterns={patterns}
          movements={movements}
          allowAi={limits.aiParsing}
          userId={userId}
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
  categories,
  patterns,
  movements,
  allowAi,
  userId,
  onClose,
  onDone,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  movements: TreasuryMovement[];
  allowAi: boolean;
  userId: string | null;
  onClose: () => void;
  onDone: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposed, setProposed] = useState<ProposedTransaction[] | null>(null);
  const [rowCategory, setRowCategory] = useState<Record<number, string>>({});
  const [splitRows, setSplitRows] = useState<Record<number, SplitLine[]>>({});
  // Resolución manual por fila cuando el match automático es una diferencia
  // (fecha o monto no calzan exacto) — "reconcile" vincula con el
  // movimiento ya existente, "new" lo registra como uno nuevo aparte.
  const [rowResolution, setRowResolution] = useState<Record<number, "reconcile" | "new">>({});

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    setProposed(null);
    setRowCategory({});
    setSplitRows({});
    setRowResolution({});
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
      created_by: userId,
    });
    setSaving(false);
    onDone();
    onClose();
  }

  function allSplitsValid() {
    if (!proposed) return true;
    return proposed.every((t, i) => !splitRows[i] || splitMatches(splitRows[i], t.amount));
  }

  function rowCategoryFor(concept: string, i: number): string {
    if (rowCategory[i]) return rowCategory[i];
    const suggested = suggestCategory(concept, patterns);
    if (suggested && categories.some((c) => c.name === suggested)) return suggested;
    return categories[0]?.name ?? "Otros gastos (papelería, seguros, etc.)";
  }

  function matchFor(t: ProposedTransaction) {
    return matchTransaction(t, movements, accountId);
  }

  // Default: un match exacto ("conciliado") se vincula solo; una diferencia
  // se registra como nuevo por default (más seguro) hasta que el usuario
  // confirme a mano que es el mismo movimiento.
  function resolutionFor(t: ProposedTransaction, i: number): "reconcile" | "new" {
    if (rowResolution[i]) return rowResolution[i];
    return matchFor(t).motivo === "conciliado" ? "reconcile" : "new";
  }

  function summary() {
    if (!proposed) return { conciliado: 0, diferencia: 0, nuevo: 0 };
    let conciliado = 0;
    let diferencia = 0;
    let nuevo = 0;
    proposed.forEach((t, i) => {
      const motivo = matchFor(t).motivo;
      const resolution = resolutionFor(t, i);
      if (resolution === "reconcile") conciliado++;
      else if (motivo === "no_registrado") nuevo++;
      else diferencia++;
    });
    return { conciliado, diferencia, nuevo };
  }

  function downloadDiscrepancyReport() {
    if (!proposed) return;
    const rows: (string | number)[][] = [
      ["Fecha extracto", "Concepto", "Monto", "Motivo", "Movimiento existente", "Fecha existente", "Monto existente"],
      ...proposed
        .map((t) => ({ t, match: matchFor(t) }))
        .filter(({ match }) => match.motivo !== "no_registrado" && match.motivo !== "conciliado")
        .map(({ t, match }) => [
          t.date,
          t.concept,
          t.amount,
          MOTIVO_LABELS[match.motivo],
          match.movement?.concept ?? "",
          match.movement?.entry_date ?? "",
          match.movement ? Number(match.movement.amount) : "",
        ]),
    ];
    downloadCsv(`discrepancias-conciliacion-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  }

  async function confirmProposed() {
    if (!proposed || !allSplitsValid()) return;
    setSaving(true);
    for (let i = 0; i < proposed.length; i++) {
      const t = proposed[i];
      const match = matchFor(t);
      const resolution = resolutionFor(t, i);

      if (resolution === "reconcile" && match.movement) {
        await supabase.from("treasury_movements").update({ reconciled: true }).eq("id", match.movement.id);
        continue;
      }

      const category = rowCategoryFor(t.concept, i);
      const rowSplits = splitRows[i];
      await insertMovementWithSplits(
        {
          company_id: companyId,
          account_id: accountId,
          type: t.type,
          concept: t.concept,
          amount: t.amount,
          entry_date: t.date,
          source: "ai_statement",
          reconciled: true,
          created_by: userId,
        },
        rowSplits && rowSplits.length > 1 ? rowSplits : [{ category, amount: String(t.amount) }],
      );
    }
    await supabase.from("treasury_statement_imports").insert({
      company_id: companyId,
      account_id: accountId,
      method: "ai",
      file_name: file?.name ?? null,
      status: "reviewed",
      extracted_count: proposed.length,
      created_by: userId,
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
              Transacciones encontradas ({proposed.length}) — asigna categoría o divide cada una
            </p>
            <div className="max-h-80 space-y-2 overflow-y-auto border border-ink/10 bg-white p-2">
              {proposed.map((t, i) => {
                const match = matchFor(t);
                const resolution = resolutionFor(t, i);
                const showEditors = resolution === "new";
                return (
                  <div key={i} className="border-b border-ink/5 pb-2 last:border-b-0">
                    <div className="flex justify-between px-1 py-1 font-mono text-[0.68rem] text-ink">
                      <span>
                        {t.date} · {t.concept}
                      </span>
                      <span className={t.type === "ingreso" ? "text-teal" : "text-orange"}>
                        {t.type === "ingreso" ? "+" : "-"}${t.amount.toLocaleString("es-MX")}
                      </span>
                    </div>

                    {match.motivo === "conciliado" && (
                      <p className="mx-1 mb-1 border border-teal/40 bg-teal/10 px-2 py-1 font-mono text-[0.62rem] text-teal">
                        {MOTIVO_LABELS.conciliado} ("{match.movement?.concept}")
                      </p>
                    )}

                    {(match.motivo === "diferencia_fecha" || match.motivo === "diferencia_monto") && (
                      <div className="mx-1 mb-1 space-y-1 border border-orange/40 bg-orange/10 px-2 py-1.5 font-mono text-[0.62rem] text-orange">
                        <p>
                          {MOTIVO_LABELS[match.motivo]}: "{match.movement?.concept}" ·{" "}
                          {match.movement && formatDate(match.movement.entry_date)} · $
                          {match.movement && Number(match.movement.amount).toLocaleString("es-MX")}
                        </p>
                        <label className="flex items-center gap-2 text-ink">
                          <input
                            type="radio"
                            name={`resolution-${i}`}
                            checked={resolution === "reconcile"}
                            onChange={() => setRowResolution((prev) => ({ ...prev, [i]: "reconcile" }))}
                          />
                          Es el mismo movimiento — vincular y marcar conciliado
                        </label>
                        <label className="flex items-center gap-2 text-ink">
                          <input
                            type="radio"
                            name={`resolution-${i}`}
                            checked={resolution === "new"}
                            onChange={() => setRowResolution((prev) => ({ ...prev, [i]: "new" }))}
                          />
                          Es distinto — registrar como movimiento nuevo
                        </label>
                      </div>
                    )}

                    {showEditors && !splitRows[i] && (
                      <div className="px-1 pb-1">
                        <select
                          value={rowCategoryFor(t.concept, i)}
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
                    {showEditors && (
                      <div className="px-1">
                        <SplitEditor
                          total={t.amount}
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
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="font-mono text-[0.62rem] text-muted">
                {summary().conciliado} conciliado{summary().conciliado === 1 ? "" : "s"} automáticamente ·{" "}
                {summary().diferencia} con diferencia · {summary().nuevo} nuevo{summary().nuevo === 1 ? "" : "s"}
              </p>
              {summary().diferencia > 0 && (
                <button
                  onClick={downloadDiscrepancyReport}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Descargar discrepancias
                </button>
              )}
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
            <button onClick={confirmProposed} disabled={saving || !allSplitsValid()} className="btn btn-primary w-full">
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
