import { Routes } from '@angular/router';
import { SpaceInvadersComponent } from './games/space-invaders/space-invaders.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { LoginActivate } from './security/logginActivate';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginActivate] },
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate] },
  {
    path: 'spaceInvaders',
    component: SpaceInvadersComponent,
    canActivate: [LoginActivate],
  },
  { path: 'tetris', component: TetrisComponent, canActivate: [LoginActivate] },
];
