// Modelo para los juegos del arcade
export interface Game {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'strategy' | 'puzzle' | 'action' | 'retro';
  icon: string;
  componentName: string;
  highScore: number;
  thumbnail?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface GameScore {
  gameId: string;
  playerName: string;
  score: number;
  date: Date;
  difficulty?: string;
}

export interface PlayerStats {
  totalGamesPlayed: number;
  totalScore: number;
  favoriteGame: string;
  lastGamePlayed: Date;
}
