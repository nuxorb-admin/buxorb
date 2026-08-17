import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { RestaurantTable } from "../../../lib/database.types";
import type { RestaurantTierLimits } from "./limits";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

const ESTADO_COLOR: Record<RestaurantTable["estado"], string> = {
  libre: "border-teal/40 bg-teal/5 text-teal",
  ocupada: "border-orange/40 bg-orange/5 text-orange",
  cuenta_abierta: "border-orange/40 bg-orange/5 text-orange",
  reservada: "border-ink/20 bg-sand-2 text-muted",
};

const ESTADO_LABEL: Record<RestaurantTable["estado"], string> = {
  libre: "Libre",
  ocupada: "Ocupada",
  cuenta_abierta: "Cuenta abierta",
  reservada: "Reservada",
};

export default function MesasTab({
  companyId,
  tables,
  limits,
  reload,
}: {
  companyId: string;
  tables: RestaurantTable[];
  limits: RestaurantTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const salones = Array.from(new Set(tables.map((t) => t.salon)));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Mesas ({tables.length})</h3>
        <button onClick={() => setShowNew(true)} className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline">
          + Nueva mesa
        </button>
      </div>

      {tables.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin mesas todavía.</p>
      ) : (
        salones.map((salon) => (
          <div key={salon} className="mb-6">
            {limits.multiSalon && (
              <h4 className="mb-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted">{salon}</h4>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {tables
                .filter((t) => t.salon === salon)
                .map((t) => (
                  <div key={t.id} className={`border px-3 py-4 text-center ${ESTADO_COLOR[t.estado]}`}>
                    <p className="text-sm font-bold">{t.nombre}</p>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.06em]">{ESTADO_LABEL[t.estado]}</p>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}

      {showNew && (
        <NewTableModal companyId={companyId} limits={limits} onClose={() => setShowNew(false)} onCreated={reload} />
      )}
    </div>
  );
}

function NewTableModal({
  companyId,
  limits,
  onClose,
  onCreated,
}: {
  companyId: string;
  limits: RestaurantTierLimits;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [salon, setSalon] = useState("Principal");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setSaving(true);
    const { error: insertError } = await supabase.from("ldn_restaurant_tables").insert({
      company_id: companyId,
      nombre: nombre.trim(),
      salon: limits.multiSalon ? salon.trim() || "Principal" : "Principal",
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
    <Modal title="Nueva mesa" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}
        <FieldInput label="Nombre o número" value={nombre} onChange={setNombre} required placeholder="Ej. Mesa 5" />
        {limits.multiSalon && (
          <FieldInput label="Salón" value={salon} onChange={setSalon} placeholder="Ej. Terraza" />
        )}
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear mesa"}
        </button>
      </form>
    </Modal>
  );
}
