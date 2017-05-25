import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';

import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [
    CalendarHeaderComponent,
    HeaderComponent
  ],
  exports: [
    CalendarHeaderComponent,
    HeaderComponent
  ]
})
export class StrathDemoModule {}
