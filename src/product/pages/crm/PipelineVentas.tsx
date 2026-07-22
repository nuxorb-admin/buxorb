import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { CrmDeal, CrmDealStage } from "../../../lib/database.types";
import KanbanBoard, { type KanbanColumn } from "../../../admin/components/KanbanBoard";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

const STAGES: KanbanColumn[] = [
  { id: "prospecto", label: "Prospecto" },
  { id: "contactado", label: "Contactado" },
  { id: "propuesta", label: "Propuesta" },
  { id: "ganado", label: "Ganado" },
  { id: "perdido", label: "Perdido" },
];

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

export default function PipelineVentas({ scopeId }: { scopeId: string }) {
  const [deals, setDeals] = useState<CrmDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("demo_crm_deals")
      .select("*")
      .eq("scope_id", scopeId)
      .order("created_at", { ascending: false });
    setDeals(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeId]);

  async function handleMove(id: string, stage: string) {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, stage: stage as CrmDealStage } : d)));
    await supabase.from("demo_crm_deals").update({ stage }).eq("id", id);
  }

  const total = deals.reduce((sum, d) => sum + Number(d.value), 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">Pipeline de Ventas</h1>
          <p className="font-mono text-xs text-muted">
            {deals.length} prospecto{deals.length === 1 ? "" : "s"} · {money(total)} en el pipeline
          </p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">
          + Nuevo prospecto
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-muted">Cargando…</p>
      ) : (
        <KanbanBoard
          columns={STAGES}
          items={deals}
          getColumnId={(d) => d.stage}
          onCardMove={handleMove}
          renderCard={(deal) => (
            <div className="w-full border border-ink/10 bg-white p-3 text-left shadow-sm">
              <p className="font-sans text-sm font-semibold text-ink">{deal.name}</p>
              <p className="mt-1 font-mono text-xs text-teal">{money(Number(deal.value))}</p>
            </div>
          )}
        />
      )}

      {showNew && (
        <NewDealModal
          scopeId={scopeId}
          onClose={() => setShowNew(false)}
          onCreated={load}
        />
      )}
    </div>
  );
}

function NewDealModal({
  scopeId,
  onClose,
  onCreated,
}: {
  scopeId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await supabase.from("demo_crm_deals").insert({
      scope_id: scopeId,
      name: name.trim(),
      value: value ? Number(value) : 0,
      stage: "prospecto",
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo prospecto" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre / empresa" value={name} onChange={setName} required placeholder="Café Aroma" />
        <FieldInput label="Valor estimado" type="number" value={value} onChange={setValue} placeholder="15000" />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Crear prospecto"}
        </button>
      </form>
    </Modal>
  );
}
