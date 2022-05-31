import { UnauthorizedError } from 'restify-errors';
import { StatusCodes } from 'http-status-codes';

import type {
  User,
  UserLoginReturn,
  SuccessReturn,
  UserToken,
} from '../../../../@types/types';
import type { IUsersRepository } from '../../../../@types/interfaces';
import type { IAuthService } from '../../../../services/Auth';
import type { IEncryptService } from '../../../../services/Encrypt';

type IRequest = {
  email: string;
  password: string;
};

class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly authService: IAuthService,
    private readonly encryptService: IEncryptService,
  ) {}

  private async userExists(email: string): Promise<User | never> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    return user;
  }

  private async passwordIsCorrect(
    password: string,
    userPassword: string,
  ): Promise<boolean | never> {
    const isPasswordCorrect = await this.encryptService.verify(
      password,
      userPassword,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    return true;
  }

  private generateToken({ id, username, role }: UserToken): string {
    return this.authService.generate({ id, username, role });
  }

  private static returnConstructor(
    foundUser: User,
    token: string,
  ): UserLoginReturn {
    return {
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      token,
    };
  }

  public async execute({
    email,
    password,
  }: IRequest): Promise<SuccessReturn<UserLoginReturn>> {
    const foundUser = await this.userExists(email);

    await this.passwordIsCorrect(password, foundUser.password);

    const token = this.generateToken(foundUser);

    return {
      statusCode: StatusCodes.OK,
      data: LoginUserUseCase.returnConstructor(foundUser, token),
    };
  }
}

export default LoginUserUseCase;
