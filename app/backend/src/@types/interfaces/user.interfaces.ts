import { User } from '../types';

interface UsersRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}

export type IUsersRepository = UsersRepository;
