type Attributes = {
  id: number;
  teamName: string;
};

type TeamCreationAttributes = Omit<Attributes, 'id'>;

export type TeamAttributes = Attributes;
export type TeamCreation = TeamCreationAttributes;
