import { UnauthorizedError } from 'restify-errors';
import { StatusCodes } from 'http-status-codes';

import type { SuccessReturn } from '../../../../@types/types';
import type { IAuthService } from '../../../../services/Auth';

class ValidateUserUseCase {
  constructor(private readonly authService: IAuthService) {}

  execute(token: string): SuccessReturn<string> {
    const result = this.authService.validate(token);

    if (!result) {
      throw new UnauthorizedError('Invalid token');
    }

    return {
      statusCode: StatusCodes.OK,
      data: result.data.role,
    };
  }
}

export default ValidateUserUseCase;
