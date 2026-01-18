# 📁 Estructura del Proyecto Arcade Hub

## Árbol Completo de Directorios

```
arcade-hub/
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 core/
│   │   │   ├── 📁 models/
│   │   │   │   └── 📄 game.model.ts
│   │   │   │       ├─ interface Game
│   │   │   │       ├─ interface GameScore
│   │   │   │       └─ interface PlayerStats
│   │   │   │
│   │   │   └── 📁 services/
│   │   │       ├── 📄 game.service.ts
│   │   │       │   ├─ getGames()
│   │   │       │   ├─ getGameById()
│   │   │       │   ├─ getGamesByCategory()
│   │   │       │   ├─ addScore()
│   │   │       │   └─ getScores()
│   │   │       │
│   │   │       └── 📄 score.service.ts
│   │   │           ├─ getScore()
│   │   │           ├─ addScore()
│   │   │           ├─ setLives()
│   │   │           └─ resetScore()
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── 📄 header.component.ts
│   │   │   │   └─ Logo, Navigation, User Profile
│   │   │   ├── 📄 footer.component.ts
│   │   │   │   └─ Version, Links, Info
│   │   │   └── 📄 layout.component.ts
│   │   │       └─ Main container with CRT overlay
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── 📁 home/
│   │   │   │   └── 📄 home.component.ts
│   │   │   │       ├─ Hero Section
│   │   │   │       ├─ Games Grid
│   │   │   │       └─ Hall of Fame Table
│   │   │   │
│   │   │   ├── 📁 game-hub/
│   │   │   │   └── 📄 game-hub.component.ts
│   │   │   │       └─ List view of games
│   │   │   │
│   │   │   └── 📁 game-detail/
│   │   │       └── 📄 game-detail.component.ts
│   │   │           ├─ Dynamic game loader
│   │   │           └─ Routes to specific games
│   │   │
│   │   ├── 📁 shared/
│   │   │   └── 📁 webcomponents/
│   │   │       ├── 📄 base-game.component.ts
│   │   │       │   ├─ Header con score/lives
│   │   │       │   ├─ Game content area
│   │   │       │   └─ Footer con info
│   │   │       │
│   │   │       ├── 📄 hangman.component.ts [✅ COMPLETO]
│   │   │       │   ├─ Gallows animation
│   │   │       │   ├─ Word display
│   │   │       │   └─ Virtual keyboard
│   │   │       │
│   │   │       ├── 📄 wordle.component.ts [✅ COMPLETO]
│   │   │       │   ├─ Word grid (5 letras x 6 filas)
│   │   │       │   ├─ Input y feedback
│   │   │       │   └─ Color-coded hints
│   │   │       │
│   │   │       ├── 📄 snake.component.ts [✅ COMPLETO]
│   │   │       │   ├─ Game board grid
│   │   │       │   ├─ Keyboard controls
│   │   │       │   └─ Collision detection
│   │   │       │
│   │   │       └── 📄 placeholder-games.component.ts
│   │   │           └─ Template para Battleship, Tetris, etc.
│   │   │
│   │   ├── 📄 app.routes.ts
│   │   │   ├─ route: /
│   │   │   ├─ route: /hub
│   │   │   └─ route: /game/:id
│   │   │
│   │   ├── 📄 app.config.ts
│   │   │   ├─ Router configuration
│   │   │   └─ Provider setup
│   │   │
│   │   └── 📄 app.component.ts
│   │       └─ Root component
│   │
│   ├── 📄 styles.scss [🎨 TEMA NEON COMPLETO]
│   │   ├─ CSS Variables (colores, espaciado, fuentes)
│   │   ├─ Global typography
│   │   ├─ CRT overlay effect
│   │   ├─ Neon glow effects
│   │   ├─ Animations (pulse, blink, etc.)
│   │   └─ Responsive breakpoints
│   │
│   ├── 📄 main.ts
│   │   └─ Bootstrap application
│   │
│   ├── 📄 index.html
│   │   ├─ Meta tags
│   │   ├─ Font imports (Space Grotesk)
│   │   └─ Icons (Material Symbols)
│   │
│   └── 📁 assets/
│       ├── 📁 images/
│       ├── 📁 icons/
│       └── 📁 sounds/ (preparado para futuro)
│
├── 📄 angular.json
│   ├─ Build configuration
│   ├─ Development server config
│   └─ Asset configuration
│
├── 📄 tsconfig.json
│   ├─ TypeScript compiler options
│   └─ Strict mode enabled
│
├── 📄 tsconfig.app.json
│   └─ App-specific TypeScript config
│
├── 📄 package.json
│   ├─ Dependencies
│   └─ Scripts (start, build, etc.)
│
├── 📄 .gitignore
│   └─ Git ignore patterns
│
├── 📄 README.md [📖 DOCUMENTACIÓN COMPLETA]
│   ├─ Features overview
│   ├─ Project structure
│   ├─ Getting started
│   ├─ Games description
│   ├─ Adding new games
│   ├─ Services documentation
│   └─ Browser support
│
├── 📄 DEVELOPER.md [🛠️ GUÍA TÉCNICA]
│   ├─ Architecture overview
│   ├─ Data flow diagram
│   ├─ Component communication patterns
│   ├─ Service usage examples
│   ├─ Styling guide
│   ├─ Responsive breakpoints
│   ├─ Testing examples
│   └─ Performance tips
│
├── 📄 QUICK_START.md [⚡ INICIO RÁPIDO]
│   ├─ Project overview
│   ├─ Installation steps
│   ├─ Running the app
│   ├─ Game descriptions
│   ├─ Color palette
│   ├─ How to add new games
│   ├─ Useful commands
│   └─ Troubleshooting
│
├── 📄 GAME_TEMPLATE.md [📋 TEMPLATE DE JUEGOS]
│   ├─ Component template
│   ├─ GameService registration
│   ├─ GameDetail imports
│   └─ Key points
│
└── 📄 setup.sh
    └─ Setup automation script

```

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    AppComponent                             │
└────────────┬────────────────────────────────────────────────┘
             │
             └─► LayoutComponent
                 ├─► HeaderComponent
                 ├─► RouterOutlet
                 │   ├─► HomeComponent
                 │   ├─► GameHubComponent
                 │   └─► GameDetailComponent
                 │       ├─► HangmanComponent
                 │       ├─► WordleComponent
                 │       ├─► SnakeComponent
                 │       └─► PlaceholderGamesComponent
                 └─► FooterComponent

```

## Flujo de Servicios

```
┌──────────────────────────────────────────────┐
│         GameService (Providers: root)        │
├──────────────────────────────────────────────┤
│  - games$ (BehaviorSubject<Game[]>)          │
│  - scores$ (BehaviorSubject<GameScore[]>)    │
│  - localStorage persistencia                 │
└──────────┬───────────────────────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌──────────────┐
│ Home    │  │ GameDetail   │
└─────────┘  └──────────────┘

┌──────────────────────────────────────────────┐
│      ScoreService (Providers: root)          │
├──────────────────────────────────────────────┤
│  - playerScore$ (BehaviorSubject<number>)    │
│  - multiplier$ (BehaviorSubject<number>)     │
│  - lives$ (BehaviorSubject<number>)          │
└──────────┬───────────────────────────────────┘
           │
           ▼
    ┌─────────────────┐
    │ Game Components │
    │ (Hangman, etc)  │
    └─────────────────┘

```

## Ciclo de Vida de un Juego

```
1. User selects game from Home
   ↓
2. Router navigates to /game/:id
   ↓
3. GameDetailComponent loads
   ↓
4. GameService.getGameById(id) called
   ↓
5. Specific game component rendered
   ↓
6. ScoreService.resetScore() initializes state
   ↓
7. Game loop starts (setInterval/requestAnimationFrame)
   ↓
8. Player interacts with game
   ↓
9. Score/Lives updates via ScoreService
   ↓
10. Game ends
   ↓
11. GameService.addScore() saves final score
   ↓
12. Router navigates back to / or hub

```

## Responsive Layout

### Desktop (> 768px)
```
┌────────────────────────────────────────┐
│             HEADER                     │
├────────────────────────────────────────┤
│                                        │
│  GAME CARD  GAME CARD  GAME CARD       │
│  GAME CARD  GAME CARD  GAME CARD       │
│  GAME CARD  GAME CARD  GAME CARD       │
│  GAME CARD  GAME CARD  GAME CARD       │
│                                        │
├────────────────────────────────────────┤
│             FOOTER                     │
└────────────────────────────────────────┘
```

### Tablet (481px - 768px)
```
┌──────────────────────┐
│      HEADER          │
├──────────────────────┤
│ CARD    │ CARD       │
│ CARD    │ CARD       │
│ CARD    │ CARD       │
│ CARD    │ CARD       │
├──────────────────────┤
│      FOOTER          │
└──────────────────────┘
```

### Mobile (< 480px)
```
┌──────────────┐
│   HEADER     │
├──────────────┤
│   CARD       │
├──────────────┤
│   CARD       │
├──────────────┤
│   CARD       │
├──────────────┤
│   FOOTER     │
└──────────────┘
```

## Imports de Dependencias

```
CommonModule          → *ngIf, *ngFor, etc.
FormsModule          → [(ngModel)]
RouterModule         → Navigation
RxJS Operators       → Reactivity
Angular Services     → DI & Providers
```

## Archivos Clave y Su Propósito

| Archivo | Propósito | Dependencias |
|---------|-----------|--------------|
| game.model.ts | Tipología de datos | - |
| game.service.ts | Gestión de juegos | - |
| score.service.ts | Estado del juego | - |
| base-game.component.ts | Contenedor base | CommonModule |
| home.component.ts | Página principal | GameService, Router |
| game-detail.component.ts | Cargador dinámico | GameService, Router |
| styles.scss | Tema global | - |
| index.html | Punto entrada | - |

## Cómo Navegar el Código

1. **Comenzar por**: `src/app/app.component.ts`
2. **Luego ver**: `src/app/layout/layout.component.ts`
3. **Revisar rutas**: `src/app/app.routes.ts`
4. **Explorar un juego**: `src/app/shared/webcomponents/hangman.component.ts`
5. **Entender servicios**: `src/app/core/services/game.service.ts`
6. **Ver estilos**: `src/styles.scss`

---

*Estructura diseñada para máxima escalabilidad y mantenibilidad* 🚀
