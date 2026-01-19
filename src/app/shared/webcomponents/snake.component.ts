import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from './base-game.component';

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

        <!-- Mobile Controls -->
        <div class="mobile-controls">
          <button class="control-btn up" (click)="moveSnake('up')" [disabled]="gameOver">
            <span class="material-symbols-outlined">arrow_upward</span>
          </button>
          <div class="control-row">
            <button class="control-btn left" (click)="moveSnake('left')" [disabled]="gameOver">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button class="control-btn down" (click)="moveSnake('down')" [disabled]="gameOver">
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
            <button class="control-btn right" (click)="moveSnake('right')" [disabled]="gameOver">
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- Game Controls -->
        <div class="controls">
          <button (click)="togglePause()" class="btn btn-outline" [disabled]="gameOver">
            {{ isPaused ? 'Reanudar' : 'Pausa' }}
          </button>
          <button (click)="newGame()" class="btn btn-primary">
            Nuevo Juego
          </button>
        </div>

        <!-- Info -->
        <div class="game-info">
          <span *ngIf="gameOver" class="game-over">GAME OVER - Puntuación: {{ score }}</span>
          <span *ngIf="!gameOver && isPaused" class="status">PAUSADO</span>
          <span *ngIf="!gameOver && !isPaused" class="status">{{ score }} Puntos</span>
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
      padding: var(--spacing-lg);
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
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1;
    }

    .grid-cell {
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

    /* Mobile Controls - D-Pad Style */
    .mobile-controls {
      display: grid;
      grid-template-columns: repeat(3, 60px);
      grid-template-rows: repeat(3, 60px);
      gap: 8px;
      background: rgba(0, 212, 255, 0.05);
      padding: var(--spacing-lg);
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-lg);
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    }

    .control-btn {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 212, 255, 0.05));
      border: 2px solid var(--color-primary);
      border-radius: 8px;
      color: var(--color-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      transition: all 0.2s ease;
      padding: 0;

      &:hover:not(:disabled) {
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.1));
        box-shadow: 0 0 12px rgba(0, 212, 255, 0.5);
        transform: scale(1.05);
      }

      &:active:not(:disabled) {
        transform: scale(0.95);
        box-shadow: inset 0 0 8px rgba(0, 212, 255, 0.4);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .control-btn.up {
      grid-column: 2;
      grid-row: 1;
    }

    .control-row {
      grid-column: 1 / 4;
      grid-row: 2;
      display: grid;
      grid-template-columns: repeat(3, 60px);
      gap: 8px;
    }

    .control-btn.left {
      grid-column: 1;
    }

    .control-btn.down {
      grid-column: 2;
    }

    .control-btn.right {
      grid-column: 3;
    }

    .controls {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }

    .game-info {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 2rem;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 100%;
      max-width: 400px;
    }

    .game-over {
      color: var(--color-danger);
      animation: neon-blink 1s ease-in-out infinite;
    }

    .status {
      color: var(--color-primary);
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    @media (max-width: 768px) {
      .game-board {
        max-width: 100%;
      }

      .mobile-controls {
        grid-template-columns: repeat(3, 50px);
        grid-template-rows: repeat(3, 50px);
        gap: 6px;
      }

      .control-btn {
        width: 50px;
        height: 50px;
      }

      .control-row {
        grid-template-columns: repeat(3, 50px);
      }
    }

    @media (max-width: 480px) {
      .snake-game {
        padding: var(--spacing-md);
        gap: var(--spacing-md);
      }

      .game-board {
        max-width: 90vw;
      }

      .mobile-controls {
        grid-template-columns: repeat(3, 45px);
        grid-template-rows: repeat(3, 45px);
        gap: 5px;
        padding: var(--spacing-md);
      }

      .control-btn {
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
      }

      .control-row {
        grid-template-columns: repeat(3, 45px);
        gap: 5px;
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

  moveSnake(direction: 'up' | 'down' | 'left' | 'right'): void {
    if (this.gameOver || this.isPaused) return;

    switch (direction) {
      case 'up':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        break;
      case 'down':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        break;
      case 'left':
        if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        break;
      case 'right':
        if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
        break;
    }
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
