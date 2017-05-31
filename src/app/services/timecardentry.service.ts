

import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TimeCardEntry } from '../models/index';

import { Logger } from '../services/logger.service';


@Injectable()
export class TimecardEntryService {

    path: string = '/api/timecardentries';

    // constructor(private apiService: ApiService, private storeHelperService: StoreHelperService) { }
    //constructor(private http: Http, private storeHelperService: StoreHelperService, private logger: Logger) { }
    constructor(private http: Http, private logger: Logger) { }


    createTimeCardEntry(tce: TimeCardEntry) {
        return this.http.post(this.path, tce).map(res => res.json());
    }

    getTimeCardEntries(): Observable<TimeCardEntry[]> {

        return this.http.get(this.path).map(res => res.json().data);
    }

    updateTimeCardEntry(tce: TimeCardEntry) {
        return this.http.put(this.path + '/' + tce.id, tce).map(res => res.json());
    }
}
