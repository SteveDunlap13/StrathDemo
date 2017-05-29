
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { CalendarMonthViewDay, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, 
         startOfWeek, endOfWeek, startOfDay, endOfDay, 
         format, isToday, isWeekend, addDays, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { EventTitleFormatter } from '../providers/event-title-formatter.provider';
import { COLOURS } from '../shared/colours';

import { TimecardService } from '../services/timecard.service';
import { Logger } from '../services/logger.service';

import { TimeCardEntry, TimeCardEntryEvent } from '../models/timecardentry';


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

    events: TimeCardEntryEvent[] = [];
    tceid: number;
    groupEvents: (day: CalendarMonthViewDay) => void;

    modalData: {
        action: string,
        event: TimeCardEntryEvent
    };

    constructor(private timecardService: TimecardService, private modal: NgbModal, private logger: Logger) { }

    ngOnInit() {

        this.fetchEvents();


        // Group events for badge indicators; set month cell css
        this.groupEvents = (day: CalendarMonthViewDay): void => {

            const groups: any = {};
            day.events.forEach((event: TimeCardEntryEvent) => {
                groups[event.timecardentry.worktask] = groups[event.timecardentry.worktask] || [];
                groups[event.timecardentry.worktask].push(event);
            });
            day['eventGroups'] = (<any>Object).entries(groups);

            if (isWeekend(day.date)) {//.getDate() % 2 === 1 && cell.inMonth) {
                day.cssClass = 'odd-cell';
            }
            if (day.events.length > 0) {
                day.cssClass = 'events-found-cell';
            }
        };
    }



    fetchEvents() {

        this.timecardService.getTimeCardEntries().subscribe(tce => {

            this.events = tce.map((timecardentry: TimeCardEntry) => {

                this.tceid = timecardentry.id;

                return <TimeCardEntryEvent> {

                    title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                    start: new Date(timecardentry.eventstart),
                    end: new Date(timecardentry.eventend),
                    color: timecardentry.colour,
                    timecardentry: timecardentry,
                    cssClass: 'test-class',
                    draggable: true,
                    resizable: {
                        beforeStart: true, // this allows you to configure the sides the event is resizable from
                        afterEnd: true
                    },
                    allDay: timecardentry.allDay,
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
    }






    // Open modal dialog for click or edit event
    handleEvent(action: string, {event}: {event: TimeCardEntryEvent}): void {

        console.log('Event: ' + action, event);

        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }



    // Add a new timecard entry
    addEvent(date: Date): void {

        this.tceid++;

        // add event to api
        this.timecardService.createTimeCardEntry({
            id: this.tceid,
            employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
            eventstart: date,
            eventend: addHours(date, 1),
            worktask: 'Development',
            value: 7.5,
            colour: COLOURS.red,
            badgecolour: 'red',
            allDay: false
        }).subscribe(res => console.log(JSON.stringify(res)));

        this.fetchEvents();
    }



    // Event dragged
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {

        event.start = newStart;
        event.end = newEnd;
        (<TimeCardEntryEvent>event).timecardentry.eventstart = newStart;
        (<TimeCardEntryEvent>event).timecardentry.eventend = newEnd;

        this.timecardService.updateTimeCardEntry((<TimeCardEntryEvent>event).timecardentry);
            //.subscribe(res => console.log(JSON.stringify(res)));

        this.refresh.next();
    }
}
