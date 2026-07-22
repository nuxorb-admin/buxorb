import type { ReactNode } from "react";
import Logo from "../components/Logo";

export interface SingleModuleContext {
  scopeId: string;
}

export default function SingleModuleShell({
  companyLabel,
  moduleLabel,
  onExit,
  children,
}: {
  companyLabel: string;
  moduleLabel: string;
  onExit?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <header className="flex items-center justify-between gap-4 border-b border-ink/10 bg-ink px-6 py-4 text-white">
        <div className="flex items-center gap-4">
          <Logo variant="dark" />
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-orange">Demo</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-white/60 sm:inline">
            {companyLabel} · {moduleLabel}
          </span>
          {onExit && (
            <button
              onClick={onExit}
              className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white/40 hover:text-orange"
            >
              Salir del demo
            </button>
          )}
        </div>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
