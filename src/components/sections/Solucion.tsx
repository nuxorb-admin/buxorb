import Reveal from "../Reveal";
import Asterisk from "../ui/Asterisk";
import { solutionPillars } from "../../data/modules";

export default function Solucion() {
  return (
    <section className="bg-ink py-24 text-white lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-white/40" />
          <span className="label-light">02 — La solución</span>
        </div>
        <h2 className="display max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)] text-white">
          Módulos independientes que se <span className="accent-word">conectan</span> entre sí.
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {solutionPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="border border-white/15 bg-ink-2 p-7">
              <Asterisk className="h-5 w-5" />
              <h3 className="mt-4 font-display text-2xl uppercase leading-none tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.95rem] text-white/70">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
