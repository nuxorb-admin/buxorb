import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantTable } from "../../../lib/database.types";
import type { MenuItemWithOptions, OrderWithItems } from "./useRestaurantesData";
import { orderSubtitle, orderTitle } from "./orderDisplay";
import Modal from "../../../admin/components/Modal";

const OTROS = "Otros";
const TODAS = "Todas";

interface CartSelection {
  option_id: string;
  nombre_snapshot: string;
}

interface CartLine {
  id: string;
  sales_product_id: string;
  cantidad: number;
  notas: string;
  selections: CartSelection[];
}

function sameSelections(a: CartSelection[], b: CartSelection[]): boolean {
  if (a.length !== b.length) return false;
  const idsA = [...a.map((s) => s.option_id)].sort();
  const idsB = [...b.map((s) => s.option_id)].sort();
  return idsA.every((id, i) => id === idsB[i]);
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
  menuItems: MenuItemWithOptions[];
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
  const [customizingItem, setCustomizingItem] = useState<MenuItemWithOptions | null>(null);
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

  function agregarAlCarrito(salesProductId: string, cantidad: number, notas: string, selections: CartSelection[]) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (l) => l.sales_product_id === salesProductId && l.notas === notas && sameSelections(l.selections, selections),
      );
      if (idx >= 0) {
        return prev.map((l, i) => (i === idx ? { ...l, cantidad: l.cantidad + cantidad } : l));
      }
      return [...prev, { id: crypto.randomUUID(), sales_product_id: salesProductId, cantidad, notas, selections }];
    });
  }

  function cambiarCantidadCarrito(lineId: string, delta: number) {
    setCart((prev) => prev.map((l) => (l.id === lineId ? { ...l, cantidad: l.cantidad + delta } : l)).filter((l) => l.cantidad > 0));
  }

  function quitarDelCarrito(lineId: string) {
    setCart((prev) => prev.filter((l) => l.id !== lineId));
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
    const { data: insertedItems } = await supabase
      .from("ldn_restaurant_order_items")
      .insert(
        cart.map((l) => ({
          order_id: order.id,
          sales_product_id: l.sales_product_id,
          cantidad: l.cantidad,
          notas: l.notas.trim() || null,
        })),
      )
      .select();
    if (insertedItems) {
      const optionRows = insertedItems.flatMap((row, i) =>
        cart[i].selections.map((sel) => ({ order_item_id: row.id, option_id: sel.option_id, nombre_snapshot: sel.nombre_snapshot })),
      );
      if (optionRows.length > 0) {
        await supabase.from("ldn_restaurant_order_item_options").insert(optionRows);
      }
    }
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
                const enCarrito = cart.filter((l) => l.sales_product_id === m.sales_product_id).reduce((s, l) => s + l.cantidad, 0);
                return (
                  <button
                    key={m.id}
                    onClick={() => setCustomizingItem(m)}
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
                            {item.option_selections.length > 0 && (
                              <p className="font-mono text-[0.58rem] text-muted">
                                {item.option_selections.map((s) => s.nombre_snapshot).join(", ")}
                              </p>
                            )}
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
                    <div key={line.id} className="px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[0.68rem] text-ink">{nombreDe(line.sales_product_id)}</span>
                          {line.selections.length > 0 && (
                            <p className="font-mono text-[0.58rem] text-muted">
                              {line.selections.map((s) => s.nombre_snapshot).join(", ")}
                            </p>
                          )}
                          {line.notas && <p className="font-mono text-[0.58rem] text-muted">{line.notas}</p>}
                          <p className="font-mono text-[0.56rem] uppercase tracking-[0.04em] text-orange">Nuevo — sin enviar</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => cambiarCantidadCarrito(line.id, -1)}
                            className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                          >
                            −
                          </button>
                          <span className="w-4 text-center font-mono text-[0.68rem] text-ink">{line.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidadCarrito(line.id, 1)}
                            className="h-5 w-5 border border-ink/15 font-mono text-[0.6rem] text-muted hover:border-ink/30 hover:text-ink"
                          >
                            +
                          </button>
                          <button
                            onClick={() => quitarDelCarrito(line.id)}
                            className="font-mono text-[0.56rem] uppercase text-orange hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
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

      {customizingItem && (
        <CustomizeItemModal
          menuItem={customizingItem}
          productName={nombreDe(customizingItem.sales_product_id)}
          precio={precioDe(customizingItem.sales_product_id)}
          onClose={() => setCustomizingItem(null)}
          onConfirm={(cantidad, notas, selections) => {
            agregarAlCarrito(customizingItem.sales_product_id, cantidad, notas, selections);
            setCustomizingItem(null);
          }}
        />
      )}
    </div>
  );
}

function CustomizeItemModal({
  menuItem,
  productName,
  precio,
  onClose,
  onConfirm,
}: {
  menuItem: MenuItemWithOptions;
  productName: string;
  precio: number;
  onClose: () => void;
  onConfirm: (cantidad: number, notas: string, selections: CartSelection[]) => void;
}) {
  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState("");
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const groups = [...menuItem.option_groups].sort((a, b) => a.orden - b.orden);

  function confirmar() {
    for (const group of groups) {
      if (group.obligatorio && !selected[group.id]) {
        setError(`Elige una opción de "${group.nombre}"`);
        return;
      }
    }
    const selections: CartSelection[] = groups
      .filter((g) => selected[g.id])
      .map((g) => {
        const option = g.options.find((o) => o.id === selected[g.id])!;
        return { option_id: option.id, nombre_snapshot: option.nombre };
      });
    onConfirm(cantidad, notas, selections);
  }

  return (
    <Modal title={productName} onClose={onClose}>
      <div className="space-y-4">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <p className="font-mono text-sm text-muted">${precio.toFixed(2)}</p>

        {groups.map((group) => (
          <div key={group.id}>
            <p className="mb-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink">
              {group.nombre}
              {group.obligatorio && <span className="ml-1 text-orange">*</span>}
            </p>
            <div className="space-y-1.5">
              {[...group.options]
                .sort((a, b) => a.orden - b.orden)
                .map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 font-mono text-[0.7rem] text-ink">
                    <input
                      type="radio"
                      name={group.id}
                      checked={selected[group.id] === opt.id}
                      onChange={() => {
                        setSelected((prev) => ({ ...prev, [group.id]: opt.id }));
                        setError(null);
                      }}
                    />
                    {opt.nombre}
                  </label>
                ))}
            </div>
          </div>
        ))}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Comentario (opcional)
          </label>
          <input
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej. sin cebolla"
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="h-8 w-8 border border-ink/15 font-mono text-sm text-muted hover:border-ink/30 hover:text-ink"
          >
            −
          </button>
          <span className="w-6 text-center font-mono text-sm text-ink">{cantidad}</span>
          <button
            onClick={() => setCantidad((c) => c + 1)}
            className="h-8 w-8 border border-ink/15 font-mono text-sm text-muted hover:border-ink/30 hover:text-ink"
          >
            +
          </button>
        </div>

        <button onClick={confirmar} className="btn btn-primary w-full">
          Agregar al pedido
        </button>
      </div>
    </Modal>
  );
}
