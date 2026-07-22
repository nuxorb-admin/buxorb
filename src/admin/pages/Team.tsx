import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Task } from "../../lib/database.types";
import { useProfiles } from "../hooks/useProfiles";
import Badge from "../components/Badge";

export default function Team() {
  const { profiles, loading } = useProfiles();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    supabase
      .from("tasks")
      .select("*")
      .neq("status", "done")
      .then(({ data }) => setTasks(data ?? []));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">Equipo</h1>
      <p className="mt-1 font-mono text-xs text-muted">
        Los miembros se invitan desde el Dashboard de Supabase (Authentication → Add user).
      </p>

      {loading ? (
        <p className="mt-6 font-mono text-xs text-muted">Cargando…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.length === 0 && (
            <p className="font-mono text-xs text-muted">Nadie se ha unido todavía.</p>
          )}
          {profiles.map((p) => {
            const openTasks = tasks.filter((t) => t.assignee_id === p.id);
            return (
              <div key={p.id} className="border border-ink/10 bg-white p-5">
                <p className="font-sans text-sm font-semibold text-ink">{p.full_name || p.email}</p>
                <p className="font-mono text-[0.68rem] text-muted">{p.email}</p>
                <div className="mt-2">
                  <Badge color={p.role === "admin" ? "orange" : "muted"}>{p.role}</Badge>
                </div>
                <div className="mt-4 border-t border-ink/10 pt-3">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
                    Tareas activas ({openTasks.length})
                  </p>
                  <ul className="mt-2 space-y-1">
                    {openTasks.slice(0, 4).map((t) => (
                      <li key={t.id} className="truncate text-sm text-ink">
                        · {t.title}
                      </li>
                    ))}
                    {openTasks.length === 0 && (
                      <li className="font-mono text-xs text-muted">Sin tareas activas.</li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
