import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Cliente, CotizacionEstado, PedidoEstado, Prospecto, VentasSettings } from "../../../lib/database.types";
import type { CotizacionFull, PedidoFull } from "./useVentasData";
import type { VentasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const ESTADO_COLOR: Record<CotizacionEstado, "muted" | "orange" | "teal" | "ink"> = {
  borrador: "muted",
  enviada: "orange",
  aceptada: "teal",
  rechazada: "ink",
  vencida: "ink",
};

const PEDIDO_ESTADO_COLOR: Record<PedidoEstado, "muted" | "orange" | "teal" | "ink"> = {
  abierto: "orange",
  facturado_parcial: "orange",
  facturado: "teal",
  cancelado: "ink",
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
  let descuentoTotal = 0;
  for (const p of partidas) {
    const cantidad = Number(p.cantidad) || 0;
    const precio = Number(p.precio_unitario) || 0;
    const descPct = Number(p.descuento_pct) || 0;
    const bruto = cantidad * precio;
    descuentoTotal += bruto * (descPct / 100);
    subtotal += bruto * (1 - descPct / 100);
  }
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  return { subtotal, descuentoTotal, iva, total };
}

export default function CotizacionesTab({
  companyId,
  clientes,
  prospectos,
  productosServicios,
  cotizaciones,
  pedidos,
  settings,
  userId,
  limits,
  reload,
}: {
  companyId: string;
  clientes: Cliente[];
  prospectos: Prospecto[];
  productosServicios: ProductoServicioLite[];
  cotizaciones: CotizacionFull[];
  pedidos: PedidoFull[];
  settings: VentasSettings;
  userId: string | null;
  limits: VentasTierLimits;
  reload: () => void;
}) {
  const [showNewProducto, setShowNewProducto] = useState(false);
  const [showNewCotizacion, setShowNewCotizacion] = useState(false);
  const [showNewPedido, setShowNewPedido] = useState(false);
  const [anticipando, setAnticipando] = useState<PedidoFull | null>(null);

  function nombreCliente(c: CotizacionFull) {
    if (c.cliente_id) return clientes.find((cl) => cl.id === c.cliente_id)?.razon_social ?? "—";
    return prospectos.find((p) => p.id === c.prospecto_id)?.nombre ?? "—";
  }

  async function enviar(c: CotizacionFull) {
    if (c.requiere_aprobacion && !c.aprobada_por) return;
    await supabase.from("cotizaciones").update({ estado: "enviada" }).eq("id", c.id);
    reload();
  }

  async function aprobar(c: CotizacionFull) {
    if (!userId) return;
    await supabase.from("cotizaciones").update({ aprobada_por: userId }).eq("id", c.id);
    reload();
  }

  async function marcarAceptada(c: CotizacionFull) {
    await supabase.from("cotizaciones").update({ estado: "aceptada" }).eq("id", c.id);
    reload();
  }

  async function rechazar(c: CotizacionFull) {
    await supabase.from("cotizaciones").update({ estado: "rechazada" }).eq("id", c.id);
    reload();
  }

  async function generarPedido(c: CotizacionFull) {
    if (!c.cliente_id) return;
    const cliente = clientes.find((cl) => cl.id === c.cliente_id);
    const { data: pedido } = await supabase
      .from("pedidos")
      .insert({
        company_id: companyId,
        cotizacion_id: c.id,
        cliente_id: c.cliente_id,
        condicion_pago: (cliente?.dias_credito ?? 0) > 0 ? "credito" : "contado",
        dias_credito: cliente?.dias_credito ?? 0,
        subtotal: c.subtotal,
        iva: c.iva,
        total: c.total,
      })
      .select()
      .single();
    if (pedido) {
      await supabase.from("pedido_detalle").insert(
        c.cotizacion_detalle.map((d) => ({
          pedido_id: pedido.id,
          producto_servicio_id: d.producto_servicio_id,
          descripcion: d.descripcion,
          cantidad: d.cantidad,
          precio_unitario: d.precio_unitario,
          descuento_pct: d.descuento_pct,
          importe: d.importe,
        })),
      );
    }
    reload();
  }

  function verPdf(c: CotizacionFull) {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Cotización ${c.id.slice(0, 8)}</title>
      <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;margin-top:1rem;} td,th{border:1px solid #ccc;padding:6px;text-align:left;font-size:0.85rem;}</style>
      </head><body>
      <h2>Cotización</h2>
      <p><b>Cliente:</b> ${nombreCliente(c)}</p>
      <p><b>Fecha:</b> ${c.fecha_emision}${c.vigencia_hasta ? ` · Vigente hasta ${c.vigencia_hasta}` : ""}</p>
      <table><thead><tr><th>Descripción</th><th>Cantidad</th><th>Precio unitario</th><th>Desc. %</th><th>Importe</th></tr></thead><tbody>
      ${c.cotizacion_detalle.map((d) => `<tr><td>${d.descripcion}</td><td>${d.cantidad}</td><td>${money(d.precio_unitario)}</td><td>${d.descuento_pct}%</td><td>${money(d.importe)}</td></tr>`).join("")}
      </tbody></table>
      <p style="text-align:right;margin-top:1rem;">Subtotal: ${money(c.subtotal)}<br/>IVA: ${money(c.iva)}<br/><b>Total: ${money(c.total)}</b></p>
      <script>window.print()</script>
      </body></html>
    `);
    win.document.close();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Catálogo de productos y servicios</h3>
        <button onClick={() => setShowNewProducto(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Nuevo producto/servicio
        </button>
      </div>
      <div className="mb-8 divide-y divide-ink/10 border border-ink/10 bg-white">
        {productosServicios.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin productos/servicios todavía.</p>}
        {productosServicios.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm font-semibold text-ink">{p.nombre}</p>
            <p className="font-mono text-xs text-muted">
              {money(p.precio_unitario)}/{p.unidad} · IVA {p.tasa_iva === "exento" ? "exento" : `${p.tasa_iva}%`}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Cotizaciones</h3>
        <button onClick={() => setShowNewCotizacion(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Nueva cotización
        </button>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {cotizaciones.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin cotizaciones todavía.</p>}
        {cotizaciones.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{nombreCliente(c)}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {c.fecha_emision} · {money(c.total)}
                {c.requiere_aprobacion && !c.aprobada_por && " · pendiente de aprobación"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge color={ESTADO_COLOR[c.estado]}>{c.estado}</Badge>
              <button onClick={() => verPdf(c)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink">
                PDF
              </button>
              {c.estado === "borrador" && c.requiere_aprobacion && !c.aprobada_por && (
                c.created_by !== userId ? (
                  <button onClick={() => aprobar(c)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                    Aprobar
                  </button>
                ) : (
                  <span className="font-mono text-[0.62rem] text-muted">Esperando otro aprobador</span>
                )
              )}
              {c.estado === "borrador" && (!c.requiere_aprobacion || c.aprobada_por) && (
                <button onClick={() => enviar(c)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                  Enviar
                </button>
              )}
              {c.estado === "enviada" && (
                <>
                  <button onClick={() => marcarAceptada(c)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                    Aceptada
                  </button>
                  <button onClick={() => rechazar(c)} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                    Rechazar
                  </button>
                </>
              )}
              {c.estado === "aceptada" && (
                <button onClick={() => generarPedido(c)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                  Generar pedido
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Pedidos</h3>
        <button onClick={() => setShowNewPedido(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Nuevo pedido
        </button>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {pedidos.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin pedidos todavía.</p>}
        {pedidos.map((p) => {
          const anticipado = p.anticipos_pedido.reduce((s, a) => s + Number(a.monto), 0);
          return (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{clientes.find((c) => c.id === p.cliente_id)?.razon_social ?? "—"}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                  {p.fecha} · {money(p.total)} · {p.condicion_pago}
                  {anticipado > 0 && ` · anticipo ${money(anticipado)}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={PEDIDO_ESTADO_COLOR[p.estado]}>{p.estado.replace("_", " ")}</Badge>
                {p.estado === "abierto" && (
                  <button onClick={() => setAnticipando(p)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                    + Anticipo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showNewProducto && <NewProductoModal companyId={companyId} onClose={() => setShowNewProducto(false)} onCreated={reload} />}
      {showNewPedido && (
        <NewPedidoModal
          companyId={companyId}
          clientes={clientes}
          productosServicios={productosServicios}
          onClose={() => setShowNewPedido(false)}
          onCreated={reload}
        />
      )}
      {anticipando && <AnticipoModal pedido={anticipando} onClose={() => setAnticipando(null)} onSaved={reload} />}
      {showNewCotizacion && (
        <NewCotizacionModal
          companyId={companyId}
          clientes={clientes}
          prospectos={prospectos}
          productosServicios={productosServicios}
          settings={settings}
          userId={userId}
          limits={limits}
          onClose={() => setShowNewCotizacion(false)}
          onCreated={reload}
        />
      )}
    </div>
  );
}

interface ProductoServicioLite {
  id: string;
  nombre: string;
  unidad: string;
  precio_unitario: number;
  tasa_iva: string;
}

function NewProductoModal({ companyId, onClose, onCreated }: { companyId: string; onClose: () => void; onCreated: () => void }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad, setUnidad] = useState("pza");
  const [precio, setPrecio] = useState("0");
  const [tasaIva, setTasaIva] = useState<"16" | "0" | "exento">("16");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("productos_servicios").insert({
      company_id: companyId,
      nombre,
      descripcion: descripcion || null,
      unidad,
      precio_unitario: Number(precio) || 0,
      tasa_iva: tasaIva,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo producto/servicio" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            placeholder="Unidad"
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <select
            value={tasaIva}
            onChange={(e) => setTasaIva(e.target.value as typeof tasaIva)}
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="16">IVA 16%</option>
            <option value="0">IVA 0%</option>
            <option value="exento">Exento</option>
          </select>
        </div>
        <button type="submit" disabled={saving || !nombre} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear"}
        </button>
      </form>
    </Modal>
  );
}

function NewCotizacionModal({
  companyId,
  clientes,
  prospectos,
  productosServicios,
  settings,
  userId,
  limits,
  onClose,
  onCreated,
}: {
  companyId: string;
  clientes: Cliente[];
  prospectos: Prospecto[];
  productosServicios: ProductoServicioLite[];
  settings: VentasSettings;
  userId: string | null;
  limits: VentasTierLimits;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [origenTipo, setOrigenTipo] = useState<"cliente" | "prospecto">("cliente");
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const [prospectoId, setProspectoId] = useState(prospectos[0]?.id ?? "");
  const [vigenciaHasta, setVigenciaHasta] = useState("");
  const [partidas, setPartidas] = useState<Partida[]>([{ ...PARTIDA_VACIA }]);
  const [saving, setSaving] = useState(false);

  const { subtotal, descuentoTotal, iva, total } = calcularTotales(partidas);
  const descuentoPct = subtotal + descuentoTotal > 0 ? (descuentoTotal / (subtotal + descuentoTotal)) * 100 : 0;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const requiereAprobacion = limits.versionesCotizacionYAprobacionDescuentos && descuentoPct > settings.umbral_descuento_pct;

    const { data: cotizacion } = await supabase
      .from("cotizaciones")
      .insert({
        company_id: companyId,
        cliente_id: origenTipo === "cliente" ? clienteId || null : null,
        prospecto_id: origenTipo === "prospecto" ? prospectoId || null : null,
        vigencia_hasta: limits.vigenciaConAlerta ? vigenciaHasta || null : null,
        subtotal,
        descuento_total: descuentoTotal,
        iva,
        total,
        requiere_aprobacion: requiereAprobacion,
        created_by: userId,
      })
      .select()
      .single();

    if (cotizacion) {
      await supabase.from("cotizacion_detalle").insert(
        partidas
          .filter((p) => p.descripcion.trim())
          .map((p) => {
            const cantidad = Number(p.cantidad) || 0;
            const precio = Number(p.precio_unitario) || 0;
            const descPct = Number(p.descuento_pct) || 0;
            return {
              cotizacion_id: cotizacion.id,
              descripcion: p.descripcion,
              cantidad,
              precio_unitario: precio,
              descuento_pct: descPct,
              importe: cantidad * precio * (1 - descPct / 100),
            };
          }),
      );
    }

    setSaving(false);
    onCreated();
    onClose();
  }

  function agregarDesdeCatalogo(id: string) {
    const producto = productosServicios.find((p) => p.id === id);
    if (!producto) return;
    setPartidas([...partidas, { descripcion: producto.nombre, cantidad: "1", precio_unitario: String(producto.precio_unitario), descuento_pct: "0" }]);
  }

  return (
    <Modal title="Nueva cotización" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div className="flex gap-2">
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origenTipo === "cliente"} onChange={() => setOrigenTipo("cliente")} />
            Cliente
          </label>
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origenTipo === "prospecto"} onChange={() => setOrigenTipo("prospecto")} />
            Prospecto
          </label>
        </div>
        {origenTipo === "cliente" ? (
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {clientes.length === 0 && <option value="">Sin clientes todavía</option>}
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.razon_social}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={prospectoId}
            onChange={(e) => setProspectoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {prospectos.length === 0 && <option value="">Sin prospectos todavía</option>}
            {prospectos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        )}

        {limits.vigenciaConAlerta && (
          <input
            type="date"
            value={vigenciaHasta}
            onChange={(e) => setVigenciaHasta(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        )}

        {productosServicios.length > 0 && (
          <select
            onChange={(e) => {
              if (e.target.value) agregarDesdeCatalogo(e.target.value);
              e.target.value = "";
            }}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">+ Agregar del catálogo…</option>
            {productosServicios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        )}

        <div className="space-y-2">
          {partidas.map((p, i) => (
            <div key={i} className="grid grid-cols-8 gap-2">
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
              <input
                type="number"
                value={p.descuento_pct}
                onChange={(e) => {
                  const next = [...partidas];
                  next[i] = { ...next[i], descuento_pct: e.target.value };
                  setPartidas(next);
                }}
                placeholder="Desc %"
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

        <p className="text-right font-mono text-xs text-muted">
          Subtotal {money(subtotal)} · Descuento {money(descuentoTotal)} · IVA {money(iva)} · <b className="text-ink">Total {money(total)}</b>
        </p>
        {limits.versionesCotizacionYAprobacionDescuentos && descuentoPct > settings.umbral_descuento_pct && (
          <p className="font-mono text-[0.62rem] text-orange">
            Descuento de {descuentoPct.toFixed(1)}% supera el umbral de {settings.umbral_descuento_pct}% — requerirá aprobación antes de poder enviarse.
          </p>
        )}

        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear cotización"}
        </button>
      </form>
    </Modal>
  );
}

function NewPedidoModal({
  companyId,
  clientes,
  productosServicios,
  onClose,
  onCreated,
}: {
  companyId: string;
  clientes: Cliente[];
  productosServicios: ProductoServicioLite[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const [fechaCompromiso, setFechaCompromiso] = useState("");
  const [partidas, setPartidas] = useState<Partida[]>([{ ...PARTIDA_VACIA }]);
  const [saving, setSaving] = useState(false);

  const cliente = clientes.find((c) => c.id === clienteId);
  const { subtotal, iva, total } = calcularTotales(partidas);

  function agregarDesdeCatalogo(id: string) {
    const producto = productosServicios.find((p) => p.id === id);
    if (!producto) return;
    setPartidas([...partidas, { descripcion: producto.nombre, cantidad: "1", precio_unitario: String(producto.precio_unitario), descuento_pct: "0" }]);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!clienteId) return;
    setSaving(true);
    const { data: pedido } = await supabase
      .from("pedidos")
      .insert({
        company_id: companyId,
        cliente_id: clienteId,
        condicion_pago: (cliente?.dias_credito ?? 0) > 0 ? "credito" : "contado",
        dias_credito: cliente?.dias_credito ?? 0,
        fecha_compromiso: fechaCompromiso || null,
        subtotal,
        iva,
        total,
      })
      .select()
      .single();
    if (pedido) {
      await supabase.from("pedido_detalle").insert(
        partidas
          .filter((p) => p.descripcion.trim())
          .map((p) => {
            const cantidad = Number(p.cantidad) || 0;
            const precio = Number(p.precio_unitario) || 0;
            const descPct = Number(p.descuento_pct) || 0;
            return {
              pedido_id: pedido.id,
              descripcion: p.descripcion,
              cantidad,
              precio_unitario: precio,
              descuento_pct: descPct,
              importe: cantidad * precio * (1 - descPct / 100),
            };
          }),
      );
    }
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo pedido" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {clientes.length === 0 && <option value="">Sin clientes — captura una cotización o alta directa primero</option>}
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.razon_social}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={fechaCompromiso}
          onChange={(e) => setFechaCompromiso(e.target.value)}
          placeholder="Fecha compromiso de entrega"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        {productosServicios.length > 0 && (
          <select
            onChange={(e) => {
              if (e.target.value) agregarDesdeCatalogo(e.target.value);
              e.target.value = "";
            }}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">+ Agregar del catálogo…</option>
            {productosServicios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        )}
        <div className="space-y-2">
          {partidas.map((p, i) => (
            <div key={i} className="grid grid-cols-8 gap-2">
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
              <input
                type="number"
                value={p.descuento_pct}
                onChange={(e) => {
                  const next = [...partidas];
                  next[i] = { ...next[i], descuento_pct: e.target.value };
                  setPartidas(next);
                }}
                placeholder="Desc %"
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
        <p className="text-right font-mono text-xs text-muted">
          Subtotal {money(subtotal)} · IVA {money(iva)} · <b className="text-ink">Total {money(total)}</b>
        </p>
        <button type="submit" disabled={saving || !clienteId} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear pedido"}
        </button>
      </form>
    </Modal>
  );
}

function AnticipoModal({ pedido, onClose, onSaved }: { pedido: PedidoFull; onClose: () => void; onSaved: () => void }) {
  const [monto, setMonto] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!Number(monto)) return;
    setSaving(true);
    await supabase.from("anticipos_pedido").insert({ pedido_id: pedido.id, monto: Number(monto) });
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Registrar anticipo" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Monto del anticipo"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Registrar anticipo"}
        </button>
      </form>
    </Modal>
  );
}
