import { Model, INTEGER, BOOLEAN } from 'sequelize';

import type { MatchAttributes, MatchCreation } from '../../@types/types';

import sequelize from '.';

class Match extends Model<MatchAttributes, MatchCreation> {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

export default Match;
