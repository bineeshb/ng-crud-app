import { Component } from '@angular/core';

import { TOAST_DEFAULTS } from './toast-message.constants';
import { ToastMessageService } from './toast-message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html'
})
export class ToastMessageComponent {
  toastKey = TOAST_DEFAULTS.key;

  constructor(public toastMessageService: ToastMessageService) { }
}
