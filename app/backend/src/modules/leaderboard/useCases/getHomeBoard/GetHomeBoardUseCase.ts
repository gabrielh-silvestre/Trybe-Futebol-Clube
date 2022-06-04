import { StatusCodes } from 'http-status-codes';

import type { ILeaderBoardRepository } from '../../../../@types/interfaces';
import type {
  LeaderBoardAttributes,
  SuccessReturn,
} from '../../../../@types/types';

class GetHomeBoardUseCase {
  constructor(private readonly leaderBoardRepository: ILeaderBoardRepository) {}

  async execute(): Promise<SuccessReturn<LeaderBoardAttributes[]>> {
    const leaderBoard = await this.leaderBoardRepository.getAll('home');

    return {
      statusCode: StatusCodes.OK,
      data: leaderBoard,
    };
  }
}

export default GetHomeBoardUseCase;
