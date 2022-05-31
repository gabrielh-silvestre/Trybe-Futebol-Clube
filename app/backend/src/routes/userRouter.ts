import { Router } from 'express';
import loginUserController from '../modules/users/useCases/loginUser';
import UserValidator from '../middleware/validators/UserValidator';

const router = Router();

router.post('/', UserValidator.validateLogin, (req, res, next) => {
  loginUserController.handle(req, res, next);
});

export default router;
