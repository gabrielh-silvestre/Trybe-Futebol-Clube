import { Router } from 'express';

import getAllMatchesController from '../modules/matches/useCases/getAllMatches';
import createNewMatchController from '../modules/matches/useCases/createNewMatch';

import MatchValidator from '../middleware/validators/MatchValidator';
import TeamValidator from '../middleware/validators/TeamValidator';
import AuthValidator from '../middleware/auth';

const router = Router();

router.get('/', (req, res, next) => {
  getAllMatchesController.handle(req, res, next);
});

router.post(
  '/',
  AuthValidator.handle,
  MatchValidator.validateCreate,
  TeamValidator.validateTeamExists,
  (req, res, next) => {
    createNewMatchController.handle(req, res, next);
  },
);

export default router;
