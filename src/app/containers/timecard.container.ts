
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Subject } from 'rxjs/Subject';


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
    private timecardData; //: Observable<any>;


    view: string = 'month';
    viewDate: Date = new Date();
    events: TimeCardEvent[];// = []; // CalendarEvent[] = [];
    //events$: TimeCardEvent[];
    activeDayIsOpen: boolean = false;
    //refresh: Subject<any> = new Subject();

    //processCalendarEvents(): void {
//
    //    if(this.timecardData === undefined) {
    //        return;
    //    }
//
    //    this.events$ = this.timecardData
    //        .map(res => res)
    //        .map(({results}: {results: TimeCardEvent[]}) => {
    //        return results.map((tc: TimeCardEvent) => {
    //            return {
    //                title: tc.timecard.employeeId,
    //                start: new Date(),
    //                color: COLOURS.yellow,
    //                timecard: tc
    //            };
    //        });
    //    });
    //}

    constructor(private timecardService: TimecardService, private store: Store, private logger: Logger) {

        /*
        this.timecardService.getTimecards()
            .subscribe();

        this.timecardSub = this.store.changes.pluck('timecard_store')
            .subscribe((data: any) => {
                this.timecardData = data;
                this.processCalendarEvents();
            });
        */
    }

    timecardsEvents: TimeCardEvent[];

    ngOnInit() {

        let xxx$ = this.timecardService.fetchTimecards();


        xxx$.subscribe(
            tc => {
                //this.timecards = tc;
                console.log(tc);
                tc.map(
                    wwx => {
                        this.timecardsEvents.push(
                            {
                                title: wwx.employeeId.toString(),
                                start: new Date(),
                                color: COLOURS.red,
                                timecard: wwx
                            }
                        );
                    }
                );
                this.events = this.timecardsEvents;
                //console.log(food);
            },
            () => {},
            () => console.log("completed.")
        );

/*

        this.events$ = this.timecardData
            .map(res => res.json())
            .map(({results}: {results: TimeCardEvent[]}) => {
            return results.map((tc: TimeCardEvent) => {
                return {
                    title: tc.timecard.employeeId,
                    start: new Date(),
                    color: COLOURS.yellow,
                    timecard: tc
                };
            });
        });

 */
    }
    ngOnDestroy() {
        //this.timecardSub.unsubscribe();
    }
}
