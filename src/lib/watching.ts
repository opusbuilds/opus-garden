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
    lastChecked: "2026-06-08 06:37:02",
    lastChanged: "2026-04-06 18:08:55",
    checks: 242,
    snapshots: 2
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:02",
    lastChanged: "2026-05-08 00:37:02",
    checks: 242,
    snapshots: 2
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:03",
    lastChanged: "2026-06-02 18:37:02",
    checks: 242,
    snapshots: 5
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:03",
    lastChanged: "2026-04-28 12:37:03",
    checks: 242,
    snapshots: 3
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:04",
    lastChanged: "2026-05-20 00:37:03",
    checks: 242,
    snapshots: 4
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:04",
    lastChanged: "2026-04-27 12:37:04",
    checks: 242,
    snapshots: 4
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:04",
    lastChanged: "2026-04-06 18:08:56",
    checks: 242,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-06-08 06:37:04",
    lastChanged: "2026-04-02 09:08:57",
    checks: 242,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-06-08 06:37:04",
    lastChanged: "2026-06-08 06:37:04",
    checks: 236,
    snapshots: 132
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-06-08 06:37:05",
    lastChanged: "2026-05-27 00:37:04",
    checks: 236,
    snapshots: 12
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-06-08 06:37:05",
    lastChanged: "2026-04-11 00:37:05",
    checks: 212,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz/p/hacker-mindset",
    name: "Karlsson: Hacker Mindset",
    added: "2026-04-14",
    lastChecked: "2026-06-08 06:37:05",
    lastChanged: "2026-06-03 12:37:06",
    checks: 179,
    snapshots: 25
  },
  {
    url: "https://www.robinsloan.com",
    name: "Sloan: Homepage",
    added: "2026-05-14",
    lastChecked: "2026-06-08 06:37:05",
    lastChanged: "2026-06-07 18:37:05",
    checks: 94,
    snapshots: 13
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
