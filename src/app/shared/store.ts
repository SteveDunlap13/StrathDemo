
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { TimeCard } from '../models/timecard';
import { User } from '../models/user';


export interface State {
    timecards: Array<TimeCard>;
    user: User;
}

const defaultState = {
    timecards: [],
    user: {}
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {

    private _store = _store;
    changes = this._store.asObservable().distinctUntilChanged();

    setState(state: State) {
        this._store.next(state);
    }

    getState(): State {
        return this._store.value;
    }

    purge() {
        this._store.next(defaultState);
    }
}
