-- Real download_documents table + public storage bucket, replacing the
-- hardcoded document list in lib/downloads-content.ts with rows Sohonbu
-- Admin can manage directly. Categories (kanji/title/description) stay
-- defined in code — they're fixed structural labels from Gil's Figma design,
-- not editorial content — only the documents within each category become
-- real rows.
--
-- No approvals-queue integration: these are official federation documents
-- (grading syllabi, membership forms, rules) that only Sohonbu Admin
-- publishes directly — there's no legitimate country/dojo-admin submitter
-- the way there is for news/events, so this follows the simpler
-- teacher-photos-approved precedent (0009: public bucket + sohonbu-only
-- write policy) rather than the full approvals pipeline.
--
-- file_path is nullable: the existing hardcoded list is carried over as seed
-- rows below so the public page doesn't go blank, but none of those have a
-- real file behind them yet (Gil's Figma content was metadata-only mockup
-- data, not actual PDFs). A null file_path renders as a disabled download
-- affordance on the public page until Sohonbu Admin uploads a real file
-- through /admin/downloads. file_size_label is stored pre-formatted (e.g.
-- "2.4 MB") rather than raw bytes — same reasoning as events.date_range_label
-- already being a formatted string rather than computed on every read.

create table public.download_documents (
  id uuid primary key default gen_random_uuid(),
  category_id text not null
    check (category_id in ('grading-syllabus', 'membership-forms', 'technical-documents', 'rules-guidelines')),
  title text not null,
  file_type text not null check (file_type in ('PDF', 'DOC', 'XLS')),
  file_path text,
  file_size_label text,
  sort_order integer not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index download_documents_category_id_idx on public.download_documents (category_id);

create trigger download_documents_set_updated_at before update on public.download_documents
  for each row execute function public.set_updated_at();

create trigger download_documents_audit after insert or update or delete on public.download_documents
  for each row execute function public.write_audit_log();

alter table public.download_documents enable row level security;

create policy download_documents_public_select on public.download_documents for select
  using (deleted_at is null);

create policy download_documents_sohonbu_write on public.download_documents for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- Public storage bucket — same reasoning as teacher-photos-approved
-- (0009_teacher_photos.sql): public read since documents are downloaded
-- directly from the public site, writes restricted to sohonbu_admin only.
insert into storage.buckets (id, name, public)
values ('download-documents', 'download-documents', true)
on conflict (id) do nothing;

create policy download_documents_storage_write on storage.objects for all
  using (bucket_id = 'download-documents' and public.current_role() = 'sohonbu_admin')
  with check (bucket_id = 'download-documents' and public.current_role() = 'sohonbu_admin');

-- Seed: carry over the exact list already live on /resources/downloads (built
-- from Gil's Figma design) so switching to real data doesn't blank the page.
-- created_at/updated_at set to a day within the month each row's "Updated"
-- label already showed, so the displayed date doesn't change.
insert into public.download_documents
  (category_id, title, file_type, file_size_label, sort_order, created_at, updated_at)
values
  ('grading-syllabus', 'Kyu Grading Syllabus (White – Brown Belt)', 'PDF', '2.4 MB', 0, '2026-06-15', '2026-06-15'),
  ('grading-syllabus', 'Dan Grading Syllabus (1st – 5th Dan)', 'PDF', '3.1 MB', 1, '2026-06-15', '2026-06-15'),
  ('grading-syllabus', 'Senior Dan Requirements (6th Dan and above)', 'PDF', '1.8 MB', 2, '2026-03-15', '2026-03-15'),
  ('grading-syllabus', 'Grading Record Tracking Sheet', 'XLS', '84 KB', 3, '2026-01-15', '2026-01-15'),

  ('membership-forms', 'New Member Registration Form', 'DOC', '112 KB', 0, '2026-02-15', '2026-02-15'),
  ('membership-forms', 'Dojo Affiliation Application', 'PDF', '640 KB', 1, '2026-02-15', '2026-02-15'),
  ('membership-forms', 'Instructor Certification Application', 'DOC', '98 KB', 2, '2026-01-15', '2026-01-15'),

  ('technical-documents', 'Official Kata Reference Guide', 'PDF', '5.2 MB', 0, '2026-05-15', '2026-05-15'),
  ('technical-documents', 'Japanese Terminology Glossary', 'PDF', '1.1 MB', 1, '2026-04-15', '2026-04-15'),

  ('rules-guidelines', 'Competition Rules & Judging Criteria', 'PDF', '2.0 MB', 0, '2026-06-15', '2026-06-15'),
  ('rules-guidelines', 'Code of Conduct & Federation Bylaws', 'PDF', '460 KB', 1, '2026-01-15', '2026-01-15');
