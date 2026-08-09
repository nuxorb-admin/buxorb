import { useState } from "react";
import { useAgentesData } from "./agentes/useAgentesData";
import MisAgentesTab from "./agentes/MisAgentesTab";
import ConexionWhatsAppTab from "./agentes/ConexionWhatsAppTab";
import ConversacionesTab from "./agentes/ConversacionesTab";

type Tab = "agentes" | "conexion" | "conversaciones";

export default function Agentes({ companyId }: { companyId: string }) {
  const { loading, templates, agents, connections, conversations, reload } = useAgentesData(companyId);
  const [tab, setTab] = useState<Tab>("agentes");

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "agentes", label: "Mis agentes" },
    { id: "conexion", label: "Conexión WhatsApp" },
    { id: "conversaciones", label: "Conversaciones" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Agentes IA</h1>
      <p className="mt-1 font-mono text-xs text-muted">Agentes que contestan por WhatsApp a nombre de tu negocio</p>

      <div className="mt-6 flex gap-1 border-b border-ink/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-colors ${
              tab === t.id ? "border-b-2 border-teal text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "agentes" && <MisAgentesTab templates={templates} agents={agents} />}
        {tab === "conexion" && (
          <ConexionWhatsAppTab companyId={companyId} agents={agents} connections={connections} reload={reload} />
        )}
        {tab === "conversaciones" && (
          <ConversacionesTab connections={connections} conversations={conversations} reload={reload} />
        )}
      </div>
    </div>
  );
}
