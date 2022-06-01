import { StatusCodes } from 'http-status-codes';

import type { ITeamsRepository } from '../../../../@types/interfaces';
import type { SuccessReturn, Team } from '../../../../@types/types';

class GetAllTeamsUseCase {
  constructor(private readonly teamsRepository: ITeamsRepository) {}

  async execute(): Promise<SuccessReturn<Team[]>> {
    const teams = await this.teamsRepository.findAll();

    return {
      statusCode: StatusCodes.OK,
      data: teams,
    };
  }
}

export default GetAllTeamsUseCase;
