import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { LoyaltyMember, LoyaltyProgram } from "../../../lib/database.types";

export default function MiembrosTab({
  program,
  members,
  reload,
}: {
  program: LoyaltyProgram;
  members: LoyaltyMember[];
  reload: () => void;
}) {
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = search.trim() ? members.filter((m) => m.phone.includes(search.trim())) : members;

  async function agregarSello(member: LoyaltyMember) {
    setAdding(member.id);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("loyalty-add-stamp", {
      body: { member_id: member.id },
    });
    setAdding(null);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo agregar el sello");
      return;
    }
    reload();
  }

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Miembros ({members.length})
      </h3>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por teléfono…"
        className="mb-3 w-full max-w-sm border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
      />
      {error && <div className="mb-3 border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

      {filtered.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin resultados.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {filtered.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <span className="text-sm text-ink">{m.name}</span>
                <p className="mt-0.5 font-mono text-[0.6rem] text-muted">{m.phone}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[0.68rem] font-bold text-teal">
                  {m.stamps}/{program.stamps_required}
                </span>
                <button
                  onClick={() => agregarSello(m)}
                  disabled={adding === m.id}
                  className="btn btn-primary px-3 py-1.5 text-[0.62rem]"
                >
                  {adding === m.id ? "…" : "+1 sello"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
