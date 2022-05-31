import type { Request, Response, NextFunction } from 'express';

import ValidateUserUseCase from './ValidateUserUseCase';

class ValidateUserController {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {}

  public handle(req: Request, res: Response, next: NextFunction): void {
    try {
      const { authorization } = req.headers;

      const { statusCode, data } = this.validateUserUseCase.execute(
        authorization as string,
      );

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default ValidateUserController;
