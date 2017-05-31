
import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { TimeCardEntryEvent } from '../models/index';


export class EventTitleFormatter extends CalendarEventTitleFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }


  week(event: TimeCardEntryEvent): string {
    //return `<b>${new Intl.DateTimeFormat(this.locale, {hour: 'numeric', minute: 'numeric'}).format(event.start)}</b> ${event.title}`;
    return `<b>${event.timecardentry.worktype.name}</b>`;

    // display work type desc or pi name /w hours, multiline
  }
}
