import { createClient } from "npm:@supabase/supabase-js@2";
import { deleteDriveFile, uploadDriveFile } from "./googleDrive.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MAX_BYTES = 8 * 1024 * 1024;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

// Sube la foto de un platillo a la carpeta de Drive de la empresa (creada
// por create-restaurant-drive-folder al activar Restaurantes) y actualiza
// ldn_restaurant_menu_items.foto_url. Equipo o miembro de la empresa dueña
// del platillo.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No autorizado" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) return json({ error: "Sesión inválida" }, 401);

    const form = await req.formData();
    const companyId = form.get("company_id")?.toString();
    const menuItemId = form.get("menu_item_id")?.toString();
    const file = form.get("file");
    if (!companyId || !menuItemId || !(file instanceof File)) return json({ error: "Faltan datos" }, 400);
    if (file.size > MAX_BYTES) return json({ error: "La imagen no puede pesar más de 8 MB" }, 400);

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    let allowed = callerProfile?.kind === "team";
    if (!allowed) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", companyId)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      allowed = !!memberRow;
    }
    if (!allowed) return json({ error: "No tienes permiso sobre esta empresa" }, 403);

    const { data: settings } = await admin.from("ldn_restaurant_settings").select("drive_folder_id").eq("company_id", companyId).maybeSingle();
    if (!settings?.drive_folder_id) {
      return json({ error: "Esta empresa todavía no tiene carpeta de Drive — activa Restaurantes de nuevo o avisa a Nuxorb" }, 400);
    }

    const { data: existingItem } = await admin.from("ldn_restaurant_menu_items").select("foto_url").eq("id", menuItemId).maybeSingle();
    const existingFileId = existingItem?.foto_url?.match(/[?&]id=([^&]+)/)?.[1] ?? null;

    const bytes = new Uint8Array(await file.arrayBuffer());
    const mimeType = file.type || "image/jpeg";
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";

    // Siempre se sube un archivo nuevo (miniatura de Drive nunca cacheada,
    // porque el id es nuevo) y se borra el anterior si había — así no se
    // acumula basura en la carpeta sin depender de que Drive refresque la
    // miniatura de un archivo reemplazado en el mismo id (eso tarda y no
    // se puede forzar).
    const { fileId, url: baseUrl } = await uploadDriveFile({
      folderId: settings.drive_folder_id,
      filename: `${menuItemId}.${ext}`,
      mimeType,
      bytes,
    });
    const url = `${baseUrl}&v=${Date.now()}`;

    if (existingFileId && existingFileId !== fileId) {
      try {
        await deleteDriveFile(existingFileId);
      } catch (err) {
        console.error("No se pudo borrar la foto anterior en Drive:", err);
      }
    }

    const { error: updateError } = await admin.from("ldn_restaurant_menu_items").update({ foto_url: url }).eq("id", menuItemId);
    if (updateError) return json({ error: updateError.message }, 400);

    return json({ ok: true, foto_url: url });
  } catch (err) {
    console.error(err);
    return json({ error: String(err) }, 500);
  }
});
