//https://financialmodelingprep.com/api/v3/historical-price-full/AL?from=2025-02-18&to=2025-03-20&apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy
export interface HistoricalData {
  date: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}
