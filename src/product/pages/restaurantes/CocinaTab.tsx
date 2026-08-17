import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantOrderItemStatus, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";

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
  const pendingItems = openOrders
    .flatMap((order) => order.items.map((item) => ({ item, order })))
    .filter(({ item }) => item.estado !== "entregado")
    .sort((a, b) => a.item.created_at.localeCompare(b.item.created_at));

  async function avanzar(itemId: string, next: RestaurantOrderItemStatus) {
    await supabase.from("ldn_restaurant_order_items").update({ estado: next }).eq("id", itemId);
    reload();
  }

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Cocina — pedidos pendientes ({pendingItems.length})
      </h3>
      {pendingItems.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin pedidos pendientes.</p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {pendingItems.map(({ item, order }) => {
            const table = tables.find((t) => t.id === order.table_id);
            const product = products.find((p) => p.id === item.sales_product_id);
            const next = NEXT_STATUS[item.estado];
            return (
              <div key={item.id} className={`border px-3 py-3 ${STATUS_COLOR[item.estado]}`}>
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.06em]">{table?.nombre ?? "Mesa"}</p>
                <p className="mt-1 text-sm font-bold">
                  {item.cantidad}× {product?.nombre ?? "—"}
                </p>
                {item.notas && <p className="mt-0.5 font-mono text-[0.6rem]">{item.notas}</p>}
                <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.06em]">{STATUS_LABEL[item.estado]}</p>
                {next && (
                  <button
                    onClick={() => avanzar(item.id, next)}
                    className="mt-2 w-full border border-current px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] hover:opacity-70"
                  >
                    Marcar {STATUS_LABEL[next].toLowerCase()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
