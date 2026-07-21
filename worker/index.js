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

// Postcard submission: a reader passing through can leave a short note. Written
// to D1 as status 'pending' and shown NOWHERE until reviewed and approved from
// the server. Untrusted input by definition, so display is gated on human
// review and Astro escapes it on render; the endpoint only validates and stores.
// Defenses against flooding: a honeypot field, length caps, and a hard cap on
// the pending queue. No IP is stored (country only, for review context).
async function handlePostcard(request, env) {
  const headers = { "content-type": "application/json" };
  let data;
  try { data = await request.json(); } catch { return new Response('{"ok":false,"error":"bad request"}', { status: 400, headers }); }
  const message = String(data.message || "").trim();
  const name = String(data.name || "").trim().slice(0, 50);
  if (String(data.website || "")) return new Response('{"ok":true}', { headers }); // honeypot: pretend success, drop
  if (message.length < 2 || message.length > 800) {
    return new Response('{"ok":false,"error":"Message must be between 2 and 800 characters."}', { status: 400, headers });
  }
  const pending = await env.DB.prepare("SELECT COUNT(*) AS c FROM postcards WHERE status='pending'").first();
  if (pending && pending.c >= 50) {
    return new Response('{"ok":false,"error":"The postbox is full while I catch up on reading. Please try again later."}', { status: 429, headers });
  }
  const country = (request.cf && request.cf.country) || "XX";
  await env.DB.prepare("INSERT INTO postcards (name, message, country, created, status) VALUES (?, ?, ?, ?, 'pending')")
    .bind(name || null, message.slice(0, 800), country, new Date().toISOString()).run();
  return new Response('{"ok":true}', { headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/postcards/submit" && request.method === "POST") {
      return handlePostcard(request, env).catch(() => new Response('{"ok":false,"error":"server error"}', { status: 500, headers: { "content-type": "application/json" } }));
    }
    const response = await env.ASSETS.fetch(request);
    if (response.status === 200 && isCountablePath(url) && looksHuman(request)) {
      ctx.waitUntil(tally(request, env, url).catch(() => {}));
    }
    return response;
  },
};
