import Badge from "../../admin/components/Badge";
import { salesPipeline, cartera } from "../sampleData";

const CARTERA_COLOR = { "al corriente": "teal", "por vencer": "orange", vencida: "ink" } as const;

export default function VentasDemo() {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Ventas y CxC</h1>
        <Badge color="orange">Vista de ejemplo</Badge>
      </div>
      <p className="font-mono text-xs text-muted">Datos de muestra — próximamente funcional.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {salesPipeline.map((col) => (
          <div key={col.stage}>
            <p className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
              {col.stage}
            </p>
            <div className="space-y-2">
              {col.deals.map((d) => (
                <div key={d.name} className="border border-ink/10 bg-white p-3">
                  <p className="text-sm font-semibold text-ink">{d.name}</p>
                  <p className="font-mono text-xs text-teal">${d.value.toLocaleString("es-MX")}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Cartera</h2>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {cartera.map((c) => (
          <div key={c.client} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{c.client}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                Vence {new Date(c.dueDate).toLocaleDateString("es-MX")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-ink">${c.amount.toLocaleString("es-MX")}</span>
              <Badge color={CARTERA_COLOR[c.status as keyof typeof CARTERA_COLOR]}>{c.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
