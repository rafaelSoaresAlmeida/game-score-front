import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state(
        'hidden',
        style({
          opacity: 0,
          bottom: '0px',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          bottom: '30px',
        })
      ),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out')),
    ]),
  ],
})
export class SnackbarComponent implements OnInit {
  message: string = 'Hello there';

  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap((message) => {
          this.message = message.message;
          this.snackVisibility = 'visible';
        }),
        switchMap((message) => timer(message.timer))
      )
      .subscribe((timer) => (this.snackVisibility = 'hidden'));
  }
}
