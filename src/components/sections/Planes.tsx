import Reveal from "../Reveal";
import Asterisk from "../ui/Asterisk";
import { plans } from "../../data/content";

export default function Planes() {
  return (
    <section id="planes" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">03 — Planes</span>
        </div>
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Paga como <span className="accent-word">te convenga</span>.
        </h2>
        <p className="mt-6 max-w-[520px] text-[1.05rem] text-muted">
          Todos los precios en MXN. Definimos la tabla base contigo en la sesión de arranque. Sin
          letras chiquitas.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => {
            const dark = p.featured;
            return (
              <Reveal
                key={p.code}
                delay={i * 90}
                className={`relative flex flex-col border p-8 ${
                  dark ? "border-ink bg-ink text-white" : "border-ink/15 bg-sand-2"
                }`}
              >
                {dark && (
                  <span className="absolute right-6 top-7 bg-orange px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white">
                    Popular
                  </span>
                )}
                <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em]">
                  <span className="text-teal">{p.model}</span>
                  <span className={dark ? "text-white/40" : "text-ink/35"}>{p.code}</span>
                </div>

                <h3
                  className={`mt-4 font-display text-[2.1rem] uppercase leading-[0.95] tracking-tight ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {p.name}
                </h3>

                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Asterisk className="mt-0.5 h-3.5 w-3.5 flex-none" />
                      <span className={`text-[0.92rem] ${dark ? "text-white/80" : "text-muted"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`mt-6 font-mono text-[0.7rem] uppercase tracking-[0.1em] ${
                    dark ? "text-white/45" : "text-ink/45"
                  }`}
                >
                  {p.note}
                </p>

                <a
                  href="#contacto"
                  className={`btn mt-7 ${dark ? "btn-primary" : "btn-outline"}`}
                >
                  Empezar →
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
