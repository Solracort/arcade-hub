import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-container">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-icon">
            <span class="material-symbols-outlined">sports_esports</span>
          </div>
          <h1 class="logo-text">
            ARCADE <span class="text-primary italic">HUB</span>
          </h1>
        </div>

        <!-- Navigation -->
        <nav class="nav-menu">
          <a href="/" class="nav-link active">HOME</a>
          <a href="/hub" class="nav-link">GAMES</a>
          <a href="#" class="nav-link">SCORES</a>
          <a href="#" class="nav-link">ABOUT</a>
        </nav>

        <!-- User Actions -->
        <div class="header-actions">
          <button class="icon-btn" title="User Profile">
            <span class="material-symbols-outlined">person</span>
          </button>
          <div class="avatar"></div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: var(--z-sticky);
      border-bottom: 1px solid var(--color-border-light);
      background: rgba(var(--color-bg-dark), 0.8);
      backdrop-filter: blur(10px);
      padding: var(--spacing-md) 0;
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-xl);
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      flex-shrink: 0;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-md);
      background-color: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.5);
      color: var(--color-primary);
      font-size: 1.5rem;

      .material-symbols-outlined {
        font-size: 1.5rem;
      }
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--color-text-primary);
      white-space: nowrap;

      span {
        font-style: italic;
      }
    }

    .nav-menu {
      display: none;
      gap: var(--spacing-xl);
      align-items: center;
      flex: 1;

      @media (min-width: 769px) {
        display: flex;
      }
    }

    .nav-link {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      transition: all 0.2s ease;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid transparent;

      &:hover,
      &.active {
        color: var(--color-primary);
        border-bottom-color: var(--color-primary);
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-light);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text-primary);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: var(--color-primary);
      }

      .material-symbols-outlined {
        font-size: 1.25rem;
      }
    }

    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid var(--color-primary);
      background: linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .header-container {
        padding: 0 var(--spacing-md);
        gap: var(--spacing-md);
      }

      .logo-text {
        font-size: 1rem;
      }
    }
  `]
})
export class HeaderComponent {}
