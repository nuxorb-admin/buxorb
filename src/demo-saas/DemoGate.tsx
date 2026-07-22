import { useState, type FormEvent } from "react";
import Logo from "../components/Logo";
import { unlockDemo } from "./useDemoSession";

export default function DemoGate({
  onUnlock,
  title = "Demo SaaS",
  subtitle = "Vista previa para prospectos",
}: {
  onUnlock: () => void;
  title?: string;
  subtitle?: string;
}) {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const expected = import.meta.env.VITE_DEMO_SAAS_PASSPHRASE || "nuxorb-demo";
    if (passphrase === expected) {
      unlockDemo();
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm border border-white/10 bg-black/30 p-8">
        <Logo variant="dark" />
        <h1 className="mt-8 font-display text-3xl uppercase text-white">{title}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/50">{subtitle}</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && (
            <div className="border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
              Contraseña incorrecta.
            </div>
          )}
          <div>
            <label className="mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/50">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoFocus
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-sans text-white transition focus:border-teal focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full">
            Entrar →
          </button>
        </form>
      </div>
    </div>
  );
}
