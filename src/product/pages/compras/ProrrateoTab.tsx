import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  ProcurementProduct,
  ProcurementShipment,
  ProcurementShipmentCost,
  ProcurementShipmentItem,
  ProcurementUnit,
  ShipmentCriterio,
} from "../../../lib/database.types";
import type { FacturaFull } from "./useComprasData";
import { recalcularCostoReferencia } from "./useComprasData";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";
import Badge from "../../../admin/components/Badge";

const CRITERIO_LABELS: Record<ShipmentCriterio, string> = {
  peso_volumetrico: "Peso volumétrico",
  peso_real: "Peso real",
  valor_mercancia: "Valor de mercancía",
  cantidad_unidades: "Cantidad de unidades",
  manual: "Manual",
};

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

export default function ProrrateoTab({
  companyId,
  productos,
  facturas,
  shipments,
  shipmentCosts,
  shipmentItems,
  unidadesCatalogo,
  reload,
}: {
  companyId: string;
  productos: ProcurementProduct[];
  facturas: FacturaFull[];
  shipments: ProcurementShipment[];
  shipmentCosts: ProcurementShipmentCost[];
  shipmentItems: ProcurementShipmentItem[];
  unidadesCatalogo: ProcurementUnit[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = shipments.find((s) => s.id === selectedId) ?? null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Embarques ({shipments.length})
        </h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nuevo embarque
        </button>
      </div>
      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Reparte los costos conjuntos de un embarque (envío, impuestos, logística) entre los productos que viajaron
        juntos, y súmalo al costo de referencia de cada uno.
      </p>

      {shipments.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin embarques todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {shipments.map((s) => {
            const costos = shipmentCosts.filter((c) => c.shipment_id === s.id);
            const items = shipmentItems.filter((i) => i.shipment_id === s.id);
            const totalCostos = costos.reduce((sum, c) => sum + Number(c.monto), 0);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left hover:bg-sand-2"
              >
                <div>
                  <span className="text-sm font-semibold text-ink">{s.nombre}</span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {CRITERIO_LABELS[s.criterio]} · {items.length} producto(s) · {money(totalCostos)} a repartir
                  </p>
                </div>
                <Badge color={s.estado === "aplicado" ? "teal" : "muted"}>
                  {s.estado === "aplicado" ? "Aplicado" : "Borrador"}
                </Badge>
              </button>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewShipmentModal
          companyId={companyId}
          onClose={() => setShowNew(false)}
          onCreated={(id) => {
            reload();
            setSelectedId(id);
          }}
        />
      )}

      {selected && (
        <ShipmentDetailModal
          shipment={selected}
          costos={shipmentCosts.filter((c) => c.shipment_id === selected.id)}
          items={shipmentItems.filter((i) => i.shipment_id === selected.id)}
          productos={productos}
          facturas={facturas}
          unidadesCatalogo={unidadesCatalogo}
          onClose={() => setSelectedId(null)}
          reload={reload}
        />
      )}
    </div>
  );
}

function NewShipmentModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: (id: string) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [criterio, setCriterio] = useState<ShipmentCriterio>("peso_volumetrico");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from("procurement_shipments")
      .insert({ company_id: companyId, nombre: nombre.trim(), criterio })
      .select()
      .single();
    setSaving(false);
    if (insertError || !data) {
      setError(insertError?.message ?? "No se pudo crear el embarque");
      return;
    }
    onCreated(data.id);
    onClose();
  }

  return (
    <Modal title="Nuevo embarque" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <FieldInput label="Nombre" value={nombre} onChange={setNombre} required placeholder="Ej. Embarque agosto 2026" />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Criterio de reparto
          </label>
          <select
            value={criterio}
            onChange={(e) => setCriterio(e.target.value as ShipmentCriterio)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {Object.entries(CRITERIO_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <p className="mt-1 font-mono text-[0.58rem] text-muted">
            Define cómo se calcula la participación de cada producto — siempre editable a mano después.
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear embarque"}
        </button>
      </form>
    </Modal>
  );
}

function valorReparto(criterio: ShipmentCriterio, producto: ProcurementProduct | undefined, cantidad: number): number | null {
  if (!producto) return null;
  switch (criterio) {
    case "peso_volumetrico":
      return producto.peso_volumetrico != null ? producto.peso_volumetrico * cantidad : null;
    case "peso_real":
      return producto.peso != null ? producto.peso * cantidad : null;
    case "cantidad_unidades":
      return cantidad;
    default:
      return null;
  }
}

function ShipmentDetailModal({
  shipment,
  costos,
  items,
  productos,
  facturas,
  unidadesCatalogo,
  onClose,
  reload,
}: {
  shipment: ProcurementShipment;
  costos: ProcurementShipmentCost[];
  items: ProcurementShipmentItem[];
  productos: ProcurementProduct[];
  facturas: FacturaFull[];
  unidadesCatalogo: ProcurementUnit[];
  onClose: () => void;
  reload: () => void;
}) {
  const readOnly = shipment.estado === "aplicado";
  const [aplicando, setAplicando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCostos = costos.reduce((sum, c) => sum + Number(c.monto), 0);
  const totalValorReparto = items.reduce((sum, i) => sum + Number(i.valor_reparto ?? 0), 0);

  function previewCosto(item: ProcurementShipmentItem): number {
    if (item.costo_asignado != null) return item.costo_asignado;
    if (totalValorReparto <= 0) return 0;
    return (Number(item.valor_reparto ?? 0) / totalValorReparto) * totalCostos;
  }

  async function agregarCosto(concepto: string, monto: number, facturaId: string | null) {
    await supabase.from("procurement_shipment_costs").insert({ shipment_id: shipment.id, concepto, monto, factura_id: facturaId });
    reload();
  }

  async function quitarCosto(id: string) {
    await supabase.from("procurement_shipment_costs").delete().eq("id", id);
    reload();
  }

  async function agregarProducto(productoId: string, cantidad: number) {
    const producto = productos.find((p) => p.id === productoId);
    await supabase.from("procurement_shipment_items").insert({
      shipment_id: shipment.id,
      producto_id: productoId,
      cantidad,
      valor_reparto: valorReparto(shipment.criterio, producto, cantidad),
    });
    reload();
  }

  async function actualizarValorReparto(itemId: string, valor: number) {
    await supabase.from("procurement_shipment_items").update({ valor_reparto: valor }).eq("id", itemId);
    reload();
  }

  async function quitarProducto(id: string) {
    await supabase.from("procurement_shipment_items").delete().eq("id", id);
    reload();
  }

  async function aplicar() {
    if (items.length === 0 || totalValorReparto <= 0) return;
    setAplicando(true);
    setError(null);

    for (const item of items) {
      const costoAsignado = (Number(item.valor_reparto ?? 0) / totalValorReparto) * totalCostos;
      await supabase.from("procurement_shipment_items").update({ costo_asignado: costoAsignado }).eq("id", item.id);
    }
    await supabase
      .from("procurement_shipments")
      .update({ estado: "aplicado", applied_at: new Date().toISOString() })
      .eq("id", shipment.id);

    const productosAfectados = [...new Set(items.map((i) => i.producto_id))];
    await Promise.all(productosAfectados.map((id) => recalcularCostoReferencia(id, unidadesCatalogo)));

    setAplicando(false);
    reload();
    onClose();
  }

  return (
    <Modal title={shipment.nombre} onClose={onClose} size="lg">
      <div className="mb-4 flex items-center gap-3">
        <Badge color={readOnly ? "teal" : "muted"}>{readOnly ? "Aplicado" : "Borrador"}</Badge>
        <span className="font-mono text-[0.62rem] text-muted">{CRITERIO_LABELS[shipment.criterio]}</span>
      </div>
      {error && <div className="mb-3 border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

      <h4 className="mb-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.1em] text-muted">
        Costos a repartir — {money(totalCostos)}
      </h4>
      <div className="mb-2 divide-y divide-ink/10 border border-ink/10 bg-white">
        {costos.length === 0 && <p className="p-3 font-mono text-[0.62rem] text-muted">Sin costos todavía.</p>}
        {costos.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-2 px-3 py-2">
            <span className="font-mono text-[0.68rem] text-ink">{c.concepto}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.68rem] text-ink">{money(c.monto)}</span>
              {!readOnly && (
                <button onClick={() => quitarCosto(c.id)} className="font-mono text-[0.58rem] uppercase text-orange hover:underline">
                  Quitar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {!readOnly && <AddCostoForm facturas={facturas} onAdd={agregarCosto} />}

      <h4 className="mb-2 mt-6 font-mono text-[0.64rem] font-bold uppercase tracking-[0.1em] text-muted">
        Productos del embarque
      </h4>
      <div className="mb-2 overflow-x-auto border border-ink/10 bg-white">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-ink/10 text-[0.6rem] uppercase tracking-[0.1em] text-muted">
              <th className="px-3 py-2">Producto</th>
              <th className="px-3 py-2">Cantidad</th>
              <th className="px-3 py-2">Valor de reparto</th>
              <th className="px-3 py-2">%</th>
              <th className="px-3 py-2">Costo asignado</th>
              {!readOnly && <th className="px-3 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-3 text-[0.62rem] text-muted">Sin productos todavía.</td>
              </tr>
            )}
            {items.map((i) => {
              const producto = productos.find((p) => p.id === i.producto_id);
              const pct = totalValorReparto > 0 ? (Number(i.valor_reparto ?? 0) / totalValorReparto) * 100 : 0;
              return (
                <tr key={i.id} className="border-b border-ink/5">
                  <td className="px-3 py-2 text-ink">{producto?.nombre ?? "—"}</td>
                  <td className="px-3 py-2">{i.cantidad}</td>
                  <td className="px-3 py-2">
                    {readOnly ? (
                      i.valor_reparto
                    ) : (
                      <input
                        type="number"
                        value={i.valor_reparto ?? ""}
                        onChange={(e) => actualizarValorReparto(i.id, Number(e.target.value))}
                        className="w-24 border border-ink/15 bg-sand-2 px-2 py-1 text-xs text-ink focus:border-teal focus:outline-none"
                      />
                    )}
                  </td>
                  <td className="px-3 py-2">{pct.toFixed(1)}%</td>
                  <td className="px-3 py-2 font-bold text-ink">{money(previewCosto(i))}</td>
                  {!readOnly && (
                    <td className="px-3 py-2">
                      <button onClick={() => quitarProducto(i.id)} className="font-mono text-[0.58rem] uppercase text-orange hover:underline">
                        Quitar
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!readOnly && <AddProductoForm productos={productos} onAdd={agregarProducto} />}

      {!readOnly && (
        <button
          onClick={aplicar}
          disabled={aplicando || items.length === 0 || totalValorReparto <= 0 || totalCostos <= 0}
          className="btn btn-primary mt-5 w-full disabled:opacity-50"
        >
          {aplicando ? "Aplicando…" : "Aplicar prorrateo"}
        </button>
      )}
    </Modal>
  );
}

function AddCostoForm({
  facturas,
  onAdd,
}: {
  facturas: FacturaFull[];
  onAdd: (concepto: string, monto: number, facturaId: string | null) => void;
}) {
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [facturaId, setFacturaId] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const m = Number(monto);
    if (!concepto.trim() || m <= 0) return;
    onAdd(concepto.trim(), m, facturaId || null);
    setConcepto("");
    setMonto("");
    setFacturaId("");
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-2 border border-ink/10 bg-sand-2 p-3">
      <input
        value={concepto}
        onChange={(e) => setConcepto(e.target.value)}
        placeholder="Concepto (ej. Envío inicial)"
        className="flex-1 border border-ink/15 bg-white px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      />
      <select
        value={facturaId}
        onChange={(e) => {
          setFacturaId(e.target.value);
          const f = facturas.find((x) => x.id === e.target.value);
          if (f) setMonto(String(f.total ?? 0));
        }}
        className="border border-ink/15 bg-white px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      >
        <option value="">Sin ligar a factura</option>
        {facturas.map((f) => (
          <option key={f.id} value={f.id}>{(f.uuid_fiscal ?? f.id).slice(0, 8)}… — {money(f.total ?? 0)}</option>
        ))}
      </select>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto"
        className="w-28 border border-ink/15 bg-white px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      />
      <button type="submit" className="font-mono text-[0.6rem] uppercase text-teal hover:underline">
        + Agregar
      </button>
    </form>
  );
}

function AddProductoForm({
  productos,
  onAdd,
}: {
  productos: ProcurementProduct[];
  onAdd: (productoId: string, cantidad: number) => void;
}) {
  const [productoId, setProductoId] = useState(productos[0]?.id ?? "");
  const [cantidad, setCantidad] = useState("1");

  function submit(e: FormEvent) {
    e.preventDefault();
    const c = Number(cantidad);
    if (!productoId || c <= 0) return;
    onAdd(productoId, c);
    setCantidad("1");
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-2 border border-ink/10 bg-sand-2 p-3">
      <select
        value={productoId}
        onChange={(e) => setProductoId(e.target.value)}
        className="flex-1 border border-ink/15 bg-white px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      >
        {productos.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
        className="w-24 border border-ink/15 bg-white px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
      />
      <button type="submit" disabled={!productoId} className="font-mono text-[0.6rem] uppercase text-teal hover:underline">
        + Agregar
      </button>
    </form>
  );
}
