import { useState, type FormEvent } from "react";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";

export default function CompleteFirstLogin({ currentEmail }: { currentEmail: string }) {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (email !== emailConfirm) {
      setError("El correo y su confirmación no coinciden.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("La contraseña y su confirmación no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const { data, error: fnError } = await supabase.functions.invoke("complete-first-login", {
      body: { email, password },
    });
    if (fnError || data?.error) {
      setLoading(false);
      setError(data?.error ?? fnError?.message ?? "No se pudo completar tu cuenta");
      return;
    }

    // Vuelve a TenantLogin solo con el signOut — TenantAuthProvider
    // reacciona a la sesión en null.
    await supabase.auth.signOut();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm border border-white/10 bg-black/30 p-8">
        <Logo variant="dark" />
        <h1 className="mt-8 font-display text-3xl uppercase text-white">Completa tu cuenta</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
          Es tu primer ingreso — pon tu correo real y elige tu contraseña
        </p>
        <p className="mt-4 font-mono text-[0.66rem] text-white/40">Entraste con: {currentEmail}</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && (
            <div className="border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
              {error}
            </div>
          )}
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Tu correo
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
              Confirmar correo
            </label>
            <input
              type="email"
              required
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Nueva contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Confirmar contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full disabled:opacity-60">
            {loading ? "Guardando…" : "Guardar y entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
}
