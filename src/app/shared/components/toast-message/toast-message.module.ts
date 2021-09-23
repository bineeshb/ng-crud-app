import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ToastMessageComponent } from './toast-message.component';


@NgModule({
  declarations: [
    ToastMessageComponent
  ],
  exports: [
    ToastMessageComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class ToastMessageModule { }
