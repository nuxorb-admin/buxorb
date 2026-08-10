import { createClient } from "npm:@supabase/supabase-js@2";
import { ensureLoyaltyObject, buildSaveLink } from "./googleWallet.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Pública, sin sesión de Supabase — la llama cualquiera que escanee el QR
// de la tarjeta de lealtad de un negocio y llene el formulario. Por eso
// usa la service role key directo, no valida ningún JWT (mismo patrón que
// whatsapp-webhook, que tampoco depende de auth de Supabase).
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { program_id, name, email, phone } = await req.json();
    if (!program_id || !name?.trim() || !phone?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: program } = await admin
      .from("loyalty_programs")
      .select("id, stamps_required, google_class_id, active")
      .eq("id", program_id)
      .maybeSingle();
    if (!program || !program.active || !program.google_class_id) {
      return new Response(JSON.stringify({ error: "Programa de lealtad no disponible" }), { status: 404, headers: corsHeaders });
    }

    const { data: member, error: upsertError } = await admin
      .from("loyalty_members")
      .upsert(
        { program_id, name: name.trim(), email: email?.trim() || null, phone: phone.trim() },
        { onConflict: "program_id,phone", ignoreDuplicates: false },
      )
      .select()
      .single();
    if (upsertError || !member) {
      return new Response(JSON.stringify({ error: upsertError?.message ?? "No se pudo registrar" }), { status: 400, headers: corsHeaders });
    }

    const objectId = await ensureLoyaltyObject({
      memberId: member.id,
      classId: program.google_class_id,
      name: member.name,
      stamps: member.stamps,
      stampsRequired: program.stamps_required,
    });

    if (!member.google_object_id) {
      await admin.from("loyalty_members").update({ google_object_id: objectId }).eq("id", member.id);
    }

    const saveUrl = buildSaveLink(objectId);

    return new Response(JSON.stringify({ ok: true, save_url: saveUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
