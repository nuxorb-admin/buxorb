import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import QRCode from "qrcode";
import { supabase } from "../../../lib/supabase";
import type { LoyaltyProgram, LoyaltyTemplateKey } from "../../../lib/database.types";

// La página pública de registro vive en el subdominio del propio tenant
// (empresa.app.nuxorb.com/lealtad/<id>) para que la URL que ve el cliente
// final sea la del negocio, no un dominio genérico de Nuxorb.
const TENANT_BASE_DOMAIN = import.meta.env.VITE_TENANT_BASE_DOMAIN || "nuxorb.com";

function enrollUrl(subdomain: string, programId: string) {
  if (import.meta.env.DEV) return `${window.location.origin}/lealtad/${programId}?tenant=${subdomain}`;
  return `https://${subdomain}.${TENANT_BASE_DOMAIN}/lealtad/${programId}`;
}

const TEMPLATES: { key: LoyaltyTemplateKey; label: string; preview: string }[] = [
  { key: "clasica", label: "Clásica", preview: "#3c2a1e" },
  { key: "moderna", label: "Moderna", preview: "#0f172a" },
  { key: "minimal", label: "Minimalista", preview: "#f5f5f4" },
];

export default function ConfigurarTarjetaTab({
  companyId,
  companyName,
  subdomain,
  program,
  reload,
}: {
  companyId: string;
  companyName: string;
  subdomain: string;
  program: LoyaltyProgram | null;
  reload: () => void;
}) {
  const [editing, setEditing] = useState(!program);

  if (!editing && program) {
    return <ResumenPrograma subdomain={subdomain} program={program} onEdit={() => setEditing(true)} />;
  }

  return (
    <FormularioPrograma
      companyId={companyId}
      companyName={companyName}
      program={program}
      onSaved={() => {
        setEditing(false);
        reload();
      }}
    />
  );
}

function ResumenPrograma({
  subdomain,
  program,
  onEdit,
}: {
  subdomain: string;
  program: LoyaltyProgram;
  onEdit: () => void;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const url = enrollUrl(subdomain, program.id);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, { width: 260, margin: 1 }).then((dataUrl) => {
      if (!cancelled) setQrDataUrl(dataUrl);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Tu tarjeta de lealtad</h3>
        <button onClick={onEdit} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
          Editar
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="border border-ink/10 bg-white p-4 text-center">
          {qrDataUrl && <img src={qrDataUrl} alt="QR de la tarjeta de lealtad" className="mx-auto" width={200} height={200} />}
          <p className="mt-2 font-mono text-[0.6rem] text-muted">Muéstralo o imprímelo para que tus clientes lo escaneen</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-ink">
            <span className="font-bold">{program.name}</span>
          </p>
          <p className="font-mono text-[0.68rem] text-muted">
            {program.stamps_required} sellos → {program.reward_text}
          </p>
          <p className="font-mono text-[0.62rem] text-muted">Plantilla: {TEMPLATES.find((t) => t.key === program.template_key)?.label}</p>
        </div>
      </div>
    </div>
  );
}

function FormularioPrograma({
  companyId,
  companyName,
  program,
  onSaved,
}: {
  companyId: string;
  companyName: string;
  program: LoyaltyProgram | null;
  onSaved: () => void;
}) {
  const [name, setName] = useState(program?.name ?? `Tarjeta de lealtad ${companyName}`);
  const [templateKey, setTemplateKey] = useState<LoyaltyTemplateKey>(program?.template_key ?? "clasica");
  const [logoPath, setLogoPath] = useState<string | null>(program?.logo_path ?? null);
  const [stampsRequired, setStampsRequired] = useState(String(program?.stamps_required ?? 5));
  const [rewardText, setRewardText] = useState(program?.reward_text ?? "Producto gratis");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function subirLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    const path = `${companyId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("loyalty-logos").upload(path, file);
    setUploading(false);
    if (uploadError) {
      setError("No se pudo subir el logo.");
      return;
    }
    setLogoPath(path);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const stamps = Number(stampsRequired);
    if (!name.trim() || !rewardText.trim() || !stamps || stamps < 1) return;
    if (!logoPath) {
      setError("Google Wallet exige un logo — sube una imagen antes de guardar.");
      return;
    }
    setSaving(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("loyalty-save-program", {
      body: {
        company_id: companyId,
        name: name.trim(),
        template_key: templateKey,
        logo_path: logoPath,
        stamps_required: stamps,
        reward_text: rewardText.trim(),
      },
    });
    setSaving(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo guardar la tarjeta");
      return;
    }
    onSaved();
  }

  const logoUrl = logoPath ? supabase.storage.from("loyalty-logos").getPublicUrl(logoPath).data.publicUrl : null;

  return (
    <div>
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        {program ? "Editar tarjeta de lealtad" : "Arma tu tarjeta de lealtad"}
      </h3>
      <form onSubmit={submit} className="max-w-lg space-y-4">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Plantilla</label>
          <div className="flex gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTemplateKey(t.key)}
                className={`flex-1 border px-3 py-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white ${
                  templateKey === t.key ? "border-teal ring-2 ring-teal" : "border-ink/10"
                }`}
                style={{ backgroundColor: t.preview }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Logo (obligatorio para Google Wallet)
          </label>
          {logoUrl && <img src={logoUrl} alt="Logo" className="mb-2 h-16 w-16 border border-ink/10 object-contain" />}
          <input type="file" accept="image/*" onChange={subirLogo} disabled={uploading} className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink" />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Sellos para ganar el premio
          </label>
          <input
            type="number"
            min={1}
            value={stampsRequired}
            onChange={(e) => setStampsRequired(e.target.value)}
            required
            className="w-32 border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Premio</label>
          <input
            value={rewardText}
            onChange={(e) => setRewardText(e.target.value)}
            required
            placeholder="Ej. Un café gratis"
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <button type="submit" disabled={saving || uploading} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar tarjeta"}
        </button>
      </form>
    </div>
  );
}
