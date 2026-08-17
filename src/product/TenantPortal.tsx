import { useEffect, useState, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { BusinessLineTier, CompanyModuleName, CompanyRoleModuleKey } from "../lib/database.types";
import ProductLayout, { type ExtraNavItem, type ModuleNavItem } from "./ProductLayout";
import { limitsForTier } from "./pages/restaurantes/limits";
import Tesoreria from "./pages/Tesoreria";
import Compras from "./pages/Compras";
import Personal from "./pages/Personal";
import Ventas from "./pages/Ventas";
import UsersRoles from "./pages/UsersRoles";
import Agentes from "./pages/Agentes";
import Lealtad from "./pages/Lealtad";
import Restaurantes from "./pages/Restaurantes";
import LoyaltyEnroll from "../public/LoyaltyEnroll";
import { TenantAuthProvider, useTenantAuth } from "./TenantAuthProvider";
import TenantLogin from "./TenantLogin";
import CompleteFirstLogin from "./CompleteFirstLogin";

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

// Registro público de tarjetas de lealtad (sin login) — vive en el mismo
// subdominio del tenant (empresa.app.nuxorb.com/lealtad/<id>) para que la
// URL que ve el cliente final sea la del negocio, no un dominio genérico.
// Se resuelve ANTES que cualquier cosa de auth/tenant, porque
// loyalty-enroll ya valida el program_id por su cuenta.
const ENROLL_PATH = /^\/lealtad\/([^/]+)\/?$/;

export default function TenantPortal({ slug }: { slug: string }) {
  const [tenant, setTenant] = useState<TenantInfo | null | undefined>(undefined);
  const enrollMatch = window.location.pathname.match(ENROLL_PATH);

  useEffect(() => {
    if (enrollMatch) return;
    async function load() {
      const { data } = await supabase
        .schema("nuxorb").from("companies")
        .select("id, name, max_users")
        .eq("subdomain", slug)
        .maybeSingle();
      setTenant(data ?? null);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (enrollMatch) {
    return <LoyaltyEnroll programId={enrollMatch[1]} />;
  }

  if (tenant === undefined) {
    return <FullscreenMessage>Cargando…</FullscreenMessage>;
  }
  if (tenant === null) {
    return <FullscreenMessage>No encontramos ningún cliente con este subdominio.</FullscreenMessage>;
  }

  return (
    <TenantAuthProvider>
      <TenantPortalGate tenant={tenant} subdomain={slug} />
    </TenantAuthProvider>
  );
}

function TenantPortalGate({ tenant, subdomain }: { tenant: TenantInfo; subdomain: string }) {
  const { session, loading, signOut } = useTenantAuth();
  const [membership, setMembership] = useState<Membership | null | undefined>(undefined);
  const [activeModules, setActiveModules] = useState<CompanyModuleName[]>([]);
  const [allowedModules, setAllowedModules] = useState<CompanyModuleName[]>([]);
  const [roleCapabilities, setRoleCapabilities] = useState<CompanyRoleModuleKey[]>([]);
  const [moduleSeats, setModuleSeats] = useState<Partial<Record<CompanyModuleName, number>>>({});
  const [modulesLoaded, setModulesLoaded] = useState(false);
  const [needsSetup, setNeedsSetup] = useState<boolean | undefined>(undefined);
  const [agentesActivo, setAgentesActivo] = useState(false);
  const [lealtadActivo, setLealtadActivo] = useState(false);
  const [restaurantesTier, setRestaurantesTier] = useState<BusinessLineTier | null>(null);

  // Independiente de la membresía: un usuario recién creado (create-company-user)
  // tiene needs_setup=true hasta que captura su correo real + su propia
  // contraseña (ver complete-first-login) — se checa apenas hay sesión, antes
  // de mostrar cualquier cosa del portal.
  useEffect(() => {
    if (!session) {
      setNeedsSetup(undefined);
      return;
    }
    supabase
      .schema("nuxorb")
      .from("profiles")
      .select("needs_setup")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setNeedsSetup(!!data?.needs_setup));
  }, [session]);

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
        .schema("nuxorb").from("company_modules")
        .select("module, seats")
        .eq("company_id", tenant.id)
        .eq("active", true);
      const active = (modulesData ?? []).map((m) => m.module as CompanyModuleName);

      const { data: roleModuleData } = memberRow.role_id
        ? await supabase.from("company_role_modules").select("module").eq("role_id", memberRow.role_id)
        : { data: [] as { module: CompanyRoleModuleKey }[] };
      const roleModules = (roleModuleData ?? []).map((m) => m.module as CompanyRoleModuleKey);

      const { data: addonRow } = await supabase
        .schema("nuxorb")
        .from("company_addons")
        .select("addon")
        .eq("company_id", tenant.id)
        .eq("addon", "agentes_ia")
        .eq("active", true)
        .maybeSingle();
      setAgentesActivo(!!addonRow);

      const { data: lealtadRow } = await supabase
        .schema("nuxorb")
        .from("company_addons")
        .select("addon")
        .eq("company_id", tenant.id)
        .eq("addon", "lealtad")
        .eq("active", true)
        .maybeSingle();
      setLealtadActivo(!!lealtadRow);

      const { data: businessLineRow } = await supabase
        .schema("nuxorb")
        .from("ldn_company_business_lines")
        .select("tier")
        .eq("company_id", tenant.id)
        .eq("business_line", "restaurantes")
        .eq("active", true)
        .maybeSingle();
      setRestaurantesTier((businessLineRow?.tier as BusinessLineTier) ?? null);

      // Se calculan primero los módulos y hasta el final se marca membership +
      // modulesLoaded juntos, para que nunca haya un render intermedio con
      // membership ya resuelto pero navModules todavía vacío (eso mandaba a
      // cualquier owner directo a "Usuarios y roles" en vez de su módulo).
      setActiveModules(active);
      setAllowedModules(active.filter((m) => roleModules.includes(m)));
      setRoleCapabilities(roleModules);
      setModuleSeats(Object.fromEntries((modulesData ?? []).map((m) => [m.module, m.seats])));
      setMembership({ roleId: memberRow.role_id, isOwner: memberRow.is_owner });
      setModulesLoaded(true);
    }

    loadMembership();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, tenant.id]);

  if (loading) return <FullscreenMessage>Cargando…</FullscreenMessage>;
  if (!session) return <TenantLogin companyName={tenant.name} />;
  if (needsSetup === undefined) return <FullscreenMessage>Cargando…</FullscreenMessage>;
  if (needsSetup) return <CompleteFirstLogin currentEmail={session.user.email ?? ""} />;
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
  // Agentes IA, Lealtad y Restaurantes ya no se muestran a cualquier
  // usuario de la empresa solo por estar contratados — el owner siempre
  // los ve todos, cualquier otro usuario necesita que su rol tenga el
  // permiso marcado en company_role_modules (ver Usuarios y roles).
  const canSeeAgentes = agentesActivo && (membership.isOwner || roleCapabilities.includes("agentes_ia"));
  const canSeeLealtad = lealtadActivo && (membership.isOwner || roleCapabilities.includes("lealtad"));
  const canSeeRestaurantes = !!restaurantesTier && (membership.isOwner || roleCapabilities.includes("restaurantes"));
  const restaurantesLimits = canSeeRestaurantes && restaurantesTier ? limitsForTier(restaurantesTier) : null;
  const extraNav: ExtraNavItem[] = [
    ...(canSeeAgentes ? [{ to: "agentes", label: "Agentes IA" }] : []),
    ...(canSeeLealtad ? [{ to: "lealtad", label: "Lealtad" }] : []),
    ...(restaurantesLimits
      ? [
          {
            label: "Restaurantes",
            children: [
              { to: "restaurantes/comandas", label: "Comandas" },
              { to: "restaurantes/mesas", label: "Mesas" },
              ...(restaurantesLimits.kds ? [{ to: "restaurantes/cocina", label: "Cocina" }] : []),
              { to: "restaurantes/caja", label: "Caja" },
              { to: "restaurantes/menu", label: "Menú" },
              ...(restaurantesLimits.reservaciones ? [{ to: "restaurantes/reservaciones", label: "Reservaciones" }] : []),
            ],
          },
        ]
      : []),
    ...(membership.isOwner ? [{ to: "usuarios", label: "Usuarios y roles" }] : []),
  ];

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
            ) : canSeeAgentes ? (
              <Navigate to="agentes" replace />
            ) : canSeeLealtad ? (
              <Navigate to="lealtad" replace />
            ) : canSeeRestaurantes ? (
              <Navigate to="restaurantes/comandas" replace />
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
        {canSeeAgentes && <Route path="agentes" element={<Agentes companyId={tenant.id} />} />}
        {canSeeLealtad && (
          <Route path="lealtad" element={<Lealtad companyId={tenant.id} companyName={tenant.name} subdomain={subdomain} />} />
        )}
        {canSeeRestaurantes && restaurantesTier && (
          <Route path="restaurantes/*" element={<Restaurantes companyId={tenant.id} tier={restaurantesTier} />} />
        )}
        {membership.isOwner && (
          <Route
            path="usuarios"
            element={
              <UsersRoles
                companyId={tenant.id}
                companyName={tenant.name}
                activeModules={activeModules}
                moduleSeats={moduleSeats}
                agentesActivo={agentesActivo}
                lealtadActivo={lealtadActivo}
                restaurantesActivo={!!restaurantesTier}
                maxUsers={tenant.max_users}
              />
            }
          />
        )}
      </Route>
    </Routes>
  );
}
