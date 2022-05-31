import { User } from '../types';

interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
}

export type IUsersRepository = UsersRepository;
