
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TIMECARDENTRIES } from '../models/mock-timecardentries';


export class InMemoryApiService implements InMemoryDbService {

  createDb() {

    let timesheet = TIMECARDENTRIES;

    return { timesheet };
  }
}
