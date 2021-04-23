import { EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { buildMessageObject } from '../../utils/gameUtils';

export class NotificationService {
  notifier = new EventEmitter<any>();
  message: Message;

  notify(message: string, timer: number) {
    this.message = buildMessageObject(message, timer);
    this.notifier.emit(this.message);
  }

  notifyRanking(backendResponse) {
    this.message = buildMessageObject(backendResponse.message, 7000);
    this.notifier.emit(this.message);
  }
}
