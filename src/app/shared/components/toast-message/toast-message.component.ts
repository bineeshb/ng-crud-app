import { Component } from '@angular/core';

import { TOAST_DEFAULTS } from './toast-message.constants';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html'
})
export class ToastMessageComponent {
  toastKey = TOAST_DEFAULTS.key;
}
