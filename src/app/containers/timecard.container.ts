
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalendarMonthViewDay, CalendarEvent, CalendarEventAction, 
         CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format, isToday } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();

    //events$: Observable<TimeCardEntryEvent[]>;
    events: TimeCardEntryEvent[] = [];

    activeDayIsOpen: boolean = true;
    clickedDate: Date;

    modalData: {
        action: string,
        event: TimeCardEntryEvent
    };

    constructor(private timecardService: TimecardService, private modal: NgbModal, private logger: Logger) { }

    ngOnInit() {

        this.events = [];
        this.fetchEvents();
    }



    fetchEvents() {

        this.timecardService.getTimecards().subscribe(tce => {

            this.events = tce.map((timecardentry: TimeCardEntry) => {

                return <TimeCardEntryEvent> {

                    title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                    start: new Date(),
                    color: timecardentry.colour,
                    timecardentry: timecardentry,
                    cssClass: 'test-class',
                    actions: [{
                        label: '<i class="fa fa-fw fa-pencil"></i>',
                        onClick: ({event}: {event: CalendarEvent}): void => {

                            console.log('Event: Edited', event);

                            this.modalData = {event: <TimeCardEntryEvent> event, action: 'Edited'};
                            this.modal.open(this.modalContent, {size: 'lg'});
                        }
                    }]
                };

            });

            this.refresh.next();
            //console.log(JSON.stringify(this.events));
        });

//        this.events$ = this.timecardService.getTimecardEntries()
//            .map(data => {
//                return data.map((timecardentry: TimeCardEntry) => {
//                    return {
//                        title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
//                        start: new Date(),
//                        color: timecardentry.colour,
//                        timecardentry: timecardentry,
//                        cssClass: 'test-class',
//                        actions: [{
//                            label: '<i class="fa fa-fw fa-pencil"></i>',
//                            onClick: ({event}: {event: CalendarEvent}): void => {
//
//                                console.log('Event: Edited', event);
//
//                                this.modalData = {event: <TimeCardEntryEvent> event, action: 'Edited'};
//                                this.modal.open(this.modalContent, {size: 'lg'});
//                            }
//                        }]
//                    };
//                });
//            });
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

        if (isToday(date)) {

            this.clickedDate = date;
            this.activeDayIsOpen = true;
            return;
        }

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


    handleEvent(action: string, {event}: {event: TimeCardEntryEvent}): void {

        console.log('Event: ' + action, event);

        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {

        this.refresh.next();
    }
}
