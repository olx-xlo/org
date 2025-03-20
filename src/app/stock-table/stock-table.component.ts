import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockColumnComponent } from '../stock-column/stock-column.component';

@Component({
  selector: 'app-stock-table',
  imports: [CommonModule, StockColumnComponent],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StockTableComponent {}
