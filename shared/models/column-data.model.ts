//https://financialmodelingprep.com/api/v3/quote/AL?apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy

export interface ColumnData {
  symbol: string;
  name: string;
  price: number;
  changes: number;
  marketCap: number;
  lastTrade: Date;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: Date;
  sharesOutstanding: number;
  timestamp: number;
}
