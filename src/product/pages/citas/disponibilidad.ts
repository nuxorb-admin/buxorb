import type { LdnCitasAppointment, LdnCitasSchedule, LdnCitasServiceEmployee } from "../../../lib/database.types";
import type { Empleado } from "./useCitasData";

interface Rango {
  inicio: number; // minutos desde medianoche
  fin: number;
}

// Granularidad de los horarios que se ofrecen al capturar una cita —
// no es configurable en v1, un intervalo más fino generaría demasiadas
// opciones para elegir a mano.
const INCREMENTO_MINUTOS = 15;

export function empleadosElegibles(servicioId: string, serviceEmployees: LdnCitasServiceEmployee[], empleados: Empleado[]): Empleado[] {
  const asignados = serviceEmployees.filter((se) => se.service_id === servicioId).map((se) => se.empleado_id);
  if (asignados.length === 0) return empleados;
  return empleados.filter((e) => asignados.includes(e.id));
}

function horaAMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function minutosAHora(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Compara por fecha/hora local, no por el prefijo del ISO en UTC que
// devuelve Supabase — una cita de la tarde puede caer en otro día en UTC.
function fechaLocal(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function minutosDelDiaLocal(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

function restarOcupado(libres: Rango[], ocupado: Rango[]): Rango[] {
  let resultado = libres;
  for (const o of ocupado) {
    const siguiente: Rango[] = [];
    for (const r of resultado) {
      if (o.fin <= r.inicio || o.inicio >= r.fin) {
        siguiente.push(r);
        continue;
      }
      if (o.inicio > r.inicio) siguiente.push({ inicio: r.inicio, fin: Math.min(o.inicio, r.fin) });
      if (o.fin < r.fin) siguiente.push({ inicio: Math.max(o.fin, r.inicio), fin: r.fin });
    }
    resultado = siguiente;
  }
  return resultado;
}

/** Horarios de inicio (HH:mm, hora local) donde ese empleado tiene hueco libre para la duración pedida, ese día. */
export function horariosLibres(
  empleadoId: string,
  fecha: string, // 'YYYY-MM-DD'
  duracionMinutos: number,
  schedules: LdnCitasSchedule[],
  appointments: LdnCitasAppointment[],
): string[] {
  const diaSemana = new Date(`${fecha}T00:00:00`).getDay();
  const bloques: Rango[] = schedules
    .filter((s) => s.empleado_id === empleadoId && s.dia_semana === diaSemana)
    .map((s) => ({ inicio: horaAMinutos(s.hora_inicio), fin: horaAMinutos(s.hora_fin) }));
  if (bloques.length === 0) return [];

  const ocupado: Rango[] = appointments
    .filter((a) => a.empleado_id === empleadoId && fechaLocal(a.fecha_hora_inicio) === fecha)
    .map((a) => ({ inicio: minutosDelDiaLocal(a.fecha_hora_inicio), fin: minutosDelDiaLocal(a.fecha_hora_fin) }));

  const libres = restarOcupado(bloques, ocupado);
  const horarios: string[] = [];
  for (const r of libres) {
    for (let inicio = r.inicio; inicio + duracionMinutos <= r.fin; inicio += INCREMENTO_MINUTOS) {
      horarios.push(minutosAHora(inicio));
    }
  }
  return horarios;
}
