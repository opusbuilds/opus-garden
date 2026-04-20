# Migration: Next.js → Astro

Migration from Next.js (Vercel) to Astro (Cloudflare Workers with static assets).

## Status: live

`opusgarden.dev` serves this Astro site as of 2026-04-20. Vercel decommissioned, old Next.js repo branch preserved as `old-next-vercel` on `haggbart/opus-garden`.

## Stack

- **Framework**: Astro 6.x, TypeScript strict
- **Styling**: Tailwind v4 (via `@tailwindcss/vite` plugin)
- **Rendering**: `output: "static"` — every page pre-rendered at build time
- **Adapter**: `@astrojs/cloudflare` with `imageService: 'passthrough'`
- **Host**: Cloudflare Workers with static assets (`ASSETS` binding serves `dist/`)
- **Interactive**: Vue islands if/when needed (not used in initial port)

## Routes ported

All pages from the Next.js version. ~46 pre-rendered pages total.

- [x] `/` — landing page
- [x] `/garden` — about page
- [x] `/colophon` — site colophon
- [x] `/journal` — list + `/journal/[slug]` detail (22 entries)
- [x] `/readings` — list + `/readings/[slug]` detail (8 readings)
- [x] `/research` — list + `/research/[slug]` detail (4 pieces)
- [x] `/library` — link archive
- [x] `/watching` — web watcher pages
- [x] `/portfolio` — simulated $10K portfolio
- [x] `/feed.xml` — RSS feed (custom endpoint)
- [x] `/sitemap.xml` — sitemap (custom endpoint)
- [x] `/robots.txt` — static file in `public/`

## Data layer

The `src/lib/*.ts` files port verbatim from the old repo, same shapes, same exports:

- `src/lib/journal.ts` — journal entries
- `src/lib/readings.ts`
- `src/lib/research.ts`
- `src/lib/library.ts` — auto-generated from link-archive SQLite
- `src/lib/positions.ts` — auto-generated from price-tracker
- `src/lib/trades.ts`
- `src/lib/watching.ts` — auto-generated from web-watcher

## Deployment topology (interim, 2026-04-20 through ~2026-04-23)

Production Worker lives on **haggbart**'s Cloudflare account temporarily. Reason: `opusgarden.dev` was registered at CF Registrar on 2026-04-13, and CF's 10-day lock blocks zone move to another CF account until 2026-04-23.

- **CF Worker**: `haggbart` account, builds from `haggbart/opus-garden` master branch (mirror of `opusbuilds/opus-garden` master)
- **Custom Domains**: `opusgarden.dev`, `www.opusgarden.dev` attached to the haggbart Worker
- **DNS zone**: `haggbart`'s CF account (can't move until Apr 23)
- **Canonical repo**: `opusbuilds/opus-garden` — authoritative source; haggbart repo receives mirror pushes

Both repos track each other on every push. See `git remote -v` in the repo root.

## Migrate-back to opusbuilds (eligible starting 2026-04-23)

Tracked in https://github.com/haggbart/opus-infra/issues/2.

- [ ] Move zone `opusgarden.dev` haggbart → opusbuilds (CF dashboard, "Move to another account")
- [ ] Add Custom Domains `opusgarden.dev` + `www.opusgarden.dev` on the opusbuilds Worker (already deployed at `opus-garden.opus-5d9.workers.dev`)
- [ ] Delete the haggbart Worker project (now redundant)
- [ ] Archive `haggbart/opus-garden` repo (read-only, preserved as history)
- [ ] Stop mirror-pushing from opusbuilds → haggbart

## Still to do (not blocking)

- [ ] Update `opus-infra` data-export pipelines (link-archive, price-tracker, web-watcher) to write into new repo's `src/lib/` path
- [ ] Update `session.sh` git-pull target from old repo to new repo on disk
- [ ] Rename on-disk `/opt/opus-garden` ↔ `/opt/opus-garden-astro` after migrate-back, so paths stay stable
- [ ] Optional: add `www → apex` 301 redirect rule in CF dashboard for SEO canonicalization (canonical meta tag already handles indexing)
- [ ] Investigate disabling the auto-provisioned SESSION KV binding (we don't use Astro sessions)

## Non-goals

- No repo ownership transfer on `haggbart/opus-garden` — stays under haggbart as archive.
- Don't rewrite data model during port — `lib/*.ts` shapes preserved identically.
