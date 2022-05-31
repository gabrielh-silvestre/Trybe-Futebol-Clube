import { Router } from 'express';
import { UnauthorizedError } from 'restify-errors';

import loginUserController from '../modules/users/useCases/loginUser';
import UserValidator from '../middleware/validators/UserValidator';
import AuthService from '../services/Auth';

const router = Router();

router.post('/', UserValidator.validateLogin, (req, res, next) => {
  loginUserController.handle(req, res, next);
});

router.get('/validate', (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const err = new UnauthorizedError('Invalid token');
    return next(err);
  }

  const user = AuthService.validate(authorization);

  if (!user) {
    const err = new UnauthorizedError('Invalid token');
    return next(err);
  }

  return res.status(200).json(user.data.role);
});

export default router;
