import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type {
  AiAgent,
  AiAgentTypeTemplate,
  Company,
  CompanyAddon,
  CompanyAddonName,
  CompanyModule,
  CompanyModuleName,
  CompanyModuleTier,
  Contact,
  Lead,
} from "../../lib/database.types";
import {
  ADDON_CATEGORY,
  CATEGORY_LABELS,
  MODULE_CATEGORY,
  type InternalCategory,
} from "../../lib/moduleCategories";
import NotesTimeline from "../components/NotesTimeline";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";
import Badge from "../components/Badge";
import CompanyUsersRoles from "../components/CompanyUsersRoles";
import { useAuth } from "../AuthProvider";

const MODULE_ORDER: CompanyModuleName[] = [
  "tesoreria",
  "compras_proveedores",
  "gestion_personal",
  "ventas_cxc",
];

const MODULE_LABELS: Record<CompanyModuleName, string> = {
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
  agentes_ia: "Agentes IA",
};

const ADDON_ORDER = Object.keys(ADDON_LABELS) as CompanyAddonName[];

const CATEGORY_BADGE_COLOR: Record<InternalCategory, "teal" | "orange" | "muted"> = {
  crm: "teal",
  erp: "orange",
  otro: "muted",
};

const CATEGORY_FILTERS: (InternalCategory | "todos")[] = ["todos", "crm", "erp", "otro"];

const TENANT_BASE_DOMAIN = import.meta.env.VITE_TENANT_BASE_DOMAIN || "nuxorb.com";

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
  const [agentTemplates, setAgentTemplates] = useState<AiAgentTypeTemplate[]>([]);
  const [companyAgents, setCompanyAgents] = useState<AiAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewContact, setShowNewContact] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<InternalCategory | "todos">("todos");

  async function load() {
    if (!id) return;
    setLoading(true);
    const [
      { data: companyData },
      { data: contactsData },
      { data: leadsData },
      { data: moduleData },
      { data: addonData },
      { data: templatesData },
      { data: agentsData },
    ] = await Promise.all([
      supabase.schema("nuxorb").from("companies").select("*").eq("id", id).single(),
      supabase.schema("nuxorb").from("contacts").select("*").eq("company_id", id).order("name"),
      supabase.schema("nuxorb").from("leads").select("*").eq("company_id", id).order("created_at", { ascending: false }),
      supabase.schema("nuxorb").from("company_modules").select("*").eq("company_id", id),
      supabase.schema("nuxorb").from("company_addons").select("*").eq("company_id", id),
      supabase.schema("nuxorb").from("ai_agent_type_templates").select("*").order("name"),
      supabase.from("ai_agents").select("*").eq("company_id", id).order("created_at"),
    ]);
    setCompany(companyData);
    setContacts(contactsData ?? []);
    setLeads(leadsData ?? []);
    setModuleSubs(moduleData ?? []);
    setAddonSubs(addonData ?? []);
    setAgentTemplates(templatesData ?? []);
    setCompanyAgents(agentsData ?? []);
    setLoading(false);
  }

  async function setModuleTier(module: CompanyModuleName, tier: CompanyModuleTier | "") {
    if (!company) return;
    if (tier === "") {
      await supabase.schema("nuxorb").from("company_modules").delete().eq("company_id", company.id).eq("module", module);
    } else {
      await supabase
        .schema("nuxorb").from("company_modules")
        .upsert({ company_id: company.id, module, tier, seats: 1 }, { onConflict: "company_id,module" });
    }
    load();
  }

  async function setModuleSeats(module: CompanyModuleName, seats: number) {
    if (!company) return;
    await supabase
      .schema("nuxorb").from("company_modules")
      .update({ seats })
      .eq("company_id", company.id)
      .eq("module", module);
    load();
  }

  async function updateCompany(patch: Partial<Company>) {
    if (!company) return;
    setCompany({ ...company, ...patch });
    await supabase.schema("nuxorb").from("companies").update(patch).eq("id", company.id);
  }

  async function toggleAddon(addon: CompanyAddonName, active: boolean) {
    if (!company) return;
    if (active) {
      await supabase
        .schema("nuxorb").from("company_addons")
        .upsert({ company_id: company.id, addon, active: true }, { onConflict: "company_id,addon" });
    } else {
      await supabase.schema("nuxorb").from("company_addons").delete().eq("company_id", company.id).eq("addon", addon);
    }
    load();
  }

  async function toggleAgentType(template: AiAgentTypeTemplate, active: boolean) {
    if (!company) return;
    const existing = companyAgents.find((a) => a.type_key === template.key);
    if (existing) {
      await supabase.from("ai_agents").update({ active }).eq("id", existing.id);
    } else if (active) {
      await supabase.from("ai_agents").insert({
        company_id: company.id,
        type_key: template.key,
        name: template.name,
        system_prompt: template.default_prompt,
      });
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
    await supabase.schema("nuxorb").from("companies").delete().eq("id", company.id);
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
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Suscripción Nuxorb
          </h2>
          <div className="flex gap-1">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setCategoryFilter(f)}
                className={`font-mono text-[0.62rem] uppercase tracking-[0.08em] px-2 py-1 ${
                  categoryFilter === f ? "bg-ink text-white" : "bg-sand-2 text-muted hover:text-ink"
                }`}
              >
                {f === "todos" ? "Todos" : CATEGORY_LABELS[f]}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {MODULE_ORDER.filter((m) => categoryFilter === "todos" || MODULE_CATEGORY[m] === categoryFilter).map(
            (m) => {
              const sub = moduleSubs.find((s) => s.module === m);
              return (
                <div key={m} className="flex flex-wrap items-center gap-4 px-4 py-3">
                  <span className="flex w-52 flex-none items-center gap-2 text-sm font-semibold text-ink">
                    {MODULE_LABELS[m]}
                    <Badge color={CATEGORY_BADGE_COLOR[MODULE_CATEGORY[m]]}>{CATEGORY_LABELS[MODULE_CATEGORY[m]]}</Badge>
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
            },
          )}
        </div>

        <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Productos adicionales
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {ADDON_ORDER.filter((a) => categoryFilter === "todos" || ADDON_CATEGORY[a] === categoryFilter).map((a) => {
            const active = addonSubs.some((s) => s.addon === a);
            return (
              <label
                key={a}
                className="flex items-center gap-2 border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
              >
                <input type="checkbox" checked={active} onChange={(e) => toggleAddon(a, e.target.checked)} />
                {ADDON_LABELS[a]}
                <Badge color={CATEGORY_BADGE_COLOR[ADDON_CATEGORY[a]]}>{CATEGORY_LABELS[ADDON_CATEGORY[a]]}</Badge>
              </label>
            );
          })}
        </div>

        {addonSubs.some((s) => s.addon === "agentes_ia") && (
          <AgentesSection
            templates={agentTemplates}
            agents={companyAgents}
            onToggle={toggleAgentType}
            onChanged={load}
          />
        )}

        <h2 className="mb-3 mt-8 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Usuarios y roles
        </h2>
        <CompanyUsersRoles
          companyId={company.id}
          companyName={company.name}
          activeModules={moduleSubs.filter((m) => m.active).map((m) => m.module)}
          moduleSeats={Object.fromEntries(moduleSubs.map((m) => [m.module, m.seats]))}
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

function AgentesSection({
  templates,
  agents,
  onToggle,
  onChanged,
}: {
  templates: AiAgentTypeTemplate[];
  agents: AiAgent[];
  onToggle: (template: AiAgentTypeTemplate, active: boolean) => void;
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState<AiAgent | null>(null);

  return (
    <div className="mt-8">
      <h2 className="mb-1 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Agentes IA</h2>
      <p className="mb-3 font-mono text-[0.62rem] text-muted">
        Activa los tipos de agente que el cliente compró y ajusta el prompt de cada uno a su negocio. El cliente solo
        ve sus agentes activos y conecta el canal (WhatsApp, etc.) — no elige tipos ni edita el prompt.
      </p>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {templates.map((t) => {
          const agent = agents.find((a) => a.type_key === t.key);
          const active = !!agent?.active;
          return (
            <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" checked={active} onChange={(e) => onToggle(t, e.target.checked)} />
                <span>
                  {agent?.name || t.name}
                  <span className="ml-2 font-mono text-[0.6rem] text-muted">{t.description}</span>
                </span>
              </label>
              {agent && active && (
                <button
                  onClick={() => setEditing(agent)}
                  className="shrink-0 font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Editar prompt
                </button>
              )}
            </div>
          );
        })}
      </div>

      {editing && <EditAgentPromptModal agent={editing} onClose={() => setEditing(null)} onSaved={onChanged} />}
    </div>
  );
}

function EditAgentPromptModal({
  agent,
  onClose,
  onSaved,
}: {
  agent: AiAgent;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(agent.name);
  const [prompt, setPrompt] = useState(agent.system_prompt);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;
    setSaving(true);
    await supabase.from("ai_agents").update({ name: name.trim(), system_prompt: prompt.trim() }).eq("id", agent.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title={`Editar agente — ${agent.name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={name} onChange={setName} required />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Instrucciones (prompt)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={8}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink transition focus:border-teal focus:outline-none"
          />
          <p className="mt-1 font-mono text-[0.6rem] text-muted">
            Ajusta esto al negocio del cliente (horarios, tono, qué puede y no puede prometer, etc.).
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
    </Modal>
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
    await supabase.schema("nuxorb").from("contacts").insert({ ...form, company_id: companyId, created_by: profile?.id });
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
