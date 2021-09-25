import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';

import { Message, MessageService } from 'primeng/api';

import { TOAST_DEFAULTS, TOAST_SEVERITIES } from './toast-message.constants';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  messagesDisplayed: Message[] = [];

  constructor(private readonly messageService: MessageService) { }

  clear(): void {
    this.messageService.clear(TOAST_DEFAULTS.key);
    this.messagesDisplayed = [];
  }

  showMessages(messages: Message[]): void {
    const displayMessages: Message[] = messages
      .filter(
        (checkMessage, checkMessageIndex) => (
          !this.messagesDisplayed.some(message => isEqual(message, checkMessage))
          && !messages.some((message, i) => checkMessageIndex !== i && isEqual(message, checkMessage))
        )
      )
      .map(message => ({
        ...TOAST_DEFAULTS,
        ...message
      }));

    this.messageService.addAll(displayMessages);
    this.messagesDisplayed.push(...displayMessages);
  }

  showErrorMessages(errorMessages: string[] | Partial<Message[]>): void {
    if ((errorMessages as string[]).every(message => typeof message === 'string')) {  
      errorMessages = (errorMessages as string[]).map(errorMessage => ({
        summary: 'Error',
        detail: errorMessage
      }));
    }

    const displayMessages = (errorMessages as Message[]).map(errorMessage => ({
      ...TOAST_DEFAULTS,
      sticky: true,
      severity: TOAST_SEVERITIES.error,
      ...errorMessage
    }));

    this.showMessages(displayMessages);
  }
}
