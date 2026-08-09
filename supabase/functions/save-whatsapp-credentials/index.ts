import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// whatsapp_credentials no tiene ninguna policy de RLS para authenticated —
// a propósito, para que ni el equipo ni el cliente puedan leer el access
// token por PostgREST. Esta función es la única forma de guardarlo: valida
// que quien llama sea del equipo o miembro de la empresa dueña de la
// conexión, y escribe con la service role key (que ignora RLS).
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { connection_id, access_token, waba_id } = await req.json();
    if (!connection_id || !access_token) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }

    const { data: connection } = await admin
      .from("whatsapp_connections")
      .select("id, company_id")
      .eq("id", connection_id)
      .single();
    if (!connection) {
      return new Response(JSON.stringify({ error: "Conexión no encontrada" }), { status: 404, headers: corsHeaders });
    }

    const { data: callerProfile } = await admin
      .schema("nuxorb")
      .from("profiles")
      .select("kind")
      .eq("id", callerData.user.id)
      .single();
    let allowed = callerProfile?.kind === "team";
    if (!allowed) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", connection.company_id)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      allowed = !!memberRow;
    }
    if (!allowed) {
      return new Response(JSON.stringify({ error: "No tienes permiso sobre esta conexión" }), { status: 403, headers: corsHeaders });
    }

    const { error: upsertError } = await admin
      .from("whatsapp_credentials")
      .upsert({ connection_id, access_token, waba_id: waba_id ?? null }, { onConflict: "connection_id" });
    if (upsertError) {
      return new Response(JSON.stringify({ error: upsertError.message }), { status: 400, headers: corsHeaders });
    }

    await admin.from("whatsapp_connections").update({ status: "conectado" }).eq("id", connection_id);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
