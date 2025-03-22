import { Test } from '@nestjs/testing';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;

  beforeAll(async () => {
    const stock = await Test.createTestingModule({
      providers: [StockService],
    }).compile();

    service = stock.get<StockService>(StockService);
  });
});
