import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantMenuItem, RestaurantOrderChannel, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";
import { CHANNEL_LABELS, orderSubtitle, orderTitle } from "./orderDisplay";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

type ExternalChannel = Exclude<RestaurantOrderChannel, "mesa">;
const EXTERNAL_CHANNELS: ExternalChannel[] = ["telefono_domicilio", "recoger", "rappi"];

export default function ComandasTab({
  companyId,
  tables,
  openOrders,
  menuItems,
  products,
  reload,
}: {
  companyId: string;
  tables: RestaurantTable[];
  openOrders: OrderWithItems[];
  menuItems: RestaurantMenuItem[];
  products: ProductoServicio[];
  reload: () => void;
}) {
  const [pickingTable, setPickingTable] = useState(false);
  const [newChannel, setNewChannel] = useState<ExternalChannel | null>(null);
  const freeTables = tables.filter((t) => t.estado === "libre");
  const menuDisponible = menuItems.filter((m) => m.disponible);

  async function abrirMesa(table: RestaurantTable) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from("ldn_restaurant_orders")
      .insert({ company_id: table.company_id, table_id: table.id, canal: "mesa", mesero_id: user?.id ?? null });
    await supabase.from("ldn_restaurant_tables").update({ estado: "ocupada" }).eq("id", table.id);
    setPickingTable(false);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Comandas abiertas ({openOrders.length})
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setPickingTable(true)}
            disabled={freeTables.length === 0}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Abrir mesa
          </button>
          {EXTERNAL_CHANNELS.map((c) => (
            <button
              key={c}
              onClick={() => setNewChannel(c)}
              className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
            >
              + {CHANNEL_LABELS[c]}
            </button>
          ))}
        </div>
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

      {newChannel && (
        <NewChannelOrderModal companyId={companyId} channel={newChannel} onClose={() => setNewChannel(null)} onCreated={reload} />
      )}

      {openOrders.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin pedidos abiertos.</p>
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

function NewChannelOrderModal({
  companyId,
  channel,
  onClose,
  onCreated,
}: {
  companyId: string;
  channel: ExternalChannel;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [clienteNombre, setClienteNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiresNombreTelefono = channel === "telefono_domicilio" || channel === "recoger";
  const requiresDireccion = channel === "telefono_domicilio";

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (requiresNombreTelefono && (!clienteNombre.trim() || !telefono.trim())) return;
    if (requiresDireccion && !direccion.trim()) return;
    setSaving(true);
    setError(null);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error: insertError } = await supabase.from("ldn_restaurant_orders").insert({
      company_id: companyId,
      canal: channel,
      mesero_id: user?.id ?? null,
      cliente_nombre: clienteNombre.trim() || null,
      telefono: telefono.trim() || null,
      direccion: direccion.trim() || null,
      referencia: referencia.trim() || null,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    onCreated();
    onClose();
  }

  return (
    <Modal title={CHANNEL_LABELS[channel]} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        {requiresNombreTelefono && (
          <>
            <FieldInput label="Nombre del cliente" value={clienteNombre} onChange={setClienteNombre} required />
            <FieldInput label="Teléfono" value={telefono} onChange={setTelefono} required />
          </>
        )}
        {requiresDireccion && <FieldInput label="Dirección de entrega" value={direccion} onChange={setDireccion} required />}
        {channel === "rappi" && (
          <FieldInput label="Referencia / folio (opcional)" value={referencia} onChange={setReferencia} placeholder="Ej. folio del pedido en Rappi" />
        )}
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear pedido"}
        </button>
      </form>
    </Modal>
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

  const subtitle = orderSubtitle(order);

  return (
    <div className="border border-ink/10 bg-white p-4">
      <p className="text-sm font-bold text-ink">{orderTitle(order, tables)}</p>
      {subtitle && <p className="mt-0.5 font-mono text-[0.6rem] text-muted">{subtitle}</p>}
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
