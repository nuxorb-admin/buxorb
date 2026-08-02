import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ProductContext } from "../ProductLayout";
import { useTreasuryData } from "./treasury/useTreasuryData";
import ResumenTab from "./treasury/ResumenTab";
import MovimientosTab from "./treasury/MovimientosTab";
import CuentasTab from "./treasury/CuentasTab";
import ConciliacionTab from "./treasury/ConciliacionTab";
import CategoriasTab from "./treasury/CategoriasTab";

type Tab = "resumen" | "movimientos" | "cuentas" | "categorias" | "conciliacion";

export default function Tesoreria() {
  const { scopeId: companyId } = useOutletContext<ProductContext>();
  const { loading, tier, limits, accounts, categories, movements, splits, imports, proyectados, reload } =
    useTreasuryData(companyId);
  const [tab, setTab] = useState<Tab>("resumen");

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  // Solo categorías activas se ofrecen para capturar movimientos nuevos —
  // una desactivada sigue siendo válida para lo ya categorizado con ella.
  const activeCategories = categories.filter((c) => c.active);

  const tabs: { id: Tab; label: string }[] = [
    { id: "resumen", label: "Resumen" },
    { id: "movimientos", label: "Movimientos" },
    ...(limits.perAccountView ? [{ id: "cuentas" as Tab, label: "Cuentas" }] : []),
    ...(limits.customCategories ? [{ id: "categorias" as Tab, label: "Categorías" }] : []),
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
        {tab === "resumen" && (
          <ResumenTab movements={movements} splits={splits} accounts={accounts} categories={categories} limits={limits} />
        )}
        {tab === "movimientos" && (
          <MovimientosTab
            companyId={companyId}
            accounts={accounts}
            categories={categories}
            movements={movements}
            splits={splits}
            proyectados={proyectados}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "cuentas" && limits.perAccountView && (
          <CuentasTab companyId={companyId} accounts={accounts} categories={activeCategories} limits={limits} reload={reload} />
        )}
        {tab === "categorias" && limits.customCategories && (
          <CategoriasTab companyId={companyId} categories={categories} reload={reload} />
        )}
        {tab === "conciliacion" && (
          <ConciliacionTab
            companyId={companyId}
            accounts={accounts}
            categories={activeCategories}
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
