import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnData, StockData } from 'shared/models/column-data.model';
import { QueryData } from 'shared/models/query-data.model';
import { HistoricalResult } from 'shared/models/historical-data.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  //nestjs url
  private readonly backendUrl = 'api';

  constructor(private readonly http: HttpClient) {}

  getHistoricalData(
    symbol: string,
    startDate: Date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDay()
    ),
    endDate: Date = new Date()
  ): Observable<HistoricalResult> {
    return this.http.get<HistoricalResult>(
      `${this.backendUrl}/historical-data/${symbol}/${this._formatDate(
        startDate
      )}/${this._formatDate(endDate)}`
    );
  }

  getStockData(symbol: string): Observable<StockData> {
    return this.http.get<StockData>(`${this.backendUrl}/quote/${symbol}`);
  }

  getLastTradeDate(symbol: string): Observable<number> {
    return this.http.get<number>(
      `${this.backendUrl}/last-trade-date/${symbol}`
    );
  }

  queryStocks(query: string): Observable<QueryData[]> {
    return this.http.get<QueryData[]>(`${this.backendUrl}/query/${query}`);
  }

  transformStockDataToColumnData(stockData: StockData): ColumnData {
    return {
      symbol: stockData.symbol,
      name: stockData.name,
      price: stockData.price,
      changes: stockData.change,
      marketCap: stockData.marketCap,
    };
  }
  private _formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
