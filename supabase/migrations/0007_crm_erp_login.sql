-- =========================================================
-- 0007 — login real para los portales de CRM y ERP
--
-- Hasta ahora solo el portal de SaaS tenía login (company_users /
-- company_roles / company_role_modules). CRM y ERP quedaban abiertos sin
-- autenticación. Esta migración reutiliza las mismas tablas (ya genéricas,
-- no dependen de product_line) ampliando el catálogo de módulos que
-- company_role_modules acepta, para poder guardar el único módulo de cada
-- una de esas líneas.
-- =========================================================

alter table public.company_role_modules drop constraint if exists company_role_modules_module_check;
alter table public.company_role_modules add constraint company_role_modules_module_check
  check (module in (
    'tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc',
    'crm_pipeline_ventas',
    'erp_inventario'
  ));
