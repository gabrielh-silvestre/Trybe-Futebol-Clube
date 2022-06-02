import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type { MatchAttributes, SuccessReturn } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import EditMatchScoreUseCase from '../../../../modules/matches/useCases/editMatchScore/EditMatchScoreUseCase';
import EditMatchScoreController from '../../../../modules/matches/useCases/editMatchScore/EditMatchScoreController';

import { matches } from '../../../mock/matches';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const editMatchScoreUseCase = new EditMatchScoreUseCase(matchesRepository);
const editMatchScoreController = new EditMatchScoreController(
  editMatchScoreUseCase
);

const MATCH_UPDATE: Pick<MatchAttributes, 'homeTeamGoals' | 'awayTeamGoals'> = {
  homeTeamGoals: 2,
  awayTeamGoals: 3,
};

const UPDATED_MATCH: MatchAttributes = {
  ...matches[0],
  ...MATCH_UPDATE,
};

const SUCCESS_USE_CASE: SuccessReturn<MatchAttributes> = {
  statusCode: 200,
  data: UPDATED_MATCH,
};

describe('Test EditMatchScoreController', () => {
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
        .stub(editMatchScoreUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);

      request.params = { id: '1' };
      request.body = MATCH_UPDATE;
    });

    after(() => {
      useCaseStub.restore();

      request.params = {};
      request.body = {};
    });

    it('should return an response with status code 200 and the updated match data', async () => {
      await editMatchScoreController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
