import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Company, Contact, Lead } from "../../lib/database.types";
import NotesTimeline from "../components/NotesTimeline";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";
import Badge from "../components/Badge";
import { useAuth } from "../AuthProvider";

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewContact, setShowNewContact] = useState(false);

  async function load() {
    if (!id) return;
    setLoading(true);
    const [{ data: companyData }, { data: contactsData }, { data: leadsData }] = await Promise.all([
      supabase.from("companies").select("*").eq("id", id).single(),
      supabase.from("contacts").select("*").eq("company_id", id).order("name"),
      supabase.from("leads").select("*").eq("company_id", id).order("created_at", { ascending: false }),
    ]);
    setCompany(companyData);
    setContacts(contactsData ?? []);
    setLeads(leadsData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function remove() {
    if (!company) return;
    if (!confirm("¿Eliminar esta empresa?")) return;
    await supabase.from("companies").delete().eq("id", company.id);
    navigate("/admin/companies");
  }

  if (loading || !company) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/admin/companies")}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
      >
        ← Empresas
      </button>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">{company.name}</h1>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-teal hover:underline"
            >
              {company.website}
            </a>
          )}
        </div>
        <button
          onClick={remove}
          className="whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.1em] text-orange hover:underline"
        >
          Eliminar
        </button>
      </div>
      {company.notes && <p className="mt-4 max-w-xl text-sm text-muted">{company.notes}</p>}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Contactos</h2>
          <button
            onClick={() => setShowNewContact(true)}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
          >
            + Agregar
          </button>
        </div>
        {contacts.length === 0 ? (
          <p className="font-mono text-xs text-muted">Sin contactos todavía.</p>
        ) : (
          <ul className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {contacts.map((c) => (
              <li key={c.id} className="px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  {c.name} {c.role_title && <span className="font-normal text-muted">· {c.role_title}</span>}
                </p>
                <p className="font-mono text-[0.68rem] text-muted">
                  {[c.email, c.phone].filter(Boolean).join(" · ") || "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Leads relacionados
        </h2>
        {leads.length === 0 ? (
          <p className="font-mono text-xs text-muted">Sin leads vinculados.</p>
        ) : (
          <ul className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {leads.map((l) => (
              <li key={l.id}>
                <Link
                  to={`/admin/leads/${l.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-sand-2"
                >
                  <span className="text-sm text-ink">{l.name}</span>
                  <Badge color="muted">{l.stage}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Notas</h2>
        <NotesTimeline entityType="company" entityId={company.id} />
      </div>

      {showNewContact && (
        <NewContactModal companyId={company.id} onClose={() => setShowNewContact(false)} onCreated={load} />
      )}
    </div>
  );
}

function NewContactModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { profile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", role_title: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("contacts").insert({ ...form, company_id: companyId, created_by: profile?.id });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo contacto" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FieldInput
          label="Puesto"
          value={form.role_title}
          onChange={(v) => setForm({ ...form, role_title: v })}
        />
        <FieldInput
          label="Correo"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <FieldInput label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Agregar contacto"}
        </button>
      </form>
    </Modal>
  );
}
