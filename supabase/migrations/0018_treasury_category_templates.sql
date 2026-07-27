-- =========================================================
-- 0018 — catálogo fijo de categorías de flujo de caja (tesoreria-modulo-v1.md
-- sección 4.4, 17 categorías) como machote en el schema nuxorb (el equipo
-- Nuxorb lo define y mantiene, el cliente nunca lo lee ni lo toca), más un
-- trigger que lo replica a treasury_categories de la empresa en el momento
-- en que se le activa el módulo de Tesorería (insert en
-- nuxorb.company_modules) — no depende de que el cliente abra la pantalla,
-- corre en el servidor al momento del alta/venta.
-- =========================================================

create table if not exists nuxorb.treasury_category_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  kind text not null check (kind in ('ingreso', 'egreso', 'ambos')),
  created_at timestamptz not null default now()
);

alter table nuxorb.treasury_category_templates enable row level security;
create policy "treasury_category_templates: team all" on nuxorb.treasury_category_templates
  for all to authenticated using (is_team_member()) with check (is_team_member());

insert into nuxorb.treasury_category_templates (name, kind) values
  ('Ventas', 'ingreso'),
  ('Otros ingresos', 'ingreso'),
  ('Nómina', 'egreso'),
  ('Renta', 'egreso'),
  ('Servicios (luz, agua, internet, tel.)', 'egreso'),
  ('Seguros', 'egreso'),
  ('Software y suscripciones', 'egreso'),
  ('Préstamos / financiamiento', 'egreso'),
  ('Compras de mercancía / materia prima', 'egreso'),
  ('Comisiones (venta/bancarias)', 'egreso'),
  ('Fletes y logística', 'egreso'),
  ('Mantenimiento', 'egreso'),
  ('Impuestos', 'egreso'),
  ('Marketing y publicidad', 'egreso'),
  ('Viáticos / viajes', 'egreso'),
  ('Papelería y oficina', 'egreso'),
  ('Honorarios profesionales (contador, legal)', 'egreso'),
  ('Otros egresos', 'egreso')
on conflict (name) do nothing;

-- ---------------------------------------------------------
-- Trigger: al activarse Tesorería para una empresa, se copia el machote a
-- su propia treasury_categories (que sigue siendo editable por Professional,
-- ver limits.ts — el machote no limita eso, solo da el punto de partida).
-- ---------------------------------------------------------
create or replace function public.seed_treasury_categories()
returns trigger
language plpgsql
security definer set search_path = public, nuxorb
as $$
begin
  if new.module = 'tesoreria' then
    insert into public.treasury_categories (company_id, name, kind)
    select new.company_id, t.name, t.kind
    from nuxorb.treasury_category_templates t
    on conflict (company_id, name) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists company_modules_seed_treasury_categories on nuxorb.company_modules;
create trigger company_modules_seed_treasury_categories
  after insert on nuxorb.company_modules
  for each row execute function public.seed_treasury_categories();

-- ---------------------------------------------------------
-- Backfill: empresas que ya tenían Tesorería activa antes de este machote.
-- Se limpian sus categorías informales previas (nombres sueltos tipo
-- "ventas"/"nomina" del fallback viejo del frontend, sin acentos ni
-- mayúsculas, que no coinciden con el catálogo fijo) y se resiembran con el
-- catálogo oficial de 17. Los movimientos ya guardados no se ven afectados
-- (treasury_movements.category es texto libre, no llave foránea).
-- ---------------------------------------------------------
delete from public.treasury_categories
where company_id in (
  select company_id from nuxorb.company_modules where module = 'tesoreria'
);

insert into public.treasury_categories (company_id, name, kind)
select cm.company_id, t.name, t.kind
from nuxorb.company_modules cm
cross join nuxorb.treasury_category_templates t
where cm.module = 'tesoreria'
on conflict (company_id, name) do nothing;
