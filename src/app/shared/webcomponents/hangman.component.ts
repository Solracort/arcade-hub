import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseGameComponent } from '../webcomponents/base-game.component';
import { WordsService } from '../../core/services/words.service';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <app-base-game
      gameId="HANGMAN_001"
      [currentScore]="score"
      [currentLives]="lives"
      (backClicked)="goBack()">
      
      <div class="hangman-game">
        <!-- Gallows Section -->
        <div class="gallows-section">
          <svg class="gallows-svg" viewBox="0 0 100 120">
            <!-- Gallows Frame -->
            <path class="gallows-line" d="M20 110 L80 110"></path>
            <path class="gallows-line" d="M30 110 L30 10"></path>
            <path class="gallows-line" d="M30 10 L70 10"></path>
            <path class="gallows-line" d="M70 10 L70 25"></path>
            
            <!-- Hangman Parts - 6 partes para 6 vidas -->
            <!-- Cabeza -->
            <circle class="hangman-part" [class.show]="lives <= 5" cx="70" cy="35" r="10"></circle>
            <!-- Cuerpo -->
            <path class="hangman-part" [class.show]="lives <= 4" d="M70 45 L70 75"></path>
            <!-- Brazo izquierdo -->
            <path class="hangman-part" [class.show]="lives <= 3" d="M70 50 L55 65"></path>
            <!-- Brazo derecho -->
            <path class="hangman-part" [class.show]="lives <= 2" d="M70 50 L85 65"></path>
            <!-- Pierna izquierda -->
            <path class="hangman-part" [class.show]="lives <= 1" d="M70 75 L55 90"></path>
            <!-- Pierna derecha -->
            <path class="hangman-part" [class.show]="lives <= 0" d="M70 75 L85 90"></path>
          </svg>
        </div>

        <!-- Word Display -->
        <div class="word-section">
          <div class="category-label">CATEGORY: RETRO TECH</div>
          <div class="word-display">
            <div class="letter" *ngFor="let letter of displayWord">
              {{ letter }}
            </div>
          </div>
        </div>

        <!-- Keyboard -->
        <div class="keyboard">
          <div class="keyboard-row" *ngFor="let row of keyboardRows">
            <button class="key" *ngFor="let key of row"
                    [class.used]="usedLetters.includes(key)"
                    (click)="guessLetter(key)"
                    [disabled]="usedLetters.includes(key) || gameOver">
              {{ key }}
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="btn btn-primary" (click)="newGame()">
            <span class="material-symbols-outlined">refresh</span>
            New Game
          </button>
        </div>

        <!-- Game Over Message -->
        <div class="game-over" *ngIf="gameOver">
          <div class="message" [class.win]="isWin">
            {{ isWin ? 'YOU WIN!' : 'GAME OVER!' }}
          </div>
          <div class="word-result">
            The word was: <strong>{{ currentWord }}</strong>
          </div>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    .hangman-game {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xl);
      width: 100%;
    }

    .gallows-section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 300px;
    }

    .gallows-svg {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.3));
    }

    .gallows-line {
      stroke: var(--color-primary);
      stroke-width: 3;
      fill: none;
      stroke-linecap: round;
    }

    .hangman-part {
      stroke: var(--color-primary);
      stroke-width: 3;
      fill: none;
      stroke-linecap: round;
      opacity: 0;
      transition: opacity 0.3s ease;

      &.show {
        opacity: 1;
      }
    }

    .word-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      width: 100%;
    }

    .category-label {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .word-display {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--spacing-md);
    }

    .letter {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
      border-bottom: 3px solid var(--color-border-light);
      font-family: var(--font-mono);
    }

    .keyboard {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: 100%;
      max-width: 600px;
    }

    .keyboard-row {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      flex-wrap: wrap;
    }

    .key {
      min-width: 2.5rem;
      height: 2.5rem;
      padding: 0 var(--spacing-sm);
      border-radius: var(--radius-sm);
      background-color: var(--color-bg-card);
      border: 1px solid var(--color-border-light);
      color: var(--color-text-primary);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        border-color: var(--color-primary);
        background-color: rgba(0, 212, 255, 0.1);
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
        background-color: rgba(0, 0, 0, 0.3);
      }

      &.used {
        background-color: rgba(255, 0, 111, 0.2);
        border-color: var(--color-danger);
        color: var(--color-danger);
      }
    }

    .actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      width: 100%;
    }

    .game-over {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-bg-dark);
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      text-align: center;
      z-index: 1000;
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
      animation: neon-pulse 0.5s ease-out;
    }

    .message {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-md);
      color: var(--color-danger);
      text-transform: uppercase;
      letter-spacing: 0.15em;

      &.win {
        color: var(--color-success, #00ff00);
        text-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
      }
    }

    .word-result {
      font-size: 1.25rem;
      color: var(--color-text-primary);
      margin-top: var(--spacing-lg);

      strong {
        color: var(--color-primary);
        font-weight: 700;
        letter-spacing: 0.1em;
      }
    }

    @media (max-width: 768px) {
      .gallows-svg {
        max-width: 250px;
      }

      .letter {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
      }

      .key {
        min-width: 2rem;
        height: 2rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class HangmanComponent {
  words: string[] = [];
  currentWord: string = '';
  displayWord: string[] = [];
  usedLetters: string[] = [];
  score: number = 0;
  lives: number = 6;
  gameOver: boolean = false;
  isWin: boolean = false;
  difficulty: 'easy' | 'medium' | 'hard' = 'easy';

  keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  constructor(private wordsService: WordsService) {
    this.words = this.wordsService.getAllHangmanWords(this.difficulty);
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.currentWord = this.wordsService.getHangmanWord(this.difficulty);
    this.displayWord = Array(this.currentWord.length).fill('_');
    this.usedLetters = [];
    this.lives = 6;
    this.score = 0;
    this.gameOver = false;
    this.isWin = false;
  }

  guessLetter(letter: string): void {
    if (this.usedLetters.includes(letter) || this.gameOver) return;

    this.usedLetters.push(letter);

    if (this.currentWord.includes(letter)) {
      this.currentWord.split('').forEach((char, index) => {
        if (char === letter) {
          this.displayWord[index] = letter;
        }
      });
      this.score += 100;

      // Check if won
      if (!this.displayWord.includes('_')) {
        this.gameOver = true;
        this.isWin = true;
      }
    } else {
      this.lives--;

      // Check if lost - Después de mostrar el muñeco completo
      if (this.lives <= 0) {
        this.gameOver = true;
        this.isWin = false;
      }
    }
  }

  goBack(): void {
    // Navegar atrás
  }
}
