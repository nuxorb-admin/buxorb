import { supabase } from "../../../lib/supabase";

// Las Edge Functions de Shopify devuelven los errores de negocio como
// { error } con HTTP 200 para que el mensaje llegue tal cual a la pantalla.
export async function syncShopifyConnection(connectionId: string): Promise<string | null> {
  const { data, error } = await supabase.functions.invoke("shopify-sync", { body: { connection_id: connectionId } });
  if (error) return error.message;
  return data?.error ?? null;
}

export async function connectShopify(form: {
  company_id: string;
  shop_domain: string;
  client_id: string;
  client_secret: string;
}): Promise<{ connectionId: string | null; error: string | null }> {
  const { data, error } = await supabase.functions.invoke("shopify-connect", { body: form });
  if (error) return { connectionId: null, error: error.message };
  if (data?.error) return { connectionId: null, error: data.error };
  return { connectionId: data.connection_id as string, error: null };
}
