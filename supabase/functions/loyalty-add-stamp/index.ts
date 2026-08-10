import { createClient } from "npm:@supabase/supabase-js@2";
import { patchLoyaltyObjectStamps } from "./googleWallet.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Llamada por el negocio (equipo o dueño/staff logueado en el portal)
// desde la pestaña "Miembros" al darle "+1 sello" a un cliente. Al llegar
// al total de sellos requeridos se reinicia a 0 — el negocio ya entregó el
// premio. Actualiza también la tarjeta en Google Wallet vía PATCH, que es
// lo que necesita la cuenta de servicio (no se puede hacer directo desde
// el frontend).
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { member_id } = await req.json();
    if (!member_id) {
      return new Response(JSON.stringify({ error: "Falta member_id" }), { status: 400, headers: corsHeaders });
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

    const { data: member } = await admin
      .from("loyalty_members")
      .select("id, stamps, google_object_id, program:loyalty_programs(id, company_id, stamps_required)")
      .eq("id", member_id)
      .single();
    const program = (member as unknown as { program: { id: string; company_id: string; stamps_required: number } } | null)?.program;
    if (!member || !program) {
      return new Response(JSON.stringify({ error: "Cliente no encontrado" }), { status: 404, headers: corsHeaders });
    }

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    let allowed = callerProfile?.kind === "team";
    if (!allowed) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", program.company_id)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      allowed = !!memberRow;
    }
    if (!allowed) {
      return new Response(JSON.stringify({ error: "No tienes permiso sobre este cliente" }), { status: 403, headers: corsHeaders });
    }

    const nextStamps = member.stamps + 1 >= program.stamps_required ? 0 : member.stamps + 1;

    const { error: updateError } = await admin.from("loyalty_members").update({ stamps: nextStamps }).eq("id", member_id);
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 400, headers: corsHeaders });
    }

    if (member.google_object_id) {
      await patchLoyaltyObjectStamps(member.google_object_id, nextStamps, program.stamps_required);
    }

    return new Response(JSON.stringify({ ok: true, stamps: nextStamps }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
