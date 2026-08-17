import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import type { CompanyModuleName } from "../lib/database.types";

export interface ProductContext {
  scopeId: string;
}

export interface ModuleNavItem {
  to: string;
  label: string;
  module: CompanyModuleName;
}

/** Link simple, o grupo colapsable con sub-links (ver Restaurantes en TenantPortal). */
export type ExtraNavItem = { to: string; label: string } | { label: string; children: { to: string; label: string }[] };

function isNavGroup(item: ExtraNavItem): item is { label: string; children: { to: string; label: string }[] } {
  return "children" in item;
}

export const SAAS_MODULE_NAV: ModuleNavItem[] = [
  { to: "tesoreria", label: "Tesorería", module: "tesoreria" },
  { to: "compras", label: "Compras y Proveedores", module: "compras_proveedores" },
  { to: "personal", label: "Gestión de Personal", module: "gestion_personal" },
  { to: "ventas", label: "Ventas y CxC", module: "ventas_cxc" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap border-l-2 px-3 py-2.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
    isActive ? "border-orange bg-white/5 text-white" : "border-transparent text-white/50 hover:text-white"
  }`;

function NavGroup({ item }: { item: { label: string; children: { to: string; label: string }[] } }) {
  const location = useLocation();
  const isChildActive = item.children.some((c) => location.pathname.includes(`/${c.to.split("/")[0]}`));
  const [open, setOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between whitespace-nowrap border-l-2 px-3 py-2.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
          isChildActive ? "border-orange bg-white/5 text-white" : "border-transparent text-white/50 hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        <span className="text-[0.6rem]">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="border-l border-white/10 pl-3">
          {item.children.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className={({ isActive }) =>
                `block whitespace-nowrap px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors ${
                  isActive ? "text-white" : "text-white/40 hover:text-white"
                }`
              }
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductLayout({
  title,
  scopeId,
  moduleNav = SAAS_MODULE_NAV,
  activeModules,
  extraNav = [],
  exitLabel = "Salir del demo",
  onExit,
}: {
  title: string;
  scopeId: string;
  /** Catálogo de módulos de este sistema (SaaS/CRM/ERP). Por defecto, los 4 de SaaS. */
  moduleNav?: ModuleNavItem[];
  /** Si se omite, se muestran todos los de moduleNav (demo genérico). Si se da, solo los activos. */
  activeModules?: CompanyModuleName[];
  /** Links adicionales al final del nav (ej. "Usuarios y roles" para el owner de un tenant, o un grupo colapsable como Restaurantes). */
  extraNav?: ExtraNavItem[];
  exitLabel?: string;
  onExit?: () => void;
}) {
  const items = activeModules ? moduleNav.filter((m) => activeModules.includes(m.module)) : moduleNav;

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
            {items.length === 0 && extraNav.length === 0 && (
              <p className="font-mono text-[0.68rem] text-white/40">Sin módulos activos.</p>
            )}
            {items.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            {extraNav.map((item) =>
              isNavGroup(item) ? (
                <NavGroup key={item.label} item={item} />
              ) : (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </div>
        {onExit && (
          <div className="hidden border-t border-white/10 pt-4 lg:block">
            <button
              onClick={onExit}
              className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white/40 hover:text-orange"
            >
              {exitLabel}
            </button>
          </div>
        )}
      </aside>
      <main className="min-w-0 flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <Outlet context={{ scopeId } satisfies ProductContext} />
      </main>
    </div>
  );
}
