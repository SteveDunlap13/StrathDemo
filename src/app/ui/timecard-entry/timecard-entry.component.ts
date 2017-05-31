
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeCardEntryEvent } from '../../models/timecardentry';


@Component({
  selector: 'timecard-entry-form',
  templateUrl: './timecard-entry.component.html'
})
export class TimeCardEntryComponent  {

  @Input()
    modalData: {
      action: string, // Clicked or Edited
      event: TimeCardEntryEvent
    };


  constructor(public activeModal: NgbActiveModal) {}

  //TODO: implement timecard entry form save
}
