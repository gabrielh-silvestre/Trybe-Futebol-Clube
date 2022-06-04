import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type {
  LeaderBoardAttributes,
  SuccessReturn,
} from '../../../../@types/types';

import { boardBuilder } from '../../../../utils/BoardBuilder';
import LeaderBoardRepository from '../../../../modules/leaderboard/repository';
import GetAwayBoardUseCase from '../../../../modules/leaderboard/useCases/getAwayBoard/GetAwayBoardUseCase';
import GetAwayBoardController from '../../../../modules/leaderboard/useCases/getAwayBoard/GetAwayBoardController';

import { board } from '../../../mock/leaderboards';

const { expect } = chai;

const matchesRepository = new LeaderBoardRepository(boardBuilder);
const getHomeBoardUseCase = new GetAwayBoardUseCase(matchesRepository);
const getHomeBoardController = new GetAwayBoardController(getHomeBoardUseCase);

const SUCCESS_USE_CASE: SuccessReturn<LeaderBoardAttributes[]> = {
  statusCode: 200,
  data: board,
};

describe('Test GetHomeBoardController', () => {
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
        .stub(getHomeBoardUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return status code 200 and home teams leaderboard data', async () => {
      await getHomeBoardController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
