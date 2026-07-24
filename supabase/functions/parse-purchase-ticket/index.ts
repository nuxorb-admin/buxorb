import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Los límites de tickets/mes viven también en el frontend
// (src/product/pages/compras/limits.ts) — se repiten aquí para poder
// rechazar server-side sin depender de que el cliente los respete.
const MAX_TICKETS_POR_MES = { essential: 10, professional: 40 } as const;

const RECORD_TICKET_TOOL = {
  name: "record_ticket",
  description: "Registra los datos extraídos del ticket de compra.",
  input_schema: {
    type: "object",
    properties: {
      comercio: { type: "string" },
      fecha: { type: "string", description: "YYYY-MM-DD" },
      subtotal: { type: "number" },
      iva: { type: "number" },
      total: { type: "number" },
    },
    required: ["comercio", "fecha", "subtotal", "iva", "total"],
  },
};

function currentPeriod(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
    }

    const { company_id, file_base64, media_type } = await req.json();
    if (!company_id || !file_base64) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }
    const callerId = callerData.user.id;

    const { data: callerProfile } = await admin.from("profiles").select("kind").eq("id", callerId).single();
    const isTeam = callerProfile?.kind === "team";

    let isCompanyMember = false;
    if (!isTeam) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", company_id)
        .eq("user_id", callerId)
        .maybeSingle();
      isCompanyMember = !!memberRow;
    }

    if (!isTeam && !isCompanyMember) {
      return new Response(JSON.stringify({ error: "No tienes acceso a esta empresa" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    // Lectura de tickets con IA es Essential y Professional (con distinto
    // límite mensual) — no se rechaza por nivel, pero sí se valida la cuota.
    const { data: moduleRow } = await admin
      .from("company_modules")
      .select("tier")
      .eq("company_id", company_id)
      .eq("module", "compras_proveedores")
      .maybeSingle();

    const tier = moduleRow?.tier === "essential" ? "essential" : "professional";
    const limite = MAX_TICKETS_POR_MES[tier];

    const { data: usoRow } = await admin
      .from("uso_lectura_tickets")
      .select("veces_usado")
      .eq("company_id", company_id)
      .eq("periodo", currentPeriod())
      .maybeSingle();

    if ((usoRow?.veces_usado ?? 0) >= limite) {
      return new Response(
        JSON.stringify({ error: `Se alcanzó el límite de lecturas de ticket de este mes (${limite})` }),
        { status: 400, headers: corsHeaders },
      );
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        tools: [RECORD_TICKET_TOOL],
        tool_choice: { type: "tool", name: "record_ticket" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: media_type || "image/jpeg", data: file_base64 },
              },
              {
                type: "text",
                text: "Extrae del ticket: comercio, fecha, subtotal, IVA y total. Si el ticket no desglosa IVA, calcúlalo como total - subtotal.",
              },
            ],
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const text = await anthropicRes.text();
      return new Response(JSON.stringify({ error: `No se pudo leer el ticket: ${text}` }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    const anthropicData = await anthropicRes.json();
    const toolUse = anthropicData.content?.find((c: { type: string }) => c.type === "tool_use");
    const result = toolUse?.input ?? null;

    if (!result) {
      return new Response(JSON.stringify({ error: "No se pudo extraer información del ticket" }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
