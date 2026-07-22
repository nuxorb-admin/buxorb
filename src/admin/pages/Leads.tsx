import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Lead } from "../../lib/database.types";
import KanbanBoard, { type KanbanColumn } from "../components/KanbanBoard";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";

export const STAGES: KanbanColumn[] = [
  { id: "nuevo", label: "Nuevo" },
  { id: "contactado", label: "Contactado" },
  { id: "calificado", label: "Calificado" },
  { id: "propuesta", label: "Propuesta" },
  { id: "ganado", label: "Ganado" },
  { id: "perdido", label: "Perdido" },
];

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleMove(id: string, stage: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: stage as Lead["stage"] } : l)));
    await supabase.from("leads").update({ stage }).eq("id", id);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">Leads</h1>
          <p className="font-mono text-xs text-muted">{leads.length} en pipeline</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">
          + Nuevo lead
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-muted">Cargando…</p>
      ) : (
        <KanbanBoard
          columns={STAGES}
          items={leads}
          getColumnId={(l) => l.stage}
          onCardMove={handleMove}
          renderCard={(lead) => (
            <button
              onClick={() => navigate(`/admin/leads/${lead.id}`)}
              className="w-full border border-ink/10 bg-white p-3 text-left shadow-sm hover:border-teal"
            >
              <p className="font-sans text-sm font-semibold text-ink">{lead.name}</p>
              <p className="mt-0.5 truncate font-mono text-[0.68rem] text-muted">
                {lead.company_name || lead.email || "—"}
              </p>
              {lead.service && (
                <div className="mt-2">
                  <Badge color="muted">{lead.service}</Badge>
                </div>
              )}
            </button>
          )}
        />
      )}

      {showNew && (
        <NewLeadModal
          onClose={() => setShowNew(false)}
          onCreated={load}
        />
      )}
    </div>
  );
}

function NewLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    service: "",
    message: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("leads").insert({ ...form, source: "manual", stage: "nuevo" });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo lead" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FieldInput
          label="Correo"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <FieldInput label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <FieldInput
          label="Empresa"
          value={form.company_name}
          onChange={(v) => setForm({ ...form, company_name: v })}
        />
        <FieldInput label="Servicio" value={form.service} onChange={(v) => setForm({ ...form, service: v })} />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Mensaje
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear lead"}
        </button>
      </form>
    </Modal>
  );
}
