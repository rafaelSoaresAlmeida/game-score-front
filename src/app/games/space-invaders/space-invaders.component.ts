import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';

import { Ship } from '../space-invaders/actor/Ship';
import { Bullet } from '../space-invaders/actor/Bullet';
import { Enemy } from '../space-invaders/actor/Enemy';
import { ParticalCluster } from '../space-invaders/actor/ParticalCluster';

import { KEY } from '../../utils/constants';

import { spawnSquadOfEnemies } from '../../utils/gameUtils';
import { RankService } from '../rank.service';
import { Score } from '../score.model';
import { LoginService } from 'src/app/security/login.service';
import { buildScoreObject } from '../../utils/gameUtils';

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrls: ['./space-invaders.component.css'],
})
export class SpaceInvadersComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;

  lives = 1;
  score = 0;
  round = 0;

  //actors
  ship: Ship;
  bullets: Bullet[] = [];
  enemies: Enemy[] = [];
  particles: ParticalCluster[] = [];

  gameStarted: boolean;
  paused: boolean;
  animateId: number;
  scoreObj: Score;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.LEFT && this.ship.X >= 0) {
      this.ship.X -= 2;
    } else if (
      event.keyCode === KEY.RIGHT &&
      this.ship.X <= this.ctx.canvas.width
    ) {
      this.ship.X += 2;
    }
    if (event.keyCode === KEY.UP) {
      this.bullets.push(this.ship.fire());
    }
  }

  keys: { [key: number]: boolean } = {};

  constructor(
    private rankService: RankService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // get the context
    this.initBoard();
  }

  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = 500;
    this.ctx.canvas.height = 500;
  }

  play() {
    this.setUpGame(0, 1, 0);
    this.gameStarted = true;
    this.gameLoop();
  }

  pause() {
    if (this.paused) {
      this.paused = false;
      return;
    }
    this.paused = true;
  }

  setUpGame(currentRound: number, currentLives: number, currentScore: number) {
    this.round = currentRound;
    this.score = currentScore;
    this.lives = currentLives;
    this.ship = new Ship(this.ctx, this.ctx.canvas.width / 2);
    this.enemies = [];
    this.particles = [];
    this.ship.draw();
    this.paused = false;
  }

  playerDead() {
    this.lives--;
    this.particles.push(
      new ParticalCluster(this.ctx, 10, this.ship.X, this.ship.Y)
    );
    this.setUpGame(this.round, this.lives, this.score);
    this.bullets = [];
    this.enemies = spawnSquadOfEnemies(this.round, this.ctx);
  }

  gameOver() {
    cancelAnimationFrame(this.animateId);
    this.gameStarted = false;
    this.scoreObj = buildScoreObject(
      this.loginService.user.name,
      this.loginService.user.email,
      this.score.toString(),
      'space'
    );
    console.log(this.score);
    this.rankService
      .persistScore(this.scoreObj)
      .subscribe((response) => console.log(response));
  }

  gameLoop = () => {
    this.animateId = requestAnimationFrame(this.gameLoop);

    if (!this.paused) {
      // Clear the canvas to be redrawn
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      if (this.lives <= 0) {
        this.gameOver();
        return;
      }

      this.bullets.forEach((b, i) => {
        b.draw();

        if (!b.IsEnemyFire) {
          const result = b.hitEnemy(this.enemies);
          if (result) {
            this.enemies.splice(this.enemies.indexOf(result), 1);
            this.bullets.splice(i, 1);
            this.particles.push(
              new ParticalCluster(this.ctx, 5, result.X, result.Y)
            );
            this.score += result.Points;
          }
        } else if (
          this.ship &&
          this.ship.checkForRectCollision(b.X, b.Y, b.W, b.H)
        ) {
          this.playerDead();
        }

        if (b.lifespan <= 0) {
          this.bullets.splice(i, 1);
        }
      });

      this.enemies.forEach((e, i) => {
        e.draw();
        if (this.ship.checkForRectCollision(e.X, e.Y, e.Width, e.Height)) {
          this.playerDead();
        } else if (e.Y >= this.ctx.canvas.height) {
          this.enemies.splice(i, 1);
        } else if (
          e.checkLoS(this.enemies) &&
          Math.random() < this.round / 1000
        ) {
          this.bullets.push(e.fire());
        }
      });

      this.particles.forEach((e, i) => {
        e.draw();
        if (e.Lifespan <= 0) {
          this.particles.splice(i, 1);
        }
      });

      this.ship.draw();

      if (this.enemies.length <= 0) {
        this.enemies = spawnSquadOfEnemies(this.round++, this.ctx);
      }
    }
  };
}
