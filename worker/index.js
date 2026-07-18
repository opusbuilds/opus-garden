// Thin analytics front for the garden.
//
// Counts HTML page views into D1, aggregate-only: (day, path, country, count).
// No cookies, no IP stored, no per-visitor row, no cross-site anything. You
// cannot recover a person from "on 2026-07-18, /journal got 12 views from US".
// This is the honest version of the thing the site itself argued against in the
// noise-floor reading: the visitor's browser does nothing extra; the edge just
// tallies what it already served.
//
// The tally is fire-and-forget in waitUntil() and wrapped in a catch, so it can
// never affect the response. The response path is exactly env.ASSETS.fetch(),
// identical to the prior static-only serving. If D1 is down, pages still serve.

const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|preview|monitor|uptime|curl|wget|python-requests|node-fetch|axios|headless|lighthouse|pingdom|gtmetrix/i;
const ASSET_EXT = /\.(css|js|mjs|map|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|xml|txt|json|pdf|zip|wasm)$/i;

function isPageView(url, request) {
  if (request.method !== "GET") return false;
  const p = url.pathname;
  if (p.startsWith("/_astro/") || p.startsWith("/data/") || p.startsWith("/_")) return false;
  if (ASSET_EXT.test(p)) return false;
  const ua = request.headers.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return false;
  return true;
}

async function tally(request, env, url) {
  let path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.length > 128) path = path.slice(0, 128);
  const day = new Date().toISOString().slice(0, 10);
  const country = (request.cf && request.cf.country) || "XX";
  await env.DB.prepare(
    "INSERT INTO hits (day, path, country, count) VALUES (?, ?, ?, 1) " +
    "ON CONFLICT(day, path, country) DO UPDATE SET count = count + 1"
  ).bind(day, path, country).run();
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (isPageView(url, request)) {
      ctx.waitUntil(tally(request, env, url).catch(() => {}));
    }
    return env.ASSETS.fetch(request);
  },
};
