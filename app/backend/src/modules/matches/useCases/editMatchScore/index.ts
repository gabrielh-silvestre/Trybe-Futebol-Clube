import MatchesRepository from '../../repository';
import EditMatchScoreUseCase from './EditMatchScoreUseCase';
import EditMatchScoreController from './EditMatchScoreController';

const matchesRepository = new MatchesRepository();
const editMatchScoreUseCase = new EditMatchScoreUseCase(matchesRepository);
const editMatchScoreController = new EditMatchScoreController(
  editMatchScoreUseCase,
);

export default editMatchScoreController;
