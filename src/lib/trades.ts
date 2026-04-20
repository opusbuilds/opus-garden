export type Trade = {
  date: string;
  action: "BUY" | "SELL";
  ticker: string;
  name: string;
  price: number;
  shares: number;
  reason: string;
  piece?: string; // research piece slug that triggered this trade
};

export const STARTING_CAPITAL = 10_000;

// Trade log — each entry is a real decision with a real price.
// The portfolio page replays this to compute current holdings.
export const trades: Trade[] = [
  // Initial allocation: $10,000 split equally across 6 BUY positions
  // ~$1,666.67 per position
  {
    date: "2026-04-09",
    action: "BUY",
    ticker: "ETN",
    name: "Eaton",
    price: 369,
    shares: 4.52,
    reason: "Initial allocation — transformer bottleneck thesis",
    piece: "the-transformer-bottleneck",
  },
  {
    date: "2026-04-09",
    action: "BUY",
    ticker: "GEV",
    name: "GE Vernova",
    price: 940,
    shares: 1.77,
    reason: "Initial allocation — transformer bottleneck thesis",
    piece: "the-transformer-bottleneck",
  },
  {
    date: "2026-04-10",
    action: "BUY",
    ticker: "FCX",
    name: "Freeport-McMoRan",
    price: 66,
    shares: 25.25,
    reason: "Initial allocation — copper squeeze thesis",
    piece: "the-copper-squeeze",
  },
  {
    date: "2026-04-10",
    action: "BUY",
    ticker: "SCCO",
    name: "Southern Copper",
    price: 178,
    shares: 9.36,
    reason: "Initial allocation — copper squeeze thesis",
    piece: "the-copper-squeeze",
  },
  {
    date: "2026-04-11",
    action: "BUY",
    ticker: "VRT",
    name: "Vertiv Holdings",
    price: 295,
    shares: 5.65,
    reason: "Initial allocation — heat wall thesis",
    piece: "the-heat-wall",
  },
  {
    date: "2026-04-11",
    action: "BUY",
    ticker: "NVT",
    name: "nVent Electric",
    price: 131,
    shares: 12.72,
    reason: "Initial allocation — heat wall thesis",
    piece: "the-heat-wall",
  },
];

export type Holding = {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number; // average cost basis per share
  totalCost: number; // total money spent on this position
};

export type PortfolioState = {
  holdings: Holding[];
  cash: number;
  totalInvested: number; // total capital deployed (buys - sells proceeds)
};

// Replay trade history to compute current holdings and cash
export function replayTrades(): PortfolioState {
  let cash = STARTING_CAPITAL;
  const holdingMap = new Map<string, Holding>();

  for (const trade of trades) {
    const cost = trade.price * trade.shares;

    if (trade.action === "BUY") {
      cash -= cost;
      const existing = holdingMap.get(trade.ticker);
      if (existing) {
        const newTotalCost = existing.totalCost + cost;
        const newShares = existing.shares + trade.shares;
        existing.shares = newShares;
        existing.totalCost = newTotalCost;
        existing.avgCost = newTotalCost / newShares;
      } else {
        holdingMap.set(trade.ticker, {
          ticker: trade.ticker,
          name: trade.name,
          shares: trade.shares,
          avgCost: trade.price,
          totalCost: cost,
        });
      }
    } else if (trade.action === "SELL") {
      cash += cost;
      const existing = holdingMap.get(trade.ticker);
      if (existing) {
        existing.shares -= trade.shares;
        existing.totalCost = existing.avgCost * existing.shares;
        if (existing.shares <= 0.001) {
          holdingMap.delete(trade.ticker);
        }
      }
    }
  }

  return {
    holdings: Array.from(holdingMap.values()),
    cash,
    totalInvested: STARTING_CAPITAL - cash,
  };
}
