import { UnauthorizedError } from 'restify-errors';

import { IUsersRepository } from '../../../../@types/interfaces';
import { User, UserLoginReturn, SuccessReturn } from '../../../../@types/types';

import loginReturnConstructor from '../../../../utils/loginReturnConstructor';

type IRequest = {
  email: string;
  password: string;
};

class LoginUserUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  private async userExists(email: string): Promise<User | never> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    return user;
  }

  public async execute({
    email,
    password,
  }: IRequest): Promise<SuccessReturn<UserLoginReturn>> {
    const foundUser = await this.userExists(email);

    // TODO: create a service to compare encrypted passwords
    if (foundUser.password !== password) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    // TODO: create a service to generate a token
    return {
      statusCode: 200,
      data: loginReturnConstructor(foundUser, 'token'),
    };
  }
}

export default LoginUserUseCase;
