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

    const { user_id, full_name, email, role_id } = await req.json();
    if (!user_id) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Identifica quién llama a partir de su JWT (nunca confiar en un
    // user_id enviado sin verificar que quien llama tiene permiso sobre él).
    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }
    const callerId = callerData.user.id;

    const { data: targetRow } = await admin
      .from("company_users")
      .select("company_id")
      .eq("user_id", user_id)
      .maybeSingle();
    if (!targetRow) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404, headers: corsHeaders });
    }

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerId).single();
    const isTeam = callerProfile?.kind === "team";

    let isOwnerOfCompany = false;
    if (!isTeam) {
      const { data: ownerRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", targetRow.company_id)
        .eq("user_id", callerId)
        .eq("is_owner", true)
        .maybeSingle();
      isOwnerOfCompany = !!ownerRow;
    }

    if (!isTeam && !isOwnerOfCompany) {
      return new Response(
        JSON.stringify({ error: "No tienes permiso para modificar este usuario" }),
        { status: 403, headers: corsHeaders },
      );
    }

    if (typeof email === "string" && email.length > 0) {
      const { error: emailError } = await admin.auth.admin.updateUserById(user_id, { email });
      if (emailError) {
        return new Response(JSON.stringify({ error: emailError.message }), { status: 400, headers: corsHeaders });
      }
    }

    const profileUpdate: Record<string, unknown> = {};
    if (typeof full_name === "string") profileUpdate.full_name = full_name || null;
    if (typeof email === "string" && email.length > 0) profileUpdate.email = email;
    if (Object.keys(profileUpdate).length > 0) {
      const { error: profileError } = await admin.schema("nuxorb").from("profiles").update(profileUpdate).eq("id", user_id);
      if (profileError) {
        return new Response(JSON.stringify({ error: profileError.message }), { status: 400, headers: corsHeaders });
      }
    }

    if (typeof role_id === "string") {
      const { error: roleError } = await admin
        .from("company_users")
        .update({ role_id: role_id || null })
        .eq("user_id", user_id)
        .eq("company_id", targetRow.company_id);
      if (roleError) {
        return new Response(JSON.stringify({ error: roleError.message }), { status: 400, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
