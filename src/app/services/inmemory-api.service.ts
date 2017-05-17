
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TIMECARDS } from '../models/mock-timecards';


export class InMemoryApiService implements InMemoryDbService {

  createDb() {

    let timesheet = TIMECARDS;
/*
    [
      { id: '1', employeeid: 3628, weeknum: 2 },
      { id: '2', employeeid: 3628, weeknum: 4 },
      { id: '3', employeeid: 3628, weeknum: 6 },
      { id: '4', employeeid: 3628, weeknum: 7 },
      { id: '5', employeeid: 3628, weeknum: 8 }
    ];
*/

    return {timesheet};
  }
}
