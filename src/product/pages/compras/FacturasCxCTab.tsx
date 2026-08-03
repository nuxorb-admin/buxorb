import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Proveedor, ProcurementProduct, ProcurementUnit, TreasuryMovement } from "../../../lib/database.types";
import type { CompraFull, FacturaFull } from "./useComprasData";
import { registrarUsoTicket } from "./useComprasData";
import type { ComprasTierLimits } from "./limits";
import { parseCfdiXml } from "./parseCfdi";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

interface TicketResult {
  comercio: string;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
}

// Saldo de una compra: descuenta pagos hechos directo a la compra y las
// notas de crédito que quedaron ligadas a ella (compra_id), sin pasar por
// una factura específica.
function saldoPendienteCompra(compra: CompraFull) {
  const pagado = compra.procurement_purchase_payments.reduce((sum, p) => sum + Number(p.monto), 0);
  const nc = compra.procurement_xml_invoices
    .filter((f) => f.tipo_documento === "nota_credito")
    .reduce((sum, f) => sum + Number(f.total ?? 0), 0);
  return Math.max(0, Number(compra.total) - pagado - nc);
}

// Saldo de una factura suelta (sin compra, o cuyo pago se sigue por la
// factura misma): descuenta sus propios pagos y las NC aplicadas a ella.
function saldoPendienteFactura(factura: FacturaFull) {
  const pagado = factura.procurement_purchase_payments.reduce((sum, p) => sum + Number(p.monto), 0);
  const nc = factura.notasCredito.reduce((sum, f) => sum + Number(f.total ?? 0), 0);
  return Math.max(0, Number(factura.total ?? 0) - pagado - nc);
}

// Fecha de vencimiento para el calendario de pagos: fecha de emisión de
// la factura + días de crédito del proveedor (no la fecha_estimada_pago
// que se captura a mano en la OC — el calendario se basa en el término
// real acordado con el proveedor).
function fechaVencimientoCalendario(cta: CuentaPorPagar, proveedores: Proveedor[]): string | null {
  const diasCredito = proveedores.find((p) => p.id === cta.proveedorId)?.dias_credito_default ?? 0;
  const fechaEmision =
    cta.kind === "factura"
      ? cta.target.fecha_emision
      : (cta.target.procurement_xml_invoices.find((f) => f.tipo_documento === "factura" && f.fecha_emision)?.fecha_emision ??
        cta.target.fecha);
  if (!fechaEmision) return null;
  const d = new Date(fechaEmision);
  d.setDate(d.getDate() + diasCredito);
  return d.toISOString().slice(0, 10);
}

function estadoCartera(fechaEstimada: string | null): "al_corriente" | "por_vencer" | "vencida" {
  if (!fechaEstimada) return "al_corriente";
  const dias = (new Date(fechaEstimada).getTime() - Date.now()) / 86400000;
  if (dias < 0) return "vencida";
  if (dias <= 7) return "por_vencer";
  return "al_corriente";
}

const CARTERA_LABEL = { al_corriente: "Al corriente", por_vencer: "Por vencer", vencida: "Vencida" };
const CARTERA_COLOR = { al_corriente: "teal", por_vencer: "orange", vencida: "orange" } as const;

type CuentaPorPagar =
  | { kind: "compra"; id: string; label: string; proveedorId: string; proveedorNombre: string; saldo: number; vence: string | null; target: CompraFull }
  | { kind: "factura"; id: string; label: string; proveedorId: string; proveedorNombre: string; saldo: number; vence: string | null; target: FacturaFull };

export default function FacturasCxCTab({
  companyId,
  proveedores,
  compras,
  facturas,
  productos,
  unidadesActivas,
  limits,
  ticketsUsados,
  reload,
}: {
  companyId: string;
  proveedores: Proveedor[];
  compras: CompraFull[];
  facturas: FacturaFull[];
  productos: ProcurementProduct[];
  unidadesActivas: ProcurementUnit[];
  limits: ComprasTierLimits;
  ticketsUsados: number;
  reload: () => void;
}) {
  const [showXml, setShowXml] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [pagando, setPagando] = useState<CuentaPorPagar | null>(null);
  const [conciliando, setConciliando] = useState<FacturaFull | null>(null);
  const [vinculando, setVinculando] = useState<CuentaPorPagar | null>(null);

  const pendientesFactura = compras.filter(
    (c) => c.origen === "ticket_ia" && c.procurement_xml_invoices.length === 0,
  );

  const porConciliar = limits.catalogoProductos
    ? facturas.filter((f) => f.tipo_documento === "factura" && f.procurement_order_items.some((i) => !i.producto_id))
    : [];

  const proveedorNombre = (id: string) => proveedores.find((p) => p.id === id)?.razon_social ?? "—";

  const cuentas: CuentaPorPagar[] = [
    ...compras
      .filter((c) => c.estado !== "cancelada" && saldoPendienteCompra(c) > 0)
      .map((c): CuentaPorPagar => ({
        kind: "compra",
        id: c.id,
        label: c.folio,
        proveedorId: c.proveedor_id,
        proveedorNombre: proveedorNombre(c.proveedor_id),
        saldo: saldoPendienteCompra(c),
        vence: c.fecha_estimada_pago,
        target: c,
      })),
    ...facturas
      .filter((f) => f.tipo_documento === "factura" && f.compra_id === null && saldoPendienteFactura(f) > 0)
      .map((f): CuentaPorPagar => ({
        kind: "factura",
        id: f.id,
        label: f.uuid_fiscal ? `Factura ${f.uuid_fiscal.slice(0, 8)}…` : "Factura",
        proveedorId: f.proveedor_id,
        proveedorNombre: proveedorNombre(f.proveedor_id),
        saldo: saldoPendienteFactura(f),
        vence: f.fecha_emision,
        target: f,
      })),
  ];

  const ticketsAgotados = ticketsUsados >= limits.maxTicketsIAPorMes;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={() => setShowXml(true)} className="btn btn-outline">
          + Cargar XML (CFDI)
        </button>
        <button
          onClick={() => setShowTicket(true)}
          disabled={ticketsAgotados}
          className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Capturar ticket ({ticketsUsados}/{limits.maxTicketsIAPorMes} este mes)
        </button>
      </div>

      {pendientesFactura.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Pendientes de factura
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {pendientesFactura.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{c.folio}</p>
                  <p className="font-mono text-[0.66rem] text-muted">{money(c.total)} · capturada por ticket</p>
                </div>
                <Badge color="orange">Sin factura</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {porConciliar.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Facturas por conciliar
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {porConciliar.map((f) => (
              <div key={f.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {proveedorNombre(f.proveedor_id)} · {f.uuid_fiscal ? `${f.uuid_fiscal.slice(0, 8)}…` : "Factura"}
                  </p>
                  <p className="font-mono text-[0.66rem] text-muted">{money(f.total ?? 0)}</p>
                </div>
                <button
                  onClick={() => setConciliando(f)}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Asignar SKU's por conceptos
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Cuentas por pagar
      </h3>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {cuentas.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin saldos pendientes.</p>}
        {cuentas.map((cta) => {
          const estado = estadoCartera(cta.vence);
          return (
            <div key={`${cta.kind}-${cta.id}`} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {cta.proveedorNombre} · {cta.label}
                  {cta.kind === "factura" && (
                    <span className="ml-2 font-mono text-[0.6rem] uppercase text-muted">(sin OC)</span>
                  )}
                </p>
                <p className="font-mono text-[0.66rem] text-muted">
                  Vence {cta.vence ?? "—"} · Saldo {money(cta.saldo)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={CARTERA_COLOR[estado]}>{CARTERA_LABEL[estado]}</Badge>
                <button
                  onClick={() => setVinculando(cta)}
                  className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink"
                >
                  Vincular banco
                </button>
                <button
                  onClick={() => setPagando(cta)}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Registrar pago
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {limits.antiguedadYCalendarioPagos && cuentas.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Antigüedad de saldos
          </h3>
          <AntiguedadSaldos cuentas={cuentas} />
        </>
      )}

      {limits.antiguedadYCalendarioPagos && cuentas.length > 0 && (
        <CalendarioPagos cuentas={cuentas} proveedores={proveedores} />
      )}

      {showXml && (
        <XmlUploadModal
          companyId={companyId}
          proveedores={proveedores}
          pendientesFactura={pendientesFactura}
          facturas={facturas}
          matchEnabled={limits.matchFacturaVsOC}
          onClose={() => setShowXml(false)}
          onDone={reload}
        />
      )}

      {showTicket && (
        <TicketUploadModal companyId={companyId} onClose={() => setShowTicket(false)} onDone={reload} />
      )}

      {pagando && (
        <PagoModal cuenta={pagando} onClose={() => setPagando(null)} onPaid={reload} />
      )}

      {vinculando && (
        <VincularBancoModal
          companyId={companyId}
          cuentaInicial={vinculando}
          cuentas={cuentas.filter((c) => c.proveedorId === vinculando.proveedorId)}
          onClose={() => setVinculando(null)}
          onDone={reload}
        />
      )}

      {conciliando && (
        <ConciliacionModal
          companyId={companyId}
          factura={conciliando}
          compras={compras}
          productos={productos}
          unidadesActivas={unidadesActivas}
          onClose={() => setConciliando(null)}
          onDone={reload}
        />
      )}
    </div>
  );
}

function AntiguedadSaldos({ cuentas }: { cuentas: CuentaPorPagar[] }) {
  const buckets = { "1-30": 0, "31-60": 0, "61+": 0, "por vencer": 0 };
  for (const cta of cuentas) {
    if (!cta.vence) continue;
    const dias = Math.floor((Date.now() - new Date(cta.vence).getTime()) / 86400000);
    if (dias < 0) buckets["por vencer"] += cta.saldo;
    else if (dias <= 30) buckets["1-30"] += cta.saldo;
    else if (dias <= 60) buckets["31-60"] += cta.saldo;
    else buckets["61+"] += cta.saldo;
  }
  return (
    <div className="grid grid-cols-4 gap-3">
      {Object.entries(buckets).map(([label, monto]) => (
        <div key={label} className="border border-ink/10 bg-white p-3 text-center">
          <p className="font-mono text-[0.6rem] uppercase text-muted">{label}</p>
          <p className="font-mono text-sm font-bold text-ink">{money(monto)}</p>
        </div>
      ))}
    </div>
  );
}

function CalendarioPagos({ cuentas, proveedores }: { cuentas: CuentaPorPagar[]; proveedores: Proveedor[] }) {
  const conFecha = cuentas
    .map((cta) => ({ cta, fecha: fechaVencimientoCalendario(cta, proveedores) }))
    .filter((e): e is { cta: CuentaPorPagar; fecha: string } => !!e.fecha)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const porMes = new Map<string, { cta: CuentaPorPagar; fecha: string }[]>();
  for (const e of conFecha) {
    const mes = e.fecha.slice(0, 7);
    if (!porMes.has(mes)) porMes.set(mes, []);
    porMes.get(mes)!.push(e);
  }

  function exportarCsv() {
    const filas = [
      ["Fecha de vencimiento", "Proveedor", "Referencia", "Monto"],
      ...conFecha.map((e) => [e.fecha, e.cta.proveedorNombre, e.cta.label, String(e.cta.saldo)]),
    ];
    const csv = filas.map((f) => f.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calendario-pagos-${todayIso()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Calendario de pagos
        </h3>
        {conFecha.length > 0 && (
          <button onClick={exportarCsv} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
            Exportar CSV
          </button>
        )}
      </div>
      {conFecha.length === 0 && (
        <p className="font-mono text-xs text-muted">Sin fechas de vencimiento calculables todavía.</p>
      )}
      {[...porMes.entries()].map(([mes, entradas]) => (
        <div key={mes} className="mb-4">
          <p className="mb-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-ink">
            {new Date(`${mes}-01T00:00:00`).toLocaleDateString("es-MX", { month: "long", year: "numeric" })} ·{" "}
            {money(entradas.reduce((sum, e) => sum + e.cta.saldo, 0))}
          </p>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {entradas.map((e) => (
              <div key={`${e.cta.kind}-${e.cta.id}`} className="flex items-center justify-between px-4 py-2">
                <p className="font-mono text-[0.66rem] text-ink">
                  {e.fecha} · {e.cta.proveedorNombre} · {e.cta.label}
                </p>
                <p className="font-mono text-[0.66rem] font-bold text-ink">{money(e.cta.saldo)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function XmlUploadModal({
  companyId,
  proveedores,
  pendientesFactura,
  facturas,
  matchEnabled,
  onClose,
  onDone,
}: {
  companyId: string;
  proveedores: Proveedor[];
  pendientesFactura: CompraFull[];
  facturas: FacturaFull[];
  matchEnabled: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [parsed, setParsed] = useState<ReturnType<typeof parseCfdiXml> | null>(null);
  const [linkTo, setLinkTo] = useState<string>("");
  const [ncTarget, setNcTarget] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const facturasAplicables = facturas.filter((f) => f.tipo_documento === "factura");

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLinkTo("");
    try {
      const text = await file.text();
      const result = parseCfdiXml(text);
      setParsed(result);
      if (result.tipoDocumento === "nota_credito" && result.uuidRelacionado) {
        const match = facturasAplicables.find((f) => f.uuid_fiscal === result.uuidRelacionado);
        setNcTarget(match?.id ?? "");
      } else {
        setNcTarget("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo leer el XML");
    }
  }

  async function confirm() {
    if (!parsed) return;
    setError(null);

    if (parsed.uuidFiscal) {
      const { data: dup } = await supabase
        .from("procurement_xml_invoices")
        .select("id")
        .eq("uuid_fiscal", parsed.uuidFiscal)
        .maybeSingle();
      if (dup) {
        setError("Este CFDI ya fue cargado antes (mismo UUID fiscal).");
        return;
      }
    }

    if (parsed.tipoDocumento === "nota_credito" && !ncTarget) {
      setError("Selecciona a qué factura aplica esta nota de crédito.");
      return;
    }

    setSaving(true);

    let proveedor = proveedores.find((p) => p.rfc === parsed.rfcEmisor);
    if (!proveedor) {
      const { data: created } = await supabase
        .from("procurement_suppliers")
        .insert({ company_id: companyId, razon_social: parsed.nombreEmisor, rfc: parsed.rfcEmisor })
        .select()
        .single();
      proveedor = created ?? undefined;
    }
    if (!proveedor) {
      setSaving(false);
      return;
    }

    const facturaAplicada = ncTarget ? facturasAplicables.find((f) => f.id === ncTarget) : undefined;
    const compraDestino = linkTo || facturaAplicada?.compra_id || null;

    let estadoMatch: "ok" | "con_diferencias" | null = null;
    if (parsed.tipoDocumento === "factura" && matchEnabled && linkTo) {
      const compra = pendientesFactura.find((c) => c.id === linkTo);
      estadoMatch = compra ? (Math.abs(compra.total - parsed.total) > 0.5 ? "con_diferencias" : "ok") : null;
    }

    const { data: factura, error: insertError } = await supabase
      .from("procurement_xml_invoices")
      .insert({
        company_id: companyId,
        proveedor_id: proveedor.id,
        compra_id: compraDestino,
        tipo_documento: parsed.tipoDocumento,
        nc_aplica_factura_id: ncTarget || null,
        uuid_fiscal: parsed.uuidFiscal,
        rfc_emisor: parsed.rfcEmisor,
        fecha_emision: parsed.fecha,
        subtotal: parsed.subtotal,
        iva: parsed.total - parsed.subtotal,
        total: parsed.total,
        estado_match: estadoMatch,
      })
      .select()
      .single();

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? "Este CFDI ya fue cargado antes (mismo UUID fiscal)."
          : "No se pudo guardar la factura.",
      );
      setSaving(false);
      return;
    }

    if (factura) {
      if (parsed.conceptos.length > 0) {
        await supabase.from("procurement_order_items").insert(
          parsed.conceptos.map((c) => ({
            factura_id: factura.id,
            compra_id: compraDestino,
            descripcion: c.descripcion,
            cantidad: c.cantidad,
            precio_unitario: c.precio_unitario,
            importe: c.importe,
            uuid_fiscal: parsed.uuidFiscal,
          })),
        );
      }
    }

    setSaving(false);
    onDone();
    onClose();
  }

  return (
    <Modal title="Cargar XML (CFDI)" onClose={onClose}>
      <div className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <input
          type="file"
          accept=".xml"
          onChange={onFile}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink"
        />
        {parsed && (
          <>
            <div className="border border-ink/10 bg-sand-2 p-3 font-mono text-xs text-ink">
              <p className="mb-1">
                <Badge color={parsed.tipoDocumento === "nota_credito" ? "orange" : "teal"}>
                  {parsed.tipoDocumento === "nota_credito" ? "Nota de crédito" : "Factura"}
                </Badge>
              </p>
              <p>Emisor: {parsed.nombreEmisor} ({parsed.rfcEmisor})</p>
              <p>Fecha: {parsed.fecha}</p>
              <p>Total: {money(parsed.total)}</p>
              <p>UUID: {parsed.uuidFiscal ?? "—"}</p>
            </div>
            {parsed.conceptos.length > 0 && (
              <div className="max-h-48 overflow-y-auto border border-ink/10 bg-white">
                <table className="w-full font-mono text-[0.66rem] text-ink">
                  <thead>
                    <tr className="border-b border-ink/10 text-left text-muted">
                      <th className="px-2 py-1">Concepto</th>
                      <th className="px-2 py-1 text-right">Cant.</th>
                      <th className="px-2 py-1 text-right">P. unit.</th>
                      <th className="px-2 py-1 text-right">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.conceptos.map((c, i) => (
                      <tr key={i} className="border-b border-ink/5">
                        <td className="px-2 py-1">{c.descripcion}</td>
                        <td className="px-2 py-1 text-right">{c.cantidad}</td>
                        <td className="px-2 py-1 text-right">{money(c.precio_unitario)}</td>
                        <td className="px-2 py-1 text-right">{money(c.importe)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {parsed.tipoDocumento === "nota_credito" ? (
              <div>
                <label className="mb-1 block font-mono text-[0.62rem] uppercase text-muted">
                  Aplicar a factura
                </label>
                <select
                  value={ncTarget}
                  onChange={(e) => setNcTarget(e.target.value)}
                  className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
                >
                  <option value="">Selecciona la factura que abona/cancela</option>
                  {facturasAplicables.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.uuid_fiscal ? `${f.uuid_fiscal.slice(0, 8)}…` : f.id} · {money(f.total ?? 0)}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              pendientesFactura.length > 0 && (
                <div>
                  <label className="mb-1 block font-mono text-[0.62rem] uppercase text-muted">
                    Vincular con orden de compra pendiente de factura (opcional)
                  </label>
                  <select
                    value={linkTo}
                    onChange={(e) => setLinkTo(e.target.value)}
                    className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
                  >
                    <option value="">Dejar la factura sin vincular a una OC</option>
                    {pendientesFactura.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.folio} · {money(c.total)}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}
            <button onClick={confirm} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Guardando…" : "Confirmar"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function TicketUploadModal({
  companyId,
  onClose,
  onDone,
}: {
  companyId: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TicketResult | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fileToBase64(f: File): Promise<string> {
    const buf = await f.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  async function extract() {
    if (!file) return;
    setError(null);
    setExtracting(true);
    const file_base64 = await fileToBase64(file);
    const { data, error: fnError } = await supabase.functions.invoke("parse-purchase-ticket", {
      body: { company_id: companyId, file_base64, media_type: file.type || "image/jpeg" },
    });
    setExtracting(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo leer el ticket");
      return;
    }
    setResult(data.result);
  }

  async function confirm() {
    if (!result) return;
    setSaving(true);

    let proveedor = null as { id: string } | null;
    const { data: existing } = await supabase
      .from("procurement_suppliers")
      .select("id")
      .eq("company_id", companyId)
      .eq("razon_social", result.comercio)
      .maybeSingle();
    if (existing) {
      proveedor = existing;
    } else {
      const { data: created } = await supabase
        .from("procurement_suppliers")
        .insert({ company_id: companyId, razon_social: result.comercio || "Proveedor de ticket" })
        .select()
        .single();
      proveedor = created;
    }
    if (!proveedor) {
      setSaving(false);
      return;
    }

    const folio = `TK-${Date.now().toString().slice(-6)}`;
    const { data: compra } = await supabase
      .from("procurement_orders")
      .insert({
        company_id: companyId,
        folio,
        proveedor_id: proveedor.id,
        fecha: result.fecha,
        subtotal: result.subtotal,
        iva: result.iva,
        total: result.total,
        condicion_pago: "contado",
        fecha_estimada_pago: result.fecha,
        estado: "aprobada",
        origen: "ticket_ia",
      })
      .select()
      .single();

    if (compra) {
      await supabase.from("procurement_order_items").insert({
        compra_id: compra.id,
        descripcion: `Ticket ${result.comercio}`,
        cantidad: 1,
        precio_unitario: result.total,
        importe: result.total,
      });
      await supabase.from("procurement_purchase_tickets").insert({
        compra_id: compra.id,
        resultado_ia: result,
        estado: "confirmado",
      });
    }

    await registrarUsoTicket(companyId);

    setSaving(false);
    onDone();
    onClose();
  }

  return (
    <Modal title="Capturar ticket" onClose={onClose}>
      <div className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setResult(null);
          }}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink"
        />
        {!result && (
          <button onClick={extract} disabled={!file || extracting} className="btn btn-primary w-full">
            {extracting ? "Leyendo con IA…" : "Extraer con IA"}
          </button>
        )}
        {result && (
          <>
            <div className="border border-ink/10 bg-sand-2 p-3 font-mono text-xs text-ink">
              <p>Comercio: {result.comercio}</p>
              <p>Fecha: {result.fecha}</p>
              <p>Total: {money(result.total)}</p>
            </div>
            <button onClick={confirm} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Guardando…" : "Confirmar y crear compra"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function sugerirProducto(descripcion: string, productos: ProcurementProduct[]): string {
  const texto = descripcion.trim().toLowerCase();
  if (!texto) return "";
  const match = productos.find(
    (p) => texto.includes(p.nombre.toLowerCase()) || p.nombre.toLowerCase().includes(texto),
  );
  return match?.id ?? "";
}

const NUEVO_PRODUCTO = "__nuevo__";

function ConciliacionModal({
  companyId,
  factura,
  compras,
  productos,
  unidadesActivas,
  onClose,
  onDone,
}: {
  companyId: string;
  factura: FacturaFull;
  compras: CompraFull[];
  productos: ProcurementProduct[];
  unidadesActivas: ProcurementUnit[];
  onClose: () => void;
  onDone: () => void;
}) {
  const [productosCreados, setProductosCreados] = useState<ProcurementProduct[]>([]);
  const productosActivos = [...productos.filter((p) => p.activo), ...productosCreados];
  const [asignaciones, setAsignaciones] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const item of factura.procurement_order_items) {
      init[item.id] = item.producto_id ?? sugerirProducto(item.descripcion, productosActivos);
    }
    return init;
  });
  const [creandoPara, setCreandoPara] = useState<{ itemId: string; descripcion: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const compraLigada = factura.compra_id ? compras.find((c) => c.id === factura.compra_id) : undefined;

  async function guardar() {
    setSaving(true);

    await Promise.all(
      Object.entries(asignaciones)
        .filter(([, productoId]) => productoId)
        .map(([itemId, productoId]) =>
          supabase.from("procurement_order_items").update({ producto_id: productoId }).eq("id", itemId),
        ),
    );

    if (compraLigada) {
      const porProductoOC = new Map<string, number>();
      for (const item of compraLigada.procurement_order_items) {
        if (!item.producto_id) continue;
        porProductoOC.set(item.producto_id, (porProductoOC.get(item.producto_id) ?? 0) + Number(item.cantidad));
      }
      const porProductoFactura = new Map<string, number>();
      for (const item of factura.procurement_order_items) {
        const productoId = asignaciones[item.id];
        if (!productoId) continue;
        porProductoFactura.set(productoId, (porProductoFactura.get(productoId) ?? 0) + Number(item.cantidad));
      }
      const mismosProductos =
        porProductoOC.size === porProductoFactura.size &&
        [...porProductoOC.entries()].every(([productoId, cant]) => porProductoFactura.get(productoId) === cant);
      await supabase
        .from("procurement_xml_invoices")
        .update({ estado_match: mismosProductos ? "ok" : "con_diferencias" })
        .eq("id", factura.id);
    }

    setSaving(false);
    onDone();
    onClose();
  }

  const faltantes = factura.procurement_order_items.filter((item) => !asignaciones[item.id]).length;

  return (
    <Modal title="Asignar SKU's por conceptos" onClose={onClose}>
      <div className="space-y-3">
        {compraLigada && (
          <p className="font-mono text-[0.62rem] text-muted">
            Ligada a la OC {compraLigada.folio} — se compara producto por producto contra lo pedido.
          </p>
        )}
        <div className="space-y-2">
          {factura.procurement_order_items.map((item) => (
            <div key={item.id} className="grid grid-cols-2 gap-2 border border-ink/10 bg-sand-2 p-2">
              <div className="font-mono text-[0.66rem] text-ink">
                {item.descripcion}
                <br />
                <span className="text-muted">
                  {item.cantidad} × {money(item.precio_unitario)}
                </span>
              </div>
              <select
                value={asignaciones[item.id] ?? ""}
                onChange={(e) => {
                  if (e.target.value === NUEVO_PRODUCTO) {
                    setCreandoPara({ itemId: item.id, descripcion: item.descripcion });
                    return;
                  }
                  setAsignaciones({ ...asignaciones, [item.id]: e.target.value });
                }}
                className="border border-ink/15 bg-white px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
              >
                <option value="">Sin producto</option>
                {productosActivos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.sku ? `(${p.sku})` : ""}
                  </option>
                ))}
                <option value={NUEVO_PRODUCTO}>+ Crear nuevo producto…</option>
              </select>
            </div>
          ))}
        </div>
        {faltantes > 0 && (
          <p className="font-mono text-[0.62rem] text-orange">
            {faltantes} concepto(s) sin producto asignado — se guardarán sin conciliar.
          </p>
        )}
        <button onClick={guardar} disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar conciliación"}
        </button>
      </div>

      {creandoPara && (
        <NuevoProductoModal
          companyId={companyId}
          nombreSugerido={creandoPara.descripcion}
          unidadesActivas={unidadesActivas}
          onClose={() => setCreandoPara(null)}
          onCreated={(producto) => {
            setProductosCreados([...productosCreados, producto]);
            setAsignaciones({ ...asignaciones, [creandoPara.itemId]: producto.id });
            setCreandoPara(null);
          }}
        />
      )}
    </Modal>
  );
}

function NuevoProductoModal({
  companyId,
  nombreSugerido,
  unidadesActivas,
  onClose,
  onCreated,
}: {
  companyId: string;
  nombreSugerido: string;
  unidadesActivas: ProcurementUnit[];
  onClose: () => void;
  onCreated: (producto: ProcurementProduct) => void;
}) {
  const [sku, setSku] = useState("");
  const [nombre, setNombre] = useState(nombreSugerido);
  const [descripcion, setDescripcion] = useState("");
  const [unidad, setUnidad] = useState(unidadesActivas[0]?.codigo ?? "pza");
  const [costoReferencia, setCostoReferencia] = useState("0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !sku.trim()) return;
    setSaving(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from("procurement_products")
      .insert({
        company_id: companyId,
        sku: sku.trim(),
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || null,
        unidad,
        costo_referencia: Number(costoReferencia),
      })
      .select()
      .single();
    setSaving(false);
    if (insertError || !data) {
      setError(insertError?.code === "23505" ? "Ya existe un producto con ese SKU." : "No se pudo crear el producto.");
      return;
    }
    onCreated(data);
  }

  return (
    <Modal title="Nuevo producto en el catálogo" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU interno"
          required
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={costoReferencia}
            onChange={(e) => setCostoReferencia(e.target.value)}
            placeholder="Costo de referencia"
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {unidadesActivas.length === 0 && <option value={unidad}>{unidad}</option>}
            {unidadesActivas.map((u) => (
              <option key={u.id} value={u.codigo}>
                {u.nombre} ({u.codigo})
              </option>
            ))}
          </select>
        </div>
        <p className="font-mono text-[0.6rem] text-muted">
          Inserta las unidades que necesitas para tu inventario (ejemplo: mides en ml un líquido, debes poner ml; si
          recibes un litro se hará la conversión a 1000 ml).
        </p>
        <button type="submit" disabled={saving || !nombre.trim() || !sku.trim()} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear producto y usarlo aquí"}
        </button>
      </form>
    </Modal>
  );
}

function PagoModal({
  cuenta,
  onClose,
  onPaid,
}: {
  cuenta: CuentaPorPagar;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [monto, setMonto] = useState(String(cuenta.saldo));
  const [referencia, setReferencia] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (cuenta.kind === "compra") {
      await supabase.from("procurement_purchase_payments").insert({ compra_id: cuenta.id, monto: Number(monto), referencia });
      if (cuenta.saldo - Number(monto) <= 0) {
        await supabase.from("procurement_orders").update({ estado: "pagada" }).eq("id", cuenta.id);
      }
    } else {
      await supabase.from("procurement_purchase_payments").insert({ factura_id: cuenta.id, monto: Number(monto), referencia });
    }
    setSaving(false);
    onPaid();
    onClose();
  }

  return (
    <Modal title={`Registrar pago — ${cuenta.label}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          placeholder="Referencia"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Registrar pago"}
        </button>
      </form>
    </Modal>
  );
}

// Un egreso bancario ya usado en un match de compras (tiene al menos un
// procurement_purchase_payments que lo referencia) no puede volver a
// cruzarse — por eso se excluye aquí, no se filtra por "restante".
function VincularBancoModal({
  companyId,
  cuentaInicial,
  cuentas,
  onClose,
  onDone,
}: {
  companyId: string;
  cuentaInicial: CuentaPorPagar;
  cuentas: CuentaPorPagar[];
  onClose: () => void;
  onDone: () => void;
}) {
  const [movimientos, setMovimientos] = useState<TreasuryMovement[] | null>(null);
  const [movimientoId, setMovimientoId] = useState("");
  const [asignaciones, setAsignaciones] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: egresos }, { data: usados }] = await Promise.all([
        supabase
          .from("treasury_movements")
          .select("*")
          .eq("company_id", companyId)
          .eq("type", "egreso")
          .order("entry_date", { ascending: false })
          .limit(200),
        supabase.from("procurement_purchase_payments").select("treasury_movement_id").not("treasury_movement_id", "is", null),
      ]);
      const usadosIds = new Set((usados ?? []).map((u) => u.treasury_movement_id));
      setMovimientos((egresos ?? []).filter((m) => !usadosIds.has(m.id)));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const movimiento = movimientos?.find((m) => m.id === movimientoId) ?? null;
  const asignado = Object.values(asignaciones).reduce((sum, v) => sum + (Number(v) || 0), 0);
  const restante = movimiento ? Number(movimiento.amount) - asignado : 0;

  function elegirMovimiento(id: string) {
    setMovimientoId(id);
    const mov = movimientos?.find((m) => m.id === id);
    if (!mov) return;
    const key = `${cuentaInicial.kind}-${cuentaInicial.id}`;
    setAsignaciones({ [key]: String(Math.min(cuentaInicial.saldo, Number(mov.amount))) });
  }

  async function confirmar() {
    if (!movimiento) return;
    if (asignado <= 0) {
      setError("Asigna al menos un monto a alguna cuenta.");
      return;
    }
    if (asignado > Number(movimiento.amount) + 0.01) {
      setError("La suma asignada no puede superar el monto del movimiento.");
      return;
    }
    setSaving(true);
    setError(null);

    for (const cta of cuentas) {
      const key = `${cta.kind}-${cta.id}`;
      const monto = Number(asignaciones[key] ?? 0);
      if (monto <= 0) continue;
      if (cta.kind === "compra") {
        await supabase.from("procurement_purchase_payments").insert({
          compra_id: cta.id,
          monto,
          referencia: movimiento.concept,
          treasury_movement_id: movimiento.id,
        });
        if (cta.saldo - monto <= 0) {
          await supabase.from("procurement_orders").update({ estado: "pagada" }).eq("id", cta.id);
        }
      } else {
        await supabase.from("procurement_purchase_payments").insert({
          factura_id: cta.id,
          monto,
          referencia: movimiento.concept,
          treasury_movement_id: movimiento.id,
        });
      }
    }

    setSaving(false);
    onDone();
    onClose();
  }

  return (
    <Modal title={`Vincular movimiento bancario — ${cuentaInicial.proveedorNombre}`} onClose={onClose}>
      <div className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        {movimientos === null && <p className="font-mono text-xs text-muted">Cargando egresos…</p>}
        {movimientos?.length === 0 && (
          <p className="font-mono text-xs text-muted">No hay egresos bancarios disponibles para cruzar.</p>
        )}
        {movimientos && movimientos.length > 0 && (
          <select
            value={movimientoId}
            onChange={(e) => elegirMovimiento(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">Selecciona un egreso bancario…</option>
            {movimientos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.entry_date} · {m.concept} · {money(m.amount)}
              </option>
            ))}
          </select>
        )}

        {movimiento && (
          <>
            <p className="font-mono text-[0.62rem] text-muted">
              Reparte el monto de este egreso entre las cuentas de {cuentaInicial.proveedorNombre} que cubre. Solo
              puede cruzarse con cuentas del mismo proveedor.
            </p>
            <div className="space-y-2">
              {cuentas.map((cta) => {
                const key = `${cta.kind}-${cta.id}`;
                return (
                  <div key={key} className="grid grid-cols-2 gap-2 border border-ink/10 bg-sand-2 p-2">
                    <div className="font-mono text-[0.66rem] text-ink">
                      {cta.label}
                      <br />
                      <span className="text-muted">Saldo {money(cta.saldo)}</span>
                    </div>
                    <input
                      type="number"
                      value={asignaciones[key] ?? ""}
                      onChange={(e) => setAsignaciones({ ...asignaciones, [key]: e.target.value })}
                      placeholder="0"
                      className="border border-ink/15 bg-white px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
            <p className="text-right font-mono text-xs text-muted">
              Restante por asignar: <b className={restante < 0 ? "text-orange" : "text-ink"}>{money(restante)}</b>
            </p>
            <button onClick={confirmar} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Guardando…" : "Confirmar cruce"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
