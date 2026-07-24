import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECORD_TRANSACTIONS_TOOL = {
  name: "record_transactions",
  description: "Registra las transacciones bancarias encontradas en el estado de cuenta.",
  input_schema: {
    type: "object",
    properties: {
      transactions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            date: { type: "string", description: "Fecha en formato YYYY-MM-DD" },
            concept: { type: "string", description: "Descripción o concepto del movimiento" },
            amount: { type: "number", description: "Monto absoluto, siempre positivo" },
            type: { type: "string", enum: ["ingreso", "egreso"] },
          },
          required: ["date", "concept", "amount", "type"],
        },
      },
    },
    required: ["transactions"],
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
    }

    const { company_id, file_base64, file_name } = await req.json();
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

    // La lectura por IA es exclusiva del nivel Professional — se valida
    // aquí también (no solo en la UI) como defensa adicional.
    const { data: moduleRow } = await admin
      .from("company_modules")
      .select("tier")
      .eq("company_id", company_id)
      .eq("module", "tesoreria")
      .maybeSingle();

    if (moduleRow?.tier !== "professional" && moduleRow?.tier !== "enterprise") {
      return new Response(
        JSON.stringify({ error: "La lectura por IA solo está disponible en el nivel Professional" }),
        { status: 403, headers: corsHeaders },
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
        max_tokens: 4096,
        tools: [RECORD_TRANSACTIONS_TOOL],
        tool_choice: { type: "tool", name: "record_transactions" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "base64", media_type: "application/pdf", data: file_base64 },
              },
              {
                type: "text",
                text: `Extrae todas las transacciones de este estado de cuenta bancario (${file_name ?? "archivo"}). Para cada una da la fecha, el concepto, el monto (siempre positivo) y si fue un ingreso o un egreso desde la perspectiva del titular de la cuenta.`,
              },
            ],
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const text = await anthropicRes.text();
      return new Response(JSON.stringify({ error: `No se pudo leer el archivo: ${text}` }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    const anthropicData = await anthropicRes.json();
    const toolUse = anthropicData.content?.find((c: { type: string }) => c.type === "tool_use");
    const transactions = toolUse?.input?.transactions ?? [];

    return new Response(JSON.stringify({ transactions }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
