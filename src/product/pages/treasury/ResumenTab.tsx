import { useState } from "react";
import type { TreasuryAccount, TreasuryCategory, TreasuryMovement } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";

type Granularity = "dia" | "mes";
type Bucket = "ingreso" | "fijo" | "variable" | "operativo";

const MAX_DAYS = 366;
const MAX_MONTHS = 60;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

function signedMoney(n: number) {
  return n < 0 ? `-${money(Math.abs(n))}` : money(n);
}

// "$0" repetido en cada columna vacía es puro ruido visual en una tabla con
// muchas fechas — un guión es la convención estándar en estados financieros
// para "sin movimiento" y se lee mucho más rápido de un vistazo.
function cellValue(n: number) {
  return n === 0 ? "–" : signedMoney(n);
}

function totals(movements: TreasuryMovement[]) {
  const entradas = movements.filter((m) => m.type === "ingreso").reduce((sum, m) => sum + Number(m.amount), 0);
  const salidas = movements.filter((m) => m.type === "egreso").reduce((sum, m) => sum + Number(m.amount), 0);
  return { entradas, salidas, disponible: entradas - salidas };
}

function currentMonthDayRange(): { start: string; end: string } {
  const now = new Date();
  const start = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const end = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(lastDay)}`;
  return { start, end };
}

function defaultMonthRange(): { start: string; end: string } {
  const now = new Date();
  const end = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  const startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const start = `${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}`;
  return { start, end };
}

function enumerateDays(start: string, end: string): string[] {
  const out: string[] = [];
  const d = new Date(start + "T00:00:00");
  const endD = new Date(end + "T00:00:00");
  if (Number.isNaN(d.getTime()) || Number.isNaN(endD.getTime()) || d > endD) return out;
  while (d <= endD && out.length < MAX_DAYS) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function enumerateMonths(start: string, end: string): string[] {
  const out: string[] = [];
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  if (!sy || !sm || !ey || !em) return out;
  let y = sy;
  let m = sm;
  while ((y < ey || (y === ey && m <= em)) && out.length < MAX_MONTHS) {
    out.push(`${y}-${pad(m)}`);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}

function periodKey(m: TreasuryMovement, granularity: Granularity): string {
  return granularity === "dia" ? m.entry_date : m.entry_date.slice(0, 7);
}

function periodLabel(key: string, granularity: Granularity): string {
  if (granularity === "mes") return new Date(key + "-01T00:00:00").toLocaleDateString("es-MX", { year: "2-digit", month: "short" });
  return new Date(key + "T00:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
}

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
  const [granularity, setGranularity] = useState<Granularity>("dia");
  const [dayRange, setDayRange] = useState(currentMonthDayRange);
  const [monthRange, setMonthRange] = useState(defaultMonthRange);

  const overall = totals(movements);
  const months = limits.monthComparison ? monthOverMonth(movements, 6) : [];

  // Solo categorías que existen hoy en el catálogo — un movimiento con una
  // categoría que ya no está en el catálogo no se suma en ningún lado del
  // reporte; se avisa aparte para que el usuario lo corrija en Movimientos.
  const validMovements = movements.filter((m) => categories.some((c) => c.name === m.category));
  const unrecognizedCount = movements.length - validMovements.length;

  const periodKeys =
    granularity === "dia" ? enumerateDays(dayRange.start, dayRange.end) : enumerateMonths(monthRange.start, monthRange.end);

  const categoryNames = [...new Set(validMovements.map((m) => m.category))];
  const rows: CategoryRow[] = categoryNames.map((category) => {
    const values = periodKeys.map((key) =>
      validMovements
        .filter((m) => m.category === category && periodKey(m, granularity) === key)
        .reduce((sum, m) => sum + signedAmount(m), 0),
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

  function Row({
    label,
    values,
    total,
    emphasis = "detail",
  }: {
    label: string;
    values: number[];
    total: number;
    emphasis?: "detail" | "subtotal" | "headline";
  }) {
    const rowBg = emphasis === "headline" ? "bg-teal/[0.06]" : emphasis === "subtotal" ? "bg-sand-2" : "bg-white";
    const labelClass =
      emphasis === "detail"
        ? "text-[0.8rem] font-normal text-muted"
        : emphasis === "subtotal"
          ? "text-[0.8rem] font-bold text-ink"
          : "text-sm font-bold text-ink";
    const topBorder = emphasis === "headline" ? "border-t-2 border-ink" : emphasis === "subtotal" ? "border-t border-ink/10" : "";
    return (
      <tr className={`${rowBg} ${topBorder}`}>
        <td className={`sticky left-0 z-10 whitespace-nowrap border-r border-ink/10 px-3 py-2.5 ${rowBg} ${topBorder} ${labelClass}`}>
          {label}
        </td>
        {values.map((v, i) => (
          <td
            key={i}
            className={`whitespace-nowrap px-3 py-2.5 text-right font-mono text-xs ${topBorder} ${rowBg} ${
              emphasis !== "detail" ? "font-bold" : ""
            } ${v < 0 ? "text-orange" : v > 0 ? "text-teal" : "text-muted/50"}`}
          >
            {cellValue(v)}
          </td>
        ))}
        <td
          className={`whitespace-nowrap border-l border-ink/10 px-3 py-2.5 text-right font-mono text-xs font-bold ${topBorder} ${rowBg} ${
            total < 0 ? "text-orange" : total > 0 ? "text-teal" : "text-muted/50"
          }`}
        >
          {cellValue(total)}
        </td>
      </tr>
    );
  }

  function GroupHeader({ label, first }: { label: string; first?: boolean }) {
    return (
      <tr>
        <td
          className={`sticky left-0 z-10 whitespace-nowrap border-r border-ink/10 bg-white px-3 pb-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted ${
            first ? "pt-3" : "pt-5"
          }`}
        >
          {label}
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

      {unrecognizedCount > 0 && (
        <div className="mt-4 border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">
          {unrecognizedCount} movimiento{unrecognizedCount === 1 ? "" : "s"} con categoría no reconocida — no se incluye
          {unrecognizedCount === 1 ? "" : "n"} en el flujo de caja. Corrígelo{unrecognizedCount === 1 ? "" : "s"} en
          Movimientos.
        </div>
      )}

      <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Flujo de caja consolidado
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {granularity === "dia" ? (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dayRange.start}
                onChange={(e) => setDayRange({ ...dayRange, start: e.target.value })}
                className="border border-ink/15 bg-sand-2 px-2 py-1 font-mono text-xs text-ink focus:border-teal focus:outline-none"
              />
              <span className="font-mono text-xs text-muted">a</span>
              <input
                type="date"
                value={dayRange.end}
                onChange={(e) => setDayRange({ ...dayRange, end: e.target.value })}
                className="border border-ink/15 bg-sand-2 px-2 py-1 font-mono text-xs text-ink focus:border-teal focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="month"
                value={monthRange.start}
                onChange={(e) => setMonthRange({ ...monthRange, start: e.target.value })}
                className="border border-ink/15 bg-sand-2 px-2 py-1 font-mono text-xs text-ink focus:border-teal focus:outline-none"
              />
              <span className="font-mono text-xs text-muted">a</span>
              <input
                type="month"
                value={monthRange.end}
                onChange={(e) => setMonthRange({ ...monthRange, end: e.target.value })}
                className="border border-ink/15 bg-sand-2 px-2 py-1 font-mono text-xs text-ink focus:border-teal focus:outline-none"
              />
            </div>
          )}
          <div className="flex gap-1 border border-ink/15">
            {(["dia", "mes"] as Granularity[]).map((g) => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${
                  granularity === g ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {g === "dia" ? "Día" : "Mes"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {periodKeys.length === 0 ? (
        <p className="font-mono text-xs text-muted">Elige un rango de fechas válido.</p>
      ) : (
        <div className="max-w-full overflow-x-auto border border-ink/10 bg-white">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 whitespace-nowrap border-b border-r border-ink/10 bg-white px-3 py-2 text-left font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                  Categoría
                </th>
                {periodKeys.map((key) => (
                  <th
                    key={key}
                    className="whitespace-nowrap border-b border-ink/10 px-3 py-2 text-right font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted"
                  >
                    {periodLabel(key, granularity)}
                  </th>
                ))}
                <th className="whitespace-nowrap border-b border-l border-ink/10 px-3 py-2 text-right font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <GroupHeader label={BUCKET_LABELS.ingreso} first />
              {bucketRows("ingreso").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total ingresos" values={ingresos.values} total={ingresos.total} emphasis="subtotal" />

              <GroupHeader label={BUCKET_LABELS.fijo} />
              {bucketRows("fijo").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total fijos" values={fijos.values} total={fijos.total} emphasis="subtotal" />

              <GroupHeader label={BUCKET_LABELS.variable} />
              {bucketRows("variable").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total variables" values={variables.values} total={variables.total} emphasis="subtotal" />

              <Row label="Utilidad operativa" values={utilidadOperativa.values} total={utilidadOperativa.total} emphasis="headline" />

              <GroupHeader label={BUCKET_LABELS.operativo} />
              {bucketRows("operativo").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total operativos" values={operativos.values} total={operativos.total} emphasis="subtotal" />

              <Row label="Flujo neto de caja" values={flujoNeto.values} total={flujoNeto.total} emphasis="headline" />
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
