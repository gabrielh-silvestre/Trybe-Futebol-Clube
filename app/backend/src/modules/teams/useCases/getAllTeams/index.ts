import TeamsRepository from '../../repository';
import GetAllTeamsUseCase from './GetAllTeamsUseCase';
import GetAllTeamsController from './GetAllTeamsController';

const teamsRepository = new TeamsRepository();
const getAllTeamsUseCase = new GetAllTeamsUseCase(teamsRepository);
const getAllTemasController = new GetAllTeamsController(getAllTeamsUseCase);

export default getAllTemasController;
