import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from 'restify-errors';

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
      const err = new NotFoundError('Team not found');

      return next(err);
    }

    return next();
  }
}

export default TeamValidator;
