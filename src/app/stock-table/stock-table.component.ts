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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QueryData } from 'shared/models/query-data.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { query, stagger } from '@angular/animations';
import { ColumnData } from 'shared/models/column-data.model';
import { StockService } from 'src/services/stock.service';
import { NumberSuffixPipe } from 'src/pipes/number-suffix.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatrixEffectComponent } from '../matrix-effect/matrix-effect.component';
import { EmptyComponent } from '../empty/empty.component';
import { LoaderComponent } from '../loader/loader.component';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-stock-table',
  imports: [
    CommonModule,
    TranslateModule,
    NumberSuffixPipe,
    MatChipsModule,
    MatrixEffectComponent,
    EmptyComponent,
    LoaderComponent,
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

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly stockService: StockService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._initColumnData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['queriedData']) {
      this._initColumnData();
    }
  }

  public handleColumnClick(column: ColumnData) {
    this.columnClicked.emit(column);
  }

  private _initColumnData() {
    if (!this.queriedData) return;

    this.columnData = this.queriedData.map((dataPoint) => ({
      symbol: dataPoint.symbol,
      name: dataPoint.name,
      price: undefined,
      changes: undefined,
      marketCap: undefined,
    }));

    const stockDataObservables: Observable<ColumnData>[] = this.columnData.map(
      (column) =>
        this.stockService
          .getStockData(column.symbol)
          .pipe(
            map((stockData) =>
              this.stockService.transformStockDataToColumnData(stockData)
            )
          )
    );

    combineLatest(stockDataObservables).subscribe((updatedColumns) => {
      this.columnData = updatedColumns;
      this.changeDetectorRef.markForCheck();
    });
  }
}
