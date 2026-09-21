// Copia idéntica en shopify-sync/shopify.ts — cada Edge Function se despliega
// aislada, no comparten módulos (mismo criterio que googleWallet.ts de Lealtad).
// Subir la versión cuando Shopify retire la actual (cada versión dura ~12 meses).
export const SHOPIFY_API_VERSION = "2026-04";

const DOMAIN_RE = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/;

export function normalizeDomain(raw: string): string | null {
  const cleaned = raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return DOMAIN_RE.test(cleaned) ? cleaned : null;
}

export interface ShopifyToken {
  access_token: string;
  expires_in: number | null;
}

export async function requestToken(shop: string, clientId: string, clientSecret: string): Promise<ShopifyToken> {
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, grant_type: "client_credentials" }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.access_token) {
    const detail = body?.error_description ?? body?.error ?? `HTTP ${res.status}`;
    throw new Error(`Shopify rechazó las credenciales (${detail}). Revisa dominio, Client ID, Client secret y que la app esté instalada en la tienda.`);
  }
  return { access_token: body.access_token, expires_in: typeof body.expires_in === "number" ? body.expires_in : null };
}

export async function shopifyGraphql<T>(shop: string, token: string, query: string, variables: Record<string, unknown> = {}): Promise<T> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
      body: JSON.stringify({ query, variables }),
    });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      continue;
    }
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(`Shopify respondió HTTP ${res.status}`);
    const throttled = body?.errors?.some((e: { extensions?: { code?: string } }) => e.extensions?.code === "THROTTLED");
    if (throttled) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      continue;
    }
    if (body?.errors?.length) throw new Error(`Shopify: ${body.errors[0].message}`);
    return body.data as T;
  }
  throw new Error("Shopify limitó las solicitudes (demasiadas seguidas). Intenta de nuevo en un minuto.");
}
