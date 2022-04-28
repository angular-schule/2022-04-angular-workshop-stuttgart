import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    // Ersatzobjekt für den BookRatingService
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // BRS ersetzen: Wenn jemand BRS anfordert, wird stattdessen
        // der Wert aus ratingMock ausgeliefert
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke service.rateUp() for doRateUp()', () => {
    // Arrange
    const book: Book = {
      isbn: '2134',
      title: '',
      description: '',
      rating: 3,
      price: 3
    };

    const rs = TestBed.inject(BookRatingService); // eigentlich ist das der ratingMock
    spyOn(rs, 'rateUp').and.callThrough(); // originale Methode von rs wird trotzdem aufgerufen

    // Act
    component.doRateUp(book);

    // Assert
    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
