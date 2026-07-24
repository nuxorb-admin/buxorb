import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Proveedor, Departamento, Requisicion, ReglaAprobacion } from "../../../lib/database.types";
import type { CompraFull } from "./useComprasData";
import type { ComprasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const ESTADO_COLOR = {
  borrador: "muted",
  pendiente_aprobacion: "orange",
  aprobada: "teal",
  recibida: "teal",
  pagada: "ink",
  cancelada: "muted",
} as const;

async function publicarProyectado(compra: CompraFull) {
  await supabase.from("mov_esperados").insert({
    company_id: compra.company_id,
    tipo: "egreso",
    monto: compra.total,
    fecha_esperada: compra.fecha_estimada_pago || compra.fecha,
    modulo_origen: "compras",
    referencia_id: compra.id,
    concepto: `Compra ${compra.folio}`,
  });
}

function nivelPendiente(compra: CompraFull, reglas: ReglaAprobacion[]): ReglaAprobacion | null {
  const aplicables = reglas
    .filter((r) => {
      if (r.tipo === "monto") return r.umbral_monto !== null && compra.total > r.umbral_monto;
      return r.departamento_id === compra.departamento_id;
    })
    .sort((a, b) => a.orden_nivel - b.orden_nivel);

  for (const regla of aplicables) {
    const yaAprobado = compra.aprobaciones_compra.some(
      (a) => a.nivel === regla.orden_nivel && a.resultado === "aprobada",
    );
    if (!yaAprobado) return regla;
  }
  return null;
}

export default function CicloCompraTab({
  companyId,
  proveedores,
  departamentos,
  requisiciones,
  reglasAprobacion,
  compras,
  settings,
  limits,
  companyUserCount,
  reload,
}: {
  companyId: string;
  proveedores: Proveedor[];
  departamentos: Departamento[];
  requisiciones: Requisicion[];
  reglasAprobacion: ReglaAprobacion[];
  compras: CompraFull[];
  settings: { aprobacion_activada: boolean };
  limits: ComprasTierLimits;
  companyUserCount: number;
  reload: () => void;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showRequisicion, setShowRequisicion] = useState(false);
  const [showReglas, setShowReglas] = useState(false);
  const [prefillDepartamento, setPrefillDepartamento] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  async function toggleAprobacion(on: boolean) {
    await supabase.from("compras_settings").update({ aprobacion_activada: on }).eq("company_id", companyId);
    reload();
  }

  async function aprobar(compra: CompraFull, resultado: "aprobada" | "rechazada", nivel: number) {
    if (!userId) return;
    await supabase.from("aprobaciones_compra").insert({
      compra_id: compra.id,
      aprobador_user_id: userId,
      nivel,
      resultado,
    });

    if (resultado === "rechazada") {
      await supabase.from("compras").update({ estado: "cancelada" }).eq("id", compra.id);
      reload();
      return;
    }

    if (limits.requisicionYAprobacionMultinivel && reglasAprobacion.length > 0) {
      // ¿queda otro nivel pendiente? se resuelve al recargar y recalcular con
      // la nueva aprobación ya insertada — por simplicidad, se relee aquí.
      const { data: updated } = await supabase
        .from("compras")
        .select("*, aprobaciones_compra(*)")
        .eq("id", compra.id)
        .single();
      const siguiente = updated ? nivelPendiente({ ...compra, aprobaciones_compra: updated.aprobaciones_compra }, reglasAprobacion) : null;
      if (!siguiente) {
        await supabase.from("compras").update({ estado: "aprobada" }).eq("id", compra.id);
        await publicarProyectado(compra);
      }
    } else {
      await supabase.from("compras").update({ estado: "aprobada" }).eq("id", compra.id);
      await publicarProyectado(compra);
    }
    reload();
  }

  async function marcarRecibida(compra: CompraFull) {
    await supabase.from("recepciones").insert({ compra_id: compra.id, tipo: "total" });
    await supabase.from("compras").update({ estado: "recibida" }).eq("id", compra.id);
    reload();
  }

  function verOrdenPdf(compra: CompraFull) {
    const proveedor = proveedores.find((p) => p.id === compra.proveedor_id);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Orden de compra ${compra.folio}</title>
      <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;margin-top:1rem;} td,th{border:1px solid #ccc;padding:6px;text-align:left;font-size:0.85rem;}</style>
      </head><body>
      <h2>Orden de compra ${compra.folio}</h2>
      <p><b>Proveedor:</b> ${proveedor?.razon_social ?? ""}</p>
      <p><b>Fecha:</b> ${compra.fecha}</p>
      <table><thead><tr><th>Descripción</th><th>Cantidad</th><th>Precio unitario</th><th>Importe</th></tr></thead><tbody>
      ${compra.compra_detalle.map((d) => `<tr><td>${d.descripcion}</td><td>${d.cantidad}</td><td>${money(d.precio_unitario)}</td><td>${money(d.importe)}</td></tr>`).join("")}
      </tbody></table>
      <p style="text-align:right;margin-top:1rem;">Subtotal: ${money(compra.subtotal)}<br/>IVA: ${money(compra.iva)}<br/><b>Total: ${money(compra.total)}</b></p>
      <script>window.print()</script>
      </body></html>
    `);
    win.document.close();
  }

  const bandejaAprobacion = compras.filter((c) => c.estado === "pendiente_aprobacion");

  return (
    <div>
      {!limits.requisicionYAprobacionMultinivel && (
        <label className="mb-4 flex items-center gap-2 border border-ink/10 bg-white px-4 py-3 font-mono text-xs text-ink">
          <input
            type="checkbox"
            checked={settings.aprobacion_activada}
            onChange={(e) => toggleAprobacion(e.target.checked)}
          />
          Requiere aprobación antes de comprometer una compra
        </label>
      )}

      {limits.requisicionYAprobacionMultinivel && (
        <div className="mb-4 flex flex-wrap gap-3">
          <button onClick={() => setShowRequisicion(true)} className="btn btn-outline">
            + Nueva requisición
          </button>
          <button onClick={() => setShowReglas(true)} className="btn btn-outline">
            Reglas de aprobación
          </button>
        </div>
      )}

      {limits.requisicionYAprobacionMultinivel && requisiciones.filter((r) => r.estado === "pendiente").length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Requisiciones pendientes
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {requisiciones
              .filter((r) => r.estado === "pendiente")
              .map((r) => (
                <div key={r.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.justificacion || "Sin justificación"}</p>
                    <p className="font-mono text-[0.66rem] text-muted">{r.fecha}</p>
                  </div>
                  <button
                    onClick={() => {
                      setPrefillDepartamento(r.departamento_id);
                      setShowNew(true);
                    }}
                    className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                  >
                    Crear compra
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {bandejaAprobacion.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Bandeja de aprobación
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {bandejaAprobacion.map((c) => {
              const nivel = limits.requisicionYAprobacionMultinivel
                ? nivelPendiente(c, reglasAprobacion)
                : { orden_nivel: 1, aprobador_user_id: null };
              const puedeAprobar = nivel?.aprobador_user_id ? nivel.aprobador_user_id === userId : c.created_by !== userId;
              return (
                <div key={c.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {c.folio} · {proveedores.find((p) => p.id === c.proveedor_id)?.razon_social}
                    </p>
                    <p className="font-mono text-[0.66rem] text-muted">{money(c.total)}</p>
                  </div>
                  {puedeAprobar ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => aprobar(c, "aprobada", nivel?.orden_nivel ?? 1)}
                        className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => aprobar(c, "rechazada", nivel?.orden_nivel ?? 1)}
                        className="font-mono text-[0.62rem] uppercase text-orange hover:underline"
                      >
                        Rechazar
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-[0.62rem] text-muted">Esperando otro aprobador</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Compras</h3>
        <button
          onClick={() => {
            setPrefillDepartamento(null);
            setShowNew(true);
          }}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
        >
          + Nueva compra
        </button>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {compras.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin compras todavía.</p>}
        {compras.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {c.folio} · {proveedores.find((p) => p.id === c.proveedor_id)?.razon_social}
              </p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {c.fecha} · {money(c.total)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge color={ESTADO_COLOR[c.estado]}>{c.estado.replace("_", " ")}</Badge>
              <button onClick={() => verOrdenPdf(c)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-ink">
                PDF
              </button>
              {c.estado === "aprobada" && (
                <button
                  onClick={() => marcarRecibida(c)}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Marcar recibida
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <NewCompraModal
          companyId={companyId}
          proveedores={proveedores}
          settings={settings}
          companyUserCount={companyUserCount}
          prefillDepartamento={prefillDepartamento}
          onClose={() => setShowNew(false)}
          onCreated={reload}
        />
      )}

      {showRequisicion && (
        <NewRequisicionModal
          companyId={companyId}
          userId={userId}
          departamentos={departamentos}
          onClose={() => setShowRequisicion(false)}
          onCreated={reload}
        />
      )}

      {showReglas && (
        <ReglasAprobacionModal
          companyId={companyId}
          departamentos={departamentos}
          reglas={reglasAprobacion}
          onClose={() => setShowReglas(false)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function NewCompraModal({
  companyId,
  proveedores,
  settings,
  companyUserCount,
  prefillDepartamento,
  onClose,
  onCreated,
}: {
  companyId: string;
  proveedores: Proveedor[];
  settings: { aprobacion_activada: boolean };
  companyUserCount: number;
  prefillDepartamento: string | null;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [proveedorId, setProveedorId] = useState(proveedores[0]?.id ?? "");
  const [condicionPago, setCondicionPago] = useState<"contado" | "credito">("contado");
  const [diasCredito, setDiasCredito] = useState("30");
  const [fechaEstimadaPago, setFechaEstimadaPago] = useState(new Date().toISOString().slice(0, 10));
  const [conceptos, setConceptos] = useState([{ descripcion: "", cantidad: "1", precio_unitario: "0" }]);
  const [saving, setSaving] = useState(false);

  const subtotal = conceptos.reduce((sum, c) => sum + Number(c.cantidad) * Number(c.precio_unitario), 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!proveedorId) return;
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const folio = `OC-${Date.now().toString().slice(-6)}`;
    const requiereAprobacion = settings.aprobacion_activada && companyUserCount > 1;

    const { data: compra } = await supabase
      .from("compras")
      .insert({
        company_id: companyId,
        folio,
        proveedor_id: proveedorId,
        subtotal,
        iva,
        total,
        condicion_pago: condicionPago,
        dias_credito: condicionPago === "credito" ? Number(diasCredito) : null,
        fecha_estimada_pago: fechaEstimadaPago,
        departamento_id: prefillDepartamento,
        estado: requiereAprobacion ? "pendiente_aprobacion" : "aprobada",
        origen: prefillDepartamento ? "requisicion" : "manual",
        created_by: user?.id ?? null,
      })
      .select()
      .single();

    if (compra) {
      await supabase.from("compra_detalle").insert(
        conceptos
          .filter((c) => c.descripcion.trim())
          .map((c) => ({
            compra_id: compra.id,
            descripcion: c.descripcion,
            cantidad: Number(c.cantidad),
            precio_unitario: Number(c.precio_unitario),
            importe: Number(c.cantidad) * Number(c.precio_unitario),
          })),
      );

      if (!requiereAprobacion) {
        await supabase.from("mov_esperados").insert({
          company_id: companyId,
          tipo: "egreso",
          monto: total,
          fecha_esperada: fechaEstimadaPago,
          modulo_origen: "compras",
          referencia_id: compra.id,
          concepto: `Compra ${folio}`,
        });
      }
    }

    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva compra" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {proveedores.length === 0 && <option value="">Sin proveedores — agrega uno primero</option>}
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.razon_social}
            </option>
          ))}
        </select>

        <div className="space-y-2">
          {conceptos.map((c, i) => (
            <div key={i} className="grid grid-cols-6 gap-2">
              <input
                value={c.descripcion}
                onChange={(e) => {
                  const next = [...conceptos];
                  next[i] = { ...next[i], descripcion: e.target.value };
                  setConceptos(next);
                }}
                placeholder="Descripción"
                className="col-span-3 border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
              />
              <input
                type="number"
                value={c.cantidad}
                onChange={(e) => {
                  const next = [...conceptos];
                  next[i] = { ...next[i], cantidad: e.target.value };
                  setConceptos(next);
                }}
                placeholder="Cant."
                className="border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
              />
              <input
                type="number"
                value={c.precio_unitario}
                onChange={(e) => {
                  const next = [...conceptos];
                  next[i] = { ...next[i], precio_unitario: e.target.value };
                  setConceptos(next);
                }}
                placeholder="Precio"
                className="border border-ink/15 bg-sand-2 px-2 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setConceptos(conceptos.filter((_, idx) => idx !== i))}
                className="font-mono text-[0.62rem] text-muted hover:text-orange"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setConceptos([...conceptos, { descripcion: "", cantidad: "1", precio_unitario: "0" }])}
            className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
          >
            + Concepto
          </button>
        </div>

        <div className="flex gap-2">
          <select
            value={condicionPago}
            onChange={(e) => setCondicionPago(e.target.value as "contado" | "credito")}
            className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="contado">Contado</option>
            <option value="credito">Crédito</option>
          </select>
          {condicionPago === "credito" && (
            <input
              type="number"
              value={diasCredito}
              onChange={(e) => setDiasCredito(e.target.value)}
              placeholder="Días de crédito"
              className="w-1/2 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          )}
        </div>
        <input
          type="date"
          value={fechaEstimadaPago}
          onChange={(e) => setFechaEstimadaPago(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />

        <p className="text-right font-mono text-xs text-muted">
          Subtotal {money(subtotal)} · IVA {money(iva)} · <b className="text-ink">Total {money(total)}</b>
        </p>

        <button type="submit" disabled={saving || !proveedorId} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear compra"}
        </button>
      </form>
    </Modal>
  );
}

function NewRequisicionModal({
  companyId,
  userId,
  departamentos,
  onClose,
  onCreated,
}: {
  companyId: string;
  userId: string | null;
  departamentos: Departamento[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [departamentoId, setDepartamentoId] = useState(departamentos[0]?.id ?? "");
  const [justificacion, setJustificacion] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("requisiciones").insert({
      company_id: companyId,
      solicitante_id: userId,
      departamento_id: departamentoId || null,
      justificacion,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva requisición" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {departamentos.length > 0 && (
          <select
            value={departamentoId}
            onChange={(e) => setDepartamentoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        )}
        <textarea
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
          placeholder="Justificación"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear requisición"}
        </button>
      </form>
    </Modal>
  );
}

function ReglasAprobacionModal({
  companyId,
  departamentos,
  reglas,
  onClose,
  onSaved,
}: {
  companyId: string;
  departamentos: Departamento[];
  reglas: ReglaAprobacion[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [tipo, setTipo] = useState<"monto" | "departamento">("monto");
  const [umbral, setUmbral] = useState("10000");
  const [departamentoId, setDepartamentoId] = useState(departamentos[0]?.id ?? "");
  const [aprobadorEmail, setAprobadorEmail] = useState("");
  const [orden, setOrden] = useState("1");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const { data: profile } = await supabase.from("profiles").select("id").eq("email", aprobadorEmail).maybeSingle();
    if (!profile) {
      setError("No se encontró un usuario con ese correo dentro de la empresa");
      setSaving(false);
      return;
    }
    await supabase.from("reglas_aprobacion").insert({
      company_id: companyId,
      tipo,
      umbral_monto: tipo === "monto" ? Number(umbral) : null,
      departamento_id: tipo === "departamento" ? departamentoId || null : null,
      aprobador_user_id: profile.id,
      orden_nivel: Number(orden),
    });
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Reglas de aprobación" onClose={onClose}>
      <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
        {reglas.length === 0 && <p className="p-3 font-mono text-xs text-muted">Sin reglas todavía.</p>}
        {reglas.map((r) => (
          <div key={r.id} className="px-3 py-2 font-mono text-xs text-ink">
            Nivel {r.orden_nivel} · {r.tipo === "monto" ? `Monto > ${money(r.umbral_monto ?? 0)}` : "Por departamento"}
          </div>
        ))}
      </div>
      {error && <p className="mb-3 font-mono text-xs text-orange">{error}</p>}
      <form onSubmit={submit} className="space-y-3">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as "monto" | "departamento")}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="monto">Por monto</option>
          <option value="departamento">Por departamento</option>
        </select>
        {tipo === "monto" ? (
          <input
            type="number"
            value={umbral}
            onChange={(e) => setUmbral(e.target.value)}
            placeholder="Umbral"
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        ) : (
          <select
            value={departamentoId}
            onChange={(e) => setDepartamentoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        )}
        <input
          value={aprobadorEmail}
          onChange={(e) => setAprobadorEmail(e.target.value)}
          placeholder="Correo del aprobador"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          type="number"
          min={1}
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          placeholder="Nivel"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Agregar regla"}
        </button>
      </form>
    </Modal>
  );
}
