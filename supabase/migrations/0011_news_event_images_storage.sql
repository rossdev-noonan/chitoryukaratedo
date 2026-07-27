-- Public storage bucket for News/Events submission images. Unlike
-- rank-evidence (private, signed URLs only), these images need to render
-- directly on the public site via next/image, so the bucket is public for
-- reads. Uploads are scoped to the submitter's own folder (same pattern as
-- rank-evidence's storage policy) rather than gated to sohonbu_admin only
-- like teacher-photos-approved — a marketing banner/poster isn't identifiable
-- personal data the way a teacher's photo is, and nothing links to an
-- unapproved submission's image URL anywhere in the app until Sohonbu Admin
-- actually approves the post/event that references it.

insert into storage.buckets (id, name, public)
values ('news-event-images', 'news-event-images', true)
on conflict (id) do nothing;

create policy news_event_images_insert on storage.objects for insert
  with check (
    bucket_id = 'news-event-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
