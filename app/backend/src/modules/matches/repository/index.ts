import { Op } from 'sequelize';

import type { IMatchesRepository } from '../../../@types/interfaces/match.interfaces';
import type {
  MatchAttributes,
  MatchCreation,
  MatchReturn,
  MatchUpdate,
} from '../../../@types/types';

import MatchModel from '../../../database/models/MatchModel';
import TeamModel from '../../../database/models/TeamModel';

class MatchesRepository implements IMatchesRepository {
  private model: typeof MatchModel;

  constructor() {
    this.model = MatchModel;
  }

  async findAll(query: boolean | null = null): Promise<MatchReturn[]> {
    const result = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        inProgress: query === null ? { [Op.or]: [true, false] } : query,
      },
    });
    return result as unknown as MatchReturn[];
  }

  async create(matchCreation: MatchCreation): Promise<MatchAttributes> {
    const result = await this.model.create(matchCreation);

    return result.get();
  }

  async update(id: number, newScore: MatchUpdate): Promise<MatchAttributes> {
    const match = (await this.model.findByPk(id)) as MatchModel;

    const { awayTeamGoals, homeTeamGoals, inProgress } = match.get();

    match.set({
      awayTeamGoals: newScore.awayTeamGoals
        ? newScore.awayTeamGoals
        : awayTeamGoals,
      homeTeamGoals: newScore.homeTeamGoals
        ? newScore.homeTeamGoals
        : homeTeamGoals,
      inProgress: newScore.inProgress === undefined
        ? inProgress
        : newScore.inProgress,
    });

    await match.save();

    return match.get();
  }
}

export default MatchesRepository;
