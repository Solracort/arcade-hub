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
        <!-- Game Boy Style Container -->
        <div class="gameboy-container">
          <!-- Screen -->
          <div class="gameboy-screen">
            <div class="game-board">
              <div class="grid-cell" 
                   *ngFor="let cell of gameGrid; let i = index"
                   [class.snake]="isSnakeCell(i)"
                   [class.food]="isFoodCell(i)">
              </div>
            </div>
            <div class="game-info">
              <span *ngIf="gameOver" class="game-over">GAME OVER - {{ score }}</span>
              <span *ngIf="!gameOver && isPaused" class="status">PAUSADO</span>
              <span *ngIf="!gameOver && !isPaused" class="status">{{ score }} Puntos</span>
            </div>
          </div>

          <!-- Controls Container -->
          <div class="controls-container">
            <!-- D-Pad (Left) -->
            <div class="dpad-section">
              <div class="mobile-controls" #dpad>
                <button class="control-btn up" (click)="moveSnake('up')" (touchstart)="moveSnake('up')" [disabled]="gameOver">
                  <span class="material-symbols-outlined">arrow_upward</span>
                </button>
                <div class="control-row">
                  <button class="control-btn left" (click)="moveSnake('left')" (touchstart)="moveSnake('left')" [disabled]="gameOver">
                    <span class="material-symbols-outlined">arrow_back</span>
                  </button>
                  <div class="center-spacer"></div>
                  <button class="control-btn right" (click)="moveSnake('right')" (touchstart)="moveSnake('right')" [disabled]="gameOver">
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <button class="control-btn down" (click)="moveSnake('down')" (touchstart)="moveSnake('down')" [disabled]="gameOver">
                  <span class="material-symbols-outlined">arrow_downward</span>
                </button>
              </div>
            </div>

            <!-- Action Buttons (Center-Bottom) -->
            <div class="buttons-section">
              <button (click)="togglePause()" (touchstart)="togglePause()" class="action-btn pause-btn" [disabled]="gameOver" title="Pausa/Reanudar">
                <span class="material-symbols-outlined">{{ isPaused ? 'play_arrow' : 'pause' }}</span>
              </button>
              <button (click)="newGame()" (touchstart)="newGame()" class="action-btn start-btn" title="Nuevo Juego">
                <span class="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    .snake-game {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: var(--spacing-lg);
      min-height: 100vh;
    }

    .gameboy-container {
      background: linear-gradient(135deg, #3a3a3a, #2a2a2a);
      border: 8px solid #1a1a1a;
      border-radius: 30px;
      padding: 30px;
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.8),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 0 30px rgba(0, 212, 255, 0.2);
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      position: relative;
    }

    .gameboy-screen {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
      border: 4px solid #0a0a0a;
      border-radius: 12px;
      padding: var(--spacing-md);
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
    }

    .game-board {
      display: grid;
      grid-template-columns: repeat(15, 1fr);
      gap: 1px;
      background-color: var(--color-bg-surface);
      padding: var(--spacing-md);
      border: 2px solid var(--color-primary);
      border-radius: 8px;
      width: 100%;
      aspect-ratio: 1;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    }

    .grid-cell {
      background-color: var(--color-bg-dark);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: 2px;
      transition: all 0.1s ease;
    }

    .grid-cell.snake {
      background-color: var(--color-primary);
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
      border-color: var(--color-primary);
    }

    .grid-cell.food {
      background-color: var(--color-secondary);
      box-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
      border-color: var(--color-secondary);
      animation: food-pulse 0.5s ease-in-out infinite;
    }

    @keyframes food-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .game-info {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 28px;
      padding: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--color-border-light);
      border-radius: 6px;
    }

    .game-over {
      color: var(--color-danger);
      animation: neon-blink 1s ease-in-out infinite;
    }

    .status {
      color: var(--color-primary);
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    .controls-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 30px;
    }

    .dpad-section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .mobile-controls {
      display: grid;
      grid-template-columns: repeat(3, 90px);
      grid-template-rows: repeat(3, 90px);
      gap: 12px;
      background: rgba(0, 0, 0, 0.3);
      padding: 25px;
      border-radius: 20px;
      border: 3px solid rgba(0, 212, 255, 0.3);
      touch-action: manipulation;
    }

    .control-btn {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.08));
      border: 3px solid var(--color-primary);
      border-radius: 12px;
      color: var(--color-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: all 0.15s ease;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      touch-action: manipulation;
    }

    .control-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(0, 212, 255, 0.15));
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
      transform: scale(1.08);
    }

    .control-btn:active:not(:disabled) {
      transform: scale(0.92);
      box-shadow: inset 0 0 12px rgba(0, 212, 255, 0.5);
    }

    .control-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .control-btn.up {
      grid-column: 2;
      grid-row: 1;
    }

    .control-row {
      grid-column: 1 / 4;
      grid-row: 2;
      display: grid;
      grid-template-columns: repeat(3, 90px);
      gap: 12px;
    }

    .control-btn.left {
      grid-column: 1;
    }

    .center-spacer {
      grid-column: 2;
    }

    .control-btn.right {
      grid-column: 3;
    }

    .control-btn.down {
      grid-column: 2;
      grid-row: 3;
    }

    .buttons-section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 30px;
      width: 100%;
    }

    .action-btn {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 4px solid;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      transition: all 0.2s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      touch-action: manipulation;
    }

    .action-btn:hover:not(:disabled) {
      transform: scale(1.12);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
    }

    .action-btn:active:not(:disabled) {
      transform: scale(0.93);
      box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.6);
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pause-btn {
      border-color: #ff9500;
      background: radial-gradient(circle at 30% 30%, rgba(255, 149, 0, 0.4), rgba(255, 149, 0, 0.15));
      color: #ff9500;
    }

    .start-btn {
      border-color: #1f883d;
      background: radial-gradient(circle at 30% 30%, rgba(31, 136, 61, 0.4), rgba(31, 136, 61, 0.15));
      color: #1f883d;
    }

    @media (max-width: 768px) {
      .gameboy-container {
        padding: 20px;
        gap: 20px;
        max-width: 100%;
      }

      .controls-container {
        gap: 20px;
      }

      .mobile-controls {
        grid-template-columns: repeat(3, 75px);
        grid-template-rows: repeat(3, 75px);
        gap: 10px;
        padding: 20px;
      }

      .control-btn {
        width: 75px;
        height: 75px;
        font-size: 1.8rem;
      }

      .control-row {
        grid-template-columns: repeat(3, 75px);
        gap: 10px;
      }

      .action-btn {
        width: 95px;
        height: 95px;
        font-size: 2rem;
      }
    }

    @media (max-width: 480px) {
      .snake-game {
        padding: var(--spacing-md);
      }

      .gameboy-container {
        padding: 15px;
        gap: 15px;
        border-width: 6px;
        border-radius: 20px;
        max-width: 100%;
      }

      .controls-container {
        gap: 15px;
      }

      .mobile-controls {
        grid-template-columns: repeat(3, 65px);
        grid-template-rows: repeat(3, 65px);
        gap: 8px;
        padding: 15px;
      }

      .control-btn {
        width: 65px;
        height: 65px;
        font-size: 1.6rem;
      }

      .control-row {
        grid-template-columns: repeat(3, 65px);
        gap: 8px;
      }

      .action-btn {
        width: 85px;
        height: 85px;
        font-size: 1.8rem;
      }

      .buttons-section {
        gap: 20px;
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

    if (newRow < 0 || newRow >= this.gridSize || newCol < 0 || newCol >= this.gridSize) {
      this.endGame();
      return;
    }

    const newHead = newRow * this.gridSize + newCol;

    if (this.snake.includes(newHead)) {
      this.endGame();
      return;
    }

    this.snake.unshift(newHead);

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
