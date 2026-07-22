import Logo from "./Logo";

const cols = [
  {
    title: "Módulos",
    items: [
      { label: "Tesorería", href: "#modulos" },
      { label: "Compras y Proveedores", href: "#modulos" },
      { label: "Gestión de Personal", href: "#modulos" },
      { label: "Ventas y CxC", href: "#modulos" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "El problema", href: "#problema" },
      { label: "Niveles", href: "#niveles" },
      { label: "Contacto", href: "#contacto" },
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
              Plataforma modular de administración para PyMEs mexicanas. Tesorería, compras,
              personal y ventas, con IA y automatización incluidas.
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
