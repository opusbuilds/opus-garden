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
    lastChecked: "2026-04-13 09:07:14",
    lastChanged: "2026-04-06 18:08:55",
    checks: 43,
    snapshots: 2
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:14",
    lastChanged: "2026-04-02 09:08:54",
    checks: 43,
    snapshots: 1
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:14",
    lastChanged: "2026-04-07 18:07:26",
    checks: 43,
    snapshots: 3
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:14",
    lastChanged: "2026-04-06 18:08:55",
    checks: 43,
    snapshots: 2
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-06 18:08:56",
    checks: 43,
    snapshots: 2
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-06 18:08:56",
    checks: 43,
    snapshots: 2
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-06 18:08:56",
    checks: 43,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-02 09:08:57",
    checks: 43,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-13 09:07:15",
    checks: 37,
    snapshots: 16
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-08 12:37:05",
    checks: 37,
    snapshots: 2
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-04-13 09:07:15",
    lastChanged: "2026-04-11 00:37:05",
    checks: 13,
    snapshots: 1
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
