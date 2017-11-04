import { Attribute, Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validateEqual]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqualDirective), multi: true }
  ]
})
export class ValidateEqualDirective implements Validator {

  constructor(@Attribute('validateEqual') public validateEqual: string) { }

  @Input() validateRequired: boolean = true;

  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    let v = c.value;

    // control value (e.g. password)
    let e = c.root.get(this.validateEqual);

    // console.debug('vequal', v, e);
    // console.debug('validateRequired', this.validateRequired);
    // value not equal
    if (this.validateRequired && e && v !== e.value) return {
      validateEqual: false
    }
    return null;
  }

}
