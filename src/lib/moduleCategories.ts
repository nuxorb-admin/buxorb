import type { CompanyAddonName, CompanyModuleName } from "./database.types";

// Etiqueta puramente interna (para el equipo, no la ve el cliente) sobre a
// qué "familia" se parece cada módulo/adicional — Nuxorb es un solo producto
// SaaS, esto es solo para organizar el catálogo internamente. Ajustable a
// mano si cambia el criterio.
export type InternalCategory = "crm" | "erp" | "otro";

export const CATEGORY_LABELS: Record<InternalCategory, string> = {
  crm: "CRM",
  erp: "ERP",
  otro: "Otro",
};

export const MODULE_CATEGORY: Record<CompanyModuleName, InternalCategory> = {
  tesoreria: "otro",
  compras_proveedores: "erp",
  gestion_personal: "otro",
  ventas_cxc: "crm",
};

export const ADDON_CATEGORY: Record<CompanyAddonName, InternalCategory> = {
  checador_basico: "otro",
  portal_empleado: "otro",
  ptu: "otro",
  conciliacion_pdf_ampliada: "otro",
  lectura_tickets_ampliada: "otro",
  inventario: "erp",
  timbrado_cfdi: "otro",
  chatbot_cobranza: "crm",
};
