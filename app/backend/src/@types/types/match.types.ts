type MatchAttributes = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

type MatchCreationAttributes = Omit<MatchAttributes, 'id'>;

export type Match = MatchAttributes;
export type MatchCreation = MatchCreationAttributes;
