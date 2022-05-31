import ValidateUserUseCase from './ValidateUserUseCase';
import ValidateUserController from './ValidateUserController';

import AuthService from '../../../../services/Auth';

const validateUserUseCase = new ValidateUserUseCase(AuthService);
const validateUserController = new ValidateUserController(validateUserUseCase);

export default validateUserController;
