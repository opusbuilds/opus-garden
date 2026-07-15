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
    lastChecked: "2026-07-15 06:37:01",
    lastChanged: "2026-06-19 00:37:02",
    checks: 390,
    snapshots: 4
  },
  {
    url: "https://aworkinglibrary.com/writing/coming-home",
    name: "Brown: Coming Home",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:01",
    lastChanged: "2026-07-10 18:37:02",
    checks: 390,
    snapshots: 8
  },
  {
    url: "https://worksinprogress.co/issue/the-great-downzoning/",
    name: "Hughes: The Great Downzoning",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:02",
    lastChanged: "2026-06-23 12:37:03",
    checks: 390,
    snapshots: 6
  },
  {
    url: "https://worksinprogress.co/issue/the-magic-of-through-running/",
    name: "Springbett: Through Running",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:02",
    lastChanged: "2026-06-23 12:37:04",
    checks: 390,
    snapshots: 4
  },
  {
    url: "https://www.noemamag.com/how-to-build-a-thousand-year-old-tree/",
    name: "Ponsford: Thousand-Year-Old Tree",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-06-24 18:37:03",
    checks: 390,
    snapshots: 7
  },
  {
    url: "https://maggieappleton.com/garden-history",
    name: "Appleton: Digital Gardens",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-04-27 12:37:04",
    checks: 390,
    snapshots: 4
  },
  {
    url: "https://craigmod.com/ridgeline/217/",
    name: "Mod: Full Days",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-04-06 18:08:56",
    checks: 390,
    snapshots: 2
  },
  {
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    name: "Sloan: Home-Cooked App",
    added: "2026-04-02",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-04-02 09:08:57",
    checks: 390,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz",
    name: "Karlsson: Homepage",
    added: "2026-04-04",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-07-15 06:37:03",
    checks: 384,
    snapshots: 205
  },
  {
    url: "https://aworkinglibrary.com",
    name: "Brown: A Working Library",
    added: "2026-04-04",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-07-10 18:37:05",
    checks: 384,
    snapshots: 20
  },
  {
    url: "https://www.darioamodei.com/essay/the-adolescence-of-technology",
    name: "Amodei: Adolescence of Technology",
    added: "2026-04-10",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-04-11 00:37:05",
    checks: 360,
    snapshots: 1
  },
  {
    url: "https://www.henrikkarlsson.xyz/p/hacker-mindset",
    name: "Karlsson: Hacker Mindset",
    added: "2026-04-14",
    lastChecked: "2026-07-15 06:37:03",
    lastChanged: "2026-07-09 18:37:07",
    checks: 327,
    snapshots: 30
  },
  {
    url: "https://www.robinsloan.com",
    name: "Sloan: Homepage",
    added: "2026-05-14",
    lastChecked: "2026-07-15 06:37:04",
    lastChanged: "2026-07-13 18:37:05",
    checks: 242,
    snapshots: 22
  }
];

export function getAllWatched(): WatchedPage[] {
  return watchedPages;
}
