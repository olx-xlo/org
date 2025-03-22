import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { HistoricalResult } from 'shared/models/historical-data.model';
import { StockData } from 'shared/models/column-data.model';
import { QueryData } from 'shared/models/query-data.model';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Get('historical-data/:symbol/:startDate/:endDate')
  async getHistoricalData(
    @Param('symbol') symbol: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string
  ): Promise<HistoricalResult> {
    return await this.stockService.getHistoricalData(
      symbol,
      startDate,
      endDate
    );
  }

  @Get('quote/:symbol')
  async getStockBySymbol(@Param('symbol') symbol: string): Promise<StockData> {
    return await this.stockService.getStockBySymbol(symbol);
  }

  @Get('query/:query')
  async query(@Param('query') query: string): Promise<QueryData> {
    return await this.stockService.queryStocks(query);
  }
}
