import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { CitaEstado, LdnCitasAppointment, LdnCitasService, LdnCitasServiceEmployee, LdnCitasSchedule, ProductoServicio } from "../../../lib/database.types";
import type { Empleado } from "./useCitasData";
import { empleadosElegibles, horariosLibres } from "./disponibilidad";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";
import Badge from "../../../admin/components/Badge";

const ESTADO_LABEL: Record<CitaEstado, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  completada: "Completada",
  no_asistio: "No asistió",
};

function hoy(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fechaLocal(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AgendaTab({
  productos,
  servicios,
  serviceEmployees,
  schedules,
  appointments,
  empleados,
  reload,
}: {
  productos: ProductoServicio[];
  servicios: LdnCitasService[];
  serviceEmployees: LdnCitasServiceEmployee[];
  schedules: LdnCitasSchedule[];
  appointments: LdnCitasAppointment[];
  empleados: Empleado[];
  reload: () => void;
}) {
  const [fecha, setFecha] = useState(hoy());
  const [showNew, setShowNew] = useState(false);

  const delDia = appointments.filter((a) => fechaLocal(a.fecha_hora_inicio) === fecha).sort((a, b) => a.fecha_hora_inicio.localeCompare(b.fecha_hora_inicio));

  async function cambiarEstado(cita: LdnCitasAppointment, estado: CitaEstado) {
    await supabase.from("ldn_citas_appointments").update({ estado }).eq("id", cita.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border border-ink/15 bg-sand-2 px-3 py-2 font-mono text-xs text-ink focus:border-teal focus:outline-none"
        />
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nueva cita
        </button>
      </div>

      {servicios.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">
          Todavía no tienes servicios dados de alta — hazlo en la pestaña "Servicios".
        </p>
      ) : delDia.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin citas este día.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {delDia.map((c) => {
            const servicio = servicios.find((s) => s.id === c.service_id);
            const producto = productos.find((p) => p.id === servicio?.sales_product_id);
            const empleado = empleados.find((e) => e.id === c.empleado_id);
            const hora = new Date(c.fecha_hora_inicio).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
            return (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className="text-sm text-ink">
                    {hora} · {c.cliente_nombre}
                  </span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {producto?.nombre ?? "Servicio eliminado"} · {empleado?.nombre ?? "sin asignar"}
                    {c.telefono ? ` · ${c.telefono}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge color={c.estado === "completada" ? "teal" : c.estado === "no_asistio" || c.estado === "cancelada" ? "muted" : "orange"}>
                    {ESTADO_LABEL[c.estado]}
                  </Badge>
                  {(c.estado === "pendiente" || c.estado === "confirmada") && (
                    <>
                      <button onClick={() => cambiarEstado(c, "completada")} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                        Completada
                      </button>
                      <button onClick={() => cambiarEstado(c, "no_asistio")} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                        No asistió
                      </button>
                      <button onClick={() => cambiarEstado(c, "cancelada")} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewCitaModal
          fechaInicial={fecha}
          productos={productos}
          servicios={servicios}
          serviceEmployees={serviceEmployees}
          schedules={schedules}
          appointments={appointments}
          empleados={empleados}
          onClose={() => setShowNew(false)}
          onCreated={reload}
        />
      )}
    </div>
  );
}

function NewCitaModal({
  fechaInicial,
  productos,
  servicios,
  serviceEmployees,
  schedules,
  appointments,
  empleados,
  onClose,
  onCreated,
}: {
  fechaInicial: string;
  productos: ProductoServicio[];
  servicios: LdnCitasService[];
  serviceEmployees: LdnCitasServiceEmployee[];
  schedules: LdnCitasSchedule[];
  appointments: LdnCitasAppointment[];
  empleados: Empleado[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [servicioId, setServicioId] = useState(servicios[0]?.id ?? "");
  const [fecha, setFecha] = useState(fechaInicial);
  const [modoEmpleado, setModoEmpleado] = useState<"cualquiera" | "especifico">("cualquiera");
  const [empleadoId, setEmpleadoId] = useState("");
  const [hora, setHora] = useState("");
  const [clienteNombre, setClienteNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notas, setNotas] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const servicio = servicios.find((s) => s.id === servicioId) ?? null;
  const elegibles = servicioId ? empleadosElegibles(servicioId, serviceEmployees, empleados) : [];

  // Para "cualquiera disponible" se junta el hueco de cada elegible, y se
  // recuerda a quién le pertenece cada horario para asignarlo al confirmar.
  const horaAEmpleado = new Map<string, string>();
  if (servicio && fecha) {
    if (modoEmpleado === "especifico" && empleadoId) {
      for (const h of horariosLibres(empleadoId, fecha, servicio.duracion_minutos, schedules, appointments)) {
        horaAEmpleado.set(h, empleadoId);
      }
    } else if (modoEmpleado === "cualquiera") {
      for (const emp of elegibles) {
        for (const h of horariosLibres(emp.id, fecha, servicio.duracion_minutos, schedules, appointments)) {
          if (!horaAEmpleado.has(h)) horaAEmpleado.set(h, emp.id);
        }
      }
    }
  }
  const horasDisponibles = [...horaAEmpleado.keys()].sort();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!servicio || !clienteNombre.trim() || !hora) return;
    const empleadoFinal = horaAEmpleado.get(hora);
    if (!empleadoFinal) return;

    setSaving(true);
    setError(null);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const inicio = new Date(`${fecha}T${hora}:00`);
    const fin = new Date(inicio.getTime() + servicio.duracion_minutos * 60_000);
    const { error: insertError } = await supabase.from("ldn_citas_appointments").insert({
      company_id: servicio.company_id,
      service_id: servicio.id,
      empleado_id: empleadoFinal,
      cliente_nombre: clienteNombre.trim(),
      telefono: telefono.trim() || null,
      fecha_hora_inicio: inicio.toISOString(),
      fecha_hora_fin: fin.toISOString(),
      notas: notas.trim() || null,
      created_by: user?.id ?? null,
    });
    setSaving(false);
    if (insertError) {
      setError(
        insertError.code === "23P01"
          ? "Ese horario ya se acaba de ocupar — elige otro."
          : insertError.message,
      );
      return;
    }
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva cita" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Servicio</label>
          <select
            value={servicioId}
            onChange={(e) => {
              setServicioId(e.target.value);
              setHora("");
            }}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {servicios.map((s) => {
              const p = productos.find((pr) => pr.id === s.sales_product_id);
              return (
                <option key={s.id} value={s.id}>
                  {p?.nombre ?? "—"} ({s.duracion_minutos} min)
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">¿Quién atiende?</label>
          <select
            value={modoEmpleado}
            onChange={(e) => {
              setModoEmpleado(e.target.value as "cualquiera" | "especifico");
              setEmpleadoId("");
              setHora("");
            }}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="cualquiera">Cualquiera disponible</option>
            <option value="especifico">Un empleado en específico</option>
          </select>
        </div>

        {modoEmpleado === "especifico" && (
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Empleado</label>
            <select
              value={empleadoId}
              onChange={(e) => {
                setEmpleadoId(e.target.value);
                setHora("");
              }}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="">Elige un empleado</option>
              {elegibles.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
              setHora("");
            }}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Hora</label>
          <select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            disabled={horasDisponibles.length === 0}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none disabled:opacity-50"
          >
            <option value="">{horasDisponibles.length === 0 ? "Sin horarios libres ese día" : "Elige una hora"}</option>
            {horasDisponibles.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <FieldInput label="Nombre del cliente" value={clienteNombre} onChange={setClienteNombre} required />
        <FieldInput label="Teléfono (opcional)" value={telefono} onChange={setTelefono} />
        <FieldInput label="Notas (opcional)" value={notas} onChange={setNotas} />

        <button type="submit" disabled={saving || !hora} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear cita"}
        </button>
      </form>
    </Modal>
  );
}
