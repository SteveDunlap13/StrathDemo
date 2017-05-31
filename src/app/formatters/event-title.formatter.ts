
import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';


export class EventTitleFormatter extends CalendarEventTitleFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }


  month(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {hour: 'numeric', minute: 'numeric'}).format(event.start)}</b> ${event.title}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {hour: 'numeric', minute: 'numeric'}).format(event.start)}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {hour: 'numeric', minute: 'numeric'}).format(event.start)}</b> ${event.title}`;
  }
}
