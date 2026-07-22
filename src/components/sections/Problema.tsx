import Reveal from "../Reveal";
import Counter from "../ui/Counter";
import { failureStat, painPoints } from "../../data/modules";

export default function Problema() {
  return (
    <section id="problema" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">01 — El problema</span>
        </div>
        <h2 className="display max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          La administración es el <span className="accent-word">punto ciego</span> de la PyME.
        </h2>

        <div className="mt-10 grid gap-10 border-y border-ink/15 py-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="block font-display text-[clamp(4rem,9vw,7rem)] leading-none text-ink">
              <Counter to={failureStat.value} suffix={failureStat.suffix} />
            </span>
            <span className="mt-3 block max-w-[26ch] font-mono text-[0.78rem] uppercase tracking-[0.1em] text-muted">
              {failureStat.label}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <span className="mb-4 block h-8 w-1.5 bg-orange" />
                <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.9rem] text-muted">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
