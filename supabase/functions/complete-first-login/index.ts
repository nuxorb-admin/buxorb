import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Igual que create-company-user: identifica a quién llama por su JWT,
    // nunca por un id mandado en el body — esta función solo puede tocar
    // la cuenta de quien la invoca.
    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }
    const callerId = callerData.user.id;

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("needs_setup").eq("id", callerId).single();
    if (!callerProfile?.needs_setup) {
      return new Response(
        JSON.stringify({ error: "Esta cuenta ya completó su registro" }),
        { status: 403, headers: corsHeaders },
      );
    }

    // email_confirm:true aplica el cambio de correo de inmediato — sin
    // esto Supabase manda un link de confirmación al correo nuevo y el
    // cambio no se aplica hasta que se confirme, y este proyecto no tiene
    // envío de correo configurado todavía.
    const { error: updateError } = await admin.auth.admin.updateUserById(callerId, {
      email,
      password,
      email_confirm: true,
    });

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 400, headers: corsHeaders });
    }

    await admin.schema("nuxorb").from("profiles").update({ email, needs_setup: false }).eq("id", callerId);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
