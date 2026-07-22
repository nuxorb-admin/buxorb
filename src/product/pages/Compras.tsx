import Badge from "../../admin/components/Badge";
import { samplePurchaseOrders } from "../sampleData";

const STATUS_COLOR = { pendiente: "muted", aprobada: "teal", pagada: "ink" } as const;

export default function Compras() {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Compras y Proveedores</h1>
        <Badge color="orange">Vista de ejemplo</Badge>
      </div>
      <p className="font-mono text-xs text-muted">Datos de muestra — próximamente funcional.</p>

      <div className="mt-6 divide-y divide-ink/10 border border-ink/10 bg-white">
        {samplePurchaseOrders.map((o) => (
          <div key={o.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{o.provider}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {o.id} · {o.concept}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-ink">${o.amount.toLocaleString("es-MX")}</span>
              <Badge color={STATUS_COLOR[o.status as keyof typeof STATUS_COLOR]}>{o.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
