import { useState } from "react";
import type { TreasuryAccount, TreasuryCategory, TreasuryMovement, TreasuryMovementSplit } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import { downloadCsv } from "./parseCsv";

type Granularity = "dia" | "mes";
type Bucket =
  | "ingreso"
  | "costo_venta"
  | "gasto_venta"
  | "gasto_administrativo"
  | "gasto_financiero"
  | "impuesto"
  | "pendiente";

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

function periodKey(m: { entry_date: string }, granularity: Granularity): string {
  return granularity === "dia" ? m.entry_date : m.entry_date.slice(0, 7);
}

// Primer día calendario que cubre una columna — para "mes" es el día 1 de
// ese mes, para "dia" es la fecha misma.
function periodStartDate(key: string, granularity: Granularity): string {
  return granularity === "mes" ? `${key}-01` : key;
}

// Saldo de una cuenta justo antes de `beforeDate`: su saldo inicial (si ya
// "empezó a contar" — beforeDate es posterior a la fecha de su saldo
// inicial) más los movimientos entre esa fecha y beforeDate. Una cuenta
// cuya fecha de saldo inicial todavía no llega no aporta nada al saldo del
// rango que se está viendo.
function accountBalanceBefore(account: TreasuryAccount, movements: TreasuryMovement[], beforeDate: string): number {
  if (beforeDate < account.opening_balance_date) return 0;
  const priorMovements = movements.filter(
    (m) => m.account_id === account.id && m.entry_date >= account.opening_balance_date && m.entry_date < beforeDate,
  );
  const net = priorMovements.reduce((sum, m) => sum + (m.type === "ingreso" ? Number(m.amount) : -Number(m.amount)), 0);
  return Number(account.opening_balance) + net;
}

function balanceBefore(accounts: TreasuryAccount[], movements: TreasuryMovement[], beforeDate: string): number {
  return accounts.reduce((sum, a) => sum + accountBalanceBefore(a, movements, beforeDate), 0);
}

// Saldo inicial de la primera columna visible + saldo final de cada
// columna (que es el saldo inicial de la siguiente): saldo_final =
// saldo_inicial + ingresos del periodo - egresos del periodo.
function runningBalance(
  accounts: TreasuryAccount[],
  movements: TreasuryMovement[],
  periodKeys: string[],
  granularity: Granularity,
) {
  const saldoInicial: number[] = [];
  const saldoFinal: number[] = [];
  let running = periodKeys.length > 0 ? balanceBefore(accounts, movements, periodStartDate(periodKeys[0], granularity)) : 0;
  for (const key of periodKeys) {
    const t = totals(movements.filter((m) => periodKey(m, granularity) === key));
    saldoInicial.push(running);
    running = running + t.entradas - t.salidas;
    saldoFinal.push(running);
  }
  return { saldoInicial, saldoFinal };
}

interface LineItem {
  movement_id: string;
  entry_date: string;
  category: string;
  amount: number; // ya con signo (ingreso +, egreso -)
}

// Un movimiento sin splits es una sola línea con su categoría de siempre;
// uno dividido en 2+ categorías se expande en varias líneas que comparten
// fecha/tipo pero cada una con su propio monto — así el estado de
// resultados suma por categoría sin importar si viene de un solo
// movimiento bancario o de un split.
function buildLineItems(movements: TreasuryMovement[], splits: TreasuryMovementSplit[]): LineItem[] {
  const items: LineItem[] = [];
  for (const m of movements) {
    const ownSplits = splits.filter((s) => s.movement_id === m.id);
    if (ownSplits.length > 1) {
      for (const s of ownSplits) {
        items.push({
          movement_id: m.id,
          entry_date: m.entry_date,
          category: s.category,
          amount: m.type === "ingreso" ? Number(s.amount) : -Number(s.amount),
        });
      }
    } else {
      items.push({
        movement_id: m.id,
        entry_date: m.entry_date,
        category: m.category,
        amount: m.type === "ingreso" ? Number(m.amount) : -Number(m.amount),
      });
    }
  }
  return items;
}

function periodLabel(key: string, granularity: Granularity): string {
  if (granularity === "mes") return new Date(key + "-01T00:00:00").toLocaleDateString("es-MX", { year: "2-digit", month: "short" });
  return new Date(key + "T00:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
}

// Los 12 meses del año en curso, de enero a diciembre, tengan o no
// movimientos — mismo criterio que las columnas de fecha del estado de
// resultados (no desaparecen por falta de actividad).
function monthOverMonth(movements: TreasuryMovement[]) {
  const year = new Date().getFullYear();
  const byMonth = new Map<string, TreasuryMovement[]>();
  for (const m of movements) byMonth.set(m.entry_date.slice(0, 7), [...(byMonth.get(m.entry_date.slice(0, 7)) ?? []), m]);

  const months = Array.from({ length: 12 }, (_, i) => {
    const key = `${year}-${pad(i + 1)}`;
    return { key, label: periodLabel(key, "mes"), ...totals(byMonth.get(key) ?? []) };
  });

  return months.map((m, i) => {
    const prev = months[i - 1];
    const pct = prev && prev.disponible !== 0 ? ((m.disponible - prev.disponible) / Math.abs(prev.disponible)) * 100 : null;
    return { ...m, pct };
  });
}

function bucketFor(category: string, categories: TreasuryCategory[]): Bucket {
  const cat = categories.find((c) => c.name === category);
  if (!cat) return "gasto_administrativo";
  if (cat.kind === "ingreso") return "ingreso";
  if (cat.grupo && cat.grupo !== "ingreso") return cat.grupo;
  return "gasto_administrativo";
}

interface CategoryRow {
  category: string;
  bucket: Bucket;
  orden: number;
  values: number[];
  total: number;
}

const BUCKET_LABELS: Record<Bucket, string> = {
  ingreso: "Ingresos",
  costo_venta: "Costo de venta",
  gasto_venta: "Gastos de venta",
  gasto_administrativo: "Gastos administrativos",
  gasto_financiero: "Gastos financieros",
  impuesto: "Impuestos",
  pendiente: "Pendiente de clasificar",
};

export default function ResumenTab({
  movements,
  splits,
  accounts,
  categories,
  limits,
}: {
  movements: TreasuryMovement[];
  splits: TreasuryMovementSplit[];
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  limits: TreasuryTierLimits;
}) {
  const [granularity, setGranularity] = useState<Granularity>("dia");
  const [dayRange, setDayRange] = useState(currentMonthDayRange);
  const [monthRange, setMonthRange] = useState(defaultMonthRange);
  // Vista por cuenta bancaria: exclusiva de Professional (limits.perAccountView).
  // Essential siempre ve todas sus cuentas consolidadas — ni siquiera se le
  // muestra el selector, no solo se le deshabilita.
  const [accountFilter, setAccountFilter] = useState<string>("all");

  const scopedMovements =
    limits.perAccountView && accountFilter !== "all" ? movements.filter((m) => m.account_id === accountFilter) : movements;
  const scopedAccounts =
    limits.perAccountView && accountFilter !== "all" ? accounts.filter((a) => a.id === accountFilter) : accounts;

  const overall = totals(scopedMovements);
  const months = limits.monthComparison ? monthOverMonth(scopedMovements) : [];

  // Un movimiento dividido en categorías se expande a varias líneas aquí —
  // el estado de resultados suma por categoría sin importar si el monto
  // viene completo de un movimiento o repartido entre varios splits.
  const lineItems = buildLineItems(scopedMovements, splits);

  // Categorías que ya no están en el catálogo (borradas, renombradas, o de
  // un movimiento importado con un nombre que nunca existió) no se pierden
  // — se agrupan en "Pendiente de clasificar" hasta que el usuario las
  // corrija en Movimientos.
  const validLineItems = lineItems.filter((li) => categories.some((c) => c.name === li.category));
  const unrecognizedLineItems = lineItems.filter((li) => !categories.some((c) => c.name === li.category));
  const unrecognizedCount = new Set(unrecognizedLineItems.map((li) => li.movement_id)).size;
  const unrecognizedCategoryNames = [...new Set(unrecognizedLineItems.map((li) => li.category))];

  const periodKeys =
    granularity === "dia" ? enumerateDays(dayRange.start, dayRange.end) : enumerateMonths(monthRange.start, monthRange.end);

  // Saldo corrido: saldo inicial de la primera columna sale del saldo
  // inicial configurado en cada cuenta (más los movimientos entre esa
  // fecha y el inicio del rango visible); de ahí, saldo_final = saldo_
  // inicial + ingresos - egresos del periodo, y ese saldo_final es el
  // saldo_inicial del periodo siguiente.
  const { saldoInicial, saldoFinal } = runningBalance(scopedAccounts, scopedMovements, periodKeys, granularity);

  // Una fila por cada categoría del catálogo, tenga o no movimientos en el
  // rango visible — igual que las columnas de fecha, no desaparecen por
  // falta de actividad.
  const catalogRows: CategoryRow[] = categories.map((cat) => {
    const values = periodKeys.map((key) =>
      validLineItems
        .filter((li) => li.category === cat.name && periodKey(li, granularity) === key)
        .reduce((sum, li) => sum + li.amount, 0),
    );
    return {
      category: cat.name,
      bucket: bucketFor(cat.name, categories),
      orden: cat.orden,
      values,
      total: values.reduce((s, v) => s + v, 0),
    };
  });

  const pendienteRows: CategoryRow[] = unrecognizedCategoryNames.map((name, i) => {
    const values = periodKeys.map((key) =>
      unrecognizedLineItems
        .filter((li) => li.category === name && periodKey(li, granularity) === key)
        .reduce((sum, li) => sum + li.amount, 0),
    );
    return { category: name, bucket: "pendiente" as Bucket, orden: i, values, total: values.reduce((s, v) => s + v, 0) };
  });

  const rows: CategoryRow[] = [...catalogRows, ...pendienteRows];

  function bucketRows(bucket: Bucket) {
    return rows.filter((r) => r.bucket === bucket).sort((a, b) => a.orden - b.orden);
  }
  function bucketSubtotal(bucket: Bucket) {
    const values = periodKeys.map((_, i) => bucketRows(bucket).reduce((sum, r) => sum + r.values[i], 0));
    return { values, total: values.reduce((s, v) => s + v, 0) };
  }

  function combine(...parts: { values: number[]; total: number }[]) {
    return {
      values: periodKeys.map((_, i) => parts.reduce((sum, p) => sum + p.values[i], 0)),
      total: parts.reduce((sum, p) => sum + p.total, 0),
    };
  }

  // Los egresos ya llegan en negativo desde buildLineItems() — sumar los
  // subtotales de grupo directamente resta correctamente, sin negarlos de
  // nuevo.
  const ingresos = bucketSubtotal("ingreso");
  const costoVenta = bucketSubtotal("costo_venta");
  const utilidadBruta = combine(ingresos, costoVenta);

  const gastosVenta = bucketSubtotal("gasto_venta");
  const gastosAdmin = bucketSubtotal("gasto_administrativo");
  const utilidadOperativa = combine(utilidadBruta, gastosVenta, gastosAdmin);

  const gastosFinancieros = bucketSubtotal("gasto_financiero");
  const utilidadAntesImpuestos = combine(utilidadOperativa, gastosFinancieros);

  const impuestos = bucketSubtotal("impuesto");
  const utilidadAntesDePendientes = combine(utilidadAntesImpuestos, impuestos);

  const pendiente = bucketSubtotal("pendiente");
  const utilidadNeta = combine(utilidadAntesDePendientes, pendiente);

  function downloadReport() {
    const rowsCsv: (string | number)[][] = [
      ["Fecha", "Concepto", "Categoría", "Tipo", "Cuenta", "Monto"],
      ...scopedMovements.map((m) => [
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
    // Colores sólidos (sin canal alfa) a propósito: las columnas fija
    // (categoría y total) van con sticky encima de las columnas que sí
    // hacen scroll, y un fondo translúcido dejaría ver los números pasar
    // por detrás.
    const rowBg = emphasis === "headline" ? "bg-[#f3f8f8]" : emphasis === "subtotal" ? "bg-sand-2" : "bg-white";
    const labelClass =
      emphasis === "detail"
        ? "text-[0.8rem] font-normal text-muted"
        : emphasis === "subtotal"
          ? "text-[0.8rem] font-bold text-ink"
          : "text-sm font-bold text-ink";
    const topBorder = emphasis === "headline" ? "border-t-2 border-ink" : emphasis === "subtotal" ? "border-t border-ink/10" : "";
    // Filas de detalle bien compactas (~19px) y subtotales un poco más
    // altos (~26px) para que quepan más categorías sin scroll vertical,
    // conservando un escalón de jerarquía entre detalle y subtotal.
    const vPad =
      emphasis === "detail" ? "py-0 leading-[19px]" : emphasis === "subtotal" ? "py-0 leading-[26px]" : "py-2.5";
    return (
      <tr className={`${rowBg} ${topBorder}`}>
        <td className={`sticky left-0 z-10 whitespace-nowrap border-r border-ink/10 px-3 ${vPad} ${rowBg} ${topBorder} ${labelClass}`}>
          {label}
        </td>
        {values.map((v, i) => (
          <td
            key={i}
            className={`whitespace-nowrap px-3 ${vPad} text-right font-mono text-xs ${topBorder} ${rowBg} ${
              emphasis !== "detail" ? "font-bold" : ""
            } ${v < 0 ? "text-orange" : v > 0 ? "text-teal" : "text-muted/50"}`}
          >
            {cellValue(v)}
          </td>
        ))}
        <td
          className={`sticky right-0 z-10 whitespace-nowrap border-l border-ink/10 px-3 ${vPad} text-right font-mono text-xs font-bold ${topBorder} ${rowBg} ${
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
          {unrecognizedCount} movimiento{unrecognizedCount === 1 ? "" : "s"} con categoría no reconocida — aparece
          {unrecognizedCount === 1 ? "" : "n"} bajo "Pendiente de clasificar" al final del estado. Corrígelo
          {unrecognizedCount === 1 ? "" : "s"} en Movimientos cuando puedas.
        </div>
      )}

      <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            {accountFilter === "all" ? "Flujo de caja consolidado" : "Flujo de caja"}
          </h3>
          {limits.perAccountView && accounts.length > 1 && (
            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="border border-ink/15 bg-sand-2 px-2 py-1 font-mono text-[0.68rem] text-ink focus:border-teal focus:outline-none"
            >
              <option value="all">Todas las cuentas</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          )}
        </div>
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
                <th className="sticky right-0 z-20 whitespace-nowrap border-b border-l border-ink/10 bg-white px-3 py-2 text-right font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <Row
                label="Saldo inicial"
                values={saldoInicial}
                total={saldoInicial[0] ?? 0}
                emphasis="headline"
              />

              <GroupHeader label={BUCKET_LABELS.ingreso} first />
              {bucketRows("ingreso").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total ingresos" values={ingresos.values} total={ingresos.total} emphasis="subtotal" />

              <GroupHeader label={BUCKET_LABELS.costo_venta} />
              {bucketRows("costo_venta").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total costo de venta" values={costoVenta.values} total={costoVenta.total} emphasis="subtotal" />

              <Row label="Utilidad bruta" values={utilidadBruta.values} total={utilidadBruta.total} emphasis="headline" />

              <GroupHeader label={BUCKET_LABELS.gasto_venta} />
              {bucketRows("gasto_venta").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total gastos de venta" values={gastosVenta.values} total={gastosVenta.total} emphasis="subtotal" />

              <GroupHeader label={BUCKET_LABELS.gasto_administrativo} />
              {bucketRows("gasto_administrativo").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row
                label="Total gastos administrativos"
                values={gastosAdmin.values}
                total={gastosAdmin.total}
                emphasis="subtotal"
              />

              <Row label="Utilidad operativa" values={utilidadOperativa.values} total={utilidadOperativa.total} emphasis="headline" />

              <GroupHeader label={BUCKET_LABELS.gasto_financiero} />
              {bucketRows("gasto_financiero").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row
                label="Total gastos financieros"
                values={gastosFinancieros.values}
                total={gastosFinancieros.total}
                emphasis="subtotal"
              />

              <Row
                label="Utilidad antes de impuestos"
                values={utilidadAntesImpuestos.values}
                total={utilidadAntesImpuestos.total}
                emphasis="headline"
              />

              <GroupHeader label={BUCKET_LABELS.impuesto} />
              {bucketRows("impuesto").map((r) => (
                <Row key={r.category} label={r.category} values={r.values} total={r.total} />
              ))}
              <Row label="Total impuestos" values={impuestos.values} total={impuestos.total} emphasis="subtotal" />

              {pendienteRows.length > 0 && (
                <>
                  <GroupHeader label={BUCKET_LABELS.pendiente} />
                  {bucketRows("pendiente").map((r) => (
                    <Row key={r.category} label={r.category} values={r.values} total={r.total} />
                  ))}
                  <Row
                    label="Total pendiente de clasificar"
                    values={pendiente.values}
                    total={pendiente.total}
                    emphasis="subtotal"
                  />
                </>
              )}

              <Row label="Utilidad neta" values={utilidadNeta.values} total={utilidadNeta.total} emphasis="headline" />

              <Row
                label="Saldo final"
                values={saldoFinal}
                total={saldoFinal[saldoFinal.length - 1] ?? 0}
                emphasis="headline"
              />
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

    </div>
  );
}
