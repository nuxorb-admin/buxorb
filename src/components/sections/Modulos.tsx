import Reveal from "../Reveal";
import Asterisk from "../ui/Asterisk";
import { modules } from "../../data/modules";

export default function Modulos() {
  return (
    <section id="modulos" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">03 — Módulos</span>
        </div>
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Contrata solo lo que <span className="accent-word">necesitas</span>.
        </h2>
        <p className="mt-6 max-w-[560px] text-[1.05rem] text-muted">
          4 módulos hoy, cada uno en dos niveles. Empieza por el que más te urge y suma los
          demás cuando tu operación lo pida.
        </p>

        <div className="mt-14 space-y-px overflow-hidden border border-ink/15 bg-ink/15">
          {modules.map((m, i) => (
            <Reveal
              key={m.slug}
              delay={i * 80}
              as="article"
              className="grid gap-8 bg-sand-2 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.5fr]"
            >
              {/* Intro */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-8 w-1.5 bg-teal" />
                  <span className="h-3 w-3 bg-orange" />
                </div>
                <span className="mt-4 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-teal">
                  {m.order}
                </span>
                <h3 className="mt-1 font-display text-[2rem] uppercase leading-none tracking-tight text-ink">
                  {m.name}
                </h3>
                <p className="mt-2 font-mono text-[0.8rem] text-ink/60">{m.tagline}</p>
                <p className="mt-4 text-[0.92rem] text-muted">{m.description}</p>
                <a
                  href="#contacto"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink hover:text-orange"
                >
                  Cotizar <span>→</span>
                </a>
              </div>

              {/* Niveles */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="border border-ink/15 p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink/60">
                      Essential
                    </span>
                    <span className="font-display text-xl text-ink">
                      ${m.priceEssential}
                      <span className="font-mono text-[0.6rem] text-ink/40">/mes</span>
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {m.essentialFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.85rem] text-muted">
                        <Asterisk className="mt-1 h-3 w-3 flex-none" color="#57655f" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-teal bg-ink p-5 text-white">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-teal">
                      Professional
                    </span>
                    <span className="font-display text-xl text-white">
                      ${m.priceProfessional}
                      <span className="font-mono text-[0.6rem] text-white/40">/mes</span>
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/40">
                    Incluye todo Essential, más:
                  </p>
                  <ul className="mt-2 space-y-2.5">
                    {m.professionalFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.85rem] text-white/80">
                        <Asterisk className="mt-1 h-3 w-3 flex-none" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
          Enterprise: todo Professional + funciones 100% a la medida — alcance y precio caso
          por caso.
        </p>
      </div>
    </section>
  );
}
