import { LeaderBoardAttributes, LeaderBoardOptions } from '../types';

interface LeaderBoardRepository {
  getAll(option?: LeaderBoardOptions): Promise<LeaderBoardAttributes[]>;
}

export type ILeaderBoardRepository = LeaderBoardRepository;
