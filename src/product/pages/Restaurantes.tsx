import { Navigate, Route, Routes } from "react-router-dom";
import type { BusinessLineTier } from "../../lib/database.types";
import { useRestaurantesData } from "./restaurantes/useRestaurantesData";
import { limitsForTier } from "./restaurantes/limits";
import MenuTab from "./restaurantes/MenuTab";
import MesasTab from "./restaurantes/MesasTab";
import ComandasTab from "./restaurantes/ComandasTab";
import CocinaTab from "./restaurantes/CocinaTab";
import CajaTab from "./restaurantes/CajaTab";
import ReservacionesTab from "./restaurantes/ReservacionesTab";

// Restaurantes no usa el patrón de tabs internas de Tesorería/Lealtad —
// cada módulo (Comandas, Mesas, Cocina, Caja, Menú, Reservaciones) vive en
// su propia entrada del grupo colapsable "Restaurantes" del sidebar
// (ver TenantPortal.tsx), así que aquí solo se resuelven como rutas
// anidadas bajo /restaurantes/*.
export default function Restaurantes({ companyId, tier }: { companyId: string; tier: BusinessLineTier }) {
  const { loading, products, menuItems, tables, openOrders, cashSession, tickets, reservations, reload } =
    useRestaurantesData(companyId);
  const limits = limitsForTier(tier);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Restaurantes</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : tier === "professional" ? "Professional" : "Enterprise"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Mesas, comandas y cobro, todo en un lugar</p>

      <div className="mt-6">
        <Routes>
          <Route index element={<Navigate to="comandas" replace />} />
          <Route
            path="menu"
            element={<MenuTab companyId={companyId} products={products} menuItems={menuItems} reload={reload} />}
          />
          <Route path="mesas" element={<MesasTab companyId={companyId} tables={tables} limits={limits} reload={reload} />} />
          <Route
            path="comandas"
            element={
              <ComandasTab
                companyId={companyId}
                tables={tables}
                openOrders={openOrders}
                menuItems={menuItems}
                products={products}
                reload={reload}
              />
            }
          />
          {limits.kds && (
            <Route
              path="cocina"
              element={<CocinaTab tables={tables} openOrders={openOrders} products={products} reload={reload} />}
            />
          )}
          <Route
            path="caja"
            element={
              <CajaTab
                companyId={companyId}
                cashSession={cashSession}
                openOrders={openOrders}
                tickets={tickets}
                tables={tables}
                products={products}
                limits={limits}
                reload={reload}
              />
            }
          />
          {limits.reservaciones && (
            <Route
              path="reservaciones"
              element={<ReservacionesTab companyId={companyId} tables={tables} reservations={reservations} reload={reload} />}
            />
          )}
        </Routes>
      </div>
    </div>
  );
}
