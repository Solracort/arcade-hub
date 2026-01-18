import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-games',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-container">
      <div class="placeholder-icon">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
      <h2>{{ gameName }}</h2>
      <p>{{ description }}</p>
      <p class="coming-soon">Coming Soon</p>
    </div>
  `,
  styles: [`
    .placeholder-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);
      text-align: center;
      padding: var(--spacing-xl);
      border: 2px dashed var(--color-border-light);
      border-radius: var(--radius-md);
      background: rgba(0, 212, 255, 0.05);
    }

    .placeholder-icon {
      font-size: 4rem;
      color: var(--color-primary);
      opacity: 0.5;
    }

    h2 {
      color: var(--color-primary);
      font-size: 1.5rem;
    }

    p {
      color: var(--color-text-secondary);
      max-width: 400px;
    }

    .coming-soon {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-secondary);
      animation: neon-blink 1.5s ease-in-out infinite;
    }
  `]
})
export class PlaceholderGamesComponent {
  @Input() gameName: string = 'Game Title';
  @Input() description: string = 'This game is under development';
  @Input() icon: string = 'gamepad';
}
