

import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TimeCardEntry } from '../models/timecard';

//import { StoreHelperService } from './store-helper.service';
import { Logger } from '../services/logger.service';


@Injectable()
export class TimecardService {

    path: string = '/api/timesheet';

    // constructor(private apiService: ApiService, private storeHelperService: StoreHelperService) { }
    //constructor(private http: Http, private storeHelperService: StoreHelperService, private logger: Logger) { }
    constructor(private http: Http, private logger: Logger) { }


/*
    completeNote(note) {
        return this.apiService.delete(`${this.path}/${note.id}`)
            .do(res => this.storeHelperService.findAndDelete('timecard_store', res.id));
    }

    createNote(note) {
        return this.apiService.post(this.path, note)
            .do(savedNote => this.storeHelperService.add('timecard_store', savedNote));
    }

    xxxxxgetTimecards() {

        // return this.apiService.get(this.path)
        //    .do(res => this.storeHelperService.update('timecard_store', res.data));

        //return this.http.get(this.path).do(res => this.storeHelperService.update('timecard_store', res.json().data));
            // .do(res => this.logger.log(JSON.stringify(res.json().data)));
    }
*/

    getTimecards(): Observable<TimeCardEntry[]> {

        return this.http.get(this.path).map(res => res.json().data);
    }
    getTimecardEntries() {
        return this.http.get(this.path)
            .map(r => r.json().data);
    }
}
