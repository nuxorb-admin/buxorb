import { supabase } from "../../../lib/supabase";
import { diasVacacionesLFT } from "./calculoNomina";

export function aniversarioActual(fechaIngreso: string): number {
  return Math.floor((Date.now() - new Date(fechaIngreso).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

// No hay infraestructura de jobs programados en este proyecto — en vez de un
// trigger anual, la fila del aniversario en curso se asegura (crea o
// actualiza dias_derecho) de forma perezosa cada vez que se necesita: al
// abrir la ficha del empleado o al registrar/aprobar una incidencia de
// vacaciones. dias_gozados nunca se toca aquí — si la fila ya existe se
// respeta su valor, y si es nueva nace en 0 (default de la tabla).
export async function ensureSaldoVacaciones(empleadoId: string, fechaIngreso: string) {
  const aniversario = aniversarioActual(fechaIngreso);
  if (aniversario < 1) return null;
  const diasDerecho = diasVacacionesLFT(aniversario);
  const { data } = await supabase
    .from("hr_vacation_balances")
    .upsert({ empleado_id: empleadoId, aniversario, dias_derecho: diasDerecho }, { onConflict: "empleado_id,aniversario" })
    .select()
    .single();
  return data as { id: string; dias_derecho: number; dias_gozados: number } | null;
}

// Suma 1 día gozado al aniversario en curso — una incidencia de vacaciones
// siempre representa un día (no hay campo de "cantidad de días" en
// hr_incidents). Se llama al crearla (Essential, sin aprobación) o al
// aprobarla (Professional).
export async function registrarDiaGozado(empleadoId: string, fechaIngreso: string) {
  const saldo = await ensureSaldoVacaciones(empleadoId, fechaIngreso);
  if (!saldo) return;
  await supabase
    .from("hr_vacation_balances")
    .update({ dias_gozados: Number(saldo.dias_gozados) + 1 })
    .eq("id", saldo.id);
}
