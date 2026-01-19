import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from './base-game.component';

interface Ship {
  id: number;
  size: number;
  positions: number[];
  hits: number;
  sunk: boolean;
}

interface Cell {
  position: number;
  state: 'empty' | 'hit' | 'miss'; // empty, hit, miss
  shipId?: number;
}

const BOARD_SIZE = 100; // 10x10
const SHIPS = [
  { id: 1, size: 5, name: 'Acorazado' },
  { id: 2, size: 4, name: 'Crucero' },
  { id: 3, size: 3, name: 'Destructor' },
  { id: 4, size: 3, name: 'Submarino' },
  { id: 5, size: 2, name: 'Patrullero' }
];

@Component({
  selector: 'app-battleship',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <app-base-game
      gameId="BATTLESHIP_001"
      [currentScore]="score"
      [currentLives]="playerShipsRemaining"
      (backClicked)="goBack()">
      
      <div class="battleship-game">
        <div class="game-info-panel">
          <h3 class="game-title">HUNDIR LA FLOTA</h3>
          <div class="game-stats">
            <div class="stat-card">
              <span class="stat-label">TUS BARCOS</span>
              <span class="stat-value">{{ playerShipsRemaining }}/5</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">BARCOS ENEMIGOS</span>
              <span class="stat-value">{{ enemyShipsRemaining }}/5</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">RONDA</span>
              <span class="stat-value">{{ gamePhase }}</span>
            </div>
          </div>

          <div class="rules-box">
            <h4 class="rules-title">REGLAS</h4>
            <ul class="rules-list">
              <li><strong>5 Barcos:</strong> Acorazado (5), Crucero (4), Destructor (3), Submarino (3), Patrullero (2)</li>
              <li><strong>Turno Alternado:</strong> Tu turno vs IA</li>
              <li><strong>Azul Neon:</strong> Agua (sin barco)</li>
              <li><strong>Rojo Neon:</strong> Impacto (barco)</li>
              <li><strong>Gris:</strong> Ya atacado</li>
              <li><strong>Objetivo:</strong> Hundir todos los barcos enemigos</li>
            </ul>
          </div>
        </div>

        <div class="game-content">
          <div class="boards-container">
            <!-- Tablero del Jugador -->
            <div class="board-section">
              <h4 class="board-title">TUS BARCOS</h4>
              <div class="board" [class.disabled]="isPlayerTurn">
                <div class="cell" 
                  *ngFor="let i of getBoardPositions()"
                  [ngClass]="getCellClass(i, true)"
                  (click)="onCellClick(i, false)">
                </div>
              </div>
            </div>

            <!-- Tablero del Enemigo -->
            <div class="board-section">
              <h4 class="board-title">FLOTA ENEMIGA</h4>
              <div class="board" [class.disabled]="!isPlayerTurn">
                <div class="cell" 
                  *ngFor="let i of getBoardPositions()"
                  [ngClass]="getCellClass(i, false)"
                  (click)="onCellClick(i, true)">
                </div>
              </div>
            </div>
          </div>

          <!-- Mensajes y Controles -->
          <div class="game-controls">
            <p class="game-message" [ngClass]="messageClass">{{ currentMessage }}</p>
            
            <div class="turn-display" [ngClass]="isPlayerTurn ? 'player-turn' : 'enemy-turn'">
              <span>{{ isPlayerTurn ? 'TU TURNO' : 'TURNO ENEMIGO' }}</span>
            </div>

            <button (click)="newGame()" class="btn btn-primary" [disabled]="!gameOver">
              Nuevo Juego
            </button>
          </div>

          <!-- Game Over Modal -->
          <div class="game-over-modal" *ngIf="gameOver">
            <div class="modal-box" [class.win]="playerWon">
              <h2>{{ playerWon ? '¡VICTORIA!' : 'DERROTA' }}</h2>
              <p class="result-text">{{ playerWon ? '¡Hundiste todos los barcos enemigos!' : 'Todos tus barcos fueron hundidos' }}</p>
              <p class="score-display">{{ score }} PUNTOS</p>
              <button (click)="newGame()" class="btn btn-primary">
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    .battleship-game {
      display: flex;
      gap: var(--spacing-lg);
      width: 100%;
      padding: var(--spacing-lg);
      flex-wrap: wrap;
      justify-content: center;
    }

    .game-info-panel {
      width: 280px;
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 111, 0.05));
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-lg);
      height: fit-content;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
      position: sticky;
      top: 80px;
    }

    .game-title {
      margin: 0 0 var(--spacing-md) 0;
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid var(--color-danger);
      font-size: 1.1rem;
      color: var(--color-danger);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      font-weight: 900;
    }

    .game-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-sm);
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-sm);
    }

    .stat-label {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .stat-value {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .rules-box {
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--color-border-light);
    }

    .rules-title {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: 0.9rem;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .rules-list li {
      font-size: 0.75rem;
      color: var(--color-text-primary);
      padding: 4px 8px;
      background: rgba(0, 212, 255, 0.05);
      border-left: 2px solid var(--color-secondary);
      border-radius: 2px;
    }

    .rules-list strong {
      color: var(--color-primary);
    }

    .game-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
      flex: 1;
    }

    .boards-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
      width: 100%;
      max-width: 900px;
    }

    .board-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .board-title {
      margin: 0;
      font-size: 0.95rem;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      font-weight: 700;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 2px;
      padding: var(--spacing-md);
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      width: 100%;
      aspect-ratio: 1;
      touch-action: manipulation;
    }

    .board.disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .cell {
      aspect-ratio: 1;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid var(--color-border-light);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
    }

    .cell:active {
      transform: scale(0.95);
    }

    .cell:hover:not(.attacked):not(.ship):not(.ally-ship) {
      background: rgba(0, 212, 255, 0.15);
      border-color: var(--color-primary);
      box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
    }

    .cell.ship {
      background: rgba(0, 102, 255, 0.2);
      border-color: #0066ff;
    }

    .cell.ally-ship {
      background: rgba(0, 102, 255, 0.2);
      border-color: #0066ff;
    }

    .cell.hit {
      background: #ff006e;
      border-color: #ff006e;
      box-shadow: 0 0 12px rgba(255, 0, 110, 0.6);
      color: white;
    }

    .cell.hit::after {
      content: '✕';
    }

    .cell.miss {
      background: rgba(100, 100, 100, 0.6);
      border-color: rgba(100, 100, 100, 0.8);
      color: rgba(150, 150, 150, 0.8);
    }

    .cell.miss::after {
      content: '○';
    }

    .cell.attacked:not(.hit):not(.miss) {
      background: rgba(50, 50, 50, 0.8);
      border-color: rgba(100, 100, 100, 0.6);
      cursor: default;
    }

    .game-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      width: 100%;
      max-width: 600px;
    }

    .game-message {
      min-height: 2rem;
      padding: var(--spacing-md);
      text-align: center;
      font-size: 0.95rem;
      color: var(--color-text-primary);
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-sm);
      animation: neon-pulse 0.5s ease-out;
    }

    .game-message.success {
      color: #1f883d;
      border-color: #1f883d;
      background: rgba(31, 136, 61, 0.1);
    }

    .game-message.error {
      color: var(--color-danger);
      border-color: var(--color-danger);
      background: rgba(255, 0, 111, 0.1);
    }

    .turn-display {
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border: 2px solid;
      border-radius: var(--radius-sm);
      text-align: center;
    }

    .turn-display.player-turn {
      color: #1f883d;
      border-color: #1f883d;
      background: rgba(31, 136, 61, 0.1);
      box-shadow: 0 0 15px rgba(31, 136, 61, 0.3);
    }

    .turn-display.enemy-turn {
      color: var(--color-danger);
      border-color: var(--color-danger);
      background: rgba(255, 0, 111, 0.1);
      box-shadow: 0 0 15px rgba(255, 0, 111, 0.3);
    }

    .game-over-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-box {
      background: var(--color-bg-dark);
      border: 3px solid var(--color-danger);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      text-align: center;
      animation: neon-pulse 0.5s ease-out;
    }

    .modal-box.win {
      border-color: #1f883d;
    }

    .modal-box.win h2 {
      color: #1f883d;
      text-shadow: 0 0 20px rgba(31, 136, 61, 0.8);
    }

    .modal-box h2 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: 2.5rem;
      color: var(--color-danger);
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .result-text {
      font-size: 1rem;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
    }

    .score-display {
      font-size: 1.3rem;
      color: var(--color-primary);
      margin-bottom: var(--spacing-lg);
      font-weight: 700;
    }

    @media (max-width: 1024px) {
      .battleship-game {
        flex-direction: column;
        align-items: center;
      }

      .game-info-panel {
        width: 100%;
        max-width: 600px;
        position: static;
      }

      .boards-container {
        grid-template-columns: 1fr;
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      .battleship-game {
        padding: var(--spacing-md);
      }

      .boards-container {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        max-width: 100%;
      }

      .board {
        max-width: 100%;
        width: 90vw;
        padding: var(--spacing-sm);
        gap: 1px;
      }

      .cell {
        font-size: 0.6rem;
      }

      .game-info-panel {
        width: 100%;
        max-width: 100%;
        position: static;
        margin-bottom: var(--spacing-lg);
      }
    }

    @media (max-width: 480px) {
      .battleship-game {
        padding: var(--spacing-sm);
        gap: var(--spacing-md);
      }

      .board {
        width: 95vw;
        padding: 4px;
        gap: 1px;
      }

      .cell {
        font-size: 0.5rem;
        min-height: 25px;
      }

      .game-info-panel {
        padding: var(--spacing-md);
      }

      .game-stats {
        grid-template-columns: 1fr;
      }

      .rules-box {
        display: none;
      }
    }
  `]
})
export class BattleshipComponent implements OnInit {
  playerBoard: Cell[] = [];
  enemyBoard: Cell[] = [];
  playerShips: Ship[] = [];
  enemyShips: Ship[] = [];

  score: number = 0;
  gameOver: boolean = false;
  playerWon: boolean = false;
  isPlayerTurn: boolean = true;
  gamePhase: string = 'BATALLA';
  currentMessage: string = 'Ataques al tablero enemigo. ¡Hundimos la flota!';
  messageClass: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.playerBoard = this.initializeBoard();
    this.enemyBoard = this.initializeBoard();
    this.playerShips = this.generateShips();
    this.enemyShips = this.generateShips();
    this.placeShipsOnBoard(this.playerBoard, this.playerShips);
    this.placeShipsOnBoard(this.enemyBoard, this.enemyShips);
    this.score = 0;
    this.gameOver = false;
    this.playerWon = false;
    this.isPlayerTurn = true;
    this.gamePhase = 'BATALLA';
    this.currentMessage = 'Ataques al tablero enemigo. ¡Hundimos la flota!';
    this.messageClass = '';
  }

  initializeBoard(): Cell[] {
    const board: Cell[] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      board.push({ position: i, state: 'empty' });
    }
    return board;
  }

  generateShips(): Ship[] {
    return SHIPS.map(ship => ({
      id: ship.id,
      size: ship.size,
      positions: [],
      hits: 0,
      sunk: false
    }));
  }

  placeShipsOnBoard(board: Cell[], ships: Ship[]): void {
    ships.forEach(ship => {
      let placed = false;
      while (!placed) {
        const isHorizontal = Math.random() > 0.5;
        const startPos = Math.floor(Math.random() * BOARD_SIZE);
        const row = Math.floor(startPos / 10);
        const col = startPos % 10;

        if (isHorizontal) {
          if (col + ship.size <= 10 && this.canPlaceShip(board, startPos, ship.size, true)) {
            for (let i = 0; i < ship.size; i++) {
              const pos = startPos + i;
              ship.positions.push(pos);
              board[pos].shipId = ship.id;
            }
            placed = true;
          }
        } else {
          if (row + ship.size <= 10 && this.canPlaceShip(board, startPos, ship.size, false)) {
            for (let i = 0; i < ship.size; i++) {
              const pos = startPos + i * 10;
              ship.positions.push(pos);
              board[pos].shipId = ship.id;
            }
            placed = true;
          }
        }
      }
    });
  }

  canPlaceShip(board: Cell[], startPos: number, size: number, isHorizontal: boolean): boolean {
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if (board[startPos + i].shipId !== undefined) return false;
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (board[startPos + i * 10].shipId !== undefined) return false;
      }
    }
    return true;
  }

  onCellClick(position: number, isEnemyBoard: boolean): void {
    if (this.gameOver || !this.isPlayerTurn || isEnemyBoard === false) return;

    const cell = this.enemyBoard[position];
    if (cell.state !== 'empty') return;

    const ship = this.enemyShips.find(s => s.positions.includes(position));
    
    if (ship) {
      cell.state = 'hit';
      ship.hits++;
      this.score += 50;
      this.currentMessage = `¡IMPACTO! Barco golpeado (${ship.hits}/${ship.size})`;
      this.messageClass = 'success';

      if (ship.hits === ship.size) {
        ship.sunk = true;
        this.score += 200;
        this.currentMessage = `¡HUNDIDO! ${this.getShipName(ship.id)}`;
        this.messageClass = 'success';

        if (this.enemyShipsRemaining === 0) {
          this.gameOver = true;
          this.playerWon = true;
          this.score += 1000;
          return;
        }
      }
    } else {
      cell.state = 'miss';
      this.currentMessage = 'Agua... Turno del enemigo';
      this.messageClass = 'error';
    }

    setTimeout(() => this.enemyTurn(), 1500);
  }

  enemyTurn(): void {
    this.isPlayerTurn = false;
    this.currentMessage = 'Enemigo está atacando...';
    this.messageClass = '';

    setTimeout(() => {
      let validAttack = false;
      while (!validAttack) {
        const pos = Math.floor(Math.random() * BOARD_SIZE);
        const cell = this.playerBoard[pos];
        if (cell.state === 'empty') {
          validAttack = true;

          const ship = this.playerShips.find(s => s.positions.includes(pos));
          if (ship) {
            cell.state = 'hit';
            ship.hits++;
            this.currentMessage = `¡OH NO! Enemigo impactó tu barco`;
            this.messageClass = 'error';

            if (ship.hits === ship.size) {
              ship.sunk = true;
              this.currentMessage = `¡HUNDIDO! Tu ${this.getShipName(ship.id)} fue hundido`;

              if (this.playerShipsRemaining === 0) {
                this.gameOver = true;
                this.playerWon = false;
                return;
              }
            }
          } else {
            cell.state = 'miss';
            this.currentMessage = `Enemigo atacó el agua. ¡Tu turno!`;
            this.messageClass = 'success';
          }
        }
      }

      this.isPlayerTurn = true;
    }, 1000);
  }

  getShipName(shipId: number): string {
    const names: { [key: number]: string } = {
      1: 'Acorazado',
      2: 'Crucero',
      3: 'Destructor',
      4: 'Submarino',
      5: 'Patrullero'
    };
    return names[shipId] || 'Barco';
  }

  getBoardPositions(): number[] {
    return Array.from({ length: BOARD_SIZE }, (_, i) => i);
  }

  getCellClass(position: number, isPlayerBoard: boolean): string {
    const board = isPlayerBoard ? this.playerBoard : this.enemyBoard;
    const cell = board[position];
    const baseClass = 'cell';

    if (cell.state === 'hit') {
      return `${baseClass} hit`;
    }
    if (cell.state === 'miss') {
      return `${baseClass} miss`;
    }

    if (isPlayerBoard && cell.shipId !== undefined) {
      return `${baseClass} ally-ship`;
    }

    if (!isPlayerBoard && cell.shipId !== undefined && cell.state !== 'empty') {
      return `${baseClass} ship`;
    }

    return baseClass;
  }

  get playerShipsRemaining(): number {
    return this.playerShips.filter(s => !s.sunk).length;
  }

  get enemyShipsRemaining(): number {
    return this.enemyShips.filter(s => !s.sunk).length;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
