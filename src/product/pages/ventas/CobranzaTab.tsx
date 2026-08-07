import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Cliente, TreasuryMovement } from "../../../lib/database.types";
import type { FacturaFull } from "./useVentasData";
import type { VentasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

function estadoCartera(f: FacturaFull): "al_corriente" | "por_vencer" | "vencida" {
  if (!f.fecha_vencimiento) return "al_corriente";
  const dias = (new Date(f.fecha_vencimiento).getTime() - Date.now()) / 86400000;
  if (dias < 0) return "vencida";
  if (dias <= 7) return "por_vencer";
  return "al_corriente";
}

const CARTERA_LABEL = { al_corriente: "Al corriente", por_vencer: "Por vencer", vencida: "Vencida" };
const CARTERA_COLOR = { al_corriente: "teal", por_vencer: "orange", vencida: "orange" } as const;

export default function CobranzaTab({
  companyId,
  clientes,
  facturas,
  limits,
  reload,
}: {
  companyId: string;
  clientes: Cliente[];
  facturas: FacturaFull[];
  limits: VentasTierLimits;
  reload: () => void;
}) {
  const [cobrando, setCobrando] = useState<FacturaFull | null>(null);
  const [vinculando, setVinculando] = useState<FacturaFull | null>(null);
  const [verEstadoCuenta, setVerEstadoCuenta] = useState<Cliente | null>(null);

  const conSaldo = facturas.filter((f) => f.saldo_pendiente > 0 && f.estado !== "cancelada");

  return (
    <div>
      <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Cartera</h3>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {conSaldo.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin saldos pendientes.</p>}
        {conSaldo.map((f) => {
          const estado = estadoCartera(f);
          return (
            <div key={f.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {clientes.find((c) => c.id === f.cliente_id)?.razon_social ?? "—"} · {f.folio_interno}
                </p>
                <p className="font-mono text-[0.66rem] text-muted">
                  Vence {f.fecha_vencimiento ?? "—"} · Saldo {money(f.saldo_pendiente)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={CARTERA_COLOR[estado]}>{CARTERA_LABEL[estado]}</Badge>
                <button onClick={() => setVinculando(f)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink">
                  Vincular banco
                </button>
                <button onClick={() => setCobrando(f)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                  Registrar cobro
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {limits.recordatoriosYAntiguedad && conSaldo.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Antigüedad de saldos</h3>
          <AntiguedadSaldos facturas={conSaldo} />
        </>
      )}

      {limits.recordatoriosYAntiguedad && clientes.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Estado de cuenta por cliente</h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {clientes.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-semibold text-ink">{c.razon_social}</p>
                <button onClick={() => setVerEstadoCuenta(c)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                  Ver estado de cuenta
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {cobrando && <CobroModal factura={cobrando} onClose={() => setCobrando(null)} onCobrado={reload} />}
      {vinculando && (
        <VincularBancoModal
          companyId={companyId}
          clienteNombre={clientes.find((c) => c.id === vinculando.cliente_id)?.razon_social ?? "—"}
          facturaInicial={vinculando}
          facturas={conSaldo.filter((f) => f.cliente_id === vinculando.cliente_id)}
          onClose={() => setVinculando(null)}
          onDone={reload}
        />
      )}
      {verEstadoCuenta && (
        <EstadoCuentaModal cliente={verEstadoCuenta} facturas={facturas.filter((f) => f.cliente_id === verEstadoCuenta.id)} onClose={() => setVerEstadoCuenta(null)} />
      )}
    </div>
  );
}

function AntiguedadSaldos({ facturas }: { facturas: FacturaFull[] }) {
  const buckets = { "por vencer": 0, "1-30": 0, "31-60": 0, "61-90": 0, "+90": 0 };
  for (const f of facturas) {
    if (!f.fecha_vencimiento) continue;
    const dias = Math.floor((Date.now() - new Date(f.fecha_vencimiento).getTime()) / 86400000);
    if (dias < 0) buckets["por vencer"] += f.saldo_pendiente;
    else if (dias <= 30) buckets["1-30"] += f.saldo_pendiente;
    else if (dias <= 60) buckets["31-60"] += f.saldo_pendiente;
    else if (dias <= 90) buckets["61-90"] += f.saldo_pendiente;
    else buckets["+90"] += f.saldo_pendiente;
  }
  return (
    <div className="grid grid-cols-5 gap-3">
      {Object.entries(buckets).map(([label, monto]) => (
        <div key={label} className="border border-ink/10 bg-white p-3 text-center">
          <p className="font-mono text-[0.6rem] uppercase text-muted">{label}</p>
          <p className="font-mono text-sm font-bold text-ink">{money(monto)}</p>
        </div>
      ))}
    </div>
  );
}

function CobroModal({ factura, onClose, onCobrado }: { factura: FacturaFull; onClose: () => void; onCobrado: () => void }) {
  const [monto, setMonto] = useState(String(factura.saldo_pendiente));
  const [referencia, setReferencia] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const montoNum = Number(monto);
    const nuevoSaldo = Math.max(0, factura.saldo_pendiente - montoNum);
    await supabase.from("sales_collections").insert({
      factura_id: factura.id,
      monto: montoNum,
      tipo: nuevoSaldo <= 0 ? "total" : "parcial",
      referencia: referencia || null,
    });
    await supabase
      .from("sales_invoices")
      .update({ saldo_pendiente: nuevoSaldo, estado: nuevoSaldo <= 0 ? "pagada" : "parcial" })
      .eq("id", factura.id);
    setSaving(false);
    onCobrado();
    onClose();
  }

  return (
    <Modal title={`Registrar cobro — ${factura.folio_interno}`} onClose={onClose}>
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
          {saving ? "Guardando…" : "Registrar cobro"}
        </button>
      </form>
    </Modal>
  );
}

// Un ingreso bancario ya usado en un match de ventas (tiene al menos un
// sales_collections que lo referencia) no puede volver a cruzarse — por eso
// se excluye aquí, no se filtra por "restante".
function VincularBancoModal({
  companyId,
  clienteNombre,
  facturaInicial,
  facturas,
  onClose,
  onDone,
}: {
  companyId: string;
  clienteNombre: string;
  facturaInicial: FacturaFull;
  facturas: FacturaFull[];
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
      const [{ data: ingresos }, { data: usados }] = await Promise.all([
        supabase
          .from("treasury_movements")
          .select("*")
          .eq("company_id", companyId)
          .eq("type", "ingreso")
          .order("entry_date", { ascending: false })
          .limit(200),
        supabase.from("sales_collections").select("treasury_movement_id").not("treasury_movement_id", "is", null),
      ]);
      const usadosIds = new Set((usados ?? []).map((u) => u.treasury_movement_id));
      setMovimientos((ingresos ?? []).filter((m) => !usadosIds.has(m.id)));
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
    setAsignaciones({ [facturaInicial.id]: String(Math.min(facturaInicial.saldo_pendiente, Number(mov.amount))) });
  }

  async function confirmar() {
    if (!movimiento) return;
    if (asignado <= 0) {
      setError("Asigna al menos un monto a alguna factura.");
      return;
    }
    if (asignado > Number(movimiento.amount) + 0.01) {
      setError("La suma asignada no puede superar el monto del movimiento.");
      return;
    }
    setSaving(true);
    setError(null);

    for (const f of facturas) {
      const monto = Number(asignaciones[f.id] ?? 0);
      if (monto <= 0) continue;
      await supabase.from("sales_collections").insert({
        factura_id: f.id,
        monto,
        tipo: f.saldo_pendiente - monto <= 0 ? "total" : "parcial",
        referencia: movimiento.concept,
        origen: "tesoreria",
        treasury_movement_id: movimiento.id,
      });
      const nuevoSaldo = Math.max(0, f.saldo_pendiente - monto);
      await supabase
        .from("sales_invoices")
        .update({ saldo_pendiente: nuevoSaldo, estado: nuevoSaldo <= 0 ? "pagada" : "parcial" })
        .eq("id", f.id);
    }

    setSaving(false);
    onDone();
    onClose();
  }

  return (
    <Modal title={`Vincular movimiento bancario — ${clienteNombre}`} onClose={onClose}>
      <div className="space-y-3">
        {error && <p className="font-mono text-xs text-orange">{error}</p>}
        {movimientos === null && <p className="font-mono text-xs text-muted">Cargando ingresos…</p>}
        {movimientos?.length === 0 && (
          <p className="font-mono text-xs text-muted">No hay ingresos bancarios disponibles para cruzar.</p>
        )}
        {movimientos && movimientos.length > 0 && (
          <select
            value={movimientoId}
            onChange={(e) => elegirMovimiento(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">Selecciona un ingreso bancario…</option>
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
              Reparte el monto de este ingreso entre las facturas de este cliente que cubre. Solo puede cruzarse con
              facturas del mismo cliente.
            </p>
            <div className="space-y-2">
              {facturas.map((f) => (
                <div key={f.id} className="grid grid-cols-2 gap-2 border border-ink/10 bg-sand-2 p-2">
                  <div className="font-mono text-[0.66rem] text-ink">
                    {f.folio_interno}
                    <br />
                    <span className="text-muted">Saldo {money(f.saldo_pendiente)}</span>
                  </div>
                  <input
                    type="number"
                    value={asignaciones[f.id] ?? ""}
                    onChange={(e) => setAsignaciones({ ...asignaciones, [f.id]: e.target.value })}
                    placeholder="0"
                    className="border border-ink/15 bg-white px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              ))}
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

function EstadoCuentaModal({ cliente, facturas, onClose }: { cliente: Cliente; facturas: FacturaFull[]; onClose: () => void }) {
  const saldoTotal = facturas.reduce((s, f) => s + f.saldo_pendiente, 0);

  function verPdf() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Estado de cuenta — ${cliente.razon_social}</title>
      <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;margin-top:1rem;} td,th{border:1px solid #ccc;padding:6px;text-align:left;font-size:0.85rem;}</style>
      </head><body>
      <h2>Estado de cuenta — ${cliente.razon_social}</h2>
      <table><thead><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Cobrado</th><th>Saldo</th></tr></thead><tbody>
      ${facturas
        .map((f) => {
          const cobrado = f.sales_collections.reduce((s, c) => s + Number(c.monto), 0);
          return `<tr><td>${f.folio_interno}</td><td>${f.fecha_emision}</td><td>${money(f.total)}</td><td>${money(cobrado)}</td><td>${money(f.saldo_pendiente)}</td></tr>`;
        })
        .join("")}
      </tbody></table>
      <p style="text-align:right;margin-top:1rem;"><b>Saldo total: ${money(saldoTotal)}</b></p>
      <script>window.print()</script>
      </body></html>
    `);
    win.document.close();
  }

  return (
    <Modal title={`Estado de cuenta — ${cliente.razon_social}`} onClose={onClose}>
      <div className="max-h-[50vh] space-y-2 overflow-y-auto">
        {facturas.length === 0 && <p className="font-mono text-xs text-muted">Sin facturas.</p>}
        {facturas.map((f) => (
          <div key={f.id} className="flex justify-between border-b border-ink/10 pb-1 font-mono text-xs text-ink">
            <span>
              {f.folio_interno} · {f.fecha_emision}
            </span>
            <span>{money(f.saldo_pendiente)}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-right font-mono text-sm font-bold text-ink">Saldo total: {money(saldoTotal)}</p>
      <button onClick={verPdf} className="btn btn-outline mt-3 w-full">
        Ver PDF
      </button>
    </Modal>
  );
}
