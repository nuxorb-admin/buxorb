import CompanyUsersRoles from "../../admin/components/CompanyUsersRoles";
import type { CompanyModuleName } from "../../lib/database.types";

export default function UsersRoles({
  companyId,
  activeModules,
  maxUsers,
}: {
  companyId: string;
  activeModules: CompanyModuleName[];
  maxUsers: number;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Usuarios y roles</h1>
      <p className="mt-1 font-mono text-xs text-muted">
        Administra quién entra a tu sistema y qué módulos puede ver cada quien.
      </p>
      <div className="mt-6">
        <CompanyUsersRoles companyId={companyId} activeModules={activeModules} maxUsers={maxUsers} canManage />
      </div>
    </div>
  );
}
