import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { DepartamentoPersonal, Empleado, HistorialSueldo, MotivoBaja, PeriodicidadPago, TipoContrato } from "../../../lib/database.types";
import type { PersonalTierLimits } from "./limits";
import { parseCsv } from "../treasury/parseCsv";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

function diasParaVencer(fecha: string | null): number | null {
  if (!fecha) return null;
  return Math.ceil((new Date(fecha).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function ExpedienteTab({
  companyId,
  empleados,
  departamentos,
  historialSueldo,
  limits,
  reload,
}: {
  companyId: string;
  empleados: Empleado[];
  departamentos: DepartamentoPersonal[];
  historialSueldo: HistorialSueldo[];
  limits: PersonalTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showDepartamentos, setShowDepartamentos] = useState(false);
  const [detalle, setDetalle] = useState<Empleado | null>(null);
  const [baja, setBaja] = useState<Empleado | null>(null);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Empleados</h3>
        <div className="flex gap-3">
          {limits.departamentosYHistorialSueldo && (
            <button onClick={() => setShowDepartamentos(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
              Departamentos
            </button>
          )}
          <button onClick={() => setShowImport(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Importar plantilla
          </button>
          <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Nuevo empleado
          </button>
        </div>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {empleados.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin empleados todavía.</p>}
        {empleados.map((e) => {
          const dep = departamentos.find((d) => d.id === e.departamento_id);
          const diasVence = limits.alertasVencimientoContrato ? diasParaVencer(e.fecha_fin_contrato) : null;
          return (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <button onClick={() => setDetalle(e)} className="text-left">
                <p className="text-sm font-semibold text-ink hover:underline">{e.nombre_completo}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                  {e.tipo_contrato} · {e.periodicidad_pago} · {money(e.sueldo_diario)}/día
                  {dep && ` · ${dep.nombre}`}
                </p>
              </button>
              <div className="flex items-center gap-3">
                {diasVence !== null && diasVence <= 30 && (
                  <Badge color="orange">{diasVence <= 0 ? "contrato vencido" : `vence en ${diasVence}d`}</Badge>
                )}
                <Badge color={e.estado === "activo" ? "teal" : "muted"}>{e.estado}</Badge>
                {e.estado === "activo" && (
                  <button onClick={() => setBaja(e)} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                    Baja
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showNew && (
        <NewEmpleadoModal companyId={companyId} departamentos={departamentos} limits={limits} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
      {showImport && <ImportEmpleadosModal companyId={companyId} onClose={() => setShowImport(false)} onImported={reload} />}
      {showDepartamentos && (
        <DepartamentosModal companyId={companyId} departamentos={departamentos} onClose={() => setShowDepartamentos(false)} onSaved={reload} />
      )}
      {baja && <BajaModal empleado={baja} onClose={() => setBaja(null)} onSaved={reload} />}
      {detalle && (
        <DetalleEmpleadoModal
          empleado={detalle}
          historialSueldo={historialSueldo.filter((h) => h.empleado_id === detalle.id)}
          limits={limits}
          onClose={() => setDetalle(null)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function NewEmpleadoModal({
  companyId,
  departamentos,
  limits,
  onClose,
  onCreated,
}: {
  companyId: string;
  departamentos: DepartamentoPersonal[];
  limits: PersonalTierLimits;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    nombre_completo: "",
    rfc: "",
    curp: "",
    nss: "",
    fecha_ingreso: new Date().toISOString().slice(0, 10),
    tipo_contrato: "indeterminado" as TipoContrato,
    fecha_fin_contrato: "",
    sueldo_diario: "0",
    periodicidad_pago: "quincenal" as PeriodicidadPago,
    departamento_id: "",
    cuenta_deposito: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("empleados").insert({
      company_id: companyId,
      nombre_completo: form.nombre_completo,
      rfc: form.rfc || null,
      curp: form.curp || null,
      nss: form.nss || null,
      fecha_ingreso: form.fecha_ingreso,
      tipo_contrato: form.tipo_contrato,
      fecha_fin_contrato: form.tipo_contrato !== "indeterminado" ? form.fecha_fin_contrato || null : null,
      sueldo_diario: Number(form.sueldo_diario) || 0,
      periodicidad_pago: form.periodicidad_pago,
      departamento_id: form.departamento_id || null,
      cuenta_deposito: form.cuenta_deposito || null,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo empleado" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre completo" value={form.nombre_completo} onChange={(v) => setForm({ ...form, nombre_completo: v })} required />
        <div className="grid grid-cols-3 gap-2">
          <FieldInput label="RFC" value={form.rfc} onChange={(v) => setForm({ ...form, rfc: v })} />
          <FieldInput label="CURP" value={form.curp} onChange={(v) => setForm({ ...form, curp: v })} />
          <FieldInput label="NSS" value={form.nss} onChange={(v) => setForm({ ...form, nss: v })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FieldInput label="Fecha de ingreso" type="date" value={form.fecha_ingreso} onChange={(v) => setForm({ ...form, fecha_ingreso: v })} />
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">Tipo de contrato</label>
            <select
              value={form.tipo_contrato}
              onChange={(e) => setForm({ ...form, tipo_contrato: e.target.value as TipoContrato })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="indeterminado">Indeterminado</option>
              <option value="determinado">Determinado</option>
              <option value="prueba">Periodo de prueba</option>
            </select>
          </div>
        </div>
        {form.tipo_contrato !== "indeterminado" && (
          <FieldInput
            label="Fecha fin de contrato"
            type="date"
            value={form.fecha_fin_contrato}
            onChange={(v) => setForm({ ...form, fecha_fin_contrato: v })}
          />
        )}
        <div className="grid grid-cols-2 gap-2">
          <FieldInput label="Sueldo diario" type="number" value={form.sueldo_diario} onChange={(v) => setForm({ ...form, sueldo_diario: v })} />
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">Periodicidad</label>
            <select
              value={form.periodicidad_pago}
              onChange={(e) => setForm({ ...form, periodicidad_pago: e.target.value as PeriodicidadPago })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="semanal">Semanal</option>
              <option value="catorcenal">Catorcenal</option>
              <option value="quincenal">Quincenal</option>
            </select>
          </div>
        </div>
        {limits.departamentosYHistorialSueldo && departamentos.length > 0 && (
          <select
            value={form.departamento_id}
            onChange={(e) => setForm({ ...form, departamento_id: e.target.value })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">Sin departamento</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        )}
        <FieldInput label="Cuenta de depósito (CLABE)" value={form.cuenta_deposito} onChange={(v) => setForm({ ...form, cuenta_deposito: v })} />
        <button type="submit" disabled={saving || !form.nombre_completo} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear empleado"}
        </button>
      </form>
    </Modal>
  );
}

function ImportEmpleadosModal({ companyId, onClose, onImported }: { companyId: string; onClose: () => void; onImported: () => void }) {
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
    await supabase.from("empleados").insert(
      dataRows
        .filter((r) => r[0]?.trim())
        .map((r) => ({
          company_id: companyId,
          nombre_completo: r[0],
          rfc: r[1] || null,
          curp: r[2] || null,
          nss: r[3] || null,
          sueldo_diario: Number(r[4]) || 0,
          periodicidad_pago: (r[5] as PeriodicidadPago) || "quincenal",
        })),
    );
    setSaving(false);
    onImported();
    onClose();
  }

  return (
    <Modal title="Importar empleados" onClose={onClose}>
      <div className="space-y-3">
        <p className="font-mono text-[0.66rem] text-muted">
          Columnas: nombre completo, RFC, CURP, NSS, sueldo diario, periodicidad (con encabezados en la primera fila).
        </p>
        <input type="file" accept=".csv" onChange={onFile} className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink" />
        {dataRows.length > 0 && (
          <button onClick={confirm} disabled={saving} className="btn btn-primary w-full">
            {saving ? "Importando…" : `Confirmar importación (${dataRows.length} empleados)`}
          </button>
        )}
      </div>
    </Modal>
  );
}

function DepartamentosModal({
  companyId,
  departamentos,
  onClose,
  onSaved,
}: {
  companyId: string;
  departamentos: DepartamentoPersonal[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("departamentos_personal").insert({ company_id: companyId, nombre: nombre.trim() });
    setNombre("");
    setSaving(false);
    onSaved();
  }

  return (
    <Modal title="Departamentos" onClose={onClose}>
      <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
        {departamentos.length === 0 && <p className="p-3 font-mono text-xs text-muted">Sin departamentos todavía.</p>}
        {departamentos.map((d) => (
          <div key={d.id} className="px-3 py-2 font-mono text-xs text-ink">
            {d.nombre}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del departamento"
          className="flex-1 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary">
          Agregar
        </button>
      </form>
    </Modal>
  );
}

function BajaModal({ empleado, onClose, onSaved }: { empleado: Empleado; onClose: () => void; onSaved: () => void }) {
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [motivo, setMotivo] = useState<MotivoBaja>("renuncia");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("empleados").update({ estado: "baja", fecha_baja: fecha, motivo_baja: motivo }).eq("id", empleado.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title={`Dar de baja — ${empleado.nombre_completo}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Fecha de baja" type="date" value={fecha} onChange={setFecha} />
        <select
          value={motivo}
          onChange={(e) => setMotivo(e.target.value as MotivoBaja)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="renuncia">Renuncia</option>
          <option value="despido">Despido</option>
          <option value="termino_contrato">Término de contrato</option>
        </select>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Confirmar baja"}
        </button>
      </form>
    </Modal>
  );
}

function DetalleEmpleadoModal({
  empleado,
  historialSueldo,
  limits,
  onClose,
  onSaved,
}: {
  empleado: Empleado;
  historialSueldo: HistorialSueldo[];
  limits: PersonalTierLimits;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nuevoSueldo, setNuevoSueldo] = useState(String(empleado.sueldo_diario));
  const [saving, setSaving] = useState(false);

  async function cambiarSueldo(e: FormEvent) {
    e.preventDefault();
    const monto = Number(nuevoSueldo);
    if (!monto || monto === empleado.sueldo_diario) return;
    setSaving(true);
    await supabase.from("historial_sueldo").insert({ empleado_id: empleado.id, sueldo_diario: monto });
    await supabase.from("empleados").update({ sueldo_diario: monto }).eq("id", empleado.id);
    setSaving(false);
    onSaved();
  }

  return (
    <Modal title={empleado.nombre_completo} onClose={onClose}>
      <div className="space-y-1 font-mono text-xs text-muted">
        <p>RFC: {empleado.rfc || "—"} · CURP: {empleado.curp || "—"} · NSS: {empleado.nss || "—"}</p>
        <p>Ingreso: {empleado.fecha_ingreso} · Contrato: {empleado.tipo_contrato}</p>
        <p>Sueldo diario actual: {money(empleado.sueldo_diario)}</p>
      </div>

      {limits.departamentosYHistorialSueldo && (
        <>
          <h4 className="mb-2 mt-4 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted">Historial de sueldo</h4>
          <div className="mb-3 divide-y divide-ink/10 border border-ink/10 bg-white">
            {historialSueldo.length === 0 && <p className="p-2 font-mono text-xs text-muted">Sin cambios registrados.</p>}
            {historialSueldo.map((h) => (
              <div key={h.id} className="flex justify-between px-3 py-1.5 font-mono text-xs text-ink">
                <span>{h.fecha_efectiva}</span>
                <span>{money(h.sueldo_diario)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={cambiarSueldo} className="flex gap-2">
            <input
              type="number"
              value={nuevoSueldo}
              onChange={(e) => setNuevoSueldo(e.target.value)}
              className="flex-1 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
            <button type="submit" disabled={saving} className="btn btn-primary">
              Actualizar sueldo
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
