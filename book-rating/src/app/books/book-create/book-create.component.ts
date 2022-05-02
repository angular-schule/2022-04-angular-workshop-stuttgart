import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13)
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl(''),
    rating: new FormControl(1, [
      Validators.min(1),
      Validators.max(5),
    ]),
    price: new FormControl(0, Validators.min(0)),
  });

  constructor(private bs: BookStoreService, private router: Router) { }

  ngOnInit(): void {}

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.touched && control.invalid;
    // return control ? control.touched && control.invalid : false;
    // return !!(control?.touched && control?.invalid);

    control.
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    // return !!control && !!control.getError(errorCode) && control.touched;
    return !!control && control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    const book: Book = this.bookForm.value;

    this.bs.create(book).subscribe(receivedBook => {
      this.router.navigate(['/books', receivedBook.isbn]); // [routerLink]="['/books', book.isbn]"
      // this.router.navigateByUrl('/books'); // routerLink="/books"
    });
  }

}



/*
TODO:
- Submit-Button ✅
- nur abschicken, wenn alle Felder gültig
- Validierung ✅
- Hinweismeldungen ✅

- HTTP
- bei Erfolg: Wegnavigieren z.B. zur Detailseite


*/
