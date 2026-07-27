-- =========================================================
-- 0016 — separa en un schema propio ("nuxorb") las tablas que son
-- exclusivamente del equipo Nuxorb y jamás las opera un usuario de una
-- empresa cliente: profiles, companies, contacts, leads, tasks, notes,
-- company_addons, company_modules.
--
-- Esto es organización visual en el dashboard de Supabase, NO un cambio de
-- seguridad: el aislamiento real sigue siendo el RLS de siempre
-- (is_team_member()/is_company_member()), que se mueve intacto junto con
-- cada tabla (las policies y triggers viajan con `alter table ... set
-- schema`, no hay que recrearlos). company_modules sigue siendo legible
-- por el propio cliente (necesita saber qué módulos ve en su portal) —
-- eso no cambia, solo el schema donde vive la tabla.
--
-- Requiere una acción manual fuera de esta migración: agregar "nuxorb" a
-- Project Settings → API → Exposed schemas en el dashboard de Supabase,
-- si no se hace el cliente JS no puede alcanzar estas tablas.
-- =========================================================

create schema if not exists nuxorb;

grant usage on schema nuxorb to anon, authenticated, service_role;
alter default privileges in schema nuxorb grant all on tables to anon, authenticated, service_role;
alter default privileges in schema nuxorb grant all on sequences to anon, authenticated, service_role;

alter table public.profiles set schema nuxorb;
alter table public.companies set schema nuxorb;
alter table public.contacts set schema nuxorb;
alter table public.leads set schema nuxorb;
alter table public.tasks set schema nuxorb;
alter table public.notes set schema nuxorb;
alter table public.company_addons set schema nuxorb;
alter table public.company_modules set schema nuxorb;

grant all on all tables in schema nuxorb to anon, authenticated, service_role;
grant all on all sequences in schema nuxorb to anon, authenticated, service_role;

-- ---------------------------------------------------------
-- Funciones que referencian estas tablas por nombre calificado
-- (public.profiles) tienen que actualizarse al nuevo schema.
-- is_company_member()/is_company_owner() no cambian: siguen consultando
-- public.company_users, que se queda en public (la administra tanto
-- Nuxorb como el owner de la empresa cliente).
-- ---------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, nuxorb
as $$
begin
  insert into nuxorb.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create or replace function public.is_team_member()
returns boolean
language sql stable
security definer set search_path = public, nuxorb
as $$
  select exists (select 1 from nuxorb.profiles where id = auth.uid() and kind = 'team');
$$;
