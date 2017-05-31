
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeCardEntry, TimeCardEntryEvent } from '../../models/timecardentry';


@Component({
  selector: 'timecard-entry-form',
  templateUrl: './timecard-entry.component.html'
})
export class TimeCardEntryComponent  {

  @Input()
    modalData: {
      action: string, // Clicked or Edited
      event: TimeCardEntryEvent,
      timecardentry: TimeCardEntry
  };

  // Easier to reference the timecardentry in our view
  //model: TimeCardEntry = this.modalData ? null : this.modalData.event.timecardentry;

  //TODO: pull these from api
  worktasks = ['Project 1234', 'Project B', 'Development', 'Testing', 'Deployment', 'Meeting'];

  //submitted = false;
  //onSubmit() { this.submitted = true; }



  constructor(public activeModal: NgbActiveModal) {}

  //TODO: implement timecard entry form save
}
