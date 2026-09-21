import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { IntegrationConnection } from "../../lib/database.types";
import FieldInput from "../../admin/components/FieldInput";
import Badge from "../../admin/components/Badge";
import { connectShopify, syncShopifyConnection } from "./shopify/api";

export default function Conexiones({ companyId, shopifyActivo }: { companyId: string; shopifyActivo: boolean }) {
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<IntegrationConnection | null>(null);

  async function load() {
    const { data } = await supabase
      .from("integration_connections")
      .select("*")
      .eq("company_id", companyId)
      .eq("provider", "shopify")
      .maybeSingle();
    setConnection((data as IntegrationConnection | null) ?? null);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (loading) return <p className="font-mono text-xs text-muted">Cargando…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Conexiones</h1>
      <p className="mt-1 font-mono text-xs text-muted">Conecta tus otras herramientas para verlas dentro de Nuxorb</p>

      <div className="mt-6 space-y-4">
        {shopifyActivo ? (
          <ShopifyCard companyId={companyId} connection={connection} onChanged={load} />
        ) : (
          <p className="font-mono text-xs text-muted">Tu plan no tiene conexiones disponibles todavía.</p>
        )}
      </div>
    </div>
  );
}

function ShopifyCard({
  companyId,
  connection,
  onChanged,
}: {
  companyId: string;
  connection: IntegrationConnection | null;
  onChanged: () => void;
}) {
  const [form, setForm] = useState({ shop_domain: "", client_id: "", client_secret: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function connect(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { connectionId, error: connectError } = await connectShopify({ company_id: companyId, ...form });
    if (connectError || !connectionId) {
      setBusy(false);
      setError(connectError ?? "No se pudo conectar");
      return;
    }
    // Primera sincronización inmediata para que Shopify no aparezca vacío.
    const syncError = await syncShopifyConnection(connectionId);
    setBusy(false);
    if (syncError) setError(`Conectada, pero la primera sincronización falló: ${syncError}`);
    setForm({ shop_domain: "", client_id: "", client_secret: "" });
    onChanged();
  }

  async function sync() {
    if (!connection) return;
    setBusy(true);
    setError(null);
    const syncError = await syncShopifyConnection(connection.id);
    setBusy(false);
    if (syncError) setError(syncError);
    onChanged();
  }

  async function disconnect() {
    if (!connection) return;
    if (!confirm("¿Desconectar Shopify? Se borran las credenciales y los datos sincronizados (los pedidos y productos siguen en tu tienda).")) return;
    setBusy(true);
    const { error: deleteError } = await supabase.from("integration_connections").delete().eq("id", connection.id);
    setBusy(false);
    if (deleteError) {
      setError("No se pudo desconectar.");
      return;
    }
    onChanged();
  }

  return (
    <div className="border border-ink/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Shopify</h2>
        {connection && <Badge color={connection.status === "conectado" ? "teal" : "orange"}>{connection.status}</Badge>}
      </div>

      {error && (
        <div className="mt-3 border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.7rem] text-orange">{error}</div>
      )}

      {connection ? (
        <div className="mt-3">
          <p className="font-mono text-xs text-muted">
            {connection.display_name} · {connection.shop_domain}
          </p>
          <p className="mt-1 font-mono text-[0.66rem] text-muted">
            {connection.last_synced_at ? `Última sincronización: ${new Date(connection.last_synced_at).toLocaleString("es-MX")}` : "Aún sin sincronizar"}
          </p>
          {connection.status === "error" && connection.last_error && (
            <p className="mt-2 font-mono text-[0.66rem] text-orange">{connection.last_error}</p>
          )}
          <div className="mt-4 flex gap-3">
            <button onClick={sync} disabled={busy} className="btn btn-primary">
              {busy ? "Sincronizando…" : "Sincronizar ahora"}
            </button>
            <button onClick={disconnect} disabled={busy} className="btn btn-outline">
              Desconectar
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={connect} className="mt-3 space-y-3">
          <ol className="list-decimal space-y-1 pl-5 font-mono text-[0.68rem] text-muted">
            <li>En tu admin de Shopify: Configuración → Apps y canales de venta → Desarrollar apps → Crear app con el Dev Dashboard.</li>
            <li>Crea una app con distribución personalizada para tu tienda y permisos de solo lectura: productos, pedidos e inventario.</li>
            <li>Instálala en tu tienda y copia aquí su dominio, Client ID y Client secret.</li>
          </ol>
          <FieldInput
            label="Dominio de tu tienda"
            value={form.shop_domain}
            onChange={(v) => setForm({ ...form, shop_domain: v })}
            placeholder="mitienda.myshopify.com"
            required
          />
          <FieldInput label="Client ID" value={form.client_id} onChange={(v) => setForm({ ...form, client_id: v })} required />
          <FieldInput
            label="Client secret"
            type="password"
            value={form.client_secret}
            onChange={(v) => setForm({ ...form, client_secret: v })}
            required
          />
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Conectando…" : "Conectar tienda"}
          </button>
        </form>
      )}
    </div>
  );
}
