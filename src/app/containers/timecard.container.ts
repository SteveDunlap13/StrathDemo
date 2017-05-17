
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';


import { Store } from '../shared/store';
import { Subscription } from 'rxjs/Rx';
import { TimecardService } from '../services/timecard.service';
import { Logger } from '../services/logger.service';

import { COLOURS } from '../shared/colours';
import { TimeCard, TimeCardEvent } from '../models/timecard';


@Component({
    selector: 'timecard-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './timecard.container.html'
})
export class TimecardContainer implements OnDestroy {

    private timecardSub: Subscription;
    private timecardData = [];
    private calendarEvents = [];


    view: string = 'month';
    viewDate: Date = new Date();
    events: TimeCardEvent[] = []; // CalendarEvent[] = [];
    events$: Observable<TimeCardEvent[]>;
    activeDayIsOpen: boolean = false;


    processTimecardData(data): void {

        this.timecardData = data;

        if (this.timecardData === undefined) {
            return;
        }


        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

// figure out how to process timecarddata as an obervable


        for (let i = 0; i < this.timecardData.length; i++) {

            let xxx = {
                title: this.timecardData[i].employeeId,
                start: new Date(),//tc.weekNum),
                color: COLOURS.yellow,
                timecard: this.timecardData[i]
            };

            this.events.push(xxx);

            console.log('\n');
            this.logger.log(JSON.stringify(xxx));
        }
    }





    constructor(private timecardService: TimecardService, private store: Store, private logger: Logger) {

        this.timecardService.getTimecards()
            .subscribe();

        this.timecardSub = this.store.changes.pluck('timecard_store')
            .subscribe((data: any) => this.processTimecardData(data));
    }
    ngOnDestroy() {
        this.timecardSub.unsubscribe();
    }
}
