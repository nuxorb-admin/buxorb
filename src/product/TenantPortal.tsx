import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { CompanyModuleName } from "../lib/database.types";
import ProductLayout, { MODULE_NAV } from "./ProductLayout";
import Tesoreria from "./pages/Tesoreria";
import Compras from "./pages/Compras";
import Personal from "./pages/Personal";
import Ventas from "./pages/Ventas";

interface TenantInfo {
  id: string;
  name: string;
}

export default function TenantPortal({ slug }: { slug: string }) {
  const [tenant, setTenant] = useState<TenantInfo | null | undefined>(undefined);
  const [activeModules, setActiveModules] = useState<CompanyModuleName[]>([]);

  useEffect(() => {
    async function load() {
      const { data: companyData } = await supabase
        .from("companies")
        .select("id, name")
        .eq("subdomain", slug)
        .maybeSingle();

      if (!companyData) {
        setTenant(null);
        return;
      }

      setTenant(companyData);

      const { data: modules } = await supabase
        .from("company_modules")
        .select("module")
        .eq("company_id", companyData.id)
        .eq("active", true);
      setActiveModules((modules ?? []).map((m) => m.module as CompanyModuleName));
    }
    load();
  }, [slug]);

  if (tenant === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink font-mono text-xs uppercase tracking-[0.14em] text-white/60">
        Cargando…
      </div>
    );
  }

  if (tenant === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center font-mono text-sm text-white/60">
        No encontramos ningún cliente con este subdominio.
      </div>
    );
  }

  const firstActive = MODULE_NAV.find((m) => activeModules.includes(m.module));

  return (
    <Routes>
      <Route element={<ProductLayout title={tenant.name} scopeId={tenant.id} activeModules={activeModules} />}>
        <Route
          index
          element={
            firstActive ? (
              <Navigate to={firstActive.to} replace />
            ) : (
              <div className="font-mono text-xs text-muted">Este cliente no tiene módulos activos todavía.</div>
            )
          }
        />
        <Route path="tesoreria" element={<Tesoreria />} />
        <Route path="compras" element={<Compras />} />
        <Route path="personal" element={<Personal />} />
        <Route path="ventas" element={<Ventas />} />
      </Route>
    </Routes>
  );
}
