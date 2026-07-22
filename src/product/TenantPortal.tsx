import { useEffect, useState, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { CompanyModuleName, ProductLine } from "../lib/database.types";
import ProductLayout, { MODULE_NAV } from "./ProductLayout";
import SingleModuleShell from "./SingleModuleShell";
import Tesoreria from "./pages/Tesoreria";
import Compras from "./pages/Compras";
import Personal from "./pages/Personal";
import Ventas from "./pages/Ventas";
import UsersRoles from "./pages/UsersRoles";
import PipelineVentas from "./pages/crm/PipelineVentas";
import Inventario from "./pages/erp/Inventario";
import { TenantAuthProvider, useTenantAuth } from "./TenantAuthProvider";
import TenantLogin from "./TenantLogin";

interface TenantInfo {
  id: string;
  name: string;
  max_users: number;
  product_line: ProductLine;
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

export default function TenantPortal({ slug }: { slug: string }) {
  const [tenant, setTenant] = useState<TenantInfo | null | undefined>(undefined);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("companies")
        .select("id, name, max_users, product_line")
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

  // CRM y ERP todavía no tienen su propio sistema de usuarios/roles (eso
  // solo existe para SaaS) — su portal queda sin login por ahora, pero con
  // los datos propios de esta empresa (scopeId = tenant.id), no compartidos
  // con el demo genérico.
  if (tenant.product_line === "crm") {
    return (
      <SingleModuleShell companyLabel={tenant.name} moduleLabel="Pipeline de Ventas">
        <PipelineVentas scopeId={tenant.id} />
      </SingleModuleShell>
    );
  }

  if (tenant.product_line === "erp") {
    return (
      <SingleModuleShell companyLabel={tenant.name} moduleLabel="Inventario">
        <Inventario scopeId={tenant.id} />
      </SingleModuleShell>
    );
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

      const [{ data: modulesData }, { data: roleModuleData }] = await Promise.all([
        supabase.from("company_modules").select("module").eq("company_id", tenant.id).eq("active", true),
        memberRow.role_id
          ? supabase.from("company_role_modules").select("module").eq("role_id", memberRow.role_id)
          : Promise.resolve({ data: [] as { module: CompanyModuleName }[] }),
      ]);
      const active = (modulesData ?? []).map((m) => m.module as CompanyModuleName);
      const roleModules = (roleModuleData ?? []).map((m) => m.module as CompanyModuleName);

      // Se calculan primero los módulos y hasta el final se marca membership +
      // modulesLoaded juntos, para que nunca haya un render intermedio con
      // membership ya resuelto pero navModules todavía vacío (eso mandaba a
      // cualquier owner directo a "Usuarios y roles" en vez de su módulo).
      setActiveModules(active);
      setAllowedModules(active.filter((m) => roleModules.includes(m)));
      setMembership({ roleId: memberRow.role_id, isOwner: memberRow.is_owner });
      setModulesLoaded(true);
    }

    loadMembership();
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
            element={<UsersRoles companyId={tenant.id} activeModules={activeModules} maxUsers={tenant.max_users} />}
          />
        )}
      </Route>
    </Routes>
  );
}
