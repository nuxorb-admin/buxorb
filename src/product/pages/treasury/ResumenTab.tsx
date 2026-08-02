import { useState } from "react";
import type { TreasuryAccount, TreasuryCategory, TreasuryMovement } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";

type Granularity = "dia" | "semana" | "mes";
type Bucket = "ingreso" | "fijo" | "variable" | "operativo";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

function signedMoney(n: number) {
  return n < 0 ? `-${money(Math.abs(n))}` : money(n);
}

function totals(movements: TreasuryMovement[]) {
  const entradas = movements.filter((m) => m.type === "ingreso").reduce((sum, m) => sum + Number(m.amount), 0);
  const salidas = movements.filter((m) => m.type === "egreso").reduce((sum, m) => sum + Number(m.amount), 0);
  return { entradas, salidas, disponible: entradas - salidas };
}

// Semana anclada al lunes — más simple que el número de semana ISO real y
// igual de útil para agrupar, se muestra como "semana del <lunes>".
function weekKey(entryDate: string): string {
  const d = new Date(entryDate + "T00:00:00");
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return d.toISOString().slice(0, 10);
}

function periodKey(m: TreasuryMovement, granularity: Granularity): string {
  if (granularity === "dia") return m.entry_date;
  if (granularity === "semana") return weekKey(m.entry_date);
  return m.entry_date.slice(0, 7);
}

function periodLabel(key: string, granularity: Granularity): string {
  if (granularity === "semana") return `Sem. ${new Date(key + "T00:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}`;
  if (granularity === "mes") return new Date(key + "-01T00:00:00").toLocaleDateString("es-MX", { year: "2-digit", month: "short" });
  return new Date(key + "T00:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
}

const PERIOD_LIMIT: Record<Granularity, number> = { dia: 14, semana: 12, mes: 12 };

function monthOverMonth(movements: TreasuryMovement[], count: number) {
  const byMonth = new Map<string, TreasuryMovement[]>();
  for (const m of movements) byMonth.set(m.entry_date.slice(0, 7), [...(byMonth.get(m.entry_date.slice(0, 7)) ?? []), m]);
  const months = [...byMonth.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, count)
    .map(([key, ms]) => ({ key, label: periodLabel(key, "mes"), ...totals(ms) }));
  return months.map((m, i) => {
    const prev = months[i + 1];
    const pct = prev && prev.disponible !== 0 ? ((m.disponible - prev.disponible) / Math.abs(prev.disponible)) * 100 : null;
    return { ...m, pct };
  });
}

function bucketFor(category: string, categories: TreasuryCategory[]): Bucket {
  const cat = categories.find((c) => c.name === category);
  if (!cat) return "operativo";
  if (cat.kind === "ingreso") return "ingreso";
  if (cat.naturaleza === "fijo" || cat.naturaleza === "variable") return cat.naturaleza;
  return "operativo";
}

function signedAmount(m: TreasuryMovement) {
  return m.type === "ingreso" ? Number(m.amount) : -Number(m.amount);
}

interface CategoryRow {
  category: string;
  bucket: Bucket;
  values: number[];
  total: number;
}

const BUCKET_LABELS: Record<Bucket, string> = {
  ingreso: "Ingresos",
  fijo: "Egresos fijos",
  variable: "Egresos variables",
  operativo: "Egresos operativos",
};

export default function ResumenTab({
  movements,
  accounts,
  categories,
  limits,
}: {
  movements: TreasuryMovement[];
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  limits: TreasuryTierLimits;
}) {
  const [granularity, setGranularity] = useState<Granularity>("mes");
  const overall = totals(movements);
  const months = limits.monthComparison ? monthOverMonth(movements, 6) : [];

  // Columnas: períodos según el filtro, en orden ascendente (más viejo a la
  // izquierda, más reciente a la derecha, como un estado financiero normal).
  const periodKeys = [...new Set(movements.map((m) => periodKey(m, granularity)))]
    .sort()
    .slice(-PERIOD_LIMIT[granularity]);

  // Filas: una por categoría con movimientos, agrupada por su naturaleza.
  const categoryNames = [...new Set(movements.map((m) => m.category))];
  const rows: CategoryRow[] = categoryNames.map((category) => {
    const values = periodKeys.map((key) =>
      movements.filter((m) => m.category === category && periodKey(m, granularity) === key).reduce((sum, m) => sum + signedAmount(m), 0),
    );
    return { category, bucket: bucketFor(category, categories), values, total: values.reduce((s, v) => s + v, 0) };
  });

  function bucketRows(bucket: Bucket) {
    return rows.filter((r) => r.bucket === bucket).sort((a, b) => b.total - a.total);
  }
  function bucketSubtotal(bucket: Bucket) {
    const values = periodKeys.map((_, i) => bucketRows(bucket).reduce((sum, r) => sum + r.values[i], 0));
    return { values, total: values.reduce((s, v) => s + v, 0) };
  }

  const ingresos = bucketSubtotal("ingreso");
  const fijos = bucketSubtotal("fijo");
  const variables = bucketSubtotal("variable");
  const utilidadOperativa = {
    values: periodKeys.map((_, i) => ingresos.values[i] + fijos.values[i] + variables.values[i]),
    total: ingresos.total + fijos.total + variables.total,
  };
  const operativos = bucketSubtotal("operativo");
  const flujoNeto = {
    values: periodKeys.map((_, i) => utilidadOperativa.values[i] + operativos.values[i]),
    total: utilidadOperativa.total + operativos.total,
  };

  function downloadReport() {
    const rowsCsv: (string | number)[][] = [
      ["Fecha", "Concepto", "Categoría", "Tipo", "Cuenta", "Monto"],
      ...movements.map((m) => [
        m.entry_date,
        m.concept,
        m.category,
        m.type,
        accounts.find((a) => a.id === m.account_id)?.name ?? "",
        Number(m.amount),
      ]),
    ];
    downloadCsv(`flujo-de-caja-${new Date().toISOString().slice(0, 10)}.csv`, rowsCsv);
  }

  function Row({ label, values, total, bold, tone }: { label: string; values: number[]; total: number; bold?: boolean; tone?: "up" | "down" }) {
    return (
      <tr className={bold ? "bg-sand-2 font-bold" : ""}>
        <td className="whitespace-nowrap px-3 py-2 text-sm capitalize text-ink">{label}</td>
        {values.map((v, i) => (
          <td
            key={i}
            className={`whitespace-nowrap px-3 py-2 text-right font-mono text-xs ${
              v < 0 ? "text-orange" : v > 0 ? "text-teal" : "text-muted"
            }`}
          >
            {signedMoney(v)}
          </td>
        ))}
        <td
          className={`whitespace-nowrap border-l border-ink/10 px-3 py-2 text-right font-mono text-xs font-bold ${
            tone === "down" || total < 0 ? "text-orange" : tone === "up" || total > 0 ? "text-teal" : "text-ink"
          }`}
        >
          {signedMoney(total)}
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <button
          onClick={downloadReport}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
        >
          ↓ Descargar reporte
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 border border-ink/15 bg-ink p-6 text-white">
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Entradas</span>
          <span className="mt-1 block font-display text-2xl">{money(overall.entradas)}</span>
        </div>
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Salidas</span>
          <span className="mt-1 block font-display text-2xl">{money(overall.salidas)}</span>
        </div>
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Disponible</span>
          <span className="mt-1 block font-display text-2xl text-teal">{money(overall.disponible)}</span>
        </div>
      </div>

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Flujo de caja consolidado
        </h3>
        <div className="flex gap-1 border border-ink/15">
          {(["dia", "semana", "mes"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => setGranularity(g)}
              className={`px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${
                granularity === g ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              {g === "dia" ? "Día" : g === "semana" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
      </div>

      {periodKeys.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin movimientos todavía.</p>
      ) : (
        <div className="overflow-x-auto border border-ink/10 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="whitespace-nowrap px-3 py-2 text-left font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                  Categoría
                </th>
                {periodKeys.map((key) => (
                  <th key={key} className="whitespace-nowrap px-3 py-2 text-right font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                    {periodLabel(key, granularity)}
                  </th>
                ))}
                <th className="whitespace-nowrap border-l border-ink/10 px-3 py-2 text-right font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              <tr>
                <td colSpan={periodKeys.length + 2} className="px-3 pt-3 pb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {BUCKET_LABELS.ingreso}
                </td>
              </tr>
              {bucketRows("ingreso").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total ingresos" values={ingresos.values} total={ingresos.total} bold />

              <tr>
                <td colSpan={periodKeys.length + 2} className="px-3 pt-3 pb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {BUCKET_LABELS.fijo}
                </td>
              </tr>
              {bucketRows("fijo").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total fijos" values={fijos.values} total={fijos.total} bold />

              <tr>
                <td colSpan={periodKeys.length + 2} className="px-3 pt-3 pb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {BUCKET_LABELS.variable}
                </td>
              </tr>
              {bucketRows("variable").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total variables" values={variables.values} total={variables.total} bold />

              <Row label="Utilidad operativa" values={utilidadOperativa.values} total={utilidadOperativa.total} bold />

              <tr>
                <td colSpan={periodKeys.length + 2} className="px-3 pt-3 pb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {BUCKET_LABELS.operativo}
                </td>
              </tr>
              {bucketRows("operativo").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total operativos" values={operativos.values} total={operativos.total} bold />

              <tr className="border-t-2 border-ink">
                <td colSpan={periodKeys.length + 2}>
                  <div />
                </td>
              </tr>
              <Row label="Flujo neto de caja" values={flujoNeto.values} total={flujoNeto.total} bold />
            </tbody>
          </table>
        </div>
      )}

      {limits.monthComparison && (
        <>
          <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Comparativo mes a mes
          </h3>
          {months.length === 0 ? (
            <p className="font-mono text-xs text-muted">Sin movimientos todavía.</p>
          ) : (
            <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
              {months.map((m) => (
                <div key={m.key} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="font-mono text-xs capitalize uppercase tracking-[0.06em] text-ink">{m.label}</span>
                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span className="font-bold text-ink">{money(m.disponible)}</span>
                    {m.pct !== null && (
                      <span className={m.pct >= 0 ? "text-teal" : "text-orange"}>
                        {m.pct >= 0 ? "▲" : "▼"} {Math.abs(m.pct).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {limits.perAccountView && accounts.length > 0 && (
        <>
          <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Por cuenta
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {accounts.map((a) => {
              const t = totals(movements.filter((m) => m.account_id === a.id));
              return (
                <div key={a.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm font-semibold text-ink">{a.name}</span>
                  <span className="font-mono text-sm font-bold text-ink">{money(t.disponible)}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
