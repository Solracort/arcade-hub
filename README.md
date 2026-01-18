# Arcade Hub - Neo-Retro Gaming Platform

A responsive, mobile-first Angular gaming platform featuring classic arcade games with a stunning neon dark-mode aesthetic.

## Features

✨ **Neon Dark Mode Design** - Stunning cyberpunk-inspired interface with cyan and magenta neon effects
📱 **Mobile-First Responsive** - Optimized for all devices from mobile to desktop
🎮 **WebComponents Architecture** - Scalable, modular game components
🏆 **Score Tracking** - Local storage-based high score system
🎯 **Multiple Games** - Hangman, Wordle, Snake, Tetris, Battleship, Arkanoid, and more

## Games Included

- **Hangman** - Classic word guessing game
- **Wordle** - Guess the word in six attempts
- **Snake** - Classic arcade action game
- **Tetris** - Organize falling blocks
- **Battleship** - Strategic naval combat
- **Arkanoid** - Brick-breaking action
- *More coming soon...*

## Project Structure

```
arcade-hub/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── game.model.ts
│   │   │   └── services/
│   │   │       ├── game.service.ts
│   │   │       └── score.service.ts
│   │   ├── layout/
│   │   │   ├── header.component.ts
│   │   │   ├── footer.component.ts
│   │   │   └── layout.component.ts
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── game-hub/
│   │   │   └── game-detail/
│   │   ├── shared/
│   │   │   └── webcomponents/
│   │   │       ├── base-game.component.ts
│   │   │       ├── hangman.component.ts
│   │   │       └── placeholder-games.component.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.component.ts
│   ├── styles.scss
│   ├── main.ts
│   └── index.html
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd arcade-hub

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:4200/`

### Build

```bash
npm run build
```

## Technology Stack

- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced styling
- **RxJS** - Reactive programming
- **WebComponents** - Encapsulated game logic

## Styling & Theme

### Colors

- **Primary Neon Cyan**: `#00d4ff`
- **Secondary Neon Magenta**: `#ff00ff` / `#ff006e`
- **Background Dark**: `#0a0c10`
- **Surface**: `#161b22`
- **Card**: `#1e2128`

### Font

- **Display Font**: Space Grotesk (Google Fonts)
- **Icons**: Material Symbols Outlined

### Effects

- CRT overlay scanlines
- Neon glow effects
- Smooth animations and transitions
- Mobile-first responsive design

## Adding New Games

To add a new game to the platform:

1. **Create a new component** in `src/app/shared/webcomponents/`:

```typescript
import { Component } from '@angular/core';
import { BaseGameComponent } from './base-game.component';

@Component({
  selector: 'app-yourname',
  standalone: true,
  imports: [BaseGameComponent, ...],
  template: `
    <app-base-game gameId="YOUR_GAME_ID" ...>
      <!-- Your game content here -->
    </app-base-game>
  `,
  styles: [`/* Your styles */`]
})
export class YournameComponent {
  // Your game logic
}
```

2. **Register the game** in `GameService` (`src/app/core/services/game.service.ts`):

```typescript
{
  id: 'your-game-id',
  name: 'Your Game Name',
  description: 'Game description',
  category: 'action', // or other category
  icon: 'game_icon',  // Material Symbol
  componentName: 'YournameComponent',
  highScore: 0,
  tags: ['tag1', 'tag2'],
  difficulty: 'medium'
}
```

3. **Update routing** in `src/app/pages/game-detail/game-detail.component.ts` to include your component.

## Services

### GameService

Manages game data and high scores:
- `getGames()` - Get all available games
- `getGameById(id)` - Get specific game
- `addScore(score)` - Record a score
- `getScores()` - Retrieve all scores
- `getScoresByGame(gameId)` - Get scores for a specific game

### ScoreService

Manages current game state:
- `getScore()` - Get current score
- `addScore(points)` - Add points
- `setScore(score)` - Set score value
- `setMultiplier(multiplier)` - Set score multiplier
- `setLives(lives)` - Set lives count
- `removeLive()` - Decrease lives
- `resetScore()` - Reset all game state

## Performance

- Lazy loading support ready
- Standalone components for better tree-shaking
- Optimized animations
- Local storage for persistent data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

ISC License - Feel free to use for your projects!

## Roadmap

- [ ] Multiplayer support
- [ ] Leaderboards (online)
- [ ] Additional games (Parchis, more)
- [ ] Sound effects and music
- [ ] Achievements system
- [ ] User profiles
- [ ] Mobile app version

## Credits

Design inspired by cyberpunk aesthetics and retro arcade gaming.

---

**Happy Gaming!** 🎮✨
