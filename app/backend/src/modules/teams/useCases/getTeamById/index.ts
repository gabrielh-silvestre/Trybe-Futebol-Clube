import TeamsRepository from '../../repository';
import GetTeamByIdUseCase from './GetTeamByIdUseCase';
import GetTeamByIdController from './GetTeamByIdController';

const teamsRepository = new TeamsRepository();
const getTeamByIdUseCase = new GetTeamByIdUseCase(teamsRepository);
const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

export default getTeamByIdController;
