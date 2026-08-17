import CompanyUsersRoles from "../../admin/components/CompanyUsersRoles";
import type { CompanyModuleName, CompanyRoleModuleKey } from "../../lib/database.types";

export default function UsersRoles({
  companyId,
  companyName,
  activeModules,
  moduleSeats,
  agentesActivo,
  lealtadActivo,
  restaurantesActivo,
  maxUsers,
}: {
  companyId: string;
  companyName: string;
  activeModules: CompanyModuleName[];
  moduleSeats?: Partial<Record<CompanyModuleName, number>>;
  agentesActivo: boolean;
  lealtadActivo: boolean;
  restaurantesActivo: boolean;
  maxUsers: number;
}) {
  const extraCapabilities: { key: CompanyRoleModuleKey; label: string }[] = [
    ...(agentesActivo ? [{ key: "agentes_ia" as CompanyRoleModuleKey, label: "Agentes IA" }] : []),
    ...(lealtadActivo ? [{ key: "lealtad" as CompanyRoleModuleKey, label: "Lealtad" }] : []),
    ...(restaurantesActivo ? [{ key: "restaurantes" as CompanyRoleModuleKey, label: "Restaurantes" }] : []),
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Usuarios y roles</h1>
      <p className="mt-1 font-mono text-xs text-muted">
        Administra quién entra a tu sistema y qué módulos puede ver cada quien.
      </p>
      <div className="mt-6">
        <CompanyUsersRoles
          companyId={companyId}
          companyName={companyName}
          activeModules={activeModules}
          moduleSeats={moduleSeats}
          extraCapabilities={extraCapabilities}
          maxUsers={maxUsers}
          canManage
        />
      </div>
    </div>
  );
}
