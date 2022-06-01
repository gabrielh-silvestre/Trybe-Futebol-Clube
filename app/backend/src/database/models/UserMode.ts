import { INTEGER, Model, STRING } from 'sequelize';

import type { UserAttributes, UserCreation } from '../../@types/types';

import sequelize from '.';

class User extends Model<UserAttributes, UserCreation> {
  declare id: number;
  declare username: string;
  declare role: 'admin' | 'user';
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default User;
