
import { Component } from '@angular/core';
import { AdalService } from 'ng2-adal/core'

@Component({
    selector: 'secure',
    templateUrl: './secure.container.html'
})
export class SecureContainer {

    constructor(private adalService: AdalService) {}


    signOut() {
        this.adalService.logOut();
    }
}
