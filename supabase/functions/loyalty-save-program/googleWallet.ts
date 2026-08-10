// Copia idéntica en loyalty-save-program/loyalty-enroll/loyalty-add-stamp —
// las tres necesitan hablar con la API de Google Wallet con la misma
// cuenta de servicio de Nuxorb (un solo issuer para todos los clientes,
// igual que YCLOUD_API_KEY en el módulo de Agentes IA). Duplicado a
// propósito (no en supabase/functions/_shared/) porque el bundler de
// Supabase no siempre resuelve imports fuera de la carpeta de la función
// al desplegar. Si se edita, replicar el cambio en las otras dos copias.
//
// Firma los JWT a mano con Web Crypto (crypto.subtle), nativo de Deno —
// no con las librerías de Node google-auth-library/jsonwebtoken, que
// dependen de la capa de compatibilidad de Node de Deno para firmar con
// la llave RSA y ahí truena con "invalid PEM private key" sin importar
// qué tan bien formado esté el PEM. Mismo mecanismo (crypto.subtle) que ya
// se usa para verificar la firma HMAC de YCloud en whatsapp-webhook.

const ISSUER_ID = Deno.env.get("GOOGLE_WALLET_ISSUER_ID")!;
const SERVICE_ACCOUNT_EMAIL = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL")!;

function base64urlFromBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlFromString(str: string): string {
  return base64urlFromBytes(new TextEncoder().encode(str));
}

// Acepta el PEM venga como venga (con \n literales, saltos de línea
// reales, o el cuerpo base64 pegado en una sola línea) y extrae los bytes
// DER — no depende de que el copy/paste manual del secreto haya quedado
// perfecto.
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
  // El secreto es el PEM completo codificado en base64 (no el PEM crudo) —
  // así se evita por completo el problema de que \n literales se
  // corrompan al pasar por la shell o el parser de --env-file. Se genera
  // con: [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pem))
  const raw = atob(Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY_B64")!);
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
      scope: "https://www.googleapis.com/auth/wallet_object.issuer",
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

const WALLET_API_BASE = "https://walletobjects.googleapis.com/walletobjects/v1";

async function walletFetch(path: string, method: string, body?: unknown) {
  const token = await getAccessToken();
  const res = await fetch(`${WALLET_API_BASE}/${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export function loyaltyClassId(programId: string) {
  return `${ISSUER_ID}.program_${programId.replace(/-/g, "")}`;
}

export function loyaltyObjectId(memberId: string) {
  return `${ISSUER_ID}.member_${memberId.replace(/-/g, "")}`;
}

const TEMPLATE_COLORS: Record<string, string> = {
  clasica: "#3c2a1e",
  moderna: "#0f172a",
  minimal: "#f5f5f4",
};

// Crea la "clase" (plantilla) del programa de lealtad de una empresa, o la
// actualiza si ya existía (mismo id = mismo programa, siempre).
export async function upsertLoyaltyClass(params: {
  programId: string;
  programName: string;
  companyName: string;
  templateKey: string;
  logoUrl: string | null;
}) {
  const classId = loyaltyClassId(params.programId);
  const body = {
    id: classId,
    issuerName: params.companyName,
    programName: params.programName,
    reviewStatus: "underReview",
    hexBackgroundColor: TEMPLATE_COLORS[params.templateKey] ?? TEMPLATE_COLORS.clasica,
    ...(params.logoUrl
      ? { programLogo: { sourceUri: { uri: params.logoUrl }, contentDescription: { defaultValue: { language: "es-MX", value: "Logo" } } } }
      : {}),
  };

  const existing = await walletFetch(`loyaltyClass/${classId}`, "GET");
  const { ok, data } = existing.ok
    ? await walletFetch(`loyaltyClass/${classId}`, "PUT", body)
    : await walletFetch("loyaltyClass", "POST", body);

  if (!ok) throw new Error(`Google Wallet class error: ${JSON.stringify(data)}`);
  return classId;
}

// Crea la tarjeta de un cliente final, o la regresa si ya existía
// (identificada por el id derivado de member.id, determinístico).
export async function ensureLoyaltyObject(params: {
  memberId: string;
  classId: string;
  name: string;
  stamps: number;
  stampsRequired: number;
}) {
  const objectId = loyaltyObjectId(params.memberId);
  const existing = await walletFetch(`loyaltyObject/${objectId}`, "GET");
  if (existing.ok) return objectId;

  const body = {
    id: objectId,
    classId: params.classId,
    state: "ACTIVE",
    accountName: params.name,
    loyaltyPoints: {
      label: "Sellos",
      balance: { string: `${params.stamps}/${params.stampsRequired}` },
    },
  };
  const { ok, data } = await walletFetch("loyaltyObject", "POST", body);
  if (!ok) throw new Error(`Google Wallet object error: ${JSON.stringify(data)}`);
  return objectId;
}

// Actualiza el conteo de sellos de una tarjeta ya existente — Google
// sincroniza esto al celular del cliente sin que nosotros hagamos nada más.
export async function patchLoyaltyObjectStamps(objectId: string, stamps: number, stampsRequired: number) {
  const { ok, data } = await walletFetch(`loyaltyObject/${objectId}`, "PATCH", {
    loyaltyPoints: { label: "Sellos", balance: { string: `${stamps}/${stampsRequired}` } },
  });
  if (!ok) throw new Error(`Google Wallet update error: ${JSON.stringify(data)}`);
}

// Arma el link "Guardar en Google Wallet" — un JWT firmado que referencia
// la tarjeta ya creada (ensureLoyaltyObject se llama antes que esto).
export async function buildSaveLink(objectId: string): Promise<string> {
  const claims = {
    iss: SERVICE_ACCOUNT_EMAIL,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: { loyaltyObjects: [{ id: objectId }] },
  };
  const token = await signJwt({ alg: "RS256", typ: "JWT" }, claims);
  return `https://pay.google.com/gp/v/save/${token}`;
}
