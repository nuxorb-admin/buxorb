export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-teal py-20 text-white lg:py-28">
      {/* textura de ondas */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        aria-hidden="true"
      >
        <g fill="none" stroke="#fff" strokeWidth="2">
          <path d="M0 80 C 300 20, 600 140, 1200 60" />
          <path d="M0 160 C 300 100, 600 220, 1200 140" />
          <path d="M0 240 C 300 180, 600 300, 1200 220" />
          <path d="M0 320 C 300 260, 600 380, 1200 300" />
        </g>
      </svg>

      <div className="container-x relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <h2 className="display max-w-[14ch] text-[clamp(2.8rem,8vw,6.5rem)] text-white">
          Pon tu negocio <span className="italic">en orden</span>.
        </h2>
        <div className="flex flex-shrink-0 flex-wrap gap-4">
          <a href="#contacto" className="btn btn-dark btn-lg">Agendar diagnóstico →</a>
          <a href="https://wa.me/" className="btn btn-outline-light btn-lg">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
