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

type TokenData = Pick<Attributes, 'id' | 'username' | 'role'>;

type Token = {
  data: TokenData;
};

export type UserAttributes = Attributes;
export type UserCreation = CreationAttributes;
export type UserLoginReturn = LoginReturn;
export type UserTokenData = TokenData;
export type UserToken = Token;
