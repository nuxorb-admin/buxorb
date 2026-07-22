import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "./AuthProvider";
import NameGate from "./components/NameGate";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/leads", label: "Leads", end: false },
  { to: "/admin/companies", label: "Empresas", end: false },
  { to: "/admin/tasks", label: "Tareas", end: false },
  { to: "/admin/team", label: "Equipo", end: false },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-sand text-ink lg:flex">
      <aside className="bg-ink text-white lg:flex lg:w-60 lg:flex-none lg:flex-col lg:justify-between lg:px-5 lg:py-6">
        <div>
          <div className="flex items-center justify-between px-5 py-4 lg:px-0 lg:py-0">
            <Logo variant="dark" />
            <button
              onClick={signOut}
              className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/40 hover:text-orange lg:hidden"
            >
              Salir
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-5 py-2 lg:mt-10 lg:flex-col lg:overflow-visible lg:border-none lg:px-0 lg:py-0">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
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
        <div className="hidden border-t border-white/10 pt-4 lg:block">
          <p className="truncate font-mono text-[0.7rem] text-white/70">
            {profile?.full_name || "…"}
          </p>
          <button
            onClick={signOut}
            className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white/40 hover:text-orange"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <Outlet />
      </main>
      {profile && !profile.full_name && <NameGate />}
    </div>
  );
}
