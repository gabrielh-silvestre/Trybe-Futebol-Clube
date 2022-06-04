import type { NextFunction, Request, Response } from 'express';

import GetAwayBoardUseCase from './GetAwayBoardUseCase';

class GetAwayBoardController {
  constructor(private readonly getAllBoardUseCase: GetAwayBoardUseCase) {}

  async handle(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { statusCode, data } = await this.getAllBoardUseCase.execute();

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetAwayBoardController;
