import type {
  IBoardBuilder,
  ILeaderBoardRepository,
} from '../../../@types/interfaces';
import type {
  LeaderBoardAttributes,
  LeaderBoardOptions,
  TeamMatchesAttributes,
} from '../../../@types/types';

import MatchModel from '../../../database/models/MatchModel';
import TeamModel from '../../../database/models/TeamModel';

class LeaderBoardRepository implements ILeaderBoardRepository {
  private teamModel: typeof TeamModel;
  private matchModel: typeof MatchModel;

  constructor(private readonly builder: IBoardBuilder) {
    this.teamModel = TeamModel;
    this.matchModel = MatchModel;
  }

  async getAll(option?: LeaderBoardOptions): Promise<LeaderBoardAttributes[]> {
    const teamsWithMatches = (await this.teamModel
      .findAll({
        include: [
          {
            model: this.matchModel,
            as: 'homeTeam',
            where: { inProgress: false },
          },
          {
            model: this.matchModel,
            as: 'awayTeam',
            where: { inProgress: false },
          },
        ],
      })
      .then((teams) =>
        teams.map((team) => team.get()))) as TeamMatchesAttributes[];

    return this.builder[option || 'all'](teamsWithMatches);
  }
}

export default LeaderBoardRepository;
