import { Injectable } from '@angular/core';

import { Message, MessageService } from 'primeng/api';

import { TOAST_CONSTANTS, TOAST_SEVERITIES } from './toast-message.constants';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private readonly messageService: MessageService) { }

  clear(): void {
    this.messageService.clear(TOAST_CONSTANTS.key);
  }

  showMessages(messages: Message[]): void {
    const displayMessages: Message[] = messages.map(message => ({
      ...message,
      key: TOAST_CONSTANTS.key
    }));

    this.messageService.addAll(displayMessages);
  }

  showErrorMessages(errorMessages: string[] | Partial<Message[]>): void {
    if ((errorMessages as string[]).every(message => typeof message === 'string')) {  
      errorMessages = (errorMessages as string[]).map(errorMessage => ({
        summary: 'Error',
        detail: errorMessage
      }));
    }

    const displayMessages = (errorMessages as Message[]).map(errorMessage => ({
      key: TOAST_CONSTANTS.key,
      severity: TOAST_SEVERITIES.error,
      ...errorMessage
    }));

    this.showMessages(displayMessages);
  }
}
