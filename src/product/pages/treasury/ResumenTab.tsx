import { useState } from "react";
import type { TreasuryAccount, TreasuryMovement } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";

type Granularity = "dia" | "semana" | "mes";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
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
  if (granularity === "semana") return `Semana del ${new Date(key + "T00:00:00").toLocaleDateString("es-MX")}`;
  if (granularity === "mes") return new Date(key + "-01T00:00:00").toLocaleDateString("es-MX", { year: "numeric", month: "long" });
  return new Date(key + "T00:00:00").toLocaleDateString("es-MX");
}

const PERIOD_LIMIT: Record<Granularity, number> = { dia: 14, semana: 12, mes: 12 };

function groupByPeriod(movements: TreasuryMovement[], granularity: Granularity) {
  const byPeriod = new Map<string, TreasuryMovement[]>();
  for (const m of movements) {
    const key = periodKey(m, granularity);
    byPeriod.set(key, [...(byPeriod.get(key) ?? []), m]);
  }
  return [...byPeriod.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, PERIOD_LIMIT[granularity])
    .map(([key, ms]) => ({ key, label: periodLabel(key, granularity), ...totals(ms) }));
}

function monthOverMonth(movements: TreasuryMovement[], count: number) {
  const months = groupByPeriod(movements, "mes").slice(0, count);
  return months.map((m, i) => {
    const prev = months[i + 1];
    const pct = prev && prev.disponible !== 0 ? ((m.disponible - prev.disponible) / Math.abs(prev.disponible)) * 100 : null;
    return { ...m, pct };
  });
}

function byCategory(movements: TreasuryMovement[]) {
  const map = new Map<string, { entradas: number; salidas: number }>();
  for (const m of movements) {
    const row = map.get(m.category) ?? { entradas: 0, salidas: 0 };
    if (m.type === "ingreso") row.entradas += Number(m.amount);
    else row.salidas += Number(m.amount);
    map.set(m.category, row);
  }
  return [...map.entries()]
    .map(([category, r]) => ({ category, ...r, total: r.entradas + r.salidas }))
    .sort((a, b) => b.total - a.total);
}

export default function ResumenTab({
  movements,
  accounts,
  limits,
}: {
  movements: TreasuryMovement[];
  accounts: TreasuryAccount[];
  limits: TreasuryTierLimits;
}) {
  const [granularity, setGranularity] = useState<Granularity>("mes");
  const overall = totals(movements);
  const periods = groupByPeriod(movements, granularity);
  const months = limits.monthComparison ? monthOverMonth(movements, 6) : [];
  const categories = byCategory(movements);

  function downloadReport() {
    const rows: (string | number)[][] = [
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
    downloadCsv(`flujo-de-caja-${new Date().toISOString().slice(0, 10)}.csv`, rows);
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
      {periods.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin movimientos todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {periods.map((p) => (
            <div key={p.key} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="font-mono text-xs capitalize uppercase tracking-[0.06em] text-ink">{p.label}</span>
              <div className="flex gap-4 font-mono text-xs">
                <span className="text-teal">+{money(p.entradas)}</span>
                <span className="text-orange">-{money(p.salidas)}</span>
                <span className="font-bold text-ink">{money(p.disponible)}</span>
              </div>
            </div>
          ))}
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

      <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Por categoría
      </h3>
      {categories.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin movimientos todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {categories.map((c) => (
            <div key={c.category} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm font-semibold capitalize text-ink">{c.category}</span>
              <div className="flex gap-4 font-mono text-xs">
                {c.entradas > 0 && <span className="text-teal">+{money(c.entradas)}</span>}
                {c.salidas > 0 && <span className="text-orange">-{money(c.salidas)}</span>}
              </div>
            </div>
          ))}
        </div>
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
