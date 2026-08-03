import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ComprasSettings, ProcurementProduct, ProcurementUnit } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

export default function CatalogoTab({
  companyId,
  productos,
  inventario,
  unidadesCatalogo,
  settings,
  reload,
}: {
  companyId: string;
  productos: ProcurementProduct[];
  inventario: Record<string, number>;
  unidadesCatalogo: ProcurementUnit[];
  settings: ComprasSettings;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<ProcurementProduct | null>(null);
  const [showUnidades, setShowUnidades] = useState(false);

  const unidadesActivas = unidadesCatalogo.filter((u) => (settings.unidades_activas ?? []).includes(u.codigo));

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
        <div className="flex gap-4">
          <button onClick={() => setShowUnidades(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted hover:text-ink">
            Configurar unidades
          </button>
          <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
            + Nuevo producto
          </button>
        </div>
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
          unidadesActivas={unidadesActivas}
          onClose={() => {
            setShowNew(false);
            setEditing(null);
          }}
          onSaved={reload}
        />
      )}

      {showUnidades && (
        <UnidadesModal
          companyId={companyId}
          unidadesCatalogo={unidadesCatalogo}
          activas={settings.unidades_activas ?? []}
          onClose={() => setShowUnidades(false)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

const CATEGORIA_LABEL = { pieza: "Pieza", peso: "Peso", volumen: "Volumen", longitud: "Longitud", otro: "Otro" };

function UnidadesModal({
  companyId,
  unidadesCatalogo,
  activas,
  onClose,
  onSaved,
}: {
  companyId: string;
  unidadesCatalogo: ProcurementUnit[];
  activas: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [seleccion, setSeleccion] = useState<string[]>(activas);
  const [saving, setSaving] = useState(false);

  function toggle(codigo: string) {
    setSeleccion((prev) => (prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]));
  }

  async function guardar() {
    setSaving(true);
    await supabase.from("procurement_settings").update({ unidades_activas: seleccion }).eq("company_id", companyId);
    setSaving(false);
    onSaved();
    onClose();
  }

  const porCategoria = unidadesCatalogo.reduce<Record<string, ProcurementUnit[]>>((acc, u) => {
    (acc[u.categoria] ??= []).push(u);
    return acc;
  }, {});

  return (
    <Modal title="Configurar unidades de medida" onClose={onClose}>
      <div className="space-y-4">
        <p className="font-mono text-[0.62rem] text-muted">
          Elige qué unidades aparecen al capturar un producto en el catálogo.
        </p>
        {Object.entries(porCategoria).map(([categoria, unidades]) => (
          <div key={categoria}>
            <p className="mb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">
              {CATEGORIA_LABEL[categoria as keyof typeof CATEGORIA_LABEL] ?? categoria}
            </p>
            <div className="flex flex-wrap gap-3">
              {unidades.map((u) => (
                <label key={u.id} className="flex items-center gap-1.5 font-mono text-xs text-ink">
                  <input type="checkbox" checked={seleccion.includes(u.codigo)} onChange={() => toggle(u.codigo)} />
                  {u.nombre} ({u.codigo})
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={guardar} disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}

function ProductoModal({
  companyId,
  producto,
  unidadesActivas,
  onClose,
  onSaved,
}: {
  companyId: string;
  producto: ProcurementProduct | null;
  unidadesActivas: ProcurementUnit[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [sku, setSku] = useState(producto?.sku ?? "");
  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? "");
  const [unidad, setUnidad] = useState(producto?.unidad ?? unidadesActivas[0]?.codigo ?? "pza");
  const [costoReferencia, setCostoReferencia] = useState(String(producto?.costo_referencia ?? "0"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !sku.trim()) return;
    setSaving(true);
    setError(null);
    const payload = {
      company_id: companyId,
      sku: sku.trim(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      unidad,
      costo_referencia: Number(costoReferencia),
    };
    const { error: dbError } = producto
      ? await supabase.from("procurement_products").update(payload).eq("id", producto.id)
      : await supabase.from("procurement_products").insert(payload);
    setSaving(false);
    if (dbError) {
      setError(dbError.code === "23505" ? "Ya existe un producto con ese SKU." : "No se pudo guardar el producto.");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <Modal title={producto ? "Editar producto" : "Nuevo producto"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU"
          required
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <div className="flex gap-2">
          <select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {unidadesActivas.length === 0 && <option value={unidad}>{unidad}</option>}
            {unidadesActivas.map((u) => (
              <option key={u.id} value={u.codigo}>
                {u.nombre} ({u.codigo})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={costoReferencia}
            onChange={(e) => setCostoReferencia(e.target.value)}
            placeholder="Costo de referencia"
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        {unidadesActivas.length === 0 && (
          <p className="font-mono text-[0.6rem] text-orange">
            No hay unidades habilitadas — usa "Configurar unidades" para elegir cuáles mostrar.
          </p>
        )}
        <button type="submit" disabled={saving || !nombre.trim() || !sku.trim()} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </Modal>
  );
}
