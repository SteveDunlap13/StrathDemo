
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

declare var bootbox: any;



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

    private view = 'month';
    private viewDate: Date = new Date();
    private refresh: Subject<any> = new Subject();

    private events: TimeCardEntryEvent[] = [];
    private tceid: number;
    private groupEvents: (day: CalendarMonthViewDay) => void;

    private modalData: {
        action: string,
        timecardentry?: TimeCardEntry
        date?: Date,
        heading: string
    };

    private selectedDay: CalendarMonthViewDay;
    private selectDay: (day: CalendarMonthViewDay) => void;



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

                let worktype = event.timecardentry.worktype.name.length > 15
                    ? event.timecardentry.worktype.name.slice(0, 15) + '...'
                    : event.timecardentry.worktype.name;

                groups[worktype] = groups[worktype] || [];
                groups[worktype].push(event);
            });

            // let's only display the first 3 groups and add a class for UI flagging to note there are more groups
            if ((<any>Object).entries(groups.length > 3)) {
                day.cssClass = 'max-group';
            }
            // Only showing first 3 groups
            day['eventGroups'] = (<any>Object).entries(groups).slice(0, 3);

            // weekend background colours
            if (isWeekend(day.date)) {
                day.cssClass = 'odd-cell';
            }
            // background colour if a day has any events
            if (day.events.length > 0) {
                day.cssClass = 'events-found-cell';
            }
        };


        // used?  TODO: investigate
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
                    draggable: true,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true
                    },
                    actions: [
                        {
                            label: '<i class="fa fa-fw fa-trash red"></i>',
                            onClick: ({event}: {event: TimeCardEntryEvent}): void => {

                                let current: TimeCardEntry = Object.assign({}, (<TimeCardEntryEvent>event).timecardentry);

//                                bootbox.confirm({
//                                    message: 'This is a confirm with custom button text and color! Do you like it?',
//                                    buttons: {
//                                        confirm: { label: 'Yes', className: 'btn-danger' },
//                                        cancel: { label: 'No', className: 'btn-default' }
//                                    },
//                                    callback: function (result) {
//
//                                        //console.log('This was logged in the callback: ' + result);
//                                        if (result) {
//                                            console.log(current.id);
//                                            this.deleteEvent(current.id);
//                                        }
//                                    }
//                                });
                            }
                        },
                        {
                            label: '<i class="fa fa-fw fa-pencil blue"></i>',
                            onClick: ({event}: {event: TimeCardEntryEvent}): void => {

                                let current: TimeCardEntry = Object.assign({}, (<TimeCardEntryEvent>event).timecardentry);

                                this.modalData = {
                                    action: 'Edit',
                                    timecardentry: current,
                                    date: null,
                                    heading: 'Edit'
                                };
                                this.openModal();
                            }
                        }
                    ]
                };

            });

            this.refresh.next();
        });
    }






    // Handle timecard entry click event from week view
    // delete and edit action events are configured in fetchEvents
    handleEvent(action: string, {event}: {event: TimeCardEntryEvent}): void {

        let tce: TimeCardEntry = Object.assign({}, event.timecardentry);

        this.modalData = {
            action: action,
            timecardentry: tce,
            date: null,
            heading: 'View'
        };

        this.openModal();
    }



    openModal(): void {

        if (this.modalData.action !== 'Delete') {

            let modalRef = this.modalService.open(TimeCardEntryComponent, { size: 'lg', backdrop: 'static', keyboard: false });
            modalRef.componentInstance.modalData = this.modalData;

            modalRef.result.then((result) => {
                if (result === 'Saved') {
                    this.fetchEvents();
                }
            }, (reason) => { });
        }
    }



    // Add a new timecard entry
    addEvent(date: Date): void {

        this.modalData = {
            action: 'Add',
            timecardentry: null,
            date: date,
            heading: 'New Event'
        };

        this.openModal();
    }

    deleteEvent(id: number): void {

        this.timecardEntryService.deleteTimeCardEntry(id)
            .subscribe(
                r => {
                    //console.log(result);
                    this.fetchEvents();
                },
                error => console.log(<any>error)
            );
    }



    // Event dragged, event times changed
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {

        event.start = newStart;
        event.end = newEnd;
        (<TimeCardEntryEvent>event).timecardentry.eventstart = newStart;
        (<TimeCardEntryEvent>event).timecardentry.eventend = newEnd;

        this.timecardEntryService.updateTimeCardEntry((<TimeCardEntryEvent>event).timecardentry)
            .subscribe(
                result => {
                    //console.log(result);
                },
                error => console.log(<any>error)
            );

        this.refresh.next();
    }


    // Return a sum of timecard entry hours for a given set of events
    // Used in month badge displays (total and grouped)
    getHours(events: TimeCardEntryEvent[]): number {

        return events.reduce((a, v) => a + v.timecardentry.value, 0);
    }
    // Month view tooltips for a specific event
    getTooltip(tce: TimeCardEntry) {

        return tce.worktype.name + `</br>` + tce.worktask.name;
    }
}
