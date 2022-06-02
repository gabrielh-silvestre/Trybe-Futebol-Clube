import { StatusCodes } from 'http-status-codes';

import type { IMatchesRepository } from '../../../../@types/interfaces';
import type {
  MatchAttributes,
  MatchCreation,
  SuccessReturn,
} from '../../../../@types/types';

class CreateNewMatchUseCase {
  constructor(private readonly matchesRepository: IMatchesRepository) {}

  async execute(
    matchData: MatchCreation,
  ): Promise<SuccessReturn<MatchAttributes>> {
    const newMatch = await this.matchesRepository.create(matchData);

    return {
      statusCode: StatusCodes.CREATED,
      data: newMatch,
    };
  }
}

export default CreateNewMatchUseCase;
