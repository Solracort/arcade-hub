<!-- 
  Game Component Template
  Copy this template to create new games quickly
-->

<component name="NewGameTemplate">
  <template>
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { Router } from '@angular/router';
    import { BaseGameComponent } from '../webcomponents/base-game.component';
    import { GameService } from '../../core/services/game.service';
    import { ScoreService } from '../../core/services/score.service';
    import { Subject } from 'rxjs';
    import { takeUntil } from 'rxjs/operators';

    @Component({
      selector: 'app-newgame',
      standalone: true,
      imports: [CommonModule, BaseGameComponent],
      template: `
        <app-base-game
          gameId="NEWGAME_001"
          gameMode="ARCADE"
          [currentScore]="currentScore"
          [currentLives]="currentLives"
          (backClicked)="goBack()">
          
          <div class="game-wrapper">
            <!-- Your game content -->
          </div>
        </app-base-game>
      `,
      styles: [`
        .game-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      `]
    })
    export class NewgameComponent implements OnInit, OnDestroy {
      currentScore: number = 0;
      currentLives: number = 3;

      private destroy$ = new Subject<void>();

      constructor(
        private gameService: GameService,
        private scoreService: ScoreService,
        private router: Router
      ) {
        this.scoreService.resetScore();
      }

      ngOnInit(): void {
        this.scoreService.getScore()
          .pipe(takeUntil(this.destroy$))
          .subscribe(score => this.currentScore = score);

        this.scoreService.getLives()
          .pipe(takeUntil(this.destroy$))
          .subscribe(lives => this.currentLives = lives);

        this.initializeGame();
      }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }

      initializeGame(): void {
        // Initialize game state
        console.log('Game initialized');
      }

      goBack(): void {
        this.router.navigate(['/']);
      }
    }
  </template>
  
  <gameService-registration>
    {
      id: 'newgame',
      name: 'New Game',
      description: 'Your game description here',
      category: 'action',
      icon: 'gamepad',
      componentName: 'NewgameComponent',
      highScore: 0,
      tags: ['tag1', 'tag2'],
      difficulty: 'medium'
    }
  </gameService-registration>

  <imports-in-game-detail>
    import { NewgameComponent } from '../../shared/webcomponents/newgame.component';

    @Component({
      imports: [CommonModule, ..., NewgameComponent]
    })
    
    // Add to template:
    <app-newgame *ngIf="game.id === 'newgame'"></app-newgame>
  </imports-in-game-detail>
</component>

<!-- 
  Key Points:
  1. Always extend BaseGameComponent for consistent UI
  2. Use GameService to register and manage game data
  3. Use ScoreService for score/lives during gameplay
  4. Implement OnDestroy to clean up subscriptions
  5. Use takeUntil pattern for unsubscribing
  6. Always add the component to GameDetail imports
  7. Register in GameService games array
-->
