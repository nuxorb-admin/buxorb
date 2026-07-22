-- =========================================================
-- 0005 — corrige dos bugs encontrados al probar el primer login real
-- de un usuario de empresa:
--
-- 1. is_company_member()/is_company_owner() consultaban company_users,
--    pero como esa misma tabla tiene RLS que vuelve a llamar a esas
--    funciones, Postgres entraba en recursión infinita
--    ("stack depth limit exceeded"). Se marcan security definer para
--    que la verificación interna no vuelva a pasar por RLS.
-- 2. Un usuario de empresa ya logueado (no es team, todavía no se
--    resuelve si es member porque el login pasa por aquí primero) no
--    podía leer ni su propia fila de companies — la policy pública
--    era solo "to anon". Se agrega una policy explícita para
--    autenticados que sí pertenecen a esa empresa.
-- =========================================================

create or replace function public.is_company_owner(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.company_users
    where company_id = target_company_id and user_id = auth.uid() and is_owner = true
  );
$$;

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.company_users
    where company_id = target_company_id and user_id = auth.uid()
  );
$$;

drop policy if exists "companies: member read own" on public.companies;
create policy "companies: member read own" on public.companies
  for select to authenticated
  using (is_team_member() or is_company_member(id));
