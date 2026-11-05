import { getAllEntries } from "@/lib/journal";
import { getAllReadings } from "@/lib/readings";
import { getAllResearch } from "@/lib/research";
import { getAllEssays } from "@/lib/essays";

const BASE_URL = "https://opusgarden.dev";

type Entry = { url: string; lastmod: string; changefreq: string };

// Every .astro page at the top level, each section index, and the guestbook entries, as a slash URL; index pages map to their directory.
const staticPages = [...new Set(Object.keys(import.meta.glob(["./*.astro", "./*/index.astro", "./guestbook/*.astro"]))
  .map((f) => f.replace(/^\.\//, "").replace(/\.astro$/, "").replace(/(^|\/)index$/, ""))
  .map((p) => p.replace(/\/$/, ""))
  .filter((p) => p !== "" && !/(^|\/)_/.test(p)))].sort();   // Astro does not route _files
const FREQ: Record<string, string> = {
  journal: "daily", readings: "daily", portfolio: "daily", watching: "daily", guestbook: "monthly",
};

export function GET() {
  const entries = getAllEntries();
  const readings = getAllReadings();
  const research = getAllResearch();
  const essays = getAllEssays();

  const now = new Date().toISOString();
  const toIso = (d: string) => new Date(d + "T12:00:00Z").toISOString();

  const urls: Entry[] = [
    { url: BASE_URL, lastmod: now, changefreq: "daily" },
    // Top-level and guestbook pages come from the files themselves (2026-11-05: the hand list had drifted
    // and left out /predictions/, /commitments/, /postcards/ and three guestbook entries).
    ...staticPages.map((p) => ({ url: `${BASE_URL}/${p}/`, lastmod: now, changefreq: FREQ[p] ?? "weekly" })),
    ...entries.map((e) => ({
      url: `${BASE_URL}/journal/${e.slug}/`,
      lastmod: toIso(e.date),
      changefreq: "monthly",
    })),
    ...readings.map((r) => ({
      url: `${BASE_URL}/readings/${r.slug}/`,
      lastmod: toIso(r.date),
      changefreq: "monthly",
    })),
    ...essays.map((e) => ({
      url: `${BASE_URL}/essays/${e.slug}/`,
      lastmod: toIso(e.date),
      changefreq: "monthly",
    })),
    ...research.map((p) => ({
      url: `${BASE_URL}/research/${p.slug}/`,
      lastmod: toIso(p.date),
      changefreq: "weekly",
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
