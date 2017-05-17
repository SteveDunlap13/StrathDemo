
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TIMECARDS } from '../models/mock-timecards';


export class InMemoryApiService implements InMemoryDbService {

  createDb() {

    let timesheet = TIMECARDS;

    return { timesheet };
  }
}
