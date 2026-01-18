# Developer Guide - Arcade Hub

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   AppComponent                          │
├─────────────────────────────────────────────────────────┤
│         Router & Layout Component                       │
├─────────────────────────────────────────────────────────┤
│  Header  │          Main Content Area          │ Footer │
├──────────┤──────────────────────────────────────┤────────┤
│          │  Home / GameHub / GameDetail         │        │
│          │         Components                  │        │
└──────────┴──────────────────────────────────────┴────────┘
```

## Data Flow

```
GameService (State Management)
├── getGames() → Observable<Game[]>
├── getGameById(id) → Observable<Game>
├── addScore(score) → Update localStorage
└── getScores() → Observable<GameScore[]>

ScoreService (Game Runtime State)
├── currentScore
├── currentLives
├── multiplier
└── resetScore()
```

## Creating a New Game Component

### Step 1: Create the Component

```typescript
// src/app/shared/webcomponents/my-game.component.ts
import { Component } from '@angular/core';
import { BaseGameComponent } from './base-game.component';

@Component({
  selector: 'app-my-game',
  standalone: true,
  imports: [BaseGameComponent, CommonModule],
  template: `
    <app-base-game 
      gameId="MY_GAME_001"
      [currentScore]="score"
      [currentLives]="lives"
      (backClicked)="goBack()">
      
      <!-- Your game content -->
      <div class="my-game-content">
        <!-- Game UI here -->
      </div>
    </app-base-game>
  `,
  styles: [`/* Your styles */`]
})
export class MyGameComponent {
  score = 0;
  lives = 3;
  
  ngOnInit() {
    // Initialize game logic
  }

  goBack() {
    // Navigate back to hub
  }
}
```

### Step 2: Register in GameService

Edit `src/app/core/services/game.service.ts`:

```typescript
private games$ = new BehaviorSubject<Game[]>([
  // ... existing games
  {
    id: 'my-game',
    name: 'My Game',
    description: 'Amazing game description',
    category: 'action',
    icon: 'gamepad',
    componentName: 'MyGameComponent',
    highScore: 0,
    tags: ['tag1', 'tag2'],
    difficulty: 'medium'
  }
]);
```

### Step 3: Update GameDetail Component

Edit `src/app/pages/game-detail/game-detail.component.ts` to import and include your component:

```typescript
import { MyGameComponent } from '../../shared/webcomponents/my-game.component';

@Component({
  imports: [CommonModule, HangmanComponent, PlaceholderGamesComponent, MyGameComponent],
  template: `
    <div class="game-detail-container" *ngIf="game">
      <app-hangman *ngIf="game.id === 'hangman'"></app-hangman>
      <app-my-game *ngIf="game.id === 'my-game'"></app-my-game>
      <!-- ... other games -->
    </div>
  `
})
export class GameDetailComponent implements OnInit { }
```

## Using Services in Components

### GameService - Get All Games

```typescript
import { GameService } from '../../core/services/game.service';

@Component({...})
export class MyComponent {
  games$ = this.gameService.getGames();
  
  constructor(private gameService: GameService) {}
}
```

### ScoreService - Update Score

```typescript
import { ScoreService } from '../../core/services/score.service';

@Component({...})
export class MyGameComponent {
  constructor(private scoreService: ScoreService) {}
  
  addPointsToScore(points: number) {
    this.scoreService.addScore(points);
  }
  
  loseLife() {
    this.scoreService.removeLive();
  }
}
```

## Styling Guide

### Using CSS Variables

```scss
// Dark mode colors
background-color: var(--color-bg-dark);
color: var(--color-text-primary);

// Neon effects
box-shadow: 0 0 10px var(--color-primary-shadow);
filter: drop-shadow(0 0 8px var(--color-primary));

// Animations
animation: neon-pulse 2s ease-in-out infinite;
animation: neon-blink 1.5s ease-in-out infinite;
```

### Responsive Breakpoints

```scss
// Desktop (default)
.container { width: 100%; }

// Tablet
@media (max-width: 768px) {
  .container { padding: var(--spacing-md); }
}

// Mobile
@media (max-width: 480px) {
  .container { padding: var(--spacing-sm); }
}
```

## Component Communication

### Parent to Child (Inputs)

```typescript
// Parent
<app-child [gameId]="'MY_GAME'" [score]="100"></app-child>

// Child
@Input() gameId: string;
@Input() score: number;
```

### Child to Parent (Outputs)

```typescript
// Child
@Output() backClicked = new EventEmitter<void>();

goBack() {
  this.backClicked.emit();
}

// Parent
<app-child (backClicked)="handleBack()"></app-child>

handleBack() {
  this.router.navigate(['/']);
}
```

## Local Storage

### Saving Scores

```typescript
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
```

## Game State Management

### Current Game State

```typescript
// Initialize in component
ngOnInit() {
  this.scoreService.resetScore();
  this.gameState = {
    score: 0,
    lives: 3,
    level: 1,
    isPaused: false,
    isGameOver: false
  };
}

// Update during gameplay
updateState() {
  if (this.checkCollision()) {
    this.scoreService.removeLive();
  }
  if (this.gameState.lives === 0) {
    this.endGame();
  }
}

// Save final score
endGame() {
  this.gameService.addScore({
    gameId: 'my-game',
    playerName: 'Player',
    score: this.scoreService.getScore(),
    date: new Date()
  });
}
```

## Common UI Patterns

### Button Styles

```html
<!-- Primary Button -->
<button class="btn btn-primary">
  <span class="material-symbols-outlined">play_arrow</span>
  Play
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Submit</button>

<!-- Outline Button -->
<button class="btn btn-outline">Cancel</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Info</button>
```

### Card Component

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>
```

### Loading State

```html
<div *ngIf="isLoading; else loaded">
  <p class="text-primary">Loading...</p>
</div>
<ng-template #loaded>
  <!-- Your content -->
</ng-template>
```

## Testing

```typescript
// Example unit test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyGameComponent } from './my-game.component';

describe('MyGameComponent', () => {
  let component: MyGameComponent;
  let fixture: ComponentFixture<MyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct score', () => {
    expect(component.score).toBe(0);
  });
});
```

## Performance Tips

1. **Use OnPush Change Detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Unsubscribe from Observables**
   ```typescript
   ngOnInit() {
     this.subscription = this.gameService.getGames().subscribe(...);
   }
   
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
   ```

3. **Use Async Pipe**
   ```html
   <div *ngFor="let game of games$ | async">{{ game.name }}</div>
   ```

4. **Lazy Load Images**
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

## Debugging

### Enable Debug Mode

```typescript
// In main.ts
import { enableDebugTools } from '@angular/platform-browser';

enableDebugTools(componentRef);
```

### Console Logging

```typescript
console.log('Game State:', this.gameState);
console.error('Error occurred:', error);
```

## Build & Deploy

### Development

```bash
npm start
# App runs on http://localhost:4200
```

### Production

```bash
npm run build
# Output in dist/arcade-hub/
```

### Serve Locally

```bash
npm install -g http-server
http-server dist/arcade-hub/
```

## Troubleshooting

### Common Issues

**Issue**: Styles not loading
- **Solution**: Check SCSS imports in styles.scss

**Issue**: Component not rendering
- **Solution**: Ensure component is imported in imports array

**Issue**: Service not providing data
- **Solution**: Verify `providedIn: 'root'` in service decorator

**Issue**: Navigation not working
- **Solution**: Check routes in app.routes.ts

## Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Web Components](https://webcomponents.org/)

## Best Practices

1. ✅ Use standalone components
2. ✅ Keep services focused and single-responsibility
3. ✅ Use TypeScript strict mode
4. ✅ Document complex logic
5. ✅ Use meaningful variable names
6. ✅ Test your components
7. ✅ Optimize bundle size
8. ✅ Follow Angular style guide

---

Happy coding! 🚀
