import { Component, OnInit } from '@angular/core';
import { RankService } from '../games/rank.service';
import { converToOrdinalNum } from '../utils/gameUtils';
import { Games } from '../utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public spaceInvadersScores = [];
  public tetrisScores = [];
  public flappyTilapiaScores = [];
  public dinoScores = [];

  public head: string[] = ['name', 'score'];

  constructor(private rankService: RankService) {}

  ngOnInit(): void {
    this.rankService
      .getScore(Games.SPACE_INVADERS)
      .subscribe(
        (resp) => (this.spaceInvadersScores = resp[Object.keys(resp)[0]])
      );

    this.rankService
      .getScore(Games.TETRIS)
      .subscribe((resp) => (this.tetrisScores = resp[Object.keys(resp)[0]]));

    this.rankService
      .getScore(Games.FLAPPY_TILAPIA)
      .subscribe(
        (resp) => (this.flappyTilapiaScores = resp[Object.keys(resp)[0]])
      );

    this.rankService
      .getScore(Games.DINO)
      .subscribe((resp) => (this.dinoScores = resp[Object.keys(resp)[0]]));
  }

  public convertNumber(number: number) {
    return converToOrdinalNum(number);
  }
}
