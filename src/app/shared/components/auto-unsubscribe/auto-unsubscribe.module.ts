import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoUnsubscribeComponent } from './auto-unsubscribe.component';


@NgModule({
  declarations: [
    AutoUnsubscribeComponent
  ],
  exports: [
    AutoUnsubscribeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutoUnsubscribeModule { }
