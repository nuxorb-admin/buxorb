import Counter from "../ui/Counter";
import Reveal from "../Reveal";
import { stats } from "../../data/content";

export default function Stats() {
  return (
    <section className="border-y border-ink/15">
      <div className="container-x grid divide-ink/15 sm:grid-cols-3 sm:divide-x">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 100}
            className="px-2 py-10 text-center sm:px-8 sm:text-left"
          >
            <span className="block font-display text-[clamp(3rem,6vw,4.5rem)] leading-none text-ink">
              <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </span>
            <span className="mt-2 block font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              {s.label}
              {s.note && <em className="ml-1 not-italic text-orange">· {s.note}</em>}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
