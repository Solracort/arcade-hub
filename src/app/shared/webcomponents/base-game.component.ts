import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Clase base abstracta para todos los juegos
@Component({
  selector: 'app-base-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <div class="game-header">
        <button class="btn-back" (click)="goBack()">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Menu
        </button>
        <div class="game-info">
          <span class="status-label">SYSTEM STATUS</span>
          <span class="status-value">ARCADE_MODE_ACTIVE</span>
        </div>
        <div class="game-stats">
          <div class="stat-item">
            <span class="stat-label">Score</span>
            <span class="stat-value">{{ currentScore }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Lives</span>
            <div class="lives-display">
              <span class="material-symbols-outlined fill" *ngFor="let i of [1,2,3]"
                    [class.empty]="i > currentLives">favorite</span>
            </div>
          </div>
        </div>
      </div>

      <div class="game-content">
        <ng-content></ng-content>
      </div>

      <div class="game-footer">
        <span class="footer-text">ID: {{ gameId }}</span>
        <span class="footer-text">MODE: {{ gameMode }}</span>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      gap: var(--spacing-lg);
      width: 100%;
    }

    .game-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-lg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface);
      flex-wrap: wrap;
      gap: var(--spacing-md);

      @media (max-width: 768px) {
        padding: var(--spacing-md);
      }
    }

    .btn-back {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-card);
      border: 1px solid var(--color-border-light);
      color: var(--color-text-primary);
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.875rem;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--color-primary);
        background-color: rgba(0, 212, 255, 0.1);
      }

      .material-symbols-outlined {
        font-size: 1rem;
      }
    }

    .game-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .status-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .status-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .game-stats {
      display: flex;
      gap: var(--spacing-lg);
      align-items: center;

      @media (max-width: 480px) {
        gap: var(--spacing-md);
      }
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      align-items: center;
    }

    .stat-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .lives-display {
      display: flex;
      gap: var(--spacing-xs);
    }

    .material-symbols-outlined {
      font-size: 1.25rem;
      color: #ff006e;

      &.empty {
        opacity: 0.2;
      }
    }

    .game-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: rgba(var(--color-bg-card), 0.5);
      min-height: 400px;

      @media (max-width: 768px) {
        padding: var(--spacing-lg);
        min-height: 300px;
      }

      @media (max-width: 480px) {
        padding: var(--spacing-md);
        min-height: 250px;
      }
    }

    .game-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      border-top: 1px solid var(--color-border-light);

      @media (max-width: 480px) {
        flex-direction: column;
        gap: var(--spacing-sm);
        text-align: center;
      }
    }

    .footer-text {
      font-family: var(--font-mono);
    }
  `]
})
export class BaseGameComponent {
  @Input() gameId: string = 'GAME_00';
  @Input() gameMode: string = 'ARCADE';
  @Input() currentScore: number = 0;
  @Input() currentLives: number = 3;
  @Output() backClicked = new EventEmitter<void>();

  goBack(): void {
    this.backClicked.emit();
  }
}
