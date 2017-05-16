import { Component, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';



@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styles: [`
   .odd-cell {
      background-color: pink !important;
    }
  `]
})
export class AppComponent  {

  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  addCssClass: (day: CalendarMonthViewDay) => void;

  constructor() {
    // an arrow function is used so that `this` is the component instance
    this.addCssClass = (day: CalendarMonthViewDay): void => {
      if (day.date.getDate() % 2 === 1 && day.inMonth) {
        day.cssClass = 'odd-cell';
      }
    };
  }
}
