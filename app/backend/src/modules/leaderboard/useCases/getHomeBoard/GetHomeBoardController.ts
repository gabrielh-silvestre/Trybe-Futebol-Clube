import type { NextFunction, Request, Response } from 'express';

import GetHomeBoardUseCase from './GetHomeBoardUseCase';

class GetHomeBoardController {
  constructor(private readonly getHomeBoardUseCase: GetHomeBoardUseCase) {}

  async handle(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { statusCode, data } = await this.getHomeBoardUseCase.execute();

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetHomeBoardController;
