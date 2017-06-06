
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SecretService } from './services/index';
import { AdalService } from 'ng2-adal/services/adal.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['app/css/groot-global.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private adalService: AdalService,
              private secretService: SecretService) {
      this.adalService.init(this.secretService.adalConfig);
  }

  ngOnInit(): void {
    this.adalService.handleWindowCallback();
    this.adalService.getUser();
  }
}
