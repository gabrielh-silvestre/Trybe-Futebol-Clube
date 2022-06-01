import type { Request, Response, NextFunction } from 'express';

import GetAllTeamsUseCase from './GetAllTeamsUseCase';

class GetAllTeamsController {
  constructor(private readonly getAllTeamsUseCase: GetAllTeamsUseCase) {}

  async handle(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | never> {
    try {
      const { statusCode, data } = await this.getAllTeamsUseCase.execute();

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetAllTeamsController;
