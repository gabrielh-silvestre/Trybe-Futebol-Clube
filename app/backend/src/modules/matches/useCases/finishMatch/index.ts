import MatchesRepository from '../../repository';
import FinishMatchUseCase from './FinishMatchUseCase';
import FinishMatchController from './FinishMatchController';

const matchesRepository = new MatchesRepository();
const finishMatchUseCase = new FinishMatchUseCase(matchesRepository);
const finishMatchController = new FinishMatchController(finishMatchUseCase);

export default finishMatchController;
