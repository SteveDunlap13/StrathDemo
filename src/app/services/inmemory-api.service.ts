
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TIMECARDENTRIES, WORKTYPES, PIWORKTYPES, WORKTASKS } from '../models/index';


export class InMemoryApiService implements InMemoryDbService {

  createDb() {

    let timecardentries = TIMECARDENTRIES;
    let worktypes = WORKTYPES;
    let piworktypes = PIWORKTYPES;
    let worktasks = WORKTASKS;

    return { timecardentries, worktypes, piworktypes, worktasks };
  }
}
