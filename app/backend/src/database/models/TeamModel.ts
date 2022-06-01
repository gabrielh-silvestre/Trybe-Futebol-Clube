import { Model, INTEGER, STRING } from 'sequelize';

import type { TeamAttributes, TeamCreation } from '../../@types/types';

import sequelize from '.';
import Match from './MatchModel';

class Team extends Model<TeamAttributes, TeamCreation> {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
