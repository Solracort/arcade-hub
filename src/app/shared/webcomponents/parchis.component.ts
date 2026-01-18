import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from './base-game.component';

interface Piece {
  id: number;
  position: number;
  color: 'red' | 'yellow' | 'blue' | 'green';
  inJail: boolean;
}

@Component({
  selector: 'app-parchis',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <app-base-game
      gameId="PARCHIS_001"
      [currentScore]="score"
      [currentLives]="6"
      (backClicked)="goBack()">
      
      <div class="parchis-game">
        <div class="wip-badge">WORK IN PROGRESS</div>
        <div class="rules-panel">
          <h3 class="rules-title">REGLAS</h3>
          <ul class="rules-list">
            <li><strong>Tu Color:</strong> ROJO</li>
            <li><strong>Objetivo:</strong> Meter tus 4 fichas en casa</li>
            <li><strong>Salida:</strong> Necesitas 5 o 6</li>
            <li><strong>6 = Turno Extra:</strong> Máximo 3 seises</li>
            <li><strong>Movimiento Exacto:</strong> Sin sobras</li>
            <li><strong>Lugares Seguros:</strong> No hay captura</li>
          </ul>
        </div>

        <div class="game-content">
          <div class="board-container">
            <div class="parchis-board">
              <!-- Zona Azul (Arriba) -->
              <div class="zone zone-blue">
                <div class="jail-area">
                  <span class="zone-label">AZUL</span>
                  <div class="jail-pieces">
                    <div class="piece piece-blue" *ngFor="let p of [1,2,3,4]"></div>
                  </div>
                </div>
              </div>

              <!-- Zona Amarilla (Derecha) -->
              <div class="zone zone-yellow">
                <div class="jail-area">
                  <span class="zone-label">AMARILLO</span>
                  <div class="jail-pieces">
                    <div class="piece piece-yellow" *ngFor="let p of [1,2,3,4]"></div>
                  </div>
                </div>
              </div>

              <!-- Zona Verde (Izquierda) -->
              <div class="zone zone-green">
                <div class="jail-area">
                  <span class="zone-label">VERDE</span>
                  <div class="jail-pieces">
                    <div class="piece piece-green" *ngFor="let p of [1,2,3,4]"></div>
                  </div>
                </div>
              </div>

              <!-- Zona Roja (Abajo - El Jugador) -->
              <div class="zone zone-red">
                <div class="jail-area">
                  <span class="zone-label">ROJO (TÚ)</span>
                  <div class="jail-pieces">
                    <div class="piece piece-red" *ngFor="let p of piecesInJail"></div>
                  </div>
                </div>
              </div>

              <!-- Centro con Casas y Circuito -->
              <div class="center-area">
                <!-- Casa Roja (Meta del jugador) -->
                <div class="home home-red">
                  <div class="home-label">META</div>
                  <div class="home-pieces">
                    <div class="piece piece-red" *ngFor="let p of piecesInHouse"></div>
                  </div>
                </div>

                <!-- Casas de otros jugadores (decorativas) -->
                <div class="home home-blue"><span class="home-label">META</span></div>
                <div class="home home-yellow"><span class="home-label">META</span></div>
                <div class="home home-green"><span class="home-label">META</span></div>

                <!-- Display central -->
                <div class="center-display">
                  <div class="turn-badge">TURNO {{ currentTurn }}</div>
                </div>

                <!-- Circuito -->
                <div class="circular-track">
                  <div class="track-segment" *ngFor="let i of getBoardPositions()" [ngClass]="'pos-' + i">
                    <div class="casilla" [class.safe]="isSafe(i)" [class.active]="isOccupied(i)">
                      <div class="pieces">
                        <div class="piece piece-red" *ngFor="let p of getPiecesAt(i)"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Controles e Info -->
          <div class="game-controls">
            <div class="game-info">
              <div class="info-card">
                <span class="info-label">PUNTUACIÓN</span>
                <span class="info-value">{{ score }}</span>
              </div>
              <div class="info-card">
                <span class="info-label">FICHAS EN CASA</span>
                <span class="info-value">{{ piecesInHouseCount }}/4</span>
              </div>
              <div class="info-card">
                <span class="info-label">ÚLTIMA TIRADA</span>
                <span class="info-value">{{ lastDiceRoll > 0 ? lastDiceRoll : '-' }}</span>
              </div>
            </div>

            <button (click)="rollDice()" class="btn btn-primary btn-large" [disabled]="gameOver">
              <span class="material-symbols-outlined">casino</span>
              Lanzar Dado
            </button>

            <p class="game-message" [ngClass]="messageClass">{{ currentMessage }}</p>
          </div>

          <!-- Game Over -->
          <div class="game-over-modal" *ngIf="gameOver">
            <div class="modal-box" [class.win]="won">
              <h2>{{ won ? '¡GANASTE!' : 'FIN DEL JUEGO' }}</h2>
              <p class="score-display">{{ score }} PUNTOS</p>
              <p class="turns-display">{{ currentTurn }} TURNOS</p>
              <button (click)="newGame()" class="btn btn-primary">
                Nuevo Juego
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    @keyframes neon-flicker {
      0%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 50%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 100% {
        text-shadow: 
          0 0 10px #ff006e,
          0 0 20px #ff006e,
          0 0 30px #ff006e,
          0 0 40px #ff006e,
          0 0 70px #ff006e,
          0 0 80px #ff006e,
          0 0 100px #ff006e;
        color: #ff006e;
      }
      42%, 58% {
        text-shadow: 
          0 0 5px #ff006e,
          0 0 10px #ff006e,
          0 0 15px #ff006e;
        color: rgba(255, 0, 110, 0.7);
      }
      45%, 55% {
        text-shadow: none;
        color: rgba(255, 0, 110, 0.3);
      }
    }

    .wip-badge {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 0.15em;
      color: #ff006e;
      text-transform: uppercase;
      animation: neon-flicker 3s infinite;
      z-index: 100;
      font-family: 'Space Grotesk', monospace;
    }

    .parchis-game {
      display: flex;
      gap: var(--spacing-lg);
      width: 100%;
      padding: var(--spacing-lg);
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      margin-top: 60px;
    }

    .rules-panel {
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

    .rules-title {
      margin: 0 0 var(--spacing-md) 0;
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid var(--color-primary);
      font-size: 1rem;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
    }

    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .rules-list li {
      font-size: 0.85rem;
      color: var(--color-text-primary);
      padding: var(--spacing-sm);
      background: rgba(0, 212, 255, 0.05);
      border-left: 3px solid var(--color-secondary);
      border-radius: var(--radius-sm);
      line-height: 1.4;
    }

    .rules-list li strong {
      color: var(--color-primary);
      display: block;
      margin-bottom: 2px;
    }

    .game-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
      flex: 1;
      min-width: 300px;
    }

    .board-container {
      width: 100%;
      max-width: 700px;
      aspect-ratio: 1;
      border: 3px solid var(--color-primary);
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, #0a0c10, #161b22);
      padding: var(--spacing-md);
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
    }

    .parchis-board {
      width: 100%;
      height: 100%;
      position: relative;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 1fr 2fr 1fr;
      gap: var(--spacing-sm);
    }

    .zone {
      border-radius: var(--radius-lg);
      border: 2px solid;
      padding: var(--spacing-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
    }

    .zone-blue {
      grid-column: 2;
      grid-row: 1;
      background: rgba(0, 102, 255, 0.15);
      border-color: #0066ff;
    }

    .zone-yellow {
      grid-column: 3;
      grid-row: 2;
      background: rgba(255, 255, 0, 0.15);
      border-color: #ffff00;
    }

    .zone-green {
      grid-column: 1;
      grid-row: 2;
      background: rgba(0, 255, 0, 0.15);
      border-color: #00ff00;
    }

    .zone-red {
      grid-column: 2;
      grid-row: 3;
      background: rgba(255, 0, 110, 0.15);
      border-color: #ff006e;
    }

    .jail-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      width: 100%;
      height: 100%;
      padding: var(--spacing-md);
      border: 1px dashed currentColor;
      border-radius: var(--radius-md);
      background: rgba(0, 0, 0, 0.2);
    }

    .zone-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-secondary);
    }

    .jail-pieces {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
    }

    .center-area {
      grid-column: 2;
      grid-row: 2;
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .center-display {
      position: absolute;
      z-index: 20;
      text-align: center;
    }

    .turn-badge {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    .home {
      position: absolute;
      width: 70px;
      height: 70px;
      border: 2px solid;
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: rgba(0, 0, 0, 0.5);
      z-index: 5;
    }

    .home-red {
      bottom: -85px;
      left: 50%;
      transform: translateX(-50%);
      border-color: #ff006e;
      background: rgba(255, 0, 110, 0.1);
    }

    .home-blue {
      top: -85px;
      left: 50%;
      transform: translateX(-50%);
      border-color: #0066ff;
      background: rgba(0, 102, 255, 0.1);
    }

    .home-yellow {
      right: -85px;
      top: 50%;
      transform: translateY(-50%);
      border-color: #ffff00;
      background: rgba(255, 255, 0, 0.1);
    }

    .home-green {
      left: -85px;
      top: 50%;
      transform: translateY(-50%);
      border-color: #00ff00;
      background: rgba(0, 255, 0, 0.1);
    }

    .home-label {
      font-size: 0.6rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    .home-pieces {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      justify-content: center;
    }

    .circular-track {
      position: absolute;
      width: 85%;
      height: 85%;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 7.5%;
    }

    .track-segment {
      position: absolute;
      width: 35px;
      height: 35px;
    }

    .casilla {
      width: 100%;
      height: 100%;
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--color-border-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .casilla.safe {
      background: rgba(0, 212, 255, 0.15);
      border-color: var(--color-primary);
      box-shadow: inset 0 0 8px rgba(0, 212, 255, 0.3);
    }

    .casilla.active {
      background: rgba(255, 0, 111, 0.15);
      border-color: var(--color-secondary);
    }

    .casilla:hover {
      transform: scale(1.1);
    }

    .pieces {
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .pos-0 { transform: translate(calc(50% - 17px), -95%) rotate(0deg); }
    .pos-4 { transform: translate(calc(95% - 17px), calc(50% - 17px)) rotate(90deg); }
    .pos-8 { transform: translate(calc(50% - 17px), 95%) rotate(180deg); }
    .pos-12 { transform: translate(calc(-95% - 17px), calc(50% - 17px)) rotate(270deg); }
    .pos-1 { transform: translate(calc(70% - 17px), calc(30% - 17px)); }
    .pos-2 { transform: translate(calc(85% - 17px), calc(15% - 17px)); }
    .pos-3 { transform: translate(calc(95% - 17px), calc(5% - 17px)); }
    .pos-5 { transform: translate(calc(95% - 17px), calc(95% - 17px)); }
    .pos-6 { transform: translate(calc(85% - 17px), calc(85% - 17px)); }
    .pos-7 { transform: translate(calc(70% - 17px), calc(70% - 17px)); }
    .pos-9 { transform: translate(calc(-95% - 17px), calc(95% - 17px)); }
    .pos-10 { transform: translate(calc(-85% - 17px), calc(85% - 17px)); }
    .pos-11 { transform: translate(calc(-70% - 17px), calc(70% - 17px)); }
    .pos-13 { transform: translate(calc(-95% - 17px), calc(-5% - 17px)); }
    .pos-14 { transform: translate(calc(-85% - 17px), calc(15% - 17px)); }
    .pos-15 { transform: translate(calc(-70% - 17px), calc(30% - 17px)); }

    .piece {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid currentColor;
      box-shadow: 0 0 8px currentColor;
    }

    .piece-red {
      background: #ff006e;
      color: #ff006e;
    }

    .piece-blue {
      background: #0066ff;
      color: #0066ff;
    }

    .piece-yellow {
      background: #ffff00;
      color: #ffff00;
    }

    .piece-green {
      background: #00ff00;
      color: #00ff00;
    }

    .game-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
      width: 100%;
    }

    .game-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--spacing-md);
      width: 100%;
      max-width: 500px;
    }

    .info-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-md);
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-sm);
      gap: var(--spacing-sm);
    }

    .info-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .info-value {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .btn-large {
      padding: var(--spacing-md) var(--spacing-xl);
      font-size: 1rem;
      gap: var(--spacing-sm);
    }

    .game-message {
      min-height: 2rem;
      text-align: center;
      font-size: 0.95rem;
      color: var(--color-text-primary);
      animation: neon-pulse 0.5s ease-out;
    }

    .game-message.error {
      color: var(--color-danger);
    }

    .game-message.success {
      color: #1f883d;
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
      margin: 0 0 var(--spacing-lg) 0;
      font-size: 2.5rem;
      color: var(--color-danger);
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .modal-box .score-display {
      font-size: 1.5rem;
      color: var(--color-primary);
      margin: 0 0 var(--spacing-md) 0;
      font-weight: 700;
    }

    .modal-box .turns-display {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    @media (max-width: 1024px) {
      .parchis-game {
        flex-direction: column;
        align-items: center;
      }

      .rules-panel {
        width: 100%;
        max-width: 600px;
        position: static;
      }
    }

    @media (max-width: 768px) {
      .board-container {
        max-width: 100%;
        width: 90vw;
      }

      .rules-panel {
        width: 100%;
      }
    }
  `]
})
export class ParchisComponent implements OnInit {
  playerPieces: Piece[] = [];
  score: number = 0;
  currentTurn: number = 1;
  lastDiceRoll: number = 0;
  currentMessage: string = 'Eres ROJO. ¡Lanza el dado para comenzar!';
  messageClass: string = '';
  gameOver: boolean = false;
  won: boolean = false;
  consecutiveSixes: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.playerPieces = [
      { id: 1, position: -1, color: 'red', inJail: true },
      { id: 2, position: -1, color: 'red', inJail: true },
      { id: 3, position: -1, color: 'red', inJail: true },
      { id: 4, position: -1, color: 'red', inJail: true }
    ];
    this.score = 0;
    this.currentTurn = 1;
    this.lastDiceRoll = 0;
    this.currentMessage = 'Eres ROJO. ¡Lanza el dado para comenzar!';
    this.messageClass = '';
    this.gameOver = false;
    this.won = false;
    this.consecutiveSixes = 0;
  }

  rollDice(): void {
    if (this.gameOver) return;

    this.lastDiceRoll = Math.floor(Math.random() * 6) + 1;

    if (this.lastDiceRoll === 6) {
      this.consecutiveSixes++;
      if (this.consecutiveSixes < 3) {
        this.currentMessage = `¡SACASTE 6! Tienes otro turno (${this.consecutiveSixes}/3)`;
        this.messageClass = 'success';
      } else {
        this.currentMessage = '¡3 SEISES! Pierdes turno';
        this.messageClass = 'error';
        this.consecutiveSixes = 0;
        setTimeout(() => this.endTurn(), 2500);
        return;
      }
    } else {
      this.consecutiveSixes = 0;
      this.currentMessage = `Sacaste ${this.lastDiceRoll}`;
      this.messageClass = '';
    }

    this.autoMovePiece();

    if (this.piecesInHouseCount === 4) {
      this.gameOver = true;
      this.won = true;
      this.score += 1000;
      this.currentMessage = '¡GANASTE LA PARTIDA! 🎉';
      this.messageClass = 'success';
    } else if (this.lastDiceRoll !== 6) {
      setTimeout(() => this.endTurn(), 2000);
    }
  }

  autoMovePiece(): void {
    const inJail = this.playerPieces.filter(p => p.inJail);
    const onBoard = this.playerPieces.filter(p => !p.inJail && p.position < 68);

    if ((this.lastDiceRoll === 5 || this.lastDiceRoll === 6) && inJail.length > 0) {
      const piece = inJail[0];
      piece.inJail = false;
      piece.position = 0;
      this.score += 50;
      this.currentMessage += ' → Sacaste ficha';
      return;
    }

    if (onBoard.length > 0) {
      const piece = onBoard[0];
      const newPos = piece.position + this.lastDiceRoll;

      if (newPos < 68) {
        piece.position = newPos;
        this.score += 10;
      } else if (newPos === 68) {
        piece.position = 68;
        this.score += 100;
        this.currentMessage += ' → ¡Ficha en CASA!';
      } else {
        this.currentMessage += ' → No puedo mover (rebota)';
      }
    }
  }

  endTurn(): void {
    this.currentTurn++;
    this.lastDiceRoll = 0;
    this.currentMessage = `Turno ${this.currentTurn}. Lanza el dado`;
    this.messageClass = '';
  }

  getBoardPositions(): number[] {
    return Array.from({ length: 68 }, (_, i) => i);
  }

  isSafe(position: number): boolean {
    return [0, 16, 34, 50].includes(position);
  }

  isOccupied(position: number): boolean {
    return this.playerPieces.some(p => p.position === position && !p.inJail);
  }

  getPiecesAt(position: number): Piece[] {
    return this.playerPieces.filter(p => p.position === position && !p.inJail);
  }

  get piecesInJail(): Piece[] {
    return this.playerPieces.filter(p => p.inJail);
  }

  get piecesInHouse(): Piece[] {
    return this.playerPieces.filter(p => p.position >= 68);
  }

  get piecesInHouseCount(): number {
    return this.piecesInHouse.length;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
