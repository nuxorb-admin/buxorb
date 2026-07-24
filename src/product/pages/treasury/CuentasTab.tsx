import { useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { TreasuryAccount } from "../../../lib/database.types";
import type { TreasuryTierLimits } from "./limits";
import CsvImportModal from "./CsvImportModal";
import Modal from "../../../admin/components/Modal";
import FieldInput from "../../../admin/components/FieldInput";

export default function CuentasTab({
  companyId,
  accounts,
  limits,
  reload,
}: {
  companyId: string;
  accounts: TreasuryAccount[];
  limits: TreasuryTierLimits;
  reload: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [importAccount, setImportAccount] = useState<TreasuryAccount | null>(null);

  const bankEnabledCount = accounts.filter((a) => a.bank_import_enabled).length;
  const atAccountCap = accounts.length >= limits.maxAccounts;

  async function toggleBankImport(account: TreasuryAccount) {
    if (!account.bank_import_enabled && bankEnabledCount >= limits.maxBankImportAccounts) return;
    await supabase
      .from("treasury_accounts")
      .update({ bank_import_enabled: !account.bank_import_enabled })
      .eq("id", account.id);
    reload();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta cuenta y sus movimientos?")) return;
    await supabase.from("treasury_accounts").delete().eq("id", id);
    reload();
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Cuentas ({accounts.length}
          {Number.isFinite(limits.maxAccounts) ? `/${limits.maxAccounts}` : ""})
        </h3>
        <button
          onClick={() => setShowNew(true)}
          disabled={atAccountCap}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-teal hover:underline disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
        >
          + Nueva cuenta
        </button>
      </div>

      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {accounts.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{a.name}</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {[a.bank_name, a.last4 && `····${a.last4}`].filter(Boolean).join(" · ") || "—"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {limits.bankFileImport && (
                <>
                  <label className="flex items-center gap-1.5 font-mono text-[0.66rem] text-muted">
                    <input
                      type="checkbox"
                      checked={a.bank_import_enabled}
                      disabled={!a.bank_import_enabled && bankEnabledCount >= limits.maxBankImportAccounts}
                      onChange={() => toggleBankImport(a)}
                    />
                    Importación bancaria
                  </label>
                  {a.bank_import_enabled && (
                    <button
                      onClick={() => setImportAccount(a)}
                      className="font-mono text-[0.66rem] uppercase text-teal hover:underline"
                    >
                      Importar archivo
                    </button>
                  )}
                </>
              )}
              <button onClick={() => remove(a.id)} className="font-mono text-[0.62rem] uppercase text-muted hover:text-orange">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNew && <NewAccountModal companyId={companyId} onClose={() => setShowNew(false)} onCreated={reload} />}

      {importAccount && (
        <CsvImportModal
          title={`Importar archivo del banco — ${importAccount.name}`}
          companyId={companyId}
          accountId={importAccount.id}
          source="bank_import"
          onClose={() => setImportAccount(null)}
          onImported={reload}
        />
      )}
    </div>
  );
}

function NewAccountModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({ name: "", bank_name: "", last4: "", opening_balance: "0" });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("treasury_accounts").insert({
      company_id: companyId,
      name: form.name.trim(),
      bank_name: form.bank_name.trim() || null,
      last4: form.last4.trim() || null,
      opening_balance: Number(form.opening_balance) || 0,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva cuenta" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="BBVA Cheques" />
        <FieldInput label="Banco" value={form.bank_name} onChange={(v) => setForm({ ...form, bank_name: v })} />
        <FieldInput label="Últimos 4 dígitos" value={form.last4} onChange={(v) => setForm({ ...form, last4: v.slice(0, 4) })} />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear cuenta"}
        </button>
      </form>
    </Modal>
  );
}
