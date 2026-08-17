import { useState } from "react";
import type { BusinessLineTier } from "../../lib/database.types";
import { useRestaurantesData } from "./restaurantes/useRestaurantesData";
import { limitsForTier } from "./restaurantes/limits";
import MenuTab from "./restaurantes/MenuTab";
import MesasTab from "./restaurantes/MesasTab";
import ComandasTab from "./restaurantes/ComandasTab";
import CocinaTab from "./restaurantes/CocinaTab";
import CajaTab from "./restaurantes/CajaTab";
import ReservacionesTab from "./restaurantes/ReservacionesTab";

type Tab = "menu" | "mesas" | "comandas" | "cocina" | "caja" | "reservaciones";

export default function Restaurantes({ companyId, tier }: { companyId: string; tier: BusinessLineTier }) {
  const { loading, products, menuItems, tables, openOrders, cashSession, tickets, reservations, reload } =
    useRestaurantesData(companyId);
  const [tab, setTab] = useState<Tab>("comandas");
  const limits = limitsForTier(tier);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "comandas", label: "Comandas" },
    { id: "mesas", label: "Mesas" },
    ...(limits.kds ? [{ id: "cocina" as Tab, label: "Cocina" }] : []),
    { id: "caja", label: "Caja" },
    { id: "menu", label: "Menú" },
    ...(limits.reservaciones ? [{ id: "reservaciones" as Tab, label: "Reservaciones" }] : []),
  ];

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <h1 className="font-display text-3xl uppercase text-ink">Restaurantes</h1>
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal">
          {tier === "essential" ? "Essential" : tier === "professional" ? "Professional" : "Enterprise"}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">Mesas, comandas y cobro, todo en un lugar</p>

      <div className="mt-6 flex gap-1 border-b border-ink/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-colors ${
              tab === t.id ? "border-b-2 border-teal text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "menu" && <MenuTab companyId={companyId} products={products} menuItems={menuItems} reload={reload} />}
        {tab === "mesas" && <MesasTab companyId={companyId} tables={tables} limits={limits} reload={reload} />}
        {tab === "comandas" && (
          <ComandasTab tables={tables} openOrders={openOrders} menuItems={menuItems} products={products} reload={reload} />
        )}
        {tab === "cocina" && limits.kds && (
          <CocinaTab tables={tables} openOrders={openOrders} products={products} reload={reload} />
        )}
        {tab === "caja" && (
          <CajaTab
            companyId={companyId}
            cashSession={cashSession}
            openOrders={openOrders}
            tables={tables}
            products={products}
            limits={limits}
            reload={reload}
          />
        )}
        {tab === "reservaciones" && limits.reservaciones && (
          <ReservacionesTab companyId={companyId} tables={tables} reservations={reservations} reload={reload} />
        )}
      </div>

      {tickets.length > 0 && tab === "caja" && (
        <p className="mt-4 font-mono text-[0.6rem] text-muted">Últimos {tickets.length} tickets registrados.</p>
      )}
    </div>
  );
}
