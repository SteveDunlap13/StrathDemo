
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { CalendarModule } from 'angular-calendar';


import { StrathDemoUIModule } from './ui/module';
import { AppComponent }  from './app.component';

import { DashboardContainer } from './containers/dashboard.container';
import { TimecardContainer } from './containers/timecard.container';


import { Logger, ApiService, InMemoryApiService, PIWorkTypeService,
         TimecardEntryService, WorkTaskService, WorkTypeService } from './services/index';


@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryApiService),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    StrathDemoUIModule,

    RouterModule.forRoot([
          {
              path: '',
              component: DashboardContainer,
          },
          { path: '**', redirectTo: '' }
      ])
  ],

  declarations: [
    AppComponent,
    DashboardContainer,
    TimecardContainer
  ],

  providers: [
    Logger,
    ApiService,
    TimecardEntryService,
    WorkTypeService,
    PIWorkTypeService,
    WorkTaskService
  ],

  bootstrap:    [ AppComponent ]
})

export class AppModule { }
