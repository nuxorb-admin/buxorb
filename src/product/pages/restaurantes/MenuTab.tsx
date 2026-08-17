import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio, RestaurantMenuItem } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

export default function MenuTab({
  companyId,
  products,
  menuItems,
  reload,
}: {
  companyId: string;
  products: ProductoServicio[];
  menuItems: RestaurantMenuItem[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);

  const productsInMenu = new Set(menuItems.map((m) => m.sales_product_id));
  const availableProducts = products.filter((p) => !productsInMenu.has(p.id));

  async function toggleDisponible(item: RestaurantMenuItem) {
    await supabase.from("ldn_restaurant_menu_items").update({ disponible: !item.disponible }).eq("id", item.id);
    reload();
  }

  async function quitarDelMenu(item: RestaurantMenuItem) {
    await supabase.from("ldn_restaurant_menu_items").delete().eq("id", item.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Menú ({menuItems.filter((m) => m.disponible).length} disponibles)
        </h3>
        <button
          onClick={() => setShowNew(true)}
          disabled={availableProducts.length === 0}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Agregar platillo
        </button>
      </div>

      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Los platillos salen del catálogo de Ventas y CxC — precio e IVA se editan ahí. Aquí solo eliges cuáles
        aparecen en el menú, su categoría y si están disponibles.
      </p>

      {products.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Todavía no tienes productos en el catálogo de Ventas y CxC.</p>
      ) : menuItems.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin platillos en el menú todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {menuItems.map((item) => {
            const product = products.find((p) => p.id === item.sales_product_id);
            return (
              <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className={`text-sm ${item.disponible ? "text-ink" : "text-muted line-through"}`}>
                    {product?.nombre ?? "Producto eliminado"}
                  </span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {item.categoria || "Sin categoría"} · ${product?.precio_unitario.toFixed(2) ?? "—"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button onClick={() => toggleDisponible(item)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                    {item.disponible ? "Marcar agotado" : "Marcar disponible"}
                  </button>
                  <button onClick={() => quitarDelMenu(item)} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewMenuItemModal companyId={companyId} availableProducts={availableProducts} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
    </div>
  );
}

function NewMenuItemModal({
  companyId,
  availableProducts,
  onClose,
  onCreated,
}: {
  companyId: string;
  availableProducts: ProductoServicio[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [productId, setProductId] = useState(availableProducts[0]?.id ?? "");
  const [categoria, setCategoria] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!productId) return;
    setSaving(true);
    const { error: insertError } = await supabase.from("ldn_restaurant_menu_items").insert({
      company_id: companyId,
      sales_product_id: productId,
      categoria: categoria.trim() || null,
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
    <Modal title="Agregar platillo al menú" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Producto del catálogo de Ventas
          </label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — ${p.precio_unitario.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <FieldInput label="Categoría (opcional)" value={categoria} onChange={setCategoria} placeholder="Ej. Entradas, Bebidas, Postres" />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Agregando…" : "Agregar al menú"}
        </button>
      </form>
    </Modal>
  );
}
