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
var date_fns_1 = require("date-fns");
var store_1 = require("../shared/store");
var timecard_service_1 = require("../services/timecard.service");
var logger_service_1 = require("../services/logger.service");
var colours_1 = require("../shared/colours");
var TimecardContainer = (function () {
    function TimecardContainer(timecardService, store, logger) {
        var _this = this;
        this.timecardService = timecardService;
        this.store = store;
        this.logger = logger;
        this.timecardData = [];
        this.calendarEvents = [];
        this.view = 'month';
        this.viewDate = new Date();
        this.events = []; // CalendarEvent[] = [];
        this.activeDayIsOpen = false;
        this.timecardService.getTimecards()
            .subscribe();
        this.timecardSub = this.store.changes.pluck('timecard_store')
            .subscribe(function (data) { return _this.processTimecardData(data); });
    }
    TimecardContainer.prototype.processTimecardData = function (data) {
        this.timecardData = data;
        if (this.timecardData === undefined) {
            return;
        }
        var getStart = {
            month: date_fns_1.startOfMonth,
            week: date_fns_1.startOfWeek,
            day: date_fns_1.startOfDay
        }[this.view];
        var getEnd = {
            month: date_fns_1.endOfMonth,
            week: date_fns_1.endOfWeek,
            day: date_fns_1.endOfDay
        }[this.view];
        // figure out how to process timecarddata as an obervable
        for (var i = 0; i < this.timecardData.length; i++) {
            var xxx = {
                title: this.timecardData[i].employeeId,
                start: new Date(),
                color: colours_1.COLOURS.yellow,
                timecard: this.timecardData[i]
            };
            this.events.push(xxx);
            console.log('\n');
            this.logger.log(JSON.stringify(xxx));
        }
    };
    TimecardContainer.prototype.ngOnDestroy = function () {
        this.timecardSub.unsubscribe();
    };
    return TimecardContainer;
}());
TimecardContainer = __decorate([
    core_1.Component({
        selector: 'timecard-container',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        templateUrl: './timecard.container.html'
    }),
    __metadata("design:paramtypes", [timecard_service_1.TimecardService, store_1.Store, logger_service_1.Logger])
], TimecardContainer);
exports.TimecardContainer = TimecardContainer;
//# sourceMappingURL=timecard.container.js.map