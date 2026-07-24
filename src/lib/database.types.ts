export type ProfileRole = "admin" | "member";
export type LeadSource = "web" | "manual";
export type LeadStage = "nuevo" | "contactado" | "calificado" | "propuesta" | "ganado" | "perdido";
export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type NoteEntityType = "lead" | "company" | "task";
export type CompanyModuleName =
  | "tesoreria"
  | "compras_proveedores"
  | "gestion_personal"
  | "ventas_cxc"
  | "crm_pipeline_ventas"
  | "erp_inventario";
export type CompanyModuleTier = "essential" | "professional" | "enterprise";
export type CompanyAddonName =
  | "checador_basico"
  | "portal_empleado"
  | "ptu"
  | "conciliacion_pdf_ampliada"
  | "lectura_tickets_ampliada"
  | "inventario"
  | "timbrado_cfdi"
  | "chatbot_cobranza";
export type ProductLine = "saas" | "crm" | "erp";
export type TreasuryEntryType = "ingreso" | "egreso";
export type ProfileKind = "team" | "client";
export type CrmDealStage = "prospecto" | "contactado" | "propuesta" | "ganado" | "perdido";
export type ErpMovementType = "entrada" | "salida";
export type TreasuryCategoryKind = "ingreso" | "egreso" | "ambos";
export type TreasuryMovementSource = "manual" | "csv_import" | "bank_import" | "ai_statement";
export type TreasuryStatementMethod = "manual" | "ai";
export type TreasuryStatementStatus = "uploaded" | "reviewed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: ProfileRole;
  kind: ProfileKind;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  subdomain: string | null;
  product_line: ProductLine;
  max_users: number;
  created_by: string | null;
  created_at: string;
}

export interface CompanyRole {
  id: string;
  company_id: string;
  name: string;
  created_at: string;
}

export interface CompanyRoleModule {
  role_id: string;
  module: CompanyModuleName;
}

export interface CompanyUser {
  id: string;
  company_id: string;
  user_id: string;
  role_id: string | null;
  is_owner: boolean;
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

export interface CompanyModule {
  id: string;
  company_id: string;
  module: CompanyModuleName;
  tier: CompanyModuleTier;
  seats: number;
  active: boolean;
  started_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyAddon {
  id: string;
  company_id: string;
  addon: CompanyAddonName;
  active: boolean;
  notes: string | null;
  created_at: string;
}

export interface TreasuryEntry {
  id: string;
  scope_id: string;
  type: TreasuryEntryType;
  concept: string;
  category: string;
  amount: number;
  entry_date: string;
  created_at: string;
}

export interface CrmDeal {
  id: string;
  scope_id: string;
  name: string;
  value: number;
  stage: CrmDealStage;
  created_at: string;
  updated_at: string;
}

export interface ErpInventoryMovement {
  id: string;
  scope_id: string;
  sku: string;
  concept: string;
  type: ErpMovementType;
  quantity: number;
  created_at: string;
}

export interface TreasuryAccount {
  id: string;
  company_id: string;
  name: string;
  bank_name: string | null;
  last4: string | null;
  opening_balance: number;
  bank_import_enabled: boolean;
  created_at: string;
}

export interface TreasuryCategory {
  id: string;
  company_id: string;
  name: string;
  kind: TreasuryCategoryKind;
  created_at: string;
}

export interface TreasuryMovement {
  id: string;
  company_id: string;
  account_id: string;
  type: TreasuryEntryType;
  concept: string;
  category: string;
  amount: number;
  entry_date: string;
  source: TreasuryMovementSource;
  reconciled: boolean;
  created_by: string | null;
  created_at: string;
}

export interface TreasuryStatementImport {
  id: string;
  company_id: string;
  account_id: string | null;
  period_month: string;
  method: TreasuryStatementMethod;
  file_name: string | null;
  status: TreasuryStatementStatus;
  extracted_count: number;
  created_by: string | null;
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
