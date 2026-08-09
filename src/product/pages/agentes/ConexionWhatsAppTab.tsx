import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { AiAgent, WhatsappConnection } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

const STATUS_LABELS: Record<WhatsappConnection["status"], string> = {
  conectando: "Conectando",
  conectado: "Conectado",
  error: "Error",
};

export default function ConexionWhatsAppTab({
  companyId,
  agents,
  connections,
  reload,
}: {
  companyId: string;
  agents: AiAgent[];
  connections: WhatsappConnection[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [credentialsFor, setCredentialsFor] = useState<WhatsappConnection | null>(null);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Números de WhatsApp conectados
        </h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nueva conexión
        </button>
      </div>

      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Usa la API oficial de WhatsApp Business (Meta Cloud API). El número deja de usarse en la app normal de
        WhatsApp — todo se administra desde aquí.
      </p>

      {connections.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Todavía no conectas ningún número.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {connections.map((c) => {
            const agent = agents.find((a) => a.id === c.agent_id);
            return (
              <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className="text-sm text-ink">{c.display_name}</span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {agent ? `Agente: ${agent.name}` : "Sin agente asignado"} · phone_number_id: {c.phone_number_id ?? "—"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] ${
                      c.status === "conectado" ? "text-teal" : c.status === "error" ? "text-orange" : "text-muted"
                    }`}
                  >
                    {STATUS_LABELS[c.status]}
                  </span>
                  <button
                    onClick={() => setCredentialsFor(c)}
                    className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                  >
                    {c.status === "conectado" ? "Actualizar token" : "Guardar credenciales"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewConnectionModal companyId={companyId} agents={agents} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
      {credentialsFor && (
        <CredentialsModal connection={credentialsFor} onClose={() => setCredentialsFor(null)} onSaved={reload} />
      )}
    </div>
  );
}

function NewConnectionModal({
  companyId,
  agents,
  onClose,
  onCreated,
}: {
  companyId: string;
  agents: AiAgent[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [wabaId, setWabaId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSaving(true);
    setError(null);

    const { data: newConnection, error: insertError } = await supabase
      .from("whatsapp_connections")
      .insert({
        company_id: companyId,
        display_name: displayName.trim(),
        phone_number_id: phoneNumberId.trim() || null,
        agent_id: agentId || null,
      })
      .select()
      .single();
    if (insertError || !newConnection) {
      setSaving(false);
      setError(insertError?.message ?? "No se pudo crear la conexión");
      return;
    }

    if (accessToken.trim()) {
      const { data, error: fnError } = await supabase.functions.invoke("save-whatsapp-credentials", {
        body: { connection_id: newConnection.id, access_token: accessToken.trim(), waba_id: wabaId.trim() || null },
      });
      if (fnError || data?.error) {
        setSaving(false);
        setError(
          `La conexión se creó, pero no se pudo guardar el token: ${data?.error ?? fnError?.message ?? "error desconocido"}. Puedes intentarlo de nuevo desde "Guardar credenciales" en la lista.`,
        );
        onCreated();
        return;
      }
    }

    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva conexión de WhatsApp" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <FieldInput label="Nombre" value={displayName} onChange={setDisplayName} required placeholder="Ej. Línea principal" />
        <FieldInput
          label="Phone number ID (Meta)"
          value={phoneNumberId}
          onChange={setPhoneNumberId}
          placeholder="De tu cuenta de WhatsApp Business en Meta"
        />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Agente asignado
          </label>
          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">Sin agente (solo bandeja)</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <p className="font-mono text-[0.6rem] text-muted">
          El token de acceso permanente se genera en Meta Business Manager, en la app de WhatsApp Business. Si no lo
          tienes a la mano todavía, puedes crear la conexión sin él y agregarlo después.
        </p>
        <FieldInput label="Access token (opcional)" value={accessToken} onChange={setAccessToken} type="password" />
        <FieldInput label="WABA ID (opcional)" value={wabaId} onChange={setWabaId} />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear conexión"}
        </button>
      </form>
    </Modal>
  );
}

function CredentialsModal({
  connection,
  onClose,
  onSaved,
}: {
  connection: WhatsappConnection;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [accessToken, setAccessToken] = useState("");
  const [wabaId, setWabaId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!accessToken.trim()) return;
    setSaving(true);
    const { data, error: fnError } = await supabase.functions.invoke("save-whatsapp-credentials", {
      body: { connection_id: connection.id, access_token: accessToken.trim(), waba_id: wabaId.trim() || null },
    });
    setSaving(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudieron guardar las credenciales");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <Modal title={`Credenciales — ${connection.display_name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <p className="font-mono text-[0.6rem] text-muted">
          El token de acceso permanente se genera en Meta Business Manager, en la app de WhatsApp Business.
        </p>
        <FieldInput label="Access token" value={accessToken} onChange={setAccessToken} required type="password" />
        <FieldInput label="WABA ID (opcional)" value={wabaId} onChange={setWabaId} />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar y conectar"}
        </button>
      </form>
    </Modal>
  );
}
