import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.touched && control.invalid;
    // return control ? control.touched && control.invalid : false;
    // return !!(control?.touched && control?.invalid);
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    // return !!control && !!control.getError(errorCode) && control.touched;
    return !!control && control.hasError(errorCode) && control.touched;
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
