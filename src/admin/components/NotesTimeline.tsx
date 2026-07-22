import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Note, NoteEntityType } from "../../lib/database.types";
import { useAuth } from "../AuthProvider";

interface NoteWithAuthor extends Note {
  author: { full_name: string | null; email: string } | null;
}

export default function NotesTimeline({
  entityType,
  entityId,
}: {
  entityType: NoteEntityType;
  entityId: string;
}) {
  const { profile } = useAuth();
  const [notes, setNotes] = useState<NoteWithAuthor[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("notes")
      .select("*, author:profiles(full_name, email)")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .order("created_at", { ascending: false });
    setNotes((data as unknown as NoteWithAuthor[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId]);

  async function addNote(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    await supabase.from("notes").insert({
      entity_type: entityType,
      entity_id: entityId,
      author_id: profile?.id,
      body: body.trim(),
    });
    setBody("");
    setSaving(false);
    load();
  }

  return (
    <div>
      <form onSubmit={addNote} className="flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Agregar nota…"
          className="flex-1 border border-ink/15 bg-white px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn btn-dark">
          Agregar
        </button>
      </form>
      <ul className="mt-4 space-y-3">
        {loading && <li className="font-mono text-xs text-muted">Cargando…</li>}
        {!loading && notes.length === 0 && (
          <li className="font-mono text-xs text-muted">Sin notas todavía.</li>
        )}
        {notes.map((n) => (
          <li key={n.id} className="border-l-2 border-ink/10 pl-3">
            <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
              <span>{n.author?.full_name || n.author?.email || "—"}</span>
              <span>·</span>
              <span>{new Date(n.created_at).toLocaleString("es-MX")}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
