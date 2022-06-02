import type { Request, Response, NextFunction } from 'express';

import CreateNewMatchUseCase from './CreateNewMatchUseCase';

class CreateNewMatchController {
  constructor(private readonly createNewMatchUseCase: CreateNewMatchUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { statusCode, data } = await this.createNewMatchUseCase.execute(
        req.body,
      );

      res.status(statusCode).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default CreateNewMatchController;
