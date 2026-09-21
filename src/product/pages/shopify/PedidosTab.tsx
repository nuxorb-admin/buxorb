import { useState } from "react";
import type { ShopifyOrder } from "../../../lib/database.types";
import Badge from "../../../admin/components/Badge";

function money(n: number | null, currency: string | null) {
  if (n == null) return "—";
  return n.toLocaleString("es-MX", { style: "currency", currency: currency || "MXN", maximumFractionDigits: 2 });
}

function fecha(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }) : "—";
}

export default function PedidosTab({ orders }: { orders: ShopifyOrder[] }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const lista = term
    ? orders.filter((o) => (o.name ?? "").toLowerCase().includes(term) || o.line_items.some((li) => li.title.toLowerCase().includes(term)))
    : orders;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por pedido o artículo"
          className="w-full max-w-xs border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <p className="font-mono text-[0.62rem] text-muted">Últimos 60 días · {lista.length} pedidos</p>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {lista.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin pedidos para mostrar.</p>}
        {lista.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{o.name ?? o.shopify_id}</p>
              <p className="font-mono text-[0.66rem] text-muted">
                {fecha(o.created_at_shopify)} · {o.line_items.reduce((s, li) => s + li.quantity, 0)} artículos
              </p>
            </div>
            <div className="flex items-center gap-3">
              {o.financial_status && <Badge color="muted">{o.financial_status.toLowerCase()}</Badge>}
              {o.fulfillment_status && (
                <Badge color={o.fulfillment_status === "FULFILLED" ? "teal" : "orange"}>{o.fulfillment_status.toLowerCase()}</Badge>
              )}
              <span className="font-mono text-sm text-ink">{money(o.total, o.currency)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
