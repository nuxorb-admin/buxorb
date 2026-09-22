import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  LdnCitasAppointment,
  LdnCitasSchedule,
  LdnCitasService,
  LdnCitasServiceEmployee,
  ProductoServicio,
} from "../../../lib/database.types";

export interface Empleado {
  id: string;
  nombre: string;
}

export function useCitasData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<ProductoServicio[]>([]);
  const [servicios, setServicios] = useState<LdnCitasService[]>([]);
  const [serviceEmployees, setServiceEmployees] = useState<LdnCitasServiceEmployee[]>([]);
  const [schedules, setSchedules] = useState<LdnCitasSchedule[]>([]);
  const [appointments, setAppointments] = useState<LdnCitasAppointment[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const load = useCallback(async () => {
    const [
      { data: productosData },
      { data: serviciosData },
      { data: serviceEmployeesData },
      { data: schedulesData },
      { data: appointmentsData },
      { data: companyUsersData },
    ] = await Promise.all([
      supabase.from("sales_products_services").select("*").eq("company_id", companyId).eq("activo", true).order("nombre"),
      supabase.from("ldn_citas_services").select("*").eq("company_id", companyId).eq("activo", true),
      supabase.from("ldn_citas_service_employees").select("*"),
      supabase.from("ldn_citas_schedules").select("*").eq("company_id", companyId),
      supabase
        .from("ldn_citas_appointments")
        .select("*")
        .eq("company_id", companyId)
        .neq("estado", "cancelada")
        .order("fecha_hora_inicio"),
      supabase.from("company_users").select("user_id").eq("company_id", companyId),
    ]);

    const userIds = (companyUsersData ?? []).map((u) => u.user_id);
    const { data: profilesData } = userIds.length
      ? await supabase.schema("nuxorb").from("profiles").select("id, full_name, email").in("id", userIds)
      : { data: [] as { id: string; full_name: string | null; email: string }[] };

    setProductos(productosData ?? []);
    setServicios(serviciosData ?? []);
    setServiceEmployees(serviceEmployeesData ?? []);
    setSchedules(schedulesData ?? []);
    setAppointments(appointmentsData ?? []);
    setEmpleados((profilesData ?? []).map((p) => ({ id: p.id, nombre: p.full_name || p.email })));
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, productos, servicios, serviceEmployees, schedules, appointments, empleados, reload: load };
}
