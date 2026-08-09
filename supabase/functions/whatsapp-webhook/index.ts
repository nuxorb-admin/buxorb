import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN")!;
const N8N_WEBHOOK_URL = Deno.env.get("N8N_WEBHOOK_URL");

// Un solo flujo de n8n compartido por todos los clientes (decisión de
// producto, ver docs/agentes-ia-rollback.md / plan de la sesión): el
// prompt y el contexto de la empresa viajan como datos en el payload, no
// como flujos de n8n distintos por cliente.

interface WhatsAppWebhookMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppWebhookContact {
  profile?: { name?: string };
  wa_id: string;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Handshake de verificación de Meta al dar de alta el webhook.
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        const phoneNumberId: string | undefined = value?.metadata?.phone_number_id;
        const messages: WhatsAppWebhookMessage[] = value?.messages ?? [];
        const contacts: WhatsAppWebhookContact[] = value?.contacts ?? [];
        if (!phoneNumberId || messages.length === 0) continue;

        const { data: connection } = await admin
          .from("whatsapp_connections")
          .select("id, company_id, agent_id")
          .eq("phone_number_id", phoneNumberId)
          .maybeSingle();
        if (!connection) continue; // número no reconocido — se ignora, no se guarda nada suelto

        for (const message of messages) {
          const contactInfo = contacts.find((c) => c.wa_id === message.from);

          const { data: contact } = await admin
            .from("whatsapp_contacts")
            .upsert(
              { company_id: connection.company_id, phone: message.from, name: contactInfo?.profile?.name ?? null },
              { onConflict: "company_id,phone" },
            )
            .select()
            .single();
          if (!contact) continue;

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
          if (!conversation) continue;

          await admin.from("whatsapp_messages").insert({
            conversation_id: conversation.id,
            direction: "in",
            text: message.text?.body ?? null,
            external_id: message.id,
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
                message: { id: message.id, text: message.text?.body ?? null, type: message.type, timestamp: message.timestamp },
              }),
            }).catch(() => {});
          }
        }
      }
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error(err);
    // Siempre 200 hacia Meta aunque algo falle adentro — si contestamos
    // error, Meta reintenta el mismo evento en bucle.
    return new Response("EVENT_RECEIVED", { status: 200 });
  }
});
