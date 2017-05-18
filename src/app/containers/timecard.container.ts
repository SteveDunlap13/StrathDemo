
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalendarMonthViewDay, CalendarEventTitleFormatter } from 'angular-calendar';
//import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Subject } from 'rxjs/Subject';


//import { Store } from '../shared/store';
//import { Subscription } from 'rxjs/Rx';
import { EventTitleFormatter } from '../providers/event-title-formatter.provider';

import { TimecardService } from '../services/timecard.service';
import { Logger } from '../services/logger.service';

import { TimeCardEntry, TimeCardEntryEvent } from '../models/timecard';


@Component({
    selector: 'timecard-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './timecard.container.html',
    providers: [{
        provide: CalendarEventTitleFormatter,
        useClass: EventTitleFormatter
    }]
})
export class TimecardContainer implements OnInit {

    view: string = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();

    events$: Observable<TimeCardEntryEvent[]>;

    constructor(private timecardService: TimecardService, private logger: Logger) { }
    ngOnInit() {
        this.fetchEvents();
    }

// See Context Menu
// https://mattlewis92.github.io/angular-calendar/#/context-menu

    fetchEvents() {

        this.events$ = this.timecardService.getTimecardEntries()
            .map(data => {
                return data.map((timecardentry: TimeCardEntry) => {
                    return {
                        title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                        start: new Date(),
                        color: timecardentry.colour,
                        timecardentry: timecardentry,
                        cssClass: 'test-class'
                    };
                });
            });
    }

    groupEvents(cell: CalendarMonthViewDay): void {

        const groups: any = {};
        cell.events.forEach((event: TimeCardEntryEvent) => {
        groups[event.timecardentry.workTask] = groups[event.timecardentry.workTask] || [];
        groups[event.timecardentry.workTask].push(event);
        });
        cell['eventGroups'] = (<any>Object).entries(groups);
    }


    eventClicked({event}: {event: TimeCardEntryEvent}): void {
        console.log('Event clicked', event);
    }
}
