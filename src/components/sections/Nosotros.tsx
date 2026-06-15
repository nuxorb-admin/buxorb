import Reveal from "../Reveal";
import { team, techStack } from "../../data/content";

const avatarBg = ["bg-teal", "bg-orange", "bg-ink-2", "bg-teal"];

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-ink py-24 text-white lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-white/40" />
          <span className="label-light">04 — El equipo</span>
        </div>
        <h2 className="display max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)] text-white">
          Las personas detrás del <span className="accent-word">producto</span>.
        </h2>
        <p className="mt-6 max-w-[540px] text-[1.05rem] text-white/70">
          Desarrollo, operación, ventas y producto bajo un mismo techo. Tu equipo tech sin tener
          que contratar uno interno.
        </p>

        {/* Equipo */}
        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 70} className="bg-ink p-7">
              <div
                className={`mb-5 grid h-14 w-14 place-items-center font-display text-2xl text-white ${avatarBg[i % 4]}`}
              >
                {m.initial}
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                {m.name}
              </h3>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-teal">
                {m.role}
              </p>
              <p className="mt-3 font-mono text-[0.72rem] tracking-tight text-white/45">
                {m.stack}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
            Stack que usamos /
          </span>
          {techStack.map((t) => (
            <span
              key={t}
              className="border border-white/15 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
