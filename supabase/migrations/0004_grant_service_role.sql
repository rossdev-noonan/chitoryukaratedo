-- service_role bypasses RLS automatically, but Postgres still requires a table-level
-- GRANT before any role can touch a table at all — the same gap fixed for anon/authenticated
-- in 0003 also applied to service_role and was missed. Fixing here.

grant usage on schema public to service_role;
grant select, insert, update, delete on all tables in schema public to service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;
