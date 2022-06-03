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
  curr: MatchAttributes,
): LeaderBoardAttributes => {
  const { homeTeamGoals, awayTeamGoals } = curr;
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
  curr: MatchAttributes,
): LeaderBoardAttributes => {
  const { homeTeamGoals, awayTeamGoals } = curr;
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
  curr: UtilGoals,
): LeaderBoardAttributes => {
  const { favor, own } = curr;
  acc.totalGames += 1;

  if (favor < own) acc.totalVictories += 1;
  else if (favor > own) acc.totalLosses += 1;
  else acc.totalDraws += 1;

  acc.goalsFavor += own;
  acc.goalsOwn += favor;
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

export default buildJoiSchemaError;
export { reduceHomeBoard, reduceAwayBoard, reduceBoard, unifyMatches };
