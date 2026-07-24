import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  AprobacionCompra,
  Compra,
  CompraDetalle,
  CompanyModuleTier,
  ComprasSettings,
  Departamento,
  EvaluacionProveedor,
  FacturaCompra,
  PagoCompra,
  Proveedor,
  Recepcion,
  ReglaAprobacion,
  Requisicion,
} from "../../../lib/database.types";
import { limitsForTier, type ComprasTierLimits } from "./limits";

export interface CompraFull extends Compra {
  compra_detalle: CompraDetalle[];
  aprobaciones_compra: AprobacionCompra[];
  recepciones: Recepcion[];
  facturas_compra: FacturaCompra[];
  pagos_compra: PagoCompra[];
}

interface CompanyUserRow {
  user_id: string;
  full_name: string | null;
  email: string;
}

function currentPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

export function useComprasData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<CompanyModuleTier | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [settings, setSettings] = useState<ComprasSettings>({ company_id: companyId, aprobacion_activada: false });
  const [compras, setCompras] = useState<CompraFull[]>([]);
  const [requisiciones, setRequisiciones] = useState<Requisicion[]>([]);
  const [reglasAprobacion, setReglasAprobacion] = useState<ReglaAprobacion[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUserRow[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionProveedor[]>([]);
  const [ticketsUsados, setTicketsUsados] = useState(0);

  async function load() {
    setLoading(true);

    const { data: moduleRow } = await supabase
      .from("company_modules")
      .select("tier")
      .eq("company_id", companyId)
      .eq("module", "compras_proveedores")
      .maybeSingle();
    setTier(moduleRow?.tier ?? null);

    let { data: settingsRow } = await supabase
      .from("compras_settings")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle();
    if (!settingsRow) {
      const { data: created } = await supabase
        .from("compras_settings")
        .insert({ company_id: companyId })
        .select()
        .single();
      settingsRow = created ?? settingsRow;
    }
    setSettings(settingsRow ?? { company_id: companyId, aprobacion_activada: false });

    const [
      { data: proveedorRows },
      { data: departamentoRows },
      { data: compraRows },
      { data: requisicionRows },
      { data: reglaRows },
      { data: usoRow },
      { data: memberRows },
    ] = await Promise.all([
      supabase.from("proveedores").select("*").eq("company_id", companyId).order("razon_social"),
      supabase.from("departamentos").select("*").eq("company_id", companyId).order("nombre"),
      supabase
        .from("compras")
        .select("*, compra_detalle(*), aprobaciones_compra(*), recepciones(*), facturas_compra(*), pagos_compra(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase.from("requisiciones").select("*").eq("company_id", companyId).order("fecha", { ascending: false }),
      supabase.from("reglas_aprobacion").select("*").eq("company_id", companyId).order("orden_nivel"),
      supabase
        .from("uso_lectura_tickets")
        .select("*")
        .eq("company_id", companyId)
        .eq("periodo", currentPeriod())
        .maybeSingle(),
      supabase.from("company_users").select("user_id").eq("company_id", companyId),
    ]);

    setProveedores(proveedorRows ?? []);
    setDepartamentos(departamentoRows ?? []);
    setCompras((compraRows as CompraFull[] | null) ?? []);
    setRequisiciones(requisicionRows ?? []);
    setReglasAprobacion(reglaRows ?? []);
    setTicketsUsados(usoRow?.veces_usado ?? 0);

    const proveedorIds = (proveedorRows ?? []).map((p) => p.id);
    if (proveedorIds.length > 0) {
      const { data: evalRows } = await supabase
        .from("evaluacion_proveedor")
        .select("*")
        .in("proveedor_id", proveedorIds);
      setEvaluaciones(evalRows ?? []);
    } else {
      setEvaluaciones([]);
    }

    const userIds = (memberRows ?? []).map((u) => u.user_id);
    if (userIds.length > 0) {
      const { data: profileRows } = await supabase.from("profiles").select("id, full_name, email").in("id", userIds);
      setCompanyUsers(
        (profileRows ?? []).map((p) => ({ user_id: p.id, full_name: p.full_name, email: p.email })),
      );
    } else {
      setCompanyUsers([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const limits: ComprasTierLimits = limitsForTier(tier);

  return {
    loading,
    tier,
    limits,
    proveedores,
    departamentos,
    settings,
    compras,
    requisiciones,
    reglasAprobacion,
    companyUsers,
    evaluaciones,
    ticketsUsados,
    reload: load,
  };
}

export async function registrarUsoTicket(companyId: string) {
  const periodo = currentPeriod();
  const { data: existing } = await supabase
    .from("uso_lectura_tickets")
    .select("*")
    .eq("company_id", companyId)
    .eq("periodo", periodo)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("uso_lectura_tickets")
      .update({ veces_usado: existing.veces_usado + 1 })
      .eq("company_id", companyId)
      .eq("periodo", periodo);
  } else {
    await supabase.from("uso_lectura_tickets").insert({ company_id: companyId, periodo, veces_usado: 1 });
  }
}
