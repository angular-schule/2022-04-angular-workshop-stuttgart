import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL / Synchroner Weg
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH / Asynchroner Weg
    // TODO: Verschachtelte Subscriptions vermeiden (wegen Race Condition!)
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion (hier Ausnahmefall!)

      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
      });
    });
  }

  /*
  HTTP: BookStoreService.getSingle()
  Buch anzeigen
  */

  ngOnInit(): void {
  }

}
