import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ErpInventoryMovement, ErpMovementType } from "../../../lib/database.types";

export default function Inventario({ scopeId }: { scopeId: string }) {
  const [movements, setMovements] = useState<ErpInventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ sku: "", concept: "", type: "entrada" as ErpMovementType, quantity: "" });

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("demo_erp_inventory_movements")
      .select("*")
      .eq("scope_id", scopeId)
      .order("created_at", { ascending: false });
    setMovements(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeId]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.sku.trim() || !form.concept.trim() || !form.quantity) return;
    setSaving(true);
    await supabase.from("demo_erp_inventory_movements").insert({
      scope_id: scopeId,
      sku: form.sku.trim(),
      concept: form.concept.trim(),
      type: form.type,
      quantity: Number(form.quantity),
    });
    setForm({ sku: "", concept: "", type: "entrada", quantity: "" });
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    await supabase.from("demo_erp_inventory_movements").delete().eq("id", id);
    load();
  }

  const stockBySku = movements.reduce<Record<string, number>>((acc, m) => {
    const delta = m.type === "entrada" ? Number(m.quantity) : -Number(m.quantity);
    acc[m.sku] = (acc[m.sku] ?? 0) + delta;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Inventario</h1>
      <p className="mt-1 font-mono text-xs text-muted">Existencias por producto — módulo funcional del demo</p>

      <div className="mt-6 grid gap-3 border border-ink/15 bg-ink p-6 text-white sm:grid-cols-3 lg:grid-cols-4">
        {Object.keys(stockBySku).length === 0 && (
          <p className="font-mono text-xs text-white/40">Sin existencias todavía.</p>
        )}
        {Object.entries(stockBySku).map(([sku, qty]) => (
          <div key={sku}>
            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">{sku}</span>
            <span className={`mt-1 block font-display text-2xl ${qty < 0 ? "text-orange" : "text-teal"}`}>
              {qty}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3 border border-ink/15 bg-white p-5 sm:grid-cols-5">
        <input
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          placeholder="SKU"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={form.concept}
          onChange={(e) => setForm({ ...form, concept: e.target.value })}
          placeholder="Concepto"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none sm:col-span-2"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as ErpMovementType })}
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <input
          type="number"
          min="0"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Cantidad"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary sm:col-span-5">
          {saving ? "Guardando…" : "+ Agregar movimiento"}
        </button>
      </form>

      <div className="mt-6 divide-y divide-ink/10 border border-ink/10 bg-white">
        {loading && <p className="p-4 font-mono text-xs text-muted">Cargando…</p>}
        {!loading && movements.length === 0 && (
          <p className="p-4 font-mono text-xs text-muted">Sin movimientos todavía.</p>
        )}
        {movements.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {m.sku} · {m.concept}
              </p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {new Date(m.created_at).toLocaleDateString("es-MX")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm font-bold ${m.type === "entrada" ? "text-teal" : "text-orange"}`}>
                {m.type === "entrada" ? "+" : "-"}
                {m.quantity}
              </span>
              <button onClick={() => remove(m.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
