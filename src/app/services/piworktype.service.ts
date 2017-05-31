

import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PIWorkType } from '../models/index';

import { Logger } from '../services/logger.service';


@Injectable()
export class PIWorkTypeService {

    path: string = '/api/piworktypes';

    // constructor(private apiService: ApiService, private storeHelperService: StoreHelperService) { }
    //constructor(private http: Http, private storeHelperService: StoreHelperService, private logger: Logger) { }
    constructor(private http: Http, private logger: Logger) { }



    getPIWorkTypes(): Observable<PIWorkType[]> {

        return this.http.get(this.path).map(res => res.json().data);
    }
}
