import type { Request, Response, NextFunction } from 'express';
import { BadRequestError } from 'restify-errors';
import * as joi from 'joi';

class MatchValidator {
  private static createValidationSchema = joi.object({
    homeTeam: joi.number().required(),
    awayTeam: joi.number().required(),
    homeTeamGoals: joi.number().min(0).required(),
    awayTeamGoals: joi.number().min(0).required(),
    inProgress: joi.boolean().valid(true).required(),
  });

  public static validateCreate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    const { error } = MatchValidator.createValidationSchema.validate(req.body);

    if (error) {
      const err = new BadRequestError(error.details[0].message);

      return next(err);
    }

    return next();
  }
}

export default MatchValidator;
