import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ProductContext } from "../ProductLayout";
import { useComprasData } from "./compras/useComprasData";
import CicloCompraTab from "./compras/CicloCompraTab";
import FacturasCxCTab from "./compras/FacturasCxCTab";
import ProveedoresTab from "./compras/ProveedoresTab";

type Tab = "ciclo" | "facturas" | "proveedores";

export default function Compras() {
  const { scopeId: companyId } = useOutletContext<ProductContext>();
  const {
    loading,
    tier,
    limits,
    proveedores,
    departamentos,
    settings,
    compras,
    requisiciones,
    reglasAprobacion,
    companyUsers,
    evaluaciones,
    ticketsUsados,
    reload,
  } = useComprasData(companyId);
  const [tab, setTab] = useState<Tab>("ciclo");

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "ciclo", label: "Ciclo de compra" },
    { id: "facturas", label: "Facturas y CxC" },
    { id: "proveedores", label: "Proveedores" },
  ];

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Compras y Proveedores</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : "Professional"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Del pedido a la cuenta por pagar</p>

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
        {tab === "ciclo" && (
          <CicloCompraTab
            companyId={companyId}
            proveedores={proveedores}
            departamentos={departamentos}
            requisiciones={requisiciones}
            reglasAprobacion={reglasAprobacion}
            compras={compras}
            settings={settings}
            limits={limits}
            companyUserCount={companyUsers.length}
            reload={reload}
          />
        )}
        {tab === "facturas" && (
          <FacturasCxCTab
            companyId={companyId}
            proveedores={proveedores}
            compras={compras}
            limits={limits}
            ticketsUsados={ticketsUsados}
            reload={reload}
          />
        )}
        {tab === "proveedores" && (
          <ProveedoresTab
            companyId={companyId}
            proveedores={proveedores}
            compras={compras}
            evaluaciones={evaluaciones}
            limits={limits}
            reload={reload}
          />
        )}
      </div>
    </div>
  );
}
