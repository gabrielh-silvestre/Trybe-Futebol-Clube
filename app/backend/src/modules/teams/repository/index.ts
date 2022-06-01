import type { ITeamsRepository } from '../../../@types/interfaces';
import type { TeamAttributes } from '../../../@types/types';

import TeamModel from '../../../database/models/TeamModel';

class TeamsRepository implements ITeamsRepository {
  private model: typeof TeamModel;

  constructor() {
    this.model = TeamModel;
  }

  async findAll(): Promise<TeamAttributes[]> {
    const result = this.model.findAll();

    return result;
  }

  async findById(id: number): Promise<TeamAttributes | null> {
    const result = this.model.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}

export default TeamsRepository;
