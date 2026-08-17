import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantMenuItem, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";
import { orderSubtitle, orderTitle } from "./orderDisplay";

const OTROS = "Otros";
const TODAS = "Todas";

interface CartLine {
  sales_product_id: string;
  cantidad: number;
  notas: string;
}

export default function TomarOrdenScreen({
  order,
  openOrders,
  tables,
  menuItems,
  products,
  onBack,
  onSwitchOrder,
  reload,
}: {
  order: OrderWithItems;
  openOrders: OrderWithItems[];
  tables: RestaurantTable[];
  menuItems: RestaurantMenuItem[];
  products: ProductoServicio[];
  onBack: () => void;
  onSwitchOrder: (orderId: string) => void;
  reload: () => void;
}) {
  const [meseroEmail, setMeseroEmail] = useState<string | null>(null);
  const [categoria, setCategoria] = useState(TODAS);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [sending, setSending] = useState(false);
  const [editingSentNotas, setEditingSentNotas] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .auth.getUser()
      .then(({ data }) => setMeseroEmail(data.user?.email ?? null));
  }, []);

  // Al cambiar de comanda (switcher del header), el carrito sin enviar de la
  // anterior no aplica aquí — se descarta a propósito (ver decisión de producto:
  // el carrito vive solo en pantalla, no se persiste como borrador).
  useEffect(() => {
    setCart([]);
  }, [order.id]);

  const disponibles = menuItems.filter((m) => m.disponible);
  const categorias = [TODAS, ...Array.from(new Set(disponibles.map((m) => m.categoria || OTROS)))];
  const filtrados = disponibles.filter((m) => {
    const enCategoria = categoria === TODAS || (m.categoria || OTROS) === categoria;
    if (!enCategoria) return false;
    if (!search.trim()) return true;
    const product = products.find((p) => p.id === m.sales_product_id);
    return (product?.nombre ?? "").toLowerCase().includes(search.trim().toLowerCase());
  });

  function precioDe(salesProductId: string): number {
    return products.find((p) => p.id === salesProductId)?.precio_unitario ?? 0;
  }

  function nombreDe(salesProductId: string): string {
    return products.find((p) => p.id === salesProductId)?.nombre ?? "—";
  }

  function agregarAlCarrito(salesProductId: string) {
    setCart((prev) => {
      const existing = prev.find((l) => l.sales_product_id === salesProductId);
      if (existing) {
        return prev.map((l) => (l.sales_product_id === salesProductId ? { ...l, cantidad: l.cantidad + 1 } : l));
      }
      return [...prev, { sales_product_id: salesProductId, cantidad: 1, notas: "" }];
    });
  }

  function cambiarCantidadCarrito(salesProductId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.sales_product_id === salesProductId ? { ...l, cantidad: l.cantidad + delta } : l))
        .filter((l) => l.cantidad > 0),
    );
  }

  function quitarDelCarrito(salesProductId: string) {
    setCart((prev) => prev.filter((l) => l.sales_product_id !== salesProductId));
  }

  function actualizarNotasCarrito(salesProductId: string, notas: string) {
    setCart((prev) => prev.map((l) => (l.sales_product_id === salesProductId ? { ...l, notas } : l)));
  }

  async function cambiarCantidadEnviado(itemId: string, cantidad: number, delta: number) {
    const next = cantidad + delta;
    if (next <= 0) {
      await supabase.from("ldn_restaurant_order_items").delete().eq("id", itemId);
    } else {
      await supabase.from("ldn_restaurant_order_items").update({ cantidad: next }).eq("id", itemId);
    }
    reload();
  }

  async function quitarEnviado(itemId: string) {
    await supabase.from("ldn_restaurant_order_items").delete().eq("id", itemId);
    reload();
  }

  async function guardarNotasEnviado(itemId: string) {
    const notas = editingSentNotas[itemId];
    if (notas === undefined) return;
    await supabase.from("ldn_restaurant_order_items").update({ notas: notas.trim() || null }).eq("id", itemId);
    setEditingSentNotas((prev) => {
      const { [itemId]: _removed, ...rest } = prev;
      return rest;
    });
    reload();
  }

  async function enviarOrden() {
    if (cart.length === 0) return;
    setSending(true);
    await supabase.from("ldn_restaurant_order_items").insert(
      cart.map((l) => ({
        order_id: order.id,
        sales_product_id: l.sales_product_id,
        cantidad: l.cantidad,
        notas: l.notas.trim() || null,
      })),
    );
    setSending(false);
    setCart([]);
    reload();
  }

  const subtotalEnviado = order.items.reduce((sum, i) => sum + i.cantidad * precioDe(i.sales_product_id), 0);
  const subtotalCarrito = cart.reduce((sum, l) => sum + l.cantidad * precioDe(l.sales_product_id), 0);
  const total = subtotalEnviado + subtotalCarrito;
  const subtitle = orderSubtitle(order);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted hover:text-ink">
            ← Comandas
          </button>
          <div>
            <div className="flex items-center gap-2">
              <label className="font-mono text-[0.6rem] uppercase tracking-[0.06em] text-muted">Mesa / Orden</label>
              <select
                value={order.id}
                onChange={(e) => onSwitchOrder(e.target.value)}
                className="border border-ink/15 bg-white px-2 py-1 font-mono text-xs text-ink focus:border-teal focus:outline-none"
              >
                {openOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {orderTitle(o, tables)}
                  </option>
                ))}
              </select>
            </div>
            {subtitle && <p className="mt-0.5 font-mono text-[0.6rem] text-muted">{subtitle}</p>}
          </div>
        </div>
        {meseroEmail && <p className="font-mono text-[0.6rem] text-muted">Mesero: {meseroEmail}</p>}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar platillos…"
            className="mb-3 w-full border border-ink/15 bg-white px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />

          <div className="mb-4 flex flex-wrap gap-2">
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

          {filtrados.length === 0 ? (
            <p className="font-mono text-[0.68rem] text-muted">Sin platillos que coincidan.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filtrados.map((m) => {
                const enCarrito = cart.find((l) => l.sales_product_id === m.sales_product_id)?.cantidad ?? 0;
                return (
                  <button
                    key={m.id}
                    onClick={() => agregarAlCarrito(m.sales_product_id)}
                    className="relative flex flex-col items-start gap-1 border border-ink/10 bg-white p-3 text-left transition-colors hover:border-teal"
                  >
                    {enCarrito > 0 && (
                      <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center bg-orange px-1 font-mono text-[0.62rem] font-bold text-white">
                        {enCarrito}
                      </span>
                    )}
                    {m.foto_url ? (
                      <img src={m.foto_url} alt={nombreDe(m.sales_product_id)} className="h-20 w-full object-cover" />
                    ) : (
                      <div className="flex h-20 w-full items-center justify-center bg-sand-2 font-display text-2xl uppercase text-ink/20">
                        {nombreDe(m.sales_product_id).charAt(0)}
                      </div>
                    )}
                    <span className="mt-1 text-sm font-semibold text-ink">{nombreDe(m.sales_product_id)}</span>
                    <span className="font-mono text-[0.66rem] text-muted">${precioDe(m.sales_product_id).toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full flex-none border border-ink/10 bg-white p-4 lg:w-80">
          <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Pedido actual</h3>

          {order.items.length === 0 && cart.length === 0 ? (
            <p className="mt-3 font-mono text-[0.62rem] text-muted">Sin platillos todavía.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {order.items.length > 0 && (
                <div className="divide-y divide-ink/10 border-y border-ink/10">
                  {order.items.map((item) => {
                    const notasValue = editingSentNotas[item.id] ?? item.notas ?? "";
                    return (
                      <div key={item.id} className="py-2">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="font-mono text-[0.68rem] text-ink">{nombreDe(item.sales_product_id)}</span>
                            <p className="font-mono text-[0.56rem] uppercase tracking-[0.04em] text-teal">En cocina</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => cambiarCantidadEnviado(item.id, item.cantidad, -1)}
                              className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                            >
                              −
                            </button>
                            <span className="w-4 text-center font-mono text-[0.68rem] text-ink">{item.cantidad}</span>
                            <button
                              onClick={() => cambiarCantidadEnviado(item.id, item.cantidad, 1)}
                              className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                            >
                              +
                            </button>
                            <button
                              onClick={() => quitarEnviado(item.id)}
                              className="font-mono text-[0.56rem] uppercase text-orange hover:underline"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                        <input
                          value={notasValue}
                          onChange={(e) => setEditingSentNotas((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          onBlur={() => guardarNotasEnviado(item.id)}
                          placeholder="Notas"
                          className="mt-1 w-full border-none bg-transparent font-mono text-[0.58rem] text-muted placeholder:text-muted/60 focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {cart.length > 0 && (
                <div className="divide-y divide-orange/20 border-y border-orange/30 bg-orange/5">
                  {cart.map((line) => (
                    <div key={line.sales_product_id} className="px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[0.68rem] text-ink">{nombreDe(line.sales_product_id)}</span>
                          <p className="font-mono text-[0.56rem] uppercase tracking-[0.04em] text-orange">Nuevo — sin enviar</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => cambiarCantidadCarrito(line.sales_product_id, -1)}
                            className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                          >
                            −
                          </button>
                          <span className="w-4 text-center font-mono text-[0.68rem] text-ink">{line.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidadCarrito(line.sales_product_id, 1)}
                            className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                          >
                            +
                          </button>
                          <button
                            onClick={() => quitarDelCarrito(line.sales_product_id)}
                            className="font-mono text-[0.56rem] uppercase text-orange hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                      <input
                        value={line.notas}
                        onChange={(e) => actualizarNotasCarrito(line.sales_product_id, e.target.value)}
                        placeholder="Notas (ej. sin cebolla)"
                        className="mt-1 w-full border-none bg-transparent font-mono text-[0.58rem] text-muted placeholder:text-muted/60 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
            <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink">Total</span>
            <span className="font-mono text-sm font-bold text-ink">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={enviarOrden}
            disabled={cart.length === 0 || sending}
            className="btn btn-primary mt-3 w-full disabled:opacity-50"
          >
            {sending ? "Enviando…" : "Enviar orden a cocina"}
          </button>
        </div>
      </div>
    </div>
  );
}
