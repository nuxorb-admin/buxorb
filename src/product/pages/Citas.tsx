import { Navigate, Route, Routes } from "react-router-dom";
import type { BusinessLineTier } from "../../lib/database.types";
import { useCitasData } from "./citas/useCitasData";
import { limitsForTier } from "./citas/limits";
import AgendaTab from "./citas/AgendaTab";
import ServiciosTab from "./citas/ServiciosTab";
import HorariosTab from "./citas/HorariosTab";

// Mismo patrón que Restaurantes.tsx: cada sección vive en su propia
// entrada del grupo colapsable "Citas" del sidebar (ver TenantPortal.tsx),
// esto solo resuelve las rutas anidadas bajo /citas/*.
export default function Citas({ companyId, tier }: { companyId: string; tier: BusinessLineTier }) {
  const { loading, productos, servicios, serviceEmployees, schedules, appointments, empleados, reload } = useCitasData(companyId);
  const limits = limitsForTier(tier);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Citas</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : tier === "professional" ? "Professional" : "Enterprise"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Agenda de servicios con disponibilidad real</p>

      <div className="mt-6">
        <Routes>
          <Route index element={<Navigate to="agenda" replace />} />
          <Route
            path="agenda"
            element={
              <AgendaTab
                productos={productos}
                servicios={servicios}
                serviceEmployees={serviceEmployees}
                schedules={schedules}
                appointments={appointments}
                empleados={empleados}
                reload={reload}
              />
            }
          />
          <Route
            path="servicios"
            element={
              <ServiciosTab
                productos={productos}
                servicios={servicios}
                serviceEmployees={serviceEmployees}
                empleados={empleados}
                limits={limits}
                reload={reload}
              />
            }
          />
          <Route
            path="horarios"
            element={<HorariosTab companyId={companyId} schedules={schedules} empleados={empleados} reload={reload} />}
          />
        </Routes>
      </div>
    </div>
  );
}
