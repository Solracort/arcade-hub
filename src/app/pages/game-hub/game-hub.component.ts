import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-game-hub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="game-hub">
      <h1>Game Hub</h1>
      <div class="games-list">
        <div class="game-item" *ngFor="let game of games$ | async" [routerLink]="['/game', game.id]">
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
          <p class="high-score">High Score: {{ game.highScore }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-hub {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 2rem;
      color: var(--color-primary);
    }

    .games-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .game-item {
      padding: var(--spacing-lg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-card);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
      }

      h3 {
        color: var(--color-primary);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--color-text-secondary);
        margin-bottom: 0.5rem;
      }

      .high-score {
        color: var(--color-secondary);
        font-weight: 600;
      }
    }
  `]
})
export class GameHubComponent {
  games$ = this.gameService.getGames();

  constructor(private gameService: GameService) {}
}
