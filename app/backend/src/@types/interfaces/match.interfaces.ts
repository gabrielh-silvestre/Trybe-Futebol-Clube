import type { MatchAttributes, MatchCreation, MatchReturn } from '../types';

interface MatchesRepository {
  findAll(query?: boolean | null): Promise<MatchReturn[]>;
  create(match: MatchCreation): Promise<MatchAttributes>;
}

export type IMatchesRepository = MatchesRepository;
