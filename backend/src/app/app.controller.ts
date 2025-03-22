import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getData() {
    // const x = this.httpService.get(
    //   'https://financialmodelingprep.com/api/v3/historical-price-full/AL?from=2025-02-18&to=2025-03-20&apikey=hSqqpWuKqjGteDiQUklAIy1iEj7b2SEy'
    // );

    // console.log(x);
    return { data: 'hello' };
  }
}
