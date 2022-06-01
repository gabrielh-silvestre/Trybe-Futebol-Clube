import type { MatchAttributes, MatchCreation, MatchReturn } from '../types';

interface MatchesRepository {
  findAll(): Promise<MatchReturn[]>;
  create(match: MatchCreation): Promise<MatchAttributes>;
  update(match: MatchAttributes): Promise<MatchAttributes>;
}

export type IMatchesRepository = MatchesRepository;
