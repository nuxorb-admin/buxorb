import { createClient } from "npm:@supabase/supabase-js@2";
import { requestToken, shopifyGraphql } from "./shopify.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// read_orders solo alcanza los últimos 60 días sin el permiso especial read_all_orders.
const ORDERS_DAYS = 60;
const ORDERS_PAGE = 25;
const PRODUCTS_PAGE = 20;
const MAX_PAGES = 25;

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

type Admin = ReturnType<typeof createClient>;

async function getAccessToken(admin: Admin, connectionId: string, shop: string): Promise<string> {
  const { data: cred } = await admin.from("integration_credentials").select("*").eq("connection_id", connectionId).maybeSingle();
  if (!cred) throw new Error("La conexión no tiene credenciales guardadas. Vuelve a conectarla.");

  const vigente = cred.access_token && (!cred.token_expires_at || new Date(cred.token_expires_at).getTime() > Date.now() + 60_000);
  if (vigente) return cred.access_token as string;

  if (!cred.client_id || !cred.client_secret) {
    throw new Error("El access token venció y no hay Client ID/secret para renovarlo. Vuelve a conectar la tienda.");
  }
  const t = await requestToken(shop, cred.client_id as string, cred.client_secret as string);
  await admin
    .from("integration_credentials")
    .update({
      access_token: t.access_token,
      token_expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
    })
    .eq("connection_id", connectionId);
  return t.access_token;
}

interface OrdersData {
  orders: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: {
      id: string;
      name: string;
      createdAt: string;
      displayFinancialStatus: string | null;
      displayFulfillmentStatus: string | null;
      currentTotalPriceSet: { shopMoney: { amount: string; currencyCode: string } };
      lineItems: { nodes: { title: string; quantity: number; sku: string | null }[] };
    }[];
  };
}

interface ProductsData {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: {
      id: string;
      title: string;
      status: string | null;
      vendor: string | null;
      productType: string | null;
      featuredImage: { url: string } | null;
      variants: { nodes: { id: string; sku: string | null; title: string; price: string | null; inventoryQuantity: number | null }[] };
    }[];
  };
}

const ORDERS_QUERY = `
query($cursor: String, $q: String, $first: Int!) {
  orders(first: $first, after: $cursor, query: $q, sortKey: CREATED_AT, reverse: true) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id name createdAt displayFinancialStatus displayFulfillmentStatus
      currentTotalPriceSet { shopMoney { amount currencyCode } }
      lineItems(first: 20) { nodes { title quantity sku } }
    }
  }
}`;

const PRODUCTS_QUERY = `
query($cursor: String, $first: Int!) {
  products(first: $first, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id title status vendor productType
      featuredImage { url }
      variants(first: 25) { nodes { id sku title price inventoryQuantity } }
    }
  }
}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  let connectionId: string | null = null;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No autorizado" });

    const body = await req.json();
    connectionId = body.connection_id ?? null;
    if (!connectionId) return json({ error: "Faltan datos" });

    const { data: callerData, error: callerError } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    if (callerError || !callerData.user) return json({ error: "Sesión inválida" });

    const { data: connection } = await admin.from("integration_connections").select("*").eq("id", connectionId).maybeSingle();
    if (!connection || connection.provider !== "shopify" || !connection.shop_domain) return json({ error: "Conexión no encontrada" });

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    if (callerProfile?.kind !== "team") {
      const { data: member } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", connection.company_id)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      if (!member) return json({ error: "No tienes acceso a esta conexión" });
    }

    const shop = connection.shop_domain as string;
    const token = await getAccessToken(admin, connectionId!, shop);

    // ---- Pedidos (últimos 60 días) ----
    const since = new Date(Date.now() - ORDERS_DAYS * 86_400_000).toISOString().slice(0, 10);
    let cursor: string | null = null;
    let ordersSynced = 0;
    for (let page = 0; page < MAX_PAGES; page++) {
      const data: OrdersData = await shopifyGraphql<OrdersData>(shop, token, ORDERS_QUERY, {
        cursor,
        q: `created_at:>=${since}`,
        first: ORDERS_PAGE,
      });
      const rows = data.orders.nodes.map((o) => ({
        company_id: connection.company_id,
        connection_id: connectionId,
        shopify_id: o.id,
        name: o.name,
        created_at_shopify: o.createdAt,
        financial_status: o.displayFinancialStatus,
        fulfillment_status: o.displayFulfillmentStatus,
        total: Number(o.currentTotalPriceSet.shopMoney.amount),
        currency: o.currentTotalPriceSet.shopMoney.currencyCode,
        line_items: o.lineItems.nodes.map((li) => ({ title: li.title, quantity: li.quantity, sku: li.sku })),
      }));
      if (rows.length) {
        const { error } = await admin.from("shopify_orders").upsert(rows, { onConflict: "connection_id,shopify_id" });
        if (error) throw new Error(error.message);
        ordersSynced += rows.length;
      }
      if (!data.orders.pageInfo.hasNextPage) break;
      cursor = data.orders.pageInfo.endCursor;
    }

    // ---- Productos + inventario por variante ----
    cursor = null;
    let productsSynced = 0;
    for (let page = 0; page < MAX_PAGES; page++) {
      const data: ProductsData = await shopifyGraphql<ProductsData>(shop, token, PRODUCTS_QUERY, { cursor, first: PRODUCTS_PAGE });
      const rows = data.products.nodes.map((p) => ({
        company_id: connection.company_id,
        connection_id: connectionId,
        shopify_id: p.id,
        title: p.title,
        status: p.status,
        vendor: p.vendor,
        product_type: p.productType,
        image_url: p.featuredImage?.url ?? null,
        variants: p.variants.nodes.map((v) => ({
          id: v.id,
          sku: v.sku,
          title: v.title,
          price: v.price != null ? Number(v.price) : null,
          inventory_quantity: v.inventoryQuantity,
        })),
      }));
      if (rows.length) {
        const { error } = await admin.from("shopify_products").upsert(rows, { onConflict: "connection_id,shopify_id" });
        if (error) throw new Error(error.message);
        productsSynced += rows.length;
      }
      if (!data.products.pageInfo.hasNextPage) break;
      cursor = data.products.pageInfo.endCursor;
    }

    await admin
      .from("integration_connections")
      .update({ status: "conectado", last_error: null, last_synced_at: new Date().toISOString() })
      .eq("id", connectionId);

    return json({ ok: true, orders: ordersSynced, products: productsSynced });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (connectionId) {
      await admin.from("integration_connections").update({ status: "error", last_error: message }).eq("id", connectionId);
    }
    return json({ error: message });
  }
});
