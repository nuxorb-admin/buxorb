import Logo from "./Logo";

const cols = [
  {
    title: "Servicio",
    items: [
      { label: "Agentes IA", href: "#servicios" },
      { label: "Software a medida", href: "#servicios" },
      { label: "Plataformas web", href: "#servicios" },
      { label: "Automatizaciones", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Proceso", href: "#proceso" },
      { label: "Planes", href: "#planes" },
      { label: "Nosotros", href: "#nosotros" },
    ],
  },
  {
    title: "Contacto",
    items: [
      { label: "hola@nuxorb.com", href: "mailto:hola@nuxorb.com" },
      { label: "WhatsApp", href: "https://wa.me/" },
      { label: "México · Remoto", href: "#contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black pb-10 pt-16 text-white/60">
      <div className="container-x">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="dark" tagline />
            <p className="mt-5 max-w-[300px] text-sm">
              Tecnología e IA para PYMEs en México. Sin formularios eternos, sin esperas.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 font-display text-lg uppercase tracking-tight text-white">
                {c.title}
              </h4>
              <ul className="grid gap-2.5">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="text-sm transition-colors hover:text-orange">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-7 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/40">
          <span>© {new Date().getFullYear()} NUXORB</span>
          <span>Hecho en México · 4.0</span>
        </div>
      </div>
    </footer>
  );
}
