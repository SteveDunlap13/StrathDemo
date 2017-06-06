
import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { TimeCardEntryEvent } from '../models/index';
import { GROOTS } from '../shared/constants';


export class EventTitleFormatter extends CalendarEventTitleFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }


  week(event: TimeCardEntryEvent): string {

    let worktype = event.timecardentry.worktype.name.length > GROOTS.EVENTHEADINGLIMIT
        ? event.timecardentry.worktype.name.slice(0, GROOTS.EVENTHEADINGLIMIT) + '...'
        : event.timecardentry.worktype.name;

    return `<b>${worktype}</b> (${event.timecardentry.value})`;
  }

  weekTooltip(event: TimeCardEntryEvent): string {

    return `<b>${event.timecardentry.worktype.name}</br>${event.timecardentry.worktask.name}</b>`;
  }
}
