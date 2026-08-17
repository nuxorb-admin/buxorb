import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantMenuItem } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";
import Modal from "../../../admin/components/Modal";

const OTROS = "Otros";

export default function MenuPickerModal({
  order,
  menuItems,
  products,
  onClose,
  onAdded,
}: {
  order: OrderWithItems;
  menuItems: RestaurantMenuItem[];
  products: ProductoServicio[];
  onClose: () => void;
  onAdded: () => void;
}) {
  const disponibles = menuItems.filter((m) => m.disponible);
  const categorias = Array.from(new Set(disponibles.map((m) => m.categoria || OTROS)));
  const [categoria, setCategoria] = useState(categorias[0] ?? OTROS);
  const [adding, setAdding] = useState<string | null>(null);

  const itemsCategoria = disponibles.filter((m) => (m.categoria || OTROS) === categoria);

  function pendingQty(sales_product_id: string): number {
    return order.items
      .filter((i) => i.sales_product_id === sales_product_id && i.estado === "pendiente")
      .reduce((sum, i) => sum + i.cantidad, 0);
  }

  async function agregar(salesProductId: string) {
    setAdding(salesProductId);
    const existing = order.items.find((i) => i.sales_product_id === salesProductId && i.estado === "pendiente");
    if (existing) {
      await supabase.from("ldn_restaurant_order_items").update({ cantidad: existing.cantidad + 1 }).eq("id", existing.id);
    } else {
      await supabase.from("ldn_restaurant_order_items").insert({ order_id: order.id, sales_product_id: salesProductId, cantidad: 1 });
    }
    setAdding(null);
    onAdded();
  }

  return (
    <Modal title="Agregar platillos" onClose={onClose} size="lg">
      <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-3">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`whitespace-nowrap border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] transition-colors ${
              categoria === c ? "border-teal bg-teal/10 text-teal" : "border-ink/15 text-muted hover:border-ink/30 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {itemsCategoria.length === 0 ? (
        <p className="mt-4 font-mono text-[0.68rem] text-muted">Sin platillos en esta categoría.</p>
      ) : (
        <div className="mt-4 grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
          {itemsCategoria.map((m) => {
            const product = products.find((p) => p.id === m.sales_product_id);
            const qty = pendingQty(m.sales_product_id);
            return (
              <button
                key={m.id}
                onClick={() => agregar(m.sales_product_id)}
                disabled={adding === m.sales_product_id}
                className="relative flex flex-col items-start gap-1 border border-ink/10 bg-white p-3 text-left transition-colors hover:border-teal disabled:opacity-60"
              >
                {qty > 0 && (
                  <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center bg-orange px-1 font-mono text-[0.62rem] font-bold text-white">
                    {qty}
                  </span>
                )}
                {m.foto_url ? (
                  <img src={m.foto_url} alt={product?.nombre ?? ""} className="h-20 w-full rounded-none object-cover" />
                ) : (
                  <div className="flex h-20 w-full items-center justify-center bg-sand-2 font-display text-2xl uppercase text-ink/20">
                    {(product?.nombre ?? "—").charAt(0)}
                  </div>
                )}
                <span className="mt-1 text-sm font-semibold text-ink">{product?.nombre ?? "—"}</span>
                <span className="font-mono text-[0.66rem] text-muted">${(product?.precio_unitario ?? 0).toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      )}

      <button onClick={onClose} className="btn btn-primary mt-5 w-full">
        Listo
      </button>
    </Modal>
  );
}
