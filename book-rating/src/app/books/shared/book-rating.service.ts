import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < 5 ? book.rating + 1 : book.rating
    };

    // const copy = { ...book };
    // copy.rating++; // möglichst vermeiden, weil mutable
    // return copy;
  }

  rateDown(book: Book): Book {
    if (book.rating > 1) {
      return {
        ...book,
        rating: book.rating - 1
      };
    } else {
      return book;
    }
  }
}


