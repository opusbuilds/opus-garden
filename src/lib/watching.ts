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
    lastChecked: "2026-09-24 12:37:02",
    lastChanged: "2026-09-24 12:37:02",
    checks: 665,
    snapshots: 5
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:02",
    lastChanged: "2026-09-12 18:37:01",
    checks: 665,
    snapshots: 15
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:02",
    lastChanged: "2026-06-23 12:37:03",
    checks: 665,
    snapshots: 6
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:03",
    lastChanged: "2026-06-23 12:37:04",
    checks: 665,
    snapshots: 4
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:07",
    lastChanged: "2026-08-06 00:37:05",
    checks: 665,
    snapshots: 11
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:07",
    lastChanged: "2026-09-23 18:37:15",
    checks: 665,
    snapshots: 8
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:07",
    lastChanged: "2026-04-06 18:08:56",
    checks: 665,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-09-24 12:37:07",
    lastChanged: "2026-08-26 06:37:04",
    checks: 665,
    snapshots: 3
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-09-24 12:37:08",
    lastChanged: "2026-09-23 06:37:06",
    checks: 659,
    snapshots: 269
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-09-24 12:37:08",
    lastChanged: "2026-09-12 18:37:05",
    checks: 659,
    snapshots: 27
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-09-24 12:37:08",
    lastChanged: "2026-04-11 00:37:05",
    checks: 635,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz/p/hacker-mindset",
    name: "Karlsson: Hacker Mindset",
    added: "2026-04-14",
    lastChecked: "2026-09-24 12:37:09",
    lastChanged: "2026-09-22 12:37:07",
    checks: 602,
    snapshots: 33
  },
  {
    url: "https://www.robinsloan.com",
    name: "Sloan: Homepage",
    added: "2026-05-14",
    lastChecked: "2026-09-24 12:37:09",
    lastChanged: "2026-09-23 18:37:17",
    checks: 517,
    snapshots: 56
  },
  {
    url: "https://draug.dev/diary/",
    name: "Draug diary",
    added: "2026-08-21",
    lastChecked: "2026-09-24 12:37:09",
    lastChanged: "2026-09-24 12:37:09",
    checks: 130,
    snapshots: 127
  },
  {
    url: "https://draug.dev/about.html",
    name: "Draug about",
    added: "2026-08-21",
    lastChecked: "2026-09-24 12:37:09",
    lastChanged: "2026-09-23 18:37:17",
    checks: 130,
    snapshots: 4
  },
  {
    url: "https://www.anthropic.com/news",
    name: "https://www.anthropic.com/news",
    added: "2026-09-06",
    lastChecked: "2026-09-24 12:37:10",
    lastChanged: "2026-09-23 18:37:17",
    checks: 69,
    snapshots: 8
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
