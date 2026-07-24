import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ProductContext } from "../ProductLayout";
import { useTreasuryData } from "./treasury/useTreasuryData";
import ResumenTab from "./treasury/ResumenTab";
import MovimientosTab from "./treasury/MovimientosTab";
import CuentasTab from "./treasury/CuentasTab";
import ConciliacionTab from "./treasury/ConciliacionTab";

type Tab = "resumen" | "movimientos" | "cuentas" | "conciliacion";

export default function Tesoreria() {
  const { scopeId: companyId } = useOutletContext<ProductContext>();
  const { loading, tier, limits, accounts, categories, movements, imports, reload } = useTreasuryData(companyId);
  const [tab, setTab] = useState<Tab>("resumen");

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "resumen", label: "Resumen" },
    { id: "movimientos", label: "Movimientos" },
    ...(limits.perAccountView ? [{ id: "cuentas" as Tab, label: "Cuentas" }] : []),
    { id: "conciliacion", label: "Conciliación" },
  ];

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Tesorería</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : "Professional"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">El dinero, claro y al día</p>

      <div className="mt-6 flex gap-1 border-b border-ink/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-colors ${
              tab === t.id ? "border-b-2 border-teal text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "resumen" && <ResumenTab movements={movements} accounts={accounts} limits={limits} />}
        {tab === "movimientos" && (
          <MovimientosTab companyId={companyId} accounts={accounts} categories={categories} movements={movements} reload={reload} />
        )}
        {tab === "cuentas" && limits.perAccountView && (
          <CuentasTab companyId={companyId} accounts={accounts} limits={limits} reload={reload} />
        )}
        {tab === "conciliacion" && (
          <ConciliacionTab
            companyId={companyId}
            accounts={accounts}
            movements={movements}
            imports={imports}
            limits={limits}
            reload={reload}
          />
        )}
      </div>
    </div>
  );
}
