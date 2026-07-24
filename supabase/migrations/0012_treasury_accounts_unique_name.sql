-- =========================================================
-- 0012 — evita cuentas duplicadas por una condición de carrera al crear la
-- "Cuenta principal" perezosamente (dos cargas casi simultáneas de
-- Tesorería, ej. al navegar rápido entre módulos, podían insertar dos filas
-- antes de que la primera terminara). Mismo patrón que treasury_categories,
-- que ya tenía este unique.
-- =========================================================

-- Por si ya hay duplicados (mismo nombre) en alguna empresa de prueba, se
-- conserva la más antigua y se reasignan sus movimientos antes de poner el
-- unique — así la migración no falla si el bug ya ocurrió.
do $$
declare
  dup record;
begin
  for dup in
    select company_id, name, (array_agg(id order by created_at))[1] as keep_id
    from public.treasury_accounts
    group by company_id, name
    having count(*) > 1
  loop
    update public.treasury_movements
      set account_id = dup.keep_id
      where account_id in (
        select id from public.treasury_accounts
        where company_id = dup.company_id and name = dup.name and id <> dup.keep_id
      );
    delete from public.treasury_accounts
      where company_id = dup.company_id and name = dup.name and id <> dup.keep_id;
  end loop;
end $$;

alter table public.treasury_accounts drop constraint if exists treasury_accounts_company_name_key;
alter table public.treasury_accounts add constraint treasury_accounts_company_name_key unique (company_id, name);
