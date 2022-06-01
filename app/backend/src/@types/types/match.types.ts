import type { TeamAttributes } from './team.types';

type Attributes = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

type CreationAttributes = Omit<Attributes, 'id'>;

type Return = Attributes & {
  teamHome: Pick<TeamAttributes, 'teamName'>;
  teamAway: Pick<TeamAttributes, 'teamName'>;
};

export type MatchAttributes = Attributes;
export type MatchCreation = CreationAttributes;
export type MatchReturn = Return;
