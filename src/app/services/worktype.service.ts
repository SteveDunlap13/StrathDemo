

import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { WorkType } from '../models/index';

import { Logger } from '../services/logger.service';


@Injectable()
export class WorkTypeService {

    path: string = '/api/worktypes';

    // constructor(private apiService: ApiService, private storeHelperService: StoreHelperService) { }
    //constructor(private http: Http, private storeHelperService: StoreHelperService, private logger: Logger) { }
    constructor(private http: Http, private logger: Logger) { }



    getWorkTypes(): Observable<WorkType[]> {

        return this.http.get(this.path).map(res => res.json().data);
    }
}
