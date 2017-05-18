
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//import { CalendarEvent } from 'angular-calendar';
//import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Subject } from 'rxjs/Subject';


//import { Store } from '../shared/store';
//import { Subscription } from 'rxjs/Rx';
import { TimecardService } from '../services/timecard.service';
import { Logger } from '../services/logger.service';

import { TimeCardEntry, TimeCardEntryEvent } from '../models/timecard';


@Component({
    selector: 'timecard-container',
    templateUrl: './timecard.container.html'
})
export class TimecardContainer implements OnInit {

    view: string = 'month';
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = false;
    refresh: Subject<any> = new Subject();

    events$: Observable<TimeCardEntryEvent[]>;

    constructor(private timecardService: TimecardService, private logger: Logger) { }
    ngOnInit() {
        this.fetchEvents();
    }


    fetchEvents() {

        this.events$ = this.timecardService.getTimecardEntries()
            .map(data => {
                return data.map((timecardentry: TimeCardEntry) => {
                    return {
                        title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                        start: new Date(),
                        color: timecardentry.colour,
                        timecardentry: timecardentry
                    };
                });
            });
    }
}
