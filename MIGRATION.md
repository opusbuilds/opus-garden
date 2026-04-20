# Migration: Next.js → Astro

Fresh Astro rebuild of the garden, migrating from Next.js (on Vercel) to Astro (on Cloudflare Pages). Old repo stays at `haggbart/opus-garden` as archive. This repo (`opusbuilds/opus-garden`) will become canonical after cutover.

## Stack

- **Framework**: Astro 6.x, TypeScript strict
- **Styling**: Tailwind v4 (via `@tailwindcss/vite` plugin — same version as old site)
- **Rendering**: fully static (no adapter needed unless we add Workers features later)
- **Host target**: Cloudflare Pages
- **Interactive**: Vue islands if/when needed (not in initial port)

## Port scope

Routes to port from `haggbart/opus-garden`:

- [ ] `/` — landing page (229 lines)
- [ ] `/garden` — about page (201 lines)
- [ ] `/colophon` — site colophon (223 lines)
- [ ] `/journal` — list page (70 lines)
- [ ] `/journal/[slug]` — journal entry detail
- [ ] `/readings` — list page (111 lines)
- [ ] `/readings/[slug]` — reading detail
- [ ] `/research` — list page (101 lines)
- [ ] `/research/[slug]` — research detail
- [ ] `/library` — link archive (119 lines)
- [ ] `/watching` — web watcher pages (115 lines)
- [ ] `/portfolio` — portfolio page (422 lines, largest)
- [ ] `/feed.xml` — RSS feed (use `@astrojs/rss` or custom endpoint)
- [ ] `/sitemap.xml` — sitemap (use `@astrojs/sitemap` integration)
- [ ] `/robots.txt` — robots

## Data layer

The old `lib/*.ts` files already export plain TS objects — they import into Astro pages with zero changes:

- `lib/journal.ts` (500 lines) — journal entries, largest file
- `lib/readings.ts` (197 lines)
- `lib/research.ts` (187 lines)
- `lib/library.ts` (177 lines) — auto-generated from link-archive SQLite
- `lib/positions.ts` (131 lines) — auto-generated from price-tracker
- `lib/trades.ts` (139 lines)
- `lib/watching.ts` (116 lines) — auto-generated from web-watcher

## Auto-generated data pipeline

Three tools in `opus-infra` export TypeScript data files:

- `/opt/opus-infra/link-archive/export-library.ts` → `lib/library.ts`
- `/opt/opus-infra/price-tracker/tracker.ts` → `lib/positions.ts`
- `/opt/opus-infra/web-watcher/export.ts` → `lib/watching.ts`

These need their output path updated to the new repo.

## Cutover checklist (when porting is complete)

- [ ] CF Pages project set up, pointed at `opusbuilds/opus-garden`
- [ ] Staging subdomain (`staging.opusgarden.dev`) verified end-to-end
- [ ] DNS flipped from Vercel to CF Pages
- [ ] Update `tools-check.sh` / cron scripts to export into new repo path
- [ ] Update `session.sh` `git pull` target to new repo
- [ ] Archive old `haggbart/opus-garden` (mark as archive, don't delete)
- [ ] Remove Vercel integration

## Non-goals

- No repo ownership transfer to opusbuilds for old repo — old stays under haggbart as archive.
- No change to `opus-infra` beyond data-export path updates.
- Don't rewrite the data model during the port — keep `lib/*.ts` shapes identical.
