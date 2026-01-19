import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  // HANGMAN WORDS - Agrupa por dificultad
  private hangmanWords = {
    easy: [
      'HANGMAN', 'ARCADE', 'GAMING', 'RETRO', 'NEON', 'PIXEL', 'CONSOLE', 'JOYSTICK',
      'COMPUTER', 'KEYBOARD', 'SCREEN', 'GAME', 'PLAY', 'MUSIC', 'SOUND', 'VIDEO',
      'INTERNET', 'DIGITAL', 'CIRCUIT', 'ROBOT', 'SPACE', 'ROBOT', 'LASER', 'POWER',
      'ENERGY', 'SPEED', 'LEVEL', 'SCORE', 'VICTORY', 'CHALLENGE'
    ],
    medium: [
      'ALGORITHM', 'GRAPHICS', 'DATABASE', 'NETWORK', 'SECURITY', 'SOFTWARE',
      'HARDWARE', 'INTERFACE', 'PROTOCOL', 'ETHERNET', 'FIREWALL', 'BROWSER',
      'JAVASCRIPT', 'TYPESCRIPT', 'FRAMEWORK', 'LIBRARY', 'DEVELOPER', 'PROGRAMMER',
      'COMPILER', 'DEBUGGER', 'TERMINAL', 'CONSOLE', 'REPOSITORY', 'DEPLOYMENT'
    ],
    hard: [
      'CYBERNETICS', 'VIRTUALIZATION', 'CONTAINERIZATION', 'MICROSERVICES',
      'ASYNCHRONOUS', 'ENCRYPTION', 'AUTHENTICATION', 'AUTHORIZATION',
      'PERFORMANCE', 'OPTIMIZATION', 'SCALABILITY', 'AVAILABILITY',
      'REDUNDANCY', 'THROUGHPUT', 'BANDWIDTH', 'LATENCY', 'ARCHITECTURE'
    ]
  };

  // WORDLE WORDS (5 letras exactamente)
  private wordleWords = [
    'ANGULAR', 'ARCADE', 'GAMING', 'SCRIPT', 'NEON', 'PIXEL', 'SOUND', 'GAMES',
    'MOUSE', 'KEYBOARD', 'MONITOR', 'SETUP', 'BATTLE', 'SNAKE', 'TOWER', 'LEVEL',
    'SCORE', 'POWER', 'SPEED', 'MAGIC', 'FORGE', 'STAGE', 'QUEST', 'BOSS',
    'ENEMY', 'MAGIC', 'SPELL', 'SWORD', 'ARROW', 'ARROW', 'STONE', 'METAL',
    'LIGHT', 'SOUND', 'MUSIC', 'VOICE', 'OCEAN', 'STORM', 'FLAME', 'FROST',
    'EARTH', 'CLOUD', 'SOLAR', 'LUNAR', 'STAR', 'COMET', 'ORBIT', 'GALAXY',
    'ALIEN', 'ROBOT', 'CYBER', 'DRIVE', 'CABLE', 'WIRED', 'CLOUD', 'DATA',
    'LOGIC', 'BRAIN', 'HEART', 'SOUL', 'GHOST', 'DEMON', 'ANGEL', 'SAINT',
    'KING', 'QUEEN', 'PRINCE', 'GUARD', 'KNIGHT', 'NOBLE', 'JOUST', 'FEAST',
    'MERRY', 'JOLLY', 'HAPPY', 'SMILE', 'LAUGH', 'DANCE', 'SING', 'CHEER'
  ];

  constructor() { }

  /**
   * Obtiene una palabra aleatoria del juego Hangman
   * @param difficulty - 'easy', 'medium', 'hard' (por defecto 'easy')
   * @returns Una palabra aleatoria
   */
  getHangmanWord(difficulty: 'easy' | 'medium' | 'hard' = 'easy'): string {
    const words = this.hangmanWords[difficulty] || this.hangmanWords.easy;
    return words[Math.floor(Math.random() * words.length)];
  }

  /**
   * Obtiene una palabra aleatoria del juego Wordle (5 letras)
   * @returns Una palabra aleatoria de 5 letras
   */
  getWordleWord(): string {
    return this.wordleWords[Math.floor(Math.random() * this.wordleWords.length)];
  }

  /**
   * Obtiene todas las palabras del Hangman según dificultad
   * @param difficulty - 'easy', 'medium', 'hard'
   * @returns Array de palabras
   */
  getAllHangmanWords(difficulty: 'easy' | 'medium' | 'hard' = 'easy'): string[] {
    return this.hangmanWords[difficulty] || this.hangmanWords.easy;
  }

  /**
   * Obtiene todas las palabras del Wordle
   * @returns Array de palabras de 5 letras
   */
  getAllWordleWords(): string[] {
    return this.wordleWords;
  }

  /**
   * Agrega una nueva palabra al Hangman
   * @param word - La palabra a agregar
   * @param difficulty - Dificultad ('easy', 'medium', 'hard')
   */
  addHangmanWord(word: string, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): void {
    const upperWord = word.toUpperCase();
    if (!this.hangmanWords[difficulty].includes(upperWord)) {
      this.hangmanWords[difficulty].push(upperWord);
    }
  }

  /**
   * Agrega una nueva palabra al Wordle (5 letras)
   * @param word - La palabra a agregar (debe tener 5 letras)
   */
  addWordleWord(word: string): void {
    const upperWord = word.toUpperCase();
    if (upperWord.length === 5 && !this.wordleWords.includes(upperWord)) {
      this.wordleWords.push(upperWord);
    }
  }

  /**
   * Elimina una palabra del Hangman
   * @param word - La palabra a eliminar
   * @param difficulty - Dificultad ('easy', 'medium', 'hard')
   */
  removeHangmanWord(word: string, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): void {
    const index = this.hangmanWords[difficulty].indexOf(word.toUpperCase());
    if (index > -1) {
      this.hangmanWords[difficulty].splice(index, 1);
    }
  }

  /**
   * Elimina una palabra del Wordle
   * @param word - La palabra a eliminar
   */
  removeWordleWord(word: string): void {
    const index = this.wordleWords.indexOf(word.toUpperCase());
    if (index > -1) {
      this.wordleWords.splice(index, 1);
    }
  }

  /**
   * Obtiene estadísticas de palabras
   * @returns Objeto con conteos de palabras por juego y dificultad
   */
  getStatistics(): { hangman: { easy: number; medium: number; hard: number }; wordle: number } {
    return {
      hangman: {
        easy: this.hangmanWords.easy.length,
        medium: this.hangmanWords.medium.length,
        hard: this.hangmanWords.hard.length
      },
      wordle: this.wordleWords.length
    };
  }
}
