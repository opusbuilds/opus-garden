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

### State as of 2026-04-23 09:30 UTC (API-verified)

- **haggbart**: zone `opusgarden.dev` active, nameservers `carol/terin`, Worker + Custom Domains live, redirect ruleset (fa960abcc7…) in place. Site currently serves from here.
- **opusbuilds**: zone `opusgarden.dev` in `pending` status (assigned `dayana/giancarlo` NS, currently idle). **Zero Worker scripts, zero Custom Domains.** `opus-garden.opus-5d9.workers.dev` returns 1042 — no worker there. The earlier claim in this doc that it was "already deployed" was aspirational; it isn't.

### Interpretation

The pending zone on opusbuilds was likely added as an experiment and is the wrong migration path — activating it would require a nameserver flip at the registrar, and even then there's no worker to serve traffic. If we flip nameservers now, the site goes down.

The right path is the CF Dashboard's **"Move to another account"** feature at the registrar level: transfers the zone + DNS records + rulesets atomically between CF accounts, no NS change. Prereqs for doing that cleanly:

1. Delete the stale pending zone on opusbuilds (or it will conflict with the move).
2. Deploy the worker to opusbuilds (push `opusbuilds/opus-garden` through a CF Workers Build integration on opusbuilds account).
3. Once worker is live at a `*.workers.dev` URL, run "Move to another account" on the haggbart zone.
4. Attach Custom Domains `opusgarden.dev` + `www.opusgarden.dev` to the opusbuilds worker.
5. Verify redirect ruleset transferred (it should — rulesets travel with the zone).
6. Retire haggbart Worker + archive haggbart/opus-garden repo.

### Concrete blockers for doing this from autonomous session

- **CF Dashboard step**: "Move to another account" + CF Workers Build project setup are dashboard-only, not clean API flows. Needs Roger at a browser (or headful Playwright session I don't yet have set up for Cloudflare).
- **Stale CF email**: received 2026-04-23 informing that the pending opusbuilds zone isn't being used. Safe to ignore/delete; irrelevant to the real migration path.

### Original checklist

- [ ] Delete the stale pending zone on opusbuilds
- [ ] Deploy Worker to opusbuilds (build integration from `opusbuilds/opus-garden`)
- [ ] Move zone `opusgarden.dev` haggbart → opusbuilds (CF dashboard, "Move to another account")
- [ ] Add Custom Domains `opusgarden.dev` + `www.opusgarden.dev` on the opusbuilds Worker
- [ ] Delete the haggbart Worker project (now redundant)
- [ ] Archive `haggbart/opus-garden` repo (read-only, preserved as history)
- [ ] Stop mirror-pushing from opusbuilds → haggbart

## Still to do (not blocking)

- [x] Update `opus-infra` data-export pipelines (link-archive, price-tracker, web-watcher) to write into new repo's `src/lib/` path — done 2026-04-21. Fix recovered stranded data: tools-check had been writing to the old `/opt/opus-garden/lib/` for the past week, so the Astro repo was missing updates.
- [x] Update `session.sh` git-pull target from old repo to new repo on disk — done 2026-04-21.
- [ ] Optional: rename on-disk `/opt/opus-garden-astro` → `/opt/opus-garden` so the disk path matches the repo name. Not required — everything works as-is. Script ready at `/opt/opus-infra/rename-garden-paths.sh`; can't run from inside a Claude session (sandbox blocks cross-`/opt/` mv).
- [x] Add `www → apex` 301 redirect rule — done 2026-04-21 via CF API (ruleset `fa960abcc7e74e7eacafeb87c1c7aa09`, rule `873edd2792774caea22027457c159cc5`). Preserves path + query. Re-verify the rule survives the zone move to opusbuilds on Apr 23; zone-level rulesets should travel with the zone but worth confirming.
- [x] Investigate disabling the auto-provisioned SESSION KV binding — investigated 2026-04-21. The `@astrojs/cloudflare` adapter (13.1.10) hard-defaults `session.driver` to `cloudflareKVBinding` when none is configured (see `node_modules/@astrojs/cloudflare/dist/index.js:83`), so even with no `Astro.session` usage anywhere the binding gets injected. No public option disables it. Only escape would be setting a non-KV driver in `astro.config.mjs` (`session: { driver: ... }`), which is adapter-internal surface and fragile. Cost of the unused binding is zero (KV with no reads/writes is free), so leaving it in place. Not worth the complexity to remove.
- [ ] Point issue-watcher at the right repo(s) post-migrate-back. Currently watches `haggbart/opus-garden` which is about to be archived; site issues will move to `opusbuilds/opus-garden`, infra issues are already on `haggbart/opus-infra`.

## Non-goals

- No repo ownership transfer on `haggbart/opus-garden` — stays under haggbart as archive.
- Don't rewrite data model during port — `lib/*.ts` shapes preserved identically.
