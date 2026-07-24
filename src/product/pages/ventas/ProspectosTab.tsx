import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { Cliente, EtapaPipeline, MotivoPerdida, Oportunidad, OportunidadEstado, Prospecto } from "../../../lib/database.types";
import type { VentasTierLimits } from "./limits";
import KanbanBoard, { type KanbanColumn } from "../../../admin/components/KanbanBoard";
import Modal from "../../../admin/components/Modal";
import Badge from "../../../admin/components/Badge";

function money(n: number | null) {
  if (n === null) return "—";
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
}

const ESTADO_LABEL: Record<OportunidadEstado, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  negociacion: "Negociación",
  ganada: "Ganada",
  perdida: "Perdida",
};

const ESTADO_COLOR: Record<OportunidadEstado, "muted" | "orange" | "teal" | "ink"> = {
  nuevo: "muted",
  contactado: "orange",
  negociacion: "orange",
  ganada: "teal",
  perdida: "ink",
};

interface CompanyUserRow {
  user_id: string;
  full_name: string | null;
  email: string;
}

export default function ProspectosTab({
  companyId,
  prospectos,
  clientes,
  etapasPipeline,
  motivosPerdida,
  oportunidades,
  companyUsers,
  limits,
  reload,
}: {
  companyId: string;
  prospectos: Prospecto[];
  clientes: Cliente[];
  etapasPipeline: EtapaPipeline[];
  motivosPerdida: MotivoPerdida[];
  oportunidades: Oportunidad[];
  companyUsers: CompanyUserRow[];
  limits: VentasTierLimits;
  reload: () => void;
}) {
  const [showNewProspecto, setShowNewProspecto] = useState(false);
  const [showNewOportunidad, setShowNewOportunidad] = useState(false);
  const [showEtapas, setShowEtapas] = useState(false);
  const [showMotivos, setShowMotivos] = useState(false);
  const [perdiendo, setPerdiendo] = useState<Oportunidad | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<OportunidadEstado | "">("");

  function nombreProspectoOCliente(o: Oportunidad) {
    if (o.cliente_id) return clientes.find((c) => c.id === o.cliente_id)?.razon_social ?? "—";
    return prospectos.find((p) => p.id === o.prospecto_id)?.nombre ?? "—";
  }

  async function marcarGanada(o: Oportunidad) {
    let clienteId = o.cliente_id;
    if (!clienteId && o.prospecto_id) {
      const prospecto = prospectos.find((p) => p.id === o.prospecto_id);
      const { data: cliente } = await supabase
        .from("clientes")
        .insert({ company_id: companyId, razon_social: prospecto?.nombre ?? "Cliente nuevo", email: prospecto?.contacto_correo, telefono: prospecto?.contacto_telefono })
        .select()
        .single();
      clienteId = cliente?.id ?? null;
    }
    await supabase.from("oportunidades").update({ estado: "ganada", cliente_id: clienteId }).eq("id", o.id);
    reload();
  }

  async function moverEtapa(oportunidadId: string, nuevaEtapaId: string) {
    await supabase.from("oportunidades").update({ etapa_id: nuevaEtapaId }).eq("id", oportunidadId);
    reload();
  }

  const listaFiltrada = filtroEstado ? oportunidades.filter((o) => o.estado === filtroEstado) : oportunidades;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Prospectos</h3>
        <button onClick={() => setShowNewProspecto(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
          + Nuevo prospecto
        </button>
      </div>
      <div className="mb-8 divide-y divide-ink/10 border border-ink/10 bg-white">
        {prospectos.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin prospectos todavía.</p>}
        {prospectos.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{p.nombre}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">{p.origen}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Oportunidades</h3>
        <div className="flex flex-wrap gap-3">
          {limits.pipelineVisual && (
            <>
              <button onClick={() => setShowEtapas(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
                Etapas
              </button>
              <button onClick={() => setShowMotivos(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
                Motivos de pérdida
              </button>
            </>
          )}
          <button onClick={() => setShowNewOportunidad(true)} className="font-mono text-[0.66rem] uppercase text-teal hover:underline">
            + Nueva oportunidad
          </button>
        </div>
      </div>

      {limits.pipelineVisual && etapasPipeline.length > 0 ? (
        <KanbanBoard<Oportunidad>
          columns={etapasPipeline.map((e): KanbanColumn => ({ id: e.id, label: e.nombre }))}
          items={oportunidades.filter((o) => o.estado !== "ganada" && o.estado !== "perdida")}
          getColumnId={(o) => o.etapa_id ?? etapasPipeline[0]?.id ?? ""}
          onCardMove={(id, columnId) => moverEtapa(id, columnId)}
          renderCard={(o) => (
            <div className="border border-ink/10 bg-white p-3">
              <p className="text-sm font-semibold text-ink">{nombreProspectoOCliente(o)}</p>
              <p className="font-mono text-[0.66rem] text-muted">{o.descripcion}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal">{money(o.monto_estimado)}</span>
                <div className="flex gap-2">
                  <button onClick={() => marcarGanada(o)} className="font-mono text-[0.6rem] uppercase text-teal hover:underline">
                    Ganar
                  </button>
                  <button onClick={() => setPerdiendo(o)} className="font-mono text-[0.6rem] uppercase text-orange hover:underline">
                    Perder
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <>
          <div className="mb-3 flex gap-2">
            {(["", "nuevo", "contactado", "negociacion", "ganada", "perdida"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setFiltroEstado(e)}
                className={`font-mono text-[0.62rem] uppercase tracking-[0.08em] px-2 py-1 ${
                  filtroEstado === e ? "bg-ink text-white" : "bg-sand-2 text-muted hover:text-ink"
                }`}
              >
                {e === "" ? "Todos" : ESTADO_LABEL[e]}
              </button>
            ))}
          </div>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
            {listaFiltrada.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin oportunidades todavía.</p>}
            {listaFiltrada.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{nombreProspectoOCliente(o)}</p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                    {o.descripcion} · {money(o.monto_estimado)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge color={ESTADO_COLOR[o.estado]}>{ESTADO_LABEL[o.estado]}</Badge>
                  {o.estado !== "ganada" && o.estado !== "perdida" && (
                    <>
                      <button onClick={() => marcarGanada(o)} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                        Ganar
                      </button>
                      <button onClick={() => setPerdiendo(o)} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                        Perder
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showNewProspecto && <NewProspectoModal companyId={companyId} onClose={() => setShowNewProspecto(false)} onCreated={reload} />}
      {showNewOportunidad && (
        <NewOportunidadModal
          companyId={companyId}
          prospectos={prospectos}
          clientes={clientes}
          etapasPipeline={etapasPipeline}
          companyUsers={companyUsers}
          limits={limits}
          onClose={() => setShowNewOportunidad(false)}
          onCreated={reload}
        />
      )}
      {showEtapas && <EtapasModal companyId={companyId} etapas={etapasPipeline} onClose={() => setShowEtapas(false)} onSaved={reload} />}
      {showMotivos && <MotivosModal companyId={companyId} motivos={motivosPerdida} onClose={() => setShowMotivos(false)} onSaved={reload} />}
      {perdiendo && (
        <PerderModal
          oportunidad={perdiendo}
          motivosPerdida={motivosPerdida}
          limits={limits}
          onClose={() => setPerdiendo(null)}
          onSaved={reload}
        />
      )}
    </div>
  );
}

function NewProspectoModal({ companyId, onClose, onCreated }: { companyId: string; onClose: () => void; onCreated: () => void }) {
  const [nombre, setNombre] = useState("");
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoTelefono, setContactoTelefono] = useState("");
  const [contactoCorreo, setContactoCorreo] = useState("");
  const [origen, setOrigen] = useState<"referido" | "web" | "redes" | "otro">("otro");
  const [notas, setNotas] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("prospectos").insert({
      company_id: companyId,
      nombre,
      contacto_nombre: contactoNombre || null,
      contacto_telefono: contactoTelefono || null,
      contacto_correo: contactoCorreo || null,
      origen,
      notas: notas || null,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo prospecto" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          value={contactoNombre}
          onChange={(e) => setContactoNombre(e.target.value)}
          placeholder="Contacto"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            value={contactoTelefono}
            onChange={(e) => setContactoTelefono(e.target.value)}
            placeholder="Teléfono"
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
          <input
            value={contactoCorreo}
            onChange={(e) => setContactoCorreo(e.target.value)}
            placeholder="Correo"
            className="border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <select
          value={origen}
          onChange={(e) => setOrigen(e.target.value as typeof origen)}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="referido">Referido</option>
          <option value="web">Web</option>
          <option value="redes">Redes</option>
          <option value="otro">Otro</option>
        </select>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Notas"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving || !nombre} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear prospecto"}
        </button>
      </form>
    </Modal>
  );
}

function NewOportunidadModal({
  companyId,
  prospectos,
  clientes,
  etapasPipeline,
  companyUsers,
  limits,
  onClose,
  onCreated,
}: {
  companyId: string;
  prospectos: Prospecto[];
  clientes: Cliente[];
  etapasPipeline: EtapaPipeline[];
  companyUsers: CompanyUserRow[];
  limits: VentasTierLimits;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [origenTipo, setOrigenTipo] = useState<"prospecto" | "cliente">("prospecto");
  const [prospectoId, setProspectoId] = useState(prospectos[0]?.id ?? "");
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const [descripcion, setDescripcion] = useState("");
  const [montoEstimado, setMontoEstimado] = useState("");
  const [etapaId, setEtapaId] = useState(etapasPipeline[0]?.id ?? "");
  const [responsableId, setResponsableId] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("oportunidades").insert({
      company_id: companyId,
      prospecto_id: origenTipo === "prospecto" ? prospectoId || null : null,
      cliente_id: origenTipo === "cliente" ? clienteId || null : null,
      descripcion,
      monto_estimado: montoEstimado ? Number(montoEstimado) : null,
      etapa_id: limits.pipelineVisual ? etapaId || null : null,
      responsable_usuario_id: limits.pipelineVisual ? responsableId || null : null,
      fecha_estimada_cierre: limits.pipelineVisual ? fechaCierre || null : null,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva oportunidad" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div className="flex gap-2">
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origenTipo === "prospecto"} onChange={() => setOrigenTipo("prospecto")} />
            Prospecto
          </label>
          <label className="flex items-center gap-1 font-mono text-xs">
            <input type="radio" checked={origenTipo === "cliente"} onChange={() => setOrigenTipo("cliente")} />
            Cliente
          </label>
        </div>
        {origenTipo === "prospecto" ? (
          <select
            value={prospectoId}
            onChange={(e) => setProspectoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {prospectos.length === 0 && <option value="">Sin prospectos — agrega uno primero</option>}
            {prospectos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {clientes.length === 0 && <option value="">Sin clientes todavía</option>}
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.razon_social}
              </option>
            ))}
          </select>
        )}
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="¿Qué quiere?"
          required
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          type="number"
          value={montoEstimado}
          onChange={(e) => setMontoEstimado(e.target.value)}
          placeholder="Monto estimado"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        {limits.pipelineVisual && (
          <>
            {etapasPipeline.length > 0 && (
              <select
                value={etapaId}
                onChange={(e) => setEtapaId(e.target.value)}
                className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
              >
                {etapasPipeline.map((et) => (
                  <option key={et.id} value={et.id}>
                    {et.nombre}
                  </option>
                ))}
              </select>
            )}
            <select
              value={responsableId}
              onChange={(e) => setResponsableId(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="">Sin responsable</option>
              {companyUsers.map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.full_name || u.email}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={fechaCierre}
              onChange={(e) => setFechaCierre(e.target.value)}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          </>
        )}
        <button type="submit" disabled={saving || !descripcion} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear oportunidad"}
        </button>
      </form>
    </Modal>
  );
}

function EtapasModal({
  companyId,
  etapas,
  onClose,
  onSaved,
}: {
  companyId: string;
  etapas: EtapaPipeline[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("etapas_pipeline").insert({ company_id: companyId, nombre: nombre.trim(), orden: etapas.length + 1 });
    setNombre("");
    setSaving(false);
    onSaved();
  }

  return (
    <Modal title="Etapas del pipeline" onClose={onClose}>
      <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
        {etapas.length === 0 && <p className="p-3 font-mono text-xs text-muted">Sin etapas todavía.</p>}
        {etapas.map((e) => (
          <div key={e.id} className="px-3 py-2 font-mono text-xs text-ink">
            {e.orden}. {e.nombre}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la etapa"
          className="flex-1 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary">
          Agregar
        </button>
      </form>
    </Modal>
  );
}

function MotivosModal({
  companyId,
  motivos,
  onClose,
  onSaved,
}: {
  companyId: string;
  motivos: MotivoPerdida[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    await supabase.from("motivos_perdida").insert({ company_id: companyId, nombre: nombre.trim() });
    setNombre("");
    setSaving(false);
    onSaved();
  }

  return (
    <Modal title="Motivos de pérdida" onClose={onClose}>
      <div className="mb-4 divide-y divide-ink/10 border border-ink/10 bg-white">
        {motivos.length === 0 && <p className="p-3 font-mono text-xs text-muted">Sin motivos todavía.</p>}
        {motivos.map((m) => (
          <div key={m.id} className="px-3 py-2 font-mono text-xs text-ink">
            {m.nombre}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del motivo"
          className="flex-1 border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-primary">
          Agregar
        </button>
      </form>
    </Modal>
  );
}

function PerderModal({
  oportunidad,
  motivosPerdida,
  limits,
  onClose,
  onSaved,
}: {
  oportunidad: Oportunidad;
  motivosPerdida: MotivoPerdida[];
  limits: VentasTierLimits;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [motivoId, setMotivoId] = useState(motivosPerdida[0]?.id ?? "");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from("oportunidades")
      .update({ estado: "perdida", motivo_perdida_id: limits.pipelineVisual ? motivoId || null : null })
      .eq("id", oportunidad.id);
    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Marcar como perdida" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {limits.pipelineVisual && motivosPerdida.length > 0 && (
          <select
            value={motivoId}
            onChange={(e) => setMotivoId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {motivosPerdida.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        )}
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Confirmar"}
        </button>
      </form>
    </Modal>
  );
}
