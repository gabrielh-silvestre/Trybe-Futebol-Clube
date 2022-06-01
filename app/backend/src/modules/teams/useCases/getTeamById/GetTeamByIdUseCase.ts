import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'restify-errors';

import type { ITeamsRepository } from '../../../../@types/interfaces';
import type { Team, SuccessReturn } from '../../../../@types/types';

class GetTeamByIdUseCase {
  constructor(private readonly teamsRepository: ITeamsRepository) {}

  async execute(id: number): Promise<SuccessReturn<Team> | never> {
    const foundTeam = await this.teamsRepository.findById(id);

    if (!foundTeam) {
      throw new NotFoundError('Team not found');
    }

    return {
      statusCode: StatusCodes.OK,
      data: foundTeam,
    };
  }
}

export default GetTeamByIdUseCase;
