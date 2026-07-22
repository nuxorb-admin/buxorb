import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function randomPassword(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 16);
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

    const { company_id, email, full_name, role_id, is_owner } = await req.json();
    if (!company_id || !email) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Identifica quién llama a partir de su JWT (nunca confiar en un company_id/rol enviado sin verificar al que llama).
    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }
    const callerId = callerData.user.id;

    const { data: callerProfile } = await admin.from("profiles").select("kind").eq("id", callerId).single();
    const isTeam = callerProfile?.kind === "team";

    let isOwnerOfCompany = false;
    if (!isTeam) {
      const { data: ownerRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", company_id)
        .eq("user_id", callerId)
        .eq("is_owner", true)
        .maybeSingle();
      isOwnerOfCompany = !!ownerRow;
    }

    if (!isTeam && !isOwnerOfCompany) {
      return new Response(
        JSON.stringify({ error: "No tienes permiso para crear usuarios en esta empresa" }),
        { status: 403, headers: corsHeaders },
      );
    }

    const { data: company } = await admin.from("companies").select("max_users").eq("id", company_id).single();
    const { count } = await admin
      .from("company_users")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company_id);

    if (company && typeof count === "number" && count >= company.max_users) {
      return new Response(
        JSON.stringify({ error: "Se alcanzó el máximo de usuarios de esta empresa" }),
        { status: 400, headers: corsHeaders },
      );
    }

    const tempPassword = randomPassword();

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (createError || !created.user) {
      return new Response(
        JSON.stringify({ error: createError?.message ?? "No se pudo crear el usuario" }),
        { status: 400, headers: corsHeaders },
      );
    }

    const newUserId = created.user.id;

    // El trigger on_auth_user_created ya creó su profile con kind='team' por default — se corrige a 'client'.
    await admin.from("profiles").update({ kind: "client", full_name }).eq("id", newUserId);

    const { error: linkError } = await admin.from("company_users").insert({
      company_id,
      user_id: newUserId,
      role_id: role_id ?? null,
      is_owner: !!is_owner,
    });

    if (linkError) {
      return new Response(JSON.stringify({ error: linkError.message }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ email, tempPassword }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
