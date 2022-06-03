import type { LeaderBoardAttributes, TeamMatchesAttributes } from '../@types/types';
import type { IBoardBuilder } from '../@types/interfaces';

import { reduceAwayBoard, reduceBoard, reduceHomeBoard, unifyMatches } from '.';

class BoardBuilder implements IBoardBuilder {
  private readonly boardTemplate: LeaderBoardAttributes = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalLosses: 0,
    totalDraws: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  private buildHomeBoard(
    teamMatches: TeamMatchesAttributes[],
  ): LeaderBoardAttributes[] {
    const homeBoard = teamMatches.map(({ teamName, homeTeam }) => ({
      ...homeTeam.reduce(reduceHomeBoard, { ...this.boardTemplate }),
      name: teamName,
    }));

    return homeBoard;
  }

  private buildAwayBoard(
    teamMatches: TeamMatchesAttributes[],
  ): LeaderBoardAttributes[] {
    const awayBoard = teamMatches.map(({ teamName, awayTeam }) => ({
      ...awayTeam.reduce(reduceAwayBoard, { ...this.boardTemplate }),
      name: teamName,
    }));

    return awayBoard;
  }

  private buildBoard(
    teamMatches: TeamMatchesAttributes[],
  ): LeaderBoardAttributes[] {
    const board = teamMatches.map(({ teamName, homeTeam, awayTeam }) => ({
      ...unifyMatches(homeTeam, awayTeam).reduce(reduceBoard, { ...this.boardTemplate }),
      name: teamName,
    }));

    return board;
  }

  get home() {
    return this.buildHomeBoard;
  }

  get away() {
    return this.buildAwayBoard;
  }

  get all() {
    return this.buildBoard;
  }
}

export default BoardBuilder;
export const boardBuilder = new BoardBuilder();
