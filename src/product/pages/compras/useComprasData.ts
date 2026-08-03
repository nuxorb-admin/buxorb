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
  ProcurementInventoryMovement,
  ProcurementProduct,
  ProcurementUnit,
  Proveedor,
  Recepcion,
  ReglaAprobacion,
  Requisicion,
} from "../../../lib/database.types";
import { limitsForTier, type ComprasTierLimits } from "./limits";

export interface CompraFull extends Compra {
  procurement_order_items: CompraDetalle[];
  procurement_order_approvals: AprobacionCompra[];
  procurement_receipts: Recepcion[];
  procurement_xml_invoices: FacturaCompra[];
  procurement_purchase_payments: PagoCompra[];
}

// Una factura (o NC) es un documento fiscal independiente: puede o no
// estar vinculada a una compra, tiene su propio desglose y sus propios
// pagos, y una NC puede colgar de ella para reducir su saldo.
export interface FacturaFull extends FacturaCompra {
  procurement_order_items: CompraDetalle[];
  procurement_purchase_payments: PagoCompra[];
  notasCredito: FacturaCompra[];
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
  const [facturas, setFacturas] = useState<FacturaFull[]>([]);
  const [requisiciones, setRequisiciones] = useState<Requisicion[]>([]);
  const [reglasAprobacion, setReglasAprobacion] = useState<ReglaAprobacion[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUserRow[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionProveedor[]>([]);
  const [ticketsUsados, setTicketsUsados] = useState(0);
  const [productos, setProductos] = useState<ProcurementProduct[]>([]);
  const [inventario, setInventario] = useState<Record<string, number>>({});
  const [unidadesCatalogo, setUnidadesCatalogo] = useState<ProcurementUnit[]>([]);

  async function load() {
    setLoading(true);

    const { data: moduleRow } = await supabase
      .schema("nuxorb").from("company_modules")
      .select("tier")
      .eq("company_id", companyId)
      .eq("module", "compras_proveedores")
      .maybeSingle();
    setTier(moduleRow?.tier ?? null);

    let { data: settingsRow } = await supabase
      .from("procurement_settings")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle();
    if (!settingsRow) {
      const { data: created } = await supabase
        .from("procurement_settings")
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
      { data: facturaRows },
      { data: requisicionRows },
      { data: reglaRows },
      { data: usoRow },
      { data: memberRows },
      { data: productoRows },
      { data: movimientoRows },
      { data: unidadRows },
    ] = await Promise.all([
      supabase.from("procurement_suppliers").select("*").eq("company_id", companyId).order("razon_social"),
      supabase.from("departments").select("*").eq("company_id", companyId).order("nombre"),
      supabase
        .from("procurement_orders")
        .select("*, procurement_order_items(*), procurement_order_approvals(*), procurement_receipts(*), procurement_xml_invoices(*), procurement_purchase_payments(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase
        .from("procurement_xml_invoices")
        .select("*, procurement_order_items(*), procurement_purchase_payments(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase.from("procurement_requisitions").select("*").eq("company_id", companyId).order("fecha", { ascending: false }),
      supabase.from("procurement_approval_rules").select("*").eq("company_id", companyId).order("orden_nivel"),
      supabase
        .from("procurement_ticket_reading_usage")
        .select("*")
        .eq("company_id", companyId)
        .eq("periodo", currentPeriod())
        .maybeSingle(),
      supabase.from("company_users").select("user_id").eq("company_id", companyId),
      supabase.from("procurement_products").select("*").eq("company_id", companyId).order("nombre"),
      supabase.from("procurement_inventory_movements").select("*").eq("company_id", companyId),
      supabase.from("procurement_units").select("*").order("orden"),
    ]);

    setProveedores(proveedorRows ?? []);
    setDepartamentos(departamentoRows ?? []);
    setCompras((compraRows as CompraFull[] | null) ?? []);
    const facturasBase = (facturaRows as (FacturaCompra & { procurement_order_items: CompraDetalle[]; procurement_purchase_payments: PagoCompra[] })[] | null) ?? [];
    setFacturas(
      facturasBase.map((f) => ({
        ...f,
        notasCredito: facturasBase.filter((nc) => nc.nc_aplica_factura_id === f.id),
      })),
    );
    setRequisiciones(requisicionRows ?? []);
    setReglasAprobacion(reglaRows ?? []);
    setTicketsUsados(usoRow?.veces_usado ?? 0);
    setProductos(productoRows ?? []);
    const stock: Record<string, number> = {};
    for (const m of (movimientoRows as ProcurementInventoryMovement[] | null) ?? []) {
      const signo = m.tipo === "entrada" ? 1 : -1;
      stock[m.producto_id] = (stock[m.producto_id] ?? 0) + signo * Number(m.cantidad);
    }
    setInventario(stock);
    setUnidadesCatalogo(unidadRows ?? []);

    const proveedorIds = (proveedorRows ?? []).map((p) => p.id);
    if (proveedorIds.length > 0) {
      const { data: evalRows } = await supabase
        .from("procurement_supplier_evaluations")
        .select("*")
        .in("proveedor_id", proveedorIds);
      setEvaluaciones(evalRows ?? []);
    } else {
      setEvaluaciones([]);
    }

    const userIds = (memberRows ?? []).map((u) => u.user_id);
    if (userIds.length > 0) {
      const { data: profileRows } = await supabase.schema("nuxorb").from("profiles").select("id, full_name, email").in("id", userIds);
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
    facturas,
    requisiciones,
    reglasAprobacion,
    companyUsers,
    evaluaciones,
    ticketsUsados,
    productos,
    inventario,
    unidadesCatalogo,
    reload: load,
  };
}

// El costo de referencia de un producto no se captura a mano — es el
// promedio ponderado (por cantidad) de lo que realmente costó en las
// facturas/tickets que se le fueron asignando. Se recalcula cada vez
// que una línea se liga (o desliga) de este producto — nunca se guarda
// "a ojo": lo que se insertó en la factura fue la presentación real
// comprada (ej. "1 kg" a tal precio), no un costo unitario supuesto.
export async function recalcularCostoReferencia(productoId: string) {
  const { data: items } = await supabase
    .from("procurement_order_items")
    .select("cantidad, precio_unitario")
    .eq("producto_id", productoId)
    .not("factura_id", "is", null);

  const rows = items ?? [];
  const cantidadTotal = rows.reduce((sum, i) => sum + Number(i.cantidad), 0);
  if (cantidadTotal <= 0) return;

  const costoPromedio =
    rows.reduce((sum, i) => sum + Number(i.cantidad) * Number(i.precio_unitario), 0) / cantidadTotal;

  await supabase.from("procurement_products").update({ costo_referencia: costoPromedio }).eq("id", productoId);
}

export async function registrarUsoTicket(companyId: string) {
  const periodo = currentPeriod();
  const { data: existing } = await supabase
    .from("procurement_ticket_reading_usage")
    .select("*")
    .eq("company_id", companyId)
    .eq("periodo", periodo)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("procurement_ticket_reading_usage")
      .update({ veces_usado: existing.veces_usado + 1 })
      .eq("company_id", companyId)
      .eq("periodo", periodo);
  } else {
    await supabase.from("procurement_ticket_reading_usage").insert({ company_id: companyId, periodo, veces_usado: 1 });
  }
}
