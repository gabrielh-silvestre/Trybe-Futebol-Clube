import { MatchAttributes } from './match.types';

type Attributes = {
  id: number;
  teamName: string;
};

type TeamCreationAttributes = Omit<Attributes, 'id'>;

type TeamMatches = Attributes & {
  homeTeam: MatchAttributes[];
  awayTeam: MatchAttributes[];
};

export type TeamAttributes = Attributes;
export type TeamCreation = TeamCreationAttributes;
export type TeamMatchesAttributes = TeamMatches;
