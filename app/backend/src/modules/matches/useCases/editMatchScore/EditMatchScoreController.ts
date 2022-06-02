import type { NextFunction, Request, Response } from 'express';

import EditMatchScoreUseCase from './EditMatchScoreUseCase';

class EditMatchScoreController {
  constructor(private readonly editMatchScoreUseCase: EditMatchScoreUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);

      const { statusCode, data } = await this.editMatchScoreUseCase.execute(
        id,
        req.body,
      );

      res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default EditMatchScoreController;
