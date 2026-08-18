import { createClient } from "npm:@supabase/supabase-js@2";
import { deleteDriveFile } from "./googleDrive.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

type SupabaseAdmin = ReturnType<typeof createClient>;

async function listAllStorageFiles(admin: SupabaseAdmin, bucket: string, prefix: string): Promise<string[]> {
  const { data: entries } = await admin.storage.from(bucket).list(prefix, { limit: 1000 });
  if (!entries || entries.length === 0) return [];
  const paths: string[] = [];
  for (const entry of entries) {
    const fullPath = `${prefix}/${entry.name}`;
    if (entry.id === null) {
      // Sin id = "carpeta" (Storage no tiene carpetas reales, solo prefijos) — recursar.
      paths.push(...(await listAllStorageFiles(admin, bucket, fullPath)));
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

async function wipeStorageBucket(admin: SupabaseAdmin, bucket: string, companyId: string) {
  try {
    const paths = await listAllStorageFiles(admin, bucket, companyId);
    if (paths.length > 0) await admin.storage.from(bucket).remove(paths);
  } catch (err) {
    console.error(`No se pudo limpiar el bucket ${bucket} para ${companyId}:`, err);
  }
}

// Wipe completo de una empresa — todo lo que las cascadas de Postgres NO
// alcanzan: archivos en Storage (hr-employee-documents, loyalty-logos), la
// carpeta de Google Drive de Restaurantes (si tiene), las cuentas de Auth
// de sus usuarios (company_users solo desvincula al borrar la empresa por
// cascada normal, no borra la cuenta de auth.users real), y contacts/
// leads/tasks (que por diseño tienen company_id "on delete set null" —
// sobreviven sin empresa en un borrado normal; aquí sí se eliminan a
// propósito, para que "eliminar empresa" sea un wipe de verdad). Solo
// equipo. Cada paso de limpieza externa (Storage/Drive/Auth) es best
// effort — un error ahí no debe bloquear que la empresa se borre.
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
    if (callerProfile?.kind !== "team") return json({ error: "Solo el equipo puede eliminar empresas" }, 403);

    const { data: company } = await admin.schema("nuxorb").from("companies").select("id, name").eq("id", company_id).maybeSingle();
    if (!company) return json({ error: "Empresa no encontrada" }, 404);

    // 1) Archivos en Storage.
    await wipeStorageBucket(admin, "hr-employee-documents", company_id);
    await wipeStorageBucket(admin, "loyalty-logos", company_id);

    // 2) Carpeta de Google Drive de Restaurantes, si la tiene — borrarla
    // se lleva también todas las fotos de platillo que contiene.
    const { data: driveSettings } = await admin
      .from("ldn_restaurant_settings")
      .select("drive_folder_id")
      .eq("company_id", company_id)
      .maybeSingle();
    if (driveSettings?.drive_folder_id) {
      try {
        await deleteDriveFile(driveSettings.drive_folder_id);
      } catch (err) {
        console.error("No se pudo borrar la carpeta de Drive:", err);
      }
    }

    // 3) Cuentas de Auth de los usuarios de esta empresa — solo si no
    // pertenecen también a otra empresa (no debería pasar por diseño, pero
    // por seguridad nunca se borra una cuenta compartida entre empresas).
    const { data: companyUsers } = await admin.from("company_users").select("user_id").eq("company_id", company_id);
    for (const cu of companyUsers ?? []) {
      const { count } = await admin
        .from("company_users")
        .select("id", { count: "exact", head: true })
        .eq("user_id", cu.user_id)
        .neq("company_id", company_id);
      if (!count) {
        try {
          await admin.auth.admin.deleteUser(cu.user_id);
        } catch (err) {
          console.error(`No se pudo borrar el usuario ${cu.user_id}:`, err);
        }
      }
    }

    // 4) contacts/leads/tasks — se borran explícito (ver comentario arriba).
    await admin.schema("nuxorb").from("tasks").delete().eq("company_id", company_id);
    await admin.schema("nuxorb").from("leads").delete().eq("company_id", company_id);
    await admin.schema("nuxorb").from("contacts").delete().eq("company_id", company_id);

    // 5) La empresa — cascada el resto (company_modules/addons,
    // ldn_company_business_lines, treasury_*, procurement_*, hr_*, sales_*,
    // ai_agents/whatsapp_*, loyalty_*, ldn_restaurant_*, company_users/roles).
    const { error: deleteError } = await admin.schema("nuxorb").from("companies").delete().eq("id", company_id);
    if (deleteError) return json({ error: deleteError.message }, 400);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: String(err) }, 500);
  }
});
