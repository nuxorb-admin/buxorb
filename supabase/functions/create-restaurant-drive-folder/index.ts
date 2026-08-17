import { createClient } from "npm:@supabase/supabase-js@2";
import { createDriveFolder } from "./googleDrive.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SHARED_DRIVE_ID = Deno.env.get("GOOGLE_DRIVE_RESTAURANTES_SHARED_DRIVE_ID")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

// Solo equipo (se llama desde CompanyDetail.tsx al activar Restaurantes).
// Idempotente: si la empresa ya tiene drive_folder_id, lo regresa sin
// crear una carpeta duplicada.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { company_id } = await req.json();
    if (!company_id) return json({ error: "Falta company_id" }, 400);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No autorizado" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) return json({ error: "Sesión inválida" }, 401);

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    if (callerProfile?.kind !== "team") return json({ error: "Solo el equipo puede hacer esto" }, 403);

    const { data: existing } = await admin.from("ldn_restaurant_settings").select("drive_folder_id").eq("company_id", company_id).maybeSingle();
    if (existing?.drive_folder_id) {
      return json({ ok: true, folder_id: existing.drive_folder_id, already_existed: true });
    }

    const { data: company } = await admin.schema("nuxorb").from("companies").select("name").eq("id", company_id).single();
    if (!company) return json({ error: "Empresa no encontrada" }, 404);

    const folderId = await createDriveFolder(company.name, SHARED_DRIVE_ID);

    const { error: upsertError } = await admin
      .from("ldn_restaurant_settings")
      .upsert({ company_id, drive_folder_id: folderId }, { onConflict: "company_id" });
    if (upsertError) return json({ error: upsertError.message }, 400);

    return json({ ok: true, folder_id: folderId });
  } catch (err) {
    console.error(err);
    return json({ error: String(err) }, 500);
  }
});
