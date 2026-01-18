import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../core/models/game.model';
import { HangmanComponent } from '../../shared/webcomponents/hangman.component';
import { WordleComponent } from '../../shared/webcomponents/wordle.component';
import { SnakeComponent } from '../../shared/webcomponents/snake.component';
import { ParchisComponent } from '../../shared/webcomponents/parchis.component';
import { BattleshipComponent } from '../../shared/webcomponents/battleship.component';
import { PlaceholderGamesComponent } from '../../shared/webcomponents/placeholder-games.component';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, HangmanComponent, WordleComponent, SnakeComponent, ParchisComponent, BattleshipComponent, PlaceholderGamesComponent],
  template: `
    <div class="game-detail-container" *ngIf="game">
      <app-hangman *ngIf="game.id === 'hangman'"></app-hangman>
      <app-wordle *ngIf="game.id === 'wordle'"></app-wordle>
      <app-snake *ngIf="game.id === 'snake'"></app-snake>
      <app-parchis *ngIf="game.id === 'parchis'"></app-parchis>
      <app-battleship *ngIf="game.id === 'battleship'"></app-battleship>
      <app-placeholder-games 
        *ngIf="!['hangman', 'wordle', 'snake', 'parchis', 'battleship'].includes(game.id)"
        [gameName]="game.name"
        [description]="game.description"
        [icon]="game.icon">
      </app-placeholder-games>
    </div>

    <div class="game-detail-loading" *ngIf="!game">
      <p>Loading game...</p>
    </div>
  `,
  styles: [`
    .game-detail-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .game-detail-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      color: var(--color-primary);
      font-size: 1.25rem;
      font-weight: 600;
    }
  `]
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      this.gameService.getGameById(gameId).subscribe(game => {
        if (game) {
          this.game = game;
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }
}
