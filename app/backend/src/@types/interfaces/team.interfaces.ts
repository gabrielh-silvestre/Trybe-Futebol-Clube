import { Team } from '../types';

interface TeamsRepository {
  findAll(): Promise<Team[]>;
  findById(id: number): Promise<Team | null>;
}

export type ITeamsRepository = TeamsRepository;
