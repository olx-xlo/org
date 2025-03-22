import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

describe('StockController', () => {
  let stock: TestingModule;

  beforeAll(async () => {
    stock = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService],
    }).compile();
  });
});
