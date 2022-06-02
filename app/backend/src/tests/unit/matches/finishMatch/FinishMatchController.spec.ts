import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type { MessageCase, SuccessReturn } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import FinishMatchUseCase from '../../../../modules/matches/useCases/finishMatch/FinishMatchUseCase';
import FinishMatchController from '../../../../modules/matches/useCases/finishMatch/FinishMatchController';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const finishMatchUseCase = new FinishMatchUseCase(matchesRepository);
const finishMatchController = new FinishMatchController(finishMatchUseCase);

const SUCCESS_USE_CASE: SuccessReturn<MessageCase> = {
  statusCode: 200,
  data: {
    message: 'Finished',
  },
};

describe.only('Test FinishMatchController', () => {
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

  describe('Success case', () => {
    before(() => {
      useCaseStub = sinon
        .stub(finishMatchUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);

      request.params = { id: '1' };
    });

    after(() => {
      useCaseStub.restore();
      request.params = {};
    });

    it('should return an response with the confirmation message and status code 200', async () => {
      await finishMatchController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
