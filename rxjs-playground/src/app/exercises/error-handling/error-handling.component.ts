import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Observable, from } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      catchError(err => {
        // Fehler ersetzen
        // return of('Hallo', 'Welt');
        /*return new Observable(sub => {
          sub.next('Hallo');
        })*/

        // Fehler weiterwerfen
        // return throwError(() => 'FEHLER!');
        throw 'BÖSER FEHLER!';

        // Fehler ignorieren
        // return new Observable(sub => sub.complete());
        // return new Observable();
        // return of();
        // return from([]);
        // return EMPTY;
      }),
      retry(4)
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('COMPLETE')
    });
  }
}
