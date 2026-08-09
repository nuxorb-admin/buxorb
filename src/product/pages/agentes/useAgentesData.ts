import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  AiAgent,
  AiAgentTypeTemplate,
  WhatsappConnection,
  WhatsappContact,
  WhatsappConversation,
} from "../../../lib/database.types";

export interface ConversationRow extends WhatsappConversation {
  contact: WhatsappContact | null;
}

export function useAgentesData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<AiAgentTypeTemplate[]>([]);
  const [agents, setAgents] = useState<AiAgent[]>([]);
  const [connections, setConnections] = useState<WhatsappConnection[]>([]);
  const [conversations, setConversations] = useState<ConversationRow[]>([]);

  const load = useCallback(async () => {
    const [templatesRes, agentsRes, connectionsRes] = await Promise.all([
      supabase.schema("nuxorb").from("ai_agent_type_templates").select("*").order("name"),
      supabase.from("ai_agents").select("*").eq("company_id", companyId).order("created_at"),
      supabase.from("whatsapp_connections").select("*").eq("company_id", companyId).order("created_at"),
    ]);
    const loadedConnections = connectionsRes.data ?? [];
    setTemplates(templatesRes.data ?? []);
    setAgents(agentsRes.data ?? []);
    setConnections(loadedConnections);

    const connectionIds = loadedConnections.map((c) => c.id);
    if (connectionIds.length > 0) {
      const { data: convData } = await supabase
        .from("whatsapp_conversations")
        .select("*, contact:whatsapp_contacts(*)")
        .in("connection_id", connectionIds)
        .order("last_message_at", { ascending: false });
      setConversations((convData ?? []) as unknown as ConversationRow[]);
    } else {
      setConversations([]);
    }
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, templates, agents, connections, conversations, reload: load };
}
