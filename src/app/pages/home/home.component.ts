import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../core/models/game.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-badge">
          <span class="badge-blink">SYSTEM ONLINE</span>
        </div>
        
        <h1 class="hero-title">
          SELECT YOUR <span class="text-primary underline">CHALLENGE</span>
        </h1>
        
        <p class="hero-subtitle">
          Welcome to the central node. Choose a protocol to begin execution.
          All scores are logged to the global mainframe.
        </p>
      </section>

      <!-- Game Grid -->
      <section class="games-section">
        <h2 class="section-title">Available Games</h2>
        
        <div class="games-grid">
          <div class="game-card" *ngFor="let game of games$ | async"
               [routerLink]="['/game', game.id]">
            <div class="card-image">
              <div class="icon-container">
                <span class="material-symbols-outlined">{{ game.icon }}</span>
              </div>
              <div class="category-badge">{{ game.category | titlecase }}</div>
            </div>
            
            <div class="card-content">
              <h3 class="card-title">{{ game.name }}</h3>
              <p class="card-description">{{ game.description }}</p>
              
              <button class="btn btn-primary card-button">
                <span class="material-symbols-outlined">play_arrow</span>
                Play
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Scores Section -->
      <section class="scores-section">
        <div class="section-header">
          <span class="material-symbols-outlined">military_tech</span>
          <h2>Hall of Fame</h2>
          <div class="divider"></div>
        </div>

        <div class="scores-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Node</th>
                <th>Protocol</th>
                <th class="text-right">High Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>USER_ALPHA</td>
                <td>Hangman</td>
                <td class="text-right text-primary">12,450</td>
              </tr>
              <tr>
                <td>2</td>
                <td>USER_BETA</td>
                <td>Snake</td>
                <td class="text-right text-primary">9,875</td>
              </tr>
              <tr>
                <td>3</td>
                <td>USER_GAMMA</td>
                <td>Tetris</td>
                <td class="text-right text-primary">8,620</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2xl);
      width: 100%;
    }

    // ========== HERO SECTION ==========
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
      text-align: center;
      padding: var(--spacing-2xl) var(--spacing-xl);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 255, 0.02) 100%);
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--color-secondary);
      border-radius: var(--radius-md);
      background-color: transparent;
    }

    .badge-blink {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-secondary);
      animation: neon-blink 1.5s ease-in-out infinite;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      color: var(--color-text-primary);
      line-height: 1.2;

      .underline {
        text-decoration: underline;
        text-decoration-color: rgba(0, 212, 255, 0.3);
      }

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }

      @media (max-width: 480px) {
        font-size: 1.5rem;
      }
    }

    .hero-subtitle {
      max-width: 600px;
      font-size: 1rem;
      color: var(--color-text-secondary);
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }

    // ========== GAMES SECTION ==========
    .games-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-primary);
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--spacing-lg);

      @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .game-card {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-card);
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        border-color: var(--color-primary);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
      }
    }

    .card-image {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: var(--color-primary);
      opacity: 0.8;
      transition: transform 0.3s ease;

      .game-card:hover & {
        transform: scale(1.1);
      }
    }

    .category-badge {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: rgba(10, 12, 16, 0.8);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-xs);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      padding: var(--spacing-lg);
      flex: 1;
    }

    .card-title {
      font-size: 1.125rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-primary);
    }

    .card-description {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      flex: 1;
    }

    .card-button {
      margin-top: auto;
    }

    // ========== SCORES SECTION ==========
    .scores-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding-bottom: var(--spacing-md);

      .material-symbols-outlined {
        font-size: 1.5rem;
        color: var(--color-primary);
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-primary);
      }

      .divider {
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, var(--color-border-light), transparent);
      }
    }

    .scores-table {
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: rgba(var(--color-bg-card), 0.5);
      overflow: hidden;
      backdrop-filter: blur(10px);

      table {
        width: 100%;
        border-collapse: collapse;

        thead {
          background-color: rgba(255, 255, 255, 0.05);

          tr {
            border-bottom: 1px solid var(--color-border-light);
          }

          th {
            padding: var(--spacing-lg);
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: var(--color-primary);
            text-align: left;
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid var(--color-border-dark);
            transition: background-color 0.2s ease;

            &:hover {
              background-color: rgba(0, 212, 255, 0.05);
            }

            &:last-child {
              border-bottom: none;
            }
          }

          td {
            padding: var(--spacing-lg);
            font-size: 0.875rem;
            color: var(--color-text-secondary);
          }
        }

        .text-right {
          text-align: right;
        }

        .text-primary {
          color: var(--color-primary);
          font-weight: 600;
        }
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 1.25rem;
      }

      .games-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      table {
        font-size: 0.75rem;

        th, td {
          padding: var(--spacing-md);
        }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  games$ = this.gameService.getGames();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
}
