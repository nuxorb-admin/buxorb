import Badge from "../../admin/components/Badge";
import { sampleEmployees } from "../sampleData";

export default function Personal() {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Gestión de Personal</h1>
        <Badge color="orange">Vista de ejemplo</Badge>
      </div>
      <p className="font-mono text-xs text-muted">Datos de muestra — próximamente funcional.</p>

      <div className="mt-6 divide-y divide-ink/10 border border-ink/10 bg-white">
        {sampleEmployees.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{e.name}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {e.role} · desde {new Date(e.startDate).toLocaleDateString("es-MX")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-ink">
                ${e.monthlyPay.toLocaleString("es-MX")}/mes
              </span>
              <Badge color={e.status === "activo" ? "teal" : "muted"}>{e.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
