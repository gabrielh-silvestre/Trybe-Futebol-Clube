import type { NextFunction, Request, Response } from 'express';

import FinishMatchUseCase from './FinishMatchUseCase';

class FinishMatchController {
  constructor(private readonly finishMatchUseCase: FinishMatchUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);

      const { statusCode, data } = await this.finishMatchUseCase.execute(id);

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default FinishMatchController;
