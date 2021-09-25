import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';

import { Message, MessageService } from 'primeng/api';

import { TOAST_DEFAULTS, TOAST_SEVERITIES } from './toast-message.constants';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  private messagesDisplayed: Message[] = [];
  showSuccessMessages = this.setDefaultsAndShowMessages({
    summary: 'Success',
    severity: TOAST_SEVERITIES.success
  });
  showErrorMessages = this.setDefaultsAndShowMessages({
    summary: 'Error',
    severity: TOAST_SEVERITIES.error,
    sticky: true
  });

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

  private setDefaultsAndShowMessages(messageDefaults: Message) {
    return (messages: string[] | Partial<Message[]>): void => {
      if ((messages as string[]).every(message => typeof message === 'string')) {  
        messages = (messages as string[]).map(message => ({
          detail: message
        }));
      }

      messages = (messages as Message[]).map(message => ({
        ...messageDefaults,
        ...message
      }));

      this.showMessages(messages);
    }
  }
}
