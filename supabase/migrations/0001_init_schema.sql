-- Chito-Ryu International — Phase 3 data model
-- Tables: users, countries, dojos, teachers, approvals, rank_evidence, audit_logs
-- Source of truth for this schema: chito-ryu-build-procedure-codex-claude.md (roles, non-negotiables)

create extension if not exists pg_trgm;

create type public.app_role as enum ('sohonbu_admin', 'country_admin', 'dojo_admin', 'teacher');
create type public.approval_status as enum ('pending', 'approved', 'rejected');
create type public.approval_entity as enum ('country', 'dojo', 'teacher', 'rank_evidence');
create type public.approval_action as enum ('create', 'update', 'delete');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.app_role not null,
  country_id uuid,
  dojo_id uuid,
  teacher_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.countries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  has_own_federation_site boolean not null default false,
  federation_site_url text,
  federation_name text,
  representative text,
  status public.approval_status not null default 'pending',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dojos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country_id uuid not null references public.countries (id),
  city text,
  head_instructor text,
  contact_email text,
  status public.approval_status not null default 'pending',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_native text,
  name_kana text,
  name_romaji_auto text,
  name_romaji_final text,
  rank text,
  dojo_id uuid not null references public.dojos (id),
  country_id uuid not null references public.countries (id),
  status public.approval_status not null default 'pending',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users
  add constraint users_country_id_fkey foreign key (country_id) references public.countries (id),
  add constraint users_dojo_id_fkey foreign key (dojo_id) references public.dojos (id),
  add constraint users_teacher_id_fkey foreign key (teacher_id) references public.teachers (id);

create table public.rank_evidence (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers (id),
  rank_claimed text not null,
  issued_by text,
  issued_date date,
  file_path text not null,
  status public.approval_status not null default 'pending',
  submitted_by uuid not null references public.users (id),
  reviewed_by uuid references public.users (id),
  reviewed_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- Generic queue: country/dojo/teacher admins submit proposed changes here.
-- Only sohonbu_admin approval writes the change into the real table — this is
-- how "country/dojo admins cannot publish public records directly" is enforced.
create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  entity_type public.approval_entity not null,
  entity_id uuid,
  action public.approval_action not null,
  payload jsonb not null,
  submitted_by uuid not null references public.users (id),
  status public.approval_status not null default 'pending',
  reviewed_by uuid references public.users (id),
  reviewed_at timestamptz,
  review_note text,
  created_at timestamptz not null default now()
);

-- Append-only. No update/delete policy is granted to anyone below,
-- including sohonbu_admin, matching the non-negotiable "cannot delete audit logs".
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id),
  action text not null,
  table_name text not null,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index countries_slug_idx on public.countries (slug);
create index dojos_slug_idx on public.dojos (slug);
create index dojos_country_id_idx on public.dojos (country_id);
create index teachers_slug_idx on public.teachers (slug);
create index teachers_dojo_id_idx on public.teachers (dojo_id);
create index teachers_country_id_idx on public.teachers (country_id);
create index teachers_name_romaji_trgm_idx on public.teachers using gin (name_romaji_final gin_trgm_ops);
create index teachers_name_kana_trgm_idx on public.teachers using gin (name_kana gin_trgm_ops);
create index approvals_status_idx on public.approvals (status);
create index approvals_entity_idx on public.approvals (entity_type, entity_id);
create index audit_logs_table_record_idx on public.audit_logs (table_name, record_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger countries_set_updated_at before update on public.countries
  for each row execute function public.set_updated_at();
create trigger dojos_set_updated_at before update on public.dojos
  for each row execute function public.set_updated_at();
create trigger teachers_set_updated_at before update on public.teachers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Audit log trigger — fires on every insert/update/delete of the core tables
-- ---------------------------------------------------------------------------

create function public.write_audit_log()
returns trigger
language plpgsql
security definer
as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.audit_logs (user_id, action, table_name, record_id, new_values)
    values (auth.uid(), 'insert', tg_table_name, new.id, to_jsonb(new));
    return new;
  elsif (tg_op = 'UPDATE') then
    insert into public.audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    values (auth.uid(), 'update', tg_table_name, new.id, to_jsonb(old), to_jsonb(new));
    return new;
  elsif (tg_op = 'DELETE') then
    insert into public.audit_logs (user_id, action, table_name, record_id, old_values)
    values (auth.uid(), 'delete', tg_table_name, old.id, to_jsonb(old));
    return old;
  end if;
  return null;
end;
$$;

create trigger countries_audit after insert or update or delete on public.countries
  for each row execute function public.write_audit_log();
create trigger dojos_audit after insert or update or delete on public.dojos
  for each row execute function public.write_audit_log();
create trigger teachers_audit after insert or update or delete on public.teachers
  for each row execute function public.write_audit_log();
create trigger rank_evidence_audit after insert or update or delete on public.rank_evidence
  for each row execute function public.write_audit_log();

-- ---------------------------------------------------------------------------
-- Role-lookup helpers (security definer avoids RLS recursion on public.users)
-- ---------------------------------------------------------------------------

create function public.current_role()
returns public.app_role
language sql
stable
security definer
as $$
  select role from public.users where id = auth.uid();
$$;

create function public.current_country_id()
returns uuid
language sql
stable
security definer
as $$
  select country_id from public.users where id = auth.uid();
$$;

create function public.current_dojo_id()
returns uuid
language sql
stable
security definer
as $$
  select dojo_id from public.users where id = auth.uid();
$$;

create function public.current_teacher_id()
returns uuid
language sql
stable
security definer
as $$
  select teacher_id from public.users where id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.users enable row level security;
alter table public.countries enable row level security;
alter table public.dojos enable row level security;
alter table public.teachers enable row level security;
alter table public.approvals enable row level security;
alter table public.rank_evidence enable row level security;
alter table public.audit_logs enable row level security;

-- users
create policy users_select_self on public.users for select
  using (id = auth.uid());
create policy users_select_sohonbu on public.users for select
  using (public.current_role() = 'sohonbu_admin');
create policy users_manage_sohonbu on public.users for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- countries
create policy countries_public_select on public.countries for select
  using (status = 'approved' and deleted_at is null);
create policy countries_admin_select on public.countries for select
  using (
    public.current_role() = 'sohonbu_admin'
    or (public.current_role() = 'country_admin' and id = public.current_country_id())
  );
create policy countries_sohonbu_write on public.countries for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- dojos
create policy dojos_public_select on public.dojos for select
  using (status = 'approved' and deleted_at is null);
create policy dojos_admin_select on public.dojos for select
  using (
    public.current_role() = 'sohonbu_admin'
    or (public.current_role() = 'country_admin' and country_id = public.current_country_id())
    or (public.current_role() = 'dojo_admin' and id = public.current_dojo_id())
  );
create policy dojos_sohonbu_write on public.dojos for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- teachers
create policy teachers_public_select on public.teachers for select
  using (status = 'approved' and deleted_at is null);
create policy teachers_admin_select on public.teachers for select
  using (
    public.current_role() = 'sohonbu_admin'
    or (public.current_role() = 'country_admin' and country_id = public.current_country_id())
    or (public.current_role() = 'dojo_admin' and dojo_id = public.current_dojo_id())
    or (public.current_role() = 'teacher' and id = public.current_teacher_id())
  );
create policy teachers_sohonbu_write on public.teachers for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- approvals — country/dojo/teacher admins submit proposals; only sohonbu_admin reviews
create policy approvals_insert_own on public.approvals for insert
  with check (submitted_by = auth.uid());
create policy approvals_select_own on public.approvals for select
  using (submitted_by = auth.uid() or public.current_role() = 'sohonbu_admin');
create policy approvals_review_sohonbu on public.approvals for update
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- rank_evidence — private, never public; own submitter, own teacher, or sohonbu_admin
create policy rank_evidence_select on public.rank_evidence for select
  using (
    public.current_role() = 'sohonbu_admin'
    or submitted_by = auth.uid()
    or (public.current_role() = 'teacher' and teacher_id = public.current_teacher_id())
  );
create policy rank_evidence_insert on public.rank_evidence for insert
  with check (submitted_by = auth.uid());
create policy rank_evidence_review_sohonbu on public.rank_evidence for update
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- audit_logs — sohonbu_admin can read. No insert/update/delete policy is granted to
-- any role: writes only happen through the security-definer trigger function above,
-- which runs as the table owner and bypasses RLS. Nobody else can write or edit rows.
create policy audit_logs_select_sohonbu on public.audit_logs for select
  using (public.current_role() = 'sohonbu_admin');
