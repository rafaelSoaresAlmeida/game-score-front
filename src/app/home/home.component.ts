import { Component, OnInit } from '@angular/core';
import { RankService } from '../games/rank.service';
import { Score } from '../games/score.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  spaceInvadersScores = [];
  tetrisScores = [];
  head: string[] = ['name', 'score'];
  TETRIS_SCORE = 'tetris';
  SPACE_INVADERS_SCORE = 'space';
  teste;

  constructor(private rankService: RankService) {}

  ngOnInit() {
    this.rankService
      .getScore(this.SPACE_INVADERS_SCORE)
      .subscribe(
        (resp) => (this.spaceInvadersScores = resp[Object.keys(resp)[0]])
      );

    this.rankService
      .getScore(this.TETRIS_SCORE)
      .subscribe((resp) => (this.tetrisScores = resp[Object.keys(resp)[0]]));
  }
}
