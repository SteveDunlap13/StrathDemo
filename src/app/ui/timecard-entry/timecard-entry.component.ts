
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeCardEntry, TimeCardEntryEvent, WorkTask, WorkType, PIWorkType } from '../../models/timecardentry';
import { WorkTypeService, PIWorkTypeService, WorkTaskService } from '../../services/index';
import { TimecardEntryService } from '../../services/index';


@Component({
  selector: 'timecard-entry-form',
  templateUrl: './timecard-entry.component.html'
})
export class TimeCardEntryComponent implements OnInit {

  @Input()
    modalData: {
      action: string, // Clicked or Edited
      event: TimeCardEntryEvent,
      timecardentry: TimeCardEntry
  };

  worktypes: WorkType[] = [];
  piworktypes: PIWorkType[] = [];
  worktasks: WorkTask[] = [];

  submitted = false;


  constructor(public activeModal: NgbActiveModal,
              private workTypeService: WorkTypeService,
              private piworkTypeService: PIWorkTypeService,
              private workTaskService: WorkTaskService,
              private timecardEntryService: TimecardEntryService) {}

  ngOnInit() {

    this.fetchWorkTypes();
    this.fetchPIWorkTasks();
    this.fetchWorkTasks();
  }



  fetchWorkTypes(): void {

    this.workTypeService.getWorkTypes().subscribe(wt => {

      this.worktypes = wt;
    });
  }

  fetchPIWorkTasks(): void {

    this.piworkTypeService.getPIWorkTypes().subscribe(wt => {

      this.piworktypes = wt;
    });
  }

  fetchWorkTasks(): void {

    this.workTaskService.getWorkTasks().subscribe(wt => {

      this.worktasks = wt;
    });
  }



  worktypeChanged(index: any): void {

    let worktypeitem = this.worktypes[index];
    this.modalData.timecardentry.worktype = worktypeitem;
  }



  onSubmit(): void {

    this.submitted = true;
    this.timecardEntryService.updateTimeCardEntry(this.modalData.timecardentry);
  }
}
