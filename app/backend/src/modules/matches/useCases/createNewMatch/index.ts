import MatchesRepository from '../../repository';
import CreateNewMatchUseCase from './CreateNewMatchUseCase';
import CreateNewMatchController from './CreateNewMatchController';

const matchesRepository = new MatchesRepository();
const createNewMatchUseCase = new CreateNewMatchUseCase(matchesRepository);
const createNewMatchController = new CreateNewMatchController(
  createNewMatchUseCase,
);

export default createNewMatchController;
