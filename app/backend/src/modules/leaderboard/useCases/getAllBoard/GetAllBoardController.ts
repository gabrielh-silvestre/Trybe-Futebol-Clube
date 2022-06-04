import type { NextFunction, Request, Response } from 'express';

import GetAllBoardUseCase from './GetAllBoardUseCase';

class GetAllBoardController {
  constructor(private readonly getAllBoardUseCase: GetAllBoardUseCase) {}

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

export default GetAllBoardController;
