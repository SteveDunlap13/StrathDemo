
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AdalService} from 'ng2-adal/core';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private adalService: AdalService, private router: Router) {}

    canActivate() {

        if (this.adalService.userInfo.isAuthenticated) {

            //console.log(JSON.stringify(this.adalService.userInfo));
            //console.log(JSON.stringify(this.adalService));

            return true;
        } else {

            this.router.navigate(['/']);
            return false;
        }
    }
}
