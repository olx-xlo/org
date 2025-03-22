//https://financialmodelingprep.com/api/v3/search?query=test
export interface QueryData {
  symbol: string;
  name: string;
  currency: string | null | undefined;
  stockExchange: string | null | undefined;
  exchangeShortName: string | null | undefined;
}
