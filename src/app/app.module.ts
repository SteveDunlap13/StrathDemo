
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
import { AuthGuard } from './guards/auth.guard';

import { DashboardContainer } from './containers/dashboard.container';
import { TimecardContainer } from './containers/timecard.container';
import { SecureContainer } from './containers/secure.container';

import { AdalService } from 'ng2-adal/core';

import { Logger, ApiService, InMemoryApiService, PIWorkTypeService, SecretService,
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
          { path: '', component: DashboardContainer, },
          { path: 'secure', component: SecureContainer, canActivate: [AuthGuard] },
          { path: '**', redirectTo: '' }
      ])
  ],

  declarations: [
    AppComponent,
    DashboardContainer,
    TimecardContainer,
    SecureContainer
  ],

  providers: [
    Logger,
    ApiService,
    TimecardEntryService,
    WorkTypeService,
    PIWorkTypeService,
    WorkTaskService,
    AuthGuard,
    AdalService,
    SecretService
  ],

  bootstrap:    [ AppComponent ]
})

export class AppModule { }
