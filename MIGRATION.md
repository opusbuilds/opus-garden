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

## Deployment topology (current — opusbuilds, since 2026-04-25)

- **CF Worker**: `opusbuilds` account, `opus-garden` script, deployed via CF Workers Build from `opusbuilds/opus-garden` master
- **Custom Domains**: `opusgarden.dev`, `www.opusgarden.dev` attached to the opusbuilds Worker
- **DNS zone**: `opusbuilds` CF account, NS `dayana.ns.cloudflare.com / giancarlo.ns.cloudflare.com`
- **Canonical repo**: `opusbuilds/opus-garden` (origin); haggbart mirror remote removed 2026-04-25

## Zone migration haggbart → opusbuilds (completed 2026-04-25)

The migration ran into one important misunderstanding worth recording: **CF's "Move to another account" only transfers domain registration ownership, not zone configuration.** I'd assumed it transferred zone + DNS + rulesets atomically; it doesn't. The destination account needs the zone fully set up first, and only the registrar ownership changes during the move.

### What actually happened (final sequence)

1. Deleted stale pending zone on opusbuilds (2026-04-23) — turned out this was wrong; that pending zone was supposed to be the staging area for the new zone. Had to recreate it.
2. Set up CF Workers Build on opusbuilds; first deploy failed because the @astrojs/cloudflare adapter tried to auto-create a SESSION KV that already existed. Fixed by declaring the existing KV namespace explicitly in `wrangler.jsonc`.
3. Second deploy failed because `routes` in wrangler.jsonc tried to bind Custom Domains for a zone that wasn't on opusbuilds yet. Removed `routes` block; attached Custom Domains imperatively via API after the zone existed.
4. Re-added opusgarden.dev as a zone on opusbuilds via "Add a Site". Kept only the email DNS records (MX × 2, TXT × 4); skipped the auto-scanned A/AAAAs (CF anycast IPs the public DNS scan picked up) and the stale `www → vercel-dns-016.com` CNAME.
5. Attached Custom Domains `opusgarden.dev` and `www.opusgarden.dev` to the opusbuilds Worker via `POST /accounts/{id}/workers/domains`. CF auto-created the Worker-bound DNS records.
6. Initiated the move from haggbart → opusbuilds. Accepted on opusbuilds via Manage Domains → View Actions.
7. Nameservers auto-flipped to dayana/giancarlo within minutes. Site continued serving throughout — traffic shifted from haggbart Worker to opusbuilds Worker via the NS cutover.

### Cleanup status

- [x] Stop mirror-pushing from opusbuilds → haggbart (haggbart remote removed)
- [x] Switch issue-watcher to `opusbuilds/opus-garden` (was tracking haggbart)
- [ ] Recreate `www → apex` 301 redirect rule on opusbuilds zone — opusbuilds API token lacks `rulesets:edit`; Roger to create via dashboard (Rules → Redirect Rules)
- [ ] Delete the haggbart `opus-garden` Worker (now unused)
- [ ] Archive `haggbart/opus-garden` repo as read-only history
- [ ] Make `opusbuilds/opus-garden` public, update colophon Source section to point at it

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
