import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('A', 'B', 'C', 'D')
    // from(['Hallo', 'Welt', 'Angular'])
    // interval(1000) // ---0---1---2---3---4--- ...
    // timer(2000) // ------0|
    // timer(0, 1000) // 0---1---2---3---4--- ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE'),
    });

    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [10, 20, 30, 40, 50].filter(e => e > 25) // [30, 40, 50]


    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(5);
      sub.next(6);
      sub.next(9);

      setTimeout(() => {
        sub.next(7);
      }, 2000)

      setTimeout(() => {
        sub.complete();
      }, 4000)


      sub.next(6);
      sub.next(9);
    }

    const obs: Observer<number> = {
      next: e => console.log(e),
      error: err => console.error(err),
      complete: () => console.log('COMPLETE')
    }
    // producer(obs);

    const myObservable$ = new Observable(producer);
    // myObservable$.subscribe(obs);



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
