
import { Component, Input, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CustomValidators } from '../../validators/module';

import { TimeCardEntry, TimeCardEntryEvent, WorkTask, WorkType, PIWorkType } from '../../models/timecardentry';
import { WorkTypeService, PIWorkTypeService, WorkTaskService } from '../../services/index';
import { TimecardEntryService } from '../../services/index';
import { COLOURS } from '../../shared/colours';
import { GROOTS } from '../../shared/constants';


@Component({
  selector: 'timecard-entry-form',
  templateUrl: './timecard-entry.component.html'
})
export class TimeCardEntryComponent implements OnInit, AfterViewChecked {

  @Input()
    modalData: {
      action: string, // Add, Edit, View
      timecardentry?: TimeCardEntry,
      date?: Date,
      heading: string
  };

  private tceForm: NgForm;
  @ViewChild('tceForm') currentForm: NgForm;

  // Meta data from api for dropdowns
  private worktypes: WorkType[] = [];
  private piworktypes: PIWorkType[] = [];
  private worktasks: WorkTask[] = [];

  private submitted = false;

  private formErrors = {
    'value': ''
  };

  private validationMessages = {
    'value': {
      'required': GROOTS.HOURSREQUIRED,
      'gt':       GROOTS.HOURSGREATERTHANZERO
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


    if (this.modalData.timecardentry === null) {

      // useable only once with inmemoryapi service; not worried about figuring out last id; real api will apply its identity rules
      //TODO: need to change this when talking to real api
      this.modalData.timecardentry = {
          id: -1,
          employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
          eventstart: this.modalData.date,
          eventend: this.modalData.date,
          colour: COLOURS.blue,
          badgecolour: COLOURS.blue.secondary,
          worktype: { id: 1, name: 'Project Work', type: 'P' },
          piworktype: { id: 1, code: '13660', name: 'Billing Enhancements', type: 'P' },
          worktypedescription: '',
          worktask: { id: 1, name: 'Pre-Discovery - (Preliminary Project Stage)' },
          value: 0
      }
    }
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

    switch (this.modalData.action) {
      case GROOTS.ADDACTION: {
          this.timecardEntryService.createTimeCardEntry(this.modalData.timecardentry)
            .subscribe(
              result => {
                // no error thrown, so assume a successful put (result is an empty object)
                this.submitted = true;
                this.activeModal.close(GROOTS.SUCCESSFLAG);
              },
              error => {
                console.log(<any>error);
              }
            );
        }
        break;

      case GROOTS.EDITACTION: {
          this.timecardEntryService.updateTimeCardEntry(this.modalData.timecardentry)
            .subscribe(
              result => {
                // no error thrown, so assume a successful put (result is an empty object)
                this.submitted = true;
                this.activeModal.close(GROOTS.SUCCESSFLAG);
              },
              error => {
                console.log(<any>error);
              }
            );
        }
        break;

      default:
        break;
    }
  }

  onDeleteSubmit(): void {

    this.timecardEntryService.deleteTimeCardEntry(this.modalData.timecardentry.id)
      .subscribe(
        result => {
          // no error thrown, so assume a successful put (result is an empty object)
          this.submitted = true;
          this.activeModal.close(GROOTS.SUCCESSFLAG);
        },
        error => {
          console.log(<any>error);
        }
      );
  }
}
