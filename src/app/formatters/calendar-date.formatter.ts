
import { LOCALE_ID, Inject } from '@angular/core';

import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { format } from 'date-fns';
import { GROOTS } from '../shared/constants';


export class CustomCalendarDateFormatter extends CalendarDateFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  public weekViewTitle({date, locale}: DateFormatterParams): string {

    return format(date, GROOTS.WEEKVIEWTITLE, {locale: locale});
  }
}
