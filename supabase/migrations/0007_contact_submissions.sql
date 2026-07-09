-- Phase 7: public contact form backend. Public visitors are anonymous
-- (never authenticated), so this table only supports insert — never
-- select/update/delete for anon/authenticated. Only sohonbu_admin can read
-- submissions, matching the pattern used elsewhere for anything
-- unapproved/private.

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy contact_submissions_insert_anon on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy contact_submissions_select_sohonbu on public.contact_submissions for select
  using (public.current_role() = 'sohonbu_admin');

-- Table-level GRANT is separate from RLS and does not happen automatically
-- for tables created via raw SQL (only the Table Editor UI does this) — see
-- 0003_grant_table_privileges.sql for the original discovery of this gap.
-- ALTER DEFAULT PRIVILEGES from that migration only covers tables created
-- after it ran, so each new table still needs this explicitly.
grant select, insert on public.contact_submissions to anon, authenticated;
grant select, insert, update, delete on public.contact_submissions to service_role;
