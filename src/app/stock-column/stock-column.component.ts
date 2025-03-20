import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-column',
  imports: [CommonModule],
  templateUrl: './stock-column.component.html',
  styleUrl: './stock-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StockColumnComponent {}
