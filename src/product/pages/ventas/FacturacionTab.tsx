import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Cliente, FacturaEstado } from "../../../lib/database.types";
import type { FacturaFull, PedidoFull } from "./useVentasData";
import type { VentasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const ESTADO_COLOR: Record<FacturaEstado, "muted" | "orange" | "teal" | "ink"> = {
  pendiente: "orange",
  parcial: "orange",
  pagada: "teal",
  vencida: "orange",
  cancelada: "ink",
};

interface Partida {
  descripcion: string;
  cantidad: string;
  precio_unitario: string;
  descuento_pct: string;
}

const PARTIDA_VACIA: Partida = { descripcion: "", cantidad: "1", precio_unitario: "0", descuento_pct: "0" };

function calcularTotales(partidas: Partida[]) {
  let subtotal = 0;
  for (const p of partidas) {
    const cantidad = Number(p.cantidad) || 0;
    const precio = Number(p.precio_unitario) || 0;
    const descPct = Number(p.descuento_pct) || 0;
    subtotal += cantidad * precio * (1 - descPct / 100);
  }
  const iva = subtotal * 0.16;
  return { subtotal, iva, total: subtotal + iva };
}

export default function FacturacionTab({
  companyId,
  clientes,
  pedidos,
  facturas,
  limits,
  reload,
}: {
  companyId: string;
  clientes: Cliente[];
  pedidos: PedidoFull[];
  facturas: FacturaFull[];
  limits: VentasTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);

  const pedidosFacturables = pedidos.filter((p) => p.estado === "abierto" || p.estado === "facturado_parcial");

  function verPdf(f: FacturaFull) {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Factura ${f.folio_interno}</title>
      <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;margin-top:1rem;} td,th{border:1px solid #ccc;padding:6px;text-align:left;font-size:0.85rem;}</style>
      </head><body>
      <h2>Factura ${f.folio_interno}</h2>
      <p><b>Cliente:</b> ${clientes.find((c) => c.id === f.cliente_id)?.razon_social ?? ""}</p>
      <p><b>Fecha:</b> ${f.fecha_emision} · ${f.condicion}${f.fecha_vencimiento ? ` · vence ${f.fecha_vencimiento}` : ""}</p>
      <table><thead><tr><th>Descripción</th><th>Cantidad</th><th>Precio unitario</th><th>Importe</th></tr></thead><tbody>
      ${f.factura_detalle.map((d) => `<tr><td>${d.descripcion}</td><td>${d.cantidad}</td><td>${money(d.precio_unitario)}</td><td>${money(d.importe)}</td></tr>`).join("")}
      </tbody></table>
      <p style="text-align:right;margin-top:1rem;">Subtotal: ${money(f.subtotal)}<br/>IVA: ${money(f.iva)}<br/><b>Total: ${money(f.total)}</b><br/>Saldo pendiente: ${money(f.saldo_pendiente)}</p>
      <script>window.print()</script>
      </body></html>
    `);
    win.document.close();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Facturas</h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Nueva factura
        </button>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {facturas.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin facturas todavía.</p>}
        {facturas.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {f.folio_interno} · {clientes.find((c) => c.id === f.cliente_id)?.razon_social ?? "—"}
              </p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {money(f.total)} · saldo {money(f.saldo_pendiente)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge color={ESTADO_COLOR[f.estado]}>{f.estado}</Badge>
              <button onClick={() => verPdf(f)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink">
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <NewFacturaModal
          companyId={companyId}
          clientes={clientes}
          pedidosFacturables={pedidosFacturables}
          facturasCount={facturas.length}
          limits={limits}
          onClose={() => setShowNew(false)}
          onCreated={reload}
        />
      )}
    </div>
  );
}

function NewFacturaModal({
  companyId,
  clientes,
  pedidosFacturables,
  facturasCount,
  limits,
  onClose,
  onCreated,
}: {
  companyId: string;
  clientes: Cliente[];
  pedidosFacturables: PedidoFull[];
  facturasCount: number;
  limits: VentasTierLimits;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [origen, setOrigen] = useState<"pedido" | "directa">(pedidosFacturables.length > 0 ? "pedido" : "directa");
  const [pedidoId, setPedidoId] = useState(pedidosFacturables[0]?.id ?? "");
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const [condicion, setCondicion] = useState<"contado" | "credito">("contado");
  const [diasCredito, setDiasCredito] = useState("30");
  const [partidas, setPartidas] = useState<Partida[]>([{ ...PARTIDA_VACIA }]);
  const [cantidadesParciales, setCantidadesParciales] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const pedido = pedidosFacturables.find((p) => p.id === pedidoId);
  const lineasPedido = pedido
    ? pedido.pedido_detalle.map((d) => ({
        detalle: d,
        pendiente: Number(d.cantidad) - Number(d.cantidad_facturada),
      }))
    : [];

  const partidasEfectivas: Partida[] =
    origen === "pedido" && pedido
      ? lineasPedido
          .filter((l) => l.pendiente > 0)
          .map((l) => ({
            descripcion: l.detalle.descripcion,
            cantidad: limits.facturacionParcial ? cantidadesParciales[l.detalle.id] ?? String(l.pendiente) : String(l.pendiente),
            precio_unitario: String(l.detalle.precio_unitario),
            descuento_pct: String(l.detalle.descuento_pct),
          }))
      : partidas;

  const { subtotal, iva, total } = calcularTotales(partidasEfectivas);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const finalClienteId = origen === "pedido" ? pedido?.cliente_id : clienteId;
    if (!finalClienteId) return;
    setSaving(true);

    const folio = `FAC-${String(facturasCount + 1).padStart(4, "0")}`;
    const fechaEmision = new Date().toISOString().slice(0, 10);
    const fechaVencimiento =
      condicion === "credito"
        ? new Date(Date.now() + Number(diasCredito) * 86400000).toISOString().slice(0, 10)
        : null;

    const anticiposDisponibles = pedido ? pedido.anticipos_pedido.filter((a) => !a.factura_id) : [];
    const totalAnticipos = anticiposDisponibles.reduce((s, a) => s + Number(a.monto), 0);
    const saldoInicial = Math.max(0, total - totalAnticipos);

    const { data: factura } = await supabase
      .from("facturas")
      .insert({
        company_id: companyId,
        pedido_id: origen === "pedido" ? pedidoId : null,
        cliente_id: finalClienteId,
        folio_interno: folio,
        fecha_emision: fechaEmision,
        condicion,
        fecha_vencimiento: fechaVencimiento,
        subtotal,
        iva,
        total,
        saldo_pendiente: saldoInicial,
        estado: saldoInicial <= 0 ? "pagada" : totalAnticipos > 0 ? "parcial" : "pendiente",
      })
      .select()
      .single();

    if (factura) {
      await supabase.from("factura_detalle").insert(
        partidasEfectivas
          .filter((p) => p.descripcion.trim())
          .map((p) => {
            const cantidad = Number(p.cantidad) || 0;
            const precio = Number(p.precio_unitario) || 0;
            const descPct = Number(p.descuento_pct) || 0;
            return {
              factura_id: factura.id,
              descripcion: p.descripcion,
              cantidad,
              precio_unitario: precio,
              descuento_pct: descPct,
              importe: cantidad * precio * (1 - descPct / 100),
            };
          }),
      );

      for (const anticipo of anticiposDisponibles) {
        await supabase.from("cobros").insert({ factura_id: factura.id, monto: anticipo.monto, tipo: "anticipo" });
        await supabase.from("anticipos_pedido").update({ factura_id: factura.id }).eq("id", anticipo.id);
      }

      if (origen === "pedido" && pedido) {
        for (const l of lineasPedido) {
          const facturado = limits.facturacionParcial ? Number(cantidadesParciales[l.detalle.id] ?? l.pendiente) : l.pendiente;
          if (facturado > 0) {
            await supabase
              .from("pedido_detalle")
              .update({ cantidad_facturada: Number(l.detalle.cantidad_facturada) + facturado })
              .eq("id", l.detalle.id);
          }
        }
        const totalPendienteRestante = lineasPedido.reduce((s, l) => {
          const facturado = limits.facturacionParcial ? Number(cantidadesParciales[l.detalle.id] ?? l.pendiente) : l.pendiente;
          return s + Math.max(0, l.pendiente - facturado);
        }, 0);
        await supabase
          .from("pedidos")
          .update({ estado: totalPendienteRestante > 0 ? "facturado_parcial" : "facturado" })
          .eq("id", pedidoId);
      }

      if (saldoInicial > 0) {
        await supabase.from("mov_esperados").insert({
          company_id: companyId,
          tipo: "ingreso",
          monto: saldoInicial,
          fecha_esperada: fechaVencimiento ?? fechaEmision,
          modulo_origen: "ventas",
          referencia_id: factura.id,
          concepto: `Factura ${folio}`,
        });
      }
    }

    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva factura" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div className="flex gap-2">
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origen === "pedido"} onChange={() => setOrigen("pedido")} disabled={pedidosFacturables.length === 0} />
            Desde pedido
          </label>
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origen === "directa"} onChange={() => setOrigen("directa")} />
            Directa
          </label>
        </div>

        {origen === "pedido" ? (
          <>
            <select
              value={pedidoId}
              onChange={(e) => setPedidoId(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              {pedidosFacturables.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id.slice(0, 8)} · {money(p.total)}
                </option>
              ))}
            </select>
            <div className="space-y-1 border border-ink/10 bg-sand-2 p-3">
              {lineasPedido
                .filter((l) => l.pendiente > 0)
                .map((l) => (
                  <div key={l.detalle.id} className="flex items-center justify-between font-mono text-xs text-ink">
                    <span>
                      {l.detalle.descripcion} (pendiente {l.pendiente})
                    </span>
                    {limits.facturacionParcial ? (
                      <input
                        type="number"
                        max={l.pendiente}
                        value={cantidadesParciales[l.detalle.id] ?? String(l.pendiente)}
                        onChange={(e) => setCantidadesParciales({ ...cantidadesParciales, [l.detalle.id]: e.target.value })}
                        className="w-20 border border-ink/15 bg-white px-2 py-1 text-ink focus:border-teal focus:outline-none"
                      />
                    ) : (
                      <span>{l.pendiente}</span>
                    )}
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              {clientes.length === 0 && <option value="">Sin clientes — captura uno en Prospectos u Oportunidades</option>}
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.razon_social}
                </option>
              ))}
            </select>
            <div className="space-y-2">
              {partidas.map((p, i) => (
                <div key={i} className="grid grid-cols-7 gap-2">
                  <input
                    value={p.descripcion}
                    onChange={(e) => {
                      const next = [...partidas];
                      next[i] = { ...next[i], descripcion: e.target.value };
                      setPartidas(next);
                    }}
                    placeholder="Descripción"
                    className="col-span-3 border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                  />
                  <input
                    type="number"
                    value={p.cantidad}
                    onChange={(e) => {
                      const next = [...partidas];
                      next[i] = { ...next[i], cantidad: e.target.value };
                      setPartidas(next);
                    }}
                    placeholder="Cant."
                    className="border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                  />
                  <input
                    type="number"
                    value={p.precio_unitario}
                    onChange={(e) => {
                      const next = [...partidas];
                      next[i] = { ...next[i], precio_unitario: e.target.value };
                      setPartidas(next);
                    }}
                    placeholder="Precio"
                    className="border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPartidas(partidas.filter((_, idx) => idx !== i))}
                    className="font-mono text-[0.62rem] text-muted hover:text-orange"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPartidas([...partidas, { ...PARTIDA_VACIA }])}
                className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
              >
                + Partida
              </button>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <select
            value={condicion}
            onChange={(e) => setCondicion(e.target.value as "contado" | "credito")}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="contado">Contado</option>
            <option value="credito">Crédito</option>
          </select>
          {condicion === "credito" && (
            <input
              type="number"
              value={diasCredito}
              onChange={(e) => setDiasCredito(e.target.value)}
              placeholder="Días de crédito"
              className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          )}
        </div>

        <p className="text-right font-mono text-xs text-muted">
          Subtotal {money(subtotal)} · IVA {money(iva)} · <b className="text-ink">Total {money(total)}</b>
        </p>

        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear factura"}
        </button>
      </form>
    </Modal>
  );
}
