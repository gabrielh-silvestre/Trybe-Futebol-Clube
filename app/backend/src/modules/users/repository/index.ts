import type { IUsersRepository } from '../../../@types/interfaces';
import type { UserAttributes } from '../../../@types/types';

import UserModel from '../../../database/models/UserMode';

class UsersRepository implements IUsersRepository {
  private model: typeof UserModel;

  constructor() {
    this.model = UserModel;
  }

  async findByEmail(email: string): Promise<UserAttributes | null> {
    const result = this.model.findOne({
      where: {
        email,
      },
    });

    return result;
  }
}

export default UsersRepository;
