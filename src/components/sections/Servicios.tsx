import { useState } from "react";
import Reveal from "../Reveal";
import { services, serviceFilters } from "../../data/content";

export default function Servicios() {
  const [filter, setFilter] = useState("todo");
  const visible = services.filter((s) => filter === "todo" || s.tags.includes(filter));

  return (
    <section id="servicios" className="py-24 lg:py-32">
      <div className="container-x">
        {/* Encabezado */}
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">01 — Servicios</span>
        </div>
        <h2 className="display max-w-[14ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Cada proyecto, <span className="accent-word">a la medida</span>.
        </h2>
        <p className="mt-6 max-w-[520px] text-[1.05rem] text-muted">
          Desde un agente de IA en WhatsApp hasta un sistema completo. Elige el tipo de solución,
          no sólo la herramienta.
        </p>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {serviceFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`pill ${filter === f.id ? "pill-active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tarjetas */}
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s, i) => (
            <Reveal
              as="article"
              key={s.name}
              delay={(i % 3) * 70}
              className="group relative bg-sand-2 p-7 transition-colors hover:bg-sand"
            >
              {/* acento esquina */}
              <div className="mb-6 flex items-center gap-2">
                <span className="h-8 w-1.5 bg-teal" />
                <span className="h-3 w-3 bg-orange" />
                <span className="ml-auto font-mono text-[0.7rem] text-ink/30">
                  0{i + 1}
                </span>
              </div>

              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">
                {s.category}
              </p>
              <h3 className="mt-1 font-display text-[1.9rem] uppercase leading-none tracking-tight text-ink">
                {s.name}
              </h3>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {s.specs.map((sp) => (
                  <span key={sp} className="spec">
                    {sp}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[0.95rem] text-muted">{s.description}</p>

              <a
                href="#contacto"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-orange"
              >
                Cotizar <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
