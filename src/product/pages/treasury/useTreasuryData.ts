import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  CompanyModuleTier,
  MovEsperado,
  TreasuryAccount,
  TreasuryCategory,
  TreasuryMovement,
  TreasuryStatementImport,
} from "../../../lib/database.types";
import { limitsForTier, type TreasuryTierLimits } from "./limits";

const DEFAULT_CATEGORIES = ["ventas", "nomina", "renta", "proveedores", "otros"];

export function useTreasuryData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<CompanyModuleTier | null>(null);
  const [accounts, setAccounts] = useState<TreasuryAccount[]>([]);
  const [categories, setCategories] = useState<TreasuryCategory[]>([]);
  const [movements, setMovements] = useState<TreasuryMovement[]>([]);
  const [imports, setImports] = useState<TreasuryStatementImport[]>([]);
  const [proyectados, setProyectados] = useState<MovEsperado[]>([]);

  async function load() {
    setLoading(true);

    const { data: moduleRow } = await supabase
      .from("company_modules")
      .select("tier")
      .eq("company_id", companyId)
      .eq("module", "tesoreria")
      .maybeSingle();
    setTier(moduleRow?.tier ?? null);

    let { data: accountRows } = await supabase
      .from("treasury_accounts")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at");

    if (!accountRows || accountRows.length === 0) {
      const { data: created } = await supabase
        .from("treasury_accounts")
        .upsert({ company_id: companyId, name: "Cuenta principal" }, { onConflict: "company_id,name", ignoreDuplicates: true })
        .select();
      // Si otra carga simultánea ya la creó, el upsert no regresa fila
      // (ignoreDuplicates) — se relee para tomar la que sí quedó guardada.
      accountRows = created && created.length > 0 ? created : (
        await supabase.from("treasury_accounts").select("*").eq("company_id", companyId).order("created_at")
      ).data;
    }
    setAccounts(accountRows ?? []);

    let { data: categoryRows } = await supabase
      .from("treasury_categories")
      .select("*")
      .eq("company_id", companyId)
      .order("name");

    if (!categoryRows || categoryRows.length === 0) {
      const { data: created } = await supabase
        .from("treasury_categories")
        .insert(DEFAULT_CATEGORIES.map((name) => ({ company_id: companyId, name })))
        .select();
      categoryRows = created ?? [];
    }
    setCategories(categoryRows ?? []);

    const [{ data: movementRows }, { data: importRows }, { data: proyectadoRows }] = await Promise.all([
      supabase.from("treasury_movements").select("*").eq("company_id", companyId).order("entry_date", { ascending: false }),
      supabase.from("treasury_statement_imports").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
      supabase
        .from("mov_esperados")
        .select("*")
        .eq("company_id", companyId)
        .eq("estado", "pendiente")
        .order("fecha_esperada"),
    ]);
    setMovements(movementRows ?? []);
    setImports(importRows ?? []);
    setProyectados(proyectadoRows ?? []);

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const limits: TreasuryTierLimits = limitsForTier(tier);

  return { loading, tier, limits, accounts, categories, movements, imports, proyectados, reload: load };
}
