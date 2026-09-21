import { useState } from "react";
import { useShopifyData } from "./shopify/useShopifyData";
import { syncShopifyConnection } from "./shopify/api";
import PedidosTab from "./shopify/PedidosTab";
import ProductosTab from "./shopify/ProductosTab";
import InventarioTab from "./shopify/InventarioTab";

type Tab = "pedidos" | "productos" | "inventario";

export default function Shopify({ companyId }: { companyId: string }) {
  const { loading, connection, orders, products, reload } = useShopifyData(companyId);
  const [tab, setTab] = useState<Tab>("pedidos");
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  async function sync() {
    if (!connection) return;
    setSyncing(true);
    setError(null);
    const syncError = await syncShopifyConnection(connection.id);
    setSyncing(false);
    if (syncError) setError(syncError);
    reload();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "pedidos", label: "Pedidos" },
    { id: "productos", label: "Productos" },
    { id: "inventario", label: "Inventario" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Shopify</h1>
      <p className="mt-1 font-mono text-xs text-muted">Lo que pasa en tu tienda, solo lectura</p>

      {!connection ? (
        <p className="mt-6 font-mono text-xs text-muted">
          Todavía no hay una tienda conectada. El owner de la empresa puede conectarla en "Conexiones".
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.66rem] text-muted">
            <span>
              {connection.display_name} · {connection.shop_domain} ·{" "}
              {connection.last_synced_at ? `sincronizado ${new Date(connection.last_synced_at).toLocaleString("es-MX")}` : "aún sin sincronizar"}
            </span>
            <button onClick={sync} disabled={syncing} className="uppercase text-teal hover:underline disabled:text-muted disabled:no-underline">
              {syncing ? "Sincronizando…" : "Sincronizar ahora"}
            </button>
          </div>
          {(error || connection.status === "error") && (
            <div className="mt-3 border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.7rem] text-orange">
              {error ?? connection.last_error ?? "La última sincronización falló."}
            </div>
          )}

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
            {tab === "pedidos" && <PedidosTab orders={orders} />}
            {tab === "productos" && <ProductosTab products={products} />}
            {tab === "inventario" && <InventarioTab products={products} />}
          </div>
        </>
      )}
    </div>
  );
}
