import type {
  MatchAttributes,
  MatchCreation,
  MatchReturn,
  MatchUpdate,
} from '../types';

interface MatchesRepository {
  findAll(query?: boolean | null): Promise<MatchReturn[]>;
  create(match: MatchCreation): Promise<MatchAttributes>;
  update(id: number, newScore: MatchUpdate): Promise<MatchAttributes>;
}

export type IMatchesRepository = MatchesRepository;
