import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type {
  CompanyModuleName,
  CompanyRole,
  CompanyRoleModule,
  CompanyRoleModuleKey,
  CompanyUser,
  Profile,
} from "../../lib/database.types";
import { slugify } from "../../lib/slugify";
import Modal from "./Modal";
import FieldInput from "./FieldInput";
import Badge from "./Badge";

const MODULE_LABELS: Record<CompanyModuleName, string> = {
  tesoreria: "Tesorería",
  compras_proveedores: "Compras y Proveedores",
  gestion_personal: "Gestión de Personal",
  ventas_cxc: "Ventas y CxC",
};

interface UserRow extends CompanyUser {
  profile: Profile | null;
}

interface RoleCapability {
  key: CompanyRoleModuleKey;
  label: string;
  seatCap?: number;
}

export default function CompanyUsersRoles({
  companyId,
  companyName,
  activeModules,
  moduleSeats,
  extraCapabilities = [],
  maxUsers,
  canManage,
}: {
  companyId: string;
  companyName: string;
  activeModules: CompanyModuleName[];
  /** Tope de usuarios por módulo (de company_modules.seats). Un módulo sin entrada aquí no tiene tope. */
  moduleSeats?: Partial<Record<CompanyModuleName, number>>;
  /** Productos adicionales / líneas de negocio activos de la empresa con nav propia (Agentes IA, Lealtad, Restaurantes) — mismo checkbox de permiso por rol que los módulos del core, sin tope de seats. */
  extraCapabilities?: { key: CompanyRoleModuleKey; label: string }[];
  maxUsers: number;
  /** true si quien ve esto puede crear/editar roles y usuarios (equipo, o el owner de esta empresa) */
  canManage: boolean;
}) {
  // Default sugerido del correo al crear un usuario — editable, no forzoso.
  const defaultEmail = `${slugify(companyName)}_${new Date().getFullYear()}@nuxorb.com`;
  const [roles, setRoles] = useState<CompanyRole[]>([]);
  const [roleModules, setRoleModules] = useState<Record<string, CompanyRoleModuleKey[]>>({});
  const capabilities: RoleCapability[] = [
    ...activeModules.map((m) => ({ key: m as CompanyRoleModuleKey, label: MODULE_LABELS[m], seatCap: moduleSeats?.[m] })),
    ...extraCapabilities,
  ];
  function labelFor(key: CompanyRoleModuleKey): string {
    return capabilities.find((c) => c.key === key)?.label ?? key;
  }
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewRole, setShowNewRole] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [tempCredentials, setTempCredentials] = useState<{ email: string; tempPassword: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasOwner = users.some((u) => u.is_owner);

  async function load() {
    setLoading(true);
    const [{ data: roleData }, { data: userRows }] = await Promise.all([
      supabase.from("company_roles").select("*").eq("company_id", companyId).order("name"),
      supabase.from("company_users").select("*").eq("company_id", companyId),
    ]);
    const roleIds = (roleData ?? []).map((r) => r.id);
    const userIds = (userRows ?? []).map((u) => u.user_id);

    const [{ data: roleModuleRows }, { data: profileRows }] = await Promise.all([
      roleIds.length
        ? supabase.from("company_role_modules").select("role_id, module").in("role_id", roleIds)
        : Promise.resolve({ data: [] as CompanyRoleModule[] }),
      userIds.length
        ? supabase.schema("nuxorb").from("profiles").select("*").in("id", userIds)
        : Promise.resolve({ data: [] as Profile[] }),
    ]);

    const grouped: Record<string, CompanyRoleModuleKey[]> = {};
    for (const rm of roleModuleRows ?? []) {
      grouped[rm.role_id] = [...(grouped[rm.role_id] ?? []), rm.module];
    }
    setRoleModules(grouped);
    setRoles(roleData ?? []);

    const profilesById = new Map((profileRows ?? []).map((p) => [p.id, p]));
    setUsers((userRows ?? []).map((u) => ({ ...u, profile: profilesById.get(u.user_id) ?? null })));
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  // Cuántos usuarios ya tienen acceso a un módulo (el owner siempre ve todo,
  // el resto lo tiene si su rol incluye el módulo). excludeRoleId sirve para
  // recalcular "si además le doy este módulo a todo el rol X" sin contar dos
  // veces a los usuarios de ese mismo rol.
  function moduleHolderCount(module: CompanyRoleModuleKey, excludeRoleId?: string): number {
    return users.filter((u) => {
      if (u.is_owner) return true;
      if (!u.role_id || u.role_id === excludeRoleId) return false;
      return (roleModules[u.role_id] ?? []).includes(module);
    }).length;
  }

  async function toggleRoleModule(roleId: string, module: CompanyRoleModuleKey, on: boolean) {
    setError(null);
    if (on) {
      const seatCap = capabilities.find((c) => c.key === module)?.seatCap;
      if (seatCap !== undefined) {
        const currentHolders = moduleHolderCount(module, roleId);
        const roleUserCount = users.filter((u) => !u.is_owner && u.role_id === roleId).length;
        if (currentHolders + roleUserCount > seatCap) {
          setError(
            `No hay seats suficientes de ${labelFor(module)}: se necesitan ${currentHolders + roleUserCount}, el nivel contratado incluye ${seatCap}.`,
          );
          return;
        }
      }
      await supabase.from("company_role_modules").insert({ role_id: roleId, module });
    } else {
      await supabase.from("company_role_modules").delete().eq("role_id", roleId).eq("module", module);
    }
    load();
  }

  async function ensureAdminRole(): Promise<string> {
    const existing = roles.find((r) => r.name === "Administrador");
    if (existing) return existing.id;

    for (const cap of capabilities) {
      if (cap.seatCap !== undefined && moduleHolderCount(cap.key) + 1 > cap.seatCap) {
        throw new Error(`No hay seats suficientes de ${cap.label} para crear el usuario admin.`);
      }
    }

    const { data, error: insertError } = await supabase
      .from("company_roles")
      .insert({ company_id: companyId, name: "Administrador" })
      .select()
      .single();
    if (insertError || !data) throw new Error(insertError?.message ?? "No se pudo crear el rol Administrador");
    if (capabilities.length > 0) {
      await supabase
        .from("company_role_modules")
        .insert(capabilities.map((cap) => ({ role_id: data.id, module: cap.key })));
    }
    return data.id;
  }

  async function createUser(
    form: { email: string; full_name: string; role_id: string; password: string },
    isOwner: boolean,
  ) {
    setError(null);

    if (!isOwner && form.role_id) {
      for (const module of roleModules[form.role_id] ?? []) {
        const seatCap = capabilities.find((c) => c.key === module)?.seatCap;
        if (seatCap !== undefined && moduleHolderCount(module) + 1 > seatCap) {
          setError(`No hay seats suficientes de ${labelFor(module)} para agregar este usuario.`);
          return;
        }
      }
    }

    let roleId: string;
    try {
      roleId = isOwner ? await ensureAdminRole() : form.role_id;
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo crear el usuario admin");
      return;
    }

    const { data, error: fnError } = await supabase.functions.invoke("create-company-user", {
      body: {
        company_id: companyId,
        email: form.email,
        full_name: form.full_name,
        role_id: roleId,
        is_owner: isOwner,
        password: form.password || undefined,
      },
    });
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo crear el usuario");
      return;
    }
    setTempCredentials({ email: data.email, tempPassword: data.tempPassword });
    load();
  }

  if (loading) return <p className="font-mono text-xs text-muted">Cargando…</p>;

  return (
    <div>
      {error && (
        <div className="mb-4 border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
          {error}
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Roles</h3>
        {canManage && (
          <button
            onClick={() => setShowNewRole(true)}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
          >
            + Nuevo rol
          </button>
        )}
      </div>
      {roles.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin roles todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {roles.map((r) => (
            <div key={r.id} className="px-4 py-3">
              <p className="text-sm font-semibold text-ink">{r.name}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {capabilities.map((cap) => {
                  const on = (roleModules[r.id] ?? []).includes(cap.key);
                  return (
                    <label key={cap.key} className="flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={!canManage}
                        onChange={(e) => toggleRoleModule(r.id, cap.key, e.target.checked)}
                      />
                      {cap.label}
                      {cap.seatCap !== undefined && (
                        <span className="text-[0.6rem] text-muted/70">
                          ({moduleHolderCount(cap.key)}/{cap.seatCap})
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="mb-3 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Usuarios ({users.length}/{maxUsers})
      </h3>
      {users.length === 0 ? (
        <p className="font-mono text-xs text-muted">Sin usuarios todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {u.profile?.full_name || u.profile?.email || "—"}
                </p>
                <p className="font-mono text-[0.68rem] text-muted">
                  {roles.find((r) => r.id === u.role_id)?.name || "Sin rol"}
                </p>
              </div>
              {u.is_owner && <Badge color="orange">Owner</Badge>}
            </div>
          ))}
        </div>
      )}

      {canManage && (
        <div className="mt-4 flex gap-3">
          {!hasOwner && (
            <AdminUserButton defaultEmail={defaultEmail} onCreate={(form) => createUser(form, true)} />
          )}
          {hasOwner && users.length < maxUsers && (
            <button onClick={() => setShowNewUser(true)} className="btn btn-outline">
              + Agregar usuario
            </button>
          )}
        </div>
      )}

      {showNewRole && (
        <NewRoleModal
          companyId={companyId}
          onClose={() => setShowNewRole(false)}
          onCreated={load}
        />
      )}

      {showNewUser && (
        <NewUserModal
          roles={roles}
          defaultEmail={defaultEmail}
          onClose={() => setShowNewUser(false)}
          onCreate={async (form) => {
            await createUser(form, false);
            setShowNewUser(false);
          }}
        />
      )}

      {tempCredentials && (
        <Modal title="Usuario creado" onClose={() => setTempCredentials(null)}>
          <p className="text-sm text-muted">
            Copia esta contraseña ahora — no se vuelve a mostrar. Compártela con el cliente por
            un medio seguro.
          </p>
          <div className="mt-4 space-y-2 border border-ink/15 bg-sand-2 p-4 font-mono text-sm">
            <p>
              <span className="text-muted">Correo:</span> {tempCredentials.email}
            </p>
            <p>
              <span className="text-muted">Contraseña:</span> {tempCredentials.tempPassword}
            </p>
          </div>
          <button onClick={() => setTempCredentials(null)} className="btn btn-primary mt-4 w-full">
            Listo
          </button>
        </Modal>
      )}
    </div>
  );
}

function AdminUserButton({
  defaultEmail,
  onCreate,
}: {
  defaultEmail: string;
  onCreate: (form: { email: string; full_name: string; role_id: string; password: string }) => Promise<void>;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        + Crear usuario admin
      </button>
      {show && (
        <NewUserModal
          title="Crear usuario admin"
          roles={[]}
          defaultEmail={defaultEmail}
          hideRoleSelect
          onClose={() => setShow(false)}
          onCreate={async (form) => {
            await onCreate(form);
            setShow(false);
          }}
        />
      )}
    </>
  );
}

function NewRoleModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("company_roles").insert({ company_id: companyId, name });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo rol" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre del rol" value={name} onChange={setName} required placeholder="Cajero" />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear rol"}
        </button>
      </form>
    </Modal>
  );
}

function NewUserModal({
  title = "Agregar usuario",
  roles,
  defaultEmail,
  hideRoleSelect = false,
  onClose,
  onCreate,
}: {
  title?: string;
  roles: CompanyRole[];
  defaultEmail: string;
  hideRoleSelect?: boolean;
  onClose: () => void;
  onCreate: (form: { email: string; full_name: string; role_id: string; password: string }) => Promise<void>;
}) {
  const [form, setForm] = useState({ email: defaultEmail, full_name: "", role_id: roles[0]?.id ?? "", password: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onCreate(form);
    setSaving(false);
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput
          label="Nombre"
          value={form.full_name}
          onChange={(v) => setForm({ ...form, full_name: v })}
          onBlur={() => {
            const slug = slugify(form.full_name);
            if (slug) setForm((f) => ({ ...f, email: `${slug}@nuxorb.com` }));
          }}
          required
        />
        <FieldInput
          label="Correo"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <FieldInput
          label="Contraseña (opcional)"
          type="text"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          placeholder="Vacío = se genera una automática"
        />
        {!hideRoleSelect && (
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Rol
            </label>
            <select
              value={form.role_id}
              onChange={(e) => setForm({ ...form, role_id: e.target.value })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear usuario"}
        </button>
      </form>
    </Modal>
  );
}
