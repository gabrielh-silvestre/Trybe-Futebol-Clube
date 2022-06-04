import { boardBuilder } from '../../../../utils/BoardBuilder';
import LeaderBoardRepository from '../../repository';
import GetAllBoardUseCase from './GetAllBoardUseCase';
import GetAllBoardController from './GetAllBoardController';

const leaderBoardRepository = new LeaderBoardRepository(boardBuilder);
const getAllBoardUseCase = new GetAllBoardUseCase(leaderBoardRepository);
const getAllBoardController = new GetAllBoardController(getAllBoardUseCase);

export default getAllBoardController;
