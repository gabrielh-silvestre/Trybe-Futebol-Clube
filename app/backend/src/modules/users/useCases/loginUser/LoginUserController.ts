import type { Request, Response, NextFunction } from 'express';
import LoginUserUseCase from './LoginUserUseCase';

class loginUserController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | never> {
    try {
      const user = req.body;

      const { statusCode, data } = await this.loginUserUseCase.execute(user);

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default loginUserController;
