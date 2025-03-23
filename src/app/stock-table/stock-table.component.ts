import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QueryData } from 'shared/models/query-data.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { query, stagger } from '@angular/animations';
import { ColumnData } from 'shared/models/column-data.model';
import { StockService } from 'src/services/stock.service';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyComponent } from '../empty/empty.component';
import { LoaderComponent } from '../loader/loader.component';
import { catchError, EMPTY, forkJoin, map, Observable, Subject } from 'rxjs';
import { NumberSuffixPipe } from 'src/pipes/number-suffix.pipe';

@Component({
  selector: 'app-stock-table',
  imports: [
    CommonModule,
    TranslateModule,
    MatChipsModule,
    EmptyComponent,
    LoaderComponent,
    NumberSuffixPipe,
  ],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('tableRows', [
      transition(':enter', [
        query(
          'tr',
          [
            style({ opacity: 0 }),
            stagger('50ms', [animate('300ms', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class StockTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() queriedData: QueryData[] | null = null;
  @Output() columnClicked: EventEmitter<ColumnData> = new EventEmitter();

  columnData: ColumnData[] = [];
  paginatedColumnData: ColumnData[] = [];
  pageSize = 10;
  currentPageIndex = 0;
  isLoadingPage = false;

  columnMap: Map<string, ColumnData> = new Map();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly stockService: StockService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._resetAndLoad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['queriedData']) {
      this._resetAndLoad();
    }
  }

  private _resetAndLoad(): void {
    this.columnMap.clear();
    this.columnData = [];
    this.currentPageIndex = 0;
    this._loadMoreData();
  }

  public handleColumnClick(column: ColumnData) {
    this.columnClicked.emit(column);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      this._loadMoreData();
    }
  }

  private _loadMoreData(): void {
    if (
      !this.queriedData ||
      this.isLoadingPage ||
      this.columnData.length >= this.queriedData.length
    )
      return;
    this.isLoadingPage = true;

    const newData = this.queriedData.slice(
      this.currentPageIndex * this.pageSize,
      (this.currentPageIndex + 1) * this.pageSize
    );

    //Set the columnMap item, so they can be seen by the user, while still data is being fetched
    newData.forEach((dataPoint) => {
      this.columnMap.set(dataPoint.symbol, {
        symbol: dataPoint.symbol,
        name: dataPoint.name,
        price: undefined,
        changes: undefined,
        marketCap: undefined,
      });
    });

    this.changeDetectorRef.markForCheck();

    // Create observables for each new item to fetch stock data
    const stockDataObservables: Observable<ColumnData>[] = newData.map(
      (column) =>
        this.stockService.getStockData(column.symbol).pipe(
          map((stockData) =>
            this.stockService.transformStockDataToColumnData(
              stockData,
              column.symbol
            )
          ),
          catchError((error) => {
            this.stockService.displayErrorToast(
              `No data for ${column.symbol} today... 🚫📅📊🤷‍♂️`
            );
            console.error(error);
            return EMPTY;
          })
        )
    );

    forkJoin(stockDataObservables).subscribe((results: ColumnData[]) => {
      results.forEach((column) => this.columnMap.set(column.symbol, column));
      this.columnData = [...this.columnMap.values()];
      this.isLoadingPage = false;
      this.currentPageIndex++;
      this.changeDetectorRef.markForCheck();
    });
  }
}
