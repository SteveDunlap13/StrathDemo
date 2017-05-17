
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { Store } from '../shared/store';
import { Subscription } from 'rxjs/Rx';
import { TimecardService } from '../services/timecard.service';
import { Logger } from '../services/logger.service';


@Component({
    selector: 'timecard-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './timecard.container.html'
})
export class TimecardContainer implements OnDestroy {

    timecardSub: Subscription;
    timecardData = [];

    // console.console.log(timecardData);

    view: string = 'month';
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];


    constructor(private timecardService: TimecardService, private store: Store, private logger: Logger) {

        this.timecardService.getTimecards()
            .subscribe();

        this.timecardSub = this.store.changes.pluck('timecard_store')
            .subscribe((data: any) => this.timecardData = data);
    }
    ngOnDestroy() {
        this.timecardSub.unsubscribe();
    }
}
