import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type {
  MatchAttributes,
  MatchCreation,
  SuccessReturn,
} from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import CreateNewMatchUseCase from '../../../../modules/matches/useCases/createNewMatch/CreateNewMatchUseCase';
import CreateNewMatchController from '../../../../modules/matches/useCases/createNewMatch/CreateNewMatchController';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const createNewMatchUseCase = new CreateNewMatchUseCase(matchesRepository);
const createNewMatchController = new CreateNewMatchController(
  createNewMatchUseCase
);

const NEW_MATCH_DATA: MatchCreation = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 2,
  inProgress: true,
};

const NEW_MATCH: MatchAttributes = {
  id: 11,
  ...NEW_MATCH_DATA,
};

const SUCCESS_USE_CASE: SuccessReturn<MatchAttributes> = {
  statusCode: 201,
  data: NEW_MATCH,
};

describe.only('Test CreateNewMatchController', () => {
  let useCaseStub: sinon.SinonStub;
  let spiedStatus: sinon.SinonSpy;
  let spiedJson: sinon.SinonSpy;
  let spiedNext: sinon.SinonSpy;
  const next = {
    next: (_args: any) => {},
  } as { next: NextFunction };

  before(() => {
    spiedStatus = sinon.spy(response, 'status');
    spiedJson = sinon.spy(response, 'json');
    spiedNext = sinon.spy(next, 'next');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
    spiedNext.restore();
  });

  describe('1. Success case', () => {
    before(() => {
      useCaseStub = sinon
        .stub(createNewMatchUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);

      request.body = NEW_MATCH_DATA;
    });

    after(() => {
      useCaseStub.restore();
      request.body = {};
    });

    it('should return an response with the match data and status code 201', async () => {
      await createNewMatchController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(201)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
