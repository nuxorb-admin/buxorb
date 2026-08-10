import { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Logo from "../components/Logo";

export default function LoyaltyEnroll() {
  const { programId } = useParams<{ programId: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saveUrl, setSaveUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!programId || !name.trim() || !phone.trim()) return;
    setSaving(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("loyalty-enroll", {
      body: { program_id: programId, name: name.trim(), email: email.trim() || null, phone: phone.trim() },
    });
    setSaving(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo registrar tu tarjeta");
      return;
    }
    setSaveUrl(data.save_url);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm border border-white/10 bg-black/30 p-8">
        <Logo variant="dark" />
        <h1 className="mt-8 font-display text-2xl uppercase text-white">Tu tarjeta de lealtad</h1>
        <p className="mt-2 font-mono text-xs text-white/50">
          Llena tus datos y agrégala a tu Google Wallet — así puedes acumular sellos en cada visita.
        </p>

        {saveUrl ? (
          <div className="mt-8 text-center">
            <p className="mb-4 font-mono text-xs text-white/70">¡Listo! Guárdala en tu Wallet:</p>
            <a href={saveUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg block w-full">
              Agregar a Google Wallet
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4">
            {error && (
              <div className="border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
                {error}
              </div>
            )}
            <div>
              <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
                Nombre
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
                Correo (opcional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
                Teléfono
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
              />
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary btn-lg w-full disabled:opacity-60">
              {saving ? "Registrando…" : "Obtener mi tarjeta →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
