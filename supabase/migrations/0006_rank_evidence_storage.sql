-- Private storage bucket for rank evidence files (certificates, etc).
-- Never public. Files are uploaded by the submitter into a folder keyed by
-- their own auth.uid(), matching the rank_evidence_insert RLS check.
-- Reads never go through the client directly — there is deliberately no
-- SELECT policy here. Downloads are only ever served via a signed URL that
-- the app generates server-side (using the service-role client) after
-- checking the requester against the rank_evidence table's own RLS logic
-- (submitter, the teacher themselves, their dojo_admin, or sohonbu_admin).
-- This keeps "rank evidence is private, never public" true even if someone
-- tries to hit the Storage API directly.

insert into storage.buckets (id, name, public)
values ('rank-evidence', 'rank-evidence', false)
on conflict (id) do nothing;

create policy rank_evidence_storage_insert on storage.objects for insert
  with check (
    bucket_id = 'rank-evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
