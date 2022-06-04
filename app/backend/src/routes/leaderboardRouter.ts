import { Router } from 'express';

import getHomeBoardController from '../modules/leaderboard/useCases/getHomeBoard';

const router = Router();

router.get('/home', async (req, res, next) => {
  getHomeBoardController.handle(req, res, next);
});

export default router;
