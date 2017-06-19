
import {} from 'jasmine';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdalService } from 'ng2-adal/core';
import { Logger, ApiService, InMemoryApiService, PIWorkTypeService, SecretService,
         TimecardEntryService, WorkTaskService, WorkTypeService } from './services/index';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//TestBed.configureTestingModule({
//  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
//});

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ AdalService, SecretService ],
      imports: [ RouterTestingModule ]
    });
  });


  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

/*
  it(`should have as title 'Strath Demo'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Strath Demo');
  }));
*/
/*
  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
*/
});
