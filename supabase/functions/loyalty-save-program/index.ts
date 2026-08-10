import { createClient } from "npm:@supabase/supabase-js@2";
import { upsertLoyaltyClass } from "./googleWallet.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Llamada por el cliente (o el equipo) desde el portal al configurar su
// tarjeta de lealtad. Hace upsert de loyalty_programs y crea/actualiza la
// "clase" en Google Wallet — eso necesita la cuenta de servicio, por eso
// no se puede hacer directo desde el frontend con el insert normal.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { company_id, name, template_key, logo_path, stamps_required, reward_text } = await req.json();
    if (!company_id || !name || !template_key || !stamps_required || !reward_text) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwtToken = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwtToken);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    let allowed = callerProfile?.kind === "team";
    if (!allowed) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", company_id)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      allowed = !!memberRow;
    }
    if (!allowed) {
      return new Response(JSON.stringify({ error: "No tienes permiso sobre esta empresa" }), { status: 403, headers: corsHeaders });
    }

    const { data: company } = await admin.schema("nuxorb").from("companies").select("name").eq("id", company_id).single();

    let logoUrl: string | null = null;
    if (logo_path) {
      const { data: publicUrlData } = admin.storage.from("loyalty-logos").getPublicUrl(logo_path);
      logoUrl = publicUrlData.publicUrl;
    }

    const { data: existingProgram } = await admin.from("loyalty_programs").select("id").eq("company_id", company_id).maybeSingle();

    const { data: program, error: upsertError } = await admin
      .from("loyalty_programs")
      .upsert(
        {
          ...(existingProgram ? { id: existingProgram.id } : {}),
          company_id,
          name,
          template_key,
          logo_path: logo_path ?? null,
          stamps_required,
          reward_text,
        },
        { onConflict: "company_id" },
      )
      .select()
      .single();
    if (upsertError || !program) {
      return new Response(JSON.stringify({ error: upsertError?.message ?? "No se pudo guardar el programa" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const classId = await upsertLoyaltyClass({
      programId: program.id,
      programName: name,
      companyName: company?.name ?? "Nuxorb",
      templateKey: template_key,
      logoUrl,
    });

    await admin.from("loyalty_programs").update({ google_class_id: classId }).eq("id", program.id);

    return new Response(JSON.stringify({ ok: true, program_id: program.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
