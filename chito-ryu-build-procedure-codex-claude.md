# Chito-Ryu International Website Build Procedure

Use this file as the operating procedure for Codex, Claude Code, or another coding agent. It is written as a build instruction, not as a proposal.

```yaml
project:
  name: "Chito-Ryu International Website"
  domain: "chitoryukaratedo.com"
  owner: "Sensei Michael Noonan / ICKF"
  build_lead: "Ross"
  seo_lead: "Adrian"
  uiux_lead: "Gil"
  primary_goal: >
    Build the official international Chito-Ryu website with public pages,
    approved dojo directory, verified teacher registry, Japanese/Romaji name
    handling, secure admin access, approval workflow, SEO-ready structure, and
    launch controls.

non_negotiables:
  - "Do not include n8n in the first release."
  - "Do not build shop, payments, videos, or paid member portal in the first release."
  - "Do not allow country admins or dojo admins to publish public records directly."
  - "Do not expose private rank evidence or internal files publicly."
  - "Do not duplicate records between Sanity and Supabase."
  - "Do not launch without testing access rules, backups, restore, SEO, and mobile layout."

stack:
  frontend:
    framework: "Next.js App Router"
    language: "TypeScript"
    ui: "React"
    styling: "Tailwind CSS"
    components: "shadcn/ui"
    validation: "Zod"
  hosting:
    production: "Vercel"
    previews: "Vercel Preview Deployments"
    repository: "GitHub"
  content:
    cms: "Sanity CMS"
    use_for:
      - "home page content"
      - "about"
      - "history"
      - "leadership"
      - "news"
      - "events"
      - "rules/resources"
    webhook_required: true
    webhook_rule: "Sanity publish must trigger Next.js revalidation."
  database:
    provider: "Supabase Postgres"
    use_for:
      - "countries"
      - "dojos"
      - "teachers"
      - "users"
      - "roles"
      - "approvals"
      - "rank evidence records"
      - "audit logs"
    rls_required: true
  auth:
    provider: "Supabase Auth"
    rules:
      - "Invite-only admin access"
      - "MFA required for Sohonbu Admin and Country Admin if available"
      - "No open admin signup"
  storage:
    provider: "Supabase Storage"
    buckets:
      - name: "rank-evidence-private"
        public: false
      - name: "teacher-photos-approved"
        public: true
      - name: "site-assets"
        public: true
  email:
    provider: "Resend"
    templates: "React Email"
    required_dns:
      - "SPF"
      - "DKIM"
      - "DMARC"
  japanese_romaji:
    romanization_standard: "Hepburn Romaji"
    helper_library: "Wanakana"
    approval_required: true
  security:
    bot_protection: "Cloudflare Turnstile"
    rate_limiting: "Upstash Redis or Vercel firewall/rate limits"
    monitoring: "Sentry"
    analytics: "Vercel Analytics and GA4"
  seo:
    tools:
      - "Google Search Console"
      - "GA4"
      - "sitemap.xml generator"
      - "robots.txt"
      - "schema.org JSON-LD"
  testing:
    unit: "Vitest"
    component: "Testing Library"
    e2e: "Playwright"
    linting: "ESLint"
    formatting: "Prettier"

source_of_truth:
  sanity:
    owns:
      - "marketing/public page content"
      - "history page copy"
      - "leadership page copy"
      - "news and events content"
      - "rules and resource page copy"
  supabase:
    owns:
      - "countries"
      - "dojos"
      - "teachers"
      - "rank verification"
      - "admin users"
      - "approval states"
      - "audit logs"
  rule: "Never edit the same operational record in Sanity and Supabase."

roles:
  sohonbu_admin:
    scope: "global"
    can:
      - "approve countries"
      - "approve dojos"
      - "approve teachers"
      - "approve rank/license records"
      - "publish official content"
      - "manage users"
    cannot:
      - "delete audit logs"
  country_admin:
    scope: "one country"
    can:
      - "submit country updates"
      - "submit dojo updates in assigned country"
      - "submit teacher corrections in assigned country"
    cannot:
      - "publish public records directly"
      - "edit another country"
      - "approve own rank changes"
  dojo_admin:
    scope: "one dojo"
    can:
      - "submit own dojo updates"
      - "submit teacher corrections for own dojo"
    cannot:
      - "publish public records directly"
      - "approve ranks"
      - "edit another dojo"
  teacher:
    scope: "own profile"
    can:
      - "view own listed details"
      - "request corrections"
    cannot:
      - "self-approve rank, license, or public profile changes"
  public_user:
    scope: "public"
    can:
      - "browse public pages"
      - "search approved dojos"
      - "view approved teacher listings"
    cannot:
      - "edit records"

routes:
  public:
    - path: "/"
      page: "Home"
    - path: "/about"
      page: "About Chito-Ryu"
    - path: "/history"
      page: "History"
    - path: "/leadership"
      page: "Leadership"
    - path: "/dojo-directory"
      page: "World Dojo Directory"
    - path: "/dojo-directory/[country]"
      page: "Country Directory"
    - path: "/dojo/[slug]"
      page: "Dojo Detail"
    - path: "/teachers"
      page: "Teacher Registry"
    - path: "/teachers/[slug]"
      page: "Teacher Detail"
    - path: "/news"
      page: "News"
    - path: "/news/[slug]"
      page: "News Detail"
    - path: "/events"
      page: "Events"
    - path: "/events/[slug]"
      page: "Event Detail"
    - path: "/resources"
      page: "Resources"
    - path: "/resources/soke-cup-rules"
      page: "Soke Cup Rules"
    - path: "/resources/bogu-kumite"
      page: "Bogu Kumite"
    - path: "/resources/downloads"
      page: "Downloads"
    - path: "/sohonbu-experience"
      page: "Sohonbu Experience"
    - path: "/contact"
      page: "Contact"
    - path: "/privacy"
      page: "Privacy"
    - path: "/terms"
      page: "Terms"
  admin:
    - "/login"
    - "/accept-invite"
    - "/reset-password"
    - "/admin"
    - "/admin/dojos"
    - "/admin/teachers"
    - "/admin/approvals"
    - "/admin/news"
    - "/admin/events"
    - "/admin/resources"
    - "/admin/users"
    - "/admin/settings"
  api:
    - "/api/contact"
    - "/api/revalidate"
    - "/api/v1/dojos"
    - "/api/v1/teachers"
    - "/api/admin/dojos"
    - "/api/admin/teachers"
    - "/api/admin/approvals"
    - "/api/admin/invites"

phase_plan:
  - phase: 0
    name: "Approval and Access"
    timeline: "2-3 days"
    owner: "Ross + Mike"
    goals:
      - "Confirm final build scope"
      - "Confirm domain registrar access"
      - "Confirm DNS access"
      - "Confirm official country/dojo/teacher source files"
      - "Confirm rank verifier"
      - "Confirm Adrian and Gil coordination path"
    deliverables:
      - "Access checklist"
      - "Content source checklist"
      - "Domain/DNS plan"
    exit_criteria:
      - "Domain access confirmed"
      - "Build scope approved"
      - "Initial source data received or owner assigned"

  - phase: 1
    name: "Project Foundation"
    timeline: "1 week"
    owner: "Ross"
    tasks:
      - "Create GitHub repository"
      - "Create Next.js App Router project"
      - "Install TypeScript, Tailwind, shadcn/ui, Zod, ESLint, Prettier"
      - "Connect Vercel project"
      - "Create Sanity project and schemas"
      - "Create Supabase project"
      - "Add environment variable template"
      - "Add Sentry and Vercel Analytics"
      - "Add base layout, typography, navigation shell, footer"
    deliverables:
      - "Running local app"
      - "Vercel preview deployment"
      - "Base public shell"
      - "Environment setup document"
    exit_criteria:
      - "npm build passes"
      - "Vercel preview works"
      - "Sanity and Supabase connections verified"

  - phase: 2
    name: "Public Website Structure"
    timeline: "1-2 weeks"
    owner: "Ross + Gil"
    tasks:
      - "Build homepage"
      - "Build About page"
      - "Build History page"
      - "Build Leadership page"
      - "Build Resources landing page"
      - "Build Soke Cup Rules page"
      - "Build Bogu Kumite page"
      - "Build Sohonbu Experience page"
      - "Build Contact page"
      - "Create Sanity schemas for public pages"
      - "Create Sanity revalidation webhook"
    deliverables:
      - "Public pages connected to Sanity"
      - "Preview links for Mike and Gil"
    exit_criteria:
      - "No placeholder navigation routes"
      - "Sanity publish updates live preview through revalidation"

  - phase: 3
    name: "Directory and Data Model"
    timeline: "2 weeks"
    owner: "Ross"
    tasks:
      - "Create Supabase tables: countries, dojos, teachers, approvals, audit_logs, rank_evidence"
      - "Create database indexes for search and slugs"
      - "Enable Row Level Security on all exposed tables"
      - "Create seed/import template for country and dojo data"
      - "Build /dojo-directory"
      - "Build /dojo-directory/[country]"
      - "Build /dojo/[slug]"
      - "Build /teachers"
      - "Build /teachers/[slug]"
      - "Add basic search and filters"
    deliverables:
      - "Working public directory"
      - "Teacher registry"
      - "Data import template"
    exit_criteria:
      - "Only approved records display publicly"
      - "Unapproved records remain hidden"

  - phase: 4
    name: "Admin and Approval Workflow"
    timeline: "2 weeks"
    owner: "Ross"
    tasks:
      - "Set up Supabase Auth"
      - "Build invite-only login"
      - "Build admin dashboard"
      - "Build country admin screens"
      - "Build dojo admin screens"
      - "Build approval queue"
      - "Build audit log writes for important changes"
      - "Build private rank evidence upload"
      - "Test access by role and scope"
    deliverables:
      - "Admin dashboard"
      - "Approval flow"
      - "Scoped access rules"
    exit_criteria:
      - "Country admin cannot publish directly"
      - "Dojo admin cannot edit another dojo"
      - "Audit log records actions"

  - phase: 5
    name: "Japanese and Romaji Search"
    timeline: "1 week"
    owner: "Ross"
    tasks:
      - "Add fields: name_native, name_kana, name_romaji_auto, name_romaji_final"
      - "Add Wanakana helper for kana to Romaji suggestion"
      - "Require manual approval before final public display"
      - "Test Japanese characters in public pages and admin forms"
      - "Add search support for Japanese and Romaji fields"
    deliverables:
      - "Japanese / Romaji teacher name workflow"
      - "Searchable teacher and dojo names"
    exit_criteria:
      - "Japanese text renders correctly"
      - "Final Romaji display can be manually approved"

  - phase: 6
    name: "SEO and UI/UX Lock"
    timeline: "1 week"
    owner: "Ross + Adrian + Gil"
    tasks:
      - "Adrian reviews route structure and metadata"
      - "Add page titles and meta descriptions"
      - "Add schema.org JSON-LD"
      - "Add sitemap.xml"
      - "Add robots.txt"
      - "Add canonical URLs"
      - "Add hreflang only where translations are approved"
      - "Gil reviews UI consistency and mobile layout"
    deliverables:
      - "SEO-ready site"
      - "UI/UX review pass"
    exit_criteria:
      - "All public pages have metadata"
      - "Sitemap works"
      - "Mobile layout approved"

  - phase: 7
    name: "QA, Security, and Training"
    timeline: "1 week"
    owner: "Ross"
    tasks:
      - "Add Cloudflare Turnstile to public forms"
      - "Add rate limiting to login, invite, contact, and search endpoints"
      - "Run Playwright tests"
      - "Run accessibility checks"
      - "Run performance checks"
      - "Test Supabase backups and restore process"
      - "Write admin guide"
      - "Record short admin walkthrough"
    deliverables:
      - "QA report"
      - "Admin guide"
      - "Launch checklist"
    exit_criteria:
      - "Critical bugs closed"
      - "Restore test completed"
      - "Admin guide ready"

  - phase: 8
    name: "Launch"
    timeline: "2-3 days"
    owner: "Ross"
    tasks:
      - "Prepare production environment variables"
      - "Run final build"
      - "Check DNS"
      - "Point domain to Vercel"
      - "Submit sitemap to Google Search Console"
      - "Monitor errors and forms"
      - "Fix launch defects"
    deliverables:
      - "Live website"
      - "Submitted sitemap"
      - "Post-launch issue log"
    exit_criteria:
      - "Production site live"
      - "No critical errors in monitoring"
      - "Mike can access approved admin account"

future_phases:
  shop:
    include_only_after:
      - "seller rules confirmed"
      - "supported countries confirmed"
      - "refund policy confirmed"
      - "Sohonbu fee confirmed"
    likely_stack:
      payments: "Stripe Connect"
  video_library:
    include_only_after:
      - "video owner confirmed"
      - "upload rights confirmed"
      - "view access rules confirmed"
      - "watermark/sharing policy confirmed"
    likely_stack:
      video: "Cloudflare Stream or Mux"

acceptance_tests:
  public_pages:
    - "All menu items load without 404."
    - "All public pages have title and meta description."
    - "Sitemap includes public pages, countries, dojos, teachers, news, and events."
  directory:
    - "Only approved dojos appear publicly."
    - "Pending dojos do not appear publicly."
    - "Country pages filter correctly."
    - "Dojo slugs are unique."
  teachers:
    - "Only approved teachers appear publicly."
    - "Japanese and Romaji display correctly."
    - "Rank evidence is not public."
  admin:
    - "Sohonbu admin can approve records."
    - "Country admin cannot publish directly."
    - "Dojo admin cannot edit another dojo."
    - "Audit log records changes."
  security:
    - "RLS policies enabled."
    - "Private buckets are not public."
    - "Rate limits active."
    - "Bot protection active on public forms."
  launch:
    - "Vercel production build passes."
    - "Search Console sitemap submitted."
    - "Backup restore test completed."
    - "Admin training delivered."

agent_rules:
  codex_claude_code:
    - "Before coding, inspect existing files and package versions."
    - "Do not invent routes outside this procedure unless asked."
    - "Do not introduce n8n or external automation."
    - "Do not add payments or video features in first release."
    - "Use TypeScript strict types."
    - "Use Zod validation on form and API input."
    - "Use server-side checks for permissions."
    - "Use Supabase RLS for database-level protection."
    - "Commit changes phase-by-phase with clear messages."
    - "Run lint, typecheck, and build before handoff."
    - "Create or update tests for each workflow."
```
