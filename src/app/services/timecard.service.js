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
// import { ApiService } from './api.service';
var http_1 = require("@angular/http");
require("rxjs/Rx");
var store_helper_service_1 = require("./store-helper.service");
var logger_service_1 = require("../services/logger.service");
var TimecardService = (function () {
    // constructor(private apiService: ApiService, private storeHelperService: StoreHelperService) { }
    function TimecardService(http, storeHelperService, logger) {
        this.http = http;
        this.storeHelperService = storeHelperService;
        this.logger = logger;
        this.path = '/api/timesheet';
    }
    /*
        completeNote(note) {
            return this.apiService.delete(`${this.path}/${note.id}`)
                .do(res => this.storeHelperService.findAndDelete('timecard_store', res.id));
        }
    
        createNote(note) {
            return this.apiService.post(this.path, note)
                .do(savedNote => this.storeHelperService.add('timecard_store', savedNote));
        }
    */
    TimecardService.prototype.getTimecards = function () {
        // return this.apiService.get(this.path)
        //    .do(res => this.storeHelperService.update('timecard_store', res.data));
        var _this = this;
        return this.http.get(this.path)
            .do(function (res) { return _this.storeHelperService.update('timecard_store', res.json().data); }); // .do(res => this.logger.log(JSON.stringify(res.json().data)));
    };
    return TimecardService;
}());
TimecardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, store_helper_service_1.StoreHelperService, logger_service_1.Logger])
], TimecardService);
exports.TimecardService = TimecardService;
//# sourceMappingURL=timecard.service.js.map