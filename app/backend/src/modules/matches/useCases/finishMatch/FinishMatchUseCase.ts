import { StatusCodes } from 'http-status-codes';

import type { IMatchesRepository } from '../../../../@types/interfaces';
import type { SuccessReturn, MessageCase } from '../../../../@types/types';

class FinishMatchUseCase {
  constructor(private readonly matchesRepository: IMatchesRepository) {}

  async execute(id: number): Promise<SuccessReturn<MessageCase>> {
    await this.matchesRepository.update(id, {
      inProgress: false,
    });

    return {
      statusCode: StatusCodes.OK,
      data: {
        message: 'Finished',
      },
    };
  }
}

export default FinishMatchUseCase;
