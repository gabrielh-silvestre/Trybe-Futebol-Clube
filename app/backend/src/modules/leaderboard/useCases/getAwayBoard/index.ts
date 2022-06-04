import { boardBuilder } from '../../../../utils/BoardBuilder';
import LeaderBoardRepository from '../../repository';
import GetAwayBoardUseCase from './GetAwayBoardUseCase';
import GetAwayBoardController from './GetAwayBoardController';

const leaderBoardRepository = new LeaderBoardRepository(boardBuilder);
const getAwayBoardUseCase = new GetAwayBoardUseCase(leaderBoardRepository);
const getAwayBoardController = new GetAwayBoardController(getAwayBoardUseCase);

export default getAwayBoardController;
