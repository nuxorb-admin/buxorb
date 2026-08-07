-- =========================================================
-- 0039 — Gestión de Personal: la carga de documentos del expediente
-- (§4.2 Essential del MD) no tenía dónde guardar el archivo — la tabla solo
-- tenía nombre/tipo, sin referencia al archivo real. Se agrega la columna
-- y el bucket de Storage correspondiente.
--
-- Convención de path: `{company_id}/{empleado_id}/{filename}` — la RLS de
-- storage.objects valida el primer segmento del path contra
-- is_company_member(), mismo criterio que el resto de las tablas del
-- módulo, sin necesitar un join.
-- =========================================================

alter table public.hr_employee_documents add column if not exists storage_path text;

insert into storage.buckets (id, name, public)
values ('hr-employee-documents', 'hr-employee-documents', false)
on conflict (id) do nothing;

drop policy if exists "hr-employee-documents: team all" on storage.objects;
create policy "hr-employee-documents: team all" on storage.objects for all to authenticated
  using (bucket_id = 'hr-employee-documents' and is_team_member())
  with check (bucket_id = 'hr-employee-documents' and is_team_member());

drop policy if exists "hr-employee-documents: member all own" on storage.objects;
create policy "hr-employee-documents: member all own" on storage.objects for all to authenticated
  using (bucket_id = 'hr-employee-documents' and is_company_member((storage.foldername(name))[1]::uuid))
  with check (bucket_id = 'hr-employee-documents' and is_company_member((storage.foldername(name))[1]::uuid));
