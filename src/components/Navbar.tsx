import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { id: "modulos", label: "Módulos" },
  { id: "niveles", label: "Niveles" },
  { id: "proceso", label: "Proceso" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink/10 bg-sand/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Barra de progreso */}
      <div
        className="absolute left-0 top-0 h-0.5 bg-orange transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="container-x flex h-[72px] items-center justify-between">
        <a href="#inicio" aria-label="Nuxorb inicio">
          <Logo />
        </a>

        {/* Links escritorio */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                active === l.id ? "text-ink" : "text-muted hover:text-ink"
              } ${active === l.id ? "after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:content-['']" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="btn btn-primary hidden md:inline-flex">
          Cotizar →
        </a>

        {/* Botón móvil */}
        <button
          className="flex flex-col gap-[5px] p-2 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 rounded bg-ink" />
          <span className="h-0.5 w-6 rounded bg-ink" />
          <span className="h-0.5 w-6 rounded bg-ink" />
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav className="border-b border-ink/10 bg-sand md:hidden" aria-label="Móvil">
          <div className="container-x flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink"
              >
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary mt-4">
              Cotizar →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
