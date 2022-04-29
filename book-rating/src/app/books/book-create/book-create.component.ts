import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl(1),
    price: new FormControl(0),
  });

  constructor() { }

  ngOnInit(): void {
  }

}



/*
TODO:
- Submit-Button
- nur abschicken, wenn alle Felder gültig
- Validierung
- Hinweismeldungen

- HTTP
- bei Erfolg: Wegnavigieren z.B. zur Detailseite


*/
