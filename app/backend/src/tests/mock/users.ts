import { User } from '../../@types/types';

const users: User[] = [
  {
    id: 1,
    username: 'Admin',
    password: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
  },
  {
    id: 2,
    username: 'User',
    password: 'user',
    email: 'user@user.com',
    role: 'user',
  },
];

export { users };
