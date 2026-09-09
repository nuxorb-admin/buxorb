import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ProductContext } from "../ProductLayout";
import { useComprasData } from "./compras/useComprasData";
import CicloCompraTab from "./compras/CicloCompraTab";
import FacturasCxCTab from "./compras/FacturasCxCTab";
import ProveedoresTab from "./compras/ProveedoresTab";
import CatalogoTab from "./compras/CatalogoTab";
import AlmacenesTab from "./compras/AlmacenesTab";
import ProrrateoTab from "./compras/ProrrateoTab";

type Tab = "ciclo" | "facturas" | "proveedores" | "catalogo" | "almacenes" | "prorrateo";

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
    facturas,
    requisiciones,
    reglasAprobacion,
    companyUsers,
    evaluaciones,
    ticketsUsados,
    productos,
    inventario,
    inventarioPorAlmacen,
    unidadesCatalogo,
    almacenes,
    almacenImplicitoId,
    prorrateoActivo,
    shipments,
    shipmentCosts,
    shipmentItems,
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
    { id: "catalogo", label: "Catálogo" },
    ...(limits.almacenesYTraspasos ? [{ id: "almacenes" as const, label: "Almacenes" }] : []),
    ...(prorrateoActivo ? [{ id: "prorrateo" as const, label: "Prorrateo" }] : []),
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
            productos={productos}
            almacenImplicitoId={almacenImplicitoId}
            reload={reload}
          />
        )}
        {tab === "facturas" && (
          <FacturasCxCTab
            companyId={companyId}
            proveedores={proveedores}
            compras={compras}
            facturas={facturas}
            productos={productos}
            unidadesActivas={unidadesCatalogo.filter((u) => (settings.unidades_activas ?? []).includes(u.codigo))}
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
        {tab === "catalogo" && (
          <CatalogoTab
            companyId={companyId}
            productos={productos}
            inventario={inventario}
            unidadesCatalogo={unidadesCatalogo}
            settings={settings}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "almacenes" && limits.almacenesYTraspasos && (
          <AlmacenesTab
            companyId={companyId}
            productos={productos}
            almacenes={almacenes}
            inventarioPorAlmacen={inventarioPorAlmacen}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "prorrateo" && prorrateoActivo && (
          <ProrrateoTab
            companyId={companyId}
            productos={productos}
            facturas={facturas}
            shipments={shipments}
            shipmentCosts={shipmentCosts}
            shipmentItems={shipmentItems}
            unidadesCatalogo={unidadesCatalogo}
            reload={reload}
          />
        )}
      </div>
    </div>
  );
}
