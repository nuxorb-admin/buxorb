import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  ProcurementProduct,
  ProcurementUnit,
  ProductoServicio,
  SalesProductKitItem,
  SalesProductRecipeItem,
  TipoCosteo,
} from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const TIPO_LABEL: Record<TipoCosteo, string> = {
  comercializado: "Comercializado",
  receta: "Receta",
  kit: "Kit",
};

function factorConversion(unidadLinea: string, unidadProducto: string, catalogo: ProcurementUnit[]) {
  if (!unidadLinea || unidadLinea === unidadProducto) return 1;
  const uLinea = catalogo.find((u) => u.codigo === unidadLinea);
  const uProducto = catalogo.find((u) => u.codigo === unidadProducto);
  if (!uLinea?.factor_base || !uProducto?.factor_base || uLinea.categoria !== uProducto.categoria) return 1;
  return uLinea.factor_base / uProducto.factor_base;
}

// Costo informativo: no toca precio_unitario. Comercializado toma el
// costo_referencia del insumo ligado; receta suma porciones convertidas
// a la unidad del insumo; kit suma el costo (ya calculado) de sus
// componentes por su cantidad. Un kit no puede contener otro kit, así
// que la recursión no necesita ir más de un nivel.
function costoCalculado(
  producto: ProductoServicio,
  recetaItems: SalesProductRecipeItem[],
  kitItems: SalesProductKitItem[],
  insumosCompra: ProcurementProduct[],
  unidadesCatalogo: ProcurementUnit[],
  productos: ProductoServicio[]
): number | null {
  if (producto.tipo_costeo === "comercializado") {
    const insumo = insumosCompra.find((i) => i.id === producto.producto_compra_id);
    return insumo ? insumo.costo_referencia : null;
  }
  if (producto.tipo_costeo === "receta") {
    const lineas = recetaItems.filter((r) => r.sales_product_id === producto.id);
    if (lineas.length === 0) return null;
    let total = 0;
    for (const linea of lineas) {
      const insumo = insumosCompra.find((i) => i.id === linea.procurement_product_id);
      if (!insumo) continue;
      const factor = factorConversion(linea.unidad, insumo.unidad, unidadesCatalogo);
      total += linea.cantidad * factor * insumo.costo_referencia;
    }
    return total;
  }
  // kit
  const lineas = kitItems.filter((k) => k.sales_product_id === producto.id);
  if (lineas.length === 0) return null;
  let total = 0;
  for (const linea of lineas) {
    const componente = productos.find((p) => p.id === linea.componente_producto_id);
    if (!componente) continue;
    const costoComponente = costoCalculado(componente, recetaItems, kitItems, insumosCompra, unidadesCatalogo, productos);
    if (costoComponente === null) continue;
    total += linea.cantidad * costoComponente;
  }
  return total;
}

export default function CatalogoTab({
  companyId,
  productos,
  recetaItems,
  kitItems,
  insumosCompra,
  unidadesCatalogo,
  reload,
}: {
  companyId: string;
  productos: ProductoServicio[];
  recetaItems: SalesProductRecipeItem[];
  kitItems: SalesProductKitItem[];
  insumosCompra: ProcurementProduct[];
  unidadesCatalogo: ProcurementUnit[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<ProductoServicio | null>(null);

  async function toggleActivo(p: ProductoServicio) {
    await supabase.from("sales_products_services").update({ activo: !p.activo }).eq("id", p.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Catálogo de productos y servicios</h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nuevo producto/servicio
        </button>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {productos.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin productos/servicios todavía.</p>}
        {productos.map((p) => {
          const costo = costoCalculado(p, recetaItems, kitItems, insumosCompra, unidadesCatalogo, productos);
          return (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{p.nombre}</p>
                <p className="font-mono text-[0.66rem] text-muted">
                  {money(p.precio_unitario)}/{p.unidad} · IVA {p.tasa_iva === "exento" ? "exento" : `${p.tasa_iva}%`} ·{" "}
                  {TIPO_LABEL[p.tipo_costeo]} · costo {costo === null ? "sin definir" : `${money(costo)} (informativo)`}
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
          );
        })}
      </div>

      {(showNew || editing) && (
        <ProductoModal
          companyId={companyId}
          producto={editing}
          productos={productos}
          recetaItems={recetaItems}
          kitItems={kitItems}
          insumosCompra={insumosCompra}
          unidadesCatalogo={unidadesCatalogo}
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

interface RecetaLinea {
  procurement_product_id: string;
  cantidad: string;
  unidad: string;
}

interface KitLinea {
  componente_producto_id: string;
  cantidad: string;
}

function ProductoModal({
  companyId,
  producto,
  productos,
  recetaItems,
  kitItems,
  insumosCompra,
  unidadesCatalogo,
  onClose,
  onSaved,
}: {
  companyId: string;
  producto: ProductoServicio | null;
  productos: ProductoServicio[];
  recetaItems: SalesProductRecipeItem[];
  kitItems: SalesProductKitItem[];
  insumosCompra: ProcurementProduct[];
  unidadesCatalogo: ProcurementUnit[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? "");
  const [unidad, setUnidad] = useState(producto?.unidad ?? "pza");
  const [precio, setPrecio] = useState(String(producto?.precio_unitario ?? "0"));
  const [tasaIva, setTasaIva] = useState<"16" | "0" | "exento">((producto?.tasa_iva as "16" | "0" | "exento") ?? "16");
  const [tipoCosteo, setTipoCosteo] = useState<TipoCosteo>(producto?.tipo_costeo ?? "comercializado");
  const [productoCompraId, setProductoCompraId] = useState(producto?.producto_compra_id ?? "");
  const [recetaLineas, setRecetaLineas] = useState<RecetaLinea[]>(
    producto ? recetaItems.filter((r) => r.sales_product_id === producto.id).map((r) => ({ procurement_product_id: r.procurement_product_id, cantidad: String(r.cantidad), unidad: r.unidad })) : []
  );
  const [kitLineas, setKitLineas] = useState<KitLinea[]>(
    producto ? kitItems.filter((k) => k.sales_product_id === producto.id).map((k) => ({ componente_producto_id: k.componente_producto_id, cantidad: String(k.cantidad) })) : []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Un kit no puede contener otro kit ni a sí mismo.
  const componentesDisponibles = productos.filter((p) => p.tipo_costeo !== "kit" && p.id !== producto?.id);

  function addRecetaLinea() {
    setRecetaLineas((prev) => [...prev, { procurement_product_id: insumosCompra[0]?.id ?? "", cantidad: "1", unidad: insumosCompra[0]?.unidad ?? "pza" }]);
  }
  function addKitLinea() {
    setKitLineas((prev) => [...prev, { componente_producto_id: componentesDisponibles[0]?.id ?? "", cantidad: "1" }]);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    setError(null);

    const payload = {
      company_id: companyId,
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      unidad,
      precio_unitario: Number(precio) || 0,
      tasa_iva: tasaIva,
      tipo_costeo: tipoCosteo,
      producto_compra_id: tipoCosteo === "comercializado" ? productoCompraId || null : null,
    };

    const { data: saved, error: dbError } = producto
      ? await supabase.from("sales_products_services").update(payload).eq("id", producto.id).select().single()
      : await supabase.from("sales_products_services").insert(payload).select().single();

    if (dbError || !saved) {
      setSaving(false);
      setError("No se pudo guardar el producto.");
      return;
    }

    await supabase.from("sales_product_recipe_items").delete().eq("sales_product_id", saved.id);
    await supabase.from("sales_product_kit_items").delete().eq("sales_product_id", saved.id);

    if (tipoCosteo === "receta" && recetaLineas.length > 0) {
      await supabase.from("sales_product_recipe_items").insert(
        recetaLineas
          .filter((l) => l.procurement_product_id && Number(l.cantidad) > 0)
          .map((l) => ({ sales_product_id: saved.id, procurement_product_id: l.procurement_product_id, cantidad: Number(l.cantidad), unidad: l.unidad }))
      );
    }
    if (tipoCosteo === "kit" && kitLineas.length > 0) {
      await supabase.from("sales_product_kit_items").insert(
        kitLineas
          .filter((l) => l.componente_producto_id && Number(l.cantidad) > 0)
          .map((l) => ({ sales_product_id: saved.id, componente_producto_id: l.componente_producto_id, cantidad: Number(l.cantidad) }))
      );
    }

    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title={producto ? "Editar producto/servicio" : "Nuevo producto/servicio"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
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
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio unitario"
            className="w-1/3 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <input
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            placeholder="Unidad"
            className="w-1/3 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <select
            value={tasaIva}
            onChange={(e) => setTasaIva(e.target.value as "16" | "0" | "exento")}
            className="w-1/3 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="16">IVA 16%</option>
            <option value="0">IVA 0%</option>
            <option value="exento">Exento</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">Costeo</p>
          <div className="flex gap-3">
            {(["comercializado", "receta", "kit"] as TipoCosteo[]).map((t) => (
              <label key={t} className="flex items-center gap-1.5 font-mono text-xs text-ink">
                <input type="radio" checked={tipoCosteo === t} onChange={() => setTipoCosteo(t)} />
                {TIPO_LABEL[t]}
              </label>
            ))}
          </div>
        </div>

        {tipoCosteo === "comercializado" && (
          <div>
            <select
              value={productoCompraId}
              onChange={(e) => setProductoCompraId(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="">Sin ligar a insumo de compras</option>
              {insumosCompra.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre} · {money(i.costo_referencia)}/{i.unidad}
                </option>
              ))}
            </select>
            <p className="mt-1 font-mono text-[0.6rem] text-muted">
              Se compra y se revende tal cual. Ligarlo a un insumo del catálogo de Compras trae su costo promedio como referencia.
            </p>
          </div>
        )}

        {tipoCosteo === "receta" && (
          <div className="space-y-2">
            <p className="font-mono text-[0.6rem] text-muted">Porciones de insumos del catálogo de Compras que arman este producto.</p>
            {insumosCompra.length === 0 && <p className="font-mono text-[0.6rem] text-orange">No hay insumos activos en el catálogo de Compras todavía.</p>}
            {recetaLineas.map((linea, i) => (
              <div key={i} className="flex gap-2">
                <select
                  value={linea.procurement_product_id}
                  onChange={(e) => {
                    const insumo = insumosCompra.find((ins) => ins.id === e.target.value);
                    setRecetaLineas((prev) => prev.map((l, idx) => (idx === i ? { ...l, procurement_product_id: e.target.value, unidad: insumo?.unidad ?? l.unidad } : l)));
                  }}
                  className="w-1/2 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                >
                  {insumosCompra.map((ins) => (
                    <option key={ins.id} value={ins.id}>
                      {ins.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={linea.cantidad}
                  onChange={(e) => setRecetaLineas((prev) => prev.map((l, idx) => (idx === i ? { ...l, cantidad: e.target.value } : l)))}
                  placeholder="Cantidad"
                  className="w-1/4 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                />
                <select
                  value={linea.unidad}
                  onChange={(e) => setRecetaLineas((prev) => prev.map((l, idx) => (idx === i ? { ...l, unidad: e.target.value } : l)))}
                  className="w-1/4 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                >
                  {unidadesCatalogo.map((u) => (
                    <option key={u.id} value={u.codigo}>
                      {u.codigo}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => setRecetaLineas((prev) => prev.filter((_, idx) => idx !== i))} className="font-mono text-xs text-orange">
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addRecetaLinea} disabled={insumosCompra.length === 0} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
              + Agregar insumo
            </button>
          </div>
        )}

        {tipoCosteo === "kit" && (
          <div className="space-y-2">
            <p className="font-mono text-[0.6rem] text-muted">Otros productos/servicios de este catálogo que arman este kit.</p>
            {componentesDisponibles.length === 0 && <p className="font-mono text-[0.6rem] text-orange">No hay productos disponibles para armar un kit (un kit no puede contener otro kit).</p>}
            {kitLineas.map((linea, i) => (
              <div key={i} className="flex gap-2">
                <select
                  value={linea.componente_producto_id}
                  onChange={(e) => setKitLineas((prev) => prev.map((l, idx) => (idx === i ? { ...l, componente_producto_id: e.target.value } : l)))}
                  className="w-2/3 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                >
                  {componentesDisponibles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={linea.cantidad}
                  onChange={(e) => setKitLineas((prev) => prev.map((l, idx) => (idx === i ? { ...l, cantidad: e.target.value } : l)))}
                  placeholder="Cantidad"
                  className="w-1/4 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                />
                <button type="button" onClick={() => setKitLineas((prev) => prev.filter((_, idx) => idx !== i))} className="font-mono text-xs text-orange">
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addKitLinea} disabled={componentesDisponibles.length === 0} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
              + Agregar producto
            </button>
          </div>
        )}

        <button type="submit" disabled={saving || !nombre.trim()} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </Modal>
  );
}
