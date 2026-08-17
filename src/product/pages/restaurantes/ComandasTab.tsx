import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantOrderChannel, RestaurantTable } from "../../../lib/database.types";
import type { MenuItemWithOptions, OrderWithItems } from "./useRestaurantesData";
import { CHANNEL_LABELS, orderSubtitle, orderTitle } from "./orderDisplay";
import TomarOrdenScreen from "./TomarOrdenScreen";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

type ExternalChannel = Exclude<RestaurantOrderChannel, "mesa">;
const EXTERNAL_CHANNELS: ExternalChannel[] = ["telefono_domicilio", "recoger", "rappi"];

function orderTotal(order: OrderWithItems, products: ProductoServicio[]): number {
  return order.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.sales_product_id);
    return sum + item.cantidad * (product?.precio_unitario ?? 0);
  }, 0);
}

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
  menuItems: MenuItemWithOptions[];
  products: ProductoServicio[];
  reload: () => void;
}) {
  const [pickingTable, setPickingTable] = useState(false);
  const [joinMode, setJoinMode] = useState(false);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [newChannel, setNewChannel] = useState<ExternalChannel | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const freeTables = tables.filter((t) => t.estado === "libre");

  function closeTablePicker() {
    setPickingTable(false);
    setJoinMode(false);
    setSelectedTables([]);
  }

  async function abrirMesaSola(table: RestaurantTable) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: newOrder } = await supabase
      .from("ldn_restaurant_orders")
      .insert({ company_id: table.company_id, table_id: table.id, canal: "mesa", mesero_id: user?.id ?? null })
      .select()
      .single();
    await supabase.from("ldn_restaurant_tables").update({ estado: "ocupada" }).eq("id", table.id);
    closeTablePicker();
    reload();
    if (newOrder) setActiveOrderId(newOrder.id);
  }

  function toggleSelected(tableId: string) {
    setSelectedTables((prev) => (prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]));
  }

  async function abrirMesasUnidas() {
    if (selectedTables.length === 0) return;
    const principal = tables.find((t) => t.id === selectedTables[0]);
    if (!principal) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: newOrder } = await supabase
      .from("ldn_restaurant_orders")
      .insert({ company_id: principal.company_id, table_id: principal.id, canal: "mesa", mesero_id: user?.id ?? null })
      .select()
      .single();
    await supabase.from("ldn_restaurant_tables").update({ estado: "ocupada" }).eq("id", principal.id);
    const resto = selectedTables.slice(1);
    if (resto.length > 0) {
      await supabase.from("ldn_restaurant_tables").update({ estado: "ocupada", joined_to: principal.id }).in("id", resto);
    }
    closeTablePicker();
    reload();
    if (newOrder) setActiveOrderId(newOrder.id);
  }

  const activeOrder = openOrders.find((o) => o.id === activeOrderId) ?? null;

  if (activeOrder) {
    return (
      <TomarOrdenScreen
        order={activeOrder}
        openOrders={openOrders}
        tables={tables}
        menuItems={menuItems}
        products={products}
        onBack={() => setActiveOrderId(null)}
        onSwitchOrder={setActiveOrderId}
        reload={reload}
      />
    );
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
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted">
              {joinMode ? "Elige las mesas a unir" : "Elige una mesa libre"}
            </p>
            <label className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-muted">
              <input
                type="checkbox"
                checked={joinMode}
                onChange={(e) => {
                  setJoinMode(e.target.checked);
                  setSelectedTables([]);
                }}
              />
              Unir varias mesas
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {freeTables.map((t) => {
              const selected = selectedTables.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => (joinMode ? toggleSelected(t.id) : abrirMesaSola(t))}
                  className={`border px-3 py-1.5 font-mono text-xs ${
                    selected ? "border-teal bg-teal/10 text-teal" : "border-teal/40 text-teal hover:bg-teal/5"
                  }`}
                >
                  {t.nombre}
                </button>
              );
            })}
            <button onClick={closeTablePicker} className="px-3 py-1.5 font-mono text-xs text-muted hover:text-ink">
              Cancelar
            </button>
          </div>
          {joinMode && (
            <button
              onClick={abrirMesasUnidas}
              disabled={selectedTables.length === 0}
              className="btn btn-primary mt-3 px-4 py-1.5 text-[0.62rem] disabled:opacity-60"
            >
              Abrir {selectedTables.length > 1 ? `mesas unidas (${selectedTables.length})` : "mesa"}
            </button>
          )}
        </div>
      )}

      {newChannel && (
        <NewChannelOrderModal
          companyId={companyId}
          channel={newChannel}
          onClose={() => setNewChannel(null)}
          onCreated={(newOrderId) => {
            reload();
            setActiveOrderId(newOrderId);
          }}
        />
      )}

      {openOrders.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin pedidos abiertos.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {openOrders.map((order) => {
            const subtitle = orderSubtitle(order);
            return (
              <button
                key={order.id}
                onClick={() => setActiveOrderId(order.id)}
                className="border border-ink/10 bg-white p-4 text-left transition-colors hover:border-teal"
              >
                <p className="text-sm font-bold text-ink">{orderTitle(order, tables)}</p>
                {subtitle && <p className="mt-0.5 font-mono text-[0.6rem] text-muted">{subtitle}</p>}
                <p className="mt-2 font-mono text-[0.62rem] text-muted">
                  {order.items.length} platillo(s) · ${orderTotal(order, products).toFixed(2)}
                </p>
              </button>
            );
          })}
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
  onCreated: (newOrderId: string) => void;
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
    const { data: newOrder, error: insertError } = await supabase
      .from("ldn_restaurant_orders")
      .insert({
        company_id: companyId,
        canal: channel,
        mesero_id: user?.id ?? null,
        cliente_nombre: clienteNombre.trim() || null,
        telefono: telefono.trim() || null,
        direccion: direccion.trim() || null,
        referencia: referencia.trim() || null,
      })
      .select()
      .single();
    setSaving(false);
    if (insertError || !newOrder) {
      setError(insertError?.message ?? "No se pudo crear el pedido");
      return;
    }
    onCreated(newOrder.id);
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
