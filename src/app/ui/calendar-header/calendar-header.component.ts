import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CalendarDateFormatter } from 'angular-calendar';
import { CustomCalendarDateFormatter } from '../../formatters/index';


@Component({
  selector: 'calendar-header',
  templateUrl: './calendar-header.component.html',
  providers: [{
      provide: CalendarDateFormatter,
      useClass: CustomCalendarDateFormatter
  }]
})
export class CalendarHeaderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
