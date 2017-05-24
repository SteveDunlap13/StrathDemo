
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalendarMonthViewDay, CalendarEvent, CalendarEventAction, 
         CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Subject } from 'rxjs/Subject';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


//import { Store } from '../shared/store';
//import { Subscription } from 'rxjs/Rx';
import { EventTitleFormatter } from '../providers/event-title-formatter.provider';
import { COLOURS } from '../shared/colours';

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
    activeDayIsOpen: boolean = true;
    clickedDate: Date;

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
                        timecardentry: timecardentry,
                        cssClass: 'test-class',
                        actions: [{
                            label: '<i class="fa fa-fw fa-pencil"></i>',
                            onClick: ({event}: {event: CalendarEvent}): void => {
                                this.handleEvent('Edited', event);
                            }
                        }]
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





    dayClicked({date, events}: {date: Date, events: TimeCardEntryEvent[]}): void {

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.clickedDate = date;
    }


    handleEvent(action: string, {event}: {event: CalendarEvent}): void {

        console.log('Event: ' + action, event);
        //this.modalData = {event.event, action};
        //this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {

        //this.events.push({
        //    title: 'New event',
        //    start: startOfDay(new Date()),
        //    end: endOfDay(new Date()),
        //    color: colors.red,
        //    draggable: true,
        //    resizable: {
        //        beforeStart: true,
        //        afterEnd: true
        //    }
        //});
        this.refresh.next();
    }
}