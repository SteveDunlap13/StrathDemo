"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angular_calendar_1 = require("angular-calendar");
var date_fns_1 = require("date-fns");
var Subject_1 = require("rxjs/Subject");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
//import { Store } from '../shared/store';
//import { Subscription } from 'rxjs/Rx';
var event_title_formatter_provider_1 = require("../providers/event-title-formatter.provider");
var timecard_service_1 = require("../services/timecard.service");
var logger_service_1 = require("../services/logger.service");
var TimecardContainer = (function () {
    function TimecardContainer(timecardService, modal, logger) {
        this.timecardService = timecardService;
        this.modal = modal;
        this.logger = logger;
        this.view = 'month';
        this.viewDate = new Date();
        this.refresh = new Subject_1.Subject();
        //events$: Observable<TimeCardEntryEvent[]>;
        this.events = [];
        this.activeDayIsOpen = true;
    }
    TimecardContainer.prototype.ngOnInit = function () {
        this.events = [];
        this.fetchEvents();
    };
    TimecardContainer.prototype.fetchEvents = function () {
        var _this = this;
        this.timecardService.getTimecards().subscribe(function (tce) {
            _this.events = tce.map(function (timecardentry) {
                return {
                    title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                    start: new Date(),
                    color: timecardentry.colour,
                    timecardentry: timecardentry,
                    cssClass: 'test-class',
                    actions: [{
                            label: '<i class="fa fa-fw fa-pencil"></i>',
                            onClick: function (_a) {
                                var event = _a.event;
                                console.log('Event: Edited', event);
                                _this.modalData = { event: event, action: 'Edited' };
                                _this.modal.open(_this.modalContent, { size: 'lg' });
                            }
                        }]
                };
            });
            _this.refresh.next();
            console.log(JSON.stringify(_this.events));
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
    };
    TimecardContainer.prototype.groupEvents = function (cell) {
        var groups = {};
        cell.events.forEach(function (event) {
            groups[event.timecardentry.workTask] = groups[event.timecardentry.workTask] || [];
            groups[event.timecardentry.workTask].push(event);
        });
        cell['eventGroups'] = Object.entries(groups);
    };
    TimecardContainer.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isToday(date)) {
            this.clickedDate = date;
            this.activeDayIsOpen = true;
            return;
        }
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.clickedDate = date;
    };
    TimecardContainer.prototype.handleEvent = function (action, _a) {
        var event = _a.event;
        console.log('Event: ' + action, event);
        this.modalData = { event: event, action: action };
        this.modal.open(this.modalContent, { size: 'lg' });
    };
    TimecardContainer.prototype.addEvent = function () {
        this.refresh.next();
    };
    return TimecardContainer;
}());
__decorate([
    core_1.ViewChild('modalContent'),
    __metadata("design:type", core_1.TemplateRef)
], TimecardContainer.prototype, "modalContent", void 0);
TimecardContainer = __decorate([
    core_1.Component({
        selector: 'timecard-container',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        templateUrl: './timecard.container.html',
        providers: [{
                provide: angular_calendar_1.CalendarEventTitleFormatter,
                useClass: event_title_formatter_provider_1.EventTitleFormatter
            }]
    }),
    __metadata("design:paramtypes", [timecard_service_1.TimecardService, ng_bootstrap_1.NgbModal, logger_service_1.Logger])
], TimecardContainer);
exports.TimecardContainer = TimecardContainer;
//# sourceMappingURL=timecard.container.js.map