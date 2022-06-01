import type { Request, Response, NextFunction } from 'express';

import GetAllMatchesUseCase from './GetAllMatchesUseCase';

class GetAllMatchesController {
  constructor(private readonly getAllMatchesUseCase: GetAllMatchesUseCase) {}

  async handle(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { statusCode, data } = await this.getAllMatchesUseCase.execute();

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetAllMatchesController;
