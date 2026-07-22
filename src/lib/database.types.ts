export type ProfileRole = "admin" | "member";
export type LeadSource = "web" | "manual";
export type LeadStage = "nuevo" | "contactado" | "calificado" | "propuesta" | "ganado" | "perdido";
export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type NoteEntityType = "lead" | "company" | "task";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: ProfileRole;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Contact {
  id: string;
  company_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  role_title: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  company_id: string | null;
  contact_id: string | null;
  service: string | null;
  message: string | null;
  source: LeadSource;
  stage: LeadStage;
  value: number | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id: string | null;
  reporter_id: string | null;
  lead_id: string | null;
  company_id: string | null;
  due_date: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  entity_type: NoteEntityType;
  entity_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string; email: string }; Update: Partial<Profile> };
      companies: { Row: Company; Insert: Partial<Company> & { name: string }; Update: Partial<Company> };
      contacts: { Row: Contact; Insert: Partial<Contact> & { name: string }; Update: Partial<Contact> };
      leads: { Row: Lead; Insert: Partial<Lead> & { name: string }; Update: Partial<Lead> };
      tasks: { Row: Task; Insert: Partial<Task> & { title: string }; Update: Partial<Task> };
      notes: {
        Row: Note;
        Insert: Partial<Note> & { entity_type: NoteEntityType; entity_id: string; body: string };
        Update: Partial<Note>;
      };
    };
  };
}
