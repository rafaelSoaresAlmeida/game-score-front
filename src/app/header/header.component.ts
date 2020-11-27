import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../security/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string;
  subscriptionName: Subscription;

  constructor(private loginService: LoginService) {}

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
}
