import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  MovEsperado,
  TreasuryAccount,
  TreasuryCategory,
  TreasuryCategoryPattern,
  TreasuryEntryType,
  TreasuryMovement,
  TreasuryMovementSplit,
} from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import TemplateImportModal from "./TemplateImportModal";
import { downloadTreasuryTemplate } from "./treasuryTemplate";
import { emptySplit, splitMatches, insertMovementWithSplits, type SplitLine } from "./splits";
import { suggestCategory } from "./patterns";
import SplitEditor from "./SplitEditor";
import Modal from "../../../admin/components/Modal";

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

const MODULE_LABELS: Record<string, string> = {
  compras: "Compras y Proveedores",
  personal: "Gestión de Personal",
  ventas: "Ventas y CxC",
};

export default function MovimientosTab({
  companyId,
  accounts,
  categories,
  movements,
  splits,
  patterns,
  proyectados,
  limits,
  reload,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  movements: TreasuryMovement[];
  splits: TreasuryMovementSplit[];
  patterns: TreasuryCategoryPattern[];
  proyectados: MovEsperado[];
  limits: TreasuryTierLimits;
  reload: () => void;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [linking, setLinking] = useState<MovEsperado | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  // Solo categorías activas se ofrecen para capturar movimientos nuevos —
  // una desactivada sigue siendo válida para lo ya categorizado con ella
  // (por eso la validación de la lista de abajo usa `categories` completo).
  const activeCategories = categories.filter((c) => c.active);

  async function remove(id: string) {
    await supabase.from("treasury_movements").delete().eq("id", id);
    reload();
  }

  async function fixCategory(id: string, category: string) {
    await supabase.from("treasury_movements").update({ category }).eq("id", id);
    reload();
  }

  return (
    <div>
      {proyectados.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
            Proyectados
          </h3>
          <div className="divide-y divide-ink/10 border border-ink/10 bg-sand-2">
            {proyectados.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{p.concepto || "Movimiento proyectado"}</p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                    {MODULE_LABELS[p.modulo_origen] ?? p.modulo_origen} ·{" "}
                    {new Date(p.fecha_esperada).toLocaleDateString("es-MX")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-sm font-bold ${p.tipo === "ingreso" ? "text-teal" : "text-orange"}`}>
                    {p.tipo === "ingreso" ? "+" : "-"}
                    {money(Number(p.monto))}
                  </span>
                  <button
                    onClick={() => setLinking(p)}
                    className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-teal hover:underline"
                  >
                    Registrar como real
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">Movimientos</h3>
        <div className="flex gap-4">
          <button
            onClick={() => downloadTreasuryTemplate(activeCategories.map((c) => c.name))}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
          >
            ↓ Descargar plantilla
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline"
          >
            + Importar plantilla
          </button>
          <button onClick={() => setShowNew(true)} className="btn btn-primary !px-4 !py-1.5 !text-[0.66rem]">
            + Nuevo movimiento
          </button>
        </div>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {movements.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin movimientos todavía.</p>}
        {movements.map((m) => {
          const categoryValid = categories.some((c) => c.name === m.category);
          const movementSplits = splits.filter((s) => s.movement_id === m.id);
          return (
            <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{m.concept}</p>
                {movementSplits.length > 1 ? (
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                    {movementSplits.map((s) => s.category).join(" + ")} ·{" "}
                    {new Date(m.entry_date).toLocaleDateString("es-MX")}
                    {accounts.length > 1 && ` · ${accounts.find((a) => a.id === m.account_id)?.name ?? ""}`}
                  </p>
                ) : (
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                    {categoryValid ? (
                      m.category
                    ) : (
                      <span className="text-orange">Categoría no reconocida ({m.category})</span>
                    )}{" "}
                    · {new Date(m.entry_date).toLocaleDateString("es-MX")}
                    {accounts.length > 1 && ` · ${accounts.find((a) => a.id === m.account_id)?.name ?? ""}`}
                  </p>
                )}
                {!categoryValid && movementSplits.length <= 1 && (
                  <select
                    onChange={(e) => e.target.value && fixCategory(m.id, e.target.value)}
                    defaultValue=""
                    className="mt-1 border border-orange/40 bg-orange/10 px-2 py-1 font-mono text-[0.62rem] text-ink focus:outline-none"
                  >
                    <option value="" disabled>
                      Corregir categoría…
                    </option>
                    {activeCategories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-sm font-bold ${m.type === "ingreso" ? "text-teal" : "text-orange"}`}>
                  {m.type === "ingreso" ? "+" : "-"}
                  {money(Number(m.amount))}
                </span>
                <button onClick={() => remove(m.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showNew && (
        <NewMovementModal
          companyId={companyId}
          accounts={accounts}
          categories={activeCategories}
          patterns={patterns}
          lockAccount={limits.maxAccounts <= 1}
          userId={userId}
          onClose={() => setShowNew(false)}
          onCreated={reload}
        />
      )}

      {showImport && (
        <TemplateImportModal
          companyId={companyId}
          accountId={accounts[0]?.id ?? ""}
          categories={activeCategories}
          patterns={patterns}
          userId={userId}
          onClose={() => setShowImport(false)}
          onImported={reload}
        />
      )}

      {linking && (
        <LinkProyectadoModal
          companyId={companyId}
          accounts={accounts}
          categories={activeCategories}
          patterns={patterns}
          proyectado={linking}
          userId={userId}
          onClose={() => setLinking(null)}
          onLinked={reload}
        />
      )}
    </div>
  );
}

function NewMovementModal({
  companyId,
  accounts,
  categories,
  patterns,
  lockAccount,
  userId,
  onClose,
  onCreated,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  lockAccount: boolean;
  userId: string | null;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [splitLines, setSplitLines] = useState<SplitLine[]>([]);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [form, setForm] = useState({
    entry_date: todayIso(),
    type: "ingreso" as TreasuryEntryType,
    concept: "",
    category: categories[0]?.name ?? "Otros gastos (papelería, seguros, etc.)",
    amount: "",
    account_id: accounts[0]?.id ?? "",
  });

  // Mientras el usuario no haya elegido categoría a mano, cada vez que
  // cambia la descripción se sugiere la del patrón que mejor calce — en
  // cuanto la toca manualmente, deja de pisarse.
  function onConceptChange(concept: string) {
    setForm((f) => {
      if (categoryTouched) return { ...f, concept };
      const suggested = suggestCategory(concept, patterns);
      return suggested && categories.some((c) => c.name === suggested) ? { ...f, concept, category: suggested } : { ...f, concept };
    });
  }

  const total = Number(form.amount) || 0;
  const canSubmit = splitting ? splitMatches(splitLines, total) : true;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.concept.trim() || !form.amount || !form.account_id || !canSubmit) return;
    setSaving(true);
    await insertMovementWithSplits(
      {
        company_id: companyId,
        account_id: form.account_id,
        type: form.type,
        concept: form.concept.trim(),
        amount: total,
        entry_date: form.entry_date,
        source: "manual",
        created_by: userId,
      },
      splitting ? splitLines : [emptySplit(form.category)].map((l) => ({ ...l, amount: form.amount })),
    );
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nuevo movimiento" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Fecha
          </label>
          <input
            type="date"
            value={form.entry_date}
            onChange={(e) => setForm({ ...form, entry_date: e.target.value })}
            required
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Tipo
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as TreasuryEntryType })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Descripción
          </label>
          <input
            value={form.concept}
            onChange={(e) => onConceptChange(e.target.value)}
            placeholder="Ej. Pago renta julio"
            required
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Monto
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>

        {!splitting && (
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Categoría de flujo de caja
            </label>
            <select
              value={form.category}
              onChange={(e) => {
                setCategoryTouched(true);
                setForm({ ...form, category: e.target.value });
              }}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm capitalize text-ink focus:border-teal focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {!categoryTouched && suggestCategory(form.concept, patterns) === form.category && form.concept && (
              <p className="mt-1 font-mono text-[0.6rem] text-teal">Sugerida por descripciones parecidas.</p>
            )}
          </div>
        )}

        <SplitEditor
          total={total}
          categories={categories}
          splitting={splitting}
          onToggle={setSplitting}
          lines={splitLines}
          onChange={setSplitLines}
        />

        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Cuenta bancaria
          </label>
          <select
            value={form.account_id}
            onChange={(e) => setForm({ ...form, account_id: e.target.value })}
            disabled={lockAccount}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          {lockAccount && (
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-muted">
              Tu plan incluye 1 cuenta bancaria — pásate a Professional para agregar más.
            </p>
          )}
        </div>

        <button type="submit" disabled={saving || !canSubmit} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Guardar movimiento"}
        </button>
      </form>
    </Modal>
  );
}

function LinkProyectadoModal({
  companyId,
  accounts,
  categories,
  patterns,
  proyectado,
  userId,
  onClose,
  onLinked,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  categories: TreasuryCategory[];
  patterns: TreasuryCategoryPattern[];
  proyectado: MovEsperado;
  userId: string | null;
  onClose: () => void;
  onLinked: () => void;
}) {
  const suggested = suggestCategory(proyectado.concepto ?? "", patterns);
  const [form, setForm] = useState({
    concept: proyectado.concepto || "Movimiento proyectado",
    amount: String(proyectado.monto),
    entry_date: proyectado.fecha_esperada,
    account_id: accounts[0]?.id ?? "",
    category: (suggested && categories.some((c) => c.name === suggested) ? suggested : categories[0]?.name) ?? "Otros gastos (papelería, seguros, etc.)",
  });
  const [saving, setSaving] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [splitLines, setSplitLines] = useState<SplitLine[]>([]);

  const total = Number(form.amount) || 0;
  const canSubmit = splitting ? splitMatches(splitLines, total) : true;

  async function confirm(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    const movement = await insertMovementWithSplits(
      {
        company_id: companyId,
        account_id: form.account_id,
        type: proyectado.tipo,
        concept: form.concept.trim(),
        amount: total,
        entry_date: form.entry_date,
        source: "mov_confirmado",
        created_by: userId,
      },
      splitting ? splitLines : [{ category: form.category, amount: form.amount }],
    );

    await supabase.from("confirmed_movements").insert({
      mov_esperado_id: proyectado.id,
      company_id: companyId,
      treasury_movement_id: movement?.id ?? null,
      fecha_real: form.entry_date,
      monto: total,
    });
    await supabase.from("expected_movements").update({ estado: "vinculado" }).eq("id", proyectado.id);

    setSaving(false);
    onLinked();
    onClose();
  }

  return (
    <Modal title="Registrar como real" onClose={onClose}>
      <form onSubmit={confirm} className="space-y-3">
        <input
          value={form.concept}
          onChange={(e) => setForm({ ...form, concept: e.target.value })}
          placeholder="Concepto"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        {accounts.length > 1 && (
          <select
            value={form.account_id}
            onChange={(e) => setForm({ ...form, account_id: e.target.value })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Monto"
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <input
          type="date"
          value={form.entry_date}
          onChange={(e) => setForm({ ...form, entry_date: e.target.value })}
          className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        {!splitting && (
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        )}
        <SplitEditor
          total={total}
          categories={categories}
          splitting={splitting}
          onToggle={setSplitting}
          lines={splitLines}
          onChange={setSplitLines}
        />
        <button type="submit" disabled={saving || !canSubmit} className="btn btn-primary w-full">
          {saving ? "Guardando…" : "Confirmar movimiento real"}
        </button>
      </form>
    </Modal>
  );
}
