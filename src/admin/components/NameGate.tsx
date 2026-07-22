import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../AuthProvider";

export default function NameGate() {
  const { profile, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase.from("profiles").update({ full_name: trimmed }).eq("id", profile!.id);
    setSaving(false);
    if (error) {
      setError("No se pudo guardar. Intenta de nuevo.");
      return;
    }
    await refreshProfile();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm border border-ink/10 bg-white p-7">
        <h2 className="font-display text-2xl uppercase text-ink">¿Cómo te llamas?</h2>
        <p className="mt-2 font-mono text-[0.7rem] text-muted">
          Tu nombre se muestra en el CRM en vez de tu correo.
        </p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {error && (
            <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-orange">
              {error}
            </div>
          )}
          <input
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full border border-ink/15 bg-sand-2 px-4 py-3 font-sans text-sm text-ink transition focus:border-teal focus:outline-none"
          />
          <button type="submit" disabled={saving} className="btn btn-primary w-full">
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
