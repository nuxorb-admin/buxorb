import { useState } from "react";
import { useLealtadData } from "./lealtad/useLealtadData";
import ConfigurarTarjetaTab from "./lealtad/ConfigurarTarjetaTab";
import MiembrosTab from "./lealtad/MiembrosTab";

type Tab = "configurar" | "miembros";

export default function Lealtad({ companyId, companyName }: { companyId: string; companyName: string }) {
  const { loading, program, members, reload } = useLealtadData(companyId);
  const [tab, setTab] = useState<Tab>("configurar");

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "configurar", label: "Configurar tarjeta" },
    { id: "miembros", label: "Miembros" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Lealtad</h1>
      <p className="mt-1 font-mono text-xs text-muted">Tarjeta de sellos en Google Wallet para tus clientes</p>

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
        {tab === "configurar" && (
          <ConfigurarTarjetaTab companyId={companyId} companyName={companyName} program={program} reload={reload} />
        )}
        {tab === "miembros" &&
          (program ? (
            <MiembrosTab program={program} members={members} reload={reload} />
          ) : (
            <p className="font-mono text-[0.68rem] text-muted">Primero configura tu tarjeta en la otra pestaña.</p>
          ))}
      </div>
    </div>
  );
}
