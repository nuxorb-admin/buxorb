import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Profile, Task, TaskPriority, TaskStatus } from "../../lib/database.types";
import KanbanBoard, { type KanbanColumn } from "../components/KanbanBoard";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import FieldInput from "../components/FieldInput";
import NotesTimeline from "../components/NotesTimeline";
import { useAuth } from "../AuthProvider";
import { useProfiles } from "../hooks/useProfiles";

const STATUSES: KanbanColumn[] = [
  { id: "todo", label: "Por hacer" },
  { id: "in_progress", label: "En progreso" },
  { id: "in_review", label: "En revisión" },
  { id: "done", label: "Hecho" },
];

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

const PRIORITY_COLOR: Record<TaskPriority, "muted" | "teal" | "orange" | "ink"> = {
  low: "muted",
  medium: "teal",
  high: "orange",
  urgent: "ink",
};

export default function Tasks() {
  const { profile } = useAuth();
  const { profiles } = useProfiles();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    setTasks(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = tasks.filter((t) => {
    if (assigneeFilter === "all") return true;
    if (assigneeFilter === "mine") return t.assignee_id === profile?.id;
    if (assigneeFilter === "unassigned") return !t.assignee_id;
    return t.assignee_id === assigneeFilter;
  });

  function profileName(pid: string | null) {
    if (!pid) return "Sin asignar";
    const p = profiles.find((p) => p.id === pid);
    return p?.full_name || p?.email || "—";
  }

  async function handleMove(id: string, status: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: status as TaskStatus } : t)));
    await supabase.from("tasks").update({ status }).eq("id", id);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-ink">Tareas</h1>
          <p className="font-mono text-xs text-muted">{filtered.length} tareas</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="border border-ink/15 bg-white px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] focus:border-teal focus:outline-none"
          >
            <option value="all">Todos</option>
            <option value="mine">Mis tareas</option>
            <option value="unassigned">Sin asignar</option>
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name || p.email}
              </option>
            ))}
          </select>
          <button onClick={() => setShowNew(true)} className="btn btn-primary">
            + Nueva tarea
          </button>
        </div>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-muted">Cargando…</p>
      ) : (
        <KanbanBoard
          columns={STATUSES}
          items={filtered}
          getColumnId={(t) => t.status}
          onCardMove={handleMove}
          renderCard={(task) => (
            <button
              onClick={() => setSelectedTask(task)}
              className="w-full border border-ink/10 bg-white p-3 text-left shadow-sm hover:border-teal"
            >
              <p className="font-sans text-sm font-semibold text-ink">{task.title}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <Badge color={PRIORITY_COLOR[task.priority]}>{PRIORITY_LABEL[task.priority]}</Badge>
                <span className="truncate font-mono text-[0.64rem] text-muted">
                  {profileName(task.assignee_id)}
                </span>
              </div>
              {task.due_date && (
                <p className="mt-1 font-mono text-[0.62rem] text-muted">
                  Vence {new Date(task.due_date).toLocaleDateString("es-MX")}
                </p>
              )}
            </button>
          )}
        />
      )}

      {showNew && (
        <NewTaskModal profiles={profiles} onClose={() => setShowNew(false)} onCreated={load} />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          profiles={profiles}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updated) => {
            setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
            setSelectedTask(updated);
          }}
          onDeleted={(id) => {
            setTasks((prev) => prev.filter((t) => t.id !== id));
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

function NewTaskModal({
  profiles,
  onClose,
  onCreated,
}: {
  profiles: Profile[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const { profile } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee_id: "",
    priority: "medium" as TaskPriority,
    due_date: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("tasks").insert({
      title: form.title,
      description: form.description || null,
      assignee_id: form.assignee_id || null,
      priority: form.priority,
      due_date: form.due_date || null,
      reporter_id: profile?.id,
    });
    setSaving(false);
    onCreated();
    onClose();
  }

  return (
    <Modal title="Nueva tarea" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <FieldInput label="Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <div>
          <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Asignado a
            </label>
            <select
              value={form.assignee_id}
              onChange={(e) => setForm({ ...form, assignee_id: e.target.value })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="">Sin asignar</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name || p.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Prioridad
            </label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <FieldInput
          label="Fecha límite"
          type="date"
          value={form.due_date}
          onChange={(v) => setForm({ ...form, due_date: v })}
        />
        <button type="submit" disabled={saving} className="btn btn-primary w-full">
          {saving ? "Creando…" : "Crear tarea"}
        </button>
      </form>
    </Modal>
  );
}

function TaskDetailModal({
  task,
  profiles,
  onClose,
  onUpdated,
  onDeleted,
}: {
  task: Task;
  profiles: Profile[];
  onClose: () => void;
  onUpdated: (t: Task) => void;
  onDeleted: (id: string) => void;
}) {
  async function update(patch: Partial<Task>) {
    const updated = { ...task, ...patch };
    onUpdated(updated);
    await supabase.from("tasks").update(patch).eq("id", task.id);
  }

  async function remove() {
    if (!confirm("¿Eliminar esta tarea?")) return;
    await supabase.from("tasks").delete().eq("id", task.id);
    onDeleted(task.id);
  }

  return (
    <Modal title={task.title} onClose={onClose}>
      <div className="space-y-4">
        {task.description && <p className="text-sm text-muted">{task.description}</p>}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Estado
            </label>
            <select
              value={task.status}
              onChange={(e) => update({ status: e.target.value as TaskStatus })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Prioridad
            </label>
            <select
              value={task.priority}
              onChange={(e) => update({ priority: e.target.value as TaskPriority })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Asignado a
            </label>
            <select
              value={task.assignee_id ?? ""}
              onChange={(e) => update({ assignee_id: e.target.value || null })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            >
              <option value="">Sin asignar</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name || p.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">
              Fecha límite
            </label>
            <input
              type="date"
              value={task.due_date ?? ""}
              onChange={(e) => update({ due_date: e.target.value || null })}
              className="w-full border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">Comentarios</h3>
          <NotesTimeline entityType="task" entityId={task.id} />
        </div>

        <button
          onClick={remove}
          className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-orange hover:underline"
        >
          Eliminar tarea
        </button>
      </div>
    </Modal>
  );
}
