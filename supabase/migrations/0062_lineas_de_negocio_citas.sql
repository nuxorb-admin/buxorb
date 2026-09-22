-- =========================================================
-- 0062 — Líneas de negocio: activación de "Citas" (agenda de servicios,
-- para salones/spas/consultorios). Ver 0051 para el eje de líneas de
-- negocio y 0063 para las tablas operativas (ldn_citas_*).
-- =========================================================

alter table nuxorb.ldn_company_business_lines drop constraint if exists ldn_company_business_lines_business_line_check;
alter table nuxorb.ldn_company_business_lines add constraint ldn_company_business_lines_business_line_check
  check (business_line in ('restaurantes', 'citas'));

-- Permiso por rol (Usuarios y roles) para la nav propia de Citas, mismo
-- mecanismo que agentes_ia/lealtad/restaurantes/shopify (ver 0054/0061).
alter table public.company_role_modules drop constraint if exists company_role_modules_module_check;
alter table public.company_role_modules add constraint company_role_modules_module_check
  check (module in (
    'tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc',
    'crm_pipeline_ventas',
    'erp_inventario',
    'agentes_ia', 'lealtad', 'restaurantes', 'shopify', 'citas'
  ));
