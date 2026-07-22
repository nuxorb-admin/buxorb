import Reveal from "../Reveal";
import Asterisk from "../ui/Asterisk";
import { tiers, comboDiscounts, seatPricing, growthPlans } from "../../data/modules";

export default function Niveles() {
  return (
    <section id="niveles" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">04 — Niveles</span>
        </div>
        <h2 className="display max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Tres niveles por módulo — <span className="accent-word">subes</span> cuando lo pidas.
        </h2>
        <p className="mt-6 max-w-[560px] text-[1.05rem] text-muted">
          Cada módulo se contrata en el nivel que necesites hoy. Todos incluyen la web app y
          automatizaciones N8N (alertas, recordatorios, envíos automáticos).
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const dark = t.featured;
            return (
              <Reveal
                key={t.code}
                delay={i * 90}
                className={`relative flex flex-col border p-8 ${
                  dark ? "border-ink bg-ink text-white" : "border-ink/15 bg-sand-2"
                }`}
              >
                {dark && (
                  <span className="absolute right-6 top-7 bg-orange px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white">
                    Más elegido
                  </span>
                )}
                <span className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] ${dark ? "text-white/40" : "text-ink/35"}`}>
                  {t.code}
                </span>

                <h3
                  className={`mt-4 font-display text-[2.1rem] uppercase leading-[0.95] tracking-tight ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {t.name}
                </h3>
                <p className={`mt-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] ${dark ? "text-teal" : "text-teal-dark"}`}>
                  {t.tagline}
                </p>

                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Asterisk className="mt-0.5 h-3.5 w-3.5 flex-none" />
                      <span className={`text-[0.92rem] ${dark ? "text-white/80" : "text-muted"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contacto" className={`btn mt-7 ${dark ? "btn-primary" : "btn-outline"}`}>
                  Empezar →
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Combos y seats */}
        <div className="mt-10 grid gap-6 border border-ink/15 bg-sand-2 p-7 sm:grid-cols-2 sm:p-9">
          <div>
            <span className="label">Descuento por combo</span>
            <ul className="mt-4 space-y-2.5">
              {comboDiscounts.map((c) => (
                <li key={c.modules} className="flex items-center justify-between border-b border-ink/10 pb-2.5 text-[0.9rem]">
                  <span className="text-ink">{c.modules} módulos</span>
                  <span className="font-mono text-[0.78rem] text-teal">{c.discount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label">Seat adicional</span>
            <p className="mt-4 font-display text-3xl text-ink">
              ${seatPricing.price}<span className="font-mono text-[0.6rem] text-ink/40"> +IVA/mes</span>
            </p>
            <p className="mt-3 text-[0.88rem] text-muted">{seatPricing.note}</p>
          </div>
        </div>

        {/* Crecimiento: sucursales y compañías */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {growthPlans.map((g) => (
            <div key={g.title} className="border border-ink/15 bg-sand-2 p-7">
              <h3 className="font-display text-xl uppercase tracking-tight text-ink">{g.title}</h3>
              <p className="mt-1 font-mono text-[0.72rem] text-muted">{g.subtitle}</p>
              <ul className="mt-4 space-y-2.5">
                {g.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Asterisk className="mt-0.5 h-3 w-3 flex-none" color="#57655f" />
                    <span className="text-[0.86rem] text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
