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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
require("rxjs/add/observable/throw");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        this.api_url = 'http://localhost:3458';
    }
    ApiService.prototype.getJson = function (response) {
        return response.json();
    };
    ApiService.prototype.checkForError = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error['response'] = response;
            console.error(error);
            throw error;
        }
    };
    ApiService.prototype.get = function (path) {
        return this.http.get("" + this.api_url + path, { headers: this.headers })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson);
    };
    ApiService.prototype.post = function (path, body) {
        return this.http.post("" + this.api_url + path, JSON.stringify(body), { headers: this.headers })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson);
    };
    ApiService.prototype.delete = function (path) {
        return this.http.delete("" + this.api_url + path, { headers: this.headers })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson);
    };
    ApiService.prototype.setHeaders = function (headers) {
        var _this = this;
        Object.keys(headers).forEach(function (header) { return _this.headers.set(header, headers[header]); });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map