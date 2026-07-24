import type { TreasuryAccount, TreasuryMovement } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

function totals(movements: TreasuryMovement[]) {
  const entradas = movements.filter((m) => m.type === "ingreso").reduce((sum, m) => sum + Number(m.amount), 0);
  const salidas = movements.filter((m) => m.type === "egreso").reduce((sum, m) => sum + Number(m.amount), 0);
  return { entradas, salidas, disponible: entradas - salidas };
}

function lastMonths(movements: TreasuryMovement[], count: number) {
  const byMonth = new Map<string, TreasuryMovement[]>();
  for (const m of movements) {
    const key = m.entry_date.slice(0, 7);
    byMonth.set(key, [...(byMonth.get(key) ?? []), m]);
  }
  return [...byMonth.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, count)
    .map(([month, ms]) => ({ month, ...totals(ms) }));
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
  const overall = totals(movements);
  const months = lastMonths(movements, 6);

  return (
    <div>
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

      <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Comparativo mes a mes
      </h3>
      {months.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin movimientos todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {months.map((m) => (
            <div key={m.month} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-ink">{m.month}</span>
              <div className="flex gap-4 font-mono text-xs">
                <span className="text-teal">+{money(m.entradas)}</span>
                <span className="text-orange">-{money(m.salidas)}</span>
                <span className="font-bold text-ink">{money(m.disponible)}</span>
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
