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
          + Crear mesas
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
                .filter((t) => t.salon === salon && !t.joined_to)
                .map((t) => {
                  const unidas = tables.filter((u) => u.joined_to === t.id);
                  return (
                    <div key={t.id} className={`border px-3 py-4 text-center ${ESTADO_COLOR[t.estado]}`}>
                      <p className="text-sm font-bold">{t.nombre}</p>
                      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.06em]">{ESTADO_LABEL[t.estado]}</p>
                      <p className="mt-0.5 font-mono text-[0.58rem] text-current/70">{t.capacidad} personas</p>
                      {unidas.length > 0 && (
                        <p className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.04em]">
                          + {unidas.map((u) => u.nombre).join(", ")}
                        </p>
                      )}
                    </div>
                  );
                })}
              {tables
                .filter((t) => t.salon === salon && t.joined_to)
                .map((t) => {
                  const principal = tables.find((p) => p.id === t.joined_to);
                  return (
                    <div key={t.id} className="border border-ink/10 bg-sand-2 px-3 py-4 text-center text-muted">
                      <p className="text-sm font-bold">{t.nombre}</p>
                      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.06em]">Unida a {principal?.nombre ?? "otra mesa"}</p>
                    </div>
                  );
                })}
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
  const [bulk, setBulk] = useState(false);
  const [nombre, setNombre] = useState("");
  const [nombreBase, setNombreBase] = useState("Mesa");
  const [desde, setDesde] = useState("1");
  const [hasta, setHasta] = useState("7");
  const [capacidad, setCapacidad] = useState("4");
  const [salon, setSalon] = useState("Principal");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const salonFinal = limits.multiSalon ? salon.trim() || "Principal" : "Principal";
    const cap = Number(capacidad) || 4;

    let rows: { company_id: string; nombre: string; salon: string; capacidad: number }[];
    if (bulk) {
      const from = Number(desde) || 1;
      const to = Number(hasta) || from;
      if (to < from) {
        setError("El rango no es válido (hasta debe ser mayor o igual a desde).");
        return;
      }
      if (to - from > 100) {
        setError("Rango demasiado grande — máximo 100 mesas a la vez.");
        return;
      }
      rows = [];
      for (let n = from; n <= to; n++) {
        rows.push({ company_id: companyId, nombre: `${nombreBase.trim() || "Mesa"} ${n}`, salon: salonFinal, capacidad: cap });
      }
    } else {
      if (!nombre.trim()) return;
      rows = [{ company_id: companyId, nombre: nombre.trim(), salon: salonFinal, capacidad: cap }];
    }

    setSaving(true);
    const { error: insertError } = await supabase.from("ldn_restaurant_tables").insert(rows);
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    onCreated();
    onClose();
  }

  return (
    <Modal title="Crear mesas" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

        <label className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-muted">
          <input type="checkbox" checked={bulk} onChange={(e) => setBulk(e.target.checked)} />
          Crear varias en lote (ej. Mesa 1 a Mesa 7)
        </label>

        {bulk ? (
          <>
            <FieldInput label="Nombre base" value={nombreBase} onChange={setNombreBase} placeholder="Mesa" />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Desde</label>
                <input
                  type="number"
                  min={1}
                  value={desde}
                  onChange={(e) => setDesde(e.target.value)}
                  className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Hasta</label>
                <input
                  type="number"
                  min={1}
                  value={hasta}
                  onChange={(e) => setHasta(e.target.value)}
                  className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
                />
              </div>
            </div>
          </>
        ) : (
          <FieldInput label="Nombre o número" value={nombre} onChange={setNombre} required placeholder="Ej. Mesa 5" />
        )}

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Capacidad (personas por mesa)
          </label>
          <input
            type="number"
            min={1}
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        {limits.multiSalon && <FieldInput label="Salón" value={salon} onChange={setSalon} placeholder="Ej. Terraza" />}

        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : bulk ? "Crear mesas" : "Crear mesa"}
        </button>
      </form>
    </Modal>
  );
}
