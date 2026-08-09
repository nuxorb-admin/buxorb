import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const YCLOUD_WEBHOOK_SECRET = Deno.env.get("YCLOUD_WEBHOOK_SECRET")!;
const N8N_WEBHOOK_URL = Deno.env.get("N8N_WEBHOOK_URL");

// Un solo flujo de n8n compartido por todos los clientes (decisión de
// producto, ver docs/agentes-ia-rollback.md): el prompt y el contexto de
// la empresa viajan como datos en el payload, no como flujos de n8n
// distintos por cliente.
//
// Todos los clientes usan la misma cuenta de YCloud de Nuxorb — un solo
// webhook para todos los números, se distingue el cliente por
// whatsapp_number (el campo "to" del evento).

interface YCloudInboundEvent {
  id: string;
  type: string;
  whatsappInboundMessage?: {
    id: string;
    wamid: string;
    wabaId: string;
    from: string;
    customerProfile?: { name?: string };
    to: string;
    sendTime: string;
    type: string;
    text?: { body: string };
  };
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verifySignature(rawBody: string, header: string | null): Promise<boolean> {
  if (!header) return false;
  const match = /t=(\d+),s=([a-f0-9]+)/.exec(header);
  if (!match) return false;
  const [, timestamp, signature] = match;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(YCLOUD_WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const computed = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return timingSafeEqual(computed, signature);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await req.text();

  // Verifica que el request sí venga de YCloud antes de procesar nada —
  // a diferencia de Meta, YCloud no hace un handshake al configurar el
  // webhook, firma cada request con HMAC-SHA256 en su lugar.
  const valid = await verifySignature(rawBody, req.headers.get("YCloud-Signature"));
  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody) as YCloudInboundEvent;
    const msg = event.whatsappInboundMessage;
    if (event.type !== "whatsapp.inbound_message.received" || !msg) {
      return new Response("EVENT_RECEIVED", { status: 200 });
    }
    if (msg.type !== "text" || !msg.text?.body) {
      // v1 solo soporta mensajes de texto — se ignora cualquier otro tipo.
      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: connection } = await admin
      .from("whatsapp_connections")
      .select("id, company_id, agent_id")
      .eq("whatsapp_number", msg.to)
      .maybeSingle();
    if (!connection) return new Response("EVENT_RECEIVED", { status: 200 }); // número no reconocido

    const { data: contact } = await admin
      .from("whatsapp_contacts")
      .upsert(
        { company_id: connection.company_id, phone: msg.from, name: msg.customerProfile?.name ?? null },
        { onConflict: "company_id,phone" },
      )
      .select()
      .single();
    if (!contact) return new Response("EVENT_RECEIVED", { status: 200 });

    let { data: conversation } = await admin
      .from("whatsapp_conversations")
      .select("id, mode")
      .eq("connection_id", connection.id)
      .eq("contact_id", contact.id)
      .maybeSingle();

    if (!conversation) {
      const { data: created } = await admin
        .from("whatsapp_conversations")
        .insert({ connection_id: connection.id, contact_id: contact.id, mode: "bot" })
        .select()
        .single();
      conversation = created;
    }
    if (!conversation) return new Response("EVENT_RECEIVED", { status: 200 });

    await admin.from("whatsapp_messages").insert({
      conversation_id: conversation.id,
      direction: "in",
      text: msg.text.body,
      external_id: msg.wamid,
    });
    await admin.from("whatsapp_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conversation.id);

    if (conversation.mode === "bot" && N8N_WEBHOOK_URL) {
      let systemPrompt: string | null = null;
      if (connection.agent_id) {
        const { data: agent } = await admin.from("ai_agents").select("system_prompt").eq("id", connection.agent_id).single();
        systemPrompt = agent?.system_prompt ?? null;
      }
      // No se espera la respuesta de n8n aquí — n8n procesa y contesta
      // por su cuenta llamando a send-whatsapp-message.
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "message.received",
          organization_id: connection.company_id,
          whatsapp_connection_id: connection.id,
          agent_id: connection.agent_id,
          system_prompt: systemPrompt,
          conversation_id: conversation.id,
          contact: { id: contact.id, name: contact.name, phone: contact.phone },
          message: { id: msg.id, text: msg.text.body, type: msg.type, timestamp: msg.sendTime },
        }),
      }).catch(() => {});
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error(err);
    // Siempre 200 una vez que la firma ya se validó — si algo interno
    // falla y contestamos error, YCloud reintenta el mismo evento.
    return new Response("EVENT_RECEIVED", { status: 200 });
  }
});
