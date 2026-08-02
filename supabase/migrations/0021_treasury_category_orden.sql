-- =========================================================
-- 0021 — orden explícito del catálogo de categorías de Tesorería, tal como
-- se especificó (no alfabético): Ventas/Otros ingresos, luego Costo de
-- venta en su secuencia, Gastos de venta, Gastos administrativos, Gastos
-- financieros, Impuestos.
-- =========================================================

alter table nuxorb.treasury_category_templates add column if not exists orden integer not null default 999;
alter table public.treasury_categories add column if not exists orden integer not null default 999;

update nuxorb.treasury_category_templates set orden = v.orden
from (values
  ('Ventas', 1), ('Otros ingresos', 2),
  ('Materia prima', 3), ('Nómina operativa', 4), ('Costos indirectos', 5), ('Logística de compra y empaque', 6),
  ('Sueldos y comisiones de venta', 7), ('Publicidad y marketing', 8), ('Viáticos comerciales', 9), ('Renta de puntos de venta', 10),
  ('Sueldos administrativos', 11), ('Renta de oficinas', 12), ('Servicios administrativos', 13), ('Honorarios', 14),
  ('Software y licencias', 15), ('Otros gastos (papelería, seguros, etc.)', 16),
  ('Intereses pagados', 17), ('Comisiones bancarias', 18),
  ('ISR y PTU', 19)
) as v(name, orden)
where nuxorb.treasury_category_templates.name = v.name;

update public.treasury_categories tc
set orden = t.orden
from nuxorb.treasury_category_templates t
where tc.name = t.name and tc.orden is distinct from t.orden;

create or replace function public.seed_treasury_categories()
returns trigger
language plpgsql
security definer set search_path = public, nuxorb
as $$
begin
  if new.module = 'tesoreria' then
    insert into public.treasury_categories (company_id, name, kind, grupo, orden)
    select new.company_id, t.name, t.kind, t.grupo, t.orden
    from nuxorb.treasury_category_templates t
    on conflict (company_id, name) do nothing;
  end if;
  return new;
end;
$$;
