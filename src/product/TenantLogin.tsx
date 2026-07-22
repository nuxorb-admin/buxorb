import { useState, type FormEvent } from "react";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";

export default function TenantLogin({ companyName }: { companyName: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError("Correo o contraseña incorrectos.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm border border-white/10 bg-black/30 p-8">
        <Logo variant="dark" />
        <h1 className="mt-8 font-display text-3xl uppercase text-white">{companyName}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/50">Acceso a tu sistema</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && (
            <div className="border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
              {error}
            </div>
          )}
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Correo
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full disabled:opacity-60">
            {loading ? "Entrando…" : "Entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
}
