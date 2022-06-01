import { Router } from 'express';

import getAllTemasController from '../modules/teams/useCases/getAllTeams';

const router = Router();

router.get('/', (req, res, next) => {
  getAllTemasController.handle(req, res, next);
});

export default router;
