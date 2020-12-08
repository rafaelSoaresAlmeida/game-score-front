import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../security/login.service';
import { DialogConfirmationService } from '../shared/message/dialog-confirmation/dialog-confirmation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string;
  subscriptionName: Subscription;

  constructor(
    private loginService: LoginService,
    private dialogConfirmationService: DialogConfirmationService
  ) {}

  ngOnInit() {
    this.subscriptionName = this.loginService.userNameEvent$.subscribe(
      (name) => {
        this.userName = name;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  public openConfirmationDialog() {
    this.dialogConfirmationService
      .confirm('Please confirm..', 'Are you sure you want to end the session?')
      .then((confirmed) => {
        if (confirmed === true) {
          this.loginService.logout();
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }
}
