import { createClient } from "npm:@supabase/supabase-js@2";
import { normalizeDomain, requestToken, shopifyGraphql } from "./shopify.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No autorizado" });

    const { company_id, shop_domain, client_id, client_secret, access_token } = await req.json();
    if (!company_id || !shop_domain) return json({ error: "Faltan datos" });

    const usesClientCredentials = !!client_id && !!client_secret;
    if (!usesClientCredentials && !access_token) {
      return json({ error: "Captura Client ID y Client secret (o un access token)." });
    }

    const shop = normalizeDomain(String(shop_domain));
    if (!shop) return json({ error: "El dominio debe tener la forma tutienda.myshopify.com" });

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

    const { data: callerData, error: callerError } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    if (callerError || !callerData.user) return json({ error: "Sesión inválida" });
    const callerId = callerData.user.id;

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerId).single();
    const isTeam = callerProfile?.kind === "team";
    if (!isTeam) {
      const { data: ownerRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", company_id)
        .eq("user_id", callerId)
        .eq("is_owner", true)
        .maybeSingle();
      if (!ownerRow) return json({ error: "Solo el owner de la empresa puede administrar conexiones" });
    }

    const { data: addonRow } = await admin
      .schema("nuxorb")
      .from("company_addons")
      .select("id")
      .eq("company_id", company_id)
      .eq("addon", "shopify")
      .eq("active", true)
      .maybeSingle();
    if (!addonRow) return json({ error: "Esta empresa no tiene activa la Conexión Shopify" });

    let token: string;
    let expiresAt: string | null = null;
    if (usesClientCredentials) {
      const t = await requestToken(shop, String(client_id), String(client_secret));
      token = t.access_token;
      expiresAt = t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null;
    } else {
      token = String(access_token);
    }

    const shopInfo = await shopifyGraphql<{ shop: { name: string } }>(shop, token, "{ shop { name } }");

    const { data: connection, error: connError } = await admin
      .from("integration_connections")
      .upsert(
        { company_id, provider: "shopify", display_name: shopInfo.shop.name, shop_domain: shop, status: "conectado", last_error: null },
        { onConflict: "company_id,provider" },
      )
      .select("id")
      .single();
    if (connError || !connection) return json({ error: connError?.message ?? "No se pudo guardar la conexión" });

    const { error: credError } = await admin.from("integration_credentials").upsert(
      {
        connection_id: connection.id,
        client_id: usesClientCredentials ? String(client_id) : null,
        client_secret: usesClientCredentials ? String(client_secret) : null,
        access_token: token,
        token_expires_at: expiresAt,
      },
      { onConflict: "connection_id" },
    );
    if (credError) return json({ error: credError.message });

    return json({ ok: true, connection_id: connection.id, shop_name: shopInfo.shop.name });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) });
  }
});
