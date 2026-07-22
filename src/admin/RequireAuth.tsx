import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { session, profile, loading, profileLoading, signOut } = useAuth();
  const location = useLocation();

  // Explícito: solo rechaza si el profile existe y kind dice 'client'. Trata
  // undefined/faltante como 'team' — evita bloquear al equipo si la columna
  // profiles.kind todavía no se ha migrado en la base de datos.
  const isRejectedClient = !!session && !profileLoading && profile !== null && profile.kind === "client";

  useEffect(() => {
    if (isRejectedClient) signOut();
  }, [isRejectedClient, signOut]);

  if (loading || (session && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink font-mono text-xs uppercase tracking-[0.14em] text-white/60">
        Cargando…
      </div>
    );
  }

  if (!session || isRejectedClient) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
