"use strict";
var mock_timecards_1 = require("../models/mock-timecards");
var InMemoryApiService = (function () {
    function InMemoryApiService() {
    }
    InMemoryApiService.prototype.createDb = function () {
        var timesheet = mock_timecards_1.TIMECARDS;
        /*
            [
              { id: '1', employeeid: 3628, weeknum: 2 },
              { id: '2', employeeid: 3628, weeknum: 4 },
              { id: '3', employeeid: 3628, weeknum: 6 },
              { id: '4', employeeid: 3628, weeknum: 7 },
              { id: '5', employeeid: 3628, weeknum: 8 }
            ];
        */
        return { timesheet: timesheet };
    };
    return InMemoryApiService;
}());
exports.InMemoryApiService = InMemoryApiService;
//# sourceMappingURL=inmemory-api.service.js.map