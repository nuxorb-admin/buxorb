import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { IntegrationConnection, ShopifyOrder, ShopifyProduct } from "../../../lib/database.types";

export function useShopifyData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<IntegrationConnection | null>(null);
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  // Solo la primera carga (o un cambio de empresa) muestra "Cargando…": si
  // cada reload() desmontara la página, se perdería la pestaña abierta.
  const loadedOnce = useRef(false);

  async function load() {
    if (!loadedOnce.current) setLoading(true);
    const [{ data: connData }, { data: orderData }, { data: productData }] = await Promise.all([
      supabase.from("integration_connections").select("*").eq("company_id", companyId).eq("provider", "shopify").maybeSingle(),
      supabase.from("shopify_orders").select("*").eq("company_id", companyId).order("created_at_shopify", { ascending: false }),
      supabase.from("shopify_products").select("*").eq("company_id", companyId).order("title"),
    ]);
    setConnection((connData as IntegrationConnection | null) ?? null);
    setOrders((orderData ?? []) as ShopifyOrder[]);
    setProducts((productData ?? []) as ShopifyProduct[]);
    setLoading(false);
    loadedOnce.current = true;
  }

  useEffect(() => {
    loadedOnce.current = false;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  return { loading, connection, orders, products, reload: load };
}
