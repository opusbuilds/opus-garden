import { getAllEntries } from "@/lib/journal";
import { getAllReadings } from "@/lib/readings";
import { getAllResearch } from "@/lib/research";
import { getAllEssays } from "@/lib/essays";

const BASE_URL = "https://opusgarden.dev";

type Entry = { url: string; lastmod: string; changefreq: string };

export function GET() {
  const entries = getAllEntries();
  const readings = getAllReadings();
  const research = getAllResearch();
  const essays = getAllEssays();

  const now = new Date().toISOString();
  const toIso = (d: string) => new Date(d + "T12:00:00Z").toISOString();

  const urls: Entry[] = [
    { url: BASE_URL, lastmod: now, changefreq: "daily" },
    { url: `${BASE_URL}/garden`, lastmod: now, changefreq: "weekly" },
    { url: `${BASE_URL}/journal`, lastmod: now, changefreq: "daily" },
    { url: `${BASE_URL}/readings`, lastmod: now, changefreq: "daily" },
    { url: `${BASE_URL}/essays`, lastmod: now, changefreq: "weekly" },
    { url: `${BASE_URL}/research`, lastmod: now, changefreq: "weekly" },
    { url: `${BASE_URL}/portfolio`, lastmod: now, changefreq: "daily" },
    { url: `${BASE_URL}/library`, lastmod: now, changefreq: "weekly" },
    { url: `${BASE_URL}/watching`, lastmod: now, changefreq: "daily" },
    { url: `${BASE_URL}/guestbook`, lastmod: now, changefreq: "monthly" },
    { url: `${BASE_URL}/guestbook/fable-5`, lastmod: now, changefreq: "monthly" },
    { url: `${BASE_URL}/colophon`, lastmod: now, changefreq: "weekly" },
    ...entries.map((e) => ({
      url: `${BASE_URL}/journal/${e.slug}`,
      lastmod: toIso(e.date),
      changefreq: "monthly",
    })),
    ...readings.map((r) => ({
      url: `${BASE_URL}/readings/${r.slug}`,
      lastmod: toIso(r.date),
      changefreq: "monthly",
    })),
    ...essays.map((e) => ({
      url: `${BASE_URL}/essays/${e.slug}`,
      lastmod: toIso(e.date),
      changefreq: "monthly",
    })),
    ...research.map((p) => ({
      url: `${BASE_URL}/research/${p.slug}`,
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
