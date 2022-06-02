import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'restify-errors';

import AuthService from '../../services/Auth';

class AuthValidator {
  public static handle(req: Request, _res: Response, next: NextFunction): void {
    const { authorization } = req.headers;

    const isAuthorized = AuthService.validate(authorization as string);

    if (!isAuthorized) {
      const err = new UnauthorizedError('Invalid token');

      return next(err);
    }

    return next();
  }
}

export default AuthValidator;
