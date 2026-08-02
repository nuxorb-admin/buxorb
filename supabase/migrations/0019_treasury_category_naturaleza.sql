-- =========================================================
-- 0019 — agrega `naturaleza` (fijo/variable/operativo) a las categorías de
-- Tesorería (tesoreria-modulo-v1.md sección 4.4: "atributo del catálogo,
-- se hereda automáticamente de la categoría elegida"). Necesario para el
-- estado de flujo de caja con subtotales (Utilidad operativa, Flujo neto de
-- caja) que agrupa categorías por esta naturaleza.
--
-- Ingresos y "Otros egresos" no tienen naturaleza (null) — en el reporte,
-- un egreso sin naturaleza cae en el grupo "operativo" (el más flexible),
-- igual que cualquier categoría libre que un cliente Professional cree sin
-- asignarle una.
-- =========================================================

alter table public.treasury_categories add column if not exists naturaleza text
  check (naturaleza in ('fijo', 'variable', 'operativo'));

alter table nuxorb.treasury_category_templates add column if not exists naturaleza text
  check (naturaleza in ('fijo', 'variable', 'operativo'));

update nuxorb.treasury_category_templates set naturaleza = case name
  when 'Nómina' then 'fijo'
  when 'Renta' then 'fijo'
  when 'Servicios (luz, agua, internet, tel.)' then 'fijo'
  when 'Seguros' then 'fijo'
  when 'Software y suscripciones' then 'fijo'
  when 'Préstamos / financiamiento' then 'fijo'
  when 'Compras de mercancía / materia prima' then 'variable'
  when 'Comisiones (venta/bancarias)' then 'variable'
  when 'Fletes y logística' then 'variable'
  when 'Mantenimiento' then 'variable'
  when 'Impuestos' then 'operativo'
  when 'Marketing y publicidad' then 'operativo'
  when 'Viáticos / viajes' then 'operativo'
  when 'Papelería y oficina' then 'operativo'
  when 'Honorarios profesionales (contador, legal)' then 'operativo'
  else null
end;

-- Backfill de las empresas ya sembradas con el catálogo fijo (0018): mismo
-- nombre exacto, se copia la naturaleza del machote.
update public.treasury_categories tc
set naturaleza = t.naturaleza
from nuxorb.treasury_category_templates t
where tc.name = t.name and tc.naturaleza is distinct from t.naturaleza;

create or replace function public.seed_treasury_categories()
returns trigger
language plpgsql
security definer set search_path = public, nuxorb
as $$
begin
  if new.module = 'tesoreria' then
    insert into public.treasury_categories (company_id, name, kind, naturaleza)
    select new.company_id, t.name, t.kind, t.naturaleza
    from nuxorb.treasury_category_templates t
    on conflict (company_id, name) do nothing;
  end if;
  return new;
end;
$$;
