import { Router } from 'express';

import getAllMatchesController from '../modules/matches/useCases/getAllMatches';

const router = Router();

router.get('/', (req, res, next) => {
  getAllMatchesController.handle(req, res, next);
});

export default router;
