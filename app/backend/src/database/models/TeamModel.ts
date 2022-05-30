import { Model, INTEGER, STRING } from 'sequelize';

import type { Team as TeamAttributes, TeamCreation } from '../../@types/types';

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

Match.belongsTo(Team, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Team, { foreignKey: 'id', as: 'away_team' });

export default Team;
