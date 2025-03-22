import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ColumnData } from '../../../shared/models/column-data.model';

@Component({
  selector: 'app-stock-table',
  imports: [CommonModule, TranslateModule],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StockTableComponent {
  @Input() columnData!: ColumnData;
}
/**
 *
 * Symbol	Name	Price	Changes	Market Cap	Last Trade
 */
