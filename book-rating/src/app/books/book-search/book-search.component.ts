import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  results$: Observable<Book[]>;
  loading = false;

  searchControl = new FormControl('');

  constructor(private bs: BookStoreService) {
    const input$: Observable<string> = this.searchControl.valueChanges;

    this.results$ = input$.pipe(
      filter(term => term.length >= 3),
      debounceTime(250),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => this.bs.search(term)),
      tap(() => this.loading = false)
    );
  }

  ngOnInit(): void {
  }

}
