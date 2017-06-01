
import { NgModule } from '@angular/core';

import { gt, GreaterThanValidator } from './greater-than/directive';



export const CustomValidators: any = {
    gt
};

const CUSTOM_FORM_DIRECTIVES = [
    GreaterThanValidator
];


@NgModule({
  declarations: [CUSTOM_FORM_DIRECTIVES],
  exports: [CUSTOM_FORM_DIRECTIVES]
})
export class CustomFormsModule {
}
