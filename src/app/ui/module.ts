import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';

import { CustomFormsModule } from '../validators/module'

import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { HeaderComponent } from './header/header.component';
import { TimeCardEntryComponent } from './timecard-entry/timecard-entry.component';

import { PIWorkTypeFilterPipe } from '../pipes/index';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    CalendarModule
  ],

  entryComponents: [
    TimeCardEntryComponent
  ],

  declarations: [
    PIWorkTypeFilterPipe,
    CalendarHeaderComponent,
    HeaderComponent,
    TimeCardEntryComponent
  ],

  exports: [
    CalendarHeaderComponent,
    HeaderComponent
  ]
})
export class StrathDemoUIModule {}
