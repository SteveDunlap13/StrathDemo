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
//import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
var Subject_1 = require("rxjs/Subject");
//import { Store } from '../shared/store';
//import { Subscription } from 'rxjs/Rx';
var event_title_formatter_provider_1 = require("../providers/event-title-formatter.provider");
var timecard_service_1 = require("../services/timecard.service");
var logger_service_1 = require("../services/logger.service");
var TimecardContainer = (function () {
    function TimecardContainer(timecardService, logger) {
        this.timecardService = timecardService;
        this.logger = logger;
        this.view = 'month';
        this.viewDate = new Date();
        this.refresh = new Subject_1.Subject();
    }
    TimecardContainer.prototype.ngOnInit = function () {
        this.fetchEvents();
    };
    // See Context Menu
    // https://mattlewis92.github.io/angular-calendar/#/context-menu
    TimecardContainer.prototype.fetchEvents = function () {
        this.events$ = this.timecardService.getTimecardEntries()
            .map(function (data) {
            return data.map(function (timecardentry) {
                return {
                    title: 'Employee: ' + timecardentry.employee.firstname + ' ' + timecardentry.employee.lastname,
                    start: new Date(),
                    color: timecardentry.colour,
                    timecardentry: timecardentry,
                    cssClass: 'test-class'
                };
            });
        });
    };
    TimecardContainer.prototype.groupEvents = function (cell) {
        var groups = {};
        cell.events.forEach(function (event) {
            groups[event.timecardentry.workTask] = groups[event.timecardentry.workTask] || [];
            groups[event.timecardentry.workTask].push(event);
        });
        cell['eventGroups'] = Object.entries(groups);
    };
    TimecardContainer.prototype.eventClicked = function (_a) {
        var event = _a.event;
        console.log('Event clicked', event);
    };
    return TimecardContainer;
}());
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
    __metadata("design:paramtypes", [timecard_service_1.TimecardService, logger_service_1.Logger])
], TimecardContainer);
exports.TimecardContainer = TimecardContainer;
//# sourceMappingURL=timecard.container.js.map