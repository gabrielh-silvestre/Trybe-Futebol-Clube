import type { Request, Response, NextFunction } from 'express';

import CreateNewMatchUseCase from './CreateNewMatchUseCase';

class CreateNewMatchController {
  constructor(private readonly createNewMatchUseCase: CreateNewMatchUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: after finish o trybe evaluator, simplify this pass only req.body
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

      const { statusCode, data } = await this.createNewMatchUseCase.execute({
        homeTeam: Number(homeTeam),
        awayTeam: Number(awayTeam),
        homeTeamGoals: Number(homeTeamGoals),
        awayTeamGoals: Number(awayTeamGoals),
        inProgress: inProgress || true,
      });

      res.status(statusCode).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default CreateNewMatchController;
