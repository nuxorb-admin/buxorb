import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { AiAgent, AiAgentTypeTemplate } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

export default function TiposAgenteTab({
  companyId,
  templates,
  agents,
  reload,
}: {
  companyId: string;
  templates: AiAgentTypeTemplate[];
  agents: AiAgent[];
  reload: () => void;
}) {
  const [activating, setActivating] = useState<AiAgentTypeTemplate | null>(null);
  const [editing, setEditing] = useState<AiAgent | null>(null);

  async function toggleActive(agent: AiAgent) {
    await supabase.from("ai_agents").update({ active: !agent.active }).eq("id", agent.id);
    reload();
  }

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Tus agentes ({agents.filter((a) => a.active).length} activos)
      </h3>

      {agents.length === 0 ? (
        <p className="mb-6 font-mono text-[0.68rem] text-muted">Todavía no activas ningún agente.</p>
      ) : (
        <div className="mb-6 divide-y divide-ink/10 border border-ink/10 bg-white">
          {agents.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <span className={`text-sm ${a.active ? "text-ink" : "text-muted line-through"}`}>{a.name}</span>
                <p className="mt-0.5 max-w-xl truncate font-mono text-[0.6rem] text-muted">{a.system_prompt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button onClick={() => setEditing(a)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                  Editar
                </button>
                <button onClick={() => toggleActive(a)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                  {a.active ? "Desactivar" : "Reactivar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Catálogo de tipos de agente
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {templates.map((t) => (
          <div key={t.id} className="border border-ink/10 bg-white p-4">
            <p className="text-sm font-bold text-ink">{t.name}</p>
            <p className="mt-1 font-mono text-[0.62rem] text-muted">{t.description}</p>
            <button
              onClick={() => setActivating(t)}
              className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-teal hover:underline"
            >
              + Activar este tipo
            </button>
          </div>
        ))}
      </div>

      {activating && (
        <ActivateTemplateModal
          companyId={companyId}
          template={activating}
          onClose={() => setActivating(null)}
          onCreated={reload}
        />
      )}
      {editing && <EditAgentModal agent={editing} onClose={() => setEditing(null)} onSaved={reload} />}
    </div>
  );
}

function ActivateTemplateModal({
  companyId,
  template,
  onClose,
  onCreated,
}: {
  companyId: string;
  template: AiAgentTypeTemplate;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState(template.name);
  const [prompt, setPrompt] = useState(template.default_prompt);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;
    setSaving(true);
    const { error: insertError } = await supabase.from("ai_agents").insert({
      company_id: companyId,
      type_key: template.key,
      name: name.trim(),
      system_prompt: prompt.trim(),
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
    <Modal title={`Activar: ${template.name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <FieldInput label="Nombre del agente" value={name} onChange={setName} required />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Instrucciones (prompt)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={6}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink transition focus:border-teal focus:outline-none"
          />
          <p className="mt-1 font-mono text-[0.6rem] text-muted">Puedes ajustar este texto a tu negocio antes o después de activarlo.</p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Activando…" : "Activar agente"}
        </button>
      </form>
    </Modal>
  );
}

function EditAgentModal({ agent, onClose, onSaved }: { agent: AiAgent; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(agent.name);
  const [prompt, setPrompt] = useState(agent.system_prompt);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;
    setSaving(true);
    await supabase.from("ai_agents").update({ name: name.trim(), system_prompt: prompt.trim() }).eq("id", agent.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Editar agente" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre del agente" value={name} onChange={setName} required />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Instrucciones (prompt)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={6}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink transition focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
    </Modal>
  );
}
