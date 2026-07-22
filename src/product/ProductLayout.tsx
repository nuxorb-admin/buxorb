import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import type { CompanyModuleName } from "../lib/database.types";

export interface ProductContext {
  scopeId: string;
}

export const MODULE_NAV: { to: string; label: string; module: CompanyModuleName }[] = [
  { to: "tesoreria", label: "Tesorería", module: "tesoreria" },
  { to: "compras", label: "Compras y Proveedores", module: "compras_proveedores" },
  { to: "personal", label: "Gestión de Personal", module: "gestion_personal" },
  { to: "ventas", label: "Ventas y CxC", module: "ventas_cxc" },
];

export default function ProductLayout({
  title,
  scopeId,
  activeModules,
  onExit,
}: {
  title: string;
  scopeId: string;
  /** Si se omite, se muestran los 4 módulos (demo genérico). Si se da, solo los activos. */
  activeModules?: CompanyModuleName[];
  onExit?: () => void;
}) {
  const items = activeModules ? MODULE_NAV.filter((m) => activeModules.includes(m.module)) : MODULE_NAV;

  return (
    <div className="min-h-screen bg-sand text-ink lg:flex">
      <aside className="bg-ink text-white lg:flex lg:w-60 lg:flex-none lg:flex-col lg:justify-between lg:px-5 lg:py-6">
        <div>
          <div className="flex items-center justify-between px-5 py-4 lg:px-0 lg:py-0">
            <Logo variant="dark" />
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-orange">
              Demo
            </span>
          </div>
          <p className="px-5 pt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/50 lg:px-0 lg:pt-4">
            {title}
          </p>
          <nav className="mt-4 flex gap-1 overflow-x-auto border-t border-white/10 px-5 py-2 lg:mt-6 lg:flex-col lg:overflow-visible lg:border-none lg:px-0 lg:py-0">
            {items.length === 0 && (
              <p className="font-mono text-[0.68rem] text-white/40">Sin módulos activos.</p>
            )}
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap border-l-2 px-3 py-2.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "border-orange bg-white/5 text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {onExit && (
          <div className="hidden border-t border-white/10 pt-4 lg:block">
            <button
              onClick={onExit}
              className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white/40 hover:text-orange"
            >
              Salir del demo
            </button>
          </div>
        )}
      </aside>
      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <Outlet context={{ scopeId } satisfies ProductContext} />
      </main>
    </div>
  );
}
