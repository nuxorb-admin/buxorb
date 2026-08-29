import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProcurementProduct, ProcurementWarehouse } from "../../../lib/database.types";
import type { ComprasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const TIPO_LABEL = { fisico: "Físico", canal: "Canal" } as const;

export default function AlmacenesTab({
  companyId,
  productos,
  almacenes,
  inventarioPorAlmacen,
  limits,
  reload,
}: {
  companyId: string;
  productos: ProcurementProduct[];
  almacenes: ProcurementWarehouse[];
  inventarioPorAlmacen: Record<string, number>;
  limits: ComprasTierLimits;
  reload: () => void;
}) {
  const [showNewAlmacen, setShowNewAlmacen] = useState(false);
  const [showTraspaso, setShowTraspaso] = useState(false);
  const [showAjuste, setShowAjuste] = useState(false);

  const productosActivos = productos.filter((p) => p.activo);

  function existencia(productoId: string, almacenId: string) {
    return inventarioPorAlmacen[`${productoId}:${almacenId}`] ?? 0;
  }

  const valorTotalCosto = productosActivos.reduce((sum, p) => {
    const existenciaTotal = almacenes.reduce((s, a) => s + existencia(p.id, a.id), 0);
    return sum + existenciaTotal * p.costo_referencia;
  }, 0);
  const valorTotalVenta = productosActivos.reduce((sum, p) => {
    if (p.precio_venta == null) return sum;
    const existenciaTotal = almacenes.reduce((s, a) => s + existencia(p.id, a.id), 0);
    return sum + existenciaTotal * p.precio_venta;
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Almacenes y canales
          </h3>
          <div className="flex gap-4">
            <button onClick={() => setShowAjuste(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted hover:text-ink">
              Ajustar por conteo
            </button>
            <button onClick={() => setShowTraspaso(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted hover:text-ink">
              Traspasar
            </button>
            <button onClick={() => setShowNewAlmacen(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
              + Nuevo almacén
            </button>
          </div>
        </div>

        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {almacenes.length === 0 && (
            <p className="p-4 font-mono text-xs text-muted">Sin almacenes todavía.</p>
          )}
          {almacenes.map((a) => {
            const totalAlmacen = productosActivos.reduce((sum, p) => sum + existencia(p.id, a.id), 0);
            return (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {a.nombre} {a.es_implicito && <span className="font-mono text-[0.62rem] text-muted">(implícito)</span>}
                  </p>
                  <p className="font-mono text-[0.66rem] text-muted">
                    {TIPO_LABEL[a.tipo]} · {totalAlmacen} unidades en existencia
                  </p>
                </div>
                {!a.activo && <Badge color="muted">Inactivo</Badge>}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Existencia por producto y almacén
        </h3>
        <div className="overflow-x-auto border border-ink/10 bg-white">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-ink/10 text-[0.62rem] uppercase tracking-[0.1em] text-muted">
                <th className="px-3 py-2">Producto</th>
                {almacenes.map((a) => (
                  <th key={a.id} className="px-3 py-2">{a.nombre}</th>
                ))}
                <th className="px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {productosActivos.map((p) => {
                const total = almacenes.reduce((s, a) => s + existencia(p.id, a.id), 0);
                const bajoMinimo = limits.alertaStockMinimo && p.stock_minimo != null && total < p.stock_minimo;
                return (
                  <tr key={p.id} className="border-b border-ink/5">
                    <td className="px-3 py-2 text-ink">
                      {p.nombre} {bajoMinimo && <Badge color="orange">Bajo mínimo</Badge>}
                    </td>
                    {almacenes.map((a) => (
                      <td key={a.id} className="px-3 py-2">{existencia(p.id, a.id)}</td>
                    ))}
                    <td className="px-3 py-2 font-bold text-ink">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {limits.valorInventario && (
        <div>
          <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Valor de inventario
          </h3>
          <div className="flex gap-6 border border-ink/10 bg-white p-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">A costo</p>
              <p className="text-lg font-semibold text-ink">{money(valorTotalCosto)}</p>
            </div>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">A precio de venta</p>
              <p className="text-lg font-semibold text-ink">{money(valorTotalVenta)}</p>
            </div>
          </div>
        </div>
      )}

      {showNewAlmacen && (
        <AlmacenModal companyId={companyId} onClose={() => setShowNewAlmacen(false)} onSaved={reload} />
      )}
      {showTraspaso && (
        <TraspasoModal
          productos={productosActivos}
          almacenes={almacenes}
          onClose={() => setShowTraspaso(false)}
          onSaved={reload}
        />
      )}
      {showAjuste && (
        <AjusteModal
          productos={productosActivos}
          almacenes={almacenes}
          existencia={existencia}
          onClose={() => setShowAjuste(false)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function AlmacenModal({
  companyId,
  onClose,
  onSaved,
}: {
  companyId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<"fisico" | "canal">("fisico");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("procurement_warehouses").insert({ company_id: companyId, nombre: nombre.trim(), tipo });
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Nuevo almacén" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre (ej. Bodega centro, Amazon FBA)"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as "fisico" | "canal")}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="fisico">Físico</option>
          <option value="canal">Canal (marketplace, tienda propia...)</option>
        </select>
        <button type="submit" disabled={saving || !nombre.trim()} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </Modal>
  );
}

function TraspasoModal({
  productos,
  almacenes,
  onClose,
  onSaved,
}: {
  productos: ProcurementProduct[];
  almacenes: ProcurementWarehouse[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [productoId, setProductoId] = useState(productos[0]?.id ?? "");
  const [origenId, setOrigenId] = useState(almacenes[0]?.id ?? "");
  const [destinoId, setDestinoId] = useState(almacenes[1]?.id ?? almacenes[0]?.id ?? "");
  const [cantidad, setCantidad] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!productoId || !origenId || !destinoId || origenId === destinoId || Number(cantidad) <= 0) return;
    setSaving(true);
    setError(null);
    const { error: dbError } = await supabase.rpc("procurement_transfer_stock", {
      p_producto_id: productoId,
      p_origen_id: origenId,
      p_destino_id: destinoId,
      p_cantidad: Number(cantidad),
    });
    setSaving(false);
    if (dbError) {
      setError("No se pudo registrar el traspaso.");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <Modal title="Traspaso entre almacenes" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {productos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <select
            value={origenId}
            onChange={(e) => setOrigenId(e.target.value)}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {almacenes.map((a) => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </select>
          <select
            value={destinoId}
            onChange={(e) => setDestinoId(e.target.value)}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {almacenes.map((a) => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </select>
        </div>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button
          type="submit"
          disabled={saving || !productoId || origenId === destinoId || Number(cantidad) <= 0}
          className="btn btn-primary w-full"
        >
          {saving ? "Guardando…" : "Traspasar"}
        </button>
      </form>
    </Modal>
  );
}

function AjusteModal({
  productos,
  almacenes,
  existencia,
  onClose,
  onSaved,
}: {
  productos: ProcurementProduct[];
  almacenes: ProcurementWarehouse[];
  existencia: (productoId: string, almacenId: string) => number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [productoId, setProductoId] = useState(productos[0]?.id ?? "");
  const [almacenId, setAlmacenId] = useState(almacenes[0]?.id ?? "");
  const [existenciaReal, setExistenciaReal] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actual = productoId && almacenId ? existencia(productoId, almacenId) : 0;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!productoId || !almacenId || existenciaReal.trim() === "") return;
    setSaving(true);
    setError(null);
    const { error: dbError } = await supabase.rpc("procurement_adjust_stock", {
      p_producto_id: productoId,
      p_almacen_id: almacenId,
      p_existencia_real: Number(existenciaReal),
    });
    setSaving(false);
    if (dbError) {
      setError("No se pudo registrar el ajuste.");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <Modal title="Ajuste por conteo físico" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {productos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        <select
          value={almacenId}
          onChange={(e) => setAlmacenId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {almacenes.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
        <p className="font-mono text-[0.62rem] text-muted">Existencia contable actual: {actual}</p>
        <input
          type="number"
          value={existenciaReal}
          onChange={(e) => setExistenciaReal(e.target.value)}
          placeholder="Existencia real contada"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button
          type="submit"
          disabled={saving || !productoId || !almacenId || existenciaReal.trim() === ""}
          className="btn btn-primary w-full"
        >
          {saving ? "Guardando…" : "Ajustar"}
        </button>
      </form>
    </Modal>
  );
}
