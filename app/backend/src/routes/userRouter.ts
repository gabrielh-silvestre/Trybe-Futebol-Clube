import { Router } from 'express';

import loginUserController from '../modules/users/useCases/loginUser';
import validateUserController from '../modules/users/useCases/validateUser';

import UserValidator from '../middleware/validators/UserValidator';

const router = Router();

router.post('/', UserValidator.validateLogin, (req, res, next) => {
  loginUserController.handle(req, res, next);
});

router.get('/validate', (req, res, next) => {
  validateUserController.handle(req, res, next);
});

export default router;
