import type {
  LeaderBoardAttributes,
  LeaderBoardOptions,
  TeamMatchesAttributes,
} from '../types';

interface LeaderBoardRepository {
  getAll(option?: LeaderBoardOptions): Promise<LeaderBoardAttributes[]>;
}

interface BoardBuilder {
  home: (teamMatches: TeamMatchesAttributes[]) => LeaderBoardAttributes[];
  away: (teamMatches: TeamMatchesAttributes[]) => LeaderBoardAttributes[];
  all: (teamMatches: TeamMatchesAttributes[]) => LeaderBoardAttributes[];
}

export type ILeaderBoardRepository = LeaderBoardRepository;
export type IBoardBuilder = BoardBuilder;
