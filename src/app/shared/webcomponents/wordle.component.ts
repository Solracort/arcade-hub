import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../webcomponents/base-game.component';
import { WordsService } from '../../core/services/words.service';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, BaseGameComponent, FormsModule],
  template: `
    <app-base-game
      gameId="WORDLE_001"
      [currentScore]="score"
      [currentLives]="attempts"
      (backClicked)="goBack()">
      
      <div class="wordle-game">
        <!-- Word Grid -->
        <div class="word-grid">
          <div class="guess-row" *ngFor="let guess of guesses; let i = index">
            <div class="letter-box" 
                 *ngFor="let letter of guess.letters; let j = index"
                 [class.correct]="guess.status[j] === 'correct'"
                 [class.present]="guess.status[j] === 'present'"
                 [class.absent]="guess.status[j] === 'absent'">
              {{ letter }}
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="input-section" *ngIf="!gameOver">
          <input type="text" 
                 [(ngModel)]="currentGuess"
                 (keyup.enter)="submitGuess()"
                 maxlength="5"
                 class="word-input"
                 placeholder="Enter 5-letter word">
          <button (click)="submitGuess()" class="btn btn-primary" [disabled]="!canSubmit">
            Submit
          </button>
        </div>

        <!-- Message -->
        <div class="message" [ngClass]="messageClass">
          {{ message }}
        </div>

        <!-- New Game -->
        <button (click)="newGame()" class="btn btn-secondary">
          New Game
        </button>

        <!-- Game Over Modal -->
        <div class="game-over" *ngIf="gameOver">
          <div class="message-modal" [class.win]="won">
            {{ won ? 'YOU WIN!' : 'GAME OVER!' }}
          </div>
          <div class="word-result">
            The word was: <strong>{{ secretWord }}</strong>
          </div>
        </div>
      </div>
    </app-base-game>
  `,
  styles: [`
    .wordle-game {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xl);
      width: 100%;
    }

    .word-grid {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .guess-row {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
    }

    .letter-box {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-border-light);
      border-radius: var(--radius-sm);
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: uppercase;
      background-color: var(--color-bg-surface);
      color: var(--color-text-primary);
      transition: all 0.3s ease;

      &.correct {
        background-color: #1f883d;
        border-color: #1f883d;
        color: var(--color-text-primary);
        transform: scale(1.05);
      }

      &.present {
        background-color: #fb8500;
        border-color: #fb8500;
        color: var(--color-text-primary);
        transform: scale(1.05);
      }

      &.absent {
        background-color: var(--color-text-muted);
        border-color: var(--color-text-muted);
        opacity: 0.5;
      }
    }

    .input-section {
      display: flex;
      gap: var(--spacing-md);
      width: 100%;
      max-width: 400px;
    }

    .word-input {
      flex: 1;
      padding: var(--spacing-md);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface);
      color: var(--color-text-primary);
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
      }
    }

    .message {
      font-size: 0.875rem;
      font-weight: 600;
      min-height: 1.5rem;
      color: var(--color-primary);
      text-align: center;

      &.error {
        color: var(--color-danger);
      }

      &.success {
        color: #1f883d;
        animation: neon-pulse 1s ease-in-out;
      }
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

    .message-modal {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-md);
      color: var(--color-danger);
      text-transform: uppercase;
      letter-spacing: 0.15em;

      &.win {
        color: #1f883d;
        text-shadow: 0 0 20px rgba(31, 136, 61, 0.6);
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
      .letter-box {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
      }

      .input-section {
        max-width: 100%;
      }
    }
  `]
})
export class WordleComponent implements OnInit {
  secretWord: string = '';
  
  guesses: Array<{ letters: string[], status: string[] }> = [];
  currentGuess: string = '';
  score: number = 0;
  attempts: number = 6;
  message: string = 'Guess the word!';
  messageClass: string = '';
  gameOver: boolean = false;
  won: boolean = false;

  constructor(private router: Router, private wordsService: WordsService) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.secretWord = this.wordsService.getWordleWord();
    this.guesses = [];
    this.currentGuess = '';
    this.score = 0;
    this.attempts = 6;
    this.message = 'Guess the word!';
    this.messageClass = '';
    this.gameOver = false;
    this.won = false;
  }

  submitGuess(): void {
    if (!this.canSubmit || this.gameOver) return;

    const guess = this.currentGuess.toUpperCase();
    if (guess.length !== 5) {
      this.message = 'Word must be 5 letters!';
      this.messageClass = 'error';
      return;
    }

    const status = this.getGuessStatus(guess);
    this.guesses.push({ letters: guess.split(''), status });

    if (guess === this.secretWord) {
      this.message = 'You Won! 🎉';
      this.messageClass = 'success';
      this.score = 100 * (this.attempts + 1);
      this.gameOver = true;
      this.won = true;
    } else {
      this.attempts--;
      
      if (this.attempts <= 0) {
        this.message = `Game Over! Word was: ${this.secretWord}`;
        this.messageClass = 'error';
        this.gameOver = true;
        this.won = false;
      } else {
        this.message = `${this.attempts} attempts left`;
        this.messageClass = '';
      }
    }

    this.currentGuess = '';
  }

  private getGuessStatus(guess: string): string[] {
    return guess.split('').map((letter, i) => {
      if (letter === this.secretWord[i]) {
        return 'correct';
      } else if (this.secretWord.includes(letter)) {
        return 'present';
      } else {
        return 'absent';
      }
    });
  }

  get canSubmit(): boolean {
    return this.currentGuess.length === 5 && !this.gameOver;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
