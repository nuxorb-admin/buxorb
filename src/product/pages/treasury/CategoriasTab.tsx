import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { TreasuryCategory } from "../../../lib/database.types";
import { GRUPOS, GRUPO_LABELS, type Grupo } from "./categoryGroups";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

export default function CategoriasTab({
  companyId,
  categories,
  reload,
}: {
  companyId: string;
  categories: TreasuryCategory[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<TreasuryCategory | null>(null);

  async function toggleActive(cat: TreasuryCategory) {
    await supabase.from("treasury_categories").update({ active: !cat.active }).eq("id", cat.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Categorías ({categories.filter((c) => c.active).length} activas)
        </h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nueva categoría
        </button>
      </div>

      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Desactivar una categoría no borra el historial — solo deja de ofrecerse al capturar movimientos nuevos. Los
        movimientos ya categorizados con ella se siguen viendo normal en el estado de resultados.
      </p>

      {GRUPOS.map((g) => {
        const inGroup = categories.filter((c) => c.grupo === g.value).sort((a, b) => a.orden - b.orden);
        if (inGroup.length === 0) return null;
        return (
          <div key={g.value} className="mb-6">
            <h4 className="mb-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">{g.label}</h4>
            <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
              {inGroup.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className={`text-sm ${c.active ? "text-ink" : "text-muted line-through"}`}>{c.name}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditing(c)}
                      className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleActive(c)}
                      className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange"
                    >
                      {c.active ? "Desactivar" : "Reactivar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {showNew && <NewCategoryModal companyId={companyId} categories={categories} onClose={() => setShowNew(false)} onCreated={reload} />}
      {editing && <EditCategoryModal category={editing} onClose={() => setEditing(null)} onSaved={reload} />}
    </div>
  );
}

function NewCategoryModal({
  companyId,
  categories,
  onClose,
  onCreated,
}: {
  companyId: string;
  categories: TreasuryCategory[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [grupo, setGrupo] = useState<Grupo>("gasto_administrativo");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    if (categories.some((c) => c.name.toLowerCase() === name.trim().toLowerCase())) {
      setError("Ya existe una categoría con ese nombre.");
      return;
    }
    setSaving(true);
    const maxOrden = Math.max(0, ...categories.map((c) => c.orden));
    const { error: insertError } = await supabase.from("treasury_categories").insert({
      company_id: companyId,
      name: name.trim(),
      kind: grupo === "ingreso" ? "ingreso" : "egreso",
      grupo,
      orden: maxOrden + 1,
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
    <Modal title="Nueva categoría" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && (
          <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>
        )}
        <FieldInput label="Nombre" value={name} onChange={setName} required placeholder="Ej. Comisiones de plataforma" />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Grupo del estado de resultados
          </label>
          <select
            value={grupo}
            onChange={(e) => setGrupo(e.target.value as Grupo)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {GRUPOS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <p className="mt-1 font-mono text-[0.6rem] text-muted">
            No se puede cambiar después de creada — solo el nombre.
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear categoría"}
        </button>
      </form>
    </Modal>
  );
}

function EditCategoryModal({
  category,
  onClose,
  onSaved,
}: {
  category: TreasuryCategory;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await supabase.from("treasury_categories").update({ name: name.trim() }).eq("id", category.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Editar categoría" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={name} onChange={setName} required />
        <p className="font-mono text-[0.6rem] text-muted">
          Grupo: {category.grupo ? GRUPO_LABELS[category.grupo as Grupo] : "—"} (no editable)
        </p>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
    </Modal>
  );
}
