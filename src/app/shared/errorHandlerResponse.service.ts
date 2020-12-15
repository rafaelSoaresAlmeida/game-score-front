import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../security/login.service';
import { NotificationService } from '../shared/message/notification.service';

@Injectable()
export class ErrorHandlerResponseService {
  constructor(
    private notificationService: NotificationService,
    private injector: Injector
  ) {}

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.error;

      switch (errorResponse.status) {
        case 401:
          this.injector.get(LoginService).handleLogin();
          break;

        case 403:
          console.log(message)
          this.notificationService.notify(message || 'Not authorized .', 3000);
          break;

        case 404:
          this.notificationService.notify(message || 'Source not found.', 3000);
          break;
      }
    }
  }
}
