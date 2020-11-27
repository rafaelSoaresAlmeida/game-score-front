import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { ErrorHandlerResponseService } from '../../shared/errorHandlerResponse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandlerResponseService: ErrorHandlerResponseService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });

    this.navigateTo = this.activateRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () =>
          this.notificationService.notify(
            `Welcome, ${this.loginService.user.name}`
          ),
        (errorResponse) =>
          this.errorHandlerResponseService.handleError(errorResponse),
        () => {
          this.router.navigate([atob(this.navigateTo)]);
        }
      );
  }
}
