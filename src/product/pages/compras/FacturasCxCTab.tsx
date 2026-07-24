import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Proveedor } from "../../../lib/database.types";
import type { CompraFull } from "./useComprasData";
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

function saldoPendiente(compra: CompraFull) {
  const pagado = compra.pagos_compra.reduce((sum, p) => sum + Number(p.monto), 0);
  return Math.max(0, Number(compra.total) - pagado);
}

function estadoCartera(compra: CompraFull): "al_corriente" | "por_vencer" | "vencida" {
  if (!compra.fecha_estimada_pago) return "al_corriente";
  const dias = (new Date(compra.fecha_estimada_pago).getTime() - Date.now()) / 86400000;
  if (dias < 0) return "vencida";
  if (dias <= 7) return "por_vencer";
  return "al_corriente";
}

const CARTERA_LABEL = { al_corriente: "Al corriente", por_vencer: "Por vencer", vencida: "Vencida" };
const CARTERA_COLOR = { al_corriente: "teal", por_vencer: "orange", vencida: "orange" } as const;

export default function FacturasCxCTab({
  companyId,
  proveedores,
  compras,
  limits,
  ticketsUsados,
  reload,
}: {
  companyId: string;
  proveedores: Proveedor[];
  compras: CompraFull[];
  limits: ComprasTierLimits;
  ticketsUsados: number;
  reload: () => void;
}) {
  const [showXml, setShowXml] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [payingCompra, setPayingCompra] = useState<CompraFull | null>(null);

  const pendientesFactura = compras.filter(
    (c) => c.origen === "ticket_ia" && c.facturas_compra.length === 0,
  );
  const conSaldo = compras.filter((c) => saldoPendiente(c) > 0 && c.estado !== "cancelada");
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

      <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Cuentas por pagar
      </h3>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {conSaldo.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin saldos pendientes.</p>}
        {conSaldo.map((c) => {
          const estado = estadoCartera(c);
          return (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {proveedores.find((p) => p.id === c.proveedor_id)?.razon_social} · {c.folio}
                </p>
                <p className="font-mono text-[0.66rem] text-muted">
                  Vence {c.fecha_estimada_pago ?? "—"} · Saldo {money(saldoPendiente(c))}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={CARTERA_COLOR[estado]}>{CARTERA_LABEL[estado]}</Badge>
                <button
                  onClick={() => setPayingCompra(c)}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Registrar pago
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {limits.antiguedadYCalendarioPagos && conSaldo.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Antigüedad de saldos
          </h3>
          <AntiguedadSaldos compras={conSaldo} />
        </>
      )}

      {showXml && (
        <XmlUploadModal
          companyId={companyId}
          proveedores={proveedores}
          pendientesFactura={pendientesFactura}
          matchEnabled={limits.matchFacturaVsOC}
          onClose={() => setShowXml(false)}
          onDone={reload}
        />
      )}

      {showTicket && (
        <TicketUploadModal companyId={companyId} onClose={() => setShowTicket(false)} onDone={reload} />
      )}

      {payingCompra && (
        <PagoModal compra={payingCompra} onClose={() => setPayingCompra(null)} onPaid={reload} />
      )}
    </div>
  );
}

function AntiguedadSaldos({ compras }: { compras: CompraFull[] }) {
  const buckets = { "1-30": 0, "31-60": 0, "61+": 0, "por vencer": 0 };
  for (const c of compras) {
    if (!c.fecha_estimada_pago) continue;
    const dias = Math.floor((Date.now() - new Date(c.fecha_estimada_pago).getTime()) / 86400000);
    const saldo = saldoPendiente(c);
    if (dias < 0) buckets["por vencer"] += saldo;
    else if (dias <= 30) buckets["1-30"] += saldo;
    else if (dias <= 60) buckets["31-60"] += saldo;
    else buckets["61+"] += saldo;
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

function XmlUploadModal({
  companyId,
  proveedores,
  pendientesFactura,
  matchEnabled,
  onClose,
  onDone,
}: {
  companyId: string;
  proveedores: Proveedor[];
  pendientesFactura: CompraFull[];
  matchEnabled: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [parsed, setParsed] = useState<ReturnType<typeof parseCfdiXml> | null>(null);
  const [linkTo, setLinkTo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      const text = await file.text();
      setParsed(parseCfdiXml(text));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo leer el XML");
    }
  }

  async function confirm() {
    if (!parsed) return;
    setSaving(true);

    if (linkTo) {
      const compra = pendientesFactura.find((c) => c.id === linkTo);
      const estadoMatch =
        matchEnabled && compra ? (Math.abs(compra.total - parsed.total) > 0.5 ? "con_diferencias" : "ok") : null;
      await supabase.from("facturas_compra").insert({
        compra_id: linkTo,
        uuid_fiscal: parsed.uuidFiscal,
        rfc_emisor: parsed.rfcEmisor,
        fecha_emision: parsed.fecha,
        subtotal: parsed.subtotal,
        iva: parsed.total - parsed.subtotal,
        total: parsed.total,
        estado_match: estadoMatch,
      });
      setSaving(false);
      onDone();
      onClose();
      return;
    }

    let proveedor = proveedores.find((p) => p.rfc === parsed.rfcEmisor);
    if (!proveedor) {
      const { data: created } = await supabase
        .from("proveedores")
        .insert({ company_id: companyId, razon_social: parsed.nombreEmisor, rfc: parsed.rfcEmisor })
        .select()
        .single();
      proveedor = created ?? undefined;
    }
    if (!proveedor) {
      setSaving(false);
      return;
    }

    const folio = `OC-${Date.now().toString().slice(-6)}`;
    const { data: compra } = await supabase
      .from("compras")
      .insert({
        company_id: companyId,
        folio,
        proveedor_id: proveedor.id,
        fecha: parsed.fecha,
        subtotal: parsed.subtotal,
        iva: parsed.total - parsed.subtotal,
        total: parsed.total,
        moneda: parsed.moneda,
        condicion_pago: "credito",
        dias_credito: proveedor.dias_credito_default || 30,
        fecha_estimada_pago: parsed.fecha,
        estado: "aprobada",
        origen: "xml_cfdi",
      })
      .select()
      .single();

    if (compra) {
      await supabase.from("compra_detalle").insert(
        parsed.conceptos.map((c) => ({
          compra_id: compra.id,
          descripcion: c.descripcion,
          cantidad: c.cantidad,
          precio_unitario: c.precio_unitario,
          importe: c.importe,
        })),
      );
      await supabase.from("facturas_compra").insert({
        compra_id: compra.id,
        uuid_fiscal: parsed.uuidFiscal,
        rfc_emisor: parsed.rfcEmisor,
        fecha_emision: parsed.fecha,
        subtotal: parsed.subtotal,
        iva: parsed.total - parsed.subtotal,
        total: parsed.total,
      });
      await supabase.from("mov_esperados").insert({
        company_id: companyId,
        tipo: "egreso",
        monto: parsed.total,
        fecha_esperada: parsed.fecha,
        modulo_origen: "compras",
        referencia_id: compra.id,
        concepto: `Compra ${folio}`,
      });
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
              <p>Emisor: {parsed.nombreEmisor} ({parsed.rfcEmisor})</p>
              <p>Fecha: {parsed.fecha}</p>
              <p>Total: {money(parsed.total)}</p>
              <p>Conceptos: {parsed.conceptos.length}</p>
            </div>
            {pendientesFactura.length > 0 && (
              <div>
                <label className="mb-1 block font-mono text-[0.62rem] uppercase text-muted">
                  Vincular con compra pendiente de factura (opcional)
                </label>
                <select
                  value={linkTo}
                  onChange={(e) => setLinkTo(e.target.value)}
                  className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
                >
                  <option value="">Crear compra nueva</option>
                  {pendientesFactura.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.folio} · {money(c.total)}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button onClick={confirm} disabled={saving} className="btn btn-primary w-full">
              {saving ? "Guardando…" : "Confirmar y crear compra"}
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
      .from("proveedores")
      .select("id")
      .eq("company_id", companyId)
      .eq("razon_social", result.comercio)
      .maybeSingle();
    if (existing) {
      proveedor = existing;
    } else {
      const { data: created } = await supabase
        .from("proveedores")
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
      .from("compras")
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
      await supabase.from("compra_detalle").insert({
        compra_id: compra.id,
        descripcion: `Ticket ${result.comercio}`,
        cantidad: 1,
        precio_unitario: result.total,
        importe: result.total,
      });
      await supabase.from("tickets_compra").insert({
        compra_id: compra.id,
        resultado_ia: result,
        estado: "confirmado",
      });
      await supabase.from("mov_esperados").insert({
        company_id: companyId,
        tipo: "egreso",
        monto: result.total,
        fecha_esperada: result.fecha,
        modulo_origen: "compras",
        referencia_id: compra.id,
        concepto: `Ticket ${result.comercio}`,
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

function PagoModal({
  compra,
  onClose,
  onPaid,
}: {
  compra: CompraFull;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [monto, setMonto] = useState(String(saldoPendiente(compra)));
  const [referencia, setReferencia] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("pagos_compra").insert({ compra_id: compra.id, monto: Number(monto), referencia });
    const nuevoSaldo = saldoPendiente(compra) - Number(monto);
    if (nuevoSaldo <= 0) {
      await supabase.from("compras").update({ estado: "pagada" }).eq("id", compra.id);
    }
    setSaving(false);
    onPaid();
    onClose();
  }

  return (
    <Modal title={`Registrar pago — ${compra.folio}`} onClose={onClose}>
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
