import * as jwt from 'jsonwebtoken';

import { UserToken, UserTokenData } from '../../@types/types';
import jwtConfig from '../../config/jwtConfig';

class AuthService {
  public static validate(token: string): UserToken | null {
    const { secret } = jwtConfig;

    try {
      return jwt.verify(token, secret) as UserToken;
    } catch (err) {
      return null;
    }
  }

  public static generate(user: UserTokenData): string {
    const { secret, expiresIn, algorithm } = jwtConfig;

    return jwt.sign({ data: user }, secret, { expiresIn, algorithm });
  }
}

export default AuthService;
export type IAuthService = typeof AuthService;
