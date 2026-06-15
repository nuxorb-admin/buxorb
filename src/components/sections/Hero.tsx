import Asterisk from "../ui/Asterisk";

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
            <span className="block">Código</span>
            <span className="relative block">
              <span className="outline-word">que</span>
              <Asterisk className="absolute -top-2 left-[3.2em] hidden h-10 w-10 sm:inline-block" />
            </span>
            <span className="block accent-word">escala.</span>
          </h1>

          <p className="mt-8 max-w-[460px] text-[1.05rem] text-muted">
            Nuxorb es el núcleo inteligente de tu negocio: agentes de IA, software a medida y
            automatizaciones para PYMEs que quieren crecer. Sin formularios eternos, sin esperas.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contacto" className="btn btn-primary btn-lg">Cotizar proyecto →</a>
            <a href="#servicios" className="btn btn-outline btn-lg">Ver servicios</a>
          </div>

          <div className="mt-10 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <Asterisk className="h-3.5 w-3.5" />
            Be curious · Construye · Entrega
          </div>
        </div>

        {/* Columna derecha: consola de agente IA */}
        <div className="relative">
          {/* Banda teal vertical */}
          <div className="absolute -left-3 top-6 bottom-6 z-10 hidden w-9 items-center justify-center bg-teal sm:flex">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl]">
              NUXORB · IA · MX
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-ink/15 bg-ink shadow-[0_30px_60px_-20px_rgba(20,48,42,0.5)]">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/45">
                agente.nuxorb
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-teal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> online
              </span>
            </div>

            {/* Chat */}
            <div className="space-y-3 px-4 py-6">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-sm text-white/90">
                Hola, ¿tienen mesa para 4 hoy a las 9?
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-teal px-4 py-2.5 text-sm text-white">
                ¡Claro! Te aparté la mesa 12 para las 21:00. ¿Confirmo a nombre de quién? 🪑
              </div>
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-sm text-white/90">
                A nombre de Diana, gracias.
              </div>
              <div className="flex max-w-[40%] items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
              </div>
            </div>

            {/* Footer mono */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
              <span>modo · agente</span>
              <span className="text-orange">resuelto 00:04s</span>
            </div>
          </div>

          {/* Etiqueta flotante */}
          <div className="absolute -bottom-4 -right-2 hidden bg-orange px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white sm:block">
            Edición Nº 04
          </div>
        </div>
      </div>
    </section>
  );
}
