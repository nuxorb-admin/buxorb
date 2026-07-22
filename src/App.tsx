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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MarketingSite />} />
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
