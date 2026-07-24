import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Empleado, Incidencia, IncidenciaTipo } from "../../../lib/database.types";
import type { PersonalTierLimits } from "./limits";
import { diasVacacionesLFT } from "./calculoNomina";
import { parseCsv } from "../treasury/parseCsv";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

const TIPO_LABEL: Record<IncidenciaTipo, string> = {
  falta: "Falta",
  retardo: "Retardo",
  hora_extra: "Hora extra",
  permiso_con_goce: "Permiso con goce",
  permiso_sin_goce: "Permiso sin goce",
  incapacidad: "Incapacidad",
  vacaciones: "Vacaciones",
  prima_dominical: "Prima dominical",
};

const REQUIERE_APROBACION: IncidenciaTipo[] = ["vacaciones", "permiso_con_goce", "permiso_sin_goce"];

function antiguedadAnios(fechaIngreso: string): number {
  return Math.floor((Date.now() - new Date(fechaIngreso).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

export default function IncidenciasTab({
  empleados,
  incidencias,
  limits,
  userId,
  reload,
}: {
  empleados: Empleado[];
  incidencias: Incidencia[];
  limits: PersonalTierLimits;
  userId: string | null;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showChecador, setShowChecador] = useState(false);
  const [filtroEmpleado, setFiltroEmpleado] = useState("");

  const pendientesAprobacion = limits.solicitudAprobacionVacaciones
    ? incidencias.filter((i) => REQUIERE_APROBACION.includes(i.tipo) && !i.aprobado_por)
    : [];

  const lista = filtroEmpleado ? incidencias.filter((i) => i.empleado_id === filtroEmpleado) : incidencias;

  async function aprobar(inc: Incidencia) {
    if (!userId) return;
    await supabase.from("incidencias").update({ aprobado_por: userId }).eq("id", inc.id);
    reload();
  }

  return (
    <div>
      {limits.solicitudAprobacionVacaciones && pendientesAprobacion.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Solicitudes pendientes de aprobación
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {pendientesAprobacion.map((i) => {
              const empleado = empleados.find((e) => e.id === i.empleado_id);
              const puedeAprobar = i.created_by !== userId;
              return (
                <div key={i.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{empleado?.nombre_completo}</p>
                    <p className="font-mono text-[0.66rem] text-muted">
                      {TIPO_LABEL[i.tipo]} · {i.fecha}
                    </p>
                  </div>
                  {puedeAprobar ? (
                    <button onClick={() => aprobar(i)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                      Aprobar
                    </button>
                  ) : (
                    <span className="font-mono text-[0.62rem] text-muted">Esperando otro aprobador</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <select
          value={filtroEmpleado}
          onChange={(e) => setFiltroEmpleado(e.target.value)}
          className="border border-ink/15 bg-sand-2 px-3 py-2 font-mono text-xs text-ink focus:border-teal focus:outline-none"
        >
          <option value="">Todos los empleados</option>
          {empleados.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre_completo}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          {limits.importacionChecador && (
            <button onClick={() => setShowChecador(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
              + Importar checador
            </button>
          )}
          <button onClick={() => setShowImport(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Importar plantilla
          </button>
          <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Registrar incidencia
          </button>
        </div>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {lista.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin incidencias todavía.</p>}
        {lista.map((i) => {
          const empleado = empleados.find((e) => e.id === i.empleado_id);
          return (
            <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{empleado?.nombre_completo}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                  {TIPO_LABEL[i.tipo]} · {i.fecha}
                  {i.horas ? ` · ${i.horas}h` : ""}
                  {i.folio_incapacidad ? ` · folio ${i.folio_incapacidad}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {REQUIERE_APROBACION.includes(i.tipo) && limits.solicitudAprobacionVacaciones && (
                  <Badge color={i.aprobado_por ? "teal" : "orange"}>{i.aprobado_por ? "aprobada" : "pendiente"}</Badge>
                )}
                <Badge color="muted">{i.origen}</Badge>
              </div>
            </div>
          );
        })}
      </div>

      {showNew && (
        <NewIncidenciaModal empleados={empleados} userId={userId} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
      {showImport && (
        <ImportIncidenciasModal empleados={empleados} origen="template" onClose={() => setShowImport(false)} onImported={reload} />
      )}
      {showChecador && (
        <ImportIncidenciasModal empleados={empleados} origen="checador" onClose={() => setShowChecador(false)} onImported={reload} />
      )}
    </div>
  );
}

function NewIncidenciaModal({
  empleados,
  userId,
  onClose,
  onCreated,
}: {
  empleados: Empleado[];
  userId: string | null;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [empleadoId, setEmpleadoId] = useState(empleados[0]?.id ?? "");
  const [tipo, setTipo] = useState<IncidenciaTipo>("falta");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [horas, setHoras] = useState("1");
  const [folio, setFolio] = useState("");
  const [saving, setSaving] = useState(false);

  const empleado = empleados.find((e) => e.id === empleadoId);
  const saldoVacaciones = empleado ? diasVacacionesLFT(antiguedadAnios(empleado.fecha_ingreso)) : 0;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!empleadoId) return;
    setSaving(true);
    await supabase.from("incidencias").insert({
      empleado_id: empleadoId,
      tipo,
      fecha,
      horas: tipo === "hora_extra" ? Number(horas) : null,
      folio_incapacidad: tipo === "incapacidad" ? folio || null : null,
      created_by: userId,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Registrar incidencia" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {empleados.length === 0 && <option value="">Sin empleados — agrega uno primero</option>}
          {empleados.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre_completo}
            </option>
          ))}
        </select>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as IncidenciaTipo)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          {Object.entries(TIPO_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {tipo === "vacaciones" && (
          <p className="font-mono text-[0.62rem] text-muted">Saldo de derecho por antigüedad (LFT): {saldoVacaciones} días.</p>
        )}
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        {tipo === "hora_extra" && (
          <input
            type="number"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            placeholder="Horas"
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        )}
        {tipo === "incapacidad" && (
          <input
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            placeholder="Folio de incapacidad"
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        )}
        <button type="submit" disabled={saving || !empleadoId} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Registrar"}
        </button>
      </form>
    </Modal>
  );
}

function ImportIncidenciasModal({
  empleados,
  origen,
  onClose,
  onImported,
}: {
  empleados: Empleado[];
  origen: "template" | "checador";
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
  const matched = dataRows
    .map((r) => ({ row: r, empleado: empleados.find((e) => e.nombre_completo.toLowerCase() === r[0]?.trim().toLowerCase()) }))
    .filter((m) => m.empleado && m.row[1]?.trim());

  async function confirm() {
    setSaving(true);
    await supabase.from("incidencias").insert(
      matched.map((m) => ({
        empleado_id: m.empleado!.id,
        tipo: m.row[1] as IncidenciaTipo,
        fecha: m.row[2] || new Date().toISOString().slice(0, 10),
        horas: m.row[1] === "hora_extra" ? Number(m.row[3]) || null : null,
        origen,
      })),
    );
    setSaving(false);
    onImported();
    onClose();
  }

  return (
    <Modal title={origen === "checador" ? "Importar archivo de checador" : "Importar plantilla de incidencias"} onClose={onClose}>
      <div className="space-y-3">
        <p className="font-mono text-[0.66rem] text-muted">
          Columnas: nombre del empleado (tal cual en el expediente), tipo, fecha, horas (solo hora_extra).
        </p>
        <input type="file" accept=".csv" onChange={onFile} className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink" />
        {dataRows.length > 0 && (
          <>
            <p className="font-mono text-[0.62rem] text-muted">
              {matched.length} de {dataRows.length} filas encontraron un empleado por nombre.
            </p>
            <button onClick={confirm} disabled={saving || matched.length === 0} className="btn btn-primary w-full">
              {saving ? "Importando…" : `Confirmar importación (${matched.length} incidencias)`}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
