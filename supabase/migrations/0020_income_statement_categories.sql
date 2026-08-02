-- =========================================================
-- 0020 — reemplaza el catálogo de categorías de flujo de caja por una
-- estructura de estado de resultados real: Ingresos, Costo de venta,
-- Gastos de venta, Gastos administrativos, Gastos financieros, Impuestos,
-- con los 4 hitos de utilidad (Bruta, Operativa, Antes de Impuestos, Neta).
-- Sustituye la columna `naturaleza` (fijo/variable/operativo) por `grupo`,
-- que ya no clasifica solo el egreso sino la posición exacta en el estado.
-- =========================================================

alter table nuxorb.treasury_category_templates drop column if exists naturaleza;
alter table nuxorb.treasury_category_templates add column if not exists grupo text
  check (grupo in ('ingreso', 'costo_venta', 'gasto_venta', 'gasto_administrativo', 'gasto_financiero', 'impuesto'));

alter table public.treasury_categories drop column if exists naturaleza;
alter table public.treasury_categories add column if not exists grupo text
  check (grupo in ('ingreso', 'costo_venta', 'gasto_venta', 'gasto_administrativo', 'gasto_financiero', 'impuesto'));

delete from nuxorb.treasury_category_templates;
insert into nuxorb.treasury_category_templates (name, kind, grupo) values
  ('Ventas', 'ingreso', 'ingreso'),
  ('Otros ingresos', 'ingreso', 'ingreso'),
  ('Materia prima', 'egreso', 'costo_venta'),
  ('Nómina operativa', 'egreso', 'costo_venta'),
  ('Costos indirectos', 'egreso', 'costo_venta'),
  ('Logística de compra y empaque', 'egreso', 'costo_venta'),
  ('Sueldos y comisiones de venta', 'egreso', 'gasto_venta'),
  ('Publicidad y marketing', 'egreso', 'gasto_venta'),
  ('Viáticos comerciales', 'egreso', 'gasto_venta'),
  ('Renta de puntos de venta', 'egreso', 'gasto_venta'),
  ('Sueldos administrativos', 'egreso', 'gasto_administrativo'),
  ('Renta de oficinas', 'egreso', 'gasto_administrativo'),
  ('Servicios administrativos', 'egreso', 'gasto_administrativo'),
  ('Honorarios', 'egreso', 'gasto_administrativo'),
  ('Software y licencias', 'egreso', 'gasto_administrativo'),
  ('Otros gastos (papelería, seguros, etc.)', 'egreso', 'gasto_administrativo'),
  ('Intereses pagados', 'egreso', 'gasto_financiero'),
  ('Comisiones bancarias', 'egreso', 'gasto_financiero'),
  ('ISR y PTU', 'egreso', 'impuesto');

-- Los 2 movimientos de prueba que ya existían apuntaban a categorías que
-- desaparecen del catálogo — se reasignan a su equivalente más cercano en
-- vez de dejarlos como "categoría no reconocida".
update public.treasury_movements set category = 'Materia prima' where category = 'Compras de mercancía / materia prima';
update public.treasury_movements set category = 'Nómina operativa' where category = 'Nómina';

delete from public.treasury_categories
where company_id in (select company_id from nuxorb.company_modules where module = 'tesoreria');

insert into public.treasury_categories (company_id, name, kind, grupo)
select cm.company_id, t.name, t.kind, t.grupo
from nuxorb.company_modules cm
cross join nuxorb.treasury_category_templates t
where cm.module = 'tesoreria'
on conflict (company_id, name) do nothing;

create or replace function public.seed_treasury_categories()
returns trigger
language plpgsql
security definer set search_path = public, nuxorb
as $$
begin
  if new.module = 'tesoreria' then
    insert into public.treasury_categories (company_id, name, kind, grupo)
    select new.company_id, t.name, t.kind, t.grupo
    from nuxorb.treasury_category_templates t
    on conflict (company_id, name) do nothing;
  end if;
  return new;
end;
$$;
