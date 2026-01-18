import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private playerScore$ = new BehaviorSubject<number>(0);
  private multiplier$ = new BehaviorSubject<number>(1);
  private lives$ = new BehaviorSubject<number>(3);

  constructor() {}

  getScore(): Observable<number> {
    return this.playerScore$.asObservable();
  }

  getMultiplier(): Observable<number> {
    return this.multiplier$.asObservable();
  }

  getLives(): Observable<number> {
    return this.lives$.asObservable();
  }

  addScore(points: number): void {
    const current = this.playerScore$.value;
    const multiplier = this.multiplier$.value;
    this.playerScore$.next(current + (points * multiplier));
  }

  setScore(score: number): void {
    this.playerScore$.next(score);
  }

  setMultiplier(multiplier: number): void {
    this.multiplier$.next(multiplier);
  }

  setLives(lives: number): void {
    this.lives$.next(lives);
  }

  removeLive(): void {
    const current = this.lives$.value;
    if (current > 0) {
      this.lives$.next(current - 1);
    }
  }

  resetScore(): void {
    this.playerScore$.next(0);
    this.multiplier$.next(1);
    this.lives$.next(3);
  }
}
