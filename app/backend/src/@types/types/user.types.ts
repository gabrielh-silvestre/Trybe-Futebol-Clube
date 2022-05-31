type Attributes = {
  id: number;
  username: string;
  role: 'admin' | 'user';
  email: string;
  password: string;
};

type CreationAttributes = Omit<Attributes, 'id'>;

type LoginReturn = {
  user: Omit<Attributes, 'password'>;
  token: string;
};

type Token = Pick<Attributes, 'id' | 'username' | 'role'>;

export type User = Attributes;
export type UserCreation = CreationAttributes;
export type UserLoginReturn = LoginReturn;
export type UserToken = Token;
