import { StatusCodes } from 'http-status-codes';

import type { IMatchesRepository } from '../../../../@types/interfaces/match.interfaces';
import type { SuccessReturn, MatchReturn } from '../../../../@types/types';

class GetAllMatchesUseCase {
  constructor(private readonly matchesRepository: IMatchesRepository) {}

  async execute(query: boolean | null): Promise<SuccessReturn<MatchReturn[]>> {
    const matches = await this.matchesRepository.findAll(query);

    return { statusCode: StatusCodes.OK, data: matches };
  }
}

export default GetAllMatchesUseCase;
