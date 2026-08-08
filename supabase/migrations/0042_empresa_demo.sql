-- =========================================================
-- 0042 — Empresa demo real para /demo-saas, reemplazando el modelo viejo
-- (gate de contraseña compartida + sesión anónima + 4 páginas *Demo.tsx de
-- juguete, una de ellas contra demo_treasury_entries y las otras 3 con
-- sampleData.ts estático). Ahora los 4 módulos están en producción, así
-- que /demo-saas pasa a ser un tenant real más — mismo login, mismos
-- componentes, mismo RLS que cualquier cliente — resuelto vía
-- TenantPortal(slug="demo").
--
-- Idempotente por subdomain (no por un UUID fijo): se puede volver a
-- correr sin duplicar nada.
-- =========================================================

insert into nuxorb.companies (name, subdomain, max_users)
select 'Empresa Demo', 'demo', 5
where not exists (select 1 from nuxorb.companies where subdomain = 'demo');

insert into nuxorb.company_modules (company_id, module, tier, seats, active)
select c.id, m.module, 'professional', 3, true
from nuxorb.companies c
cross join (values ('tesoreria'), ('compras_proveedores'), ('gestion_personal'), ('ventas_cxc')) as m(module)
where c.subdomain = 'demo'
on conflict (company_id, module) do nothing;

-- demo_treasury_entries queda huérfana: era exclusiva de TesoreriaDemo.tsx
-- (el mini-CRUD de juguete que se retira en este mismo cambio), y su
-- policy `using (true)` era la única excepción de aislamiento real por
-- tenant documentada en ARCHITECTURE.md — ya no hace falta.
drop table if exists public.demo_treasury_entries;
