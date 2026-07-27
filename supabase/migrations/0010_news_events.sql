-- News & Events go dynamic: real tables + admin submission through the same
-- approvals pipeline already proven for dojos/teachers, instead of the
-- hardcoded lib/news-content.ts / lib/events-content.ts used by the
-- 2026-07-24 Figma rebuild. Sohonbu Admin, Country Admin, and Dojo Admin can
-- all submit; Sohonbu Admin approves before anything goes live, exactly like
-- dojo/teacher submissions. Country/Dojo Admin submissions are scoped to
-- their own country; only Sohonbu Admin can leave country_id null for a
-- federation-wide item (e.g. "Message from the Soke").

-- ---------------------------------------------------------------------------
-- approvals.entity_type: enum -> text + check constraint
-- Converting away from the enum instead of ALTER TYPE ... ADD VALUE — adding
-- enum values can't safely be used in the same migration run that also
-- references them (a real Postgres restriction), and this project's
-- migrations are pasted into the SQL Editor as one script. A text column
-- with a check constraint gives the same validation with none of that
-- two-step-run fragility, and makes adding the next entity type later a
-- one-line constraint change instead of a migration-ordering problem.
-- ---------------------------------------------------------------------------

alter table public.approvals
  alter column entity_type type text using entity_type::text;

alter table public.approvals
  add constraint approvals_entity_type_check
  check (entity_type in ('country', 'dojo', 'teacher', 'rank_evidence', 'news_post', 'event'));

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  tag text not null,
  title text not null,
  subtitle text,
  description text,
  date_location_label text,
  published_at date not null default current_date,
  image_desktop text not null,
  image_mobile text,
  show_on_mobile boolean not null default true,
  featured boolean not null default false,
  country_id uuid references public.countries (id),
  status public.approval_status not null default 'pending',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tags text[] not null default '{}',
  location text not null,
  date_range_label text,
  start_date date not null,
  end_date date,
  address_line1 text,
  address_line2 text,
  poster_desktop text,
  poster_mobile text,
  show_on_mobile boolean not null default true,
  featured boolean not null default false,
  country_id uuid references public.countries (id),
  status public.approval_status not null default 'pending',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index news_posts_country_id_idx on public.news_posts (country_id);
create index news_posts_status_idx on public.news_posts (status);
create index events_country_id_idx on public.events (country_id);
create index events_status_idx on public.events (status);
create index events_start_date_idx on public.events (start_date);

create trigger news_posts_set_updated_at before update on public.news_posts
  for each row execute function public.set_updated_at();
create trigger events_set_updated_at before update on public.events
  for each row execute function public.set_updated_at();

create trigger news_posts_audit after insert or update or delete on public.news_posts
  for each row execute function public.write_audit_log();
create trigger events_audit after insert or update or delete on public.events
  for each row execute function public.write_audit_log();

-- ---------------------------------------------------------------------------
-- Row Level Security — same shape as dojos/teachers
-- ---------------------------------------------------------------------------

alter table public.news_posts enable row level security;
alter table public.events enable row level security;

create policy news_posts_public_select on public.news_posts for select
  using (status = 'approved' and deleted_at is null);
create policy news_posts_admin_select on public.news_posts for select
  using (
    public.current_role() = 'sohonbu_admin'
    or (public.current_role() = 'country_admin' and country_id = public.current_country_id())
    or (
      public.current_role() = 'dojo_admin'
      and country_id in (select country_id from public.dojos where id = public.current_dojo_id())
    )
  );
create policy news_posts_sohonbu_write on public.news_posts for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

create policy events_public_select on public.events for select
  using (status = 'approved' and deleted_at is null);
create policy events_admin_select on public.events for select
  using (
    public.current_role() = 'sohonbu_admin'
    or (public.current_role() = 'country_admin' and country_id = public.current_country_id())
    or (
      public.current_role() = 'dojo_admin'
      and country_id in (select country_id from public.dojos where id = public.current_dojo_id())
    )
  );
create policy events_sohonbu_write on public.events for all
  using (public.current_role() = 'sohonbu_admin')
  with check (public.current_role() = 'sohonbu_admin');

-- ---------------------------------------------------------------------------
-- approvals: allow Country Admin / Dojo Admin to submit news_post/event,
-- scoped to their own country — same defense-in-depth pattern as 0005.
-- ---------------------------------------------------------------------------

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
      or (
        public.current_role() = 'country_admin'
        and entity_type in ('news_post', 'event')
        and (payload ->> 'country_id')::uuid = public.current_country_id()
      )
      or (
        public.current_role() = 'dojo_admin'
        and entity_type in ('news_post', 'event')
        and (payload ->> 'country_id')::uuid in (
          select country_id from public.dojos where id = public.current_dojo_id()
        )
      )
    )
  );

-- ---------------------------------------------------------------------------
-- Seed: carry over the exact content already live on /news and /events
-- (built from Gil's Figma design 2026-07-24) so switching to real data
-- doesn't blank the pages. Status 'approved' — same treatment as the
-- Phase 3 placeholder seed. country_id resolved by slug where a real
-- country row exists (canada/usa/australia as of the Phase 3 seed);
-- countries not yet in the live table (Brazil, Scotland, Japan) resolve to
-- null, which just means "no country tag" rather than failing the insert.
-- ---------------------------------------------------------------------------

insert into public.news_posts
  (slug, tag, title, subtitle, description, date_location_label, published_at, image_desktop, image_mobile, show_on_mobile, featured, country_id, status)
values
  ('15th-chito-ryu-karate-soke-cup-announced', 'EVENT', '15th Chito Ryu Karate Soke Cup Announced', null,
   'The federation''s flagship international competition returns to the Gold Coast this August, bringing together practitioners from over twenty countries.',
   'Aug 14 - Aug 15, 2026 · Gold Coast, Australia', '2026-07-20',
   '/images/news/featured-banner-desktop.png', '/images/news/featured-banner-mobile.png', true, true,
   (select id from public.countries where slug = 'australia'), 'approved'),

  ('message-from-the-soke', 'MESSAGE FROM THE SOKE', 'Message from the Soke', null, null, null, '2026-07-18',
   '/images/news/card-0-desktop.png', '/images/news/card-0-mobile.png', true, false, null, 'approved'),

  ('new-dojo-in-brazil', 'DOJO UPDATES', 'New Dojo in Brazil', 'Chito Ryu continues to grow in South America', null, null, '2026-07-10',
   '/images/news/card-1-desktop.png', '/images/news/card-1-mobile.png', true, false,
   (select id from public.countries where slug = 'brazil'), 'approved'),

  ('2027-grading-calendar-released', 'ANNOUNCEMENTS', '2027 Grading Calendar Released', null, null, null, '2026-07-02',
   '/images/news/card-2-desktop.png', '/images/news/card-2-mobile.png', true, false, null, 'approved'),

  ('scotland-dojo-celebrates-20-years', 'DOJO UPDATES', 'Scotland Dojo Celebrates 20 Years', null, null, null, '2026-06-24',
   '/images/news/card-3-desktop.png', null, false, false,
   (select id from public.countries where slug = 'scotland'), 'approved'),

  ('updated-technical-guidelines-published', 'ANNOUNCEMENTS', 'Updated Technical Guidelines Published', null, null, null, '2026-06-15',
   '/images/news/card-4-desktop.png', null, false, false, null, 'approved'),

  ('canada-hosts-first-national-seminar', 'DOJO UPDATES', 'Canada Hosts First National Seminar', null, null, null, '2026-06-03',
   '/images/news/card-5-desktop.png', null, false, false,
   (select id from public.countries where slug = 'canada'), 'approved');

insert into public.events
  (slug, title, tags, location, date_range_label, start_date, end_date, address_line1, address_line2, poster_desktop, poster_mobile, show_on_mobile, featured, country_id, status)
values
  ('15th-chito-ryu-karate-soke-cup', '15th Chito Ryu Karate Soke Cup',
   array['International Meeting', 'Opening/Closing Ceremony', 'Competition', 'Dan Gradings', 'International Clinic', 'After Party'],
   'Gold Coast, Australia', '13th-15th August 2026', '2026-08-13', '2026-08-15',
   'Gold Coast Sport and Leisure Centre 296 Nerang Broadbeach Road,', 'Gold Coast, Australia',
   '/images/events/featured-poster-desktop.png', '/images/events/featured-poster-mobile.png', true, true,
   (select id from public.countries where slug = 'australia'), 'approved'),

  ('canada-dan-grading', 'Canada Dan Grading', array['Dan Grading'], 'Ontario, Canada', null, '2026-09-15', null,
   null, null, null, null, true, false,
   (select id from public.countries where slug = 'canada'), 'approved'),

  ('japan-dojo-visit', 'Japan Dojo Visit', array['Dojo Visit'], 'Kumamoto, Japan', null, '2026-10-16', null,
   null, null, null, null, true, false,
   (select id from public.countries where slug = 'japan'), 'approved'),

  ('australian-dan-grading', 'Australian Dan Grading', array['Dan Grading'], 'Sydney, Australia', null, '2026-11-17', null,
   null, null, null, null, true, false,
   (select id from public.countries where slug = 'australia'), 'approved'),

  ('european-instructors-seminar', 'European Instructors Seminar', array['Seminar'], 'Glasgow, Scotland', null, '2026-11-28', null,
   null, null, null, null, false, false,
   (select id from public.countries where slug = 'scotland'), 'approved');
