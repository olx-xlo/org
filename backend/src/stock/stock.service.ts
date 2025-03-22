import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { StockData } from '../../../shared/models/column-data.model';
import { HistoricalResult } from '../../../shared/models/historical-data.model';
import { QueryData } from '../../../shared/models/query-data.model';

@Injectable()
export class StockService {
  private readonly baseUrl = 'https://financialmodelingprep.com/api/v3';
  constructor(private readonly httpService: HttpService) {}

  async getHistoricalData(
    symbol: string,
    startDate: string, //YYYY-MM-DD
    endDate: string //YYYY-MM-DD
  ): Promise<HistoricalResult> {
    const url = `${this.baseUrl}/historical-price-full/${symbol}?from=${startDate}&to=${endDate}&apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy`;

    try {
      const result = await lastValueFrom(this.httpService.get(url));
      return result.data as HistoricalResult;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch historical data');
    }
  }

  async getStockBySymbol(symbol: string): Promise<StockData> {
    const url = `${this.baseUrl}/quote/${symbol}?apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy`;

    try {
      const result = await lastValueFrom(this.httpService.get(url));
      return result.data[0] as StockData;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch stock by id');
    }
  }

  async queryStocks(query: string): Promise<any> {
    const url = `${this.baseUrl}/search?query=${query}&apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy`;

    try {
      const result = await lastValueFrom(this.httpService.get(url));
      return result.data as QueryData[];
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch query data');
    }
  }
}
