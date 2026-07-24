import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  CompanyModuleTier,
  ConceptoNomina,
  DepartamentoPersonal,
  Empleado,
  Finiquito,
  HistorialSueldo,
  Incidencia,
  PeriodoNomina,
  ReciboDetalle,
  ReciboNomina,
  SaldoVacaciones,
} from "../../../lib/database.types";
import { limitsForTier, type PersonalTierLimits } from "./limits";
import type { FormulaImssObrero, TramoISR } from "./calculoNomina";

export interface ReciboFull extends ReciboNomina {
  recibo_detalle: ReciboDetalle[];
}

export interface PeriodoFull extends PeriodoNomina {
  recibo_nomina: ReciboFull[];
}

interface CompanyUserRow {
  user_id: string;
  full_name: string | null;
  email: string;
}

export function usePersonalData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<CompanyModuleTier | null>(null);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoPersonal[]>([]);
  const [historialSueldo, setHistorialSueldo] = useState<HistorialSueldo[]>([]);
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [saldosVacaciones, setSaldosVacaciones] = useState<SaldoVacaciones[]>([]);
  const [conceptos, setConceptos] = useState<ConceptoNomina[]>([]);
  const [periodos, setPeriodos] = useState<PeriodoFull[]>([]);
  const [finiquitos, setFiniquitos] = useState<Finiquito[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUserRow[]>([]);
  const [tramosISR, setTramosISR] = useState<TramoISR[]>([]);
  const [umaDiaria, setUmaDiaria] = useState(0);
  const [formulaImss, setFormulaImss] = useState<FormulaImssObrero | null>(null);

  async function load() {
    setLoading(true);

    const { data: moduleRow } = await supabase
      .from("company_modules")
      .select("tier")
      .eq("company_id", companyId)
      .eq("module", "gestion_personal")
      .maybeSingle();
    setTier(moduleRow?.tier ?? null);

    const [
      { data: empleadoRows },
      { data: departamentoRows },
      { data: incidenciaRows },
      { data: conceptoRows },
      { data: periodoRows },
      { data: memberRows },
      { data: isrRow },
      { data: umaRow },
      { data: imssRow },
    ] = await Promise.all([
      supabase.from("empleados").select("*").eq("company_id", companyId).order("nombre_completo"),
      supabase.from("departamentos_personal").select("*").eq("company_id", companyId).order("nombre"),
      supabase.from("incidencias").select("*, empleados!inner(company_id)").eq("empleados.company_id", companyId).order("fecha", { ascending: false }),
      supabase.from("concepto_nomina").select("*"),
      supabase
        .from("periodo_nomina")
        .select("*, recibo_nomina(*, recibo_detalle(*))")
        .eq("company_id", companyId)
        .order("fecha_inicio", { ascending: false }),
      supabase.from("company_users").select("user_id").eq("company_id", companyId),
      supabase.from("tabla_fiscal").select("contenido").eq("tipo", "isr_mensual").order("vigencia_desde", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("tabla_fiscal").select("contenido").eq("tipo", "uma").order("vigencia_desde", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("tabla_fiscal").select("contenido").eq("tipo", "imss_obrero").order("vigencia_desde", { ascending: false }).limit(1).maybeSingle(),
    ]);

    setEmpleados(empleadoRows ?? []);
    setDepartamentos(departamentoRows ?? []);
    setIncidencias((incidenciaRows as Incidencia[] | null) ?? []);
    setConceptos(conceptoRows ?? []);
    setPeriodos((periodoRows as PeriodoFull[] | null) ?? []);
    setTramosISR((isrRow?.contenido as TramoISR[] | undefined) ?? []);
    setUmaDiaria(((umaRow?.contenido as { diaria?: number } | undefined)?.diaria) ?? 108.57);
    setFormulaImss((imssRow?.contenido as FormulaImssObrero | undefined) ?? null);

    const empleadoIds = (empleadoRows ?? []).map((e) => e.id);
    if (empleadoIds.length > 0) {
      const [{ data: historialRows }, { data: saldoRows }, { data: finiquitoRows }] = await Promise.all([
        supabase.from("historial_sueldo").select("*").in("empleado_id", empleadoIds).order("fecha_efectiva", { ascending: false }),
        supabase.from("saldo_vacaciones").select("*").in("empleado_id", empleadoIds),
        supabase.from("finiquito").select("*").in("empleado_id", empleadoIds).order("fecha", { ascending: false }),
      ]);
      setHistorialSueldo(historialRows ?? []);
      setSaldosVacaciones(saldoRows ?? []);
      setFiniquitos(finiquitoRows ?? []);
    } else {
      setHistorialSueldo([]);
      setSaldosVacaciones([]);
      setFiniquitos([]);
    }

    const userIds = (memberRows ?? []).map((u) => u.user_id);
    if (userIds.length > 0) {
      const { data: profileRows } = await supabase.from("profiles").select("id, full_name, email").in("id", userIds);
      setCompanyUsers((profileRows ?? []).map((p) => ({ user_id: p.id, full_name: p.full_name, email: p.email })));
    } else {
      setCompanyUsers([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const limits: PersonalTierLimits = limitsForTier(tier);

  return {
    loading,
    tier,
    limits,
    empleados,
    departamentos,
    historialSueldo,
    incidencias,
    saldosVacaciones,
    conceptos,
    periodos,
    finiquitos,
    companyUsers,
    tramosISR,
    umaDiaria,
    formulaImss,
    reload: load,
  };
}
