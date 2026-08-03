import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProcurementProduct } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

export default function CatalogoTab({
  companyId,
  productos,
  inventario,
  reload,
}: {
  companyId: string;
  productos: ProcurementProduct[];
  inventario: Record<string, number>;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<ProcurementProduct | null>(null);

  async function toggleActivo(p: ProcurementProduct) {
    await supabase.from("procurement_products").update({ activo: !p.activo }).eq("id", p.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Catálogo de productos
        </h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nuevo producto
        </button>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {productos.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin productos en el catálogo todavía.</p>}
        {productos.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {p.nombre} {p.sku && <span className="font-mono text-[0.62rem] text-muted">({p.sku})</span>}
              </p>
              <p className="font-mono text-[0.66rem] text-muted">
                {p.unidad} · costo ref. {money(p.costo_referencia)} · existencia {inventario[p.id] ?? 0} {p.unidad}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!p.activo && <Badge color="muted">Inactivo</Badge>}
              <button onClick={() => setEditing(p)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink">
                Editar
              </button>
              <button onClick={() => toggleActivo(p)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                {p.activo ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showNew || editing) && (
        <ProductoModal
          companyId={companyId}
          producto={editing}
          onClose={() => {
            setShowNew(false);
            setEditing(null);
          }}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function ProductoModal({
  companyId,
  producto,
  onClose,
  onSaved,
}: {
  companyId: string;
  producto: ProcurementProduct | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [sku, setSku] = useState(producto?.sku ?? "");
  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? "");
  const [unidad, setUnidad] = useState(producto?.unidad ?? "pza");
  const [costoReferencia, setCostoReferencia] = useState(String(producto?.costo_referencia ?? "0"));
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    const payload = {
      company_id: companyId,
      sku: sku.trim() || null,
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      unidad,
      costo_referencia: Number(costoReferencia),
    };
    if (producto) {
      await supabase.from("procurement_products").update(payload).eq("id", producto.id);
    } else {
      await supabase.from("procurement_products").insert(payload);
    }
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title={producto ? "Editar producto" : "Nuevo producto"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU (opcional)"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            placeholder="Unidad (pza, kg, lt…)"
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <input
            type="number"
            value={costoReferencia}
            onChange={(e) => setCostoReferencia(e.target.value)}
            placeholder="Costo de referencia"
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving || !nombre.trim()} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </Modal>
  );
}
