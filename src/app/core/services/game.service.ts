import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, GameScore } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games$ = new BehaviorSubject<Game[]>([
    {
      id: 'hangman',
      name: 'Hangman',
      description: 'Decipher the sequence before the system terminates.',
      category: 'classic',
      icon: 'text_fields',
      componentName: 'HangmanComponent',
      highScore: 0,
      tags: ['word-game', 'puzzle'],
      difficulty: 'medium'
    },
    {
      id: 'wordle',
      name: 'Wordle',
      description: 'Guess the word in six attempts using logic and deduction.',
      category: 'puzzle',
      icon: 'spellcheck',
      componentName: 'WordleComponent',
      highScore: 0,
      tags: ['word-game', 'puzzle'],
      difficulty: 'medium'
    },
    {
      id: 'snake',
      name: 'Snake',
      description: 'Consume data nodes to increase link length. Navigate carefully!',
      category: 'action',
      icon: 'conversion_path',
      componentName: 'SnakeComponent',
      highScore: 0,
      tags: ['arcade', 'action'],
      difficulty: 'easy'
    },
    {
      id: 'battleship',
      name: 'Battleship',
      description: 'Locate and neutralize enemy naval coordinates.',
      category: 'strategy',
      icon: 'directions_boat',
      componentName: 'BattleshipComponent',
      highScore: 0,
      tags: ['strategy', 'board-game'],
      difficulty: 'medium'
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'Organize falling sectors for maximum clearing.',
      category: 'puzzle',
      icon: 'grid_view',
      componentName: 'TetrisComponent',
      highScore: 0,
      tags: ['puzzle', 'retro'],
      difficulty: 'hard'
    },
    {
      id: 'arkanoid',
      name: 'Arkanoid',
      description: 'Destroy all bricks with the ball and master the arcade.',
      category: 'action',
      icon: 'sports_handball',
      componentName: 'ArkanoidComponent',
      highScore: 0,
      tags: ['arcade', 'action'],
      difficulty: 'hard'
    },
    {
      id: 'parchis',
      name: 'Parchis',
      description: 'Race your pieces around the board in this classic strategy game.',
      category: 'strategy',
      icon: 'board_games',
      componentName: 'ParchisComponent',
      highScore: 0,
      tags: ['board-game', 'strategy'],
      difficulty: 'medium'
    }
  ]);

  private scores$ = new BehaviorSubject<GameScore[]>([]);

  constructor() {
    this.loadScores();
  }

  getGames(): Observable<Game[]> {
    return this.games$.asObservable();
  }

  getGameById(id: string): Observable<Game | undefined> {
    return new Observable(observer => {
      const game = this.games$.value.find(g => g.id === id);
      observer.next(game);
      observer.complete();
    });
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return new Observable(observer => {
      const filtered = this.games$.value.filter(g => g.category === category);
      observer.next(filtered);
      observer.complete();
    });
  }

  addScore(score: GameScore): void {
    const scores = this.scores$.value;
    scores.push(score);
    scores.sort((a, b) => b.score - a.score);
    this.scores$.next(scores);
    this.saveScores();
    this.updateHighScore(score.gameId, score.score);
  }

  getScores(): Observable<GameScore[]> {
    return this.scores$.asObservable();
  }

  getScoresByGame(gameId: string): Observable<GameScore[]> {
    return new Observable(observer => {
      const filtered = this.scores$.value.filter(s => s.gameId === gameId);
      observer.next(filtered);
      observer.complete();
    });
  }

  private updateHighScore(gameId: string, newScore: number): void {
    const games = this.games$.value;
    const game = games.find(g => g.id === gameId);
    if (game && newScore > game.highScore) {
      game.highScore = newScore;
      this.games$.next([...games]);
    }
  }

  private saveScores(): void {
    localStorage.setItem('arcadeScores', JSON.stringify(this.scores$.value));
  }

  private loadScores(): void {
    const stored = localStorage.getItem('arcadeScores');
    if (stored) {
      try {
        const scores = JSON.parse(stored);
        this.scores$.next(scores);
      } catch (e) {
        console.error('Error loading scores', e);
      }
    }
  }
}
