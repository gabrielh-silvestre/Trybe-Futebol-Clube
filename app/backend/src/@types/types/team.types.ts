type TeamAttributes = {
  id: number;
  teamName: string;
};

type TeamCreationAttributes = Omit<TeamAttributes, 'id'>;

export type Team = TeamAttributes;
export type TeamCreation = TeamCreationAttributes;
