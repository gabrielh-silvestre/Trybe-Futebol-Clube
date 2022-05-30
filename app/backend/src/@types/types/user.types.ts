type UserAttributes = {
  id: number;
  username: string;
  role: 'admin' | 'user';
  email: string;
  password: string;
};

type UserCreationAttributes = Omit<UserAttributes, 'id'>;

export type User = UserAttributes;
export type UserCreation = UserCreationAttributes;
