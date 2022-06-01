import type { ITeamsRepository } from '../../../@types/interfaces';
import type { Team } from '../../../@types/types';

import TeamModel from '../../../database/models/TeamModel';

class TeamsRepository implements ITeamsRepository {
  private model: typeof TeamModel;

  constructor() {
    this.model = TeamModel;
  }

  async findAll(): Promise<Team[]> {
    const result = this.model.findAll();

    return result;
  }

  async findById(id: number): Promise<Team | null> {
    const result = this.model.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}

export default TeamsRepository;
