import { IUsersRepository } from '../../../@types/interfaces';
import { User } from '../../../@types/types';

import UserModel from '../../../database/models/UserMode';

class UsersRepository implements IUsersRepository {
  private model: typeof UserModel;

  constructor() {
    this.model = UserModel;
  }

  async findAll(): Promise<User[]> {
    const result = await this.model.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = this.model.findOne({
      where: {
        email,
      },
    });

    return result;
  }
}

export default UsersRepository;
