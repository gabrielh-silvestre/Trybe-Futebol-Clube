import { StatusCodes } from 'http-status-codes';

import type { ILeaderBoardRepository } from '../../../../@types/interfaces';
import type {
  LeaderBoardAttributes,
  SuccessReturn,
} from '../../../../@types/types';

class GetAllBoardUseCase {
  constructor(private readonly leaderBoardRepository: ILeaderBoardRepository) {}

  async execute(): Promise<SuccessReturn<LeaderBoardAttributes[]>> {
    const leaderBoard = await this.leaderBoardRepository.getAll();

    return {
      statusCode: StatusCodes.OK,
      data: leaderBoard,
    };
  }
}

export default GetAllBoardUseCase;
