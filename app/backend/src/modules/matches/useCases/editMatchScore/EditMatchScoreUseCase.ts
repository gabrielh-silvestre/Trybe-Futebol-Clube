import { StatusCodes } from 'http-status-codes';

import type { IMatchesRepository } from '../../../../@types/interfaces';
import type { MatchAttributes, SuccessReturn } from '../../../../@types/types';

class EditMatchScoreUseCase {
  constructor(private readonly matchesRepository: IMatchesRepository) {}

  async execute(
    id: number,
    matchUpdate: Pick<MatchAttributes, 'homeTeamGoals' | 'awayTeamGoals'>,
  ): Promise<SuccessReturn<MatchAttributes>> {
    const match = await this.matchesRepository.update(id, matchUpdate);

    return {
      statusCode: StatusCodes.OK,
      data: match,
    };
  }
}

export default EditMatchScoreUseCase;
