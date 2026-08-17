-- =========================================================
-- 0054 — permisos por rol también para Agentes IA, Lealtad y Restaurantes.
-- Hasta ahora company_role_modules solo controlaba los 4 módulos del core
-- (más dos valores heredados de CRM/ERP standalone, ver 0007) — los
-- productos adicionales y líneas de negocio se mostraban a CUALQUIER
-- usuario de la empresa sin importar su rol, aunque la pantalla de
-- "Usuarios y roles" sugería control granular. Se corrige ampliando el
-- mismo check constraint (misma tabla, mismo mecanismo, sin tabla nueva)
-- para aceptar también 'agentes_ia', 'lealtad' y 'restaurantes' como
-- valores de module — igual granularidad que el resto (todo o nada por
-- producto, no por pestaña individual).
-- =========================================================

alter table public.company_role_modules drop constraint if exists company_role_modules_module_check;
alter table public.company_role_modules add constraint company_role_modules_module_check
  check (module in (
    'tesoreria', 'compras_proveedores', 'gestion_personal', 'ventas_cxc',
    'crm_pipeline_ventas',
    'erp_inventario',
    'agentes_ia', 'lealtad', 'restaurantes'
  ));
