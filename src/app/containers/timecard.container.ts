
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { CalendarMonthViewDay, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth,
         startOfWeek, endOfWeek, startOfDay, endOfDay,
         format, isToday, isWeekend, addDays, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { EventTitleFormatter } from '../formatters/index';
import { COLOURS } from '../shared/colours';

import { TimecardEntryService } from '../services/index';
import { Logger } from '../services/logger.service';

import { TimeCardEntry, TimeCardEntryEvent } from '../models/index';
import { TimeCardEntryComponent } from '../ui/timecard-entry/timecard-entry.component';


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

    view = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();

    events: TimeCardEntryEvent[] = [];
    tceid: number;
    groupEvents: (day: CalendarMonthViewDay) => void;

    modalData: {
        action: string,
        event: TimeCardEntryEvent,
        timecardentry: TimeCardEntry
    };

    selectedDay: CalendarMonthViewDay;
    selectDay: (day: CalendarMonthViewDay) => void;



    constructor(private timecardEntryService: TimecardEntryService,
                private modal: NgbModal,
                private logger: Logger,
                private modalService: NgbModal) { }

    ngOnInit() {

        this.fetchEvents();


        // Group events for badge indicators; set month cell css
        this.groupEvents = (day: CalendarMonthViewDay): void => {

            const groups: any = {};
            day.events.forEach((event: TimeCardEntryEvent) => {
                groups[event.timecardentry.worktype.name] = groups[event.timecardentry.worktype.name] || [];
                groups[event.timecardentry.worktype.name].push(event);
            });
            day['eventGroups'] = (<any>Object).entries(groups);

            if (isWeekend(day.date)) {
                day.cssClass = 'odd-cell';
            }
            if (day.events.length > 0) {
                day.cssClass = 'events-found-cell';
            }
        };


        this.selectDay = (day: CalendarMonthViewDay): void => {
            if (this.selectedDay && day.date.getTime() === this.selectedDay.date.getTime()) {
                day.cssClass = 'cal-week-selected';
            }
        };
    }



    fetchEvents(): void {

        this.timecardEntryService.getTimeCardEntries().subscribe(tce => {

            this.events = tce.map((timecardentry: TimeCardEntry) => {

                this.tceid = timecardentry.id;

                return <TimeCardEntryEvent> {

                    title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                    start: new Date(timecardentry.eventstart),
                    end: new Date(timecardentry.eventend),
                    color: timecardentry.colour,
                    timecardentry: timecardentry,
                    //cssClass: 'test-class',
                    draggable: true,
                    resizable: {
                        beforeStart: true, // this allows you to configure the sides the event is resizable from
                        afterEnd: true
                    },
                    actions: [{
                        label: '<i class="fa fa-fw fa-pencil"></i>',
                        onClick: ({event}: {event: TimeCardEntryEvent}): void => {

                            //console.log('Event: Edited', event.timecardentry);
                            this.modalData = { action: 'Edited',
                                               event: (<TimeCardEntryEvent>event),
                                               timecardentry: (<TimeCardEntryEvent>event).timecardentry };

                            this.openModal();
                        }
                    }]
                };

            });

            this.refresh.next();
        });
    }






    // Handle timecard entry click event
    handleEvent(action: string, {event}: {event: TimeCardEntryEvent}): void {

        //console.log('Event: ' + action, event);
        this.modalData = { action: action,
                            event: event,
                            timecardentry: event.timecardentry };

        this.openModal();
    }



    openModal(): void {

        const modalRef = this.modalService.open(TimeCardEntryComponent, { size: 'lg' });
        modalRef.componentInstance.modalData = this.modalData;
    }



    // Add a new timecard entry
    addEvent(date: Date): void {

//        this.tceid++;
//
//        // add event to api
//        this.timecardService.createTimeCardEntry({
//            id: this.tceid,
//            employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
//            eventstart: date,
//            eventend: addHours(date, 1),
//            worktask: 'Development',
//            value: 7.5,
//            colour: COLOURS.red,
//            badgecolour: COLOURS.red.primary
//        }).subscribe(res => console.log(JSON.stringify(res)));

//        this.fetchEvents();
    }



    // Event dragged
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {

        event.start = newStart;
        event.end = newEnd;
        (<TimeCardEntryEvent>event).timecardentry.eventstart = newStart;
        (<TimeCardEntryEvent>event).timecardentry.eventend = newEnd;

        this.timecardEntryService.updateTimeCardEntry((<TimeCardEntryEvent>event).timecardentry);
            //.subscribe(res => console.log(JSON.stringify(res)));

        this.refresh.next();
    }


    // Return a sum of timecard entry hours for a given set of events
    // Used in month badge displays (total and grouped)
    getHours(events: TimeCardEntryEvent[]): number {

        return events.reduce((a, v) => a + v.timecardentry.value, 0);
    }
}
