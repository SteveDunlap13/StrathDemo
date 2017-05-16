import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CalendarModule } from 'angular-calendar';

import { UtilsModule } from './utils/module';
import { AppComponent }  from './app.component';



@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule, FormsModule,
    CalendarModule.forRoot(),
    UtilsModule
  ],

  declarations: [
    AppComponent 
  ],

  bootstrap:    [ AppComponent ]
})

export class AppModule { }
