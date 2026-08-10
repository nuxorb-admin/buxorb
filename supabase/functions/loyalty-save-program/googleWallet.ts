import { GoogleAuth } from "npm:google-auth-library@9";
import jwt from "npm:jsonwebtoken@9";

// Copia idéntica en loyalty-save-program/loyalty-enroll/loyalty-add-stamp —
// las tres necesitan hablar con la API de Google Wallet con la misma
// cuenta de servicio de Nuxorb (un solo issuer para todos los clientes,
// igual que YCLOUD_API_KEY en el módulo de Agentes IA). Duplicado a
// propósito (no en supabase/functions/_shared/) porque el bundler de
// Supabase no siempre resuelve imports fuera de la carpeta de la función
// al desplegar. Si se edita, replicar el cambio en las otras dos copias.

const ISSUER_ID = Deno.env.get("GOOGLE_WALLET_ISSUER_ID")!;
const SERVICE_ACCOUNT_EMAIL = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL")!;
// El private key viene de Supabase con \n literales en vez de saltos de
// línea reales (así es como se guardan las variables de entorno multilínea).
const SERVICE_ACCOUNT_PRIVATE_KEY = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY")!.replace(/\\n/g, "\n");

const WALLET_API_BASE = "https://walletobjects.googleapis.com/walletobjects/v1";

function auth() {
  return new GoogleAuth({
    credentials: { client_email: SERVICE_ACCOUNT_EMAIL, private_key: SERVICE_ACCOUNT_PRIVATE_KEY },
    scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
  });
}

async function walletFetch(path: string, method: string, body?: unknown) {
  const client = await auth().getClient();
  const { token } = await client.getAccessToken();
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
export function buildSaveLink(objectId: string): string {
  const claims = {
    iss: SERVICE_ACCOUNT_EMAIL,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: { loyaltyObjects: [{ id: objectId }] },
  };
  const token = jwt.sign(claims, SERVICE_ACCOUNT_PRIVATE_KEY, { algorithm: "RS256" });
  return `https://pay.google.com/gp/v/save/${token}`;
}
