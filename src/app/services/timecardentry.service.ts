

import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TimeCardEntry } from '../models/index';

import { Logger } from '../services/logger.service';


@Injectable()
export class TimecardEntryService {

    private path = '/api/timecardentries';
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    // constructor(private apiService: ApiService
    constructor(private http: Http, private logger: Logger) { }


    createTimeCardEntry(tce: TimeCardEntry) {

        let body = JSON.stringify(tce);

        return this.http.post(this.path, body, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
        //return this.http.post(this.path, tce).map(res => res.json());
    }

    getTimeCardEntries(): Observable<TimeCardEntry[]> {

        return this.http.get(this.path, this.options)
                        .map(res => res.json().data)
                        .catch(this.handleError);
        //return this.http.get(this.path).map(res => res.json().data);
    }

    updateTimeCardEntry(tce: TimeCardEntry): Observable<any> {

        let url = `${this.path}/${tce.id}`;
        let body = JSON.stringify(tce);

        //return this.http.put(this.path + '/' + tce.id, tce).map(res => res.json());

        return this.http.put(url, body, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    deleteTimeCardEntry(id: number): Observable<any> {

        let url = `${this.path}/${id}`;

        return this.http.delete(url, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }



    private extractData(res: Response) {

        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {

        let errMsg = (error.message)
            ? error.message
            : error.status
                ? `${error.status} - ${error.statusText}`
                : 'Server error';

        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}

