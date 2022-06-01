import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type { SuccessReturn, TeamAttributes } from '../../../../@types/types';

import TeamsRepository from '../../../../modules/teams/repository';
import GetAllTeamsUseCase from '../../../../modules/teams/useCases/getAllTeams/GetAllTeamsUseCase';
import GetAllTeamsController from '../../../../modules/teams/useCases/getAllTeams/GetAllTeamsController';

import { teams } from '../../../mock/teams';

const { expect } = chai;

const teamsRepository = new TeamsRepository();
const getAllTeamsUseCase = new GetAllTeamsUseCase(teamsRepository);
const getAllTeamsController = new GetAllTeamsController(getAllTeamsUseCase);

const SUCCESS_USE_CASE: SuccessReturn<TeamAttributes[]> = {
  statusCode: 200,
  data: teams,
};

describe('Test GetAllTeamsController', () => {
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
      useCaseStub = sinon.stub(getAllTeamsUseCase, 'execute');
      useCaseStub.resolves(SUCCESS_USE_CASE);
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return an response with the teams data, status code 200 and not call next middleware', async () => {
      await getAllTeamsController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });
});
