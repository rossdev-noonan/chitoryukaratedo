-- Placeholder seed data — mirrors lib/mock-data.ts exactly, moved into the real
-- tables so the directory/teacher pages can run live queries instead of the
-- hardcoded file. Same "pending Mike confirmation" placeholders, just relocated.
-- Status is 'approved' so they render publicly, matching current site behavior.

insert into public.countries (slug, name, has_own_federation_site, federation_site_url, federation_name, representative, status)
values
  ('canada', 'Canada', true, 'https://ickf.ca', 'ICKF Canada', '— (placeholder, pending Mike confirmation)', 'approved'),
  ('usa', 'United States', true, 'https://usa-ickf.com', 'USA-ICKF', '— (placeholder, pending Mike confirmation)', 'approved'),
  ('australia', 'Australia', false, null, null, null, 'approved');

insert into public.dojos (slug, name, country_id, city, head_instructor, contact_email, status)
select
  'example-dojo-1',
  'Example Dojo',
  id,
  '— (placeholder city)',
  '— (placeholder instructor)',
  '—',
  'approved'
from public.countries where slug = 'australia';

insert into public.teachers (slug, name_native, name_romaji_final, rank, dojo_id, country_id, status)
select
  'example-teacher-1',
  '—',
  '— (placeholder)',
  '— (placeholder rank)',
  d.id,
  d.country_id,
  'approved'
from public.dojos d where d.slug = 'example-dojo-1';
