import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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

  // Memoizados por la misma razón que AuthProvider.tsx (src/admin/): si
  // algún consumidor llega a depender de `signOut` en un useEffect, una
  // identidad nueva en cada render puede volver a dispararlo en loop.
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(() => ({ session, loading, signOut }), [session, loading, signOut]);

  return <TenantAuthContext.Provider value={value}>{children}</TenantAuthContext.Provider>;
}

export function useTenantAuth() {
  const ctx = useContext(TenantAuthContext);
  if (!ctx) throw new Error("useTenantAuth debe usarse dentro de TenantAuthProvider");
  return ctx;
}
