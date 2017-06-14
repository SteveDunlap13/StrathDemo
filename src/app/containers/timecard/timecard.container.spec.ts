/*
import {} from 'jasmine';
import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TimecardContainer } from './timecard.container';


@Component({
    selector: 'as-test',
    template: '<timecard-container></timecard-container>'
})
class TestComponent {
}


let tcCompiled;
let tcComponent: TimecardContainer;


describe('TimecardContainer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    });
  });

  it('should have been created successfully', async(() => {
          TestBed.compileComponents().then(() => {
              let fixture = TestBed.createComponent(TestComponent);
              fixture.detectChanges();

              tcCompiled = fixture.nativeElement;
              tcComponent = fixture.debugElement
                  .children[0].componentInstance;
              expect(tcCompiled).toBeDefined();
          });
  }));

//  it ('should work', () => {
//
//    let fixture = TestBed.createComponent(TimecardContainer);
//    expect(fixture.componentInstance instanceof TimecardContainer).toBe(true, 'should create TimecardContainer');
//  });

});

// see this for tests /w router-outlet
// https://github.com/antonybudianto/angular-starter/tree/master/src/app

*/
