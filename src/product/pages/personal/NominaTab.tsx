import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { ConceptoNomina, Empleado, Finiquito, Incidencia, PeriodicidadPago } from "../../../lib/database.types";
import type { PeriodoFull } from "./usePersonalData";
import type { PersonalTierLimits } from "./limits";
import {
  calcularAguinaldo,
  calcularFiniquito,
  calcularIMSSObrero,
  calcularISRPeriodo,
  calcularPrimaVacacional,
  diasVacacionesLFT,
  type FormulaImssObrero,
  type TramoISR,
} from "./calculoNomina";
import { downloadCsv } from "../treasury/parseCsv";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function diasEnPeriodo(inicio: string, fin: string): number {
  return Math.round((new Date(fin).getTime() - new Date(inicio).getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function antiguedadAnios(fechaIngreso: string): number {
  return Math.floor((Date.now() - new Date(fechaIngreso).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

interface Capturado {
  bono: string;
  comision: string;
  propinas: string;
  infonavit: string;
  pension_alimenticia: string;
  prestamo: string;
  otros_deduccion: string;
  incluirAguinaldo: boolean;
  incluirPrimaVacacional: boolean;
  diasVacacionesTomados: string;
}

const CAPTURADO_VACIO: Capturado = {
  bono: "0",
  comision: "0",
  propinas: "0",
  infonavit: "0",
  pension_alimenticia: "0",
  prestamo: "0",
  otros_deduccion: "0",
  incluirAguinaldo: false,
  incluirPrimaVacacional: false,
  diasVacacionesTomados: "0",
};

interface ConceptoMonto {
  clave: string;
  tipo: "percepcion" | "deduccion";
  monto: number;
}

function calcularConceptosEmpleado(
  emp: Empleado,
  periodo: PeriodoFull,
  incidenciasEmpleado: Incidencia[],
  capturado: Capturado,
  limits: PersonalTierLimits,
  tramosISR: TramoISR[],
  umaDiaria: number,
  formulaImss: FormulaImssObrero | null,
): ConceptoMonto[] {
  const dias = diasEnPeriodo(periodo.fecha_inicio, periodo.fecha_fin);
  const enPeriodo = incidenciasEmpleado.filter((i) => i.fecha >= periodo.fecha_inicio && i.fecha <= periodo.fecha_fin);
  const diasFalta = enPeriodo.filter((i) => i.tipo === "falta" || i.tipo === "permiso_sin_goce").length;
  const sueldoPeriodo = round2(emp.sueldo_diario * Math.max(0, dias - diasFalta));

  const conceptos: ConceptoMonto[] = [{ clave: "sueldo", tipo: "percepcion", monto: sueldoPeriodo }];

  if (limits.horasExtraYPrimaDominical) {
    const horasExtra = enPeriodo.filter((i) => i.tipo === "hora_extra").reduce((sum, i) => sum + (i.horas ?? 0), 0);
    if (horasExtra > 0) conceptos.push({ clave: "horas_extra_dobles", tipo: "percepcion", monto: round2(horasExtra * (emp.sueldo_diario / 8) * 2) });
    const primaDominicalDias = enPeriodo.filter((i) => i.tipo === "prima_dominical").length;
    if (primaDominicalDias > 0) conceptos.push({ clave: "prima_dominical", tipo: "percepcion", monto: round2(primaDominicalDias * emp.sueldo_diario * 0.25) });
  }

  if (Number(capturado.bono) > 0) conceptos.push({ clave: "bono", tipo: "percepcion", monto: round2(Number(capturado.bono)) });
  if (Number(capturado.comision) > 0) conceptos.push({ clave: "comision", tipo: "percepcion", monto: round2(Number(capturado.comision)) });
  if (Number(capturado.propinas) > 0) conceptos.push({ clave: "propinas", tipo: "percepcion", monto: round2(Number(capturado.propinas)) });

  if (limits.aguinaldoYPrimaVacacional && capturado.incluirAguinaldo) {
    const diasTrabajados = Math.min(365, Math.round((Date.now() - new Date(emp.fecha_ingreso).getTime()) / (1000 * 60 * 60 * 24)));
    conceptos.push({ clave: "aguinaldo", tipo: "percepcion", monto: calcularAguinaldo(emp.sueldo_diario, diasTrabajados) });
  }
  if (limits.aguinaldoYPrimaVacacional && capturado.incluirPrimaVacacional) {
    const diasTomados = Number(capturado.diasVacacionesTomados) || 0;
    conceptos.push({ clave: "prima_vacacional", tipo: "percepcion", monto: calcularPrimaVacacional(emp.sueldo_diario, diasTomados) });
  }

  const totalPercepciones = conceptos.reduce((sum, c) => sum + c.monto, 0);

  const isr = calcularISRPeriodo(totalPercepciones, dias, tramosISR);
  conceptos.push({ clave: "isr", tipo: "deduccion", monto: isr });

  if (formulaImss) {
    const imss = calcularIMSSObrero(emp.sueldo_diario, dias, umaDiaria, formulaImss);
    conceptos.push({ clave: "imss_obrero", tipo: "deduccion", monto: imss });
  }

  if (Number(capturado.infonavit) > 0) conceptos.push({ clave: "infonavit", tipo: "deduccion", monto: round2(Number(capturado.infonavit)) });
  if (Number(capturado.pension_alimenticia) > 0)
    conceptos.push({ clave: "pension_alimenticia", tipo: "deduccion", monto: round2(Number(capturado.pension_alimenticia)) });
  if (Number(capturado.prestamo) > 0) conceptos.push({ clave: "prestamo", tipo: "deduccion", monto: round2(Number(capturado.prestamo)) });
  if (Number(capturado.otros_deduccion) > 0) conceptos.push({ clave: "otros_deduccion", tipo: "deduccion", monto: round2(Number(capturado.otros_deduccion)) });

  return conceptos;
}

export default function NominaTab({
  companyId,
  empleados,
  incidencias,
  conceptos,
  periodos,
  finiquitos,
  limits,
  tramosISR,
  umaDiaria,
  formulaImss,
  reload,
}: {
  companyId: string;
  empleados: Empleado[];
  incidencias: Incidencia[];
  conceptos: ConceptoNomina[];
  periodos: PeriodoFull[];
  finiquitos: Finiquito[];
  limits: PersonalTierLimits;
  tramosISR: TramoISR[];
  umaDiaria: number;
  formulaImss: FormulaImssObrero | null;
  reload: () => void;
}) {
  const [showNewPeriodo, setShowNewPeriodo] = useState(false);
  const [periodoAbierto, setPeriodoAbierto] = useState<PeriodoFull | null>(null);
  const [finiquitoEmpleado, setFiniquitoEmpleado] = useState<Empleado | null>(null);

  const costoConsolidado = periodos.map((p) => ({
    periodo: p,
    total: p.recibo_nomina.reduce((sum, r) => sum + r.neto, 0),
  }));

  const bajasSinFiniquito = limits.finiquitosYLiquidaciones
    ? empleados.filter((e) => e.estado === "baja" && !finiquitos.some((f) => f.empleado_id === e.id))
    : [];

  return (
    <div>
      <div className="mb-6 border border-ink/10 bg-white p-4">
        <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Costo de nómina</h3>
        {costoConsolidado.length === 0 && <p className="font-mono text-xs text-muted">Sin periodos calculados todavía.</p>}
        <div className="space-y-1">
          {costoConsolidado.slice(0, 6).map(({ periodo, total }) => (
            <div key={periodo.id} className="flex justify-between font-mono text-xs text-ink">
              <span>
                {periodo.fecha_inicio} – {periodo.fecha_fin}
              </span>
              <span className="font-bold">{money(total)}</span>
              {limits.costoPatronalInformativo && (
                <span className="text-muted">costo patronal aprox. {money(total * 0.2497)}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {limits.finiquitosYLiquidaciones && bajasSinFiniquito.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Bajas pendientes de finiquito</h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {bajasSinFiniquito.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{e.nombre_completo}</p>
                  <p className="font-mono text-[0.66rem] text-muted">
                    Baja {e.fecha_baja} · {e.motivo_baja}
                  </p>
                </div>
                <button
                  onClick={() => setFiniquitoEmpleado(e)}
                  className="font-mono text-[0.62rem] uppercase text-teal hover:underline"
                >
                  Generar finiquito
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {finiquitos.length > 0 && limits.finiquitosYLiquidaciones && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Finiquitos generados</h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {finiquitos.map((f) => {
              const emp = empleados.find((e) => e.id === f.empleado_id);
              return (
                <div key={f.id} className="flex items-center justify-between px-4 py-3">
                  <p className="text-sm font-semibold text-ink">{emp?.nombre_completo}</p>
                  <p className="font-mono text-xs text-ink">
                    {f.tipo} · {money(f.neto)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Periodos de nómina</h3>
        <button onClick={() => setShowNewPeriodo(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Abrir periodo
        </button>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {periodos.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin periodos todavía.</p>}
        {periodos.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <button onClick={() => setPeriodoAbierto(p)} className="text-left">
              <p className="text-sm font-semibold text-ink hover:underline">
                {p.fecha_inicio} – {p.fecha_fin}
              </p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {p.periodicidad} · pago {p.fecha_pago}
              </p>
            </button>
            <Badge color={p.estado === "cerrado" ? "teal" : p.estado === "calculado" ? "orange" : "muted"}>{p.estado}</Badge>
          </div>
        ))}
      </div>

      {showNewPeriodo && <NewPeriodoModal companyId={companyId} onClose={() => setShowNewPeriodo(false)} onCreated={reload} />}

      {periodoAbierto && (
        <PrenominaModal
          companyId={companyId}
          periodo={periodoAbierto}
          empleados={empleados}
          incidencias={incidencias}
          conceptos={conceptos}
          limits={limits}
          tramosISR={tramosISR}
          umaDiaria={umaDiaria}
          formulaImss={formulaImss}
          onClose={() => setPeriodoAbierto(null)}
          onSaved={reload}
        />
      )}

      {finiquitoEmpleado && (
        <FiniquitoModal
          empleado={finiquitoEmpleado}
          umaDiaria={umaDiaria}
          tramosISR={tramosISR}
          onClose={() => setFiniquitoEmpleado(null)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function NewPeriodoModal({ companyId, onClose, onCreated }: { companyId: string; onClose: () => void; onCreated: () => void }) {
  const [periodicidad, setPeriodicidad] = useState<PeriodicidadPago>("quincenal");
  const hoy = new Date().toISOString().slice(0, 10);
  const [fechaInicio, setFechaInicio] = useState(hoy);
  const [fechaFin, setFechaFin] = useState(hoy);
  const [fechaPago, setFechaPago] = useState(hoy);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("periodo_nomina").insert({
      company_id: companyId,
      periodicidad,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      fecha_pago: fechaPago,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Abrir periodo de nómina" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={periodicidad}
          onChange={(e) => setPeriodicidad(e.target.value as PeriodicidadPago)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="semanal">Semanal</option>
          <option value="catorcenal">Catorcenal</option>
          <option value="quincenal">Quincenal</option>
        </select>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-2 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-2 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">Pago</label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-2 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          </div>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Abrir periodo"}
        </button>
      </form>
    </Modal>
  );
}

function PrenominaModal({
  companyId,
  periodo,
  empleados,
  incidencias,
  conceptos,
  limits,
  tramosISR,
  umaDiaria,
  formulaImss,
  onClose,
  onSaved,
}: {
  companyId: string;
  periodo: PeriodoFull;
  empleados: Empleado[];
  incidencias: Incidencia[];
  conceptos: ConceptoNomina[];
  limits: PersonalTierLimits;
  tramosISR: TramoISR[];
  umaDiaria: number;
  formulaImss: FormulaImssObrero | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const empleadosVigentes = empleados.filter(
    (e) => e.fecha_ingreso <= periodo.fecha_fin && (e.estado === "activo" || (e.fecha_baja && e.fecha_baja >= periodo.fecha_inicio)),
  );
  const [capturados, setCapturados] = useState<Record<string, Capturado>>(
    Object.fromEntries(empleadosVigentes.map((e) => [e.id, { ...CAPTURADO_VACIO }])),
  );
  const [saving, setSaving] = useState(false);
  const [cerrando, setCerrando] = useState(false);

  function setCap(empleadoId: string, patch: Partial<Capturado>) {
    setCapturados((prev) => ({ ...prev, [empleadoId]: { ...prev[empleadoId], ...patch } }));
  }

  function reciboExistente(empleadoId: string) {
    return periodo.recibo_nomina.find((r) => r.empleado_id === empleadoId);
  }

  async function calcularPrenomina() {
    setSaving(true);
    for (const emp of empleadosVigentes) {
      const incidenciasEmpleado = incidencias.filter((i) => i.empleado_id === emp.id);
      const items = calcularConceptosEmpleado(
        emp,
        periodo,
        incidenciasEmpleado,
        capturados[emp.id] ?? CAPTURADO_VACIO,
        limits,
        tramosISR,
        umaDiaria,
        formulaImss,
      );
      const totalPercepciones = round2(items.filter((i) => i.tipo === "percepcion").reduce((s, i) => s + i.monto, 0));
      const totalDeducciones = round2(items.filter((i) => i.tipo === "deduccion").reduce((s, i) => s + i.monto, 0));
      const neto = round2(totalPercepciones - totalDeducciones);

      const { data: recibo } = await supabase
        .from("recibo_nomina")
        .upsert(
          { periodo_id: periodo.id, empleado_id: emp.id, total_percepciones: totalPercepciones, total_deducciones: totalDeducciones, neto },
          { onConflict: "periodo_id,empleado_id" },
        )
        .select()
        .single();

      if (recibo) {
        await supabase.from("recibo_detalle").delete().eq("recibo_id", recibo.id);
        await supabase.from("recibo_detalle").insert(
          items.map((it) => {
            const concepto = conceptos.find((c) => c.clave === it.clave);
            return { recibo_id: recibo.id, concepto_id: concepto?.id, tipo: it.tipo, monto: it.monto, origen: concepto?.origen ?? "calculado" };
          }),
        );
      }
    }
    await supabase.from("periodo_nomina").update({ estado: "calculado" }).eq("id", periodo.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  async function cerrarPeriodo() {
    setCerrando(true);
    const totalNeto = round2(periodo.recibo_nomina.reduce((s, r) => s + r.neto, 0));
    await supabase.from("periodo_nomina").update({ estado: "cerrado" }).eq("id", periodo.id);
    await supabase
      .from("incidencias")
      .update({ estado: "aplicada_en_nomina" })
      .in("empleado_id", empleadosVigentes.map((e) => e.id))
      .gte("fecha", periodo.fecha_inicio)
      .lte("fecha", periodo.fecha_fin);
    if (totalNeto > 0) {
      await supabase.from("mov_esperados").insert({
        company_id: companyId,
        tipo: "egreso",
        monto: totalNeto,
        fecha_esperada: periodo.fecha_pago,
        modulo_origen: "personal",
        referencia_id: periodo.id,
        concepto: `Nómina ${periodo.fecha_inicio} – ${periodo.fecha_fin}`,
      });
    }
    setCerrando(false);
    onSaved();
    onClose();
  }

  function verReciboPdf(emp: Empleado) {
    const recibo = reciboExistente(emp.id);
    if (!recibo) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Recibo — ${emp.nombre_completo}</title>
      <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;margin-top:1rem;} td,th{border:1px solid #ccc;padding:6px;text-align:left;font-size:0.85rem;}</style>
      </head><body>
      <h2>Recibo de nómina — ${emp.nombre_completo}</h2>
      <p>Periodo: ${periodo.fecha_inicio} – ${periodo.fecha_fin} · Pago: ${periodo.fecha_pago}</p>
      <table><thead><tr><th>Concepto</th><th>Tipo</th><th>Monto</th></tr></thead><tbody>
      ${recibo.recibo_detalle
        .map((d) => {
          const c = conceptos.find((c) => c.id === d.concepto_id);
          return `<tr><td>${c?.nombre ?? d.concepto_id}</td><td>${d.tipo}</td><td>${money(d.monto)}</td></tr>`;
        })
        .join("")}
      </tbody></table>
      <p style="text-align:right;margin-top:1rem;">Percepciones: ${money(recibo.total_percepciones)}<br/>Deducciones: ${money(recibo.total_deducciones)}<br/><b>Neto: ${money(recibo.neto)}</b></p>
      <script>window.print()</script>
      </body></html>
    `);
    win.document.close();
  }

  function exportarDispersion() {
    const rows: (string | number)[][] = [["Empleado", "Cuenta", "Neto"]];
    for (const emp of empleadosVigentes) {
      const recibo = reciboExistente(emp.id);
      if (recibo) rows.push([emp.nombre_completo, emp.cuenta_deposito ?? "", recibo.neto]);
    }
    downloadCsv(`dispersion-${periodo.fecha_pago}.csv`, rows);
  }

  return (
    <Modal title={`Periodo ${periodo.fecha_inicio} – ${periodo.fecha_fin}`} onClose={onClose}>
      <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
        {empleadosVigentes.map((emp) => {
          const cap = capturados[emp.id] ?? CAPTURADO_VACIO;
          const recibo = reciboExistente(emp.id);
          return (
            <div key={emp.id} className="border border-ink/10 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">{emp.nombre_completo}</p>
                {recibo && <span className="font-mono text-xs font-bold text-teal">Neto {money(recibo.neto)}</span>}
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-[0.66rem]">
                <label className="flex flex-col gap-0.5">
                  Bono
                  <input
                    type="number"
                    value={cap.bono}
                    onChange={(e) => setCap(emp.id, { bono: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  Comisión
                  <input
                    type="number"
                    value={cap.comision}
                    onChange={(e) => setCap(emp.id, { comision: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  Propinas
                  <input
                    type="number"
                    value={cap.propinas}
                    onChange={(e) => setCap(emp.id, { propinas: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  INFONAVIT
                  <input
                    type="number"
                    value={cap.infonavit}
                    onChange={(e) => setCap(emp.id, { infonavit: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  Pensión aliment.
                  <input
                    type="number"
                    value={cap.pension_alimenticia}
                    onChange={(e) => setCap(emp.id, { pension_alimenticia: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  Préstamo
                  <input
                    type="number"
                    value={cap.prestamo}
                    onChange={(e) => setCap(emp.id, { prestamo: e.target.value })}
                    className="border border-ink/15 bg-sand-2 px-2 py-1 text-ink focus:border-teal focus:outline-none"
                  />
                </label>
              </div>
              {limits.aguinaldoYPrimaVacacional && (
                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[0.62rem]">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={cap.incluirAguinaldo}
                      onChange={(e) => setCap(emp.id, { incluirAguinaldo: e.target.checked })}
                    />
                    Incluir aguinaldo
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={cap.incluirPrimaVacacional}
                      onChange={(e) => setCap(emp.id, { incluirPrimaVacacional: e.target.checked })}
                    />
                    Prima vacacional, días tomados:
                    <input
                      type="number"
                      value={cap.diasVacacionesTomados}
                      onChange={(e) => setCap(emp.id, { diasVacacionesTomados: e.target.value })}
                      className="w-14 border border-ink/15 bg-sand-2 px-1 py-0.5 text-ink focus:border-teal focus:outline-none"
                    />
                  </label>
                </div>
              )}
              {recibo && (
                <button onClick={() => verReciboPdf(emp)} className="mt-2 font-mono text-[0.6rem] uppercase text-muted hover:text-ink">
                  Ver recibo PDF
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={calcularPrenomina} disabled={saving} className="btn btn-primary flex-1">
          {saving ? "Calculando…" : "Calcular prenómina"}
        </button>
        {periodo.estado === "calculado" && (
          <>
            <button onClick={exportarDispersion} className="btn btn-outline">
              Dispersión CSV
            </button>
            <button onClick={cerrarPeriodo} disabled={cerrando} className="btn btn-outline">
              {cerrando ? "Cerrando…" : "Cerrar periodo"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function FiniquitoModal({
  empleado,
  umaDiaria,
  tramosISR,
  onClose,
  onSaved,
}: {
  empleado: Empleado;
  umaDiaria: number;
  tramosISR: TramoISR[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const aniosAntiguedad = Math.max(1, antiguedadAnios(empleado.fecha_ingreso));
  const diasTrabajadosEnAnio = Math.round((new Date(empleado.fecha_baja ?? new Date()).getTime() - new Date(empleado.fecha_ingreso).getTime()) / (1000 * 60 * 60 * 24)) % 365;
  const [diasVacacionesPendientes, setDiasVacacionesPendientes] = useState(String(diasVacacionesLFT(aniosAntiguedad)));
  const [saving, setSaving] = useState(false);

  const resultado = calcularFiniquito({
    sueldoDiario: empleado.sueldo_diario,
    diasTrabajadosEnAnio,
    diasVacacionesPendientes: Number(diasVacacionesPendientes) || 0,
    aniosAntiguedad,
    esDespido: empleado.motivo_baja === "despido",
    umaDiaria,
    tramosISR,
  });

  async function guardar() {
    setSaving(true);
    await supabase.from("finiquito").insert({
      empleado_id: empleado.id,
      tipo: empleado.motivo_baja === "despido" ? "liquidacion" : "finiquito",
      desglose: resultado,
      isr_separacion: resultado.isrSeparacion,
      neto: resultado.neto,
    });
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title={`Finiquito — ${empleado.nombre_completo}`} onClose={onClose}>
      <div className="space-y-3">
        <label className="flex flex-col gap-1 font-mono text-xs">
          Días de vacaciones pendientes
          <input
            type="number"
            value={diasVacacionesPendientes}
            onChange={(e) => setDiasVacacionesPendientes(e.target.value)}
            className="border border-ink/15 bg-sand-2 px-2 py-1.5 text-ink focus:border-teal focus:outline-none"
          />
        </label>
        <div className="space-y-1 border border-ink/10 bg-sand-2 p-3 font-mono text-xs text-ink">
          <div className="flex justify-between">
            <span>Aguinaldo proporcional</span>
            <span>{money(resultado.aguinaldoProporcional)}</span>
          </div>
          <div className="flex justify-between">
            <span>Vacaciones no gozadas</span>
            <span>{money(resultado.vacacionesNoGozadas)}</span>
          </div>
          <div className="flex justify-between">
            <span>Prima vacacional proporcional</span>
            <span>{money(resultado.primaVacacionalProporcional)}</span>
          </div>
          {empleado.motivo_baja === "despido" && (
            <>
              <div className="flex justify-between">
                <span>Indemnización (90 + 20/año)</span>
                <span>{money(resultado.indemnizacion)}</span>
              </div>
              <div className="flex justify-between">
                <span>Prima de antigüedad</span>
                <span>{money(resultado.primaAntiguedad)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-orange">
            <span>ISR de separación (aprox.)</span>
            <span>-{money(resultado.isrSeparacion)}</span>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-1 font-bold">
            <span>Neto</span>
            <span>{money(resultado.neto)}</span>
          </div>
        </div>
        <p className="font-mono text-[0.6rem] text-muted">
          Cálculo de referencia — valida con el contador aliado antes de dispersar un finiquito real.
        </p>
        <button onClick={guardar} disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar finiquito"}
        </button>
      </div>
    </Modal>
  );
}
