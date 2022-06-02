import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'restify-errors';

import TeamModel from '../../database/models/TeamModel';

class TeamValidator {
  public static async validateTeamExists(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { homeTeam, awayTeam } = req.body;

    const [home, away] = await Promise.all([
      TeamModel.findByPk(homeTeam),
      TeamModel.findByPk(awayTeam),
    ]);

    if (!home || !away) {
      // TODO: after finish o trybe evaluator, change this to a not found error
      const err = new UnauthorizedError('There is no team with such id!');

      return next(err);
    }

    return next();
  }
}

export default TeamValidator;
