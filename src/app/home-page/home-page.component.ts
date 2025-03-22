import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { LogoComponent } from '../logo/logo.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { StockTableComponent } from '../stock-table/stock-table.component';
import { ColumnData } from 'shared/models/column-data.model';
import { QueryData } from 'shared/models/query-data.model';
import { StockService } from 'src/services/stock.service';
import { finalize, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    StockTableComponent,
    SearchBarComponent,
    LoaderComponent,
    LogoComponent,
    AsyncPipe,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HomePageComponent {
  isLoading = false;
  showHeader = false;
  queriedData$: Observable<QueryData[]> | null = null;

  constructor(
    private readonly stockService: StockService,
    private readonly router: Router
  ) {}

  searchStocks(query: string): void {
    if (query.length === 0) return;

    this.showHeader = true;
    this.queriedData$ = this.stockService
      .queryStocks(query)
      .pipe(
        map((result) => (result.length > 10 ? result.slice(0, 10) : result))
      );
  }

  openHistoricalView(column: ColumnData): void {
    this.router.navigate(['history'], {
      queryParams: {
        symbol: column.symbol,
      },
    });
  }
}
