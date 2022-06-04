import { boardBuilder } from '../../../../utils/BoardBuilder';
import LeaderBoardRepository from '../../repository';
import GetHomeBoardUseCase from './GetHomeBoardUseCase';
import GetHomeBoardController from './GetHomeBoardController';

const leaderBoardRepository = new LeaderBoardRepository(boardBuilder);
const getHomeBoardUseCase = new GetHomeBoardUseCase(leaderBoardRepository);
const getHomeBoardController = new GetHomeBoardController(getHomeBoardUseCase);

export default getHomeBoardController;
