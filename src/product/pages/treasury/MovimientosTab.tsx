import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { TreasuryAccount, TreasuryCategory, TreasuryEntryType, TreasuryMovement } from "../../../lib/database.types";
import CsvImportModal from "./CsvImportModal";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

export default function MovimientosTab({
  companyId,
  accounts,
  categories,
  movements,
  reload,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  movements: TreasuryMovement[];
  reload: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [form, setForm] = useState({
    type: "ingreso" as TreasuryEntryType,
    concept: "",
    category: categories[0]?.name ?? "otros",
    amount: "",
    account_id: accounts[0]?.id ?? "",
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.concept.trim() || !form.amount || !form.account_id) return;
    setSaving(true);
    await supabase.from("treasury_movements").insert({
      company_id: companyId,
      account_id: form.account_id,
      type: form.type,
      concept: form.concept.trim(),
      category: form.category,
      amount: Number(form.amount),
      source: "manual",
    });
    setForm({ ...form, concept: "", amount: "" });
    setSaving(false);
    reload();
  }

  async function remove(id: string) {
    await supabase.from("treasury_movements").delete().eq("id", id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Movimientos</h3>
        <button
          onClick={() => setShowImport(true)}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
        >
          + Importar plantilla
        </button>
      </div>

      <form onSubmit={submit} className="grid gap-3 border border-ink/15 bg-white p-5 sm:grid-cols-6">
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
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {accounts.length > 1 && (
          <select
            value={form.account_id}
            onChange={(e) => setForm({ ...form, account_id: e.target.value })}
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Monto"
          className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary sm:col-span-6">
          {saving ? "Guardando…" : "+ Agregar movimiento"}
        </button>
      </form>

      <div className="mt-6 divide-y divide-ink/10 border border-ink/10 bg-white">
        {movements.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin movimientos todavía.</p>}
        {movements.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{m.concept}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {m.category} · {new Date(m.entry_date).toLocaleDateString("es-MX")}
                {accounts.length > 1 && ` · ${accounts.find((a) => a.id === m.account_id)?.name ?? ""}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm font-bold ${m.type === "ingreso" ? "text-teal" : "text-orange"}`}>
                {m.type === "ingreso" ? "+" : "-"}
                {money(Number(m.amount))}
              </span>
              <button onClick={() => remove(m.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {showImport && (
        <CsvImportModal
          title="Importar plantilla"
          companyId={companyId}
          accountId={accounts[0]?.id ?? ""}
          source="csv_import"
          onClose={() => setShowImport(false)}
          onImported={reload}
        />
      )}
    </div>
  );
}
