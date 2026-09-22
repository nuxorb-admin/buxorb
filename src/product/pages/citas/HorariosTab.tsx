import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { LdnCitasSchedule } from "../../../lib/database.types";
import type { Empleado } from "./useCitasData";

// Orden de despliegue (lunes primero) — el value es el mismo que
// Date.getDay() (0=domingo…6=sábado), que es lo que usa disponibilidad.ts.
const DIAS: { value: number; label: string }[] = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 0, label: "Domingo" },
];

export default function HorariosTab({
  companyId,
  schedules,
  empleados,
  reload,
}: {
  companyId: string;
  schedules: LdnCitasSchedule[];
  empleados: Empleado[];
  reload: () => void;
}) {
  const [empleadoId, setEmpleadoId] = useState(empleados[0]?.id ?? "");
  const [diaSemana, setDiaSemana] = useState(1);
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [horaFin, setHoraFin] = useState("18:00");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delEmpleado = schedules
    .filter((s) => s.empleado_id === empleadoId)
    .sort((a, b) => DIAS.findIndex((d) => d.value === a.dia_semana) - DIAS.findIndex((d) => d.value === b.dia_semana));

  async function agregar(e: FormEvent) {
    e.preventDefault();
    if (!empleadoId) return;
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from("ldn_citas_schedules").insert({
      company_id: companyId,
      empleado_id: empleadoId,
      dia_semana: diaSemana,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    reload();
  }

  async function quitar(id: string) {
    await supabase.from("ldn_citas_schedules").delete().eq("id", id);
    reload();
  }

  if (empleados.length === 0) {
    return <p className="font-mono text-[0.68rem] text-muted">Sin usuarios en esta empresa todavía.</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Empleado</label>
        <select
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          className="w-full max-w-xs border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {empleados.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nombre}
            </option>
          ))}
        </select>
      </div>

      {delEmpleado.length === 0 ? (
        <p className="mb-4 font-mono text-[0.68rem] text-muted">Sin horario capturado — sin esto no se le pueden agendar citas.</p>
      ) : (
        <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
          {delEmpleado.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-2">
              <span className="font-mono text-xs text-ink">
                {DIAS.find((d) => d.value === s.dia_semana)?.label} · {s.hora_inicio.slice(0, 5)} – {s.hora_fin.slice(0, 5)}
              </span>
              <button onClick={() => quitar(s.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <div className="mb-3 border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

      <form onSubmit={agregar} className="flex flex-wrap items-end gap-2">
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Día</label>
          <select
            value={diaSemana}
            onChange={(e) => setDiaSemana(Number(e.target.value))}
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {DIAS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">De</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">A</label>
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <button type="submit" disabled={saving || !empleadoId} className="btn btn-primary">
          {saving ? "Guardando…" : "Agregar bloque"}
        </button>
      </form>
    </div>
  );
}
