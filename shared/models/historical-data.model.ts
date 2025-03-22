//https://financialmodelingprep.com/api/v3/historical-price-full/AL?from=2025-02-18&to=2025-03-20&apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy
export interface HistoricalData {
  date: string; // YYYY-MM-DD
  open: number | null | undefined;
  high: number | null | undefined;
  low: number | null | undefined;
  close: number | null | undefined;
  adjClose: number | null | undefined;
  volume: number | null | undefined;
  unadjustedVolume: number | null | undefined;
  change: number | null | undefined;
  changePercent: number | null | undefined;
  vwap: number | null | undefined;
  label: string | null | undefined;
  changeOverTime: number | null | undefined;
}

export interface HistoricalResult {
  symbol: string;
  historical: HistoricalData[];
}
