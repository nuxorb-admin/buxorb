import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantOrderItemStatus, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";
import { orderTitle } from "./orderDisplay";
import Modal from "../../../admin/components/Modal";

const NEXT_STATUS: Record<RestaurantOrderItemStatus, RestaurantOrderItemStatus | null> = {
  pendiente: "en_preparacion",
  en_preparacion: "listo",
  listo: "entregado",
  entregado: null,
};

const STATUS_LABEL: Record<RestaurantOrderItemStatus, string> = {
  pendiente: "Pendiente",
  en_preparacion: "En preparación",
  listo: "Listo",
  entregado: "Entregado",
};

const STATUS_COLOR: Record<RestaurantOrderItemStatus, string> = {
  pendiente: "border-orange/40 bg-orange/5 text-orange",
  en_preparacion: "border-ink/20 bg-sand-2 text-ink",
  listo: "border-teal/40 bg-teal/5 text-teal",
  entregado: "border-ink/10 bg-white text-muted",
};

export default function CocinaTab({
  tables,
  openOrders,
  products,
  reload,
}: {
  tables: RestaurantTable[];
  openOrders: OrderWithItems[];
  products: ProductoServicio[];
  reload: () => void;
}) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const pendingOrders = openOrders
    .map((order) => ({ order, faltan: order.items.filter((i) => i.estado !== "entregado").length }))
    .filter((x) => x.faltan > 0)
    .sort((a, b) => a.order.opened_at.localeCompare(b.order.opened_at));

  const expandedOrder = openOrders.find((o) => o.id === expandedOrderId) ?? null;

  async function avanzar(itemId: string, next: RestaurantOrderItemStatus) {
    await supabase.from("ldn_restaurant_order_items").update({ estado: next }).eq("id", itemId);
    reload();
  }

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Cocina — comandas pendientes ({pendingOrders.length})
      </h3>
      {pendingOrders.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin comandas pendientes.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pendingOrders.map(({ order, faltan }) => {
            const preview = order.items
              .filter((i) => i.estado !== "entregado")
              .slice(0, 3)
              .map((i) => products.find((p) => p.id === i.sales_product_id)?.nombre ?? "—");
            return (
              <button
                key={order.id}
                onClick={() => setExpandedOrderId(order.id)}
                className="relative border border-ink/10 bg-white p-4 text-left transition-colors hover:border-teal"
              >
                <span className="absolute right-3 top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange px-1.5 font-mono text-[0.66rem] font-bold text-white">
                  {faltan}
                </span>
                <p className="pr-8 text-sm font-bold text-ink">{orderTitle(order, tables)}</p>
                <p className="mt-1 font-mono text-[0.6rem] text-muted">
                  {preview.join(", ")}
                  {order.items.length > preview.length ? "…" : ""}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {expandedOrder && (
        <Modal title={orderTitle(expandedOrder, tables)} onClose={() => setExpandedOrderId(null)}>
          <div className="space-y-2">
            {expandedOrder.items.map((item) => {
              const product = products.find((p) => p.id === item.sales_product_id);
              const next = NEXT_STATUS[item.estado];
              return (
                <div key={item.id} className={`flex items-center justify-between gap-3 border px-3 py-2 ${STATUS_COLOR[item.estado]}`}>
                  <div>
                    <p className="text-sm font-bold">
                      {item.cantidad}× {product?.nombre ?? "—"}
                    </p>
                    {item.notas && <p className="font-mono text-[0.6rem]">{item.notas}</p>}
                    <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.06em]">{STATUS_LABEL[item.estado]}</p>
                  </div>
                  {next && (
                    <button
                      onClick={() => avanzar(item.id, next)}
                      className="shrink-0 border border-current px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] hover:opacity-70"
                    >
                      Marcar {STATUS_LABEL[next].toLowerCase()}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
}
