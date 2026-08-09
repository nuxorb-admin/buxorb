import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import type { WhatsappConnection, WhatsappMessage } from "../../../lib/database.types";
import type { ConversationRow } from "./useAgentesData";

export default function ConversacionesTab({
  connections,
  conversations,
  reload,
}: {
  connections: WhatsappConnection[];
  conversations: ConversationRow[];
  reload: () => void;
}) {
  const [selected, setSelected] = useState<ConversationRow | null>(null);

  if (connections.length === 0) {
    return <p className="font-mono text-[0.68rem] text-muted">Conecta un número de WhatsApp para ver conversaciones aquí.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {conversations.length === 0 ? (
          <p className="p-4 font-mono text-[0.66rem] text-muted">Todavía no hay conversaciones.</p>
        ) : (
          conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`block w-full px-4 py-3 text-left transition-colors ${
                selected?.id === c.id ? "bg-sand-2" : "hover:bg-sand-2"
              }`}
            >
              <p className="text-sm text-ink">{c.contact?.name || c.contact?.phone || "Contacto"}</p>
              <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                {c.mode === "bot" ? "Bot" : "Humano"}
              </p>
            </button>
          ))
        )}
      </div>

      <div>
        {selected ? (
          <ConversationThread conversation={selected} onChanged={reload} />
        ) : (
          <p className="font-mono text-[0.66rem] text-muted">Elige una conversación de la lista.</p>
        )}
      </div>
    </div>
  );
}

function ConversationThread({ conversation, onChanged }: { conversation: ConversationRow; onChanged: () => void }) {
  const [messages, setMessages] = useState<WhatsappMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("whatsapp_messages")
      .select("*")
      .eq("conversation_id", conversation.id)
      .order("created_at")
      .then(({ data }) => {
        if (!cancelled) {
          setMessages(data ?? []);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [conversation.id]);

  async function toggleMode() {
    const nextMode = conversation.mode === "bot" ? "humano" : "bot";
    await supabase.from("whatsapp_conversations").update({ mode: nextMode }).eq("id", conversation.id);
    onChanged();
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("send-whatsapp-message", {
      body: { conversation_id: conversation.id, text: text.trim() },
    });
    setSending(false);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo enviar el mensaje");
      return;
    }
    setText("");
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), conversation_id: conversation.id, direction: "out", text: text.trim(), external_id: null, created_at: new Date().toISOString() }]);
    onChanged();
  }

  return (
    <div className="flex h-full flex-col border border-ink/10 bg-white">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-ink">{conversation.contact?.name || conversation.contact?.phone}</p>
          <p className="font-mono text-[0.6rem] text-muted">{conversation.contact?.phone}</p>
        </div>
        <button onClick={toggleMode} className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-teal hover:underline">
          {conversation.mode === "bot" ? "Tomar conversación (humano)" : "Devolver al bot"}
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4" style={{ minHeight: "18rem", maxHeight: "24rem" }}>
        {loading ? (
          <p className="font-mono text-[0.66rem] text-muted">Cargando…</p>
        ) : messages.length === 0 ? (
          <p className="font-mono text-[0.66rem] text-muted">Sin mensajes todavía.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.direction === "out" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-3 py-2 text-sm ${
                  m.direction === "out" ? "bg-teal/10 text-ink" : "bg-sand-2 text-ink"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={send} className="flex items-center gap-2 border-t border-ink/10 p-3">
        {error && <span className="font-mono text-[0.6rem] text-orange">{error}</span>}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una respuesta…"
          className="flex-1 border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
        />
        <button type="submit" disabled={sending} className="btn btn-primary">
          {sending ? "Enviando…" : "Enviar"}
        </button>
      </form>
    </div>
  );
}
