import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  ProductoServicio,
  RestaurantCashSession,
  RestaurantPaymentMethod,
  RestaurantTable,
  RestaurantTicket,
} from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";
import type { RestaurantTierLimits } from "./limits";
import { orderSubtitle, orderTitle } from "./orderDisplay";
import Modal from "../../../admin/components/Modal";

const METHOD_LABELS: Record<RestaurantPaymentMethod, string> = {
  efectivo: "Efectivo",
  tarjeta: "Tarjeta",
  transferencia: "Transferencia",
  otro: "Otro",
  rappi: "Rappi",
};

function orderTotal(order: OrderWithItems, products: ProductoServicio[]): number {
  return order.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.sales_product_id);
    return sum + item.cantidad * (product?.precio_unitario ?? 0);
  }, 0);
}

export default function CajaTab({
  companyId,
  cashSession,
  openOrders,
  tickets,
  tables,
  products,
  limits,
  reload,
}: {
  companyId: string;
  cashSession: RestaurantCashSession | null;
  openOrders: OrderWithItems[];
  tickets: RestaurantTicket[];
  tables: RestaurantTable[];
  products: ProductoServicio[];
  limits: RestaurantTierLimits;
  reload: () => void;
}) {
  const [chargingOrder, setChargingOrder] = useState<OrderWithItems | null>(null);
  const [showClose, setShowClose] = useState(false);

  if (!cashSession) {
    return <AbrirCajaForm companyId={companyId} onOpened={reload} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border border-ink/10 bg-white px-4 py-3">
        <div>
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-teal">Caja abierta</p>
          <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
            Desde {new Date(cashSession.opened_at).toLocaleString("es-MX")} · Fondo inicial ${cashSession.opening_amount.toFixed(2)}
          </p>
        </div>
        <button onClick={() => setShowClose(true)} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
          Cerrar caja
        </button>
      </div>

      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        Pedidos por cobrar ({openOrders.length})
      </h3>
      {openOrders.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin pedidos abiertos.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {openOrders.map((order) => {
            const total = orderTotal(order, products);
            const subtitle = orderSubtitle(order);
            return (
              <div key={order.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className="text-sm text-ink">{orderTitle(order, tables)}</span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {order.items.length} platillo(s) · ${total.toFixed(2)}
                    {subtitle ? ` · ${subtitle}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => setChargingOrder(order)}
                  disabled={order.items.length === 0}
                  className="btn btn-primary px-3 py-1.5 text-[0.62rem] disabled:opacity-60"
                >
                  Cobrar
                </button>
              </div>
            );
          })}
        </div>
      )}

      {chargingOrder && (
        <CobrarModal
          order={chargingOrder}
          tables={tables}
          cashSession={cashSession}
          products={products}
          limits={limits}
          onClose={() => setChargingOrder(null)}
          onCharged={reload}
        />
      )}
      {showClose && <CerrarCajaModal companyId={companyId} cashSession={cashSession} onClose={() => setShowClose(false)} onClosed={reload} />}
      {tickets.length > 0 && (
        <p className="mt-8 font-mono text-[0.6rem] text-muted">Últimos {tickets.length} tickets registrados.</p>
      )}
    </div>
  );
}

function AbrirCajaForm({ companyId, onOpened }: { companyId: string; onOpened: () => void }) {
  const [openingAmount, setOpeningAmount] = useState("0");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("ldn_restaurant_cash_sessions").insert({
      company_id: companyId,
      opened_by: user?.id ?? null,
      opening_amount: Number(openingAmount) || 0,
    });
    setSaving(false);
    onOpened();
  }

  return (
    <div className="max-w-sm border border-ink/10 bg-white p-4">
      <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Abrir caja / turno</h3>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Fondo inicial (efectivo con el que arrancas)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={openingAmount}
            onChange={(e) => setOpeningAmount(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Abriendo…" : "Abrir caja"}
        </button>
      </form>
    </div>
  );
}

function CobrarModal({
  order,
  tables,
  cashSession,
  products,
  limits,
  onClose,
  onCharged,
}: {
  order: OrderWithItems;
  tables: RestaurantTable[];
  cashSession: RestaurantCashSession;
  products: ProductoServicio[];
  limits: RestaurantTierLimits;
  onClose: () => void;
  onCharged: () => void;
}) {
  const isRappi = order.canal === "rappi";
  const subtotal = orderTotal(order, products);
  const [propina, setPropina] = useState("0");
  const total = subtotal + (Number(propina) || 0);
  const [payments, setPayments] = useState<{ method: RestaurantPaymentMethod; amount: string }[]>([
    { method: isRappi ? "rappi" : "efectivo", amount: total.toFixed(2) },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const allowSplit = limits.splitBilling && !isRappi;

  function updatePayment(i: number, patch: Partial<{ method: RestaurantPaymentMethod; amount: string }>) {
    setPayments((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }

  function addPayment() {
    setPayments((prev) => [...prev, { method: "tarjeta", amount: "0" }]);
  }

  const paidSoFar = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    // Si no hay split, el único pago siempre se ajusta al total actual (por si cambió la propina).
    const finalPayments = allowSplit ? payments : [{ ...payments[0], amount: total.toFixed(2) }];
    const { data, error: fnError } = await supabase.functions.invoke("close-restaurant-ticket", {
      body: {
        order_id: order.id,
        cash_session_id: cashSession.id,
        propina: Number(propina) || 0,
        payments: finalPayments.map((p) => ({ method: p.method, amount: Number(p.amount) || 0 })),
      },
    });
    setSaving(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo cobrar el ticket");
      return;
    }
    onCharged();
    onClose();
  }

  return (
    <Modal title={`Cobrar — ${orderTitle(order, tables)}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        {isRappi && (
          <p className="font-mono text-[0.62rem] text-muted">
            Pedido de Rappi — se registra pagado por la plataforma, no cuenta para el arqueo de efectivo.
          </p>
        )}

        <div className="border border-ink/10 bg-sand-2 p-3">
          {order.items.map((item) => {
            const product = products.find((p) => p.id === item.sales_product_id);
            return (
              <p key={item.id} className="font-mono text-[0.66rem] text-ink">
                {item.cantidad}× {product?.nombre ?? "—"} — ${((product?.precio_unitario ?? 0) * item.cantidad).toFixed(2)}
              </p>
            );
          })}
          <p className="mt-2 font-mono text-[0.66rem] text-muted">Subtotal: ${subtotal.toFixed(2)}</p>
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Propina</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={propina}
            onChange={(e) => setPropina(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <p className="font-mono text-sm font-bold text-ink">Total: ${total.toFixed(2)}</p>

        <div className="space-y-2">
          <label className="block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            {allowSplit ? "Formas de pago" : "Forma de pago"}
          </label>
          {payments.map((p, i) => (
            <div key={i} className="flex gap-2">
              <select
                value={p.method}
                disabled={isRappi}
                onChange={(e) => updatePayment(i, { method: e.target.value as RestaurantPaymentMethod })}
                className="flex-1 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none disabled:opacity-60"
              >
                {Object.entries(METHOD_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {allowSplit && (
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={p.amount}
                  onChange={(e) => updatePayment(i, { amount: e.target.value })}
                  className="w-28 border border-ink/15 bg-sand-2 px-2 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
                />
              )}
            </div>
          ))}
          {allowSplit && (
            <>
              <button type="button" onClick={addPayment} className="font-mono text-[0.6rem] uppercase text-teal hover:underline">
                + Dividir en otra forma de pago
              </button>
              <p className="font-mono text-[0.6rem] text-muted">
                Pagado: ${paidSoFar.toFixed(2)} de ${total.toFixed(2)}
              </p>
            </>
          )}
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Cobrando…" : "Confirmar cobro"}
        </button>
      </form>
    </Modal>
  );
}

function CerrarCajaModal({
  companyId,
  cashSession,
  onClose,
  onClosed,
}: {
  companyId: string;
  cashSession: RestaurantCashSession;
  onClose: () => void;
  onClosed: () => void;
}) {
  const [counted, setCounted] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { data: tickets } = await supabase
      .from("ldn_restaurant_tickets")
      .select("id, ldn_restaurant_ticket_payments(method, amount)")
      .eq("company_id", companyId)
      .eq("cash_session_id", cashSession.id);
    const cashCollected = (tickets ?? []).reduce((sum, t) => {
      const payments = (t as unknown as { ldn_restaurant_ticket_payments: { method: string; amount: number }[] }).ldn_restaurant_ticket_payments ?? [];
      return sum + payments.filter((p) => p.method === "efectivo").reduce((s, p) => s + p.amount, 0);
    }, 0);
    const expected = cashSession.opening_amount + cashCollected;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error: updateError } = await supabase
      .from("ldn_restaurant_cash_sessions")
      .update({
        status: "cerrada",
        closed_at: new Date().toISOString(),
        closed_by: user?.id ?? null,
        closing_amount_expected: expected,
        closing_amount_counted: Number(counted) || 0,
      })
      .eq("id", cashSession.id);
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    onClosed();
    onClose();
  }

  return (
    <Modal title="Cerrar caja / arqueo" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <p className="font-mono text-[0.66rem] text-muted">
          Cuenta el efectivo físico en caja y ponlo aquí — el sistema calcula solo cuánto debería haber (fondo inicial + efectivo
          cobrado) y te muestra la diferencia.
        </p>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Efectivo contado
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            required
            value={counted}
            onChange={(e) => setCounted(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Cerrando…" : "Cerrar caja"}
        </button>
      </form>
    </Modal>
  );
}
