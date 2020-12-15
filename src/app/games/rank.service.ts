import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from './score.model';
import { SCORE_API } from '../app.api';

@Injectable({
  providedIn: 'root',
})
export class RankService {
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
