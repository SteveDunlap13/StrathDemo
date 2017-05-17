"use strict";
var mock_timecards_1 = require("../models/mock-timecards");
var InMemoryApiService = (function () {
    function InMemoryApiService() {
    }
    InMemoryApiService.prototype.createDb = function () {
        var timesheet = mock_timecards_1.TIMECARDS;
        return { timesheet: timesheet };
    };
    return InMemoryApiService;
}());
exports.InMemoryApiService = InMemoryApiService;
//# sourceMappingURL=inmemory-api.service.js.map