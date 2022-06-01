import MatchesRepository from '../../repository';
import GetAllMatchesController from './GetAllMatchesController';
import GetAllMatchesUseCase from './GetAllMatchesUseCase';

const matchesRepository = new MatchesRepository();
const getAllMatchesUseCase = new GetAllMatchesUseCase(matchesRepository);
const getAllMatchesController = new GetAllMatchesController(
  getAllMatchesUseCase,
);

export default getAllMatchesController;
