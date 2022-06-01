import type { Request, Response, NextFunction } from 'express';

import GetTeamByIdUseCase from './GetTeamByIdUseCase';

class GetTeamByIdController {
  constructor(private readonly getTeamByIdUseCase: GetTeamByIdUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { statusCode, data } = await this.getTeamByIdUseCase.execute(id);

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetTeamByIdController;
