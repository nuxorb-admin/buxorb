import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  AnticipoPedido,
  Cliente,
  CompanyModuleTier,
  Cobro,
  Cotizacion,
  CotizacionDetalle,
  EtapaPipeline,
  Factura,
  FacturaDetalle,
  MotivoPerdida,
  Oportunidad,
  Pedido,
  PedidoDetalle,
  ProductoServicio,
  Prospecto,
  VentasSettings,
} from "../../../lib/database.types";
import { limitsForTier, type VentasTierLimits } from "./limits";

export interface CotizacionFull extends Cotizacion {
  sales_quote_items: CotizacionDetalle[];
}

export interface PedidoFull extends Pedido {
  sales_order_items: PedidoDetalle[];
  sales_order_advances: AnticipoPedido[];
}

export interface FacturaFull extends Factura {
  sales_invoice_items: FacturaDetalle[];
  sales_collections: Cobro[];
}

interface CompanyUserRow {
  user_id: string;
  full_name: string | null;
  email: string;
}

export function useVentasData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<CompanyModuleTier | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [etapasPipeline, setEtapasPipeline] = useState<EtapaPipeline[]>([]);
  const [motivosPerdida, setMotivosPerdida] = useState<MotivoPerdida[]>([]);
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([]);
  const [productosServicios, setProductosServicios] = useState<ProductoServicio[]>([]);
  const [settings, setSettings] = useState<VentasSettings>({ company_id: companyId, umbral_descuento_pct: 20 });
  const [cotizaciones, setCotizaciones] = useState<CotizacionFull[]>([]);
  const [pedidos, setPedidos] = useState<PedidoFull[]>([]);
  const [facturas, setFacturas] = useState<FacturaFull[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUserRow[]>([]);

  async function load() {
    setLoading(true);

    const { data: moduleRow } = await supabase
      .schema("nuxorb").from("company_modules")
      .select("tier")
      .eq("company_id", companyId)
      .eq("module", "ventas_cxc")
      .maybeSingle();
    setTier(moduleRow?.tier ?? null);

    let { data: settingsRow } = await supabase.from("sales_settings").select("*").eq("company_id", companyId).maybeSingle();
    if (!settingsRow) {
      const { data: created } = await supabase.from("sales_settings").insert({ company_id: companyId }).select().single();
      settingsRow = created ?? settingsRow;
    }
    setSettings(settingsRow ?? { company_id: companyId, umbral_descuento_pct: 20 });

    const [
      { data: clienteRows },
      { data: prospectoRows },
      { data: etapaRows },
      { data: motivoRows },
      { data: oportunidadRows },
      { data: productoRows },
      { data: cotizacionRows },
      { data: pedidoRows },
      { data: facturaRows },
      { data: memberRows },
    ] = await Promise.all([
      supabase.from("sales_customers").select("*").eq("company_id", companyId).order("razon_social"),
      supabase.from("sales_prospects").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
      supabase.from("sales_pipeline_stages").select("*").eq("company_id", companyId).order("orden"),
      supabase.from("sales_loss_reasons").select("*").eq("company_id", companyId).order("nombre"),
      supabase.from("sales_opportunities").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
      supabase.from("sales_products_services").select("*").eq("company_id", companyId).order("nombre"),
      supabase
        .from("sales_quotes")
        .select("*, sales_quote_items(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase
        .from("sales_orders")
        .select("*, sales_order_items(*), sales_order_advances(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase
        .from("sales_invoices")
        .select("*, sales_invoice_items(*), sales_collections(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase.from("company_users").select("user_id").eq("company_id", companyId),
    ]);

    setClientes(clienteRows ?? []);
    setProspectos(prospectoRows ?? []);
    setEtapasPipeline(etapaRows ?? []);
    setMotivosPerdida(motivoRows ?? []);
    setOportunidades(oportunidadRows ?? []);
    setProductosServicios(productoRows ?? []);
    setCotizaciones((cotizacionRows as CotizacionFull[] | null) ?? []);
    setPedidos((pedidoRows as PedidoFull[] | null) ?? []);
    setFacturas((facturaRows as FacturaFull[] | null) ?? []);

    const userIds = (memberRows ?? []).map((u) => u.user_id);
    if (userIds.length > 0) {
      const { data: profileRows } = await supabase.schema("nuxorb").from("profiles").select("id, full_name, email").in("id", userIds);
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

  const limits: VentasTierLimits = limitsForTier(tier);

  return {
    loading,
    tier,
    limits,
    clientes,
    prospectos,
    etapasPipeline,
    motivosPerdida,
    oportunidades,
    productosServicios,
    settings,
    cotizaciones,
    pedidos,
    facturas,
    companyUsers,
    reload: load,
  };
}
