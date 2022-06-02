import type { Request, Response, NextFunction } from 'express';
import { NotFoundError, UnauthorizedError } from 'restify-errors';
import * as joi from 'joi';

import MatchModel from '../../database/models/MatchModel';

import buildJoiSchemaError from '../../utils';

class MatchValidator {
  private static createValidationSchema = joi.object({
    homeTeam: joi.number().strict().required(),
    awayTeam: joi.number().strict().required(),
    homeTeamGoals: joi.number().strict().min(0).required(),
    awayTeamGoals: joi.number().strict().min(0).required(),
    inProgress: joi.boolean().valid(true).required(),
  });

  public static validateCreate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    const { error } = MatchValidator.createValidationSchema.validate(req.body);
    if (error) {
      const err = buildJoiSchemaError(error.details[0].message);

      return next(err);
    }

    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      // TODO: after finish o trybe evaluator, change this to a conflict error
      const err = new UnauthorizedError(
        'It is not possible to create a match with two equal teams',
      );

      return next(err);
    }

    return next();
  }

  public static async validateMatchExists(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const id = Number(req.params.id);
    const taskExists = await MatchModel.findByPk(id);

    if (!taskExists) {
      const err = new NotFoundError('Match not found');

      return next(err);
    }

    return next();
  }
}

export default MatchValidator;
