-- =========================================================
-- 0050 — Lealtad: bucket de Storage para el logo de la tarjeta. A
-- diferencia de hr-employee-documents (privado, se lee con
-- createSignedUrl), este bucket es público porque Google Wallet necesita
-- una URL HTTPS directa para mostrar el logo en la tarjeta.
--
-- Convención de path: `{company_id}/{filename}` — mismo criterio de RLS
-- que hr-employee-documents (0039), validando el primer segmento del path
-- contra is_company_member()/is_team_member().
-- =========================================================

insert into storage.buckets (id, name, public)
values ('loyalty-logos', 'loyalty-logos', true)
on conflict (id) do nothing;

drop policy if exists "loyalty-logos: team all" on storage.objects;
create policy "loyalty-logos: team all" on storage.objects for all to authenticated
  using (bucket_id = 'loyalty-logos' and is_team_member())
  with check (bucket_id = 'loyalty-logos' and is_team_member());

drop policy if exists "loyalty-logos: member all own" on storage.objects;
create policy "loyalty-logos: member all own" on storage.objects for all to authenticated
  using (bucket_id = 'loyalty-logos' and is_company_member((storage.foldername(name))[1]::uuid))
  with check (bucket_id = 'loyalty-logos' and is_company_member((storage.foldername(name))[1]::uuid));

-- Lectura pública — Google Wallet (y cualquiera con el link) necesita ver
-- el logo sin autenticarse.
drop policy if exists "loyalty-logos: public read" on storage.objects;
create policy "loyalty-logos: public read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'loyalty-logos');
