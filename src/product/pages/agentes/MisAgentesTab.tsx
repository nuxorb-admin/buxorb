import type { AiAgent, AiAgentTypeTemplate } from "../../../lib/database.types";

export default function MisAgentesTab({
  templates,
  agents,
}: {
  templates: AiAgentTypeTemplate[];
  agents: AiAgent[];
}) {
  const active = agents.filter((a) => a.active);

  if (active.length === 0) {
    return (
      <p className="font-mono text-[0.68rem] text-muted">
        Todavía no tienes agentes activos. Contacta a Nuxorb para activar los que compraste.
      </p>
    );
  }

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Tus agentes activos
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {active.map((a) => {
          const template = templates.find((t) => t.key === a.type_key);
          return (
            <div key={a.id} className="border border-ink/10 bg-white p-4">
              <p className="text-sm font-bold text-ink">{a.name}</p>
              {template && <p className="mt-1 font-mono text-[0.62rem] text-muted">{template.description}</p>}
            </div>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[0.6rem] text-muted">
        Conecta un canal para que tus agentes puedan contestar — ve a la pestaña "Conexión WhatsApp".
      </p>
    </div>
  );
}
