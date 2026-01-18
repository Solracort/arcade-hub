# 🎮 Arcade Hub - Guía Rápida de Inicio

## ¿Qué acabo de recibir?

Un **proyecto Angular completo y escalable** para un arcade de juegos clásicos con:

✨ **Características principales:**
- Dark mode con estética neon cyan (#00d4ff) y magenta (#ff00ff)
- Fuente Space Grotesk para ese look retro-futurista
- Diseño mobile-first responsive
- Arquitectura escalable con WebComponents
- Sistema de puntuaciones con almacenamiento local
- 3 juegos funcionales (Hangman, Wordle, Snake)
- Placeholders para más juegos (Battleship, Tetris, Arkanoid, Parchis)

## Estructura del Proyecto

```
arcade-hub/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── game.model.ts          # Interfaces de datos
│   │   │   └── services/
│   │   │       ├── game.service.ts        # Gestión de juegos y puntuaciones
│   │   │       └── score.service.ts       # Estado del juego actual
│   │   ├── layout/
│   │   │   ├── header.component.ts        # Cabecera con logo y nav
│   │   │   ├── footer.component.ts        # Pie con info
│   │   │   └── layout.component.ts        # Contenedor principal
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   └── home.component.ts      # Página principal con grid de juegos
│   │   │   ├── game-hub/
│   │   │   │   └── game-hub.component.ts  # Hub alternativo de juegos
│   │   │   └── game-detail/
│   │   │       └── game-detail.component.ts # Contenedor dinámico de juegos
│   │   ├── shared/
│   │   │   └── webcomponents/
│   │   │       ├── base-game.component.ts     # Clase base para juegos
│   │   │       ├── hangman.component.ts       # Juego Ahorcado
│   │   │       ├── wordle.component.ts        # Juego Wordle
│   │   │       ├── snake.component.ts         # Juego Snake
│   │   │       └── placeholder-games.component.ts # Template para nuevos juegos
│   │   ├── app.routes.ts                  # Configuración de rutas
│   │   ├── app.config.ts                  # Configuración de la app
│   │   └── app.component.ts               # Componente raíz
│   ├── styles.scss                        # Estilos globales (TEMA NEON)
│   ├── main.ts                            # Bootstrap
│   └── index.html                         # HTML raíz
├── angular.json                           # Configuración Angular
├── tsconfig.json                          # Configuración TypeScript
├── package.json                           # Dependencias npm
├── README.md                              # Documentación completa
├── DEVELOPER.md                           # Guía para desarrolladores
├── GAME_TEMPLATE.md                       # Template para nuevos juegos
└── QUICK_START.md                         # Este archivo
```

## Primeros Pasos

### 1. Instalar Dependencias

```bash
cd arcade-hub
npm install
```

### 2. Iniciar Servidor de Desarrollo

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:4200**

### 3. Ver la Aplicación

- **Home Page** (`/`): Grid de juegos disponibles
- **Hangman** (`/game/hangman`): Juego de adivinanza de palabras
- **Wordle** (`/game/wordle`): Adivina la palabra en 6 intentos
- **Snake** (`/game/snake`): Clásico juego de la serpiente
- **Otros juegos**: Mostrarán placeholder "Coming Soon"

## Juegos Incluidos

### ✅ Funcionales

1. **Hangman** - Adivina la palabra letra por letra
2. **Wordle** - Adivina palabra de 5 letras (6 intentos)
3. **Snake** - Controla la serpiente con flechas del teclado

### 🚧 Placeholders (Listos para implementar)

4. **Battleship** - Hundir la flota
5. **Tetris** - Organizar bloques
6. **Arkanoid** - Romper bloques
7. **Parchis** - Carrera de fichas

## Paleta de Colores (Neon Dark Mode)

```scss
Primary:     #00d4ff (Cyan Neon)
Secondary:   #ff00ff (Magenta Neon)
Alt Secondary: #ff006e (Magenta Oscuro)
Background:  #0a0c10 (Negro profundo)
Surface:     #161b22 (Gris oscuro)
Card:        #1e2128 (Gris más claro)
Text:        #ffffff (Blanco)
Muted:       #b0b4ba (Gris claro)
Success:     #1f883d (Verde)
Danger:      #ff006e (Rojo/Magenta)
Warning:     #fb8500 (Naranja)
```

## Funcionalidades Globales

### Estilos
- **Animaciones neon**: `neon-pulse`, `neon-blink`
- **Overlay CRT**: Efecto de líneas de escaneado
- **Neon glow**: Efecto de brillo en elementos
- **Responsive**: Mobile-first, breakpoints a 768px y 480px

### Services

**GameService**
```typescript
getGames()              // Observable de todos los juegos
getGameById(id)         // Obtener juego por ID
addScore(score)         // Guardar puntuación
getScores()             // Obtener todas las puntuaciones
getScoresByGame(id)     // Puntuaciones de un juego
```

**ScoreService**
```typescript
getScore()              // Score actual del juego
addScore(points)        // Sumar puntos
setScore(score)         // Establecer puntuación
removeLive()            // Perder una vida
setLives(lives)         // Establecer vidas
resetScore()            // Resetear estado
```

## Cómo Agregar un Nuevo Juego

### 1. Crear Componente

```bash
# Crear archivo: src/app/shared/webcomponents/mi-juego.component.ts
```

```typescript
import { Component } from '@angular/core';
import { BaseGameComponent } from './base-game.component';

@Component({
  selector: 'app-mi-juego',
  standalone: true,
  imports: [BaseGameComponent, CommonModule],
  template: `
    <app-base-game
      gameId="MI_JUEGO_001"
      [currentScore]="score"
      [currentLives]="lives"
      (backClicked)="goBack()">
      <!-- Tu contenido del juego -->
    </app-base-game>
  `,
  styles: [`/* Tus estilos */`]
})
export class MiJuegoComponent {
  score = 0;
  lives = 3;
  
  goBack() {
    this.router.navigate(['/']);
  }
}
```

### 2. Registrar en GameService

Editar `src/app/core/services/game.service.ts`:

```typescript
{
  id: 'mi-juego',
  name: 'Mi Juego',
  description: 'Descripción del juego',
  category: 'action', // 'classic', 'strategy', 'puzzle', 'action', 'retro'
  icon: 'gamepad',    // Material Symbol Icon
  componentName: 'MiJuegoComponent',
  highScore: 0,
  tags: ['tag1', 'tag2'],
  difficulty: 'medium' // 'easy', 'medium', 'hard'
}
```

### 3. Importar en GameDetailComponent

Editar `src/app/pages/game-detail/game-detail.component.ts`:

```typescript
import { MiJuegoComponent } from '../../shared/webcomponents/mi-juego.component';

@Component({
  imports: [CommonModule, ..., MiJuegoComponent]
})
// En el template:
<app-mi-juego *ngIf="game.id === 'mi-juego'"></app-mi-juego>
```

¡Listo! Tu juego estará disponible en la home.

## Ejemplos de Uso

### Agregar puntos en un juego

```typescript
constructor(private scoreService: ScoreService) {}

playerWon() {
  this.scoreService.addScore(1000);
}
```

### Obtener datos del juego

```typescript
constructor(private gameService: GameService) {}

ngOnInit() {
  this.gameService.getGames().subscribe(games => {
    console.log('Juegos disponibles:', games);
  });
}
```

### Guardar puntuación final

```typescript
endGame() {
  this.gameService.addScore({
    gameId: 'mi-juego',
    playerName: 'Player',
    score: this.currentScore,
    date: new Date(),
    difficulty: 'medium'
  });
  this.router.navigate(['/']);
}
```

## Comandos Útiles

```bash
# Desarrollo
npm start                 # Iniciar servidor dev

# Producción
npm run build            # Build para producción (dist/)

# Monitoring
npm run watch            # Build en watch mode

# Testing (cuando esté configurado)
npm test                 # Ejecutar pruebas
```

## Responsive Design

- **Desktop** (> 768px): Layout completo, grid 4 columnas
- **Tablet** (481px - 768px): Layout adaptado, grid 2 columnas
- **Mobile** (< 480px): Layout optimizado, grid 1 columna

## Características de Escalabilidad

✅ **Modular**: Cada juego es un WebComponent independiente
✅ **Reutilizable**: BaseGameComponent para consistencia
✅ **Services**: Lógica centralizada y reutilizable
✅ **Standalone Components**: Carga más rápida
✅ **Lazy Loading**: Ready para implementar
✅ **LocalStorage**: Puntuaciones persistentes

## Troubleshooting

**Problema**: Estilos no aparecen
- Verifica que `styles.scss` esté importado en `angular.json`

**Problema**: Juego no funciona
- Asegúrate de importar el componente en `GameDetailComponent`
- Verifica que el ID en el template coincida con `game.id`

**Problema**: LocalStorage no guarda
- Abre DevTools > Application > LocalStorage
- Busca `arcadeScores`

## Próximos Pasos

1. ✨ Personalizar colores en `styles.scss`
2. 🎮 Implementar los juegos placeholder
3. 🎵 Agregar sonidos y música
4. 👥 Implementar multiplayer
5. 🏆 Crear leaderboard online
6. 📱 Publicar en App Store/Play Store

## Documentación Completa

Para más detalles, ver:
- **README.md**: Documentación completa
- **DEVELOPER.md**: Guía técnica detallada
- **GAME_TEMPLATE.md**: Template para nuevos juegos

## Recursos

- [Angular 17 Docs](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Guide](https://rxjs.dev/)
- [Material Icons](https://fonts.google.com/icons)
- [Space Grotesk Font](https://fonts.google.com/specimen/Space+Grotesk)

## Soporte y Ayuda

Si tienes dudas:
1. Revisa los ejemplos en los componentes existentes
2. Consulta DEVELOPER.md para patrones comunes
3. Usa GAME_TEMPLATE.md como punto de partida

---

**¡A jugar!** 🎮✨

Arcade Hub v1.0.0 | Built with Angular 17 | Neon Dark Mode Theme
