-- Fix: "Remove user" hard-deleted from auth.users, which cascaded to
-- public.users, which then hit the (unqualified, ON DELETE NO ACTION)
-- foreign keys from approvals.submitted_by, rank_evidence.submitted_by/
-- reviewed_by, and audit_logs.user_id — meaning any admin who had ever
-- submitted a request or taken a logged action (i.e. any real admin)
-- could never actually be removed; the delete failed with a raw FK
-- violation. Switching to soft-delete (deactivate) preserves every
-- historical record's user reference intact and sidesteps the FK issue
-- entirely, while still fully revoking access (paired with an auth-level
-- ban in the app's deactivateUserAction, and the current_role()/etc.
-- helpers below refusing to resolve a role for a deactivated account).

alter table public.users add column deactivated_at timestamptz;

-- Re-scope the security-definer role-lookup helpers so a deactivated
-- account is treated as roleless everywhere they're used — this
-- automatically locks a deactivated user out of every RLS policy built on
-- top of these functions (dojos, teachers, countries, approvals,
-- rank_evidence, audit_logs, users) without having to touch each policy.
create or replace function public.current_role()
returns public.app_role
language sql
stable
security definer
as $$
  select role from public.users where id = auth.uid() and deactivated_at is null;
$$;

create or replace function public.current_country_id()
returns uuid
language sql
stable
security definer
as $$
  select country_id from public.users where id = auth.uid() and deactivated_at is null;
$$;

create or replace function public.current_dojo_id()
returns uuid
language sql
stable
security definer
as $$
  select dojo_id from public.users where id = auth.uid() and deactivated_at is null;
$$;

create or replace function public.current_teacher_id()
returns uuid
language sql
stable
security definer
as $$
  select teacher_id from public.users where id = auth.uid() and deactivated_at is null;
$$;
