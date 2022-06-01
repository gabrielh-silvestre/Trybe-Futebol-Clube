import type { IMatchesRepository } from '../../../@types/interfaces/match.interfaces';
import type {
  MatchAttributes,
  MatchCreation,
  MatchReturn,
} from '../../../@types/types';

import MatchModel from '../../../database/models/MatchModel';
import TeamModel from '../../../database/models/TeamModel';

class MatchesRepository implements IMatchesRepository {
  private model: typeof MatchModel;

  constructor() {
    this.model = MatchModel;
  }

  async findAll(): Promise<MatchReturn[]> {
    const result = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return result as unknown as MatchReturn[];
  }

  async create(matchCreation: MatchCreation): Promise<MatchAttributes> {
    const result = await this.model.create(matchCreation);

    return result.get();
  }
}

export default MatchesRepository;
