# Design Handover — Chito-Ryu International Website

**To:** Gil (UI/UX) · **From:** Ross · **Domain:** chitoryukaratedo.com
**Companion files:** `sitemap-and-routing.md` (full routes + data model), `wireframes.html` (low-fi layout skeletons)

This is a brief, not a spec — the sitemap and wireframe files tell you _what_ every page contains and _where data comes from_. This document is about _how it should feel_ and _why_, so you're designing from the same research Ross did rather than from a blank page.

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

- Full list of countries with their own standing ICKF-affiliated federation site (confirmed so far: Canada, USA)
- Map vs list-only for the World Directory (precedent sites use list-only — recommend not designing a map view yet)
- Locale routing (`/en`, `/ja`, `/de`, `/fr`) — likely deferred past v1
