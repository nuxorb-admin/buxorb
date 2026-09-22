import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { LdnCitasService, LdnCitasServiceEmployee, ProductoServicio } from "../../../lib/database.types";
import type { Empleado } from "./useCitasData";
import type { CitasTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";

export default function ServiciosTab({
  productos,
  servicios,
  serviceEmployees,
  empleados,
  limits,
  reload,
}: {
  productos: ProductoServicio[];
  servicios: LdnCitasService[];
  serviceEmployees: LdnCitasServiceEmployee[];
  empleados: Empleado[];
  limits: CitasTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editandoEmpleadosDe, setEditandoEmpleadosDe] = useState<LdnCitasService | null>(null);

  const enCitas = new Set(servicios.map((s) => s.sales_product_id));
  const disponibles = productos.filter((p) => !enCitas.has(p.id));

  async function quitar(servicio: LdnCitasService) {
    await supabase.from("ldn_citas_services").delete().eq("id", servicio.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Servicios ({servicios.length})</h3>
        <button
          onClick={() => setShowNew(true)}
          disabled={disponibles.length === 0}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Agregar servicio
        </button>
      </div>

      <p className="mb-4 font-mono text-[0.62rem] text-muted">
        Los servicios salen del catálogo de Ventas y CxC — precio se edita ahí. Aquí solo eliges cuáles se pueden
        agendar, cuánto duran y quién los puede dar.
      </p>

      {productos.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Todavía no tienes productos/servicios en el catálogo de Ventas y CxC.</p>
      ) : servicios.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin servicios agendables todavía.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {servicios.map((s) => {
            const producto = productos.find((p) => p.id === s.sales_product_id);
            const asignados = serviceEmployees.filter((se) => se.service_id === s.id).map((se) => se.empleado_id);
            const nombresAsignados = empleados.filter((e) => asignados.includes(e.id)).map((e) => e.nombre);
            return (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className="text-sm text-ink">{producto?.nombre ?? "Producto eliminado"}</span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {s.duracion_minutos} min · ${producto?.precio_unitario.toFixed(2) ?? "—"} · {nombresAsignados.join(", ") || "cualquiera disponible"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {limits.restriccionServicioEmpleado && (
                    <button onClick={() => setEditandoEmpleadosDe(s)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                      Empleados
                    </button>
                  )}
                  <button onClick={() => quitar(s)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewServiceModal companyId={productos[0]?.company_id ?? ""} disponibles={disponibles} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
      {editandoEmpleadosDe && (
        <EmpleadosServicioModal
          servicio={editandoEmpleadosDe}
          asignados={serviceEmployees.filter((se) => se.service_id === editandoEmpleadosDe.id).map((se) => se.empleado_id)}
          empleados={empleados}
          onClose={() => setEditandoEmpleadosDe(null)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function NewServiceModal({
  companyId,
  disponibles,
  onClose,
  onCreated,
}: {
  companyId: string;
  disponibles: ProductoServicio[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [productoId, setProductoId] = useState(disponibles[0]?.id ?? "");
  const [duracion, setDuracion] = useState("30");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!productoId || !Number(duracion)) return;
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from("ldn_citas_services").insert({
      company_id: companyId,
      sales_product_id: productoId,
      duracion_minutos: Number(duracion),
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    onCreated();
    onClose();
  }

  return (
    <Modal title="Agregar servicio" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Producto/servicio</label>
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {disponibles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Duración (minutos)</label>
          <input
            type="number"
            min={5}
            step={5}
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Agregar"}
        </button>
      </form>
    </Modal>
  );
}

function EmpleadosServicioModal({
  servicio,
  asignados,
  empleados,
  onClose,
  onSaved,
}: {
  servicio: LdnCitasService;
  asignados: string[];
  empleados: Empleado[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [seleccion, setSeleccion] = useState<Set<string>>(new Set(asignados));
  const [saving, setSaving] = useState(false);

  function toggle(id: string) {
    const next = new Set(seleccion);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSeleccion(next);
  }

  async function guardar() {
    setSaving(true);
    await supabase.from("ldn_citas_service_employees").delete().eq("service_id", servicio.id);
    if (seleccion.size > 0) {
      await supabase.from("ldn_citas_service_employees").insert([...seleccion].map((empleado_id) => ({ service_id: servicio.id, empleado_id })));
    }
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Quién puede dar este servicio" onClose={onClose}>
      <p className="mb-3 font-mono text-[0.62rem] text-muted">Sin nadie marcado, cualquier empleado con horario libre lo puede dar.</p>
      <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
        {empleados.length === 0 && <p className="p-3 font-mono text-xs text-muted">Sin usuarios en esta empresa todavía.</p>}
        {empleados.map((e) => (
          <label key={e.id} className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-ink">
            <input type="checkbox" checked={seleccion.has(e.id)} onChange={() => toggle(e.id)} />
            {e.nombre}
          </label>
        ))}
      </div>
      <button onClick={guardar} disabled={saving} className="btn btn-primary w-full">
        {saving ? "Guardando…" : "Guardar"}
      </button>
    </Modal>
  );
}
