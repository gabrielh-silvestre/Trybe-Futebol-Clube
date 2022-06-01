import { Router } from 'express';

import getAllTemasController from '../modules/teams/useCases/getAllTeams';
import getTeamByIdController from '../modules/teams/useCases/getTeamById';

const router = Router();

router.get('/', (req, res, next) => {
  getAllTemasController.handle(req, res, next);
});

router.get('/:id', (req, res, next) => {
  getTeamByIdController.handle(req, res, next);
});

export default router;
