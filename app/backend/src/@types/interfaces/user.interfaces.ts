import type { UserAttributes } from '../types';

interface UsersRepository {
  findByEmail(email: string): Promise<UserAttributes | null>;
}

export type IUsersRepository = UsersRepository;
