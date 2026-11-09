export type WatchedPage = {
  url: string;
  name: string;
  added: string;
  lastChecked: string | null;
  lastChanged: string | null;
  checks: number;
  snapshots: number;
};

// Auto-generated from web watcher. Do not edit manually.
export const watchedPages: WatchedPage[] = [
  {
    url: "https://www.henrikkarlsson.xyz/p/constraints",
    name: "Karlsson: Constraints",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:01",
    lastChanged: "2026-11-05 18:37:02",
    checks: 840,
    snapshots: 7
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:01",
    lastChanged: "2026-11-04 00:37:01",
    checks: 840,
    snapshots: 22
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:02",
    lastChanged: "2026-06-23 12:37:03",
    checks: 840,
    snapshots: 6
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:03",
    lastChanged: "2026-06-23 12:37:04",
    checks: 840,
    snapshots: 4
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:03",
    lastChanged: "2026-10-15 18:37:04",
    checks: 840,
    snapshots: 12
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-11-04 18:37:04",
    checks: 840,
    snapshots: 10
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-04-06 18:08:56",
    checks: 840,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-08-26 06:37:04",
    checks: 840,
    snapshots: 3
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-10-26 06:37:05",
    checks: 834,
    snapshots: 272
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-11-04 00:37:04",
    checks: 834,
    snapshots: 34
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-11-09 12:37:04",
    lastChanged: "2026-11-05 18:37:06",
    checks: 810,
    snapshots: 2
  },
  {
    url: "https://www.henrikkarlsson.xyz/p/hacker-mindset",
    name: "Karlsson: Hacker Mindset",
    added: "2026-04-14",
    lastChecked: "2026-11-09 12:37:05",
    lastChanged: "2026-11-05 18:37:06",
    checks: 777,
    snapshots: 35
  },
  {
    url: "https://www.robinsloan.com",
    name: "Sloan: Homepage",
    added: "2026-05-14",
    lastChecked: "2026-11-09 12:37:05",
    lastChanged: "2026-11-09 06:37:06",
    checks: 692,
    snapshots: 70
  },
  {
    url: "https://draug.dev/diary/",
    name: "Draug diary",
    added: "2026-08-21",
    lastChecked: "2026-11-09 12:37:05",
    lastChanged: "2026-11-09 12:37:05",
    checks: 305,
    snapshots: 301
  },
  {
    url: "https://draug.dev/about.html",
    name: "Draug about",
    added: "2026-08-21",
    lastChecked: "2026-11-09 12:37:05",
    lastChanged: "2026-09-23 18:37:17",
    checks: 305,
    snapshots: 4
  },
  {
    url: "https://www.anthropic.com/news",
    name: "https://www.anthropic.com/news",
    added: "2026-09-06",
    lastChecked: "2026-11-09 12:37:05",
    lastChanged: "2026-11-09 00:37:05",
    checks: 244,
    snapshots: 46
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
