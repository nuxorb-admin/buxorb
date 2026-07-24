import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { ProductContext } from "../ProductLayout";
import { usePersonalData } from "./personal/usePersonalData";
import ExpedienteTab from "./personal/ExpedienteTab";
import IncidenciasTab from "./personal/IncidenciasTab";
import NominaTab from "./personal/NominaTab";

type Tab = "expediente" | "incidencias" | "nomina";

export default function Personal() {
  const { scopeId: companyId } = useOutletContext<ProductContext>();
  const {
    loading,
    tier,
    limits,
    empleados,
    departamentos,
    historialSueldo,
    incidencias,
    conceptos,
    periodos,
    finiquitos,
    tramosISR,
    umaDiaria,
    formulaImss,
    reload,
  } = usePersonalData(companyId);
  const [tab, setTab] = useState<Tab>("expediente");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "expediente", label: "Expediente" },
    { id: "incidencias", label: "Incidencias y tiempo" },
    { id: "nomina", label: "Nómina" },
  ];

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Gestión de Personal</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : "Professional"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Expediente, incidencias y prenómina — sin timbrado</p>

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
        {tab === "expediente" && (
          <ExpedienteTab
            companyId={companyId}
            empleados={empleados}
            departamentos={departamentos}
            historialSueldo={historialSueldo}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "incidencias" && (
          <IncidenciasTab empleados={empleados} incidencias={incidencias} limits={limits} userId={userId} reload={reload} />
        )}
        {tab === "nomina" && (
          <NominaTab
            companyId={companyId}
            empleados={empleados}
            incidencias={incidencias}
            conceptos={conceptos}
            periodos={periodos}
            finiquitos={finiquitos}
            limits={limits}
            tramosISR={tramosISR}
            umaDiaria={umaDiaria}
            formulaImss={formulaImss}
            reload={reload}
          />
        )}
      </div>
    </div>
  );
}
