# Chito-Ryu International — Full Sitemap & App Router Structure

**Domain:** chitoryukaratedo.com · **Build lead:** Ross · **SEO:** Adrian · **UI/UX:** Gil
**Source reconciled from:** build-procedure `.md`, developer build doc (PDF), Mike approval doc (PDF)

---

## 0. Reconciliation notes (read this first)

The three source documents don't fully agree on route shape. This document takes the **build-procedure `.md`** as the source of truth (it's the operating spec for the coding agent), and resolves the conflicts as follows:

| Conflict        | Approval doc (Mike-facing) said    | Build procedure / tech doc said                                                                        | Used here                                             |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Dojo detail URL | `/dojo-directory/[country]/[dojo]` | `/dojo/[slug]`                                                                                         | `/dojo/[slug]` (flat, unique slug)                    |
| Rules page      | separate `/rules`                  | folded into `/resources/*`                                                                             | `/resources/soke-cup-rules`, `/resources/bogu-kumite` |
| News detail     | `/news/[article]`                  | `/news/[slug]`                                                                                         | `/news/[slug]`                                        |
| Locale routes   | not mentioned                      | `/en/*`, `/ja/*`, `/de/*`, `/fr/*` listed in tech doc route plan, but **not** in Phase 1–8 build tasks | **Deferred** — see note below                         |

**On locale routes:** the tech doc lists `/en/*`, `/ja/*`, `/de/*`, `/fr/*` in the route plan table, but no phase in the build procedure actually implements them, and Phase 6 explicitly says _"Add hreflang only where translations are approved."_ Recommendation: do **not** build locale sub-routing in v1. Structure content in Sanity so locale support can be added later (e.g. via `[locale]` segment) without a route rewrite. Flag this to Mike as an open decision, not an assumption.

**Non-negotiables carried through this sitemap** (from build-procedure): no shop/payments/video/paid portal in v1, no n8n, no country/dojo self-publishing, no public rank evidence.

**New finding — hub-and-spoke country model (added after researching Canada/US federation sites):**
ICKF Canada (`ickf.ca`) and USA-ICKF (`usa-ickf.com`) already run their own independently maintained federation sites with their own dojo listings ("Members" / "Locations" pages, grouped by province/state). Re-hosting full dojo records for these countries in Supabase would duplicate a source of truth that already has a live, local owner — the same problem the build spec already bans between Sanity and Supabase, just one level up. Recommended model:

- **Countries with their own standing federation site** (confirmed cases so far: Canada, USA) → country page shows a **federation card** (flag, federation name, country representative, short description) plus an outbound link to their official site. No full dojo grid hosted here.
- **Countries without their own federation site** → country page hosts the full approved dojo directory, as originally wireframed.

This needs one small addition to the Phase 3 data model on the `countries` table:

```
has_own_federation_site: boolean
federation_site_url: string | null
```

`/dojo-directory/[country]/page.tsx` branches its render on this flag. **Open item:** Mike needs to confirm the full list of countries that already run their own ICKF-affiliated federation site before this is locked — do not infer this from search results, since several countries (notably Canada and the US) have unaffiliated organizations using near-identical Chito-Ryu names that are _not_ part of ICKF/Soke's lineage. Country/dojo source data must come from Mike/Sohonbu directly, not from general web research.

---

## 1. Full Public Sitemap

```
/                                   Home
/about                              About Chito-Ryu
/history                            History
/leadership                         Leadership (Soke line, current leadership)
/dojo-directory                     World Dojo Directory (landing, country list, search)
/dojo-directory/[country]           Country Directory (approved dojos in one country)
/dojo/[slug]                        Dojo Detail
/teachers                           Teacher Registry (approved senior teachers)
/teachers/[slug]                    Teacher Detail
/news                               News listing
/news/[slug]                        News article
/events                             Events listing (seminars, Soke Cup, travel schedule)
/events/[slug]                      Event detail
/resources                          Resources landing
/resources/soke-cup-rules           Soke Cup Rules
/resources/bogu-kumite              Bogu Kumite
/resources/downloads                Downloads (forms, documents)
/sohonbu-experience                 Training in Japan info
/contact                            Contact / official enquiry
/privacy                            Privacy policy
/terms                              Terms
```

## 2. Auth Routes

```
/login                              Invite-only admin login
/accept-invite                       Accept invite (sets password / MFA enrolment)
/reset-password                      Password reset
```

## 3. Admin Routes (behind auth + role check, not in main nav — footer/direct link only per approval doc)

```
/admin                              Dashboard
/admin/dojos                        Dojo submissions & records
/admin/teachers                     Teacher records
/admin/approvals                    Approval queue (Sohonbu Admin only for final approve)
/admin/news                          News management
/admin/events                        Events management
/admin/resources                     Resources management
/admin/users                         User & role management (Sohonbu Admin only)
/admin/settings                      Settings
```

## 4. API Routes

```
/api/contact                        Contact form submission (Turnstile + rate limited)
/api/revalidate                     Sanity webhook → Next.js ISR revalidation
/api/v1/dojos                       Public read API (approved dojos only)
/api/v1/teachers                     Public read API (approved teachers only)
/api/admin/dojos                     Admin CRUD (server-side role check + RLS)
/api/admin/teachers                  Admin CRUD
/api/admin/approvals                 Approve/reject actions, writes audit log
/api/admin/invites                   Admin invite creation (Sohonbu Admin only)
```

## 5. Role → Route Access Matrix

| Route group                  | Public | Teacher                    | Dojo Admin    | Country Admin    | Sohonbu Admin |
| ---------------------------- | ------ | -------------------------- | ------------- | ---------------- | ------------- |
| Public pages                 | ✅     | ✅                         | ✅            | ✅               | ✅            |
| `/admin/dojos` (submit)      | ❌     | ❌                         | own dojo only | own country only | ✅            |
| `/admin/teachers` (submit)   | ❌     | own profile (request only) | own dojo only | own country only | ✅            |
| `/admin/approvals` (approve) | ❌     | ❌                         | ❌            | ❌               | ✅ only       |
| `/admin/users`               | ❌     | ❌                         | ❌            | ❌               | ✅ only       |
| `/admin/settings`            | ❌     | ❌                         | ❌            | ❌               | ✅ only       |

Enforcement is **server-side** (middleware + per-request role/scope check) backed by Supabase RLS — never client-side only, per non-negotiables.

---

## 6. Next.js App Router File Tree

```
app/
├── layout.tsx                          # Root layout (fonts, global providers, GA4)
├── globals.css
├── middleware.ts                       # Auth + role/scope guard for /admin/*
│
├── (public)/                           # Route group — shares public layout, no URL segment
│   ├── layout.tsx                      # Public nav + footer
│   ├── page.tsx                        # /
│   ├── about/
│   │   └── page.tsx                    # /about
│   ├── history/
│   │   └── page.tsx                    # /history
│   ├── leadership/
│   │   └── page.tsx                    # /leadership
│   ├── dojo-directory/
│   │   ├── page.tsx                    # /dojo-directory (world landing — shows federation cards + hosted-country cards)
│   │   └── [country]/
│   │       └── page.tsx                # /dojo-directory/[country] — branches: federation card+outbound link, OR full dojo grid
│   ├── dojo/
│   │   └── [slug]/
│   │       └── page.tsx                # /dojo/[slug]
│   ├── teachers/
│   │   ├── page.tsx                    # /teachers
│   │   └── [slug]/
│   │       └── page.tsx                # /teachers/[slug]
│   ├── news/
│   │   ├── page.tsx                    # /news
│   │   └── [slug]/
│   │       └── page.tsx                # /news/[slug]
│   ├── events/
│   │   ├── page.tsx                    # /events
│   │   └── [slug]/
│   │       └── page.tsx                # /events/[slug]
│   ├── resources/
│   │   ├── page.tsx                    # /resources
│   │   ├── soke-cup-rules/
│   │   │   └── page.tsx
│   │   ├── bogu-kumite/
│   │   │   └── page.tsx
│   │   └── downloads/
│   │       └── page.tsx
│   ├── sohonbu-experience/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
│
├── (auth)/                             # Route group — minimal centered layout, no main nav
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── accept-invite/
│   │   └── page.tsx
│   └── reset-password/
│       └── page.tsx
│
├── admin/                              # Real URL segment /admin/* — guarded by middleware.ts
│   ├── layout.tsx                      # Admin shell: sidebar, role-aware nav
│   ├── page.tsx                        # /admin (dashboard)
│   ├── dojos/
│   │   └── page.tsx
│   ├── teachers/
│   │   └── page.tsx
│   ├── approvals/
│   │   └── page.tsx
│   ├── news/
│   │   └── page.tsx
│   ├── events/
│   │   └── page.tsx
│   ├── resources/
│   │   └── page.tsx
│   ├── users/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
├── api/
│   ├── contact/route.ts
│   ├── revalidate/route.ts
│   ├── v1/
│   │   ├── dojos/route.ts
│   │   └── teachers/route.ts
│   └── admin/
│       ├── dojos/route.ts
│       ├── teachers/route.ts
│       ├── approvals/route.ts
│       └── invites/route.ts
│
├── sitemap.ts                          # Dynamic sitemap.xml generator
├── robots.ts                           # robots.txt
└── not-found.tsx

lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── rls-policies.sql
├── sanity/
│   ├── client.ts
│   └── schemas/
│       ├── homePage.ts
│       ├── aboutPage.ts
│       ├── historyPage.ts
│       ├── leadershipPage.ts
│       ├── newsPost.ts
│       ├── eventPost.ts
│       └── resourcePage.ts
├── auth/
│   ├── roles.ts                        # role + scope check helpers
│   └── session.ts
├── validation/
│   └── schemas.ts                      # Zod schemas: dojo, teacher, contact, invite
└── wanakana/
    └── romaji.ts                       # kana → romaji suggestion helper

components/
├── public/
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── DojoCard.tsx
│   ├── FederationCard.tsx               # Flag, federation name, rep, outbound link — used when has_own_federation_site = true
│   ├── TeacherCard.tsx
│   ├── CountryFilter.tsx
│   └── SearchBox.tsx
├── admin/
│   ├── ApprovalQueueTable.tsx
│   ├── StatusBadge.tsx
│   ├── AuditLogTable.tsx
│   └── RankEvidenceUpload.tsx
└── ui/                                  # shadcn/ui components

emails/                                  # React Email templates (Resend)
├── InviteEmail.tsx
├── ApprovalNoticeEmail.tsx
└── ContactConfirmationEmail.tsx
```

**Why route groups:** `(public)` and `(auth)` share the App Router's ability to apply different layouts without changing the URL. `admin` is a real folder (not a group) because `/admin` must appear in the actual URL and is where `middleware.ts` applies its guard.

---

## 7. Data → Page Mapping (quick reference for Gil)

| Page              | Data source              | Notes for wireframe                                                                                                                            |
| ----------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Home              | Sanity                   | Hero, leadership teaser, dojo-finder CTA, latest news/events                                                                                   |
| Dojo Directory    | Supabase (approved only) | Country filter, search, dojo cards, map/list toggle                                                                                            |
| Country Directory | Supabase                 | **Two render modes** — federation card + outbound link (`has_own_federation_site = true`, e.g. Canada, USA) OR filtered dojo cards (`= false`) |
| Dojo Detail       | Supabase                 | Address, instructor, contact, approved badge, no private data                                                                                  |
| Teacher Registry  | Supabase (approved only) | Cards: name (Japanese/Romaji), rank, dojo, country                                                                                             |
| Teacher Detail    | Supabase                 | Full profile, rank/license (verified), photo if approved                                                                                       |
| News / Events     | Sanity                   | Standard list + detail pattern                                                                                                                 |
| Admin Dashboard   | Supabase                 | Pending approvals count, recent activity                                                                                                       |
| Approval Queue    | Supabase                 | Status badges: pending / approved / rejected                                                                                                   |

---

## 8. Research findings — existing ICKF-affiliated national sites

Checked ICKF Canada (`ickf.ca`) and USA-ICKF (`usa-ickf.com`) as real-world precedent, since they're the same federation lineage as this build (loyal to Soke/ICKF, not the unaffiliated splinter groups that share the Chito-Ryu name in both countries).

| Site         | Pattern observed                                                                                                                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ickf.ca      | Nav: Home, About, History, **Members**, Soke Cup, Gallery, Board, Events, Contact. Members page = pick a province, flat list per province (instructor, dojo, address, phone, email, site link). No search/filter/map. |
| usa-ickf.com | Nav includes **Locations** → state pages (NJ, FL, KY). Same flat pattern. Homepage centers lineage imagery (O-Sensei → 2nd Gen Soke → 3rd Gen Soke) above anything else.                                              |

Takeaways folded into this doc: (1) real federation sites use simple flat grouped lists, not heavy search/map UI — supports keeping Phase 3 scope lean; (2) lineage-first homepage is the established convention, not a stylistic choice — reinforces "Japan as center" for Home/Leadership; (3) hub-and-spoke model above, since both these countries already run their own directory.

## 9. Open items to confirm with Mike / Gil / Adrian before wireframe lock

- Which countries already have their own standing ICKF-affiliated federation site (confirmed so far: Canada, USA) — **must come from Mike, not web research**, since unaffiliated same-name organizations exist in both countries
- Locale routing (`/en`, `/ja`, `/de`, `/fr`) — build now or defer? (Recommend: defer)
- Map view vs list-only for Dojo Directory (approval doc says "map/list option if practical") — real precedent sites use list-only
- Whether admin login link sits in footer or is a fully hidden direct URL only
