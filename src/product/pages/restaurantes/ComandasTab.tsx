import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantMenuItem, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";

export default function ComandasTab({
  tables,
  openOrders,
  menuItems,
  products,
  reload,
}: {
  tables: RestaurantTable[];
  openOrders: OrderWithItems[];
  menuItems: RestaurantMenuItem[];
  products: ProductoServicio[];
  reload: () => void;
}) {
  const [pickingTable, setPickingTable] = useState(false);
  const freeTables = tables.filter((t) => t.estado === "libre");
  const menuDisponible = menuItems.filter((m) => m.disponible);

  async function abrirMesa(table: RestaurantTable) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("ldn_restaurant_orders").insert({ company_id: table.company_id, table_id: table.id, mesero_id: user?.id ?? null });
    await supabase.from("ldn_restaurant_tables").update({ estado: "ocupada" }).eq("id", table.id);
    setPickingTable(false);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Comandas abiertas ({openOrders.length})
        </h3>
        <button
          onClick={() => setPickingTable(true)}
          disabled={freeTables.length === 0}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Abrir mesa
        </button>
      </div>

      {pickingTable && (
        <div className="mb-4 border border-ink/10 bg-white p-4">
          <p className="mb-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted">Elige una mesa libre</p>
          <div className="flex flex-wrap gap-2">
            {freeTables.map((t) => (
              <button key={t.id} onClick={() => abrirMesa(t)} className="border border-teal/40 px-3 py-1.5 font-mono text-xs text-teal hover:bg-teal/5">
                {t.nombre}
              </button>
            ))}
            <button onClick={() => setPickingTable(false)} className="px-3 py-1.5 font-mono text-xs text-muted hover:text-ink">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {openOrders.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin mesas abiertas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {openOrders.map((order) => (
            <OrderCard key={order.id} order={order} tables={tables} menuDisponible={menuDisponible} products={products} reload={reload} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  tables,
  menuDisponible,
  products,
  reload,
}: {
  order: OrderWithItems;
  tables: RestaurantTable[];
  menuDisponible: RestaurantMenuItem[];
  products: ProductoServicio[];
  reload: () => void;
}) {
  const table = tables.find((t) => t.id === order.table_id);
  const [productId, setProductId] = useState(menuDisponible[0]?.sales_product_id ?? "");
  const [cantidad, setCantidad] = useState("1");
  const [notas, setNotas] = useState("");
  const [adding, setAdding] = useState(false);

  async function agregarItem() {
    if (!productId) return;
    setAdding(true);
    await supabase.from("ldn_restaurant_order_items").insert({
      order_id: order.id,
      sales_product_id: productId,
      cantidad: Number(cantidad) || 1,
      notas: notas.trim() || null,
    });
    setAdding(false);
    setNotas("");
    reload();
  }

  async function quitarItem(itemId: string) {
    await supabase.from("ldn_restaurant_order_items").delete().eq("id", itemId);
    reload();
  }

  return (
    <div className="border border-ink/10 bg-white p-4">
      <p className="text-sm font-bold text-ink">{table?.nombre ?? "Mesa"}</p>
      <div className="mt-2 divide-y divide-ink/10 border-y border-ink/10">
        {order.items.length === 0 ? (
          <p className="py-2 font-mono text-[0.62rem] text-muted">Sin platillos todavía.</p>
        ) : (
          order.items.map((item) => {
            const product = products.find((p) => p.id === item.sales_product_id);
            return (
              <div key={item.id} className="flex items-center justify-between gap-2 py-2">
                <div>
                  <span className="font-mono text-[0.68rem] text-ink">
                    {item.cantidad}× {product?.nombre ?? "—"}
                  </span>
                  {item.notas && <p className="font-mono text-[0.58rem] text-muted">{item.notas}</p>}
                </div>
                <button onClick={() => quitarItem(item.id)} className="font-mono text-[0.58rem] uppercase text-orange hover:underline">
                  Quitar
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="flex-1 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
        >
          {menuDisponible.map((m) => {
            const product = products.find((p) => p.id === m.sales_product_id);
            return (
              <option key={m.id} value={m.sales_product_id}>
                {product?.nombre ?? "—"}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="w-14 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
        />
        <button
          onClick={agregarItem}
          disabled={adding || !productId}
          className="btn btn-primary px-3 py-1.5 text-[0.62rem] disabled:opacity-60"
        >
          + Agregar
        </button>
      </div>
      <input
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Notas (ej. sin cebolla)"
        className="mt-2 w-full border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      />
    </div>
  );
}
