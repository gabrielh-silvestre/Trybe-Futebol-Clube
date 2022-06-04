import { Router } from 'express';

import getHomeBoardController from '../modules/leaderboard/useCases/getHomeBoard';
import getAwayBoardController from '../modules/leaderboard/useCases/getAwayBoard';

const router = Router();

router.get('/home', (req, res, next) => {
  getHomeBoardController.handle(req, res, next);
});

router.get('/away', (req, res, next) => {
  getAwayBoardController.handle(req, res, next);
});

export default router;
