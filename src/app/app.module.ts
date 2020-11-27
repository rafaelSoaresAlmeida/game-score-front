import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';
import { FooterComponent } from './footer/footer.component';
import { SpaceInvadersComponent } from './games/space-invaders/space-invaders.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login.service';
import { LoginActivate } from './security/logginActivate';
import { RankService } from './games/rank.service';
import { ScoreGridComponent } from './shared/score-grid/score-grid.component';
import { HomeModule } from './home/home..module';
import { AuthInterceptor } from './security/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackbarComponent } from './shared/message/snackbar/snackbar.component';
import { NotificationService } from './shared/message/notification.service';
import { ErrorHandlerResponseService } from './shared/errorHandlerResponse.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpaceInvadersComponent,
    TetrisComponent,
    AboutComponent,
    LoginComponent,
    ScoreGridComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LoginService,
    LoginActivate,
    RankService,
    NotificationService,
    ErrorHandlerResponseService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
