
import { Component, Output, EventEmitter } from '@angular/core';
import { AdalService } from 'ng2-adal/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['../../css/groot-header.css']
})
export class HeaderComponent  {

    constructor(private adalService: AdalService) { }


    signIn(): void {
        this.adalService.login();
    }
}
