import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const N8N_CALLBACK_SECRET = Deno.env.get("N8N_CALLBACK_SECRET");
const YCLOUD_API_KEY = Deno.env.get("YCLOUD_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-n8n-secret",
};

// Dos formas válidas de llamar esta función:
// 1. Un usuario logueado del portal (humano toma la conversación y contesta
//    a mano) — se valida con su JWT + que sea miembro de la empresa dueña.
// 2. n8n, después de que el agente decide qué responder — se valida con un
//    secreto compartido (header x-n8n-secret), no tiene sesión de usuario.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { conversation_id, text } = await req.json();
    if (!conversation_id || !text) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const n8nSecret = req.headers.get("x-n8n-secret");
    const isN8n = !!N8N_CALLBACK_SECRET && n8nSecret === N8N_CALLBACK_SECRET;

    if (!isN8n) {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
      }
      const jwt = authHeader.replace("Bearer ", "");
      const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
      if (callerError || !callerData.user) {
        return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
      }

      const { data: conv } = await admin
        .from("whatsapp_conversations")
        .select("id, whatsapp_connections!inner(company_id)")
        .eq("id", conversation_id)
        .single();
      const companyId = (conv as unknown as { whatsapp_connections: { company_id: string } } | null)?.whatsapp_connections
        ?.company_id;
      if (!companyId) {
        return new Response(JSON.stringify({ error: "Conversación no encontrada" }), { status: 404, headers: corsHeaders });
      }

      const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
      let allowed = callerProfile?.kind === "team";
      if (!allowed) {
        const { data: memberRow } = await admin
          .from("company_users")
          .select("id")
          .eq("company_id", companyId)
          .eq("user_id", callerData.user.id)
          .maybeSingle();
        allowed = !!memberRow;
      }
      if (!allowed) {
        return new Response(JSON.stringify({ error: "No tienes permiso sobre esta conversación" }), { status: 403, headers: corsHeaders });
      }
    }

    const { data: conversation } = await admin
      .from("whatsapp_conversations")
      .select("id, connection_id, contact_id, whatsapp_contacts(phone)")
      .eq("id", conversation_id)
      .single();
    if (!conversation) {
      return new Response(JSON.stringify({ error: "Conversación no encontrada" }), { status: 404, headers: corsHeaders });
    }
    const toPhone = (conversation as unknown as { whatsapp_contacts: { phone: string } }).whatsapp_contacts?.phone;

    const { data: connection } = await admin
      .from("whatsapp_connections")
      .select("id, whatsapp_number")
      .eq("id", conversation.connection_id)
      .single();

    if (!connection?.whatsapp_number || !toPhone) {
      return new Response(JSON.stringify({ error: "Conexión de WhatsApp incompleta" }), { status: 400, headers: corsHeaders });
    }

    // Todos los clientes usan la misma cuenta de YCloud de Nuxorb — un solo
    // API key para todos, el número de origen (from) es lo que distingue
    // de qué empresa se manda el mensaje.
    const ycloudRes = await fetch("https://api.ycloud.com/v2/whatsapp/messages/sendDirectly", {
      method: "POST",
      headers: {
        "X-API-Key": YCLOUD_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: connection.whatsapp_number,
        to: toPhone,
        type: "text",
        text: { body: text },
      }),
    });
    const ycloudData = await ycloudRes.json();
    // sendDirectly regresa HTTP 200 incluso cuando WhatsApp rechazó el
    // mensaje — el resultado real viene en el campo status/errorMessage.
    if (!ycloudRes.ok || ycloudData?.status === "failed") {
      return new Response(
        JSON.stringify({ error: ycloudData?.errorMessage ?? ycloudData?.whatsappApiError?.message ?? "Error al enviar el mensaje" }),
        { status: 400, headers: corsHeaders },
      );
    }

    await admin.from("whatsapp_messages").insert({
      conversation_id,
      direction: "out",
      text,
      external_id: ycloudData?.wamid ?? ycloudData?.id ?? null,
    });
    await admin.from("whatsapp_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conversation_id);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
