import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../webcomponents/base-game.component';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <app-base-game
      gameId="SNAKE_001"
      [currentScore]="score"
      [currentLives]="1"
      (backClicked)="goBack()">
      
      <div class="snake-game">
        <!-- Game Canvas -->
        <div class="game-board">
          <div class="grid-cell" 
               *ngFor="let cell of gameGrid; let i = index"
               [class.snake]="isSnakeCell(i)"
               [class.food]="isFoodCell(i)">
          </div>
        </div>

        <!-- Controls -->
        <div class="controls">
          <button (click)="togglePause()" class="btn btn-outline">
            {{ isPaused ? 'Resume' : 'Pause' }}
          </button>
          <button (click)="newGame()" class="btn btn-primary">
            New Game
          </button>
        </div>

        <!-- Info -->
        <div class="game-info">
          <span *ngIf="gameOver" class="game-over">GAME OVER</span>
          <span *ngIf="!gameOver" class="status">Use arrow keys to move</span>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    .snake-game {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
      width: 100%;
    }

    .game-board {
      display: grid;
      grid-template-columns: repeat(15, 1fr);
      gap: 1px;
      background-color: var(--color-bg-surface);
      padding: var(--spacing-md);
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-md);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
    }

    .grid-cell {
      width: 2rem;
      height: 2rem;
      background-color: var(--color-bg-dark);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: 2px;
      transition: all 0.1s ease;

      &.snake {
        background-color: var(--color-primary);
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
        border-color: var(--color-primary);
      }

      &.food {
        background-color: var(--color-secondary);
        box-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
        border-color: var(--color-secondary);
        animation: food-pulse 0.5s ease-in-out infinite;
      }
    }

    @keyframes food-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .controls {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
    }

    .game-info {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .game-over {
      color: var(--color-danger);
      animation: neon-blink 1s ease-in-out infinite;
    }

    .status {
      color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
      .game-board {
        grid-template-columns: repeat(12, 1fr);
      }

      .grid-cell {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .game-board {
        grid-template-columns: repeat(10, 1fr);
      }

      .grid-cell {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  `]
})
export class SnakeComponent implements OnInit, OnDestroy {
  private gridSize = 15;
  gameGrid: boolean[] = [];
  snake: number[] = [];
  food: number = 0;
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score: number = 0;
  gameOver: boolean = false;
  isPaused: boolean = false;
  private gameLoop: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.newGame();
    this.setupKeyboardControls();
  }

  ngOnDestroy(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  newGame(): void {
    this.gameGrid = Array(this.gridSize * this.gridSize).fill(false);
    this.snake = [Math.floor(this.gridSize * this.gridSize / 2)];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this.gameOver = false;
    this.isPaused = false;
    this.spawnFood();
    this.startGameLoop();
  }

  private spawnFood(): void {
    let newFood = Math.floor(Math.random() * (this.gridSize * this.gridSize));
    while (this.snake.includes(newFood)) {
      newFood = Math.floor(Math.random() * (this.gridSize * this.gridSize));
    }
    this.food = newFood;
  }

  private startGameLoop(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    this.gameLoop = setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.updateGame();
      }
    }, 150);
  }

  private updateGame(): void {
    this.direction = { ...this.nextDirection };
    
    const head = this.snake[0];
    const row = Math.floor(head / this.gridSize);
    const col = head % this.gridSize;

    let newRow = row + this.direction.y;
    let newCol = col + this.direction.x;

    // Wall collision
    if (newRow < 0 || newRow >= this.gridSize || newCol < 0 || newCol >= this.gridSize) {
      this.endGame();
      return;
    }

    const newHead = newRow * this.gridSize + newCol;

    // Self collision
    if (this.snake.includes(newHead)) {
      this.endGame();
      return;
    }

    this.snake.unshift(newHead);

    // Food collision
    if (newHead === this.food) {
      this.score += 100;
      this.spawnFood();
    } else {
      this.snake.pop();
    }

    this.updateGrid();
  }

  private updateGrid(): void {
    this.gameGrid.fill(false);
    this.snake.forEach(pos => {
      if (pos < this.gameGrid.length) {
        this.gameGrid[pos] = true;
      }
    });
  }

  private endGame(): void {
    this.gameOver = true;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  private setupKeyboardControls(): void {
    document.addEventListener('keydown', (e) => {
      if (this.gameOver || this.isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
          e.preventDefault();
          break;
      }
    });
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
  }

  isSnakeCell(index: number): boolean {
    return this.gameGrid[index];
  }

  isFoodCell(index: number): boolean {
    return index === this.food;
  }

  goBack(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    this.router.navigate(['/']);
  }
}
