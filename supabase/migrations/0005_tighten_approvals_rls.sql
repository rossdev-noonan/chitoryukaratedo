-- Defense-in-depth fix: approvals_insert_own previously only checked
-- submitted_by = auth.uid(), so any authenticated user (including a blocked
-- 'teacher' role, or a country_admin/dojo_admin outside their own scope)
-- could bypass the Server Action's role/scope checks by calling the
-- Supabase REST API directly. This makes the database enforce the same
-- rule the app already enforces in app/admin/dojos/actions.ts and
-- app/admin/teachers/actions.ts.

drop policy if exists approvals_insert_own on public.approvals;

create policy approvals_insert_own on public.approvals for insert
  with check (
    submitted_by = auth.uid()
    and (
      public.current_role() = 'sohonbu_admin'
      or (
        public.current_role() = 'country_admin'
        and entity_type in ('dojo', 'teacher')
        and (payload ->> 'country_id')::uuid = public.current_country_id()
      )
      or (
        public.current_role() = 'dojo_admin'
        and entity_type = 'teacher'
        and (payload ->> 'dojo_id')::uuid = public.current_dojo_id()
      )
    )
  );

-- Same gap on rank_evidence: previously only checked submitted_by = auth.uid(),
-- with no check that the teacher_id belongs to the submitter's own scope.
drop policy if exists rank_evidence_insert on public.rank_evidence;

create policy rank_evidence_insert on public.rank_evidence for insert
  with check (
    submitted_by = auth.uid()
    and (
      public.current_role() = 'sohonbu_admin'
      or (public.current_role() = 'teacher' and teacher_id = public.current_teacher_id())
      or (
        public.current_role() = 'dojo_admin'
        and exists (
          select 1 from public.teachers
          where teachers.id = rank_evidence.teacher_id
            and teachers.dojo_id = public.current_dojo_id()
        )
      )
    )
  );
