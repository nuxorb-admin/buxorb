import { useEffect, useState, type FormEvent } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { TreasuryEntry, TreasuryEntryType } from "../../lib/database.types";
import type { ProductContext } from "../ProductLayout";

const CATEGORIES = ["ventas", "nomina", "renta", "proveedores", "otros"];

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

export default function TesoreriaDemo() {
  const { scopeId } = useOutletContext<ProductContext>();
  const [entries, setEntries] = useState<TreasuryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    type: "ingreso" as TreasuryEntryType,
    concept: "",
    category: "otros",
    amount: "",
  });

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("demo_treasury_entries")
      .select("*")
      .eq("scope_id", scopeId)
      .order("entry_date", { ascending: false });
    setEntries(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeId]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.concept.trim() || !form.amount) return;
    setSaving(true);
    await supabase.from("demo_treasury_entries").insert({
      scope_id: scopeId,
      type: form.type,
      concept: form.concept.trim(),
      category: form.category,
      amount: Number(form.amount),
    });
    setForm({ type: "ingreso", concept: "", category: "otros", amount: "" });
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    await supabase.from("demo_treasury_entries").delete().eq("id", id);
    load();
  }

  const entradas = entries.filter((e) => e.type === "ingreso").reduce((sum, e) => sum + Number(e.amount), 0);
  const salidas = entries.filter((e) => e.type === "egreso").reduce((sum, e) => sum + Number(e.amount), 0);
  const disponible = entradas - salidas;

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Tesorería</h1>
      <p className="mt-1 font-mono text-xs text-muted">El dinero, claro y al día — módulo funcional del demo</p>

      <div className="mt-6 grid grid-cols-3 gap-4 border border-ink/15 bg-ink p-6 text-white">
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">
            Entradas
          </span>
          <span className="mt-1 block font-display text-2xl">{money(entradas)}</span>
        </div>
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">
            Salidas
          </span>
          <span className="mt-1 block font-display text-2xl">{money(salidas)}</span>
        </div>
        <div>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">
            Disponible
          </span>
          <span className="mt-1 block font-display text-2xl text-teal">{money(disponible)}</span>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3 border border-ink/15 bg-white p-5 sm:grid-cols-5">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as TreasuryEntryType })}
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <input
          value={form.concept}
          onChange={(e) => setForm({ ...form, concept: e.target.value })}
          placeholder="Concepto"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none sm:col-span-2"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm capitalize text-ink focus:border-teal focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Monto"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary sm:col-span-5">
          {saving ? "Guardando…" : "+ Agregar movimiento"}
        </button>
      </form>

      <div className="mt-6 divide-y divide-ink/10 border border-ink/10 bg-white">
        {loading && <p className="p-4 font-mono text-xs text-muted">Cargando…</p>}
        {!loading && entries.length === 0 && (
          <p className="p-4 font-mono text-xs text-muted">Sin movimientos todavía.</p>
        )}
        {entries.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{e.concept}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {e.category} · {new Date(e.entry_date).toLocaleDateString("es-MX")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm font-bold ${e.type === "ingreso" ? "text-teal" : "text-orange"}`}>
                {e.type === "ingreso" ? "+" : "-"}
                {money(Number(e.amount))}
              </span>
              <button onClick={() => remove(e.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
