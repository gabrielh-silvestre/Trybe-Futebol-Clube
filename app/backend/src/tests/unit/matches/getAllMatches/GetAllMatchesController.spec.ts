import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type { MatchReturn, SuccessReturn } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import GetAllMatchesUseCase from '../../../../modules/matches/useCases/getAllMatches/GetAllMatchesUseCase';
import GetAllMatchesController from '../../../../modules/matches/useCases/getAllMatches/GetAllMatchesController';

import { matches } from '../../../mock/matches';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const getAllMatchesUseCase = new GetAllMatchesUseCase(matchesRepository);
const getAllMatchesController = new GetAllMatchesController(
  getAllMatchesUseCase
);

const SUCCESS_USE_CASE: SuccessReturn<MatchReturn[]> = {
  statusCode: 200,
  data: matches,
};

describe('Test GetAllMatchesController', () => {
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
      useCaseStub = sinon.stub(getAllMatchesUseCase, 'execute');

      useCaseStub.onCall(0).resolves(SUCCESS_USE_CASE);
      useCaseStub.onCall(1).resolves(SUCCESS_USE_CASE);
      useCaseStub.onCall(2).resolves((SUCCESS_USE_CASE.data = []));
    });

    after(() => {
      useCaseStub.restore();
    });

    it('when does not have a query, should return an response with the matches data and status code 200', async () => {
      request.query = {
        inProgress: undefined,
      };

      await getAllMatchesController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });

    it('when query by finished matches, should return an response with the finished matches data and status code 200', async () => {
      request.query = {
        inProgress: 'false',
      };

      await getAllMatchesController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });

    it('when query by in progress matches, should return an response with the in progress matches data and status code 200', async () => {
      request.query = {
        inProgress: 'true',
      };

      await getAllMatchesController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
