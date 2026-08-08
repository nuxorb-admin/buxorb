import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../lib/database.types";

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

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

  async function loadProfile(userId: string) {
    setProfileLoading(true);
    const { data } = await supabase.schema("nuxorb").from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
    setProfileLoading(false);
  }

  useEffect(() => {
    if (!session) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    loadProfile(session.user.id);
  }, [session]);

  // Memoizados: RequireAuth.tsx depende de `signOut` en un useEffect — si
  // esta función fuera una identidad nueva en cada render (como antes),
  // ese efecto se vuelve a disparar en cada render y, si el signOut falla
  // (ej. 403 por sesión ya inválida), entra en loop infinito de llamadas.
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session) await loadProfile(session.user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const value = useMemo(
    () => ({ session, profile, loading, profileLoading, signOut, refreshProfile }),
    [session, profile, loading, profileLoading, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
