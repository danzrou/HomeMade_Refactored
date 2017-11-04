import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCollapse } from './show-dropdown.directive';
import { SmoothScrollDirective } from './smooth-scroll.directive';
import { ValidateEqualDirective } from './validate-equal.directive';

@NgModule({
  declarations: [
    ShowCollapse,
    SmoothScrollDirective,
    ValidateEqualDirective
  ],
  exports: [
    ShowCollapse,
    SmoothScrollDirective,
    ValidateEqualDirective
  ]
})
export class SharedModule { }
