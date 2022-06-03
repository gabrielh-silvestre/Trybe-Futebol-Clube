import { IBoardBuilder } from '../interfaces';

type Attributes = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

type Options = keyof Pick<IBoardBuilder, 'away' | 'home'>;

export type LeaderBoardAttributes = Attributes;
export type LeaderBoardOptions = Options;
