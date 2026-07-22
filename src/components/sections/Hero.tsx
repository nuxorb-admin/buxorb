import Asterisk from "../ui/Asterisk";

const cashflowBars = [38, 62, 45, 80, 58, 92, 70];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-[72px]">
      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Columna izquierda */}
        <div>
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="label">00 — El núcleo inteligente de tu operación</span>
          </div>

          <h1 className="display text-[clamp(3.5rem,12vw,9.5rem)]">
            <span className="block">Todo</span>
            <span className="relative block">
              <span className="outline-word">en</span>
              <Asterisk className="absolute -top-2 left-[2.6em] hidden h-10 w-10 sm:inline-block" />
            </span>
            <span className="block accent-word">orden.</span>
          </h1>

          <p className="mt-8 max-w-[460px] text-[1.05rem] text-muted">
            Nuxorb es la plataforma modular de administración para PyMEs mexicanas: tesorería,
            compras, personal y ventas en un solo lugar, con IA y automatización incluidas.
            Contrata solo los módulos que necesitas.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contacto" className="btn btn-primary btn-lg">Cotizar diagnóstico →</a>
            <a href="#modulos" className="btn btn-outline btn-lg">Ver módulos</a>
          </div>

          <div className="mt-10 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <Asterisk className="h-3.5 w-3.5" />
            Módulos · IA · Automatización
          </div>
        </div>

        {/* Columna derecha: vista del módulo Tesorería */}
        <div className="relative">
          {/* Banda teal vertical */}
          <div className="absolute -left-3 top-6 bottom-6 z-10 hidden w-9 items-center justify-center bg-teal sm:flex">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl]">
              NUXORB · MÓDULOS · MX
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-ink/15 bg-ink shadow-[0_30px_60px_-20px_rgba(20,48,42,0.5)]">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/45">
                tesoreria.nuxorb
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-teal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> conciliado
              </span>
            </div>

            {/* Dashboard de flujo de caja */}
            <div className="px-5 py-6">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
                Flujo de caja · julio
              </span>

              <div className="mt-4 grid grid-cols-3 gap-3 border-b border-white/10 pb-5">
                <div>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/40">
                    Entradas
                  </span>
                  <span className="mt-1 block font-display text-xl text-white">$128,400</span>
                </div>
                <div>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/40">
                    Salidas
                  </span>
                  <span className="mt-1 block font-display text-xl text-white">$76,200</span>
                </div>
                <div>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/40">
                    Disponible
                  </span>
                  <span className="mt-1 block font-display text-xl text-teal">$52,200</span>
                </div>
              </div>

              <div className="mt-5 flex h-20 items-end gap-2">
                {cashflowBars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-teal to-mint"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Footer mono */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
              <span>2 bancos conectados</span>
              <span className="text-orange">actualizado hace 2 min</span>
            </div>
          </div>

          {/* Etiqueta flotante */}
          <div className="absolute -bottom-4 -right-2 hidden bg-orange px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white sm:block">
            Módulo 1 de 4
          </div>
        </div>
      </div>
    </section>
  );
}
