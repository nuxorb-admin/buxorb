// Copia idéntica en create-restaurant-drive-folder/upload-menu-item-photo —
// duplicado a propósito (no en supabase/functions/_shared/) porque el
// bundler de Supabase no siempre resuelve imports fuera de la carpeta de
// la función al desplegar (mismo motivo que googleWallet.ts en
// loyalty-*). Si se edita, replicar el cambio en la otra copia.
//
// Reusa la MISMA cuenta de servicio de Google Wallet (GOOGLE_WALLET_*)
// para hablar con la API de Drive — un service account puede pedir un
// JWT con distinto "scope" según para qué llamada es, no hay que crear
// una cuenta nueva. El nombre del secreto quedó de cuando solo existía
// Wallet; sigue siendo la cuenta correcta.
//
// Firma los JWT a mano con Web Crypto (crypto.subtle) — mismo mecanismo
// que googleWallet.ts, la única forma que funcionó de manera confiable
// bajo la capa de compatibilidad de Node de Deno (ver ese archivo).

const SERVICE_ACCOUNT_EMAIL = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL")!;

function base64urlFromBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlFromString(str: string): string {
  return base64urlFromBytes(new TextEncoder().encode(str));
}

function pemToDer(pem: string): ArrayBuffer {
  const base64Body = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(base64Body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

let cachedKey: CryptoKey | null = null;
async function getPrivateKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const rawB64 = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY_B64")!.replace(/\s+/g, "");
  const raw = atob(rawB64);
  cachedKey = await crypto.subtle.importKey("pkcs8", pemToDer(raw), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return cachedKey;
}

async function signJwt(header: Record<string, unknown>, payload: Record<string, unknown>): Promise<string> {
  const signingInput = `${base64urlFromString(JSON.stringify(header))}.${base64urlFromString(JSON.stringify(payload))}`;
  const key = await getPrivateKey();
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${base64urlFromBytes(new Uint8Array(signature))}`;
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const assertion = await signJwt(
    { alg: "RS256", typ: "JWT" },
    {
      iss: SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/drive",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    },
  );
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google OAuth error: ${JSON.stringify(data)}`);
  return data.access_token;
}

// Carpeta "principal" del cliente dentro del Shared Drive "Restaurantes" —
// una por empresa, nombrada con el nombre de la empresa.
export async function createDriveFolder(name: string, parentSharedDriveId: string): Promise<string> {
  const token = await getAccessToken();
  const res = await fetch("https://www.googleapis.com/drive/v3/files?supportsAllDrives=true", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name, mimeType: "application/vnd.google-apps.folder", parents: [parentSharedDriveId] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google Drive error: ${JSON.stringify(data)}`);
  return data.id;
}

// Sube un archivo a una carpeta de Drive y lo deja visible por link
// (necesario para poder usarlo como <img src>, ya que el navegador no
// manda ningún header de autenticación al pedir la imagen).
export async function uploadDriveFile(params: {
  folderId: string;
  filename: string;
  mimeType: string;
  bytes: Uint8Array;
}): Promise<{ fileId: string; url: string }> {
  const token = await getAccessToken();
  const boundary = `nuxorb_${crypto.randomUUID()}`;
  const metadata = JSON.stringify({ name: params.filename, parents: [params.folderId] });
  const encoder = new TextEncoder();
  const preamble = encoder.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${params.mimeType}\r\n\r\n`,
  );
  const closing = encoder.encode(`\r\n--${boundary}--`);
  const body = new Uint8Array(preamble.length + params.bytes.length + closing.length);
  body.set(preamble, 0);
  body.set(params.bytes, preamble.length);
  body.set(closing, preamble.length + params.bytes.length);

  const uploadRes = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  const uploadData = await uploadRes.json();
  if (!uploadRes.ok) throw new Error(`Google Drive upload error: ${JSON.stringify(uploadData)}`);
  const fileId = uploadData.id as string;

  const permRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions?supportsAllDrives=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ role: "reader", type: "anyone" }),
  });
  if (!permRes.ok) throw new Error(`Google Drive permission error: ${JSON.stringify(await permRes.json())}`);

  return { fileId, url: `https://drive.google.com/uc?export=view&id=${fileId}` };
}
