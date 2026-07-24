import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { EvaluacionProveedor, Proveedor } from "../../../lib/database.types";
import type { CompraFull } from "./useComprasData";
import type { ComprasTierLimits } from "./limits";
import { parseCsv } from "../treasury/parseCsv";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

function historialFor(proveedorId: string, compras: CompraFull[]) {
  const del = compras.filter((c) => c.proveedor_id === proveedorId && c.estado !== "cancelada");
  const totalComprado = del.reduce((sum, c) => sum + Number(c.total), 0);
  const saldoPendiente = del.reduce((sum, c) => {
    const pagado = c.pagos_compra.reduce((s, p) => s + Number(p.monto), 0);
    return sum + Math.max(0, Number(c.total) - pagado);
  }, 0);
  return { count: del.length, totalComprado, saldoPendiente };
}

function cumplimiento(proveedorId: string, compras: CompraFull[]) {
  const recibidasOPagadas = compras.filter(
    (c) => c.proveedor_id === proveedorId && (c.estado === "recibida" || c.estado === "pagada"),
  );
  if (recibidasOPagadas.length === 0) return null;
  const aTiempo = recibidasOPagadas.filter((c) => {
    const recepcion = c.recepciones[0];
    if (!recepcion || !c.fecha_estimada_pago) return true;
    return new Date(recepcion.fecha) <= new Date(c.fecha_estimada_pago);
  });
  return Math.round((aTiempo.length / recibidasOPagadas.length) * 100);
}

export default function ProveedoresTab({
  companyId,
  proveedores,
  compras,
  evaluaciones,
  limits,
  reload,
}: {
  companyId: string;
  proveedores: Proveedor[];
  compras: CompraFull[];
  evaluaciones: EvaluacionProveedor[];
  limits: ComprasTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [rating, setRating] = useState<Proveedor | null>(null);

  const comparativoPrecios = (() => {
    const byDescripcion = new Map<string, { proveedor: string; precio: number }[]>();
    for (const c of compras) {
      for (const d of c.compra_detalle) {
        const key = d.descripcion.toLowerCase().trim();
        if (!key) continue;
        const proveedor = proveedores.find((p) => p.id === c.proveedor_id)?.razon_social ?? "—";
        byDescripcion.set(key, [...(byDescripcion.get(key) ?? []), { proveedor, precio: d.precio_unitario }]);
      }
    }
    return [...byDescripcion.entries()].filter(([, rows]) => rows.length > 1);
  })();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Proveedores</h3>
        <div className="flex gap-3">
          <button onClick={() => setShowImport(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Importar plantilla
          </button>
          <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Nuevo proveedor
          </button>
        </div>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {proveedores.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin proveedores todavía.</p>}
        {proveedores.map((p) => {
          const historial = historialFor(p.id, compras);
          const cumplimientoPct = limits.evaluacionProveedores ? cumplimiento(p.id, compras) : null;
          const evalsProveedor = evaluaciones.filter((e) => e.proveedor_id === p.id);
          const avgRating =
            evalsProveedor.length > 0
              ? (evalsProveedor.reduce((s, e) => s + e.calificacion, 0) / evalsProveedor.length).toFixed(1)
              : null;
          return (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{p.razon_social}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                  {p.rfc || "sin RFC"} · {historial.count} compras · {money(historial.totalComprado)} histórico
                  {historial.saldoPendiente > 0 && ` · ${money(historial.saldoPendiente)} pendiente`}
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[0.66rem] text-muted">
                {cumplimientoPct !== null && <span>{cumplimientoPct}% a tiempo</span>}
                {avgRating && <span>★ {avgRating}</span>}
                {limits.evaluacionProveedores && (
                  <button onClick={() => setRating(p)} className="uppercase text-teal hover:underline">
                    Calificar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {limits.evaluacionProveedores && comparativoPrecios.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Comparativo de precios
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {comparativoPrecios.map(([descripcion, rows]) => (
              <div key={descripcion} className="px-4 py-3">
                <p className="text-sm font-semibold capitalize text-ink">{descripcion}</p>
                <div className="mt-1 flex flex-wrap gap-3 font-mono text-[0.66rem] text-muted">
                  {rows.map((r, i) => (
                    <span key={i}>
                      {r.proveedor}: {money(r.precio)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showNew && (
        <NewProveedorModal companyId={companyId} onClose={() => setShowNew(false)} onCreated={reload} />
      )}

      {showImport && (
        <ImportProveedoresModal companyId={companyId} onClose={() => setShowImport(false)} onImported={reload} />
      )}

      {rating && (
        <RatingModal proveedor={rating} onClose={() => setRating(null)} onRated={reload} />
      )}
    </div>
  );
}

function NewProveedorModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    razon_social: "",
    rfc: "",
    contacto_nombre: "",
    contacto_telefono: "",
    contacto_correo: "",
    dias_credito_default: "0",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("proveedores").insert({
      company_id: companyId,
      razon_social: form.razon_social,
      rfc: form.rfc || null,
      contacto_nombre: form.contacto_nombre || null,
      contacto_telefono: form.contacto_telefono || null,
      contacto_correo: form.contacto_correo || null,
      dias_credito_default: Number(form.dias_credito_default) || 0,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo proveedor" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Razón social" value={form.razon_social} onChange={(v) => setForm({ ...form, razon_social: v })} required />
        <FieldInput label="RFC" value={form.rfc} onChange={(v) => setForm({ ...form, rfc: v })} />
        <FieldInput label="Contacto" value={form.contacto_nombre} onChange={(v) => setForm({ ...form, contacto_nombre: v })} />
        <FieldInput label="Teléfono" value={form.contacto_telefono} onChange={(v) => setForm({ ...form, contacto_telefono: v })} />
        <FieldInput label="Correo" type="email" value={form.contacto_correo} onChange={(v) => setForm({ ...form, contacto_correo: v })} />
        <FieldInput
          label="Días de crédito default"
          type="number"
          value={form.dias_credito_default}
          onChange={(v) => setForm({ ...form, dias_credito_default: v })}
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear proveedor"}
        </button>
      </form>
    </Modal>
  );
}

function ImportProveedoresModal({
  companyId,
  onClose,
  onImported,
}: {
  companyId: string;
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<string[][]>([]);
  const [saving, setSaving] = useState(false);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRows(parseCsv(text));
  }

  const dataRows = rows.slice(1);

  async function confirm() {
    setSaving(true);
    await supabase.from("proveedores").insert(
      dataRows
        .filter((r) => r[0]?.trim())
        .map((r) => ({
          company_id: companyId,
          razon_social: r[0],
          rfc: r[1] || null,
          contacto_nombre: r[2] || null,
          contacto_telefono: r[3] || null,
          contacto_correo: r[4] || null,
        })),
    );
    setSaving(false);
    onImported();
    onClose();
  }

  return (
    <Modal title="Importar proveedores" onClose={onClose}>
      <div className="space-y-3">
        <p className="font-mono text-[0.66rem] text-muted">
          Columnas: razón social, RFC, contacto, teléfono, correo (con encabezados en la primera fila).
        </p>
        <input type="file" accept=".csv" onChange={onFile} className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink" />
        {dataRows.length > 0 && (
          <button onClick={confirm} disabled={saving} className="btn btn-primary w-full">
            {saving ? "Importando…" : `Confirmar importación (${dataRows.length} proveedores)`}
          </button>
        )}
      </div>
    </Modal>
  );
}

function RatingModal({
  proveedor,
  onClose,
  onRated,
}: {
  proveedor: Proveedor;
  onClose: () => void;
  onRated: () => void;
}) {
  const [calificacion, setCalificacion] = useState(5);
  const [notas, setNotas] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("evaluacion_proveedor").insert({
      proveedor_id: proveedor.id,
      calificacion,
      notas: notas || null,
      usuario_id: user?.id ?? null,
    });
    setSaving(false);
    onRated();
    onClose();
  }

  return (
    <Modal title={`Calificar — ${proveedor.razon_social}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={calificacion}
          onChange={(e) => setCalificacion(Number(e.target.value))}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {"★".repeat(n)}
            </option>
          ))}
        </select>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Notas"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar calificación"}
        </button>
      </form>
    </Modal>
  );
}
