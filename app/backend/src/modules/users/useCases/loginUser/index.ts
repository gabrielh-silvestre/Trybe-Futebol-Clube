import UsersRepository from '../../repository';
import LoginUserUseCase from './LoginUserUseCase';
import LoginUserController from './LoginUserController';
import AuthService from '../../../../services/Auth';
import EncryptService from '../../../../services/Encrypt';

const usersRepository = new UsersRepository();
const loginUserUseCase = new LoginUserUseCase(
  usersRepository,
  AuthService,
  EncryptService,
);
const loginUserController = new LoginUserController(loginUserUseCase);

export default loginUserController;
