import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockColumnComponent } from './stock-column.component';

describe('StockColumnComponent', () => {
  let component: StockColumnComponent;
  let fixture: ComponentFixture<StockColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
