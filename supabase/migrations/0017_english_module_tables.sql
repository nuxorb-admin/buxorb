-- =========================================================
-- 0017 — renombra las tablas de los 4 módulos de negocio a inglés, con
-- prefijo por módulo (treasury_ ya estaba en inglés; procurement_, hr_,
-- sales_ para los otros 3), y fusiona `departamentos` (Compras) con
-- `departamentos_personal` (Personal) en una sola tabla compartida
-- `departments` — mismo concepto exacto (departamento de la empresa),
-- antes duplicado en dos tablas por casualidad de que cada módulo se
-- construyó por separado.
--
-- Solo se renombran TABLAS en esta migración, no columnas — las columnas
-- (razon_social, fecha_esperada, etc.) se quedan en español por ahora.
--
-- `alter table ... rename to` preserva automáticamente RLS, triggers,
-- foreign keys e índices — no hay que recrear nada de eso.
-- =========================================================

-- ---------------------------------------------------------
-- Fusión de departamentos: departamentos (Compras) pasa a ser la tabla
-- compartida `departments`; se traen de departamentos_personal (Personal)
-- los que no existan ya (mismo company_id + nombre = mismo departamento),
-- se repuntan los empleados que apuntaban a la fila vieja (incluyendo el
-- FK, que seguía apuntando a departamentos_personal), y se elimina
-- departamentos_personal.
-- ---------------------------------------------------------
alter table public.departamentos rename to departments;

insert into public.departments (company_id, nombre, created_at)
select dp.company_id, dp.nombre, dp.created_at
from public.departamentos_personal dp
where not exists (
  select 1 from public.departments d
  where d.company_id = dp.company_id and d.nombre = dp.nombre
);

update public.empleados e
set departamento_id = d.id
from public.departamentos_personal dp
join public.departments d
  on d.company_id = dp.company_id and d.nombre = dp.nombre
where e.departamento_id = dp.id;

alter table public.empleados drop constraint empleados_departamento_id_fkey;
alter table public.empleados add constraint empleados_departamento_id_fkey
  foreign key (departamento_id) references public.departments (id) on delete set null;

drop table public.departamentos_personal;

-- ---------------------------------------------------------
-- Estándar inter-módulo (compartido, sin prefijo)
-- ---------------------------------------------------------
alter table public.mov_esperados rename to expected_movements;
alter table public.mov_confirmados rename to confirmed_movements;

-- ---------------------------------------------------------
-- evaluacion_proveedor quedó pendiente de la migración 0011 original (nunca
-- llegó a crearse en este proyecto pese a estar en el archivo) — se crea
-- aquí igual que se especificó entonces, ya con la referencia a profiles
-- corregida al schema nuxorb (migración 0016).
-- ---------------------------------------------------------
create table if not exists public.evaluacion_proveedor (
  id uuid primary key default gen_random_uuid(),
  proveedor_id uuid not null references public.proveedores (id) on delete cascade,
  calificacion integer not null check (calificacion between 1 and 5),
  notas text,
  usuario_id uuid references nuxorb.profiles (id) on delete set null,
  fecha timestamptz not null default now()
);
alter table public.evaluacion_proveedor enable row level security;
create policy "evaluacion_proveedor: team all" on public.evaluacion_proveedor for all to authenticated using (is_team_member()) with check (is_team_member());
create policy "evaluacion_proveedor: member all own" on public.evaluacion_proveedor for all to authenticated
  using (exists (select 1 from public.proveedores p where p.id = evaluacion_proveedor.proveedor_id and is_company_member(p.company_id)))
  with check (exists (select 1 from public.proveedores p where p.id = evaluacion_proveedor.proveedor_id and is_company_member(p.company_id)));

-- ---------------------------------------------------------
-- Compras y Proveedores -> procurement_
-- ---------------------------------------------------------
alter table public.proveedores rename to procurement_suppliers;
alter table public.compras_settings rename to procurement_settings;
alter table public.compras rename to procurement_orders;
alter table public.compra_detalle rename to procurement_order_items;
alter table public.requisiciones rename to procurement_requisitions;
alter table public.reglas_aprobacion rename to procurement_approval_rules;
alter table public.aprobaciones_compra rename to procurement_order_approvals;
alter table public.evaluacion_proveedor rename to procurement_supplier_evaluations;
alter table public.recepciones rename to procurement_receipts;
alter table public.facturas_compra rename to procurement_purchase_invoices;
alter table public.tickets_compra rename to procurement_purchase_tickets;
alter table public.pagos_compra rename to procurement_purchase_payments;
alter table public.uso_lectura_tickets rename to procurement_ticket_reading_usage;

-- ---------------------------------------------------------
-- Gestión de Personal -> hr_
-- ---------------------------------------------------------
alter table public.empleados rename to hr_employees;
alter table public.documento_empleado rename to hr_employee_documents;
alter table public.historial_sueldo rename to hr_salary_history;
alter table public.incidencias rename to hr_incidents;
alter table public.saldo_vacaciones rename to hr_vacation_balances;
alter table public.concepto_nomina rename to hr_payroll_concepts;
alter table public.periodo_nomina rename to hr_payroll_periods;
alter table public.recibo_nomina rename to hr_payroll_receipts;
alter table public.recibo_detalle rename to hr_payroll_receipt_items;
alter table public.finiquito rename to hr_severances;
alter table public.tabla_fiscal rename to hr_tax_tables;

-- ---------------------------------------------------------
-- Ventas y CxC -> sales_
-- ---------------------------------------------------------
alter table public.clientes rename to sales_customers;
alter table public.prospectos rename to sales_prospects;
alter table public.etapas_pipeline rename to sales_pipeline_stages;
alter table public.motivos_perdida rename to sales_loss_reasons;
alter table public.oportunidades rename to sales_opportunities;
alter table public.productos_servicios rename to sales_products_services;
alter table public.ventas_settings rename to sales_settings;
alter table public.cotizaciones rename to sales_quotes;
alter table public.cotizacion_detalle rename to sales_quote_items;
alter table public.pedidos rename to sales_orders;
alter table public.pedido_detalle rename to sales_order_items;
alter table public.facturas rename to sales_invoices;
alter table public.factura_detalle rename to sales_invoice_items;
alter table public.anticipos_pedido rename to sales_order_advances;
alter table public.cobros rename to sales_collections;
