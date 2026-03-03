export type GameType = 'Keno' | 'Reel' | 'Blackjack' | 'Poker' | 'Craps' | 'Roulette';
export type MoodType = 'Calm' | 'Bored' | 'Tilted' | 'Tired' | 'Focused';

export interface LedgerEntry {
  id: string;
  timestamp: number;
  gameType: GameType;
  gameName: string;
  location: string;
  duration: number; // in minutes
  mood: MoodType;
  buyIn: number;
  cashOut: number;
  betAmount: number;
  stopLoss?: number;
  takeProfit?: number;
}

export const initialLedgerData: LedgerEntry[] = [
  {
    id: '1',
    timestamp: Date.now() - 86400000 * 2,
    gameType: 'Keno',
    gameName: 'Caveman Keno',
    location: 'Grand Central',
    duration: 120,
    mood: 'Focused',
    buyIn: 20,
    cashOut: 45,
    betAmount: 1,
    stopLoss: 20,
    takeProfit: 100,
  },
  {
    id: '2',
    timestamp: Date.now() - 86400000,
    gameType: 'Reel',
    gameName: 'Buffalo Gold',
    location: 'The Oasis',
    duration: 45,
    mood: 'Bored',
    buyIn: 100,
    cashOut: 20,
    betAmount: 0.8,
    stopLoss: 50,
  },
  {
    id: '3',
    timestamp: Date.now() - 3600000,
    gameType: 'Blackjack',
    gameName: 'Single Deck BJ',
    location: 'Grand Central',
    duration: 180,
    mood: 'Focused',
    buyIn: 200,
    cashOut: 350,
    betAmount: 25,
    takeProfit: 500,
  },
  {
    id: '4',
    timestamp: Date.now() - 1800000,
    gameType: 'Craps',
    gameName: 'Main Floor Craps',
    location: 'The Oasis',
    duration: 60,
    mood: 'Tilted',
    buyIn: 300,
    cashOut: 150,
    betAmount: 15,
    stopLoss: 150,
  },
];
