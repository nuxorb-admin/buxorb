import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Company } from "../../lib/database.types";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";
import { useAuth } from "../AuthProvider";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("companies").select("*").order("name");
    setCompanies(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase text-ink">Empresas</h1>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">
          + Nueva empresa
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-muted">Cargando…</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {companies.length === 0 && (
            <p className="p-5 font-mono text-xs text-muted">Sin empresas todavía.</p>
          )}
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/admin/companies/${c.id}`)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-sand-2"
            >
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{c.name}</p>
                {c.website && <p className="font-mono text-[0.68rem] text-muted">{c.website}</p>}
              </div>
              <span className="font-mono text-xs text-muted">→</span>
            </button>
          ))}
        </div>
      )}

      {showNew && <NewCompanyModal onClose={() => setShowNew(false)} onCreated={load} />}
    </div>
  );
}

function NewCompanyModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { profile } = useAuth();
  const [form, setForm] = useState({ name: "", website: "", notes: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("companies").insert({ ...form, created_by: profile?.id });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva empresa" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FieldInput label="Sitio web" value={form.website} onChange={(v) => setForm({ ...form, website: v })} />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Notas
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear empresa"}
        </button>
      </form>
    </Modal>
  );
}
