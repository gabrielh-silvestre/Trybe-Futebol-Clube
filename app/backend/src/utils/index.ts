import { BadRequestError, UnprocessableEntityError } from 'restify-errors';

import type {
  LeaderBoardAttributes,
  MatchAttributes,
  UtilGoals,
} from '../@types/types';

const buildJoiSchemaError = (message: string) =>
  (message.includes('required')
    ? new BadRequestError(message)
    : new UnprocessableEntityError(message));

const reduceHomeBoard = (
  acc: LeaderBoardAttributes,
  { homeTeamGoals, awayTeamGoals }: MatchAttributes,
): LeaderBoardAttributes => {
  acc.totalGames += 1;

  if (homeTeamGoals > awayTeamGoals) acc.totalVictories += 1;
  else if (homeTeamGoals < awayTeamGoals) acc.totalLosses += 1;
  else acc.totalDraws += 1;

  acc.goalsFavor += homeTeamGoals;
  acc.goalsOwn += awayTeamGoals;
  acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
  acc.totalPoints = acc.totalVictories * 3 + acc.totalDraws;
  acc.efficiency = Number(
    ((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2),
  );

  return acc;
};

const reduceAwayBoard = (
  acc: LeaderBoardAttributes,
  { homeTeamGoals, awayTeamGoals }: MatchAttributes,
): LeaderBoardAttributes => {
  acc.totalGames += 1;

  if (homeTeamGoals < awayTeamGoals) acc.totalVictories += 1;
  else if (homeTeamGoals > awayTeamGoals) acc.totalLosses += 1;
  else acc.totalDraws += 1;

  acc.goalsFavor += awayTeamGoals;
  acc.goalsOwn += homeTeamGoals;
  acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
  acc.totalPoints = acc.totalVictories * 3 + acc.totalDraws;
  acc.efficiency = Number(
    ((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2),
  );

  return acc;
};

const reduceBoard = (
  acc: LeaderBoardAttributes,
  { favor, own }: UtilGoals,
): LeaderBoardAttributes => {
  acc.totalGames += 1;

  if (favor > own) acc.totalVictories += 1;
  else if (favor < own) acc.totalLosses += 1;
  else acc.totalDraws += 1;

  acc.goalsFavor += favor;
  acc.goalsOwn += own;
  acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
  acc.totalPoints = acc.totalVictories * 3 + acc.totalDraws;
  acc.efficiency = Number(
    ((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2),
  );

  return acc;
};

const unifyMatches = (
  homeMatch: MatchAttributes[],
  awayMatch: MatchAttributes[],
): UtilGoals[] => {
  const homeMatches = homeMatch.map(
    (match: MatchAttributes): UtilGoals => ({
      favor: match.homeTeamGoals,
      own: match.awayTeamGoals,
    }),
  );

  const awayMatches = awayMatch.map(
    (match: MatchAttributes): UtilGoals => ({
      favor: match.awayTeamGoals,
      own: match.homeTeamGoals,
    }),
  );

  return [...homeMatches, ...awayMatches];
};

const sortLeaderBoard = (
  leaderBoard: LeaderBoardAttributes[],
): LeaderBoardAttributes[] =>
  leaderBoard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
    return 0;
  });

export default buildJoiSchemaError;
export {
  reduceHomeBoard,
  reduceAwayBoard,
  reduceBoard,
  unifyMatches,
  sortLeaderBoard,
};
