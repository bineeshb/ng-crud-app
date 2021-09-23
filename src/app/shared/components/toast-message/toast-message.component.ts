import { Component, OnInit } from '@angular/core';

import { TOAST_CONSTANTS } from './toast-message.constants';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html'
})
export class ToastMessageComponent implements OnInit {
  toastKey = TOAST_CONSTANTS.key;

  constructor() { }

  ngOnInit(): void {
  }

}
