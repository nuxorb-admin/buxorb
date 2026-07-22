import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Company, Lead } from "../../lib/database.types";
import { useProfiles } from "../hooks/useProfiles";
import NotesTimeline from "../components/NotesTimeline";
import { STAGES } from "./Leads";

const fieldClass =
  "w-full border border-ink/15 bg-white px-3 py-2 font-sans text-sm text-ink transition focus:border-teal focus:outline-none";
const labelClass = "mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted";

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { profiles } = useProfiles();

  async function load() {
    if (!id) return;
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").eq("id", id).single();
    setLead(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    supabase
      .from("companies")
      .select("*")
      .order("name")
      .then(({ data }) => setCompanies(data ?? []));
  }, []);

  async function update(patch: Partial<Lead>) {
    if (!lead) return;
    setLead({ ...lead, ...patch });
    await supabase.from("leads").update(patch).eq("id", lead.id);
  }

  async function remove() {
    if (!lead) return;
    if (!confirm("¿Eliminar este lead?")) return;
    await supabase.from("leads").delete().eq("id", lead.id);
    navigate("/admin/leads");
  }

  if (loading || !lead) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/admin/leads")}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
      >
        ← Leads
      </button>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">{lead.name}</h1>
          <p className="font-mono text-xs text-muted">
            {lead.source === "web" ? "Formulario web" : "Manual"} ·{" "}
            {new Date(lead.created_at).toLocaleDateString("es-MX")}
          </p>
        </div>
        <button
          onClick={remove}
          className="whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.1em] text-orange hover:underline"
        >
          Eliminar
        </button>
      </div>

      <div className="mt-6 grid gap-4 border border-ink/10 bg-white p-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Etapa</label>
          <select
            value={lead.stage}
            onChange={(e) => update({ stage: e.target.value as Lead["stage"] })}
            className={fieldClass}
          >
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Asignado a</label>
          <select
            value={lead.assigned_to ?? ""}
            onChange={(e) => update({ assigned_to: e.target.value || null })}
            className={fieldClass}
          >
            <option value="">Sin asignar</option>
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name || p.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Correo</label>
          <p className="text-sm text-ink">{lead.email || "—"}</p>
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <p className="text-sm text-ink">{lead.phone || "—"}</p>
        </div>
        <div>
          <label className={labelClass}>Empresa</label>
          <select
            value={lead.company_id ?? ""}
            onChange={(e) => update({ company_id: e.target.value || null })}
            className={fieldClass}
          >
            <option value="">{lead.company_name || "Sin vincular"}</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Valor estimado</label>
          <input
            type="number"
            value={lead.value ?? ""}
            onChange={(e) => update({ value: e.target.value ? Number(e.target.value) : null })}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Servicio de interés</label>
          <p className="text-sm text-ink">{lead.service || "—"}</p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Mensaje</label>
          <p className="whitespace-pre-wrap text-sm text-ink">{lead.message || "—"}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Notas</h2>
        <NotesTimeline entityType="lead" entityId={lead.id} />
      </div>
    </div>
  );
}
