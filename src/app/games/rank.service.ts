import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from './score.model';
import { SCORE_API } from '../app.api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  TETRIS_SCORE = 'tetrisScore';
  SPACE_INVADERS_SCORE = 'spaceInvadersScore';
  SCORE = '/score';

  constructor(private httpClient: HttpClient) {}

  getScore(game: string): Observable<any[]> {
    return this.httpClient.get<any[]>(SCORE_API + this.SCORE + '/' + game);
  }

  persistScore(score: Score): Observable<any> {
    return this.httpClient.post<Score>(SCORE_API + this.SCORE, {
      score,
    });
  }
}
