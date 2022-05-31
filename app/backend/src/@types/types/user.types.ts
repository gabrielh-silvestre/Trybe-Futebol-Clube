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

export type User = Attributes;
export type UserCreation = CreationAttributes;
export type UserLoginReturn = LoginReturn;
