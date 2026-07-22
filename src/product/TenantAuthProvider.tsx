import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface TenantAuthContextValue {
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const TenantAuthContext = createContext<TenantAuthContextValue | undefined>(undefined);

export function TenantAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <TenantAuthContext.Provider value={{ session, loading, signOut }}>{children}</TenantAuthContext.Provider>
  );
}

export function useTenantAuth() {
  const ctx = useContext(TenantAuthContext);
  if (!ctx) throw new Error("useTenantAuth debe usarse dentro de TenantAuthProvider");
  return ctx;
}
