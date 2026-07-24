import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { ProductContext } from "../ProductLayout";
import { useVentasData } from "./ventas/useVentasData";
import ProspectosTab from "./ventas/ProspectosTab";
import CotizacionesTab from "./ventas/CotizacionesTab";
import FacturacionTab from "./ventas/FacturacionTab";
import CobranzaTab from "./ventas/CobranzaTab";

type Tab = "prospectos" | "cotizaciones" | "facturacion" | "cobranza";

export default function Ventas() {
  const { scopeId: companyId } = useOutletContext<ProductContext>();
  const {
    loading,
    tier,
    limits,
    clientes,
    prospectos,
    etapasPipeline,
    motivosPerdida,
    oportunidades,
    productosServicios,
    settings,
    cotizaciones,
    pedidos,
    facturas,
    companyUsers,
    reload,
  } = useVentasData(companyId);
  const [tab, setTab] = useState<Tab>("prospectos");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "prospectos", label: "Prospectos y oportunidades" },
    { id: "cotizaciones", label: "Cotizaciones y pedidos" },
    { id: "facturacion", label: "Facturación" },
    { id: "cobranza", label: "Cobranza" },
  ];

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Ventas y CxC</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : "Professional"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Del prospecto al cobro</p>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-ink/10">
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
        {tab === "prospectos" && (
          <ProspectosTab
            companyId={companyId}
            prospectos={prospectos}
            clientes={clientes}
            etapasPipeline={etapasPipeline}
            motivosPerdida={motivosPerdida}
            oportunidades={oportunidades}
            companyUsers={companyUsers}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "cotizaciones" && (
          <CotizacionesTab
            companyId={companyId}
            clientes={clientes}
            prospectos={prospectos}
            productosServicios={productosServicios}
            cotizaciones={cotizaciones}
            pedidos={pedidos}
            settings={settings}
            userId={userId}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "facturacion" && (
          <FacturacionTab companyId={companyId} clientes={clientes} pedidos={pedidos} facturas={facturas} limits={limits} reload={reload} />
        )}
        {tab === "cobranza" && <CobranzaTab clientes={clientes} facturas={facturas} limits={limits} reload={reload} />}
      </div>
    </div>
  );
}
