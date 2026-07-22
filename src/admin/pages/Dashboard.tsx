import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Task } from "../../lib/database.types";
import { useAuth } from "../AuthProvider";
import { useProfiles } from "../hooks/useProfiles";

interface Stats {
  newLeads: number;
  openTasks: number;
  myTasks: number;
  overdue: number;
}

export default function Dashboard() {
  const { profile } = useAuth();
  const { profiles } = useProfiles();
  const [stats, setStats] = useState<Stats>({ newLeads: 0, openTasks: 0, myTasks: 0, overdue: 0 });
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const today = new Date().toISOString().slice(0, 10);

    async function load() {
      const [{ count: newLeads }, { count: openTasks }, { count: myTasks }, { count: overdue }, { data: tasks }] =
        await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("stage", "nuevo"),
          supabase.from("tasks").select("*", { count: "exact", head: true }).neq("status", "done"),
          supabase
            .from("tasks")
            .select("*", { count: "exact", head: true })
            .eq("assignee_id", profile!.id)
            .neq("status", "done"),
          supabase
            .from("tasks")
            .select("*", { count: "exact", head: true })
            .lt("due_date", today)
            .neq("status", "done"),
          supabase.from("tasks").select("*").neq("status", "done"),
        ]);
      setStats({
        newLeads: newLeads ?? 0,
        openTasks: openTasks ?? 0,
        myTasks: myTasks ?? 0,
        overdue: overdue ?? 0,
      });
      setActiveTasks(tasks ?? []);
      setLoading(false);
    }

    load();
  }, [profile]);

  const cards = [
    { label: "Leads nuevos", value: stats.newLeads, to: "/admin/leads" },
    { label: "Tareas abiertas", value: stats.openTasks, to: "/admin/tasks" },
    { label: "Mis tareas", value: stats.myTasks, to: "/admin/tasks" },
    { label: "Tareas vencidas", value: stats.overdue, to: "/admin/tasks" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-ink">
        Hola, {profile?.full_name?.split(" ")[0] || "equipo"}
      </h1>
      <p className="mt-1 font-mono text-xs text-muted">Resumen del CRM</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="border border-ink/10 bg-white p-5 transition-colors hover:border-teal"
          >
            <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-muted">{c.label}</p>
            <p className="mt-2 font-display text-4xl text-ink">{loading ? "—" : c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Qué está haciendo cada quien
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => {
            const mine = activeTasks.filter((t) => t.assignee_id === p.id);
            return (
              <div key={p.id} className="border border-ink/10 bg-white p-4">
                <p className="text-sm font-semibold text-ink">{p.full_name || p.email}</p>
                <p className="font-mono text-[0.66rem] text-muted">{mine.length} tarea(s) activa(s)</p>
                <ul className="mt-2 space-y-1">
                  {mine.slice(0, 3).map((t) => (
                    <li key={t.id} className="truncate text-sm text-ink">
                      · {t.title}
                    </li>
                  ))}
                  {mine.length === 0 && <li className="font-mono text-xs text-muted">Sin tareas activas.</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
