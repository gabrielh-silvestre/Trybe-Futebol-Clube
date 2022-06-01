import type { TeamAttributes } from '../types';

interface TeamsRepository {
  findAll(): Promise<TeamAttributes[]>;
  findById(id: number): Promise<TeamAttributes | null>;
}

export type ITeamsRepository = TeamsRepository;
