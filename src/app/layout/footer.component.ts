import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <span class="version">VER: 2.4.1</span>
          <span class="divider">•</span>
          <span class="year">EST. 1984</span>
          <span class="divider">•</span>
          <span class="engine">RETRO_ENGINE v.alpha</span>
        </div>
        <p class="footer-text">Neo-Retro Gaming Platform | © 2024 Arcade Hub</p>
        <div class="social-links">
          <a href="#" title="GitHub">GitHub</a>
          <span class="divider">|</span>
          <a href="#" title="Twitter">Twitter</a>
          <span class="divider">|</span>
          <a href="#" title="Discord">Discord</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      margin-top: auto;
      border-top: 1px solid var(--color-border-light);
      background-color: var(--color-bg-surface);
      padding: var(--spacing-xl) var(--spacing-lg);
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .footer-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .version {
      color: var(--color-primary);
    }

    .year {
      color: rgba(0, 212, 255, 0.5);
    }

    .engine {
      color: var(--color-text-muted);
    }

    .divider {
      color: var(--color-text-disabled);
    }

    .footer-text {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .social-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      font-size: 0.875rem;

      a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;

        &:hover {
          color: var(--color-primary-light);
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }
      }
    }

    @media (max-width: 768px) {
      .footer-info {
        flex-wrap: wrap;
        font-size: 0.7rem;
      }

      .footer-text {
        font-size: 0.75rem;
      }
    }
  `]
})
export class FooterComponent {}
