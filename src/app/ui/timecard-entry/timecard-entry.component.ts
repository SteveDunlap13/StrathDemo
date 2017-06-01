
import { Component, Input, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CustomValidators } from '../../validators/module';

import { TimeCardEntry, TimeCardEntryEvent, WorkTask, WorkType, PIWorkType } from '../../models/timecardentry';
import { WorkTypeService, PIWorkTypeService, WorkTaskService } from '../../services/index';
import { TimecardEntryService } from '../../services/index';


@Component({
  selector: 'timecard-entry-form',
  templateUrl: './timecard-entry.component.html'
})
export class TimeCardEntryComponent implements OnInit, AfterViewChecked {

  @Input()
    modalData: {
      action: string, // Clicked or Edited
      event: TimeCardEntryEvent,
      timecardentry: TimeCardEntry
  };

  tceForm: NgForm;
  @ViewChild('tceForm') currentForm: NgForm;

  worktypes: WorkType[] = [];
  piworktypes: PIWorkType[] = [];
  worktasks: WorkTask[] = [];

  submitted = false;

  formErrors = {
    'value': ''
  };

  validationMessages = {
    'value': {
      'required': 'Hours are required.',
      'gt':       'Hours must be greater than 0.'
    }
  };



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
  ngAfterViewChecked() {
    this.formChanged();
  }



  formChanged() {

    if (this.currentForm === this.tceForm) {
      return;
    }

    this.tceForm = this.currentForm;
    if (this.tceForm) {
      this.tceForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }



  onValueChanged(data?: any) {

    if (!this.tceForm) {
      return;
    }
    const form = this.tceForm.form;

    for (const field of Object.keys(this.formErrors)) {

      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
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

    if (this.tceForm.invalid) {
      return;
    }

    this.submitted = true;
    this.timecardEntryService.updateTimeCardEntry(this.modalData.timecardentry);

    //console.log(JSON.stringify(this.modalData.timecardentry));
  }
}
