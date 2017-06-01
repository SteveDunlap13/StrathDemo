
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

import { isPresent } from '../util/lang';

//import { gt } from './validator';
export const gt = (gt: number): ValidatorFn => {

  return (control: AbstractControl): {[key: string]: boolean} => {

    if (!isPresent(gt)) {
        return null;
    }
    if (isPresent(Validators.required(control))) {
        return null;
    }

    let v: number = +control.value;
    return v > +gt ? null : {gt: true};
  };
};


const GREATER_THAN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GreaterThanValidator),
  multi: true
};



@Directive({
  selector: '[gt][formControlName],[gt][formControl],[gt][ngModel]',
  providers: [GREATER_THAN_VALIDATOR]
})
export class GreaterThanValidator implements Validator, OnInit, OnChanges {
  @Input() gt: number;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = gt(this.gt);
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let key in changes) {
      if (key === 'gt') {
        this.validator = gt(changes[key].currentValue);

        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
