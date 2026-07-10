-- Teacher photo storage — named in the build spec (storage.buckets:
-- "teacher-photos-approved", public: true) and in the sitemap doc's Teacher
-- Detail page mapping ("photo if approved"), but never actually built.
-- Backend-only addition: bucket + column. No upload UI yet — that's a
-- design-dependent piece, on hold pending Gil's handoff (see project memory).
--
-- Unlike rank-evidence (private bucket, signed URLs), this bucket is public
-- by design — once a file lands here it's immediately fetchable via its
-- public URL with no RLS check on read. That means uploads must be
-- restricted to sohonbu_admin only (the same role that's the only one
-- allowed to write the teachers table directly): a submitter's pending,
-- unapproved photo must never land in a publicly-readable bucket before
-- Sohonbu Admin has actually approved it.

insert into storage.buckets (id, name, public)
values ('teacher-photos-approved', 'teacher-photos-approved', true)
on conflict (id) do nothing;

create policy teacher_photos_write_sohonbu on storage.objects for all
  using (bucket_id = 'teacher-photos-approved' and public.current_role() = 'sohonbu_admin')
  with check (bucket_id = 'teacher-photos-approved' and public.current_role() = 'sohonbu_admin');

alter table public.teachers add column photo_path text;
