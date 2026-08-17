import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { RestaurantReservation, RestaurantReservationStatus, RestaurantTable } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

const ESTADO_LABEL: Record<RestaurantReservationStatus, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  completada: "Completada",
};

export default function ReservacionesTab({
  companyId,
  tables,
  reservations,
  reload,
}: {
  companyId: string;
  tables: RestaurantTable[];
  reservations: RestaurantReservation[];
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);

  async function cambiarEstado(reservation: RestaurantReservation, estado: RestaurantReservationStatus) {
    await supabase.from("ldn_restaurant_reservations").update({ estado }).eq("id", reservation.id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Reservaciones ({reservations.length})
        </h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nueva reservación
        </button>
      </div>

      {reservations.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin reservaciones próximas.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {reservations.map((r) => {
            const table = tables.find((t) => t.id === r.table_id);
            return (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <span className="text-sm text-ink">{r.cliente_nombre}</span>
                  <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                    {new Date(r.fecha_hora).toLocaleString("es-MX")} · {r.personas} personas
                    {table ? ` · ${table.nombre}` : ""}
                    {r.telefono ? ` · ${r.telefono}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.06em] text-muted">{ESTADO_LABEL[r.estado]}</span>
                  {r.estado === "pendiente" && (
                    <button onClick={() => cambiarEstado(r, "confirmada")} className="font-mono text-[0.62rem] uppercase text-teal hover:underline">
                      Confirmar
                    </button>
                  )}
                  {(r.estado === "pendiente" || r.estado === "confirmada") && (
                    <button onClick={() => cambiarEstado(r, "cancelada")} className="font-mono text-[0.62rem] uppercase text-orange hover:underline">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <NewReservationModal companyId={companyId} tables={tables} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
    </div>
  );
}

function NewReservationModal({
  companyId,
  tables,
  onClose,
  onCreated,
}: {
  companyId: string;
  tables: RestaurantTable[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [clienteNombre, setClienteNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [personas, setPersonas] = useState("2");
  const [fechaHora, setFechaHora] = useState("");
  const [tableId, setTableId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!clienteNombre.trim() || !fechaHora) return;
    setSaving(true);
    const { error: insertError } = await supabase.from("ldn_restaurant_reservations").insert({
      company_id: companyId,
      cliente_nombre: clienteNombre.trim(),
      telefono: telefono.trim() || null,
      personas: Number(personas) || 1,
      fecha_hora: new Date(fechaHora).toISOString(),
      table_id: tableId || null,
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
    <Modal title="Nueva reservación" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <FieldInput label="Nombre del cliente" value={clienteNombre} onChange={setClienteNombre} required />
        <FieldInput label="Teléfono (opcional)" value={telefono} onChange={setTelefono} />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Personas</label>
          <input
            type="number"
            min={1}
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Fecha y hora</label>
          <input
            type="datetime-local"
            required
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Mesa (opcional)
          </label>
          <select
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="">Sin asignar</option>
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear reservación"}
        </button>
      </form>
    </Modal>
  );
}
