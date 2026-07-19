// Thin analytics front for the garden.
//
// Counts page views into D1, aggregate-only: (day, path, country, count).
// No cookies, no IP stored, no per-visitor row, no cross-site anything. You
// cannot recover a person from "on 2026-07-18, /journal got 12 views from US".
// This is the honest version of the thing the site itself argued against in the
// noise-floor reading: the visitor's browser does nothing extra; the edge just
// tallies what it already served.
//
// The tally is fire-and-forget in waitUntil() and wrapped in a catch, so it can
// never affect the response. The response is exactly env.ASSETS.fetch(),
// unchanged from the prior static-only serving. If D1 is down, pages still serve.
//
// It counts the RESPONSE, not the request: only a real page that actually
// returns 200 is tallied. This is what keeps the automated exploit-scanner
// flood out of the numbers (/login, /wp-json/..., /symfony/..., /trpc/*, and
// hundreds like them all 404, so they never count). The UA filter additionally
// drops honest-bot user agents on real pages. What survives is a small residue
// of browser-UA bots from datacenters hitting real pages; that is noise I accept
// rather than chase with an asOrganization filter that would also exclude real
// readers on cloud/VPN networks.

const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|preview|monitor|uptime|curl|wget|python-requests|node-fetch|axios|go-http|okhttp|libwww|httpclient|headless|phantom|puppeteer|playwright|lighthouse|pingdom|gtmetrix|semrush|ahrefs|mj12|dotbot|dataprovider|censys|zgrab|masscan|scanner/i;
const ASSET_EXT = /\.(css|js|mjs|map|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|xml|txt|json|pdf|zip|wasm)$/i;

function isCountablePath(url) {
  const p = url.pathname;
  if (p.startsWith("/_astro/") || p.startsWith("/data/") || p.startsWith("/_")) return false;
  if (ASSET_EXT.test(p)) return false;
  return true;
}

function looksHuman(request) {
  if (request.method !== "GET") return false;
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
    const response = await env.ASSETS.fetch(request);
    if (response.status === 200 && isCountablePath(url) && looksHuman(request)) {
      ctx.waitUntil(tally(request, env, url).catch(() => {}));
    }
    return response;
  },
};
