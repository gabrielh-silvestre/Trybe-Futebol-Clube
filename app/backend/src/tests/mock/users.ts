import { User } from '../../@types/types';

const users: User[] = [
  {
    id: 1,
    username: 'Admin',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    email: 'admin@admin.com',
    role: 'admin',
  },
  {
    id: 2,
    username: 'User',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    email: 'user@user.com',
    role: 'user',
  },
];

export { users };
