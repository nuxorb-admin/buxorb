import { useState } from "react";
import { processSteps } from "../../data/modules";

export default function Proceso() {
  const [sel, setSel] = useState(0);
  const step = processSteps[sel];

  return (
    <section id="proceso" className="bg-ink py-24 text-white lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-white/40" />
          <span className="label-light">05 — Cómo empiezas</span>
        </div>
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] text-white">
          Del diagnóstico a <span className="accent-word">operando</span>.
        </h2>
        <p className="mt-6 max-w-[520px] text-[1.05rem] text-white/70">
          Un onboarding claro y acompañado. Sabes en qué etapa estás y qué recibes en cada paso.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Ruta / waypoints */}
          <ol className="relative space-y-2 border-l border-white/15 pl-6">
            {processSteps.map((s, i) => {
              const activeStep = i === sel;
              return (
                <li key={s.num} className="relative">
                  {/* nodo */}
                  <span
                    className={`absolute -left-[31px] top-3 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
                      activeStep
                        ? "border-orange bg-orange"
                        : "border-white/30 bg-ink"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <button
                    onClick={() => setSel(i)}
                    className={`flex w-full items-baseline gap-4 py-3 text-left transition-colors ${
                      activeStep ? "" : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    <span className="font-display text-3xl leading-none text-white/40">
                      {s.num}
                    </span>
                    <span className="font-display text-2xl uppercase tracking-tight text-white">
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Panel de detalle */}
          <div className="border border-white/15 bg-ink-2 p-8">
            <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.16em]">
              <span className="flex items-center gap-2 text-teal">
                <span className="h-2 w-2 rounded-full bg-orange" /> Paso activo
              </span>
              <span className="text-white/40">{step.code}</span>
            </div>

            <h3 className="mt-5 font-display text-[2.6rem] uppercase leading-none tracking-tight text-white">
              {step.title}
            </h3>

            <div className="mt-7 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              {step.meta.map((m) => (
                <div key={m.label}>
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
                    {m.label}
                  </span>
                  <span className="mt-1 block font-display text-xl uppercase tracking-tight text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[0.97rem] text-white/70">{step.description}</p>

            {/* barra de progreso del proceso */}
            <div className="mt-8">
              <div className="mb-2 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
                <span>Avance del onboarding</span>
                <span>{Math.round(((sel + 1) / processSteps.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-orange transition-all duration-500"
                  style={{ width: `${((sel + 1) / processSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
