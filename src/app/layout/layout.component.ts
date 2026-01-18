import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="crt-overlay"></div>
    <div class="layout-wrapper">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--color-bg-dark);
      color: var(--color-text-primary);
      position: relative;
      overflow-x: hidden;
    }

    .main-content {
      flex: 1;
      padding: var(--spacing-xl) var(--spacing-lg);
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;

      @media (max-width: 768px) {
        padding: var(--spacing-lg) var(--spacing-md);
      }

      @media (max-width: 480px) {
        padding: var(--spacing-md);
      }
    }
  `]
})
export class LayoutComponent {}
