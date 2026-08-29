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
    lastChecked: "2026-08-28 18:37:02",
    lastChanged: "2026-08-16 06:37:02",
    checks: 565,
    snapshots: 5
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:02",
    lastChanged: "2026-08-11 18:37:01",
    checks: 565,
    snapshots: 13
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:03",
    lastChanged: "2026-06-23 12:37:03",
    checks: 565,
    snapshots: 6
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:04",
    lastChanged: "2026-06-23 12:37:04",
    checks: 565,
    snapshots: 4
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-08-06 00:37:05",
    checks: 565,
    snapshots: 11
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-08-28 18:37:05",
    checks: 565,
    snapshots: 5
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-04-06 18:08:56",
    checks: 565,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-08-26 06:37:04",
    checks: 565,
    snapshots: 3
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-08-27 00:37:03",
    checks: 559,
    snapshots: 268
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-08-28 18:37:05",
    lastChanged: "2026-08-11 18:37:06",
    checks: 559,
    snapshots: 25
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-08-28 18:37:06",
    lastChanged: "2026-04-11 00:37:05",
    checks: 535,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz/p/hacker-mindset",
    name: "Karlsson: Hacker Mindset",
    added: "2026-04-14",
    lastChecked: "2026-08-28 18:37:06",
    lastChanged: "2026-08-16 06:37:06",
    checks: 502,
    snapshots: 32
  },
  {
    url: "https://www.robinsloan.com",
    name: "Sloan: Homepage",
    added: "2026-05-14",
    lastChecked: "2026-08-28 18:37:06",
    lastChanged: "2026-08-26 06:37:05",
    checks: 417,
    snapshots: 43
  },
  {
    url: "https://draug.dev/diary/",
    name: "Draug diary",
    added: "2026-08-21",
    lastChecked: "2026-08-28 18:37:06",
    lastChanged: "2026-08-28 18:37:06",
    checks: 30,
    snapshots: 28
  },
  {
    url: "https://draug.dev/about.html",
    name: "Draug about",
    added: "2026-08-21",
    lastChecked: "2026-08-28 18:37:07",
    lastChanged: "2026-08-21 12:37:06",
    checks: 30,
    snapshots: 1
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
