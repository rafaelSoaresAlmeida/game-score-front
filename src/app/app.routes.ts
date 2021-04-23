import { Routes } from '@angular/router';
import { SpaceInvadersComponent } from './games/space-invaders/space-invaders.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './security/login/login.component';
import { LoginActivate } from './security/logginActivate';
import { FlappyTilapiaComponent } from './games/flappy-tilapia/flappy-tilapia.component';
import { DinoComponent } from './games/dino/dino.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate] },
  { path: 'about', component: AboutComponent, canActivate: [LoginActivate] },
  {
    path: 'spaceInvaders',
    component: SpaceInvadersComponent,
    canActivate: [LoginActivate],
  },
  { path: 'tetris', component: TetrisComponent, canActivate: [LoginActivate] },
  {
    path: 'flappyTilapia',
    component: FlappyTilapiaComponent,
    canActivate: [LoginActivate],
  },
  { path: 'dino', component: DinoComponent, canActivate: [LoginActivate] },
];
