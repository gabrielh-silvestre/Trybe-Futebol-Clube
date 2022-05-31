import type { Request, Response, NextFunction } from 'express';
import { BadRequestError } from 'restify-errors';
import * as joi from 'joi';

class UserValidator {
  private static loginValidationSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  public static validateLogin(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    const { error } = UserValidator.loginValidationSchema.validate(req.body);

    if (error) {
      const err = new BadRequestError('All fields must be filled');

      return next(err);
    }

    return next();
  }
}

export default UserValidator;
