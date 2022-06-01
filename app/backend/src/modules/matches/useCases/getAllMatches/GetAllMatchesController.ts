import type { Request, Response, NextFunction } from 'express';

import GetAllMatchesUseCase from './GetAllMatchesUseCase';

class GetAllMatchesController {
  constructor(private readonly getAllMatchesUseCase: GetAllMatchesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let q: boolean | null = null;
      const { inProgress } = req.query;

      if (typeof inProgress === 'string') {
        q = inProgress === 'true';
      }

      const { statusCode, data } = await this.getAllMatchesUseCase.execute(q);

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetAllMatchesController;
