import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ProductoServicio } from "../../../lib/database.types";
import type { MenuItemWithOptions } from "./useRestaurantesData";
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
  menuItems: MenuItemWithOptions[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [configuringOptionsForId, setConfiguringOptionsForId] = useState<string | null>(null);
  const configuringOptionsFor = menuItems.find((m) => m.id === configuringOptionsForId) ?? null;

  const productsInMenu = new Set(menuItems.map((m) => m.sales_product_id));
  const availableProducts = products.filter((p) => !productsInMenu.has(p.id));

  async function toggleDisponible(item: MenuItemWithOptions) {
    await supabase.from("ldn_restaurant_menu_items").update({ disponible: !item.disponible }).eq("id", item.id);
    reload();
  }

  async function quitarDelMenu(item: MenuItemWithOptions) {
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
                <div className="flex items-center gap-3">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={product?.nombre ?? ""} className="h-12 w-12 flex-none object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 flex-none items-center justify-center bg-sand-2 font-display text-lg uppercase text-ink/20">
                      {(product?.nombre ?? "—").charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className={`text-sm ${item.disponible ? "text-ink" : "text-muted line-through"}`}>
                      {product?.nombre ?? "Producto eliminado"}
                    </span>
                    <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                      {item.categoria || "Sin categoría"} · ${product?.precio_unitario.toFixed(2) ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <PhotoUploadButton companyId={companyId} menuItemId={item.id} hasPhoto={!!item.foto_url} onUploaded={reload} />
                  <button onClick={() => setConfiguringOptionsForId(item.id)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                    Opciones {item.option_groups.length > 0 ? `(${item.option_groups.length})` : ""}
                  </button>
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

      {configuringOptionsFor && (
        <OptionsModal
          item={configuringOptionsFor}
          productName={products.find((p) => p.id === configuringOptionsFor.sales_product_id)?.nombre ?? "—"}
          onClose={() => setConfiguringOptionsForId(null)}
          onChanged={reload}
        />
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

function OptionsModal({
  item,
  productName,
  onClose,
  onChanged,
}: {
  item: MenuItemWithOptions;
  productName: string;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [showNewGroup, setShowNewGroup] = useState(false);

  async function quitarGrupo(groupId: string) {
    await supabase.from("ldn_restaurant_menu_item_option_groups").delete().eq("id", groupId);
    onChanged();
  }

  async function quitarOpcion(optionId: string) {
    await supabase.from("ldn_restaurant_menu_item_options").delete().eq("id", optionId);
    onChanged();
  }

  return (
    <Modal title={`Opciones — ${productName}`} onClose={onClose} size="lg">
      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Grupos de opciones que el mesero elige al agregar este platillo (ej. "Elige tu cerveza"). Cada grupo es de
        una sola opción; márcalo obligatorio si no se puede agregar el platillo sin elegir una.
      </p>

      {item.option_groups.length === 0 ? (
        <p className="mb-4 font-mono text-[0.68rem] text-muted">Sin grupos de opciones todavía.</p>
      ) : (
        <div className="mb-4 space-y-3">
          {item.option_groups.map((group) => (
            <div key={group.id} className="border border-ink/10 bg-sand-2 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">
                  {group.nombre}{" "}
                  {group.obligatorio && (
                    <span className="ml-1 font-mono text-[0.56rem] uppercase tracking-[0.06em] text-orange">Obligatorio</span>
                  )}
                </p>
                <button onClick={() => quitarGrupo(group.id)} className="font-mono text-[0.58rem] uppercase text-orange hover:underline">
                  Quitar grupo
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.options.map((opt) => (
                  <span key={opt.id} className="flex items-center gap-1 border border-ink/15 bg-white px-2 py-1 font-mono text-[0.62rem] text-ink">
                    {opt.nombre}
                    <button onClick={() => quitarOpcion(opt.id)} className="text-muted hover:text-orange">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <NewOptionForm groupId={group.id} onCreated={onChanged} />
            </div>
          ))}
        </div>
      )}

      {showNewGroup ? (
        <NewGroupForm menuItemId={item.id} onClose={() => setShowNewGroup(false)} onCreated={onChanged} />
      ) : (
        <button onClick={() => setShowNewGroup(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nuevo grupo de opciones
        </button>
      )}
    </Modal>
  );
}

function NewGroupForm({
  menuItemId,
  onClose,
  onCreated,
}: {
  menuItemId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [obligatorio, setObligatorio] = useState(true);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("ldn_restaurant_menu_item_option_groups").insert({ menu_item_id: menuItemId, nombre: nombre.trim(), obligatorio });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <form onSubmit={submit} className="mt-2 flex flex-wrap items-end gap-2 border border-ink/10 bg-white p-3">
      <div className="flex-1">
        <FieldInput label="Nombre del grupo" value={nombre} onChange={setNombre} required placeholder="Ej. Elige tu cerveza" />
      </div>
      <label className="mb-2 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-muted">
        <input type="checkbox" checked={obligatorio} onChange={(e) => setObligatorio(e.target.checked)} />
        Obligatorio
      </label>
      <button type="submit" disabled={saving} className="btn btn-primary mb-0 px-3 py-2 text-[0.62rem]">
        {saving ? "Creando…" : "Crear grupo"}
      </button>
    </form>
  );
}

function NewOptionForm({ groupId, onCreated }: { groupId: string; onCreated: () => void }) {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("ldn_restaurant_menu_item_options").insert({ group_id: groupId, nombre: nombre.trim() });
    setSaving(false);
    setNombre("");
    onCreated();
  }

  return (
    <form onSubmit={submit} className="mt-2 flex gap-2">
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ej. Corona"
        className="flex-1 border border-ink/15 bg-white px-2 py-1.5 font-mono text-xs text-ink focus:border-teal focus:outline-none"
      />
      <button type="submit" disabled={saving} className="font-mono text-[0.6rem] uppercase text-teal hover:underline">
        + Agregar
      </button>
    </form>
  );
}

function PhotoUploadButton({
  companyId,
  menuItemId,
  hasPhoto,
  onUploaded,
}: {
  companyId: string;
  menuItemId: string;
  hasPhoto: boolean;
  onUploaded: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("company_id", companyId);
    form.append("menu_item_id", menuItemId);
    form.append("file", file);
    const { data, error: fnError } = await supabase.functions.invoke("upload-menu-item-photo", { body: form });
    setUploading(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo subir la foto");
      return;
    }
    onUploaded();
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <label className="cursor-pointer font-mono text-[0.62rem] uppercase text-teal hover:underline">
        {uploading ? "Subiendo…" : hasPhoto ? "Cambiar foto" : "Subir foto"}
        <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
      </label>
      {error && <span className="max-w-[10rem] text-right font-mono text-[0.56rem] text-orange">{error}</span>}
    </div>
  );
}
