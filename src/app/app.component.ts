import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  imports: [
    NxWelcomeComponent,
    RouterModule,
    StockTableComponent,
    SearchBarComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'org';
}
