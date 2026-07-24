import { useEffect, useState, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { CompanyModuleName } from "../lib/database.types";
import ProductLayout, { type ModuleNavItem } from "./ProductLayout";
import Tesoreria from "./pages/Tesoreria";
import Compras from "./pages/Compras";
import Personal from "./pages/Personal";
import Ventas from "./pages/Ventas";
import UsersRoles from "./pages/UsersRoles";
import { TenantAuthProvider, useTenantAuth } from "./TenantAuthProvider";
import TenantLogin from "./TenantLogin";

interface TenantInfo {
  id: string;
  name: string;
  max_users: number;
}

interface Membership {
  roleId: string | null;
  isOwner: boolean;
}

function FullscreenMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center font-mono text-sm text-white/60">
      {children}
    </div>
  );
}

const MODULE_NAV: ModuleNavItem[] = [
  { to: "tesoreria", label: "Tesorería", module: "tesoreria" },
  { to: "compras", label: "Compras y Proveedores", module: "compras_proveedores" },
  { to: "personal", label: "Gestión de Personal", module: "gestion_personal" },
  { to: "ventas", label: "Ventas y CxC", module: "ventas_cxc" },
];

export default function TenantPortal({ slug }: { slug: string }) {
  const [tenant, setTenant] = useState<TenantInfo | null | undefined>(undefined);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("companies")
        .select("id, name, max_users")
        .eq("subdomain", slug)
        .maybeSingle();
      setTenant(data ?? null);
    }
    load();
  }, [slug]);

  if (tenant === undefined) {
    return <FullscreenMessage>Cargando…</FullscreenMessage>;
  }
  if (tenant === null) {
    return <FullscreenMessage>No encontramos ningún cliente con este subdominio.</FullscreenMessage>;
  }

  return (
    <TenantAuthProvider>
      <TenantPortalGate tenant={tenant} />
    </TenantAuthProvider>
  );
}

function TenantPortalGate({ tenant }: { tenant: TenantInfo }) {
  const { session, loading, signOut } = useTenantAuth();
  const [membership, setMembership] = useState<Membership | null | undefined>(undefined);
  const [activeModules, setActiveModules] = useState<CompanyModuleName[]>([]);
  const [allowedModules, setAllowedModules] = useState<CompanyModuleName[]>([]);
  const [moduleSeats, setModuleSeats] = useState<Partial<Record<CompanyModuleName, number>>>({});
  const [modulesLoaded, setModulesLoaded] = useState(false);

  useEffect(() => {
    if (!session) {
      setMembership(undefined);
      setModulesLoaded(false);
      return;
    }

    async function loadMembership() {
      const { data: memberRow } = await supabase
        .from("company_users")
        .select("role_id, is_owner")
        .eq("company_id", tenant.id)
        .eq("user_id", session!.user.id)
        .maybeSingle();

      if (!memberRow) {
        setMembership(null);
        return;
      }

      const { data: modulesData } = await supabase
        .from("company_modules")
        .select("module, seats")
        .eq("company_id", tenant.id)
        .eq("active", true);
      const active = (modulesData ?? []).map((m) => m.module as CompanyModuleName);

      const { data: roleModuleData } = memberRow.role_id
        ? await supabase.from("company_role_modules").select("module").eq("role_id", memberRow.role_id)
        : { data: [] as { module: CompanyModuleName }[] };
      const roleModules = (roleModuleData ?? []).map((m) => m.module as CompanyModuleName);

      // Se calculan primero los módulos y hasta el final se marca membership +
      // modulesLoaded juntos, para que nunca haya un render intermedio con
      // membership ya resuelto pero navModules todavía vacío (eso mandaba a
      // cualquier owner directo a "Usuarios y roles" en vez de su módulo).
      setActiveModules(active);
      setAllowedModules(active.filter((m) => roleModules.includes(m)));
      setModuleSeats(Object.fromEntries((modulesData ?? []).map((m) => [m.module, m.seats])));
      setMembership({ roleId: memberRow.role_id, isOwner: memberRow.is_owner });
      setModulesLoaded(true);
    }

    loadMembership();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, tenant.id]);

  if (loading) return <FullscreenMessage>Cargando…</FullscreenMessage>;
  if (!session) return <TenantLogin companyName={tenant.name} />;
  if (membership === undefined || (membership && !modulesLoaded)) {
    return <FullscreenMessage>Cargando…</FullscreenMessage>;
  }

  if (membership === null) {
    return (
      <FullscreenMessage>
        <div>
          <p>Tu cuenta no tiene acceso a {tenant.name}.</p>
          <button
            onClick={signOut}
            className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-orange hover:underline"
          >
            Cerrar sesión
          </button>
        </div>
      </FullscreenMessage>
    );
  }

  const navModules = membership.isOwner ? activeModules : allowedModules;
  const firstActive = MODULE_NAV.find((m) => navModules.includes(m.module));
  const extraNav = membership.isOwner ? [{ to: "usuarios", label: "Usuarios y roles" }] : [];

  return (
    <Routes>
      <Route
        element={
          <ProductLayout
            title={tenant.name}
            scopeId={tenant.id}
            moduleNav={MODULE_NAV}
            activeModules={navModules}
            extraNav={extraNav}
            exitLabel="Cerrar sesión"
            onExit={signOut}
          />
        }
      >
        <Route
          index
          element={
            firstActive ? (
              <Navigate to={firstActive.to} replace />
            ) : membership.isOwner ? (
              <Navigate to="usuarios" replace />
            ) : (
              <div className="font-mono text-xs text-muted">Todavía no tienes módulos asignados.</div>
            )
          }
        />
        <Route path="tesoreria" element={<Tesoreria />} />
        <Route path="compras" element={<Compras />} />
        <Route path="personal" element={<Personal />} />
        <Route path="ventas" element={<Ventas />} />
        {membership.isOwner && (
          <Route
            path="usuarios"
            element={
              <UsersRoles companyId={tenant.id} activeModules={activeModules} moduleSeats={moduleSeats} maxUsers={tenant.max_users} />
            }
          />
        )}
      </Route>
    </Routes>
  );
}
