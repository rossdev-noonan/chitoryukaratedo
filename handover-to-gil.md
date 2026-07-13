# Design Handover — Chito-Ryu International Website

**To:** Gil (UI/UX) · **From:** Ross · **Domain:** chitoryukaratedo.com
**Companion files:** `sitemap-and-routing.md` (full routes + data model), `wireframes.html` (low-fi layout skeletons)

This is a brief, not a spec — the sitemap and wireframe files tell you _what_ every page contains and _where data comes from_. This document is about _how it should feel_ and _why_, so you're designing from the same research Ross did rather than from a blank page.

---

## 0. Status — 10 July 2026: Home is built, here's what we learned

Your Figma file ("Chito Ryu Intl Website") landed and the **Home page is now built and live in the codebase** — desktop, tablet, and mobile frames, all pulled directly from your file via the Figma Dev Mode MCP (exact colors, fonts, spacing, not eyeballed). This section is feedback from actually building it — read it before starting the next page, it'll save rework.

**What matched cleanly and is now real:**
- Palette: primary red `#C1121F`, darker red `#9B0D18` for the CTA band, bronze/gold accent `#A1824A`, warm off-white background `#FAF9F7`.
- Type: `Noto Serif JP` for headings/display (handles the kanji cleanly), `Inter` for body/UI — both loaded and working.
- Sharp corners throughout, no border-radius anywhere — confirmed as an explicit direction, not a default.
- The mobile frame's hero is structurally different from desktop (image on top, content below on a plain background, not an overlay) — that's genuinely built now, not just scaled down. Good instinct, kept the mobile version from feeling like a squeezed desktop layout.

**Gaps worth resolving before the next pages go into comps:**

1. **The three-generation lineage timeline isn't in the Home design.** Section 4 of this brief (below, unchanged from the original ask) specifically called out "Home: lineage-first, O-Sensei → 2nd Soke → 3rd Soke before anything else" as the anchor of the whole site's credibility positioning, citing USA-ICKF's homepage as precedent. What's in the Figma file is a single "起源 / Origins" section about the founder and the meaning of Chi/To/Ryu — real and good content, but it's not the 3-generation dated timeline the brief asked for. Worth a deliberate call: was this cut intentionally, or is it still coming for Leadership/History instead of Home? Either is fine — just needs to be a decision, not a gap.
2. **The crest/concentric-circle signature element isn't used.** The delivered direction uses a kanji character (力必達) over a red enso brush-circle photo instead. That's a legitimate, good creative pivot — flagging only so it's a known departure from Section 3's seed, not an oversight.
3. **The header has a globe icon with no defined behavior.** Is this a stub for a future language switcher? If so it should probably be inert/hidden until locale routing is real (see the country/language research in Section 8 below) rather than a dead click target now.
4. **The dojo listing cards in your file show data we don't have**: phone numbers, a longer description per dojo, and a "Browse All 240 Locations" link. Our real `dojos` table has no phone field, and 240 is a placeholder number, not real. Two options: (a) add a `phone` column to the schema and drop the fabricated location count, or (b) simplify the card design to only the fields that are real (name, city, head instructor, contact email). Flagging now rather than after more pages are comped around the richer card.
5. **Only Home has been designed so far** (Figma pages panel shows "Home Page" and "Branding" — no comps yet for About, History, Leadership, Dojo Directory, Country page, Dojo/Teacher detail, News, Events, Resources, Contact). All of Section 4 below is still open.

---

## 0a. Status — 13 July 2026: Nav grouping proposal (your feedback: 9 items is too many)

You flagged the header nav is too crowded — currently 9 flat top-level items (About, History, Leadership, Dojo Directory, Teachers, News, Events, Resources, Contact), plus the language picker and "Join Us" CTA on top of that. Agreed — that's past the usual 5–7 top-level guideline for primary nav, and it'll only get more cramped once real translated labels (Cantonese, Tamil, etc. tend to run longer than English) are in there.

**Proposed grouping — 9 destinations down to 5 top-level slots, nothing removed, just organized:**

| Top-level label | Dropdown contains | Why grouped |
|---|---|---|
| **About** | About, History, Leadership | All three are "who we are" — federation identity/story content. Natural single cluster, matches how most federation/institutional sites group this. |
| **Community** | Dojo Directory, Teachers | Both are "find a person or place in the federation" — directory-style lookup pages, same user intent. |
| **News & Events** | News, Events | Already paired everywhere else on the site — the homepage section is literally titled "News & Events." This just formalizes that existing pairing in the nav. |
| **Resources** | Downloads, Examinations, Technical Documents, Rules & Guidelines | Resources already has these 4 real subpages (see footer). Today the nav links to a single hub page requiring an extra click; making it a direct dropdown saves a step for returning visitors and matches the footer's existing structure. |
| **Contact** | *(no dropdown, standalone)* | Single high-intent action — burying it in a dropdown adds friction for the one link most likely to convert. Keep it a flat, always-visible link. |

**Interaction pattern — reuse what's already built, don't invent a new one:**
- Same open/close behavior as the language picker: opens on click (and hover on desktop pointer devices), closes on Escape / outside click / selection. Consistent interaction language across the header.
- The parent label itself should stay a real link (e.g. "About" still navigates to `/about` on click) — the chevron/dropdown is an additional affordance for the sub-items, not a replacement for the parent page. Nobody should have to open a dropdown just to reach the page the label already names.

**Mobile:** the existing mobile drawer already lists nav items vertically — recommend each group becomes a collapsible accordion section (tap the group header to expand/collapse its sub-items), reusing the exact interaction already built for the homepage's "Meaning of CHI, TO, RYU" accordion rather than introducing a second accordion pattern.

**Open for you to confirm or push back on:**
1. Group labels — "Community" is my best guess for the Dojo Directory + Teachers pairing; open to a better name if you have one (e.g. "Directory," "Find Us").
2. Whether "Resources" should keep its own hub page at all once it's a direct dropdown, or whether the hub page becomes redundant — that's a content decision, not just a nav one, so flagging rather than deciding it here.
3. This is an information-architecture proposal, not a visual one — happy to adjust the grouping itself if you see a cleaner split once you're looking at it in context with real spacing/type.

---

## 1. The one-line brief

One official, worldwide home for Chito-Ryu — that reads as **quietly authoritative**, not like a martial-arts-gym marketing site. The audience includes senior instructors and federation officials in multiple countries, so credibility and restraint matter more than excitement.

**What this is not:** it's not a local dojo's lead-gen website (no "book a free trial" energy), it's not a generic sports-league template, and it's not a maximalist "warrior brand" look. Think closer to a cultural or diplomatic institution's site than a gym's.

---

## 2. Where the design should come from — grounded in the subject, not a template

Rather than starting from a generic "karate site" mood board, here's what's actually true about this subject that should shape the visual language:

- **Japan is the literal center, not a metaphor.** The Sohonbu (headquarters) is a real, physical dojo in Tsuboi, Kumamoto City. Leadership is a real three-generation lineage: O-Sensei (founder) → 2nd Generation Soke → current 3rd Generation Soke. This is genuinely sequential, dated, and traceable — a real timeline, not a decorative "01/02/03" device. It's honest to use a lineage timeline as a structural element on Home and Leadership.
- **The organization already has a crest with real meaning**, worth understanding even if you don't reuse it literally: a centre circle for the sun, an outer circle for the universe, five lines on each side representing hands — together meaning practitioners around the world joining hands in a pledge of peace. That's a genuinely distinctive visual seed (concentric circles, radiating lines) that's more specific to Chito-Ryu than any generic karate iconography (no need for crossed nunchaku or generic "fist" imagery).
- **Japanese/Romaji is a real content requirement, not a design flourish.** Every teacher and dojo name needs to show native Japanese script beside the approved Romaji spelling. Design the type system to handle CJK and Latin script side by side cleanly from the start — this will appear constantly (teacher cards, dojo listings, leadership bios).
- **What existing federation sites (Canada, US) actually do:** flat, plain, list-based directories with no unnecessary interaction — no map gimmicks, no heavy filtering. The credibility signal for this audience is clarity and restraint, not flashiness. Don't over-design the directory.

**Avoid the generic AI-design defaults:** no warm-cream-and-terracotta template look, no near-black-with-neon-accent look, no dense broadsheet/newspaper styling for its own sake. If in doubt, ask: would this look identical if this were a different martial art or a different federation? If yes, push further into what's specific to Chito-Ryu.

---

## 3. Suggested direction to explore (not a mandate — push back if you find something better)

**Palette seed** — drawn from real materials in this world rather than generic "karate red/black": indigo/navy (the color of an advanced practitioner's belt and the traditional gi trim), sumi ink black (calligraphy, kanji), a restrained vermillion/seal-red used sparingly as the single accent (the color of an official hanko/seal stamp — appropriate for "approved" states, official marks, CTAs), and a warm aged-paper neutral (washi, not cream-latte) for background warmth without falling into the templated cream-and-terracotta look.

**Type system** — a composed, confident serif or well-cut sans for Latin display type, paired with a CJK-capable face that renders Japanese cleanly at both display and small sizes (teacher/dojo names will show native + Romaji constantly — this pairing needs to be tested early, not bolted on later). Utility face for data-dense areas (directory listings, admin tables).

**Layout concept** — structured and calm, generous whitespace, clear hierarchy; hairline rules and quiet dividers rather than heavy cards everywhere, closer to how a museum or an institutional annual report organizes dense information than how a gym website sells a class.

**Possible signature element** — the concentric-circle crest motif reinterpreted subtly (e.g. a thin radiating-line device used as a section divider, or as a quiet background element behind the lineage timeline on Home/Leadership) — something that rewards a second look rather than announcing itself.

Do your own brainstorm/critique pass on this before building — the above is a starting seed from Ross's research, not a locked palette. Bring back a token system (4–6 named hex values, 2–3 type roles, one signature element) for review before full component build, per the usual process.

---

## 4. Page-by-page design intent

| Page                                             | Intent                                                                                                           | Notes                                                                                                                                                                                                                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Home**                                         | Lineage-first. Establish Japan/Soke authority before anything else, then guide to directory/news/leadership.     | Real precedent: USA-ICKF's homepage centers O-Sensei → 2nd Soke → 3rd Soke before any other content. Follow that instinct, don't bury it below a generic hero.                                                                                                                 |
| **Leadership / History**                         | The three-generation lineage as a real timeline (dates are genuine, not decorative).                             | This is the one place a numbered/dated sequence device is earned.                                                                                                                                                                                                              |
| **World Dojo Directory**                         | Calm, flat, scannable — closer to an institutional membership list than a "find a class near you" consumer tool. | See wireframe for two card types: **federation card** (countries with their own site — flag, name, rep, outbound link) vs **dojo card** (countries hosted directly here). These need visually distinct but equally credible treatments — neither should look like a downgrade. |
| **Country page**                                 | Branches on `has_own_federation_site`. See `wireframes.html` "Country Page" tab — toggle between both modes.     | Don't let the "linked out" mode feel like an empty/lesser page — frame it as "this country's federation" with full presence, just without a hosted grid.                                                                                                                       |
| **Teacher Registry / Detail**                    | Japanese name + Romaji is co-equal, not a secondary caption.                                                     | Test your type pairing here first — it's the highest-frequency CJK/Latin pairing on the site.                                                                                                                                                                                  |
| **News / Events**                                | Straightforward editorial list/detail — no need to over-design.                                                  | Sanity-driven, standard pattern.                                                                                                                                                                                                                                               |
| **Admin screens**                                | Plain, clear, low-personality. Status labels (pending/approved/rejected) must be unambiguous at a glance.        | This is a workflow tool for Sohonbu/country/dojo admins, not a showcase — prioritize clarity over brand expression here.                                                                                                                                                       |
| **Resources (Soke Cup, Bogu Kumite, downloads)** | Documentation-style, calm, easy to scan for rules/forms.                                                         |                                                                                                                                                                                                                                                                                |

---

## 5. Content and copy rules (apply these while designing, not just when writing final copy)

- Never imply Sensei Noonan (or any single figure other than Soke) personally teaches or represents every dojo — this is a federation site, not one person's brand.
- Only approved countries, dojos, and verified teachers ever appear as "official" — design empty/pending states honestly (an unapproved submission should never visually resemble a published listing).
- No marketing clichés, no exclamation marks, Australian/international English register — steady and factual, not promotional. This matches the "quietly authoritative" brief above, not just a copy rule.
- Rank evidence and any private admin data must be visually and structurally distinct from public content — there should be no ambiguity, even in a screenshot, about what's public vs internal.

---

## 6. Technical constraints (so your designs are buildable as specified)

- **Stack:** Next.js App Router, Tailwind CSS, shadcn/ui components, TypeScript. Design within shadcn's component vocabulary where practical — it speeds handoff.
- **Content split:** Sanity owns editable page copy (Home, About, History, Leadership, News, Events, Resources copy). Supabase owns operational records (countries, dojos, teachers, approvals). Don't design a page that requires editing the same data in two places.
- **Mobile-first for the directory and contact pages specifically** — approval doc calls this out explicitly as a launch gate.
- **Accessibility floor:** readable contrast, visible keyboard focus, real form labels, no text-in-images, headings in real hierarchy — build this in from the wireframe stage, not as a post-launch pass.
- **No shop, video, or paid member UI in this pass** — don't design placeholder states for these; they're out of scope for v1 entirely.

---

## 7. What to deliver back

1. Token system (palette + type + layout concept + signature element) for a quick review pass before full comps — one iteration cycle to catch direction issues early.
2. Wireframe-to-comp pass for the pages in Section 4, using `wireframes.html` as the layout skeleton (you're free to change layout, that file is structure not final design).
3. Mobile comps for Dojo Directory, Country page (both modes), and Contact at minimum.
4. Flag anything in the sitemap/data model that constrains a design idea you have — better to surface that now than after Sanity/Supabase schemas are locked.

---

## 8. Open items still pending Mike's confirmation (don't design final content around these yet)

- **Updated 10 July 2026** — Ross has researched confirmed/referenced ICKF ties and primary languages per country. This is research input, not yet Mike-confirmed as the final "has its own federation site" list — that confirmation is still the actual blocker before the World Directory data model is locked:

  | Country | Primary language(s) |
  | --- | --- |
  | Australia | English |
  | Canada | English (French in Quebec) |
  | Hong Kong | Cantonese, English |
  | Ireland | English (Irish also official) |
  | Jamaica | English |
  | Japan (Sohonbu) | Japanese |
  | Norway | Norwegian |
  | Scotland | English |
  | Singapore | English, Mandarin, Malay, Tamil |
  | United States | English |
  | UK | English |
  | Finland | Finnish, Swedish |
  | Bangladesh | Bengali |

  Sources: ICKF Canada (About, Members), USA-ICKF (national + NJ/FL/KY chapters), ICKFA Sunshine Coast Branch, ICKFA Beginner Manual, Chitō-ryū Wikipedia, ICRF legacy site.

  **What this means for design, right now:** still recommend deferring full locale routing (`/en`, `/ja`, etc.) past v1, per the original call — 11 of 13 countries are English-primary or English-fluent for federation purposes, so English-only content is a reasonable v1. But two technical notes worth carrying forward even without building locale routing yet: (1) `Noto Serif JP` only covers Latin + Japanese glyphs — it does **not** render Chinese (Cantonese/Mandarin), Tamil, or Bengali script, so if any of those ever need native-script display (e.g. a Hong Kong or Singapore dojo's name, matching how Japanese teacher names already get native + Romaji), the type system needs a broader CJK/Indic-capable fallback font chosen deliberately, not discovered as a bug later. (2) This list is also the input Mike needs to confirm which countries get a **federation card** (own site, outbound link) vs a **hosted dojo grid** — right now only Canada and USA are confirmed as having their own standing site; the other 11 are unconfirmed either way.

- Map vs list-only for the World Directory (precedent sites use list-only — recommend not designing a map view yet; Home's "Find a Dojo" section currently ships with a static illustrative world-map image, not an interactive map — see Section 0)
- Locale routing (`/en`, `/ja`, `/de`, `/fr`) — likely deferred past v1, see language table above

---

## 9. Data fields actually available (design to these, not to imagined ones)

Real schema, as built. If a comp needs a field not listed here, flag it — adding a column is easy now, expensive after a page is fully comped around data that doesn't exist (see Section 0, point 4, for a real example of this happening already).

| Entity | Fields available | Notably absent |
| --- | --- | --- |
| **Country** | name, slug, has_own_federation_site, federation_site_url, federation_name, representative | — |
| **Dojo** | name, slug, city, head_instructor, contact_email, country | phone number, street address, description, photo |
| **Teacher** | name (native + kana + romaji), rank, dojo, country, photo (**storage bucket exists, no upload UI built yet** — safe to design a photo treatment for teacher cards/detail now, the backend is ready) | bio/description text, certifications list beyond rank |
| **News/Events** | Not yet real — Sanity (the CMS) hasn't actually been provisioned yet (empty project, not just unconfigured). Home's News & Events cards currently use hardcoded placeholder content matching your file. Design these as normal Sanity-driven content; they'll get wired to live data once Sanity is set up. |

**Icon library:** `lucide-react` — a large, consistent icon set, but it does **not** include brand icons (Facebook/Instagram/YouTube aren't in it). Those got hand-built as inline SVGs for the footer. If your comps use other brand/social icons, flag them — same treatment needed.

**Fonts already locked in:** `Noto Serif JP` (display/headings) + `Inter` (body/UI), loaded via `next/font/google`. If a future page's comp wants a different pairing, raise it early — changing the font-loading setup is a small technical change but a real visual-identity decision, better made deliberately than by drift across pages.
