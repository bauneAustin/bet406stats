export type SportType = 'Football' | 'Golf' | 'Basketball' | 'Hockey';
export type BetType = 'Money Line' | 'Prop' | 'Winner' | 'FRL' | 'Top 5' | 'Top 10' | 'Top 20';

export interface SportsBet {
  id: string;
  timestamp: number;
  sport: SportType;
  event: string;
  betType: BetType;
  details: string;
  stake: number;
  payout: number;
  status: 'Win' | 'Loss' | 'Push' | 'Pending';
  odds: string; // e.g. -110, +200
}

export const initialSportsData: SportsBet[] = [
  {
    id: 's1',
    timestamp: Date.now() - 86400000 * 3,
    sport: 'Football',
    event: 'Chiefs vs Eagles',
    betType: 'Money Line',
    details: 'Chiefs to win',
    stake: 100,
    payout: 190,
    status: 'Win',
    odds: '-110',
  },
  {
    id: 's2',
    timestamp: Date.now() - 86400000 * 2,
    sport: 'Basketball',
    event: 'Lakers vs Celtics',
    betType: 'Prop',
    details: 'LeBron Over 25.5 points',
    stake: 50,
    payout: 0,
    status: 'Loss',
    odds: '-115',
  },
  {
    id: 's3',
    timestamp: Date.now() - 86400000,
    sport: 'Golf',
    event: 'The Masters',
    betType: 'Top 10',
    details: 'Scottie Scheffler',
    stake: 25,
    payout: 75,
    status: 'Win',
    odds: '+200',
  },
  {
    id: 's4',
    timestamp: Date.now() - 3600000,
    sport: 'Hockey',
    event: 'Rangers vs Bruins',
    betType: 'Money Line',
    details: 'Bruins to win',
    stake: 80,
    payout: 0,
    status: 'Pending',
    odds: '+110',
  }
];
