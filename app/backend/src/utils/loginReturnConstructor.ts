import { User, UserLoginReturn } from '../@types/types';

const loginReturnConstructor = (
  user: User,
  token: string,
): UserLoginReturn => ({
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
  token,
});

export default loginReturnConstructor;
