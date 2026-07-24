import { Navigate, Route, Routes } from "react-router-dom";
import MarketingSite from "./site/MarketingSite";
import { AuthProvider } from "./admin/AuthProvider";
import RequireAuth from "./admin/RequireAuth";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Leads from "./admin/pages/Leads";
import LeadDetail from "./admin/pages/LeadDetail";
import Companies from "./admin/pages/Companies";
import CompanyDetail from "./admin/pages/CompanyDetail";
import Tasks from "./admin/pages/Tasks";
import Team from "./admin/pages/Team";
import DemoGateWrapper from "./demo-saas/DemoGateWrapper";
import TenantPortal from "./product/TenantPortal";
import TesoreriaDemo from "./product/pages/TesoreriaDemo";
import ComprasDemo from "./product/pages/ComprasDemo";
import PersonalDemo from "./product/pages/PersonalDemo";
import VentasDemo from "./product/pages/VentasDemo";

function getTenantSlug(): string | null {
  if (import.meta.env.DEV) {
    const fromQuery = new URLSearchParams(window.location.search).get("tenant");
    if (fromQuery) return fromQuery;
  }
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 2 && parts[0] !== "www") return parts[0];
  return null;
}

export default function App() {
  const tenantSlug = getTenantSlug();
  if (tenantSlug) {
    return <TenantPortal slug={tenantSlug} />;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MarketingSite />} />
        <Route path="/demo-saas" element={<DemoGateWrapper />}>
          <Route index element={<Navigate to="tesoreria" replace />} />
          <Route path="tesoreria" element={<TesoreriaDemo />} />
          <Route path="compras" element={<ComprasDemo />} />
          <Route path="personal" element={<PersonalDemo />} />
          <Route path="ventas" element={<VentasDemo />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
