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
var store_1 = require("../shared/store");
var timecard_service_1 = require("../services/timecard.service");
var logger_service_1 = require("../services/logger.service");
var colours_1 = require("../shared/colours");
var TimecardContainer = (function () {
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
    function TimecardContainer(timecardService, store, logger) {
        this.timecardService = timecardService;
        this.store = store;
        this.logger = logger;
        this.view = 'month';
        this.viewDate = new Date();
        //events$: TimeCardEvent[];
        this.activeDayIsOpen = false;
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
    TimecardContainer.prototype.ngOnInit = function () {
        var _this = this;
        var xxx$ = this.timecardService.fetchTimecards();
        xxx$.subscribe(function (tc) {
            //this.timecards = tc;
            console.log(tc);
            tc.map(function (wwx) {
                _this.timecardsEvents.push({
                    title: wwx.employeeId.toString(),
                    start: new Date(),
                    color: colours_1.COLOURS.red,
                    timecard: wwx
                });
            });
            _this.events = _this.timecardsEvents;
            //console.log(food);
        }, function () { }, function () { return console.log("completed."); });
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
    };
    TimecardContainer.prototype.ngOnDestroy = function () {
        //this.timecardSub.unsubscribe();
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