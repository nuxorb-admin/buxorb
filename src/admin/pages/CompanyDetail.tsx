import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type {
  Company,
  CompanyAddon,
  CompanyAddonName,
  CompanyModule,
  CompanyModuleName,
  CompanyModuleTier,
  Contact,
  Lead,
  ProductLine,
} from "../../lib/database.types";
import NotesTimeline from "../components/NotesTimeline";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";
import Badge from "../components/Badge";
import CompanyUsersRoles from "../components/CompanyUsersRoles";
import { useAuth } from "../AuthProvider";

type SaasModuleName = "tesoreria" | "compras_proveedores" | "gestion_personal" | "ventas_cxc";

const MODULE_ORDER: SaasModuleName[] = [
  "tesoreria",
  "compras_proveedores",
  "gestion_personal",
  "ventas_cxc",
];

const MODULE_LABELS: Record<SaasModuleName, string> = {
  tesoreria: "Tesorería",
  compras_proveedores: "Compras y Proveedores",
  gestion_personal: "Gestión de Personal",
  ventas_cxc: "Ventas y CxC",
};

const ADDON_LABELS: Record<CompanyAddonName, string> = {
  checador_basico: "Checador básico",
  portal_empleado: "Portal del empleado",
  ptu: "PTU",
  conciliacion_pdf_ampliada: "Conciliación PDF ampliada",
  lectura_tickets_ampliada: "Lectura de tickets ampliada",
  inventario: "Inventario",
  timbrado_cfdi: "Timbrado CFDI",
  chatbot_cobranza: "Chatbot de cobranza",
};

const ADDON_ORDER = Object.keys(ADDON_LABELS) as CompanyAddonName[];

const PRODUCT_LINE_LABELS: Record<ProductLine, string> = {
  saas: "SaaS",
  crm: "CRM",
  erp: "ERP",
};

const TENANT_BASE_DOMAIN = import.meta.env.VITE_TENANT_BASE_DOMAIN || "nuxorb.com";

// CRM y ERP todavía no tienen concepto de suscripción/tier por módulo (solo
// tienen un módulo cada uno) — a diferencia de SaaS, su "módulo activo" no
// sale de company_modules, siempre es el mismo.
function activeModulesFor(company: Company, moduleSubs: CompanyModule[]): CompanyModuleName[] {
  if (company.product_line === "saas") return moduleSubs.filter((m) => m.active).map((m) => m.module);
  if (company.product_line === "crm") return ["crm_pipeline_ventas"];
  return ["erp_inventario"];
}

function portalHost(subdomain: string) {
  return `${subdomain}.${TENANT_BASE_DOMAIN}`;
}

function portalUrl(subdomain: string) {
  if (import.meta.env.DEV) {
    return `${window.location.origin}/?tenant=${subdomain}`;
  }
  return `https://${portalHost(subdomain)}`;
}

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [moduleSubs, setModuleSubs] = useState<CompanyModule[]>([]);
  const [addonSubs, setAddonSubs] = useState<CompanyAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewContact, setShowNewContact] = useState(false);

  async function load() {
    if (!id) return;
    setLoading(true);
    const [
      { data: companyData },
      { data: contactsData },
      { data: leadsData },
      { data: moduleData },
      { data: addonData },
    ] = await Promise.all([
      supabase.from("companies").select("*").eq("id", id).single(),
      supabase.from("contacts").select("*").eq("company_id", id).order("name"),
      supabase.from("leads").select("*").eq("company_id", id).order("created_at", { ascending: false }),
      supabase.from("company_modules").select("*").eq("company_id", id),
      supabase.from("company_addons").select("*").eq("company_id", id),
    ]);
    setCompany(companyData);
    setContacts(contactsData ?? []);
    setLeads(leadsData ?? []);
    setModuleSubs(moduleData ?? []);
    setAddonSubs(addonData ?? []);
    setLoading(false);
  }

  async function setModuleTier(module: CompanyModuleName, tier: CompanyModuleTier | "") {
    if (!company) return;
    if (tier === "") {
      await supabase.from("company_modules").delete().eq("company_id", company.id).eq("module", module);
    } else {
      await supabase
        .from("company_modules")
        .upsert({ company_id: company.id, module, tier, seats: 1 }, { onConflict: "company_id,module" });
    }
    load();
  }

  async function setModuleSeats(module: CompanyModuleName, seats: number) {
    if (!company) return;
    await supabase
      .from("company_modules")
      .update({ seats })
      .eq("company_id", company.id)
      .eq("module", module);
    load();
  }

  async function updateCompany(patch: Partial<Company>) {
    if (!company) return;
    setCompany({ ...company, ...patch });
    await supabase.from("companies").update(patch).eq("id", company.id);
  }

  async function toggleAddon(addon: CompanyAddonName, active: boolean) {
    if (!company) return;
    if (active) {
      await supabase
        .from("company_addons")
        .upsert({ company_id: company.id, addon, active: true }, { onConflict: "company_id,addon" });
    } else {
      await supabase.from("company_addons").delete().eq("company_id", company.id).eq("addon", addon);
    }
    load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function remove() {
    if (!company) return;
    if (!confirm("¿Eliminar esta empresa?")) return;
    await supabase.from("companies").delete().eq("id", company.id);
    navigate("/admin/companies");
  }

  if (loading || !company) {
    return <p className="font-mono text-xs text-muted">Cargando…</p>;
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/admin/companies")}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
      >
        ← Empresas
      </button>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">{company.name}</h1>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-teal hover:underline"
            >
              {company.website}
            </a>
          )}
        </div>
        <button
          onClick={remove}
          className="whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.1em] text-orange hover:underline"
        >
          Eliminar
        </button>
      </div>
      {company.notes && <p className="mt-4 max-w-xl text-sm text-muted">{company.notes}</p>}

      <div className="mt-8 grid gap-4 border border-ink/10 bg-white p-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Línea de producto
          </label>
          <select
            value={company.product_line}
            onChange={(e) => updateCompany({ product_line: e.target.value as ProductLine })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          >
            {(Object.keys(PRODUCT_LINE_LABELS) as ProductLine[]).map((pl) => (
              <option key={pl} value={pl}>
                {PRODUCT_LINE_LABELS[pl]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Subdominio
          </label>
          <div className="flex gap-2">
            <input
              value={company.subdomain ?? ""}
              onChange={(e) => updateCompany({ subdomain: e.target.value })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-mono text-sm text-ink focus:border-teal focus:outline-none"
              placeholder="quebonito"
            />
          </div>
          {company.subdomain && (
            <a
              href={portalUrl(company.subdomain)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-mono text-[0.7rem] text-teal hover:underline"
            >
              Ver portal → {portalHost(company.subdomain)}
            </a>
          )}
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Máximo de usuarios
          </label>
          <input
            type="number"
            min={1}
            value={company.max_users}
            onChange={(e) => updateCompany({ max_users: Number(e.target.value) || 1 })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8">
        {company.product_line === "saas" ? (
          <>
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Suscripción Nuxorb
            </h2>
            <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
              {MODULE_ORDER.map((m) => {
                const sub = moduleSubs.find((s) => s.module === m);
                return (
                  <div key={m} className="flex flex-wrap items-center gap-4 px-4 py-3">
                    <span className="w-44 flex-none text-sm font-semibold text-ink">
                      {MODULE_LABELS[m]}
                    </span>
                    <select
                      value={sub?.tier ?? ""}
                      onChange={(e) => setModuleTier(m, e.target.value as CompanyModuleTier | "")}
                      className="border border-ink/15 bg-sand-2 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.06em] text-ink focus:border-teal focus:outline-none"
                    >
                      <option value="">Sin contratar</option>
                      <option value="essential">Essential</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                    {sub?.tier === "enterprise" && m === "tesoreria" && (
                      <span className="font-mono text-[0.62rem] text-muted">
                        Enterprise no está desarrollado todavía — el módulo usa los límites de Professional.
                      </span>
                    )}
                    {sub && (
                      <label className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                        Seats
                        <input
                          type="number"
                          min={1}
                          value={sub.seats}
                          onChange={(e) => setModuleSeats(m, Number(e.target.value) || 1)}
                          className="w-16 border border-ink/15 bg-sand-2 px-2 py-1 text-sm text-ink focus:border-teal focus:outline-none"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>

            <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
              Productos adicionales
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {ADDON_ORDER.map((a) => {
                const active = addonSubs.some((s) => s.addon === a);
                return (
                  <label
                    key={a}
                    className="flex items-center gap-2 border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => toggleAddon(a, e.target.checked)}
                    />
                    {ADDON_LABELS[a]}
                  </label>
                );
              })}
            </div>
          </>
        ) : (
          <div className="border border-dashed border-ink/20 bg-sand-2 p-5">
            <p className="font-mono text-xs text-muted">
              Los módulos de {PRODUCT_LINE_LABELS[company.product_line]} se definen cuando esa
              línea de producto se construya. Por ahora tiene un único módulo, siempre activo.
            </p>
          </div>
        )}

        <h2 className="mb-3 mt-8 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Usuarios y roles
        </h2>
        <CompanyUsersRoles
          companyId={company.id}
          activeModules={activeModulesFor(company, moduleSubs)}
          maxUsers={company.max_users}
          canManage
        />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Contactos</h2>
          <button
            onClick={() => setShowNewContact(true)}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
          >
            + Agregar
          </button>
        </div>
        {contacts.length === 0 ? (
          <p className="font-mono text-xs text-muted">Sin contactos todavía.</p>
        ) : (
          <ul className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {contacts.map((c) => (
              <li key={c.id} className="px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  {c.name} {c.role_title && <span className="font-normal text-muted">· {c.role_title}</span>}
                </p>
                <p className="font-mono text-[0.68rem] text-muted">
                  {[c.email, c.phone].filter(Boolean).join(" · ") || "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Leads relacionados
        </h2>
        {leads.length === 0 ? (
          <p className="font-mono text-xs text-muted">Sin leads vinculados.</p>
        ) : (
          <ul className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {leads.map((l) => (
              <li key={l.id}>
                <Link
                  to={`/admin/leads/${l.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-sand-2"
                >
                  <span className="text-sm text-ink">{l.name}</span>
                  <Badge color="muted">{l.stage}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Notas</h2>
        <NotesTimeline entityType="company" entityId={company.id} />
      </div>

      {showNewContact && (
        <NewContactModal companyId={company.id} onClose={() => setShowNewContact(false)} onCreated={load} />
      )}
    </div>
  );
}

function NewContactModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { profile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", role_title: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("contacts").insert({ ...form, company_id: companyId, created_by: profile?.id });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo contacto" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FieldInput
          label="Puesto"
          value={form.role_title}
          onChange={(v) => setForm({ ...form, role_title: v })}
        />
        <FieldInput
          label="Correo"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <FieldInput label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Agregar contacto"}
        </button>
      </form>
    </Modal>
  );
}
