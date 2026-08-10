import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type { LoyaltyMember, LoyaltyProgram } from "../../../lib/database.types";

export function useLealtadData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [members, setMembers] = useState<LoyaltyMember[]>([]);

  const load = useCallback(async () => {
    const { data: programData } = await supabase.from("loyalty_programs").select("*").eq("company_id", companyId).maybeSingle();
    setProgram(programData ?? null);

    if (programData) {
      const { data: membersData } = await supabase
        .from("loyalty_members")
        .select("*")
        .eq("program_id", programData.id)
        .order("created_at", { ascending: false });
      setMembers(membersData ?? []);
    } else {
      setMembers([]);
    }
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, program, members, reload: load };
}
