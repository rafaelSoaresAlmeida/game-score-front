import { EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { buildMessageObject } from '../../utils/gameUtils';
import { converToOrdinalNum } from '../../utils/gameUtils';

export class NotificationService {
  notifier = new EventEmitter<any>();
  message: Message;

  notify(message: string, timer: number) {
    this.message = buildMessageObject(message, timer);
    this.notifier.emit(this.message);
  }

  notifyRanking(backendResponse) {
    if (backendResponse.ranked == true) {
      this.message = buildMessageObject(
        `Congratulations you get a ranking position on top five best players: ${converToOrdinalNum(
          Number(backendResponse.position)
        )}!!`,
        7000
      );
    } else {
      this.message = buildMessageObject(
        'Sorry, your score was not enought to get a ranking position on top five best players (HaHaHaHa)..Try again!!',
        7000
      );
    }
    this.notifier.emit(this.message);
  }
}
