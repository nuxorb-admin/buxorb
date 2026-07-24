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
  | "ventas_cxc";
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
export type ProductLine = "saas";
export type TreasuryEntryType = "ingreso" | "egreso";
export type ProfileKind = "team" | "client";
export type TreasuryCategoryKind = "ingreso" | "egreso" | "ambos";
export type TreasuryMovementSource = "manual" | "csv_import" | "bank_import" | "ai_statement" | "mov_confirmado";
export type TreasuryStatementMethod = "manual" | "ai";
export type TreasuryStatementStatus = "uploaded" | "reviewed";

export type MovEsperadoTipo = "ingreso" | "egreso";
export type MovEsperadoEstado = "pendiente" | "vinculado" | "cancelado";

export type ProveedorEstado = "activo" | "inactivo";
export type CompraCondicionPago = "contado" | "credito";
export type CompraEstado = "borrador" | "pendiente_aprobacion" | "aprobada" | "recibida" | "pagada" | "cancelada";
export type CompraOrigen = "manual" | "xml_cfdi" | "ticket_ia" | "requisicion";
export type RequisicionEstado = "pendiente" | "aprobada" | "rechazada" | "convertida_en_compra";
export type ReglaAprobacionTipo = "monto" | "departamento";
export type AprobacionResultado = "aprobada" | "rechazada";
export type RecepcionTipo = "total" | "parcial";
export type FacturaEstadoMatch = "ok" | "con_diferencias";
export type TicketCompraEstado = "procesando" | "confirmado" | "error";

export type TipoContrato = "indeterminado" | "determinado" | "prueba";
export type PeriodicidadPago = "semanal" | "catorcenal" | "quincenal";
export type EmpleadoEstado = "activo" | "baja";
export type MotivoBaja = "renuncia" | "despido" | "termino_contrato";
export type IncidenciaTipo =
  | "falta"
  | "retardo"
  | "hora_extra"
  | "permiso_con_goce"
  | "permiso_sin_goce"
  | "incapacidad"
  | "vacaciones"
  | "prima_dominical";
export type IncidenciaOrigen = "manual" | "template" | "checador";
export type IncidenciaEstado = "registrada" | "aplicada_en_nomina";
export type ConceptoNominaTipo = "percepcion" | "deduccion";
export type ConceptoNominaOrigen = "calculado" | "capturado" | "incidencia";
export type PeriodoNominaEstado = "abierto" | "calculado" | "cerrado";
export type ReciboNominaEstado = "calculado" | "ajustado" | "cerrado";
export type FiniquitoTipo = "finiquito" | "liquidacion";
export type TablaFiscalTipo = "isr_mensual" | "uma" | "imss_obrero";

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

export interface MovEsperado {
  id: string;
  company_id: string;
  tipo: MovEsperadoTipo;
  monto: number;
  moneda: string;
  fecha_esperada: string;
  estado: MovEsperadoEstado;
  modulo_origen: string;
  referencia_id: string | null;
  concepto: string | null;
  created_at: string;
}

export interface MovConfirmado {
  id: string;
  mov_esperado_id: string;
  company_id: string;
  treasury_movement_id: string | null;
  fecha_real: string;
  monto: number;
  created_at: string;
}

export interface Proveedor {
  id: string;
  company_id: string;
  razon_social: string;
  rfc: string | null;
  contacto_nombre: string | null;
  contacto_telefono: string | null;
  contacto_correo: string | null;
  clabe: string | null;
  dias_credito_default: number;
  categoria_gasto_default: string | null;
  estado: ProveedorEstado;
  created_at: string;
}

export interface EvaluacionProveedor {
  id: string;
  proveedor_id: string;
  calificacion: number;
  notas: string | null;
  usuario_id: string | null;
  fecha: string;
}

export interface Departamento {
  id: string;
  company_id: string;
  nombre: string;
  created_at: string;
}

export interface ComprasSettings {
  company_id: string;
  aprobacion_activada: boolean;
}

export interface Compra {
  id: string;
  company_id: string;
  folio: string;
  proveedor_id: string;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  moneda: string;
  condicion_pago: CompraCondicionPago;
  dias_credito: number | null;
  fecha_estimada_pago: string | null;
  departamento_id: string | null;
  estado: CompraEstado;
  origen: CompraOrigen;
  created_by: string | null;
  created_at: string;
}

export interface CompraDetalle {
  id: string;
  compra_id: string;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  importe: number;
  cantidad_recibida: number;
}

export interface Requisicion {
  id: string;
  company_id: string;
  solicitante_id: string | null;
  departamento_id: string | null;
  justificacion: string | null;
  fecha: string;
  estado: RequisicionEstado;
  compra_id: string | null;
  created_at: string;
}

export interface ReglaAprobacion {
  id: string;
  company_id: string;
  tipo: ReglaAprobacionTipo;
  umbral_monto: number | null;
  departamento_id: string | null;
  aprobador_user_id: string;
  orden_nivel: number;
  created_at: string;
}

export interface AprobacionCompra {
  id: string;
  compra_id: string;
  aprobador_user_id: string;
  nivel: number;
  resultado: AprobacionResultado;
  comentario: string | null;
  fecha: string;
}

export interface Recepcion {
  id: string;
  compra_id: string;
  fecha: string;
  tipo: RecepcionTipo;
  notas: string | null;
  created_at: string;
}

export interface FacturaCompra {
  id: string;
  compra_id: string;
  uuid_fiscal: string | null;
  rfc_emisor: string | null;
  fecha_emision: string | null;
  subtotal: number | null;
  iva: number | null;
  total: number | null;
  estado_match: FacturaEstadoMatch | null;
  created_at: string;
}

export interface TicketCompra {
  id: string;
  compra_id: string | null;
  resultado_ia: Record<string, unknown> | null;
  confianza: number | null;
  estado: TicketCompraEstado;
  created_at: string;
}

export interface PagoCompra {
  id: string;
  compra_id: string;
  fecha: string;
  monto: number;
  referencia: string | null;
  created_at: string;
}

export interface UsoLecturaTickets {
  id: string;
  company_id: string;
  periodo: string;
  veces_usado: number;
}

export interface DepartamentoPersonal {
  id: string;
  company_id: string;
  nombre: string;
  created_at: string;
}

export interface Empleado {
  id: string;
  company_id: string;
  nombre_completo: string;
  rfc: string | null;
  curp: string | null;
  nss: string | null;
  fecha_ingreso: string;
  tipo_contrato: TipoContrato;
  fecha_fin_contrato: string | null;
  sueldo_diario: number;
  periodicidad_pago: PeriodicidadPago;
  departamento_id: string | null;
  cuenta_deposito: string | null;
  estado: EmpleadoEstado;
  fecha_baja: string | null;
  motivo_baja: MotivoBaja | null;
  created_at: string;
}

export interface DocumentoEmpleado {
  id: string;
  empleado_id: string;
  nombre: string;
  tipo: string | null;
  created_at: string;
}

export interface HistorialSueldo {
  id: string;
  empleado_id: string;
  sueldo_diario: number;
  fecha_efectiva: string;
  created_at: string;
}

export interface Incidencia {
  id: string;
  empleado_id: string;
  tipo: IncidenciaTipo;
  fecha: string;
  horas: number | null;
  folio_incapacidad: string | null;
  origen: IncidenciaOrigen;
  estado: IncidenciaEstado;
  created_by: string | null;
  aprobado_por: string | null;
  created_at: string;
}

export interface SaldoVacaciones {
  id: string;
  empleado_id: string;
  aniversario: number;
  dias_derecho: number;
  dias_gozados: number;
  created_at: string;
}

export interface ConceptoNomina {
  id: string;
  clave: string;
  nombre: string;
  tipo: ConceptoNominaTipo;
  integra_sbc: boolean;
  origen: ConceptoNominaOrigen;
  created_at: string;
}

export interface PeriodoNomina {
  id: string;
  company_id: string;
  periodicidad: PeriodicidadPago;
  fecha_inicio: string;
  fecha_fin: string;
  fecha_pago: string;
  estado: PeriodoNominaEstado;
  created_at: string;
}

export interface ReciboNomina {
  id: string;
  periodo_id: string;
  empleado_id: string;
  total_percepciones: number;
  total_deducciones: number;
  neto: number;
  estado: ReciboNominaEstado;
  created_at: string;
}

export interface ReciboDetalle {
  id: string;
  recibo_id: string;
  concepto_id: string;
  tipo: ConceptoNominaTipo;
  monto: number;
  origen: ConceptoNominaOrigen;
}

export interface Finiquito {
  id: string;
  empleado_id: string;
  tipo: FiniquitoTipo;
  desglose: Record<string, unknown>;
  isr_separacion: number;
  neto: number;
  fecha: string;
  created_at: string;
}

export interface TablaFiscal {
  id: string;
  tipo: TablaFiscalTipo;
  periodicidad: string | null;
  vigencia_desde: string;
  vigencia_hasta: string | null;
  contenido: unknown;
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
